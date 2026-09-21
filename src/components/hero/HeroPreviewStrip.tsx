"use client";

import clsx from "clsx";
import type { HeroCampaign } from "@/lib/hero/types";

/**
 * Compact bottom campaign navigation for desktop — a short name per
 * campaign, not the previous implementation's large pill-tab content
 * navigation. Hidden below `lg` (mobile/tablet use HeroControls' dots +
 * swipe instead, per the approved mobile hierarchy).
 */
export function HeroPreviewStrip({
  campaigns,
  activeId,
  onSelect,
}: {
  campaigns: HeroCampaign[];
  activeId: string;
  onSelect?: (id: string) => void;
}) {
  if (campaigns.length <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Homepage campaigns"
      className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl p-1"
    >
      {campaigns.map((c) => {
        const active = c.id === activeId;
        return (
          <button
            key={c.id}
            id={`hero-tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`hero-panel-${c.id}`}
            onClick={() => onSelect?.(c.id)}
            className={clsx(
              "px-3.5 py-2 rounded-full text-[12.5px] font-medium tracking-[0.01em] transition-colors whitespace-nowrap",
              active ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80",
            )}
          >
            {c.eyebrow || c.internalName}
          </button>
        );
      })}
    </div>
  );
}
