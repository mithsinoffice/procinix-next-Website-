import type { HeroCampaign } from "./types.ts";

/**
 * A campaign is eligible to render publicly when it is `published` and, if
 * a scheduling window is set, `now` falls inside [startAt, endAt] (both
 * optional, compared as UTC instants). `scheduled`/`paused`/`draft`/
 * `archived` campaigns are never publicly eligible regardless of window —
 * an admin must explicitly publish a campaign for its schedule to take
 * effect (see docs/hero-slider.md, "Publishing workflow").
 */
export function isEligible(campaign: HeroCampaign, now: Date): boolean {
  if (campaign.status !== "published") return false;
  const t = now.getTime();
  if (campaign.startAt && new Date(campaign.startAt).getTime() > t) return false;
  if (campaign.endAt && new Date(campaign.endAt).getTime() < t) return false;
  return true;
}

/** Eligible campaigns, sorted by ascending priority (lower shows first). */
export function getEligibleCampaigns(campaigns: HeroCampaign[], now: Date = new Date()): HeroCampaign[] {
  return campaigns.filter((c) => isEligible(c, now)).sort((a, b) => a.priority - b.priority);
}

/**
 * Resolves a `?showcase=<slug>` deep link against a list of *eligible*
 * campaigns only — an inactive or unknown slug must never be reachable via
 * a public URL, so lookups are scoped to what's already eligible, unlike
 * the previous implementation's unscoped lookup. Returns undefined (safe
 * fallback to the first eligible campaign) when there's no match.
 */
export function findEligibleCampaignBySlug(
  slug: string | null | undefined,
  eligibleCampaigns: HeroCampaign[],
): HeroCampaign | undefined {
  if (!slug) return undefined;
  return eligibleCampaigns.find((c) => c.slug === slug);
}
