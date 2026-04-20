"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe2, ShieldCheck, Zap, BarChart3, Target } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Chip } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { CORE_ROUTES } from "@/lib/routes";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] },
  }),
};

const chips = [
  { label: "Powered by Agentic AI", icon: <Sparkles /> },
  { label: "Multi-Entity / Multi-Country", icon: <Globe2 /> },
  { label: "99%+ Accuracy", icon: <Target /> },
  { label: "Configurable Workflows", icon: <Zap /> },
  { label: "Outcome Driven", icon: <BarChart3 /> },
  { label: "Audit-Ready Controls", icon: <ShieldCheck /> },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[72px] min-h-[92vh] flex items-center">
      <AuroraBackground />
      <GridLines />

      <Container size="wide" className="relative z-10 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-col items-start gap-8 max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div custom={0} variants={fadeUp}>
            <Chip tone="teal" dot>
              Automation & Beyond
            </Chip>
          </motion.div>

          {/* Hero line */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-display text-white leading-[1.02] tracking-[-0.025em] text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px]"
          >
            Don't change <br className="hidden sm:block" />
            your business to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--accent-teal-bright)] via-white to-[var(--accent-amber)] bg-clip-text text-transparent">
                fit software.
              </span>
              <span
                aria-hidden
                className="absolute -inset-x-2 -inset-y-1 -z-0 blur-3xl opacity-40"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent-teal) 0%, transparent 80%)",
                }}
              />
            </span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-[17px] sm:text-[19px] lg:text-[20px] text-white/70 leading-[1.55] max-w-2xl"
          >
            A unified finance operations platform that goes beyond automation —
            combining{" "}
            <span className="text-white">agentic AI</span>,{" "}
            <span className="text-white">intelligent workflows</span>, and{" "}
            <span className="text-white">real-time analytics</span> across
            Source-to-Pay, Order-to-Cash, and Record-to-Report.
          </motion.p>

          {/* Multi-X statement */}
          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-[13.5px] uppercase tracking-[0.22em] text-white/45"
          >
            Built for multi-entity · multi-country · multi-industry operations
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2"
          >
            <ButtonLink
              href={CORE_ROUTES.bookDemo.path}
              variant="primary"
              size="lg"
              iconAfter
            >
              Book a Demo
            </ButtonLink>
            <ButtonLink
              href={CORE_ROUTES.roi.path}
              variant="secondary"
              size="lg"
              iconAfter
            >
              Launch Value Assessment
            </ButtonLink>
          </motion.div>

          {/* Chip row */}
          <motion.div
            custom={5}
            variants={fadeUp}
            className="flex flex-wrap gap-2 mt-8 max-w-3xl"
          >
            {chips.map((c) => (
              <Chip key={c.label} tone="neutral" icon={c.icon}>
                {c.label}
              </Chip>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
        >
          {[
            { value: "99%+", label: "Workflow Accuracy" },
            { value: "3 Cycles", label: "S2P · O2C · R2R" },
            { value: "20+", label: "Finance Modules" },
            { value: "Global", label: "Multi-Entity, Multi-Currency" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[var(--bg-primary)]/40 px-6 py-6 lg:py-7"
            >
              <div className="font-display text-2xl lg:text-[30px] text-white tracking-[-0.015em]">
                {s.value}
              </div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-white/45 mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10.5px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
