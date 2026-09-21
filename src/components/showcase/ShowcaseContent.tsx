"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { ButtonLink } from "@/components/primitives/Button";
import type { ShowcaseCampaign, ShowcaseAccent } from "@/content/types";
import { trackEvent } from "@/lib/analytics";

const accentText: Record<ShowcaseAccent, string> = {
  teal: "text-[var(--accent-teal-bright)]",
  amber: "text-[var(--accent-amber)]",
  purple: "text-[var(--accent-purple)]",
};

export function ShowcaseContent({ campaign }: { campaign: ShowcaseCampaign }) {
  function fireCtaEvent(ctaType: "primary" | "secondary", destination: string) {
    trackEvent("showcase_cta_click", {
      campaign_id: campaign.analyticsCampaignId,
      campaign_name: campaign.navigationLabel,
      cta_type: ctaType,
      cta_destination: destination,
    });
  }

  return (
    <div
      id={`showcase-panel-${campaign.id}`}
      role="tabpanel"
      aria-labelledby={`showcase-tab-${campaign.id}`}
      tabIndex={0}
      className="flex flex-col gap-5"
    >
      <span className={`text-[11px] uppercase tracking-[0.22em] font-medium ${accentText[campaign.accent]}`}>
        {campaign.eyebrow}
      </span>

      <h3 className="font-display text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.1] tracking-[-0.02em] text-white">
        {campaign.headline}
      </h3>

      <p className="text-[15px] lg:text-[16px] text-white/65 leading-[1.65] max-w-[46ch]">
        {campaign.description}
      </p>

      {campaign.badges && campaign.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {campaign.badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/55"
            >
              <Calendar className="h-3 w-3" />
              {b}
            </span>
          ))}
        </div>
      )}

      {campaign.metrics && campaign.metrics.length > 0 && (
        <div className="flex flex-wrap gap-6 pt-1">
          {campaign.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-[26px] text-white leading-none">{m.value}</div>
              <div className="text-[11.5px] text-white/45 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <ButtonLink
          href={campaign.primaryCta.href}
          variant="primary"
          size="lg"
          iconAfter={<ArrowRight className="h-4 w-4" />}
          onClick={() => fireCtaEvent("primary", campaign.primaryCta.href)}
        >
          {campaign.primaryCta.label}
        </ButtonLink>
        {campaign.secondaryCta && (
          (() => {
            const secondaryCta = campaign.secondaryCta!;
            return (
              <ButtonLink
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                onClick={() => fireCtaEvent("secondary", secondaryCta.href)}
              >
                {secondaryCta.label}
              </ButtonLink>
            );
          })()
        )}
      </div>
    </div>
  );
}
