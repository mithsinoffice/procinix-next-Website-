/**
 * A minimal in-memory sliding-window rate limiter for the admin login and
 * media-upload endpoints.
 *
 * Known, disclosed limitation: this state lives in a single serverless
 * function instance's memory. On Vercel, concurrent or geographically
 * distributed requests can land on different instances, each with its own
 * counter, so this is a best-effort deterrent rather than a strict global
 * guarantee — combined with bcrypt's inherent hashing cost, it still
 * meaningfully slows down credential-stuffing and brute-force attempts.
 * For a strict global guarantee, replace this with Upstash Ratelimit
 * (Redis-backed) — see docs/hero-slider.md, "Operations" for the swap-in
 * point once that infrastructure is provisioned.
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
