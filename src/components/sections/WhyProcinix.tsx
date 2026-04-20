"use client";

import { motion } from "framer-motion";
import {
  Settings2,
  Globe2,
  Workflow,
  Bot,
  ShieldCheck,
  Target,
  Building,
} from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";

type Reason = {
  icon: ReactNode;
  title: string;
  body: string;
  span?: "wide" | "default";
};

const reasons: Reason[] = [
  {
    icon: <Settings2 className="h-5 w-5" />,
    title: "Configurable, not bespoke",
    body: "Workflows adapt to your operating model — without forcing a rewrite for every exception.",
    span: "wide",
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "Multi-entity native",
    body: "Built from day one for multiple legal entities, shared services, and hybrid operating models.",
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: "Multi-country flexibility",
    body: "Currency, tax, e-invoicing, and compliance flexibility per region — under one platform.",
  },
  {
    icon: <Bot className="h-5 w-5" />,
    title: "Agentic AI, where it matters",
    body: "AI agents that act on structured workflows — not wrappers on top of chat.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "99%+ workflow accuracy",
    body: "Measured on structured flows — matching, coding, capture, reconciliations.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Audit-ready by design",
    body: "Every action logged, every policy traced, every exception routed — controls baked in.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Enterprise scale",
    body: "From single-entity rollouts to global shared-service hubs — same platform, different configuration.",
  },
];

export function WhyProcinix() {
  return (
    <Section
      id="why"
      eyebrow="Why Procinix"
      title={
        <>
          The platform{" "}
          <span className="text-white/40">built for real operations.</span>
        </>
      }
      description="Seven reasons finance transformation teams choose Procinix over generic point tools."
      className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 4) * 0.06, duration: 0.55, ease: "easeOut" }}
            className={r.span === "wide" ? "md:col-span-2" : ""}
          >
            <Card className="h-full p-6 lg:p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/8 text-[var(--accent-teal-bright)] mb-5">
                {r.icon}
              </span>
              <h3 className="font-display text-[17px] lg:text-[18.5px] font-semibold text-white leading-snug mb-2">
                {r.title}
              </h3>
              <p className="text-[13.5px] text-white/60 leading-relaxed">
                {r.body}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
