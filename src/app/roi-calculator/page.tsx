import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";
import { ValueAssessment } from "@/components/roi/ValueAssessment";
import { CallToAction } from "@/components/sections/CallToAction";

const route = CORE_ROUTES.roi;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <>
      {/* Hero header — compact, no duplicated hero height */}
      <section className="relative isolate overflow-hidden pt-[72px]">
        <AuroraBackground intensity="soft" />
        <GridLines />
        <Container size="wide" className="relative z-10 pt-16 pb-10 lg:pt-20 lg:pb-12">
          <div className="max-w-3xl">
            <Chip tone="amber" dot className="mb-5">
              Finance Transformation Value Assessment
            </Chip>
            <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[40px] sm:text-[52px] lg:text-[64px]">
              Not a calculator. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[var(--accent-amber)] via-white to-[var(--accent-teal-bright)] bg-clip-text text-transparent">
                A value realization engine.
              </span>
            </h1>
            <p className="mt-6 text-[16px] lg:text-[18px] text-white/65 leading-[1.6] max-w-2xl">
              Pick a finance family. Pick a module. Enter realistic operating
              inputs. See monthly savings, annual savings, FTE capacity released
              — plus DSO, cash released, or close-days-reduced where they apply.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive assessment */}
      <section className="relative pb-16 lg:pb-24">
        <ValueAssessment />
      </section>

      <CallToAction />
    </>
  );
}
