import test from "node:test";
import assert from "node:assert/strict";
import { isEligible, getEligibleCampaigns, findEligibleCampaignBySlug } from "../src/lib/hero/eligibility.ts";
import type { HeroCampaign } from "../src/lib/hero/types.ts";

const NOW = new Date("2026-06-15T00:00:00Z");

function fixture(overrides: Partial<HeroCampaign> & Pick<HeroCampaign, "id" | "slug" | "priority">): HeroCampaign {
  return {
    internalName: overrides.id,
    eyebrow: "",
    headline: "Headline",
    description: "",
    primaryCtaLabel: null,
    primaryCtaHref: null,
    secondaryCtaLabel: null,
    secondaryCtaHref: null,
    mediaType: "image",
    desktopMediaUrl: null,
    mobileMediaUrl: null,
    posterMediaUrl: null,
    altText: "",
    accent: "teal",
    overlayIntensity: "medium",
    badge: null,
    status: "published",
    startAt: null,
    endAt: null,
    autoplayEligible: true,
    durationMs: 8000,
    analyticsCampaignId: overrides.id,
    isEvergreenFallback: false,
    createdAt: NOW.toISOString(),
    createdBy: null,
    updatedAt: NOW.toISOString(),
    updatedBy: null,
    publishedAt: NOW.toISOString(),
    version: 1,
    ...overrides,
  };
}

const FIXTURES: HeroCampaign[] = [
  fixture({ id: "a", slug: "alpha", priority: 2 }),
  fixture({ id: "b", slug: "beta", priority: 0 }),
  fixture({ id: "c", slug: "gamma", priority: 1, status: "draft" }), // not published — excluded
  fixture({ id: "d", slug: "delta", priority: 3, startAt: "2026-01-01T00:00:00Z", endAt: "2026-12-31T23:59:59Z" }), // in window
  fixture({ id: "e", slug: "epsilon", priority: 4, startAt: "2027-01-01T00:00:00Z" }), // future start — excluded
  fixture({ id: "f", slug: "zeta", priority: 5, endAt: "2026-01-01T00:00:00Z" }), // already ended — excluded
  fixture({ id: "g", slug: "eta", priority: 6, status: "scheduled", startAt: "2026-01-01T00:00:00Z", endAt: "2026-12-31T23:59:59Z" }), // scheduled, not published — excluded even though window matches
];

test("isEligible: only published campaigns within their window are eligible", () => {
  assert.equal(isEligible(FIXTURES[0], NOW), true); // a: published, no window
  assert.equal(isEligible(FIXTURES[2], NOW), false); // c: draft
  assert.equal(isEligible(FIXTURES[4], NOW), false); // e: future start
  assert.equal(isEligible(FIXTURES[5], NOW), false); // f: already ended
  assert.equal(isEligible(FIXTURES[6], NOW), false); // g: scheduled status, not published
});

test("getEligibleCampaigns: filters and sorts by priority", () => {
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  assert.deepEqual(eligible.map((c) => c.id), ["b", "a", "d"]);
});

test("getEligibleCampaigns: sorts correctly regardless of input order", () => {
  const scrambled = [FIXTURES[3], FIXTURES[0], FIXTURES[1]];
  const eligible = getEligibleCampaigns(scrambled, NOW);
  assert.deepEqual(eligible.map((c) => c.id), ["b", "a", "d"]);
});

test("getEligibleCampaigns: empty input yields empty output", () => {
  assert.deepEqual(getEligibleCampaigns([], NOW), []);
});

test("findEligibleCampaignBySlug: resolves a known slug within the eligible set", () => {
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  const match = findEligibleCampaignBySlug("alpha", eligible);
  assert.equal(match?.id, "a");
});

test("findEligibleCampaignBySlug: unknown slug resolves to undefined (safe fallback to default slide)", () => {
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  assert.equal(findEligibleCampaignBySlug("does-not-exist", eligible), undefined);
});

test("findEligibleCampaignBySlug: null/undefined slug resolves to undefined", () => {
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  assert.equal(findEligibleCampaignBySlug(null, eligible), undefined);
  assert.equal(findEligibleCampaignBySlug(undefined, eligible), undefined);
});

test("findEligibleCampaignBySlug: an inactive campaign's slug is NOT reachable via deep link, even though it exists", () => {
  // "gamma" (draft) and "eta" (scheduled) are real slugs, but only eligible
  // campaigns are searched — an unpublished campaign must never be reachable
  // through a public URL.
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  assert.equal(findEligibleCampaignBySlug("gamma", eligible), undefined);
  assert.equal(findEligibleCampaignBySlug("eta", eligible), undefined);
});
