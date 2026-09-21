"use client";

import { useRef } from "react";
import clsx from "clsx";
import type { ShowcaseCampaign, ShowcaseAccent } from "@/content/types";

const accentActive: Record<ShowcaseAccent, string> = {
  teal: "border-[var(--accent-teal)]/60 text-[var(--accent-teal-bright)] bg-[var(--accent-teal)]/10",
  amber: "border-[var(--accent-amber)]/60 text-[var(--accent-amber)] bg-[var(--accent-amber)]/10",
  purple: "border-[var(--accent-purple)]/60 text-[var(--accent-purple)] bg-[var(--accent-purple)]/10",
};

export function ShowcaseNavigation({
  campaigns,
  activeId,
  onSelect,
}: {
  campaigns: ShowcaseCampaign[];
  activeId: string;
  /**
   * Optional so the static server-rendered fallback (see
   * ProductShowcase.tsx's ShowcaseFallback) can render this component
   * without passing a function prop across the server/client boundary —
   * React disallows passing event handlers from a Server Component into a
   * Client Component. The fallback is non-interactive by design (it's
   * replaced the moment ProductShowcaseInner hydrates), so a no-op default
   * is the correct behavior there, not a workaround.
   */
  onSelect?: (id: string) => void;
}) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusAndSelect(id: string) {
    onSelect?.(id);
    tabRefs.current[id]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let nextIndex = index;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % campaigns.length;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + campaigns.length) % campaigns.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = campaigns.length - 1;
    focusAndSelect(campaigns[nextIndex].id);
  }

  return (
    <div
      role="tablist"
      aria-label="Procinix product showcase"
      className="flex flex-wrap gap-2 sm:gap-2.5"
    >
      {campaigns.map((c, i) => {
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            ref={(el) => {
              tabRefs.current[c.id] = el;
            }}
            id={`showcase-tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`showcase-panel-${c.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect?.(c.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={clsx(
              "rounded-full border px-4 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300",
              isActive
                ? accentActive[c.accent]
                : "border-white/[0.10] text-white/60 hover:text-white/90 hover:border-white/25 bg-white/[0.02]",
            )}
          >
            {c.navigationLabel}
          </button>
        );
      })}
    </div>
  );
}
