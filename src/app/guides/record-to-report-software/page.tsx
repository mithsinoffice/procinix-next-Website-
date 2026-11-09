import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GUIDE_ROUTES, PILLAR_ROUTES, CORE_ROUTES } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { GuideArticle } from "@/components/sections/GuideArticle";
import { RECORD_TO_REPORT_BUYERS_GUIDE } from "@/content/guides";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { FaqSection } from "@/components/sections/FaqSection";
import { R2R_BUYERS_GUIDE_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = GUIDE_ROUTES.recordToReportBuyersGuide;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const related = [
  {
    label: "Record-to-Report Platform",
    body: "See how Procinix implements every capability in this guide — close orchestration, reconciliation, consolidation, and more.",
    href: PILLAR_ROUTES.recordToReport.path,
  },
  {
    label: "Finance Transformation Value Assessment",
    body: "Model close-days reduction, FTE capacity, and cash released for your own entity count and close calendar.",
    href: CORE_ROUTES.roi.path,
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
        eyebrow="Buyer's Guide"
        eyebrowTone="purple"
        title={
          <>
            Record-to-Report Software: <span className="text-white/40">The Complete Buyer&apos;s Guide.</span>
          </>
        }
        description="What record-to-report software actually needs to do, how to tell a real platform from a reskinned spreadsheet, and the questions to ask before you sign."
        tags={["R2R", "Financial Close", "Consolidation", "Reconciliation", "Buyer's Guide"]}
        withBreadcrumbs
      />
      <GuideArticle blocks={RECORD_TO_REPORT_BUYERS_GUIDE} />
      <FaqSection
        eyebrow="Buyer's Guide FAQ"
        title={
          <>
            Record-to-report software, <span className="text-white/40">answered.</span>
          </>
        }
        faqs={R2R_BUYERS_GUIDE_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <Section
        eyebrow="Go deeper"
        title="See it on a live platform."
        containerSize="narrow"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className="block h-full">
              <Card interactive glow className="h-full p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-[16.5px] text-white">
                    {r.label}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                </div>
                <p className="text-[13.5px] text-white/55 leading-relaxed">
                  {r.body}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <CallToAction />
    </>
  );
}
