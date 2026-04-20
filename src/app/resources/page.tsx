import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
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
