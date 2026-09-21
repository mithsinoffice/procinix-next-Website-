"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function HeroControls({
  count,
  activeIndex,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  count: number;
  activeIndex: number;
  /** Optional so the server-rendered static fallback can render controls
   *  without passing functions across the server/client boundary — see
   *  HeroSliderFallback in HeroSlider.tsx. */
  onPrev?: () => void;
  onNext?: () => void;
  onSelectIndex?: (index: number) => void;
}) {
  if (count <= 1) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPrev?.()}
          className="h-9 w-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
          aria-label="Previous campaign"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onNext?.()}
          className="h-9 w-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
          aria-label="Next campaign"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <span className="text-[12px] tabular-nums text-white/45 tracking-[0.05em]">
        {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectIndex?.(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-6 bg-white/80" : "w-1.5 bg-white/25 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
