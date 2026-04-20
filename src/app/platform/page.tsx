import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { PlatformArchitecture } from "@/components/sections/PlatformArchitecture";
import { AgenticAIOutcomes } from "@/components/sections/AgenticAIOutcomes";
import { FinanceFamilies } from "@/components/sections/FinanceFamilies";
import { EnterpriseControls } from "@/components/sections/EnterpriseControls";
import { IntegrationReadiness } from "@/components/sections/IntegrationReadiness";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { PLATFORM_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = CORE_ROUTES.platform;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <>
      <DetailHero
        eyebrow="The Platform"
        eyebrowTone="teal"
        title={
          <>
            One unified platform.{" "}
            <span className="text-white/40">Every finance cycle.</span>
          </>
        }
        description="Source-to-Pay, Order-to-Cash, and Record-to-Report — unified under one configurable operating model. Agentic AI, intelligent workflows, and real-time analytics, built for multi-entity operations at enterprise scale."
        stats={[
          { value: "3", label: "Finance cycles" },
          { value: "20+", label: "Modules" },
          { value: "Global", label: "Multi-entity, multi-country" },
        ]}
        tags={[
          "Workflow engine",
          "Agentic AI layer",
          "Analytics & insights",
          "Enterprise controls",
          "ERP-ready integrations",
        ]}
      />
      <PlatformArchitecture />
      <FinanceFamilies />
      <AgenticAIOutcomes />
      <EnterpriseControls />
      <IntegrationReadiness />
      <ValueAssessmentTeaser />
      <FaqSection
        faqs={PLATFORM_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <CallToAction />
    </>
  );
}
