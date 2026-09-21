"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MediaUploadField } from "./MediaUploadField";
import { HeroCampaignFormSchema, type HeroCampaignFormValues } from "@/lib/hero/validation";
import type { HeroCampaign, AdminRole } from "@/lib/hero/types";
import { createCampaignAction, updateCampaignAction } from "@/app/admin/(dashboard)/slider/actions";

function toFormValues(c?: HeroCampaign | null): HeroCampaignFormValues {
  if (!c) {
    return HeroCampaignFormSchema.parse({
      slug: "",
      internalName: "",
      headline: "",
      analyticsCampaignId: "",
    });
  }
  return {
    slug: c.slug,
    internalName: c.internalName,
    eyebrow: c.eyebrow,
    headline: c.headline,
    description: c.description,
    primaryCtaLabel: c.primaryCtaLabel,
    primaryCtaHref: c.primaryCtaHref,
    secondaryCtaLabel: c.secondaryCtaLabel,
    secondaryCtaHref: c.secondaryCtaHref,
    mediaType: c.mediaType,
    desktopMediaUrl: c.desktopMediaUrl,
    mobileMediaUrl: c.mobileMediaUrl,
    posterMediaUrl: c.posterMediaUrl,
    altText: c.altText,
    accent: c.accent,
    overlayIntensity: c.overlayIntensity,
    badge: c.badge,
    status: c.status,
    priority: c.priority,
    startAt: c.startAt,
    endAt: c.endAt,
    autoplayEligible: c.autoplayEligible,
    durationMs: c.durationMs,
    analyticsCampaignId: c.analyticsCampaignId,
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a8f8f]/40 focus:border-[#0a8f8f]";
const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";

export function SlideForm({ campaign, role }: { campaign?: HeroCampaign | null; role: AdminRole }) {
  const router = useRouter();
  const [values, setValues] = useState<HeroCampaignFormValues>(toFormValues(campaign));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const canPublish = role === "ADMIN";

  function set<K extends keyof HeroCampaignFormValues>(key: K, value: HeroCampaignFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = HeroCampaignFormSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form for errors.");
      return;
    }
    startTransition(async () => {
      const result = campaign
        ? await updateCampaignAction(campaign.id, parsed.data)
        : await createCampaignAction(parsed.data);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin/slider");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>
      )}

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Basic</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Internal campaign name</label>
            <input
              className={inputClass}
              required
              value={values.internalName}
              onChange={(e) => set("internalName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Slug (used in ?showcase= deep links)</label>
            <input
              className={inputClass}
              required
              pattern="[a-z0-9-]+"
              value={values.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Eyebrow</label>
          <input className={inputClass} value={values.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Headline</label>
          <input className={inputClass} required value={values.headline} onChange={(e) => set("headline", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Supporting copy</label>
          <textarea
            className={inputClass}
            rows={3}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Primary CTA label</label>
            <input className={inputClass} value={values.primaryCtaLabel ?? ""} onChange={(e) => set("primaryCtaLabel", e.target.value || null)} />
          </div>
          <div>
            <label className={labelClass}>Primary CTA URL</label>
            <input className={inputClass} placeholder="/book-demo" value={values.primaryCtaHref ?? ""} onChange={(e) => set("primaryCtaHref", e.target.value || null)} />
          </div>
          <div>
            <label className={labelClass}>Secondary CTA label</label>
            <input className={inputClass} value={values.secondaryCtaLabel ?? ""} onChange={(e) => set("secondaryCtaLabel", e.target.value || null)} />
          </div>
          <div>
            <label className={labelClass}>Secondary CTA URL</label>
            <input className={inputClass} placeholder="/roi-calculator" value={values.secondaryCtaHref ?? ""} onChange={(e) => set("secondaryCtaHref", e.target.value || null)} />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Media</h2>
        <div>
          <label className={labelClass}>Media type</label>
          <select
            className={inputClass}
            value={values.mediaType}
            onChange={(e) => set("mediaType", e.target.value as "image" | "video")}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MediaUploadField
            label="Desktop media"
            kind={values.mediaType}
            value={values.desktopMediaUrl}
            onChange={(url) => set("desktopMediaUrl", url)}
          />
          <MediaUploadField
            label="Mobile media"
            kind={values.mediaType}
            value={values.mobileMediaUrl}
            onChange={(url) => set("mobileMediaUrl", url)}
          />
        </div>
        {values.mediaType === "video" && (
          <MediaUploadField
            label="Poster image (shown before playback)"
            kind="image"
            value={values.posterMediaUrl}
            onChange={(url) => set("posterMediaUrl", url)}
          />
        )}
        <div>
          <label className={labelClass}>Alt text</label>
          <input className={inputClass} value={values.altText} onChange={(e) => set("altText", e.target.value)} />
        </div>
        <p className="text-[12.5px] text-slate-500">
          Leave media empty to use the abstract placeholder frame — never a fabricated screenshot. Recommended:
          1600×1000px (16:10) desktop, 900×1125px (4:5) mobile. See docs/hero-slider.md.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Appearance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Accent</label>
            <select className={inputClass} value={values.accent} onChange={(e) => set("accent", e.target.value as HeroCampaignFormValues["accent"])}>
              <option value="teal">Teal</option>
              <option value="amber">Amber</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Overlay intensity</label>
            <select className={inputClass} value={values.overlayIntensity} onChange={(e) => set("overlayIntensity", e.target.value as HeroCampaignFormValues["overlayIntensity"])}>
              <option value="none">None</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="strong">Strong</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Badge (optional, e.g. &quot;New&quot;)</label>
          <input className={inputClass} value={values.badge ?? ""} onChange={(e) => set("badge", e.target.value || null)} />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Scheduling</h2>
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={values.status}
            onChange={(e) => set("status", e.target.value as HeroCampaignFormValues["status"])}
            disabled={!canPublish && (values.status === "published" || values.status === "paused" || values.status === "archived")}
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            {canPublish && <option value="published">Published</option>}
            {canPublish && <option value="paused">Paused</option>}
          </select>
          {!canPublish && (
            <p className="mt-1.5 text-[12px] text-slate-500">
              Only an Admin can publish. Save as Draft or Scheduled and ask an Admin to publish it.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start (optional, UTC)</label>
            <input
              type="datetime-local"
              className={inputClass}
              value={values.startAt ? values.startAt.slice(0, 16) : ""}
              onChange={(e) => set("startAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
            />
          </div>
          <div>
            <label className={labelClass}>End (optional, UTC)</label>
            <input
              type="datetime-local"
              className={inputClass}
              value={values.endAt ? values.endAt.slice(0, 16) : ""}
              onChange={(e) => set("endAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Behaviour</h2>
        <label className="flex items-center gap-2 text-[13.5px] text-slate-700">
          <input
            type="checkbox"
            checked={values.autoplayEligible}
            onChange={(e) => set("autoplayEligible", e.target.checked)}
          />
          Eligible for autoplay rotation
        </label>
        <div>
          <label className={labelClass}>Slide duration (ms)</label>
          <input
            type="number"
            min={3000}
            max={30000}
            step={500}
            className={inputClass}
            value={values.durationMs}
            onChange={(e) => set("durationMs", Number(e.target.value))}
          />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-[14px] font-semibold text-[#0F1B1D]">Analytics</h2>
        <div>
          <label className={labelClass}>Analytics campaign ID</label>
          <input
            className={inputClass}
            required
            pattern="[a-z0-9_]+"
            placeholder="e.g. command_centre"
            value={values.analyticsCampaignId}
            onChange={(e) => set("analyticsCampaignId", e.target.value)}
          />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0a8f8f] text-white text-[14px] font-medium px-5 py-2.5 hover:bg-[#097a7a] disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {campaign ? "Save changes" : "Create campaign"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/slider")}
          className="text-[14px] text-slate-500 hover:text-slate-700 px-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
