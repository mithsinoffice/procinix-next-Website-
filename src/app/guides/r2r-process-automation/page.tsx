import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GUIDE_ROUTES, PILLAR_ROUTES, CORE_ROUTES } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { GuideArticle } from "@/components/sections/GuideArticle";
import { R2R_PROCESS_AUTOMATION_GUIDE } from "@/content/guides";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { FaqSection } from "@/components/sections/FaqSection";
import { R2R_PROCESS_AUTOMATION_GUIDE_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = GUIDE_ROUTES.r2rProcessAutomation;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const related = [
  {
    label: PILLAR_ROUTES.recordToReport.title,
    body: "See the full record-to-report platform this process maps to — orchestration, reconciliation, and consolidation together.",
    href: PILLAR_ROUTES.recordToReport.path,
  },
  {
    label: GUIDE_ROUTES.bankReconciliationAutomation.title,
    body: "Reconciliation is one stage of this process — the detailed walkthrough of how to automate it.",
    href: GUIDE_ROUTES.bankReconciliationAutomation.path,
  },
  {
    label: GUIDE_ROUTES.recordToReportBuyersGuide.title,
    body: "Evaluating R2R software to run this process on? Start with the full buyer's guide.",
    href: GUIDE_ROUTES.recordToReportBuyersGuide.path,
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Resources", href: CORE_ROUTES.resources.path },
          { name: route.label, href: route.path },
        ]}
      />
      <DetailHero
        eyebrow="Guide"
        eyebrowTone="purple"
        title={
          <>
            R2R Process Automation: <span className="text-white/40">Step-by-Step.</span>
          </>
        }
        description="The record-to-report process, stage by stage — where automation fits, what should stay manual by design, and how to sequence the rollout."
        tags={["Record-to-Report", "Close Automation", "How-To"]}
        withBreadcrumbs
      />
      <GuideArticle blocks={R2R_PROCESS_AUTOMATION_GUIDE} />
      <FaqSection
        eyebrow="FAQ"
        title={<>R2R process automation, <span className="text-white/40">answered.</span></>}
        faqs={R2R_PROCESS_AUTOMATION_GUIDE_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <Section eyebrow="Go deeper" title="See it on a live platform." containerSize="narrow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className="block h-full">
              <Card interactive glow className="h-full p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-[16.5px] text-white">{r.label}</h3>
                  <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                </div>
                <p className="text-[13.5px] text-white/55 leading-relaxed">{r.body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <CallToAction />
    </>
  );
}
