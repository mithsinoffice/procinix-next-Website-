import clsx from "clsx";

type Props = { className?: string };

/**
 * Faint geometric grid overlay — adds structure to backgrounds without animation.
 * Safe to use on any section.
 */
export function GridLines({ className }: Props) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0 opacity-[0.18]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 75%)",
      }}
    />
  );
}
