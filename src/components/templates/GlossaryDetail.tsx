import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { DetailHero } from "@/components/sections/DetailHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  CORE_ROUTES,
  GLOSSARY_ROUTES,
  MODULE_ROUTES,
  PILLAR_ROUTES,
  type RouteDef,
} from "@/lib/routes";
import type { GlossaryContent } from "@/content/types";

function routeBySlug(
  registry: Record<string, RouteDef>,
  slug: string,
): RouteDef | null {
  const key = Object.keys(registry).find((k) => registry[k].path.endsWith(`/${slug}`));
  return key ? registry[key] : null;
}

export function GlossaryDetail({
  content,
  route,
}: {
  content: GlossaryContent;
  route: RouteDef;
}) {
  const relatedTerms = (content.relatedTermSlugs ?? [])
    .map((slug) => routeBySlug(GLOSSARY_ROUTES, slug))
    .filter((r): r is RouteDef => r !== null);

  const relatedModules = (content.relatedModuleSlugs ?? [])
    .map((slug) => routeBySlug(MODULE_ROUTES, slug))
    .filter((r): r is RouteDef => r !== null);

  const pillar = content.family
    ? Object.values(PILLAR_ROUTES).find((p) => p.family === content.family)
    : undefined;

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Resources", href: CORE_ROUTES.resources.path },
          { name: route.label, href: route.path },
        ]}
      />
      <DetailHero
        eyebrow="Glossary"
        eyebrowTone="teal"
        title={<>{content.term}</>}
        description={content.shortDefinition}
        tags={["Definition", "Finance Operations"]}
        withBreadcrumbs
      />
      <Section containerSize="narrow">
        <div className="flex flex-col gap-5">
          {content.definition.map((p, i) => (
            <p
              key={i}
              className="text-[15.5px] lg:text-[16.5px] text-white/65 leading-[1.75]"
            >
              {p}
            </p>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="What it covers"
        title="Key components."
        containerSize="narrow"
        className="pt-0"
      >
        <div className="flex flex-col gap-3">
          {content.keyComponents.map((item) => (
            <Card key={item.title} className="p-5 flex items-start gap-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <div>
                <h4 className="font-display text-[15.5px] text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-[13.5px] text-white/55 leading-[1.6]">
                  {item.body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      {content.faq && content.faq.length > 0 && (
        <FaqSection
          eyebrow="FAQ"
          title={<>{content.term}, <span className="text-white/40">answered.</span></>}
          faqs={content.faq}
          className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
        />
      )}
      {(relatedTerms.length > 0 || relatedModules.length > 0 || pillar) && (
        <Section eyebrow="Related" title="Keep reading." containerSize="narrow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillar && (
              <Link href={pillar.path} className="block h-full">
                <Card interactive glow className="h-full p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-[15.5px] text-white">
                      {pillar.label} Platform
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                  </div>
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    See how Procinix implements {content.term}.
                  </p>
                </Card>
              </Link>
            )}
            {relatedTerms.map((r) => (
              <Link key={r.path} href={r.path} className="block h-full">
                <Card interactive glow className="h-full p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-[15.5px] text-white">
                      {r.label}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                  </div>
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    {r.description}
                  </p>
                </Card>
              </Link>
            ))}
            {relatedModules.map((r) => (
              <Link key={r.path} href={r.path} className="block h-full">
                <Card interactive glow className="h-full p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-[15.5px] text-white">
                      {r.label}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                  </div>
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
