export type HeroAccent = "teal" | "amber" | "purple";
export type HeroMediaType = "image" | "video";
export type HeroOverlayIntensity = "none" | "light" | "medium" | "strong";
export type HeroStatus = "draft" | "scheduled" | "published" | "paused" | "archived";
export type AdminRole = "ADMIN" | "CONTENT_EDITOR";

/**
 * A single hero campaign slide, as stored in `hero_campaigns` and rendered
 * by the public homepage slider and the admin Homepage Slider screens.
 *
 * See src/lib/db/schema.sql for the persistent shape this mirrors, and
 * docs/hero-slider.md for the full field-by-field authoring guide.
 */
export type HeroCampaign = {
  id: string;
  slug: string;
  internalName: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaLabel: string | null;
  primaryCtaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  mediaType: HeroMediaType;
  desktopMediaUrl: string | null;
  mobileMediaUrl: string | null;
  posterMediaUrl: string | null;
  altText: string;
  accent: HeroAccent;
  overlayIntensity: HeroOverlayIntensity;
  badge: string | null;
  status: HeroStatus;
  priority: number;
  startAt: string | null; // ISO 8601, UTC
  endAt: string | null; // ISO 8601, UTC
  autoplayEligible: boolean;
  durationMs: number;
  analyticsCampaignId: string;
  isEvergreenFallback: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  publishedAt: string | null;
  version: number;
};

/** Fields an admin can set when creating or editing a campaign. */
export type HeroCampaignInput = Omit<
  HeroCampaign,
  "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "publishedAt" | "version" | "isEvergreenFallback"
>;

export type AuditAction =
  | "create"
  | "update"
  | "publish"
  | "unpublish"
  | "pause"
  | "schedule"
  | "reorder"
  | "archive"
  | "media_replace";

export type AuditEntry = {
  id: string;
  actorEmail: string;
  action: AuditAction;
  campaignId: string | null;
  campaignSlug: string | null;
  changeSummary: string | null;
  createdAt: string;
};
