import test from "node:test";
import assert from "node:assert/strict";
import { isSafeCtaHref } from "../src/lib/hero/ctaSafety.ts";

test("isSafeCtaHref: accepts a relative same-site path", () => {
  assert.equal(isSafeCtaHref("/platform"), true);
  assert.equal(isSafeCtaHref("/book-demo#agentic-ai"), true);
});

test("isSafeCtaHref: accepts an absolute https URL", () => {
  assert.equal(isSafeCtaHref("https://www.procinix.ai/platform"), true);
});

test("isSafeCtaHref: rejects javascript: URLs", () => {
  assert.equal(isSafeCtaHref("javascript:alert(1)"), false);
});

test("isSafeCtaHref: rejects data: URLs", () => {
  assert.equal(isSafeCtaHref("data:text/html,<script>alert(1)</script>"), false);
});

test("isSafeCtaHref: rejects file: URLs", () => {
  assert.equal(isSafeCtaHref("file:///etc/passwd"), false);
});

test("isSafeCtaHref: rejects plain http (non-https) URLs", () => {
  assert.equal(isSafeCtaHref("http://example.com"), false);
});

test("isSafeCtaHref: rejects protocol-relative URLs (can silently resolve to another host)", () => {
  assert.equal(isSafeCtaHref("//evil.example.com"), false);
});

test("isSafeCtaHref: rejects empty, null, and undefined", () => {
  assert.equal(isSafeCtaHref(""), false);
  assert.equal(isSafeCtaHref(null), false);
  assert.equal(isSafeCtaHref(undefined), false);
});

test("isSafeCtaHref: rejects malformed URLs", () => {
  assert.equal(isSafeCtaHref("not a url"), false);
});
