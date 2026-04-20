import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES, REGION_ROUTES } from "@/lib/routes";
import { PlaceholderHero } from "@/components/sections/PlaceholderHero";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { CallToAction } from "@/components/sections/CallToAction";
import { ArrowUpRight, Globe2 } from "lucide-react";

const route = CORE_ROUTES.global;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <>
      <PlaceholderHero
        eyebrow="Global Coverage"
        title={
          <>
            Multi-country. Multi-currency. <span className="text-white/40">By design.</span>
          </>
        }
        description="Purpose-built for finance teams operating across regions. India, UAE, Saudi Arabia, Singapore, Australia, and USA — with compliance flexibility where you need it."
        tags={["GST", "VAT", "ZATCA", "Peppol", "InvoiceNow", "Multi-currency"]}
      />
      <Section
        eyebrow="Regions"
        title="Entry points across six core markets."
        description="Each region has a dedicated operating model — regulatory, currency, and language flexibility tuned to local finance operations."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(REGION_ROUTES).map((r) => (
            <Link key={r.path} href={r.path} className="block h-full">
              <Card interactive glow className="h-full p-7">
                <div className="flex items-start justify-between mb-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--accent-teal)]">
                    <Globe2 className="h-4 w-4" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/30" />
                </div>
                <h3 className="font-display text-[20px] text-white leading-snug mb-2">
                  {r.label}
                </h3>
                <p className="text-[13.5px] text-white/55 leading-relaxed">
                  {r.description}
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
