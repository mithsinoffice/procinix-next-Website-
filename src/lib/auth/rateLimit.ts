/**
 * A minimal in-memory sliding-window rate limiter.
 *
 * NOT used by the admin login route in production — an in-memory Map is
 * not a strict global guarantee on Vercel, where concurrent or
 * geographically distributed requests can land on different serverless
 * instances, each with its own counter. The login route uses the
 * Postgres-backed limiter in src/lib/auth/rateLimitDb.ts instead, which is
 * atomic across instances. This in-memory version is kept as a small,
 * dependency-free utility (and its own test coverage) for any future
 * single-instance or local-dev-only use — it is not wired into a
 * production auth path.
 */
const buckets = new Map<string, { count: number; windowStartedAt: number }>();

export function checkRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStartedAt > windowMs) {
    buckets.set(key, { count: 1, windowStartedAt: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfterMs: windowMs - (now - bucket.windowStartedAt) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** Periodically drop stale buckets so this Map can't grow unbounded over
 *  a long-lived instance's lifetime. Called opportunistically on writes. */
let lastSweep = Date.now();
export function sweepRateLimitBuckets(maxAgeMs: number = 30 * 60 * 1000) {
  const now = Date.now();
  if (now - lastSweep < maxAgeMs) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStartedAt > maxAgeMs) buckets.delete(key);
  }
}
