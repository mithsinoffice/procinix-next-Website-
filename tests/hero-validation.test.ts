import test from "node:test";
import assert from "node:assert/strict";
import { HeroCampaignFormSchema } from "../src/lib/hero/validation.ts";

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    slug: "test-campaign",
    internalName: "Test Campaign",
    headline: "A headline",
    analyticsCampaignId: "test_campaign",
    ...overrides,
  };
}

test("HeroCampaignFormSchema: accepts a minimal valid campaign and fills defaults", () => {
  const parsed = HeroCampaignFormSchema.parse(baseInput());
  assert.equal(parsed.status, "draft");
  assert.equal(parsed.mediaType, "image");
  assert.equal(parsed.accent, "teal");
  assert.equal(parsed.autoplayEligible, true);
  assert.equal(parsed.durationMs, 8000);
});

test("HeroCampaignFormSchema: rejects an unsafe primary CTA href", () => {
  const result = HeroCampaignFormSchema.safeParse(baseInput({ primaryCtaHref: "javascript:alert(1)" }));
  assert.equal(result.success, false);
});

test("HeroCampaignFormSchema: accepts a safe relative primary CTA href", () => {
  const result = HeroCampaignFormSchema.safeParse(baseInput({ primaryCtaHref: "/book-demo" }));
  assert.equal(result.success, true);
});

test("HeroCampaignFormSchema: rejects a slug with uppercase or spaces", () => {
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ slug: "Not A Slug" })).success, false);
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ slug: "valid-slug-2" })).success, true);
});

test("HeroCampaignFormSchema: rejects an empty headline", () => {
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ headline: "" })).success, false);
});

test("HeroCampaignFormSchema: rejects an out-of-range slide duration", () => {
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ durationMs: 500 })).success, false);
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ durationMs: 100000 })).success, false);
  assert.equal(HeroCampaignFormSchema.safeParse(baseInput({ durationMs: 8000 })).success, true);
});
