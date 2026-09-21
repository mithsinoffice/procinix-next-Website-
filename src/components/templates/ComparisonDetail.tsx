import { CheckCircle2, Info } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { DetailHero } from "@/components/sections/DetailHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqSection } from "@/components/sections/FaqSection";
import { MODULE_ROUTES, type RouteDef } from "@/lib/routes";
import type { ComparisonContent } from "@/content/types";
import { iconForModule } from "@/lib/module-icons";

export function ComparisonDetail({
  content,
  route,
}: {
  content: ComparisonContent;
  route: RouteDef;
}) {
  const relevantModules = content.relevantModuleSlugs
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
          { name: "Comparisons", href: "/" },
          { name: route.label, href: route.path },
        ]}
      />
      <DetailHero
        eyebrow={`Procinix vs ${content.competitor}`}
        eyebrowTone="purple"
        title={<>{route.label}</>}
        description={content.tagline}
        withBreadcrumbs
      />

      <Section eyebrow="How they differ" title="The short version.">
        <Card className="p-7">
          <p className="text-[15px] text-white/80 leading-relaxed">
            {content.summary}
          </p>
        </Card>
      </Section>

      <Section
        eyebrow="Comparison"
        title="Side by side."
        className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
      >
        <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="px-5 py-3.5 text-[11px] uppercase tracking-[0.16em] text-white/45 font-medium">
                  Category
                </th>
                <th className="px-5 py-3.5 text-[11px] uppercase tracking-[0.16em] text-[var(--accent-teal-bright)] font-medium">
                  Procinix
                </th>
                <th className="px-5 py-3.5 text-[11px] uppercase tracking-[0.16em] text-white/45 font-medium">
                  {content.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.comparisonRows.map((row, i) => (
                <tr
                  key={row.category}
                  className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}
                >
                  <td className="px-5 py-4 text-[13.5px] text-white/70 align-top border-t border-white/[0.05]">
                    {row.category}
                  </td>
                  <td className="px-5 py-4 text-[13.5px] text-white/90 align-top border-t border-white/[0.05]">
                    {row.procinix}
                  </td>
                  <td className="px-5 py-4 text-[13.5px] text-white/60 align-top border-t border-white/[0.05]">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Strengths" title="What each brings.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-7">
            <h3 className="font-display text-[16px] text-white mb-4">Procinix</h3>
            <ul className="space-y-3">
              {content.procinixStrengths.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[var(--accent-teal-bright)]" />
                  <span className="text-[13.5px] text-white/75 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <h3 className="font-display text-[16px] text-white mb-4">{content.competitor}</h3>
            <ul className="space-y-3">
              {content.competitorStrengths.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Info className="h-4 w-4 shrink-0 mt-0.5 text-white/40" />
                  <span className="text-[13.5px] text-white/60 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Which to choose"
        title="Depends what you're solving for."
        className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-7">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal-bright)] mb-3 inline-block">
              Choose Procinix
            </span>
            <p className="text-[14px] text-white/75 leading-relaxed">
              {content.whenToChooseProcinix}
            </p>
          </Card>
          <Card className="p-7">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-white/45 mb-3 inline-block">
              Choose {content.competitor}
            </span>
            <p className="text-[14px] text-white/60 leading-relaxed">
              {content.whenToChooseCompetitor}
            </p>
          </Card>
        </div>
      </Section>

      {relevantModules.length > 0 && (
        <Section eyebrow="Related modules" title="Where this plays out in Procinix.">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {relevantModules.map((m) => (
              <a
                key={m.path}
                href={m.path}
                className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-purple)]/12 text-[var(--accent-purple)]">
                    {iconForModule(m.path)}
                  </span>
                </div>
                <div className="text-[13.5px] font-medium text-white leading-snug">
                  {m.label}
                </div>
              </a>
            ))}
          </div>
        </Section>
      )}

      {content.faq && content.faq.length > 0 && (
        <FaqSection eyebrow="FAQ" title={<>Common questions.</>} faqs={content.faq} />
      )}

      <CallToAction />
    </>
  );
}
