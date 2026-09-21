import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { sql, isDatabaseConfigured } from "@/lib/db/client";
import { EVERGREEN_FALLBACK_CAMPAIGNS } from "./fallback.ts";
import { getEligibleCampaigns } from "./eligibility.ts";
import type { HeroCampaign, HeroCampaignInput, HeroStatus } from "./types.ts";

const CAMPAIGNS_TAG = "hero-campaigns";
/** Safety-net revalidation window; every mutation also calls
 *  revalidateTag(CAMPAIGNS_TAG) directly for near-instant updates. */
const REVALIDATE_SECONDS = 60;

// --- row <-> domain mapping -------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToCampaign(row: any): HeroCampaign {
  return {
    id: row.id,
    slug: row.slug,
    internalName: row.internal_name,
    eyebrow: row.eyebrow,
    headline: row.headline,
    description: row.description,
    primaryCtaLabel: row.primary_cta_label,
    primaryCtaHref: row.primary_cta_href,
    secondaryCtaLabel: row.secondary_cta_label,
    secondaryCtaHref: row.secondary_cta_href,
    mediaType: row.media_type,
    desktopMediaUrl: row.desktop_media_url,
    mobileMediaUrl: row.mobile_media_url,
    posterMediaUrl: row.poster_media_url,
    altText: row.alt_text,
    accent: row.accent,
    overlayIntensity: row.overlay_intensity,
    badge: row.badge,
    status: row.status,
    priority: row.priority,
    startAt: row.start_at ? new Date(row.start_at).toISOString() : null,
    endAt: row.end_at ? new Date(row.end_at).toISOString() : null,
    autoplayEligible: row.autoplay_eligible,
    durationMs: row.duration_ms,
    analyticsCampaignId: row.analytics_campaign_id,
    isEvergreenFallback: row.is_evergreen_fallback,
    createdAt: new Date(row.created_at).toISOString(),
    createdBy: row.created_by,
    updatedAt: new Date(row.updated_at).toISOString(),
    updatedBy: row.updated_by,
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
    version: row.version,
  };
}

// --- public read (homepage) --------------------------------------------

async function fetchPublishedCampaignsFromDb(): Promise<HeroCampaign[]> {
  if (!sql) return [];
  const rows = await sql`
    SELECT * FROM hero_campaigns
    WHERE status = 'published'
    ORDER BY priority ASC
  `;
  return rows.map(rowToCampaign);
}

const cachedFetchPublished = unstable_cache(fetchPublishedCampaignsFromDb, ["hero-campaigns-published"], {
  tags: [CAMPAIGNS_TAG],
  revalidate: REVALIDATE_SECONDS,
});

/**
 * The single entry point the public homepage uses. Never throws and never
 * returns an empty array: on a missing DATABASE_URL, a query failure, or
 * zero eligible campaigns, it safely returns the evergreen brand hero (see
 * src/lib/hero/fallback.ts) so the homepage is never blank or broken.
 */
export async function getPublicHeroCampaigns(now: Date = new Date()): Promise<HeroCampaign[]> {
  if (!isDatabaseConfigured()) {
    return EVERGREEN_FALLBACK_CAMPAIGNS;
  }
  try {
    const published = await cachedFetchPublished();
    const eligible = getEligibleCampaigns(published, now);
    return eligible.length > 0 ? eligible : EVERGREEN_FALLBACK_CAMPAIGNS;
  } catch (err) {
    console.error("getPublicHeroCampaigns: falling back to evergreen hero", err);
    return EVERGREEN_FALLBACK_CAMPAIGNS;
  }
}

function requireDb(): NonNullable<typeof sql> {
  if (!sql) {
    throw new Error(
      "DATABASE_URL is not configured — the Homepage Slider admin cannot read or write campaigns until a database is provisioned. See docs/hero-slider.md.",
    );
  }
  return sql;
}

// --- admin read ----------------------------------------------------------

/** All campaigns, every status, for the admin Homepage Slider list. */
export async function listAllCampaigns(): Promise<HeroCampaign[]> {
  const db = requireDb();
  const rows = await db`SELECT * FROM hero_campaigns ORDER BY priority ASC, created_at ASC`;
  return rows.map(rowToCampaign);
}

export async function getCampaignById(id: string): Promise<HeroCampaign | null> {
  const db = requireDb();
  const rows = await db`SELECT * FROM hero_campaigns WHERE id = ${id} LIMIT 1`;
  return rows.length > 0 ? rowToCampaign(rows[0]) : null;
}

export async function getCampaignBySlug(slug: string): Promise<HeroCampaign | null> {
  const db = requireDb();
  const rows = await db`SELECT * FROM hero_campaigns WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0 ? rowToCampaign(rows[0]) : null;
}

// --- admin writes ---------------------------------------------------------

function touchCache() {
  revalidateTag(CAMPAIGNS_TAG);
}

export async function createCampaign(input: HeroCampaignInput, actorEmail: string): Promise<HeroCampaign> {
  const db = requireDb();
  const rows = await db`
    INSERT INTO hero_campaigns (
      slug, internal_name, eyebrow, headline, description,
      primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href,
      media_type, desktop_media_url, mobile_media_url, poster_media_url, alt_text,
      accent, overlay_intensity, badge, status, priority, start_at, end_at,
      autoplay_eligible, duration_ms, analytics_campaign_id, created_by, updated_by,
      published_at
    ) VALUES (
      ${input.slug}, ${input.internalName}, ${input.eyebrow}, ${input.headline}, ${input.description},
      ${input.primaryCtaLabel}, ${input.primaryCtaHref}, ${input.secondaryCtaLabel}, ${input.secondaryCtaHref},
      ${input.mediaType}, ${input.desktopMediaUrl}, ${input.mobileMediaUrl}, ${input.posterMediaUrl}, ${input.altText},
      ${input.accent}, ${input.overlayIntensity}, ${input.badge}, ${input.status}, ${input.priority},
      ${input.startAt}, ${input.endAt}, ${input.autoplayEligible}, ${input.durationMs}, ${input.analyticsCampaignId},
      ${actorEmail}, ${actorEmail},
      ${input.status === "published" ? new Date().toISOString() : null}
    )
    RETURNING *
  `;
  touchCache();
  return rowToCampaign(rows[0]);
}

export async function updateCampaign(
  id: string,
  input: HeroCampaignInput,
  actorEmail: string,
): Promise<HeroCampaign> {
  const db = requireDb();
  const existing = await getCampaignById(id);
  if (!existing) throw new Error(`Campaign ${id} not found`);

  const publishedAt =
    input.status === "published" && existing.status !== "published"
      ? new Date().toISOString()
      : existing.publishedAt;

  const rows = await db`
    UPDATE hero_campaigns SET
      slug = ${input.slug},
      internal_name = ${input.internalName},
      eyebrow = ${input.eyebrow},
      headline = ${input.headline},
      description = ${input.description},
      primary_cta_label = ${input.primaryCtaLabel},
      primary_cta_href = ${input.primaryCtaHref},
      secondary_cta_label = ${input.secondaryCtaLabel},
      secondary_cta_href = ${input.secondaryCtaHref},
      media_type = ${input.mediaType},
      desktop_media_url = ${input.desktopMediaUrl},
      mobile_media_url = ${input.mobileMediaUrl},
      poster_media_url = ${input.posterMediaUrl},
      alt_text = ${input.altText},
      accent = ${input.accent},
      overlay_intensity = ${input.overlayIntensity},
      badge = ${input.badge},
      status = ${input.status},
      priority = ${input.priority},
      start_at = ${input.startAt},
      end_at = ${input.endAt},
      autoplay_eligible = ${input.autoplayEligible},
      duration_ms = ${input.durationMs},
      analytics_campaign_id = ${input.analyticsCampaignId},
      updated_by = ${actorEmail},
      updated_at = now(),
      published_at = ${publishedAt},
      version = version + 1
    WHERE id = ${id}
    RETURNING *
  `;
  touchCache();
  return rowToCampaign(rows[0]);
}

export async function setCampaignStatus(
  id: string,
  status: HeroStatus,
  actorEmail: string,
): Promise<HeroCampaign> {
  const db = requireDb();
  const existing = await getCampaignById(id);
  if (!existing) throw new Error(`Campaign ${id} not found`);
  if (existing.isEvergreenFallback && status === "archived") {
    throw new Error("The evergreen fallback campaign cannot be archived — it is the site's safety net.");
  }
  const publishedAt =
    status === "published" && existing.status !== "published" ? new Date().toISOString() : existing.publishedAt;
  const rows = await db`
    UPDATE hero_campaigns
    SET status = ${status}, updated_by = ${actorEmail}, updated_at = now(),
        published_at = ${publishedAt}, version = version + 1
    WHERE id = ${id}
    RETURNING *
  `;
  touchCache();
  return rowToCampaign(rows[0]);
}

/** Persists a new priority ordering. `orderedIds` is the full, final order. */
export async function reorderCampaigns(orderedIds: string[], actorEmail: string): Promise<void> {
  const db = requireDb();
  // Single statement using a VALUES list keeps the reorder atomic — no
  // partial ordering can be observed by a concurrent reader mid-update.
  await db`
    UPDATE hero_campaigns AS c
    SET priority = v.priority, updated_by = ${actorEmail}, updated_at = now()
    FROM (
      SELECT * FROM unnest(${orderedIds}::uuid[], ${orderedIds.map((_, i) => i)}::int[]) AS t(id, priority)
    ) AS v
    WHERE c.id = v.id
  `;
  touchCache();
}

export async function deleteCampaignPermanently(id: string): Promise<void> {
  // Hard delete is intentionally not exposed to the admin UI — "archive"
  // (setCampaignStatus(id, "archived")) is the supported removal path so
  // published content always has a soft-delete trail (see spec section 14).
  const db = requireDb();
  await db`DELETE FROM hero_campaigns WHERE id = ${id} AND status = 'archived'`;
  touchCache();
}
