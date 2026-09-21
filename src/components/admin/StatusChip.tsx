import clsx from "clsx";
import type { HeroStatus } from "@/lib/hero/types";

const STYLES: Record<HeroStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  scheduled: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
  paused: "bg-orange-100 text-orange-700",
  archived: "bg-slate-200 text-slate-500",
};

const LABELS: Record<HeroStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Live",
  paused: "Paused",
  archived: "Archived",
};

export function StatusChip({ status }: { status: HeroStatus }) {
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium", STYLES[status])}>
      {LABELS[status]}
    </span>
  );
}
