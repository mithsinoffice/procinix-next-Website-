import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Chip } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { CORE_ROUTES } from "@/lib/routes";

type Tone = "teal" | "amber" | "purple";

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

type Props = {
  eyebrow: string;
  eyebrowTone?: Tone;
  title: ReactNode;
  description: ReactNode;
  stats?: { value: string; label: string }[];
  tags?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** When true, skip the top padding used to clear the fixed nav — e.g., when
   *  a Breadcrumbs component already takes care of that offset. */
  withBreadcrumbs?: boolean;
};

/** Rich hero used across detail pages (module, industry, region, solution). */
export function DetailHero({
  eyebrow,
  eyebrowTone = "teal",
  title,
  description,
  stats,
  tags,
  primaryCta = { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
  secondaryCta = { label: "Value Assessment", href: CORE_ROUTES.roi.path },
  withBreadcrumbs = false,
}: Props) {
  const tone = toneVar[eyebrowTone];
  return (
    <section
      className={
        "relative isolate overflow-hidden flex items-center " +
        (withBreadcrumbs
          ? "min-h-[calc(82vh-72px)]"
          : "pt-[72px] min-h-[82vh]")
      }
    >
      <AuroraBackground intensity="soft" />
      <GridLines />
      <Container
        size="wide"
        className={
          "relative z-10 " + (withBreadcrumbs ? "py-12 lg:py-20" : "py-20 lg:py-28")
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <Chip tone={eyebrowTone} dot className="mb-7">
              {eyebrow}
            </Chip>
            <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[42px] sm:text-[56px] lg:text-[72px]">
              {title}
            </h1>
            <p className="mt-7 text-[17px] lg:text-[19px] text-white/65 leading-[1.6] max-w-2xl">
              {description}
            </p>
            {tags && tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 max-w-2xl">
                {tags.map((t) => (
                  <Chip key={t} tone="neutral" size="sm">
                    {t}
                  </Chip>
                ))}
              </div>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink
                href={primaryCta.href}
                variant="primary"
                size="lg"
                iconAfter
              >
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
          </div>
          {stats && stats.length > 0 && (
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/[0.08]">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-display text-4xl lg:text-[54px] tracking-[-0.02em] leading-none"
                      style={{ color: tone }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-[13px] text-white/55 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
