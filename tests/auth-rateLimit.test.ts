import test from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "../src/lib/auth/rateLimit.ts";

test("checkRateLimit: allows requests up to the max within the window", () => {
  const key = `test-key-${Math.random()}`;
  for (let i = 0; i < 5; i++) {
    const result = checkRateLimit(key, { max: 5, windowMs: 60_000 });
    assert.equal(result.allowed, true, `attempt ${i + 1} should be allowed`);
  }
});

test("checkRateLimit: blocks once the max is exceeded within the window", () => {
  const key = `test-key-${Math.random()}`;
  for (let i = 0; i < 5; i++) {
    checkRateLimit(key, { max: 5, windowMs: 60_000 });
  }
  const sixth = checkRateLimit(key, { max: 5, windowMs: 60_000 });
  assert.equal(sixth.allowed, false);
  assert.ok(sixth.retryAfterMs > 0);
});

test("checkRateLimit: different keys have independent buckets", () => {
  const keyA = `test-key-a-${Math.random()}`;
  const keyB = `test-key-b-${Math.random()}`;
  for (let i = 0; i < 5; i++) checkRateLimit(keyA, { max: 5, windowMs: 60_000 });
  const blockedA = checkRateLimit(keyA, { max: 5, windowMs: 60_000 });
  const allowedB = checkRateLimit(keyB, { max: 5, windowMs: 60_000 });
  assert.equal(blockedA.allowed, false);
  assert.equal(allowedB.allowed, true);
});
