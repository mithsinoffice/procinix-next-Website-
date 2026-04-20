"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import type { RouteDef } from "@/lib/routes";

type Tone = "teal" | "amber" | "purple";

const toneMap: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

type Props = {
  pillar: RouteDef;
  tone: Tone;
  modules: RouteDef[];
};

export function PillarModules({ pillar, tone, modules }: Props) {
  const accent = toneMap[tone];
  return (
    <Section
      id="modules"
      eyebrow={`${pillar.label} modules`}
      title="Every module, configurable end-to-end."
      description={`Click into any ${pillar.label} module — full pages with pain points, features, outcomes, and AI insights are in build.`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {modules.map((m, i) => (
          <motion.div
            key={m.path}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 6) * 0.05, duration: 0.5, ease: "easeOut" }}
          >
            <Link href={m.path} className="block h-full">
              <Card interactive glow className="h-full p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className="h-1 w-8 rounded-full"
                    style={{ backgroundColor: accent, opacity: 0.8 }}
                  />
                  <ArrowUpRight
                    className="h-4 w-4 text-white/30 group-hover:text-white transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <h3 className="font-display text-[18px] font-semibold text-white leading-snug mb-2">
                  {m.label}
                </h3>
                <p className="text-[13.5px] text-white/55 leading-relaxed">
                  {m.description}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
