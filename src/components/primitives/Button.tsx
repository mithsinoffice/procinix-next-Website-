import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconAfter?: ReactNode | true;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-[0.01em] rounded-full transition-all duration-300 select-none";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-amber)] text-[#1A1407] hover:bg-[#FFB84D] shadow-[0_10px_30px_-10px_rgba(240,166,58,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(240,166,58,0.8)]",
  secondary:
    "border border-white/15 text-white hover:border-[var(--accent-teal)]/70 hover:bg-white/[0.04] hover:text-[var(--accent-teal-bright)]",
  ghost:
    "text-white/80 hover:text-[var(--accent-teal-bright)]",
};

const sizeMap: Record<Size, string> = {
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconAfter,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  const after = iconAfter === true ? <ArrowRight className="h-4 w-4" /> : iconAfter;
  return (
    <button
      className={clsx(base, variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
      {after && (
        <span className="flex items-center transition-transform duration-300 group-hover:translate-x-0.5">
          {after}
        </span>
      )}
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconAfter,
  target,
  rel,
  ariaLabel,
}: LinkButtonProps) {
  const after = iconAfter === true ? <ArrowRight className="h-4 w-4" /> : iconAfter;
  const isExternal = href.startsWith("http");
  const content = (
    <>
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
      {after && (
        <span className="flex items-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
          {after}
        </span>
      )}
    </>
  );

  const classes = clsx(
    base,
    "group/btn",
    variantMap[variant],
    sizeMap[size],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}
