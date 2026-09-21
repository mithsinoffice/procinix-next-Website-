"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { getEligibleCampaigns, findCampaignBySlug } from "@/content/showcase";
import { ShowcaseNavigation } from "./ShowcaseNavigation";
import { ShowcaseContent } from "./ShowcaseContent";
import { ShowcaseMedia } from "./ShowcaseMedia";
import { trackEvent } from "@/lib/analytics";

export function ProductShowcaseInner() {
  const searchParams = useSearchParams();
  // Computed once per mount: stable between the server render and the
  // client hydration pass, so a date-based filter can't cause a hydration
  // mismatch — see docs/product-showcase.md.
  const campaigns = useMemo(() => getEligibleCampaigns(), []);

  const initialId = useMemo(() => {
    const fromUrl = findCampaignBySlug(searchParams.get("showcase"), campaigns);
    return (fromUrl ?? campaigns[0])?.id;
  }, [searchParams, campaigns]);

  const [activeId, setActiveId] = useState(initialId);
  const active = campaigns.find((c) => c.id === activeId) ?? campaigns[0];
  const activeIndex = campaigns.findIndex((c) => c.id === active?.id);

  const hasFiredView = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const { ref: viewRef, inView } = useInView({ threshold: 0.4, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasFiredView.current) {
      hasFiredView.current = true;
      trackEvent("showcase_view", { campaign_id: activeRef.current?.analyticsCampaignId });
    }
  }, [inView]);

  const selectCampaign = useCallback(
    (id: string, source: "click" | "keyboard" | "swipe" | "deep_link") => {
      const target = campaigns.find((c) => c.id === id);
      if (!target || target.id === activeId) return;
      setActiveId(id);
      const params = new URLSearchParams(window.location.search);
      params.set("showcase", target.slug);
      window.history.replaceState(null, "", `?${params.toString()}#see-procinix-in-action`);
      if (source !== "deep_link") {
        trackEvent("showcase_select", {
          campaign_id: target.analyticsCampaignId,
          campaign_name: target.navigationLabel,
          slide_index: campaigns.findIndex((c) => c.id === id),
          selection_source: source,
        });
      }
    },
    [activeId, campaigns],
  );

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    const nextIndex =
      delta < 0
        ? (activeIndex + 1) % campaigns.length
        : (activeIndex - 1 + campaigns.length) % campaigns.length;
    selectCampaign(campaigns[nextIndex].id, "swipe");
  }

  if (!active) return null;

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] };

  return (
    <section
      id="see-procinix-in-action"
      ref={viewRef}
      className="relative py-24 lg:py-32 scroll-mt-24 border-y border-white/[0.05] bg-[var(--bg-secondary)]/40"
    >
      <Container size="wide">
        <div className="flex flex-col items-start gap-3 mb-10 lg:mb-14 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] font-medium">
            Product Tour
          </span>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.02em] text-white">
            See Procinix in Action
          </h2>
        </div>

        <div className="mb-8 lg:mb-10 flex items-center justify-between gap-4">
          <ShowcaseNavigation
            campaigns={campaigns}
            activeId={active.id}
            onSelect={(id) => selectCampaign(id, "click")}
          />
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous showcase"
              onClick={() =>
                selectCampaign(
                  campaigns[(activeIndex - 1 + campaigns.length) % campaigns.length].id,
                  "keyboard",
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next showcase"
              onClick={() =>
                selectCampaign(campaigns[(activeIndex + 1) % campaigns.length].id, "keyboard")
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 lg:gap-12 items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={transition}
              className="order-2 lg:order-1"
            >
              <ShowcaseContent campaign={active} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={transition}
              className="order-1 lg:order-2"
            >
              <ShowcaseMedia campaign={active} isActive={true} eager={activeIndex === 0} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
