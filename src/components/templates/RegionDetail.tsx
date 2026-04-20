import Link from "next/link";
import { ShieldCheck, AlertCircle, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { DetailHero } from "@/components/sections/DetailHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { CORE_ROUTES, MODULE_ROUTES, type RouteDef } from "@/lib/routes";
import type { RegionContent } from "@/content/types";
import { iconForModule } from "@/lib/module-icons";

export function RegionDetail({
  content,
  route,
}: {
  content: RegionContent;
  route: RouteDef;
}) {
  const signatureModules = content.signatureModuleSlugs
    .map((slug) => {
      const key = Object.keys(MODULE_ROUTES).find((k) =>
        (MODULE_ROUTES as Record<string, RouteDef>)[k].path.endsWith(`/${slug}`),
      );
      return key ? (MODULE_ROUTES as Record<string, RouteDef>)[key] : null;
    })
    .filter((x): x is RouteDef => x !== null);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Global", href: CORE_ROUTES.global.path },
          { name: route.label, href: route.path },
        ]}
      />
      <DetailHero
        eyebrow="Global Coverage · Region"
        eyebrowTone="teal"
        title={<>{route.label}</>}
        description={content.tagline}
        tags={content.compliance.slice(0, 5)}
        withBreadcrumbs
      />

      {/* Compliance */}
      <Section
        eyebrow="Regulatory & compliance"
        title="What's handled locally."
        description="Built-in where the regulator mandates it; configurable where flexibility matters."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.compliance.map((c) => (
            <div
              key={c}
              className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="text-[14.5px] text-white/85">{c}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Pain points */}
      <Section
        eyebrow="Regional pain points"
        title="The challenges unique to this market."
        className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.painPoints.map((p) => (
            <Card key={p} className="p-6 flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70">
                <AlertCircle className="h-4 w-4" />
              </span>
              <p className="text-[15px] text-white/80 leading-relaxed">{p}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Signature modules */}
      {signatureModules.length > 0 && (
        <Section
          eyebrow="Signature modules for this region"
          title="Where Procinix drives the most value."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {signatureModules.map((m) => (
              <Link
                key={m.path}
                href={m.path}
                className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                    {iconForModule(m.path)}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/25 group-hover:text-white/70 transition-colors" />
                </div>
                <div className="text-[13.5px] font-medium text-white leading-snug">
                  {m.label}
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Outcomes */}
      <Section
        eyebrow="Outcomes"
        title="What this unlocks in-region."
        className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.outcomes.map((o) => (
            <Card key={o.metric} className="p-7">
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-4 inline-block">
                Outcome
              </span>
              <h3 className="font-display text-[20px] text-white leading-snug mb-3">
                {o.metric}
              </h3>
              <p className="text-[13.5px] text-white/60 leading-relaxed">
                {o.detail}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CallToAction />
    </>
  );
}
