import type { Metadata } from "next";
import {
  PackageCheck,
  Receipt,
  HandCoins,
  IndianRupee,
  Users,
  TrendingDown,
  Timer,
  Sparkles,
  Wallet,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PILLAR_ROUTES, MODULES_BY_FAMILY, GLOSSARY_ROUTES } from "@/lib/routes";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { DetailHero } from "@/components/sections/DetailHero";
import { PillarFlow } from "@/components/sections/PillarFlow";
import { PillarModules } from "@/components/sections/PillarModules";
import { ValueDrivers } from "@/components/sections/ValueDrivers";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { O2C_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = PILLAR_ROUTES.orderToCash;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const flowSteps = [
  { icon: <PackageCheck className="h-5 w-5" />, label: "Order", body: "Multi-channel order capture with upfront validation." },
  { icon: <Receipt className="h-5 w-5" />, label: "Bill", body: "Accurate, compliant billing and e-invoicing." },
  { icon: <HandCoins className="h-5 w-5" />, label: "Collect", body: "Segmented collections that reduce DSO intelligently." },
  { icon: <IndianRupee className="h-5 w-5" />, label: "Apply", body: "Auto cash application with remittance parsing." },
  { icon: <Users className="h-5 w-5" />, label: "Reconcile", body: "Customer statements matched and disputes resolved." },
];

const drivers = [
  { icon: <TrendingDown className="h-5 w-5" />, title: "DSO improvement", body: "Cash released through segmented collections, faster application, and cleaner deduction handling.", metric: "3–7d" },
  { icon: <Wallet className="h-5 w-5" />, title: "Working capital unlocked", body: "Working capital released as AR ages reduce and cash forecasts sharpen." },
  { icon: <Timer className="h-5 w-5" />, title: "Cycle-time compression", body: "Billing out sooner, cash applied faster, disputes resolved quicker — end-to-end." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Agent-assisted collections", body: "Agents draft context-aware outreach and score accounts so collectors focus where it matters." },
];

export default function Page() {
  return (
    <>
      <DetailHero
        eyebrow="Order-to-Cash"
        eyebrowTone="amber"
        title={
          <>
            Revenue, realized faster. <span className="text-white/40">DSO in your favour.</span>
          </>
        }
        description="From order capture to cash application — billing, AR, collections, and reconciliation. Agentic collections that reduce DSO without damaging customer relationships."
        stats={[
          { value: "3–7d", label: "DSO improvement" },
          { value: "90%+", label: "Auto cash-app rate" },
          { value: "Live", label: "Working-capital view" },
        ]}
        tags={["Order Mgmt", "Billing", "AR", "Collections", "Reconciliation", "DSO reduction"]}
      />
      <PillarFlow
        eyebrow="End-to-end value stream"
        title={<>Order to cash, <span className="text-white/40">without the leakage.</span></>}
        description="Five operational stages — tuned for revenue realization and cash velocity."
        steps={flowSteps}
        tone="amber"
      />
      <PillarModules pillar={route} tone="amber" modules={MODULES_BY_FAMILY.o2c} />
      <ValueDrivers
        eyebrow="Value drivers"
        title={<>Where the <span className="text-white/40">cash actually moves.</span></>}
        description="Directional drivers observed across multi-entity O2C deployments."
        drivers={drivers}
        tone="amber"
      />
      <ValueAssessmentTeaser />
      <Section eyebrow="Learn more" title="Definitions." containerSize="narrow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: GLOSSARY_ROUTES.whatIsO2C.label,
              body: "A plain-language definition of order-to-cash and what it covers.",
              href: GLOSSARY_ROUTES.whatIsO2C.path,
            },
            {
              label: GLOSSARY_ROUTES.whatIsDSO.label,
              body: "The DSO formula, what counts as a good DSO, and how to reduce it.",
              href: GLOSSARY_ROUTES.whatIsDSO.path,
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block h-full">
              <Card interactive glow className="h-full p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-[15.5px] text-white">{item.label}</h3>
                  <ArrowUpRight className="h-4 w-4 text-white/30 shrink-0" />
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed">{item.body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <FaqSection
        eyebrow="O2C FAQ"
        title={<>Order-to-Cash, <span className="text-white/40">answered.</span></>}
        faqs={O2C_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <CallToAction />
    </>
  );
}
