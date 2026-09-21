import { CORE_ROUTES } from "@/lib/routes";
import type { HeroCampaign } from "./types.ts";

/**
 * The evergreen brand hero — Procinix's core "Don't change your business to
 * fit software." positioning, preserved verbatim from the previous static
 * hero (src/components/sections/Hero.tsx, now retired).
 *
 * This is the homepage's safety net, not just a starting seed record:
 * - scripts/db/migrate.mjs seeds it into `hero_campaigns` as a real,
 *   admin-editable, published record (priority 0) so it appears first and
 *   can be reordered, temporarily replaced, or edited like any campaign.
 * - src/lib/hero/data.ts's getPublicHeroCampaigns() also returns this exact
 *   constant directly — bypassing the database entirely — whenever
 *   DATABASE_URL isn't configured yet, the query fails, or zero campaigns
 *   come back eligible. The public homepage can never render a blank or
 *   broken hero.
 *
 * Keep this constant and the seed row in scripts/db/migrate.mjs in sync if
 * the brand positioning ever changes.
 */
export const EVERGREEN_FALLBACK_CAMPAIGN: HeroCampaign = {
  id: "evergreen-fallback",
  slug: "brand",
  internalName: "Brand / Evergreen — Don't change your business to fit software.",
  eyebrow: "Automation & Beyond",
  headline: "Don't change your business to fit software.",
  description:
    "A unified finance operations platform that goes beyond automation — combining agentic AI, intelligent workflows, and real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report.",
  primaryCtaLabel: "Book a Demo",
  primaryCtaHref: CORE_ROUTES.bookDemo.path,
  secondaryCtaLabel: "Launch Value Assessment",
  secondaryCtaHref: CORE_ROUTES.roi.path,
  mediaType: "image",
  desktopMediaUrl: null,
  mobileMediaUrl: null,
  posterMediaUrl: null,
  altText: "Procinix finance operations platform — Source-to-Pay, Order-to-Cash, and Record-to-Report unified on one command centre.",
  accent: "teal",
  overlayIntensity: "medium",
  badge: null,
  status: "published",
  priority: 0,
  startAt: null,
  endAt: null,
  autoplayEligible: true,
  durationMs: 8000,
  analyticsCampaignId: "brand_evergreen",
  isEvergreenFallback: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  createdBy: null,
  updatedAt: "2026-01-01T00:00:00.000Z",
  updatedBy: null,
  publishedAt: "2026-01-01T00:00:00.000Z",
  version: 1,
};

export const EVERGREEN_FALLBACK_CAMPAIGNS: HeroCampaign[] = [EVERGREEN_FALLBACK_CAMPAIGN];
