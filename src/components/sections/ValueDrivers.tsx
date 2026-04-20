"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";

type Tone = "teal" | "amber" | "purple";

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

type Driver = {
  icon: ReactNode;
  title: string;
  body: string;
  metric?: string;
};

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  drivers: Driver[];
  tone: Tone;
};

export function ValueDrivers({
  eyebrow,
  title,
  description,
  drivers,
  tone,
}: Props) {
  const accent = toneVar[tone];
  return (
    <Section eyebrow={eyebrow} title={title} description={description}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {drivers.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 2) * 0.08, duration: 0.55, ease: "easeOut" }}
          >
            <Card glow className="h-full p-7 lg:p-8">
              <div className="flex items-start justify-between mb-5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    color: accent,
                  }}
                >
                  {d.icon}
                </span>
                {d.metric && (
                  <div
                    className="font-display text-[32px] lg:text-[38px] tracking-[-0.02em] leading-none"
                    style={{ color: accent }}
                  >
                    {d.metric}
                  </div>
                )}
              </div>
              <h3 className="font-display text-[22px] text-white leading-snug mb-3">
                {d.title}
              </h3>
              <p className="text-[14.5px] text-white/60 leading-relaxed">
                {d.body}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
