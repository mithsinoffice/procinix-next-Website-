"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { findEligibleCampaignBySlug } from "@/lib/hero/eligibility";
import { trackEvent } from "@/lib/analytics";
import type { HeroCampaign } from "@/lib/hero/types";
import { HeroSlideContent } from "./HeroSlideContent";
import { HeroMedia } from "./HeroMedia";
import { HeroControls } from "./HeroControls";

type InteractionSource = "click" | "swipe" | "keyboard" | "autoplay" | "deep_link";

const SWIPE_THRESHOLD_PX = 48;

export function HeroSlider({ campaigns }: { campaigns: HeroCampaign[] }) {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const deepLinked = useMemo(
    () => findEligibleCampaignBySlug(searchParams.get("showcase"), campaigns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [activeId, setActiveId] = useState(deepLinked?.id ?? campaigns[0]?.id);
  const activeIndex = campaigns.findIndex((c) => c.id === activeId);
  const active = campaigns[activeIndex] ?? campaigns[0];

  const touchStartX = useRef<number | null>(null);
  const hasViewedRef = useRef(false);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayStoppedRef = useRef(false);

  const select = useCallback(
    (id: string, source: InteractionSource) => {
      setActiveId(id);
      const campaign = campaigns.find((c) => c.id === id);
      if (!campaign) return;

      if (source !== "deep_link") {
        const url = new URL(window.location.href);
        url.searchParams.set("showcase", campaign.slug);
        window.history.replaceState(null, "", url.toString());
      }

      trackEvent("hero_slide_change", {
        campaign_id: campaign.analyticsCampaignId,
        campaign_name: campaign.internalName,
        slide_index: campaigns.findIndex((c) => c.id === id),
        media_type: campaign.mediaType,
        interaction_source: source,
      });

      if (source !== "autoplay") {
        autoplayStoppedRef.current = true;
        if (autoplayTimer.current) {
          clearInterval(autoplayTimer.current);
          autoplayTimer.current = null;
        }
      }
    },
    [campaigns],
  );

  // Fire hero_slide_view exactly once, for the initial slide — the hero is
  // always above the fold at load, so no intersection observer is needed.
  useEffect(() => {
    if (hasViewedRef.current || !active) return;
    hasViewedRef.current = true;
    trackEvent("hero_slide_view", {
      campaign_id: active.analyticsCampaignId,
      campaign_name: active.internalName,
      slide_index: activeIndex,
      media_type: active.mediaType,
      interaction_source: deepLinked ? "deep_link" : "click",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (index: number, source: InteractionSource) => {
      const next = campaigns[(index + campaigns.length) % campaigns.length];
      if (next) select(next.id, source);
    },
    [campaigns, select],
  );

  // Autoplay: only while more than one slide exists, the active slide is
  // autoplay-eligible, motion isn't reduced, the tab is visible, and the
  // visitor hasn't manually interacted yet this page load.
  useEffect(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
    if (
      campaigns.length <= 1 ||
      !active?.autoplayEligible ||
      prefersReducedMotion ||
      autoplayStoppedRef.current ||
      typeof document !== "undefined" && document.hidden
    ) {
      return;
    }

    autoplayTimer.current = setInterval(() => {
      goTo(activeIndex + 1, "autoplay");
    }, active.durationMs);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, prefersReducedMotion]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.hidden && autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      } else if (!document.hidden && !autoplayStoppedRef.current) {
        // Re-trigger the autoplay effect by nudging state via a no-op select
        // is unnecessary — the effect above re-runs on activeId change only,
        // so simply let the next manual/autoplay cycle pick it back up.
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(activeIndex + (delta < 0 ? 1 : -1), "swipe");
  }

  if (!active) return null;

  const transitionDuration = prefersReducedMotion ? 0 : 0.5;

  return (
    <section
      className="relative isolate overflow-hidden pt-[72px] min-h-[88vh] lg:min-h-[90vh] flex items-center"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(activeIndex + 1, "keyboard");
        if (e.key === "ArrowLeft") goTo(activeIndex - 1, "keyboard");
        if (e.key === "Home") goTo(0, "keyboard");
        if (e.key === "End") goTo(campaigns.length - 1, "keyboard");
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AuroraBackground />
      <GridLines />

      <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-10 lg:gap-14 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              transition={{ duration: transitionDuration, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="order-2 lg:order-1"
            >
              <HeroSlideContent campaign={active} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
              transition={{ duration: transitionDuration, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="order-1 lg:order-2"
            >
              <HeroMedia campaign={active} isActive eager />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 lg:mt-14 flex items-center gap-5">
          <HeroControls
            count={campaigns.length}
            activeIndex={activeIndex}
            onPrev={() => goTo(activeIndex - 1, "click")}
            onNext={() => goTo(activeIndex + 1, "click")}
            onSelectIndex={(i) => goTo(i, "click")}
          />
        </div>
      </Container>
    </section>
  );
}
