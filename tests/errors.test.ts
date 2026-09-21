import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { UserFacingError, toActionErrorMessage } from "../src/lib/errors.ts";

test("toActionErrorMessage: passes through a UserFacingError's message verbatim", () => {
  const err = new UserFacingError("Not authenticated.");
  assert.equal(toActionErrorMessage(err, "test"), "Not authenticated.");
});

test("toActionErrorMessage: passes through a Zod validation error's message", () => {
  const result = z.object({ slug: z.string().min(1) }).safeParse({ slug: "" });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(toActionErrorMessage(result.error, "test"), result.error.message);
  }
});

test("toActionErrorMessage: replaces an unexpected/internal error with a generic message", () => {
  const dbError = new Error('duplicate key value violates unique constraint "hero_campaigns_slug_key"');
  const message = toActionErrorMessage(dbError, "test");
  assert.equal(message, "Something went wrong. Please try again.");
  assert.equal(message.includes("hero_campaigns_slug_key"), false);
});

test("toActionErrorMessage: replaces a non-Error thrown value with a generic message", () => {
  assert.equal(toActionErrorMessage("some string throw", "test"), "Something went wrong. Please try again.");
});
