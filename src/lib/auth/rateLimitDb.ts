import "server-only";
import { sql } from "@/lib/db/client";

/**
 * Postgres-backed sliding-window rate limiter, safe for Vercel's
 * distributed/ephemeral serverless instances (unlike an in-memory Map —
 * see src/lib/auth/rateLimit.ts's doc comment for why that one isn't
 * sufficient on its own for production).
 *
 * A single atomic UPSERT does the read-modify-write: Postgres's row-level
 * locking during the UPDATE serializes concurrent attempts for the same
 * key, so two simultaneous requests can't both observe "count == max - 1"
 * and both be allowed through.
 */
export async function checkLoginRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): Promise<{ allowed: boolean; retryAfterMs: number }> {
  if (!sql) {
    // No database configured — login itself is already rejected with 503
    // in this case (see src/app/api/admin/login/route.ts), so there is no
    // credential-guessing surface to protect here.
    return { allowed: true, retryAfterMs: 0 };
  }

  const cutoff = new Date(Date.now() - windowMs).toISOString();
  const rows = await sql`
    INSERT INTO login_rate_limits (key, count, window_started_at)
    VALUES (${key}, 1, now())
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN login_rate_limits.window_started_at <= ${cutoff}::timestamptz THEN 1
        ELSE login_rate_limits.count + 1
      END,
      window_started_at = CASE
        WHEN login_rate_limits.window_started_at <= ${cutoff}::timestamptz THEN now()
        ELSE login_rate_limits.window_started_at
      END
    RETURNING count, window_started_at
  `;

  const row = rows[0] as { count: number; window_started_at: string };
  if (row.count > max) {
    const windowStartedAt = new Date(row.window_started_at).getTime();
    const retryAfterMs = Math.max(0, windowMs - (Date.now() - windowStartedAt));
    return { allowed: false, retryAfterMs };
  }
  return { allowed: true, retryAfterMs: 0 };
}
