"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { MODULES_BY_FAMILY, PILLAR_ROUTES, type RouteDef } from "@/lib/routes";
import { iconForModule } from "@/lib/module-icons";

const familyMeta = {
  s2p: {
    tone: "var(--accent-teal)",
    label: "Source-to-Pay",
    pillar: PILLAR_ROUTES.sourceToPay,
  },
  o2c: {
    tone: "var(--accent-amber)",
    label: "Order-to-Cash",
    pillar: PILLAR_ROUTES.orderToCash,
  },
  r2r: {
    tone: "var(--accent-purple)",
    label: "Record-to-Report",
    pillar: PILLAR_ROUTES.recordToReport,
  },
} as const;

export function CapabilityGrid() {
  return (
    <Section
      id="capabilities"
      eyebrow="Capability Coverage"
      title={
        <>
          Every module. <span className="text-white/40">One platform.</span>
        </>
      }
      description="Twenty modules across three finance families — each configurable, each wired to the others, each with its own agentic AI layer."
    >
      <div className="space-y-12">
        {(["s2p", "o2c", "r2r"] as const).map((fam) => {
          const modules = MODULES_BY_FAMILY[fam];
          const meta = familyMeta[fam];
          return (
            <div key={fam}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: meta.tone }}
                  />
                  <span
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: meta.tone }}
                  >
                    {meta.label}
                  </span>
                </div>
                <Link
                  href={meta.pillar.path}
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-white/55 hover:text-white transition-colors"
                >
                  Pillar overview
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {modules.map((m, i) => (
                  <ModuleTile key={m.path} module={m} tone={meta.tone} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ModuleTile({
  module: m,
  tone,
  index,
}: {
  module: RouteDef;
  tone: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 6) * 0.04, duration: 0.4, ease: "easeOut" }}
    >
      <Link
        href={m.path}
        className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between mb-4">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${tone} 12%, transparent)`,
              color: tone,
            }}
          >
            {iconForModule(m.path)}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-white/25 group-hover:text-white/70 transition-colors" />
        </div>
        <div className="text-[13.5px] font-medium text-white leading-snug">
          {m.label}
        </div>
      </Link>
    </motion.div>
  );
}
