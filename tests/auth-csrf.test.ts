import test from "node:test";
import assert from "node:assert/strict";
import { isTrustedOrigin } from "../src/lib/auth/csrf.ts";

function req(headers: Record<string, string>) {
  return new Request("https://www.procinix.ai/api/admin/login", { method: "POST", headers });
}

test("isTrustedOrigin: accepts a matching same-origin request", () => {
  assert.equal(isTrustedOrigin(req({ origin: "https://www.procinix.ai", host: "www.procinix.ai" })), true);
});

test("isTrustedOrigin: rejects a cross-site Origin (CSRF attempt)", () => {
  assert.equal(isTrustedOrigin(req({ origin: "https://evil.example.com", host: "www.procinix.ai" })), false);
});

test("isTrustedOrigin: rejects a request with no Origin header at all", () => {
  assert.equal(isTrustedOrigin(req({ host: "www.procinix.ai" })), false);
});

test("isTrustedOrigin: rejects a request with no Host header", () => {
  assert.equal(isTrustedOrigin(req({ origin: "https://www.procinix.ai" })), false);
});

test("isTrustedOrigin: rejects a malformed Origin header", () => {
  assert.equal(isTrustedOrigin(req({ origin: "not-a-url", host: "www.procinix.ai" })), false);
});
