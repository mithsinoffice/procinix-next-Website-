import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES, INDUSTRY_ROUTES } from "@/lib/routes";
import { PlaceholderHero } from "@/components/sections/PlaceholderHero";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { CallToAction } from "@/components/sections/CallToAction";
import { ArrowUpRight } from "lucide-react";

const route = CORE_ROUTES.industries;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <>
      <PlaceholderHero
        eyebrow="Industries"
        title={
          <>
            Built for the <span className="text-white/40">complexity</span> of your sector.
          </>
        }
        description="Retail and fashion, manufacturing, construction and infrastructure, D2C and e-commerce, enterprise shared services — configurable workflows for real operating models, not generic templates."
      />
      <Section
        eyebrow="Industry Coverage"
        title="Five sectors, one configurable platform."
        description="Each industry page dives deep into use cases, relevant modules, complexity handled, and outcomes. Full pages in build for Phase 2."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(INDUSTRY_ROUTES).map((i) => (
            <Link key={i.path} href={i.path} className="block h-full">
              <Card interactive glow className="h-full p-7">
                <div className="flex items-start justify-between mb-5">
                  <span className="h-1 w-10 rounded-full bg-[var(--accent-teal)]" />
                  <ArrowUpRight className="h-4 w-4 text-white/30" />
                </div>
                <h3 className="font-display text-[22px] text-white leading-snug mb-3">
                  {i.label}
                </h3>
                <p className="text-[14px] text-white/55 leading-relaxed">
                  {i.description}
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
