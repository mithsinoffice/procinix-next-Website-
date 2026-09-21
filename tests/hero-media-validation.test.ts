import test from "node:test";
import assert from "node:assert/strict";
import { maxBytesFor, MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from "../src/lib/hero/mediaValidation.ts";

test("maxBytesFor: returns the video limit for video content types", () => {
  assert.equal(maxBytesFor("video/mp4"), MAX_VIDEO_BYTES);
  assert.equal(maxBytesFor("video/webm"), MAX_VIDEO_BYTES);
});

test("maxBytesFor: returns the image limit for image (and unknown) content types", () => {
  assert.equal(maxBytesFor("image/png"), MAX_IMAGE_BYTES);
  assert.equal(maxBytesFor("application/octet-stream"), MAX_IMAGE_BYTES);
});
