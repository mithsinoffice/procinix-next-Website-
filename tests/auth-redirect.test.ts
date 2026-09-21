import test from "node:test";
import assert from "node:assert/strict";
import { isSafeInternalPath } from "../src/lib/auth/redirect.ts";

test("isSafeInternalPath: accepts a same-site relative path", () => {
  assert.equal(isSafeInternalPath("/admin/slider"), true);
  assert.equal(isSafeInternalPath("/admin"), true);
});

test("isSafeInternalPath: rejects an absolute URL (open-redirect attempt)", () => {
  assert.equal(isSafeInternalPath("https://evil.example.com"), false);
  assert.equal(isSafeInternalPath("http://evil.example.com/admin"), false);
});

test("isSafeInternalPath: rejects a protocol-relative URL", () => {
  assert.equal(isSafeInternalPath("//evil.example.com"), false);
});

test("isSafeInternalPath: rejects javascript: and empty/null/undefined", () => {
  assert.equal(isSafeInternalPath("javascript:alert(1)"), false);
  assert.equal(isSafeInternalPath(""), false);
  assert.equal(isSafeInternalPath(null), false);
  assert.equal(isSafeInternalPath(undefined), false);
});
