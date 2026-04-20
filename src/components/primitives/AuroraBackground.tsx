import clsx from "clsx";

type Props = {
  className?: string;
  intensity?: "soft" | "rich";
};

/**
 * Animated radial-gradient aurora. Used sparingly — hero, AI section, ROI accent.
 * Purely CSS-driven (no JS), GPU-accelerated via transform + will-change.
 */
export function AuroraBackground({ className, intensity = "rich" }: Props) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Deep base */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Top teal wash */}
      <div
        className={clsx(
          "absolute -top-1/3 left-1/2 -translate-x-1/2 aurora-a will-change-transform",
          intensity === "rich" ? "h-[1000px] w-[1200px]" : "h-[700px] w-[900px]",
        )}
        style={{
          background:
            "radial-gradient(closest-side, rgba(17,197,198,0.35), rgba(17,197,198,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Right purple glow */}
      <div
        className="absolute top-[-10%] right-[-10%] h-[700px] w-[700px] aurora-b will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(143,99,248,0.28), rgba(143,99,248,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Left amber ember */}
      <div
        className="absolute bottom-[-15%] left-[-5%] h-[600px] w-[600px] aurora-c will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(240,166,58,0.22), rgba(240,166,58,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Soft bottom vignette back to base */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-primary))",
        }}
      />

      {/* Grain */}
      <div className="noise-overlay" />
    </div>
  );
}
