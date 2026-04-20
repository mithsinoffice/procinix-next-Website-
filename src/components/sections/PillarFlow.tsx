"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";

type Tone = "teal" | "amber" | "purple";

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

type Step = {
  icon: ReactNode;
  label: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  steps: Step[];
  tone: Tone;
};

export function PillarFlow({
  eyebrow,
  title,
  description,
  steps,
  tone,
}: Props) {
  const accent = toneVar[tone];
  return (
    <Section
      eyebrow={eyebrow}
      title={title}
      description={description}
      className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
    >
      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-stretch justify-between gap-0 relative">
        {/* Connecting line */}
        <div
          aria-hidden
          className="absolute top-9 left-[4%] right-[4%] h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${accent}33, ${accent}33, transparent)`,
          }}
        />
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex-1 flex flex-col items-center px-3 relative z-10"
          >
            <div
              className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-2 mb-5 backdrop-blur-md"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                color: accent,
              }}
            >
              {s.icon}
              <span
                className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-mono font-semibold text-[var(--bg-primary)]"
                style={{ backgroundColor: accent }}
              >
                {i + 1}
              </span>
            </div>
            <div className="text-center">
              <div className="font-display text-[15px] font-semibold text-white leading-tight mb-1.5">
                {s.label}
              </div>
              <div className="text-[12.5px] text-white/55 leading-relaxed max-w-[160px] mx-auto">
                {s.body}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile/tablet: vertical flow */}
      <div className="lg:hidden flex flex-col gap-4">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="relative flex gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
          >
            <div className="relative shrink-0">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2"
                style={{
                  borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                  color: accent,
                }}
              >
                {s.icon}
              </div>
              <span
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-mono font-semibold text-[var(--bg-primary)]"
                style={{ backgroundColor: accent }}
              >
                {i + 1}
              </span>
            </div>
            <div className="flex-1">
              <div className="font-display text-[15px] font-semibold text-white mb-1">
                {s.label}
              </div>
              <div className="text-[13px] text-white/55 leading-relaxed">
                {s.body}
              </div>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight
                className="absolute -bottom-3 left-8 h-4 w-4"
                style={{ color: accent, opacity: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
