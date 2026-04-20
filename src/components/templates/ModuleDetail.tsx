import Link from "next/link";
import { AlertCircle, Sparkles, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { DetailHero } from "@/components/sections/DetailHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { MODULE_ROUTES, PILLAR_ROUTES, type RouteDef, type Family } from "@/lib/routes";
import type { ModuleContent } from "@/content/types";
import { iconForModule } from "@/lib/module-icons";

type ToneName = "teal" | "amber" | "purple";

const familyTone: Record<Family, ToneName> = {
  s2p: "teal",
  o2c: "amber",
  r2r: "purple",
};

const toneVar: Record<ToneName, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

const familyPillar: Record<Family, RouteDef> = {
  s2p: PILLAR_ROUTES.sourceToPay,
  o2c: PILLAR_ROUTES.orderToCash,
  r2r: PILLAR_ROUTES.recordToReport,
};

export function ModuleDetail({
  content,
  route,
}: {
  content: ModuleContent;
  route: RouteDef;
}) {
  const tone = familyTone[content.family];
  const accent = toneVar[tone];
  const pillar = familyPillar[content.family];

  const relatedModules = content.relatedSlugs
    .map((slug) => {
      const key = Object.keys(MODULE_ROUTES).find((k) => {
        return (MODULE_ROUTES as Record<string, RouteDef>)[k].path.endsWith(
          `/${slug}`,
        );
      });
      return key ? (MODULE_ROUTES as Record<string, RouteDef>)[key] : null;
    })
    .filter((x): x is RouteDef => x !== null);

  return (
    <>
      <DetailHero
        eyebrow={`${pillar.label} · Module`}
        eyebrowTone={tone}
        title={<>{route.label}</>}
        description={content.tagline}
        stats={content.heroStats}
        tags={content.features.map((f) => f.title).slice(0, 4)}
      />

      {/* Pain points */}
      <Section
        eyebrow="What usually goes wrong"
        title="Common pain points."
        description="The recurring issues we see in this function — on every client, in every region."
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

      {/* Features — how Procinix solves it */}
      <Section
        eyebrow="How Procinix solves it"
        title={<>Key capabilities.</>}
        description={`Configurable, composable, and consistent — built into the ${pillar.label} platform.`}
        className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.features.map((f) => (
            <Card key={f.title} glow className="p-7">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-5"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                  color: accent,
                }}
              >
                {iconForModule(route.path)}
              </span>
              <h3 className="font-display text-[19px] text-white leading-snug mb-2">
                {f.title}
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed">
                {f.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section
        eyebrow="Outcomes"
        title={<>What this unlocks.</>}
        description="Directional outcomes observed in operating deployments. Magnitude depends on workflow maturity, process design, data quality, automation scope, and user adoption."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.outcomes.map((o) => (
            <Card key={o.metric} className="p-7">
              <span
                className="text-[10.5px] uppercase tracking-[0.22em] mb-4 inline-block"
                style={{ color: accent }}
              >
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

      {/* AI angle */}
      <section className="relative py-20 lg:py-28 bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(40% 60% at 70% 50%, color-mix(in srgb, ${accent} 10%, transparent), transparent 70%)`,
          }}
        />
        <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-12">
          <span
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] mb-5"
            style={{ color: accent }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Agentic AI angle
          </span>
          <p className="font-display text-[26px] lg:text-[34px] text-white leading-[1.35] tracking-[-0.01em]">
            {content.aiAngle}
          </p>
        </div>
      </section>

      {/* Related modules */}
      {relatedModules.length > 0 && (
        <Section
          eyebrow="Related modules"
          title="Works best alongside."
          description={`Deepen coverage across the ${pillar.label} value stream.`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedModules.map((r) => (
              <Link key={r.path} href={r.path} className="block h-full">
                <Card interactive glow className="h-full p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        color: accent,
                      }}
                    >
                      {iconForModule(r.path)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-[17px] text-white leading-snug mb-2">
                    {r.label}
                  </h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    {r.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CallToAction />
    </>
  );
}
