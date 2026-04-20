import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /** Shows a subtle top-edge teal glow on hover. */
  glow?: boolean;
  as?: "div" | "article" | "li";
};

export function Card({
  children,
  className,
  interactive = false,
  glow = false,
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08]",
        "bg-gradient-to-b from-white/[0.04] to-white/[0.01]",
        "backdrop-blur-xl",
        "transition-all duration-500 ease-out",
        interactive && "hover:border-white/[0.18] hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] cursor-pointer",
        className,
      )}
    >
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-px left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--accent-teal)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </Tag>
  );
}
