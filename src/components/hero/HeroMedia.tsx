"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { HeroCampaign } from "@/lib/hero/types";
import { HeroPlaceholderMedia } from "./HeroPlaceholderMedia";
import { trackEvent } from "@/lib/analytics";

export function HeroMedia({
  campaign,
  isActive,
  eager,
}: {
  campaign: HeroCampaign;
  isActive: boolean;
  /** True only for the campaign visible on first paint — gets priority loading. */
  eager: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && !prefersReducedMotion) {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser — the poster stays visible.
      });
    } else {
      video.pause();
    }
  }, [isActive, prefersReducedMotion]);

  if (campaign.mediaType === "video") {
    if (!campaign.desktopMediaUrl) {
      return <HeroPlaceholderMedia accent={campaign.accent} label={campaign.internalName} />;
    }
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-top"
          muted
          loop
          playsInline
          preload={eager ? "auto" : "none"}
          poster={campaign.posterMediaUrl ?? undefined}
          onPlay={() =>
            trackEvent("showcase_video_start", {
              campaign_id: campaign.analyticsCampaignId,
              campaign_name: campaign.internalName,
            })
          }
          onEnded={() =>
            trackEvent("showcase_video_complete", {
              campaign_id: campaign.analyticsCampaignId,
              campaign_name: campaign.internalName,
            })
          }
        >
          {isActive && <source src={campaign.desktopMediaUrl} />}
        </video>
      </div>
    );
  }

  if (!campaign.desktopMediaUrl) {
    return <HeroPlaceholderMedia accent={campaign.accent} label={campaign.internalName} />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40">
      {/* Desktop crop */}
      <Image
        src={campaign.desktopMediaUrl}
        alt={campaign.altText || campaign.headline}
        fill
        priority={eager}
        loading={eager ? undefined : "lazy"}
        sizes="(min-width: 1024px) 62vw, 100vw"
        className={campaign.mobileMediaUrl ? "hidden md:block object-cover object-top" : "object-cover object-top"}
      />
      {campaign.mobileMediaUrl && (
        <Image
          src={campaign.mobileMediaUrl}
          alt={campaign.altText || campaign.headline}
          fill
          priority={eager}
          loading={eager ? undefined : "lazy"}
          sizes="100vw"
          className="md:hidden object-cover object-top"
        />
      )}
    </div>
  );
}
