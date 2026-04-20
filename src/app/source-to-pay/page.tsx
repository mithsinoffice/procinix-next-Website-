import type { Metadata } from "next";
import {
  Compass,
  FileSearch,
  Scan,
  GitCompareArrows,
  UserCheck,
  CreditCard,
  Wallet,
  TrendingDown,
  ShieldCheck,
  Bot,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PILLAR_ROUTES, MODULES_BY_FAMILY } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { PillarFlow } from "@/components/sections/PillarFlow";
import { PillarModules } from "@/components/sections/PillarModules";
import { ValueDrivers } from "@/components/sections/ValueDrivers";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
import { CallToAction } from "@/components/sections/CallToAction";

const route = PILLAR_ROUTES.sourceToPay;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const flowSteps = [
  { icon: <Compass className="h-5 w-5" />, label: "Source", body: "RFx with structured supplier evaluation and award." },
  { icon: <FileSearch className="h-5 w-5" />, label: "Procure", body: "PR-to-PO with budget checks and policy enforcement." },
  { icon: <Scan className="h-5 w-5" />, label: "Capture", body: "AI invoice capture with 99%+ accuracy." },
  { icon: <GitCompareArrows className="h-5 w-5" />, label: "Match", body: "2/3-way matching with intelligent exceptions." },
  { icon: <UserCheck className="h-5 w-5" />, label: "Approve", body: "Policy-aware approvals with delegations and SoD." },
  { icon: <CreditCard className="h-5 w-5" />, label: "Pay", body: "Multi-bank orchestration with validation and controls." },
];

const drivers = [
  { icon: <Wallet className="h-5 w-5" />, title: "Cost-to-serve down", body: "Lower cost per invoice through touchless processing and exception automation.", metric: "40%+" },
  { icon: <TrendingDown className="h-5 w-5" />, title: "Working capital released", body: "Better on-time payment discipline, fewer duplicate payments, cleaner commitments." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Control uplift", body: "Duplicate detection, sanctions screening, segregation-of-duty — built in, not bolted on." },
  { icon: <Bot className="h-5 w-5" />, title: "Agent-assisted ops", body: "Agents classify, match, and draft exception resolutions. Humans decide, not transcribe." },
];

export default function Page() {
  return (
    <>
      <DetailHero
        eyebrow="Source-to-Pay"
        eyebrowTone="teal"
        title={
          <>
            Spend, sourced and controlled <span className="text-white/40">end-to-end.</span>
          </>
        }
        description="From sourcing and budgets to AP, payments, T&E, and fixed assets — one S2P value stream with configurable workflows, real-time controls, and agentic AI handling exceptions."
        stats={[
          { value: "99%+", label: "Invoice capture accuracy" },
          { value: "70%+", label: "Touchless processing" },
          { value: "40%+", label: "Cost-per-invoice reduction" },
        ]}
        tags={["Sourcing", "Procurement", "AP", "Payments", "T&E", "Budget control", "Fixed Assets"]}
      />
      <PillarFlow
        eyebrow="End-to-end value stream"
        title={<>Source to pay, <span className="text-white/40">without the handoff cracks.</span></>}
        description="Six operational stages, one platform — with context flowing from sourcing decisions all the way through to payment reconciliation."
        steps={flowSteps}
        tone="teal"
      />
      <PillarModules pillar={route} tone="teal" modules={MODULES_BY_FAMILY.s2p} />
      <ValueDrivers
        eyebrow="Value drivers"
        title={<>Where the <span className="text-white/40">real value</span> comes from.</>}
        description="Directional drivers observed across multi-entity deployments."
        drivers={drivers}
        tone="teal"
      />
      <ValueAssessmentTeaser />
      <CallToAction />
    </>
  );
}
