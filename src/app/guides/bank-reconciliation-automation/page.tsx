import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GUIDE_ROUTES, MODULE_ROUTES, CORE_ROUTES } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { GuideArticle } from "@/components/sections/GuideArticle";
import { BANK_RECONCILIATION_AUTOMATION_GUIDE } from "@/content/guides";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { FaqSection } from "@/components/sections/FaqSection";
import { BANK_RECONCILIATION_GUIDE_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = GUIDE_ROUTES.bankReconciliationAutomation;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const related = [
  {
    label: "Bank Reconciliation Module",
    body: "See bank reconciliation automation running on a live platform — multi-bank, multi-entity exception handling included.",
    href: MODULE_ROUTES.bankReconciliation.path,
  },
  {
    label: GUIDE_ROUTES.r2rProcessAutomation.title,
    body: "Bank reconciliation is one stage of the close — see how it fits with task orchestration, journals, and consolidation.",
    href: GUIDE_ROUTES.r2rProcessAutomation.path,
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
            How to Automate <span className="text-white/40">Bank Reconciliation.</span>
          </>
        }
        description="What good matching logic actually handles, how to roll automation out without disrupting your close, and what it's worth once it's running."
        tags={["Reconciliation", "Record-to-Report", "How-To"]}
        withBreadcrumbs
      />
      <GuideArticle blocks={BANK_RECONCILIATION_AUTOMATION_GUIDE} />
      <FaqSection
        eyebrow="FAQ"
        title={<>Bank reconciliation automation, <span className="text-white/40">answered.</span></>}
        faqs={BANK_RECONCILIATION_GUIDE_FAQS}
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
