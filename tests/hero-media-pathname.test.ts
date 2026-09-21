import test from "node:test";
import assert from "node:assert/strict";
import {
  extensionForContentType,
  generateMediaPathname,
  isSafeGeneratedMediaPathname,
} from "../src/lib/hero/mediaValidation.ts";

test("extensionForContentType: maps every allowed type to a fixed extension", () => {
  assert.equal(extensionForContentType("image/png"), "png");
  assert.equal(extensionForContentType("image/jpeg"), "jpg");
  assert.equal(extensionForContentType("video/mp4"), "mp4");
});

test("extensionForContentType: rejects disallowed/unknown types (e.g. SVG, HTML)", () => {
  assert.equal(extensionForContentType("image/svg+xml"), null);
  assert.equal(extensionForContentType("text/html"), null);
  assert.equal(extensionForContentType("application/octet-stream"), null);
});

test("generateMediaPathname: produces a pathname the validator accepts", () => {
  const pathname = generateMediaPathname("image/png");
  assert.equal(isSafeGeneratedMediaPathname(pathname, "image/png"), true);
  assert.match(pathname, /^hero\/[0-9a-f-]{36}\.png$/);
});

test("generateMediaPathname: throws for a disallowed content type", () => {
  assert.throws(() => generateMediaPathname("image/svg+xml"));
});

test("isSafeGeneratedMediaPathname: rejects a raw, attacker/user-supplied filename", () => {
  assert.equal(isSafeGeneratedMediaPathname("../../etc/passwd.png", "image/png"), false);
  assert.equal(isSafeGeneratedMediaPathname("my-resume.png", "image/png"), false);
  assert.equal(isSafeGeneratedMediaPathname("evil.html", "text/html"), false);
});

test("isSafeGeneratedMediaPathname: rejects a mismatched extension for the claimed content type", () => {
  const pngPathname = generateMediaPathname("image/png");
  assert.equal(isSafeGeneratedMediaPathname(pngPathname, "video/mp4"), false);
});
