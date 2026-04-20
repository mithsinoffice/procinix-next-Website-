import type { Metadata } from "next";
import { buildMetadata, softwareApplicationJsonLd, SITE_URL } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { FinanceFamilies } from "@/components/sections/FinanceFamilies";
import { AgenticAIOutcomes } from "@/components/sections/AgenticAIOutcomes";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { SearchTermsBand } from "@/components/sections/SearchTermsBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { HOME_FAQS } from "@/content/faqs";
import { WhyProcinix } from "@/components/sections/WhyProcinix";
import { IndustryStrip } from "@/components/sections/IndustryStrip";
import { GlobalStrip } from "@/components/sections/GlobalStrip";
import { CallToAction } from "@/components/sections/CallToAction";

const route = CORE_ROUTES.home;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

export default function Page() {
  const jsonLd = softwareApplicationJsonLd({
    name: "Procinix Platform",
    description: route.description,
    url: SITE_URL,
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBand />
      <FinanceFamilies />
      <AgenticAIOutcomes />
      <ValueAssessmentTeaser />
      <CapabilityGrid />
      <SearchTermsBand />
      <WhyProcinix />
      <IndustryStrip />
      <GlobalStrip />
      <FaqSection
        eyebrow="Frequently asked"
        title={<>Questions finance leaders <span className="text-white/40">ask us.</span></>}
        description="What Procinix does, how it's different, and how it fits into your existing stack."
        faqs={HOME_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <CallToAction />
    </>
  );
}
