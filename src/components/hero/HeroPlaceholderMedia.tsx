import type { HeroAccent } from "@/lib/hero/types";

const accentVar: Record<HeroAccent, string> = {
  teal: "var(--accent-teal-bright)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

/**
 * Branded stand-in for a not-yet-uploaded screenshot/video. Deliberately
 * abstract, never photographic — it never presents itself as a real
 * customer screenshot, so there's nothing to walk back once an admin
 * uploads real media for a campaign (see docs/hero-slider.md).
 */
export function HeroPlaceholderMedia({ accent, label }: { accent: HeroAccent; label: string }) {
  const c = accentVar[accent];
  return (
    <div
      role="img"
      aria-label={`Screenshot placeholder for ${label} — production imagery pending`}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-5 flex-1 max-w-[220px] rounded-md bg-white/[0.04]" />
      </div>

      <div className="grid h-[calc(100%-42px)] grid-cols-4 gap-3 p-4 sm:p-5">
        <div className="col-span-4 grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="h-2 w-10 rounded bg-white/[0.08]" />
              <div className="mt-3 h-4 w-14 rounded" style={{ background: `${c}33` }} />
            </div>
          ))}
        </div>
        <div className="col-span-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="h-2 w-24 rounded bg-white/[0.08]" />
          <svg viewBox="0 0 200 60" className="mt-4 h-20 w-full" preserveAspectRatio="none" aria-hidden>
            <polyline
              points="0,45 25,38 50,42 75,22 100,28 125,15 150,20 175,8 200,14"
              fill="none"
              stroke={c}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        </div>
        <div className="col-span-1 flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
          <div className="h-2 w-12 rounded bg-white/[0.08]" />
          {[62, 40, 78, 30].map((h, i) => (
            <div key={i} className="flex items-end gap-1.5">
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                <div className="h-1.5 rounded-full" style={{ width: `${h}%`, background: `${c}55` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 80px -30px ${c}` }} />
    </div>
  );
}
