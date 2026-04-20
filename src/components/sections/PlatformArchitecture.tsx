"use client";

import { motion } from "framer-motion";
import {
  Database,
  Workflow,
  Bot,
  BarChart3,
  Plug,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";

type Layer = {
  name: string;
  icon: ReactNode;
  body: string;
  tone: string;
};

const layers: Layer[] = [
  {
    name: "Experience Layer",
    icon: <Workflow className="h-4 w-4" />,
    body: "Role-tuned workspaces for finance, operations, and leadership.",
    tone: "var(--accent-teal-bright)",
  },
  {
    name: "Agentic AI Layer",
    icon: <Bot className="h-4 w-4" />,
    body: "Agents that classify, match, draft, and resolve — within policy.",
    tone: "var(--accent-purple)",
  },
  {
    name: "Workflow Engine",
    icon: <Workflow className="h-4 w-4" />,
    body: "Configurable flows across S2P, O2C, and R2R — with SLAs and controls.",
    tone: "var(--accent-teal)",
  },
  {
    name: "Analytics & Insights",
    icon: <BarChart3 className="h-4 w-4" />,
    body: "Live dashboards, exception heatmaps, and drill-down across entities.",
    tone: "var(--accent-amber)",
  },
  {
    name: "Controls & Audit",
    icon: <Shield className="h-4 w-4" />,
    body: "Every action logged; every policy traced; every exception routed.",
    tone: "var(--accent-teal)",
  },
  {
    name: "Integration Fabric",
    icon: <Plug className="h-4 w-4" />,
    body: "ERPs, banks, tax authorities, and e-invoicing networks — connected.",
    tone: "var(--accent-teal)",
  },
  {
    name: "Data & Platform",
    icon: <Database className="h-4 w-4" />,
    body: "Multi-entity, multi-country, multi-currency from day one.",
    tone: "var(--text-muted)",
  },
];

export function PlatformArchitecture() {
  return (
    <Section
      eyebrow="Platform Architecture"
      title={
        <>
          One platform.{" "}
          <span className="text-white/40">Seven deliberate layers.</span>
        </>
      }
      description="Each layer does one thing exceptionally well, and every layer is wired for multi-entity, multi-country operations."
      className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
    >
      <div className="flex flex-col gap-2">
        {layers.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group relative flex items-center gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 lg:px-8 lg:py-6 transition-all hover:border-white/20 hover:bg-white/[0.05]"
            style={{
              boxShadow: `inset 4px 0 0 0 color-mix(in srgb, ${l.tone} 60%, transparent)`,
            }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: `color-mix(in srgb, ${l.tone} 35%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${l.tone} 10%, transparent)`,
                color: l.tone,
              }}
            >
              {l.icon}
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="md:w-64 shrink-0">
                <div
                  className="text-[10.5px] uppercase tracking-[0.22em] mb-1"
                  style={{ color: l.tone }}
                >
                  Layer {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-[16px] lg:text-[17px] font-semibold text-white">
                  {l.name}
                </div>
              </div>
              <p className="text-[14px] text-white/60 leading-relaxed flex-1">
                {l.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
