import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Chip } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { CORE_ROUTES } from "@/lib/routes";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  /** Optional secondary lines shown as chip row. */
  tags?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/**
 * Used for core routes that aren't fully built yet (Phase 1).
 * Renders a premium "coming soon"-style hero so nav doesn't dead-end.
 */
export function PlaceholderHero({
  eyebrow,
  title,
  description,
  tags,
  primaryCta = { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
  secondaryCta = {
    label: "Value Assessment",
    href: CORE_ROUTES.roi.path,
  },
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[72px] min-h-[88vh] flex items-center">
      <AuroraBackground intensity="soft" />
      <GridLines />
      <Container size="wide" className="relative z-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          <Chip tone="teal" dot className="mb-7">
            {eyebrow}
          </Chip>
          <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[44px] sm:text-[60px] lg:text-[76px]">
            {title}
          </h1>
          <p className="mt-7 text-[17px] lg:text-[19px] text-white/65 leading-[1.6] max-w-2xl">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Chip key={t} tone="neutral" size="sm">
                  {t}
                </Chip>
              ))}
            </div>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <ButtonLink href={primaryCta.href} variant="primary" size="lg" iconAfter>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              iconAfter
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="mt-14 flex items-center gap-4 text-[12.5px] uppercase tracking-[0.22em] text-white/35">
            <span className="h-px w-8 bg-white/15" />
            <span>Full page in build · Phase 2</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
