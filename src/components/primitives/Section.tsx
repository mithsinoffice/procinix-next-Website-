import type { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "./Container";

type Props = {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  align?: "left" | "center";
  /** If true, section is rendered without vertical padding. */
  flush?: boolean;
};

export function Section({
  children,
  id,
  eyebrow,
  title,
  description,
  className,
  containerSize = "default",
  align = "left",
  flush = false,
}: Props) {
  const headerAlign = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section
      id={id}
      className={clsx(
        "relative",
        !flush && "py-20 sm:py-24 lg:py-32",
        className,
      )}
    >
      <Container size={containerSize}>
        {(eyebrow || title || description) && (
          <div
            className={clsx(
              "flex flex-col gap-4 mb-14 lg:mb-20",
              headerAlign,
              align === "center" && "mx-auto max-w-3xl",
            )}
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)]">
                <span className="h-px w-6 bg-[var(--accent-teal)]/60" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
