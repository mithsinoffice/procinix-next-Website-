"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/primitives/Button";
import type { HeroCampaign, HeroAccent } from "@/lib/hero/types";
import { trackEvent } from "@/lib/analytics";
import { isSafeCtaHref, isExternalHref } from "@/lib/hero/ctaSafety";

const accentText: Record<HeroAccent, string> = {
  teal: "text-[var(--accent-teal-bright)]",
  amber: "text-[var(--accent-amber)]",
  purple: "text-[var(--accent-purple)]",
};

export function HeroSlideContent({ campaign }: { campaign: HeroCampaign }) {
  function fireCtaEvent(ctaType: "primary" | "secondary", destination: string) {
    trackEvent("showcase_cta_click", {
      campaign_id: campaign.analyticsCampaignId,
      campaign_name: campaign.internalName,
      cta_type: ctaType,
      cta_destination: destination,
    });
  }

  const primarySafe = isSafeCtaHref(campaign.primaryCtaHref);
  const secondarySafe = isSafeCtaHref(campaign.secondaryCtaHref);

  return (
    <div
      id={`hero-panel-${campaign.id}`}
      role="tabpanel"
      aria-labelledby={`hero-tab-${campaign.id}`}
      tabIndex={0}
      className="flex flex-col gap-5 lg:gap-6 max-w-xl"
    >
      {campaign.eyebrow && (
        <span className={`text-[11px] uppercase tracking-[0.22em] font-medium ${accentText[campaign.accent]}`}>
          {campaign.eyebrow}
        </span>
      )}

      <h1 className="font-display text-white leading-[1.05] tracking-[-0.02em] text-[36px] sm:text-[48px] lg:text-[52px] xl:text-[58px]">
        {campaign.headline}
      </h1>

      {campaign.description && (
        <p className="text-[15px] sm:text-[17px] text-white/70 leading-[1.6] max-w-lg">{campaign.description}</p>
      )}

      {campaign.badge && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60">
          {campaign.badge}
        </span>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {campaign.primaryCtaLabel && primarySafe && campaign.primaryCtaHref && (
          <ButtonLink
            href={campaign.primaryCtaHref}
            variant="primary"
            size="lg"
            iconAfter={<ArrowRight className="h-4 w-4" />}
            onClick={() => fireCtaEvent("primary", campaign.primaryCtaHref!)}
            target={isExternalHref(campaign.primaryCtaHref) ? "_blank" : undefined}
          >
            {campaign.primaryCtaLabel}
          </ButtonLink>
        )}
        {campaign.secondaryCtaLabel && secondarySafe && campaign.secondaryCtaHref && (
          <ButtonLink
            href={campaign.secondaryCtaHref}
            variant="secondary"
            size="lg"
            onClick={() => fireCtaEvent("secondary", campaign.secondaryCtaHref!)}
            target={isExternalHref(campaign.secondaryCtaHref) ? "_blank" : undefined}
          >
            {campaign.secondaryCtaLabel}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
