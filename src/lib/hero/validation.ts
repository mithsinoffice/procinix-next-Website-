import { z } from "zod";
import { isSafeCtaHref } from "./ctaSafety.ts";
import { ALLOWED_MEDIA_TYPES } from "./mediaValidation.ts";

const safeHref = z
  .string()
  .max(500)
  .refine((v) => v.length === 0 || isSafeCtaHref(v), {
    message: "Must be a relative path (e.g. /platform) or an https:// URL.",
  });

const mediaUrl = z
  .string()
  .max(1000)
  .refine((v) => v.length === 0 || v.startsWith("/") || (() => {
    try {
      const u = new URL(v);
      return u.protocol === "https:";
    } catch {
      return false;
    }
  })(), { message: "Must be an https:// URL (or empty to use the placeholder)." });

export const HeroCampaignFormSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only."),
  internalName: z.string().min(1).max(200),
  eyebrow: z.string().max(80).default(""),
  headline: z.string().min(1).max(200),
  description: z.string().max(600).default(""),
  primaryCtaLabel: z.string().max(60).nullable().default(null),
  primaryCtaHref: safeHref.nullable().default(null),
  secondaryCtaLabel: z.string().max(60).nullable().default(null),
  secondaryCtaHref: safeHref.nullable().default(null),
  mediaType: z.enum(["image", "video"]).default("image"),
  desktopMediaUrl: mediaUrl.nullable().default(null),
  mobileMediaUrl: mediaUrl.nullable().default(null),
  posterMediaUrl: mediaUrl.nullable().default(null),
  altText: z.string().max(300).default(""),
  accent: z.enum(["teal", "amber", "purple"]).default("teal"),
  overlayIntensity: z.enum(["none", "light", "medium", "strong"]).default("medium"),
  badge: z.string().max(40).nullable().default(null),
  status: z.enum(["draft", "scheduled", "published", "paused", "archived"]).default("draft"),
  priority: z.number().int().min(0).max(1000).default(0),
  startAt: z.string().datetime().nullable().default(null),
  endAt: z.string().datetime().nullable().default(null),
  autoplayEligible: z.boolean().default(true),
  durationMs: z.number().int().min(3000).max(30000).default(8000),
  analyticsCampaignId: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers, and underscores only."),
});

export type HeroCampaignFormValues = z.infer<typeof HeroCampaignFormSchema>;

export { ALLOWED_MEDIA_TYPES };
