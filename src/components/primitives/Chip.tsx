import type { ReactNode } from "react";
import clsx from "clsx";

type Tone = "teal" | "amber" | "purple" | "neutral";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
  size?: "sm" | "md";
};

const toneMap: Record<Tone, { border: string; text: string; glow: string; dot: string }> = {
  teal: {
    border: "border-[var(--accent-teal)]/25",
    text: "text-[var(--accent-teal-bright)]",
    glow: "shadow-[0_0_24px_-12px_var(--accent-teal)]",
    dot: "bg-[var(--accent-teal-bright)]",
  },
  amber: {
    border: "border-[var(--accent-amber)]/30",
    text: "text-[var(--accent-amber)]",
    glow: "shadow-[0_0_24px_-12px_var(--accent-amber)]",
    dot: "bg-[var(--accent-amber)]",
  },
  purple: {
    border: "border-[var(--accent-purple)]/30",
    text: "text-[var(--accent-purple)]",
    glow: "shadow-[0_0_24px_-12px_var(--accent-purple)]",
    dot: "bg-[var(--accent-purple)]",
  },
  neutral: {
    border: "border-white/12",
    text: "text-white/80",
    glow: "",
    dot: "bg-white/70",
  },
};

export function Chip({
  children,
  icon,
  tone = "neutral",
  dot = false,
  className,
  size = "md",
}: Props) {
  const t = toneMap[tone];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border backdrop-blur-md transition-all duration-300",
        "bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20",
        size === "sm" ? "px-3 py-1 text-[11px]" : "px-3.5 py-1.5 text-[12.5px]",
        "font-medium tracking-[0.02em]",
        t.border,
        t.text,
        t.glow,
        className,
      )}
    >
      {dot && (
        <span className={clsx("h-1.5 w-1.5 rounded-full", t.dot, "animate-[pulse-soft_2.4s_ease-in-out_infinite]")} />
      )}
      {icon && <span className="flex items-center [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
