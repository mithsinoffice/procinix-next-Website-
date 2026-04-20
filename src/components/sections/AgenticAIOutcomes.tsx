"use client";

import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Target,
  AlertTriangle,
  Radar,
  Gauge,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Card } from "@/components/primitives/Card";
import type { ReactNode } from "react";

const pillars: Array<{
  icon: ReactNode;
  tone: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}> = [
  {
    icon: <Bot className="h-5 w-5" />,
    tone: "var(--accent-teal)",
    eyebrow: "Agentic Execution",
    title: "Agents that finish the work — not just flag it.",
    body: "AI agents that act end-to-end on structured workflows with human-in-the-loop control for the grey zones.",
    points: [
      "Autonomous matching & approvals within policy",
      "Intelligent exception routing",
      "Escalation only when context demands it",
    ],
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    tone: "var(--accent-amber)",
    eyebrow: "Analytics & Insights",
    title: "Real-time visibility across every entity.",
    body: "Operational and financial analytics unified — not reports, living dashboards that drive action.",
    points: [
      "Live DSO, working capital, close-progress",
      "Exception heatmaps by entity & function",
      "Drill-down from summary to line item",
    ],
  },
  {
    icon: <Target className="h-5 w-5" />,
    tone: "var(--accent-purple)",
    eyebrow: "Outcome-Driven Automation",
    title: "Measured on outcomes, not task counts.",
    body: "Every workflow tied to an outcome — savings, cycle time, cash, or control. Audit-ready, every step.",
    points: [
      "FTE capacity released, tracked",
      "Cycle-time compression, tracked",
      "Controls & audit trail, by design",
    ],
  },
];

const microStrip = [
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    label: "Intelligent exception handling",
  },
  { icon: <Radar className="h-4 w-4" />, label: "Real-time visibility" },
  { icon: <Gauge className="h-4 w-4" />, label: "Measurable outcomes" },
];

export function AgenticAIOutcomes() {
  return (
    <section className="relative isolate overflow-hidden py-28 lg:py-36 bg-[var(--bg-secondary)]">
      {/* Subtle aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[1100px] aurora-b"
          style={{
            background:
              "radial-gradient(closest-side, rgba(143,99,248,0.18), rgba(143,99,248,0) 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -top-20 right-0 h-[500px] w-[500px] aurora-a"
          style={{
            background:
              "radial-gradient(closest-side, rgba(17,197,198,0.15), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <Container size="wide" className="relative">
        {/* Section header */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-6"
          >
            <span className="h-px w-6 bg-[var(--accent-teal)]/60" />
            Agentic AI & Outcomes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-white leading-[1.05] tracking-[-0.02em] text-[40px] sm:text-[56px] lg:text-[64px]"
          >
            AI that delivers{" "}
            <span className="bg-gradient-to-r from-[var(--accent-teal-bright)] via-white to-[var(--accent-purple)] bg-clip-text text-transparent">
              real outcomes.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-[17px] lg:text-[19px] text-white/65 leading-[1.6] max-w-2xl"
          >
            Three layers working together — agents that execute, analytics that
            reveal, and automation that's judged by the business outcome, not
            the tasks done.
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-24">
          {pillars.map((p, i) => (
            <motion.div
              key={p.eyebrow}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Card glow className="h-full p-8 lg:p-9 flex flex-col">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border mb-7"
                  style={{
                    borderColor: `color-mix(in srgb, ${p.tone} 35%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${p.tone} 10%, transparent)`,
                    color: p.tone,
                  }}
                >
                  {p.icon}
                </span>
                <span
                  className="text-[10.5px] font-medium uppercase tracking-[0.22em] mb-3"
                  style={{ color: p.tone }}
                >
                  {p.eyebrow}
                </span>
                <h3 className="font-display text-[22px] lg:text-[24px] text-white leading-[1.15] mb-4">
                  {p.title}
                </h3>
                <p className="text-[14.5px] text-white/60 leading-relaxed mb-6">
                  {p.body}
                </p>
                <ul className="mt-auto space-y-2.5 pt-6 border-t border-white/[0.07]">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-[13.5px] text-white/70"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                        style={{ backgroundColor: p.tone }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 99%+ Accuracy featurette */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent"
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 100% at 20% 50%, rgba(17,197,198,0.14), transparent 70%)",
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 p-10 lg:p-16">
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-5 inline-block">
                Credible, measurable accuracy
              </span>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-display text-[96px] lg:text-[148px] leading-[0.85] text-white tracking-[-0.04em] text-shimmer">
                  99%
                </span>
                <span className="font-display text-[48px] lg:text-[72px] text-[var(--accent-teal-bright)] leading-none">
                  +
                </span>
              </div>
              <p className="text-[18px] lg:text-[20px] text-white/75 leading-[1.5] max-w-lg">
                Accuracy on structured finance workflows — matching, coding,
                capture, reconciliations. Exceptions handled intelligently, not
                buried in a queue.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:pt-16">
              {microStrip.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                    {m.icon}
                  </span>
                  <span className="text-[15px] text-white">{m.label}</span>
                </div>
              ))}
              <p className="text-[12px] text-white/35 italic mt-4 max-w-sm">
                Accuracy depends on workflow maturity, process design, data
                quality, automation scope, and user adoption.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
