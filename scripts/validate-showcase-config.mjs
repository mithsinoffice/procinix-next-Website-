#!/usr/bin/env node
/**
 * Dependency-free validation for the Product Showcase config-selection logic.
 *
 * This script does NOT import src/content/showcase.ts directly — doing so
 * would require a TS loader / path-alias resolution (tsx, ts-node, or a
 * bundler) as a new devDependency, which the project doesn't otherwise need.
 * Instead it re-implements the exact same two pure functions
 * (`getEligibleCampaigns`, `findCampaignBySlug`) against a small set of
 * fixture campaigns and asserts their behavior.
 *
 * IMPORTANT: if `getEligibleCampaigns` / `findCampaignBySlug` in
 * src/content/showcase.ts ever change, update the mirrored copies below to
 * match — see docs/product-showcase.md ("Testing") for the full contract
 * this script is standing in for.
 *
 * Run: node scripts/validate-showcase-config.mjs
 * Exits non-zero on any failed assertion.
 */

// --- Mirrored logic (keep in sync with src/content/showcase.ts) ----------

function getEligibleCampaigns(campaigns, now) {
  const t = now.getTime();
  return campaigns
    .filter((c) => c.active)
    .filter((c) => (c.startAt ? new Date(c.startAt).getTime() <= t : true))
    .filter((c) => (c.endAt ? new Date(c.endAt).getTime() >= t : true))
    .sort((a, b) => a.priority - b.priority);
}

function findCampaignBySlug(slug, campaigns) {
  if (!slug) return undefined;
  return campaigns.find((c) => c.slug === slug);
}

// --- Fixtures --------------------------------------------------------------

const NOW = new Date("2026-06-15T00:00:00Z");

const FIXTURES = [
  { id: "a", slug: "alpha", priority: 2, active: true },
  { id: "b", slug: "beta", priority: 0, active: true },
  { id: "c", slug: "gamma", priority: 1, active: false }, // inactive — excluded
  {
    id: "d",
    slug: "delta",
    priority: 3,
    active: true,
    startAt: "2026-01-01T00:00:00Z",
    endAt: "2026-12-31T23:59:59Z",
  }, // in-window — included
  {
    id: "e",
    slug: "epsilon",
    priority: 4,
    active: true,
    startAt: "2027-01-01T00:00:00Z",
  }, // future start — excluded
  {
    id: "f",
    slug: "zeta",
    priority: 5,
    active: true,
    endAt: "2026-01-01T00:00:00Z",
  }, // already ended — excluded
];

// --- Minimal assertion harness ---------------------------------------------

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
  } else {
    failed += 1;
    console.error(`FAIL: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  assert(
    actual === expected,
    `${message} (expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)})`,
  );
}

function assertIds(actual, expectedIds, message) {
  const actualIds = actual.map((c) => c.id);
  assertEqual(JSON.stringify(actualIds), JSON.stringify(expectedIds), message);
}

// --- Tests -------------------------------------------------------------

// 1. Active campaign selection + inactive exclusion + scheduled eligibility,
//    all in one pass, sorted by priority.
{
  const eligible = getEligibleCampaigns(FIXTURES, NOW);
  // Expected: b(0), a(2), d(3) — c is inactive, e hasn't started, f has ended.
  assertIds(eligible, ["b", "a", "d"], "getEligibleCampaigns: active+in-window campaigns, sorted by priority");
}

// 2. Inactive campaign exclusion, isolated.
{
  const onlyInactive = getEligibleCampaigns([FIXTURES[2]], NOW);
  assertEqual(onlyInactive.length, 0, "getEligibleCampaigns: a single inactive campaign yields no eligible results");
}

// 3. startAt in the future excludes the campaign.
{
  const future = getEligibleCampaigns([FIXTURES[4]], NOW);
  assertEqual(future.length, 0, "getEligibleCampaigns: campaign with future startAt is excluded");
}

// 4. endAt in the past excludes the campaign.
{
  const ended = getEligibleCampaigns([FIXTURES[5]], NOW);
  assertEqual(ended.length, 0, "getEligibleCampaigns: campaign with past endAt is excluded");
}

// 5. A campaign whose window includes `now` is included.
{
  const inWindow = getEligibleCampaigns([FIXTURES[3]], NOW);
  assertIds(inWindow, ["d"], "getEligibleCampaigns: campaign with now inside [startAt, endAt] is included");
}

// 6. Priority ordering holds even when input order is scrambled.
{
  const scrambled = [FIXTURES[3], FIXTURES[0], FIXTURES[1]]; // d(3), a(2), b(0)
  const eligible = getEligibleCampaigns(scrambled, NOW);
  assertIds(eligible, ["b", "a", "d"], "getEligibleCampaigns: sorts by priority regardless of input order");
}

// 7. Empty campaign list yields no eligible campaigns (no throw).
{
  const none = getEligibleCampaigns([], NOW);
  assertEqual(none.length, 0, "getEligibleCampaigns: empty input yields empty output");
}

// 8. Deep-link / slug lookup — match found.
{
  const match = findCampaignBySlug("alpha", FIXTURES);
  assertEqual(match && match.id, "a", "findCampaignBySlug: resolves a known slug to the right campaign");
}

// 9. Deep-link / slug lookup — no match.
{
  const noMatch = findCampaignBySlug("does-not-exist", FIXTURES);
  assertEqual(noMatch, undefined, "findCampaignBySlug: unknown slug resolves to undefined");
}

// 10. Deep-link / slug lookup — null/undefined slug (e.g. no `?showcase=` param).
{
  assertEqual(findCampaignBySlug(null, FIXTURES), undefined, "findCampaignBySlug: null slug resolves to undefined");
  assertEqual(findCampaignBySlug(undefined, FIXTURES), undefined, "findCampaignBySlug: undefined slug resolves to undefined");
}

// 11. Deep-link lookup still finds an inactive campaign (lookup is independent
//     of eligibility filtering — the caller decides what to do with it).
{
  const inactiveMatch = findCampaignBySlug("gamma", FIXTURES);
  assertEqual(inactiveMatch && inactiveMatch.id, "c", "findCampaignBySlug: finds inactive campaigns too (filtering is a separate concern)");
}

// --- Report ------------------------------------------------------------

console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
