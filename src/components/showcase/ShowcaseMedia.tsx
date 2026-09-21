"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import type { ShowcaseCampaign } from "@/content/types";
import { ShowcasePlaceholder } from "./ShowcasePlaceholder";
import { trackEvent } from "@/lib/analytics";

export function ShowcaseMedia({
  campaign,
  isActive,
  eager,
}: {
  campaign: ShowcaseCampaign;
  isActive: boolean;
  /** True only for the campaign visible on first paint — gets priority loading. */
  eager: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { media } = campaign;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && !prefersReducedMotion) {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser — the poster stays visible, which is fine.
      });
    } else {
      video.pause();
    }
  }, [isActive, prefersReducedMotion]);

  if (media.mediaType === "video") {
    if (!media.desktopSrc) {
      return <ShowcasePlaceholder accent={campaign.accent} label={campaign.navigationLabel} />;
    }
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          loop
          preload={eager ? "auto" : "none"}
          poster={media.poster}
          aria-label={media.alt}
          onPlay={() =>
            trackEvent("showcase_video_start", { campaign_id: campaign.analyticsCampaignId })
          }
          onEnded={() =>
            trackEvent("showcase_video_complete", { campaign_id: campaign.analyticsCampaignId })
          }
        >
          <source src={media.desktopSrc} />
        </video>
      </div>
    );
  }

  if (!media.desktopSrc) {
    return <ShowcasePlaceholder accent={campaign.accent} label={campaign.navigationLabel} />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)]">
      <Image
        src={media.desktopSrc}
        alt={media.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
