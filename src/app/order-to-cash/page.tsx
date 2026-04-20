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
import { PILLAR_ROUTES, MODULES_BY_FAMILY } from "@/lib/routes";
import { DetailHero } from "@/components/sections/DetailHero";
import { PillarFlow } from "@/components/sections/PillarFlow";
import { PillarModules } from "@/components/sections/PillarModules";
import { ValueDrivers } from "@/components/sections/ValueDrivers";
import { ValueAssessmentTeaser } from "@/components/sections/ValueAssessmentTeaser";
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
      <CallToAction />
    </>
  );
}
