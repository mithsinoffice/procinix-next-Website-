import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CORE_ROUTES, GUIDE_ROUTES, GLOSSARY_ROUTES } from "@/lib/routes";
import { PlaceholderHero } from "@/components/sections/PlaceholderHero";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { CallToAction } from "@/components/sections/CallToAction";
import { FileText, BookOpen, BarChart3, Lightbulb } from "lucide-react";

const route = CORE_ROUTES.resources;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  // Placeholder content only (Phase 2 of 5) — keep it out of the index until
  // the real guides/glossary/case-study library ships. Remove this flag then.
  noindex: true,
});

const kinds = [
  { icon: <FileText className="h-4 w-4" />, label: "Guides", detail: "Field-tested playbooks on P2P, O2C, and R2R transformation." },
  { icon: <Lightbulb className="h-4 w-4" />, label: "Perspectives", detail: "Operator-grade takes on finance ops, not SaaS buzzwords." },
  { icon: <BookOpen className="h-4 w-4" />, label: "Case Studies", detail: "Real numbers from multi-entity rollouts." },
  { icon: <BarChart3 className="h-4 w-4" />, label: "ROI Explainers", detail: "How we model savings, DSO, and close efficiency." },
];

export default function Page() {
  return (
    <>
      <PlaceholderHero
        eyebrow="Resources"
        title={
          <>
            Deep work on <span className="text-white/40">finance operations.</span>
          </>
        }
        description="Guides, case studies, ROI explainers, and perspectives for finance leaders running multi-entity operations. Library goes live in Phase 5."
      />
      <Section eyebrow="Available now" title="Start with these." containerSize="narrow">
        <div className="flex flex-col gap-3">
          {[
            {
              title: GUIDE_ROUTES.recordToReportBuyersGuide.title,
              body: "Core capabilities, build-vs-buy, implementation timeline, ROI, and vendor questions.",
              href: GUIDE_ROUTES.recordToReportBuyersGuide.path,
            },
            {
              title: GUIDE_ROUTES.r2rProcessAutomation.title,
              body: "The record-to-report process, stage by stage — where automation fits and what stays manual.",
              href: GUIDE_ROUTES.r2rProcessAutomation.path,
            },
            {
              title: GUIDE_ROUTES.bankReconciliationAutomation.title,
              body: "Matching logic, exception handling, and how to roll out automated bank reconciliation.",
              href: GUIDE_ROUTES.bankReconciliationAutomation.path,
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <Card interactive glow className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-[16.5px] text-white mb-1">{item.title}</h3>
                  <p className="text-[13.5px] text-white/55 leading-relaxed">{item.body}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/30 shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section eyebrow="Glossary" title="Definitions, plainly stated." containerSize="narrow" className="pt-0">
        <div className="flex flex-wrap gap-3">
          {[GLOSSARY_ROUTES.whatIsR2R, GLOSSARY_ROUTES.whatIsO2C, GLOSSARY_ROUTES.whatIsS2P, GLOSSARY_ROUTES.whatIsDSO].map((g) => (
            <Link
              key={g.path}
              href={g.path}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-white/70 hover:text-white hover:border-white/20 transition-colors"
            >
              {g.label}
              <ArrowUpRight className="h-3.5 w-3.5 text-white/30" />
            </Link>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="What's coming"
        title="Four content streams."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kinds.map((k) => (
            <Card key={k.label} className="p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--accent-teal-bright)] mb-4">
                {k.icon}
              </span>
              <h3 className="font-display text-[17px] text-white mb-1.5">
                {k.label}
              </h3>
              <p className="text-[13px] text-white/55 leading-relaxed">
                {k.detail}
              </p>
            </Card>
          ))}
        </div>
      </Section>
      <CallToAction />
    </>
  );
}
