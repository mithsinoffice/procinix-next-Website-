import test from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose/jwt/sign";

process.env.ADMIN_SESSION_SECRET = "test-secret-at-least-32-characters-long-xyz";

const { createSessionToken, verifySessionToken } = await import("../src/lib/auth/session.ts");

test("createSessionToken + verifySessionToken: round-trips a valid session", async () => {
  const token = await createSessionToken({ email: "admin@procinix.ai", role: "ADMIN" });
  const payload = await verifySessionToken(token);
  assert.deepEqual(payload, { email: "admin@procinix.ai", role: "ADMIN" });
});

test("verifySessionToken: rejects a tampered token", async () => {
  const token = await createSessionToken({ email: "admin@procinix.ai", role: "ADMIN" });
  const tampered = token.slice(0, -2) + (token.slice(-2) === "aa" ? "bb" : "aa");
  const payload = await verifySessionToken(tampered);
  assert.equal(payload, null);
});

test("verifySessionToken: rejects null/undefined/empty tokens without throwing", async () => {
  assert.equal(await verifySessionToken(null), null);
  assert.equal(await verifySessionToken(undefined), null);
  assert.equal(await verifySessionToken(""), null);
});

test("verifySessionToken: rejects a token signed with a different secret", async () => {
  const token = await createSessionToken({ email: "admin@procinix.ai", role: "ADMIN" });
  const originalSecret = process.env.ADMIN_SESSION_SECRET;
  process.env.ADMIN_SESSION_SECRET = "a-completely-different-secret-value-0000000";
  const payload = await verifySessionToken(token);
  process.env.ADMIN_SESSION_SECRET = originalSecret;
  assert.equal(payload, null);
});

test("verifySessionToken: rejects an expired token", async () => {
  const key = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
  const expiredToken = await new SignJWT({ email: "admin@procinix.ai", role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 100)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 10)
    .sign(key);
  const payload = await verifySessionToken(expiredToken);
  assert.equal(payload, null);
});

test("verifySessionToken: rejects a token with a malformed/unrecognized role claim", async () => {
  const key = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
  const forgedToken = await new SignJWT({ email: "admin@procinix.ai", role: "SUPERUSER" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
  const payload = await verifySessionToken(forgedToken);
  assert.equal(payload, null);
});
