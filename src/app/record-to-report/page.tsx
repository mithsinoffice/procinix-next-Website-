import type { Metadata } from "next";
import {
  Activity,
  Scale,
  CalendarCheck,
  Layers,
  FileBarChart,
  Timer,
  ShieldCheck,
  Sparkles,
  Radar,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PILLAR_ROUTES, MODULES_BY_FAMILY } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { PillarFlow } from "@/components/sections/PillarFlow";
import { PillarModules } from "@/components/sections/PillarModules";
import { ValueDrivers } from "@/components/sections/ValueDrivers";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { R2R_FAQS } from "@/content/faqs";
import { CallToAction } from "@/components/sections/CallToAction";

const route = PILLAR_ROUTES.recordToReport;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

const flowSteps = [
  { icon: <Activity className="h-5 w-5" />, label: "Transact", body: "Subledger activity with controls from S2P and O2C." },
  { icon: <Scale className="h-5 w-5" />, label: "Accrue", body: "Policy-driven accruals and provisions." },
  { icon: <CalendarCheck className="h-5 w-5" />, label: "Close", body: "Orchestrated tasks, journals, and reconciliations." },
  { icon: <Layers className="h-5 w-5" />, label: "Consolidate", body: "Group consolidation with IC elimination and FX." },
  { icon: <FileBarChart className="h-5 w-5" />, label: "Report", body: "Statutory and management packs, analytics-ready." },
];

const drivers = [
  { icon: <Timer className="h-5 w-5" />, title: "Close-days reduction", body: "Compression from orchestration, reconciliation automation, and early intercompany resolution.", metric: "30–50%" },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Audit comfort", body: "Evidence, controls, and journals documented at source — not reconstructed at audit." },
  { icon: <Radar className="h-5 w-5" />, title: "Real-time visibility", body: "Close progress, risk, and exceptions visible across entities — leadership acts early." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Agent-assisted close", body: "Agents draft reconciliations and journals. Controllers spend time on judgment items." },
];

export default function Page() {
  return (
    <>
      <DetailHero
        eyebrow="Record-to-Report"
        eyebrowTone="purple"
        title={
          <>
            Close on time. <span className="text-white/40">Every time.</span>
          </>
        }
        description="Faster close, stronger controls, and real-time visibility across month-end, consolidation, provisions, amortization, and year-end — with a full audit trail."
        stats={[
          { value: "30–50%", label: "Close-days reduction" },
          { value: "100%", label: "Task ownership traceability" },
          { value: "Live", label: "Close progress view" },
        ]}
        tags={["Month-End", "Consolidation", "Cash Flow", "Provisions", "Amortization", "Year-End"]}
      />
      <PillarFlow
        eyebrow="End-to-end value stream"
        title={<>Record to report, <span className="text-white/40">on time, every time.</span></>}
        description="Five stages — with controls and evidence built into each step, not bolted on at audit."
        steps={flowSteps}
        tone="purple"
      />
      <PillarModules pillar={route} tone="purple" modules={MODULES_BY_FAMILY.r2r} />
      <ValueDrivers
        eyebrow="Value drivers"
        title={<>Where the <span className="text-white/40">close compresses.</span></>}
        description="Directional drivers observed across multi-entity R2R deployments."
        drivers={drivers}
        tone="purple"
      />
      <ValueAssessmentTeaser />
      <FaqSection
        eyebrow="R2R FAQ"
        title={<>Record-to-Report, <span className="text-white/40">answered.</span></>}
        faqs={R2R_FAQS}
        className="bg-[var(--bg-secondary)]/40 border-y border-white/[0.04]"
      />
      <CallToAction />
    </>
  );
}
