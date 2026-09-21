"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { HeroCampaignFormSchema } from "@/lib/hero/validation";
import {
  createCampaign,
  updateCampaign,
  setCampaignStatus,
  reorderCampaigns,
  getCampaignById,
} from "@/lib/hero/data";
import { writeAuditLog } from "@/lib/audit";
import type { HeroCampaignInput, HeroStatus } from "@/lib/hero/types";
import { UserFacingError, toActionErrorMessage } from "@/lib/errors";

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * CONTENT_EDITOR can create and edit campaigns, but only as draft or
 * scheduled — publishing (and unpublishing/pausing/archiving/reordering)
 * requires ADMIN. This is enforced here, not just hidden in the UI.
 */
function assertEditableStatus(status: HeroStatus, role: "ADMIN" | "CONTENT_EDITOR") {
  if (role === "ADMIN") return;
  if (status === "published" || status === "paused" || status === "archived") {
    throw new UserFacingError("Only an Admin can publish, pause, or archive a campaign. Save as Draft or Scheduled and ask an Admin to publish it.");
  }
}

function toInput(values: ReturnType<typeof HeroCampaignFormSchema.parse>): HeroCampaignInput {
  return {
    slug: values.slug,
    internalName: values.internalName,
    eyebrow: values.eyebrow,
    headline: values.headline,
    description: values.description,
    primaryCtaLabel: values.primaryCtaLabel,
    primaryCtaHref: values.primaryCtaHref,
    secondaryCtaLabel: values.secondaryCtaLabel,
    secondaryCtaHref: values.secondaryCtaHref,
    mediaType: values.mediaType,
    desktopMediaUrl: values.desktopMediaUrl,
    mobileMediaUrl: values.mobileMediaUrl,
    posterMediaUrl: values.posterMediaUrl,
    altText: values.altText,
    accent: values.accent,
    overlayIntensity: values.overlayIntensity,
    badge: values.badge,
    status: values.status,
    priority: values.priority,
    startAt: values.startAt,
    endAt: values.endAt,
    autoplayEligible: values.autoplayEligible,
    durationMs: values.durationMs,
    analyticsCampaignId: values.analyticsCampaignId,
  };
}

export async function createCampaignAction(formValues: unknown): Promise<ActionResult> {
  try {
    const session = await requireRole("ADMIN", "CONTENT_EDITOR");
    const parsed = HeroCampaignFormSchema.parse(formValues);
    assertEditableStatus(parsed.status, session.role);
    const created = await createCampaign(toInput(parsed), session.email);
    await writeAuditLog({
      actorEmail: session.email,
      action: "create",
      campaignId: created.id,
      campaignSlug: created.slug,
      changeSummary: `Created "${created.internalName}" (status: ${created.status})`,
    });
    revalidatePath("/admin/slider");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "createCampaignAction") };
  }
}

export async function updateCampaignAction(id: string, formValues: unknown): Promise<ActionResult> {
  try {
    const session = await requireRole("ADMIN", "CONTENT_EDITOR");
    const parsed = HeroCampaignFormSchema.parse(formValues);
    assertEditableStatus(parsed.status, session.role);
    const before = await getCampaignById(id);
    const updated = await updateCampaign(id, toInput(parsed), session.email);
    await writeAuditLog({
      actorEmail: session.email,
      action: "update",
      campaignId: updated.id,
      campaignSlug: updated.slug,
      changeSummary: `Updated "${updated.internalName}"${before && before.status !== updated.status ? ` (status: ${before.status} → ${updated.status})` : ""}`,
    });
    revalidatePath("/admin/slider");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "updateCampaignAction") };
  }
}

async function transitionStatus(id: string, status: HeroStatus, action: "publish" | "unpublish" | "pause" | "archive") {
  const session = await requireRole("ADMIN");
  const campaign = await setCampaignStatus(id, status, session.email);
  await writeAuditLog({
    actorEmail: session.email,
    action,
    campaignId: campaign.id,
    campaignSlug: campaign.slug,
    changeSummary: `${action[0].toUpperCase()}${action.slice(1)}ed "${campaign.internalName}"`,
  });
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

export async function publishCampaignAction(id: string): Promise<ActionResult> {
  try {
    await transitionStatus(id, "published", "publish");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "publishCampaignAction") };
  }
}

export async function unpublishCampaignAction(id: string): Promise<ActionResult> {
  try {
    await transitionStatus(id, "paused", "unpublish");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "unpublishCampaignAction") };
  }
}

export async function archiveCampaignAction(id: string): Promise<ActionResult> {
  try {
    await transitionStatus(id, "archived", "archive");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "archiveCampaignAction") };
  }
}

export async function reorderCampaignsAction(orderedIds: string[]): Promise<ActionResult> {
  try {
    const session = await requireRole("ADMIN");
    await reorderCampaigns(orderedIds, session.email);
    await writeAuditLog({
      actorEmail: session.email,
      action: "reorder",
      changeSummary: `Reordered ${orderedIds.length} campaign(s)`,
    });
    revalidatePath("/admin/slider");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "reorderCampaignsAction") };
  }
}

export async function duplicateCampaignAction(id: string): Promise<ActionResult> {
  try {
    const session = await requireRole("ADMIN", "CONTENT_EDITOR");
    const source = await getCampaignById(id);
    if (!source) return { ok: false, error: "Campaign not found." };
    const copySlug = `${source.slug}-copy-${Date.now().toString(36)}`;
    const created = await createCampaign(
      {
        ...source,
        slug: copySlug,
        internalName: `${source.internalName} (copy)`,
        status: "draft",
      },
      session.email,
    );
    await writeAuditLog({
      actorEmail: session.email,
      action: "create",
      campaignId: created.id,
      campaignSlug: created.slug,
      changeSummary: `Duplicated "${source.internalName}" as a new draft`,
    });
    revalidatePath("/admin/slider");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: toActionErrorMessage(err, "duplicateCampaignAction") };
  }
}
