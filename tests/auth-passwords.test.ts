import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../src/lib/auth/passwords.ts";

test("hashPassword + verifyPassword: round-trips a correct password", async () => {
  const hash = await hashPassword("a-very-strong-password-123");
  assert.equal(await verifyPassword("a-very-strong-password-123", hash), true);
});

test("verifyPassword: rejects an incorrect password", async () => {
  const hash = await hashPassword("a-very-strong-password-123");
  assert.equal(await verifyPassword("wrong-password", hash), false);
});

test("hashPassword: never stores the plaintext password in the hash", async () => {
  const hash = await hashPassword("a-very-strong-password-123");
  assert.equal(hash.includes("a-very-strong-password-123"), false);
});
