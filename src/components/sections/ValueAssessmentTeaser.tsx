"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calculator, Wallet, Timer, TrendingDown } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { ButtonLink } from "@/components/primitives/Button";
import { CORE_ROUTES } from "@/lib/routes";

const outcomes = [
  { icon: <Wallet className="h-4 w-4" />, label: "Monthly & Annual Savings", tone: "var(--accent-teal)" },
  { icon: <Timer className="h-4 w-4" />, label: "Close Days Reduced", tone: "var(--accent-purple)" },
  { icon: <TrendingDown className="h-4 w-4" />, label: "DSO Improvement & Cash Released", tone: "var(--accent-amber)" },
];

const families = [
  {
    label: "Source-to-Pay",
    tone: "var(--accent-teal)",
    modules: ["AP", "Procurement", "Payments", "T&E"],
  },
  {
    label: "Order-to-Cash",
    tone: "var(--accent-amber)",
    modules: ["AR", "Billing", "Collections", "Reconciliation"],
  },
  {
    label: "Record-to-Report",
    tone: "var(--accent-purple)",
    modules: ["Month-End", "Consolidation", "Cash Flow", "Year-End"],
  },
];

export function ValueAssessmentTeaser() {
  return (
    <section className="relative isolate overflow-hidden py-28 lg:py-36">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(240,166,58,0.10), transparent 70%)",
        }}
      />
      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: headline + CTAs */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-amber)] mb-6"
            >
              <Calculator className="h-3.5 w-3.5" />
              Finance Transformation Value Assessment
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-white leading-[1.05] tracking-[-0.02em] text-[40px] lg:text-[56px]"
            >
              Model the value <br />
              <span className="text-white/40">before you commit.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-[17px] text-white/65 leading-[1.6] max-w-lg"
            >
              Not a simple calculator. A realistic value realization model —
              family by family, module by module, rolled up to an enterprise
              view. Monthly savings, FTE capacity, DSO, cash released, close days.
            </motion.p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink
                href={CORE_ROUTES.roi.path}
                variant="primary"
                size="lg"
                iconAfter
              >
                Launch Value Assessment
              </ButtonLink>
              <ButtonLink
                href={CORE_ROUTES.bookDemo.path}
                variant="secondary"
                size="lg"
              >
                Walk through with us
              </ButtonLink>
            </div>
          </div>

          {/* Right: interactive-looking preview tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-8 lg:p-10 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background:
                    "radial-gradient(40% 50% at 30% 0%, rgba(240,166,58,0.10), transparent 70%)",
                }}
              />
              <div className="relative">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-8">
                  {["Select family", "Pick module", "Enter inputs", "See outcomes"].map(
                    (s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={
                            "flex h-6 w-6 items-center justify-center rounded-full border text-[10.5px] font-medium " +
                            (i === 0
                              ? "border-[var(--accent-amber)] bg-[var(--accent-amber)]/15 text-[var(--accent-amber)]"
                              : "border-white/15 text-white/45")
                          }
                        >
                          {i + 1}
                        </div>
                        <span
                          className={
                            "text-[12px] " +
                            (i === 0 ? "text-white" : "text-white/40")
                          }
                        >
                          {s}
                        </span>
                        {i < 3 && (
                          <span className="h-px w-5 bg-white/10 mx-1" />
                        )}
                      </div>
                    ),
                  )}
                </div>

                {/* Family picker preview */}
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">
                  Step 1 · Select finance family
                </p>
                <div className="grid grid-cols-3 gap-2.5 mb-8">
                  {families.map((f) => (
                    <div
                      key={f.label}
                      className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:border-white/20 transition-all"
                    >
                      <span
                        className="h-1 w-8 rounded-full mb-3 block"
                        style={{ backgroundColor: f.tone }}
                      />
                      <div className="text-[13.5px] font-medium text-white mb-2">
                        {f.label}
                      </div>
                      <div className="text-[11px] text-white/45 leading-snug">
                        {f.modules.join(" · ")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Output preview */}
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">
                  Always in output
                </p>
                <div className="space-y-2.5">
                  {outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-md"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${o.tone} 12%, transparent)`,
                            color: o.tone,
                          }}
                        >
                          {o.icon}
                        </span>
                        <span className="text-[14px] text-white/85">
                          {o.label}
                        </span>
                      </div>
                      <span className="text-[12px] text-white/40 font-mono">
                        ———
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={CORE_ROUTES.roi.path}
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] text-[var(--accent-amber)] hover:text-white transition-colors group/link"
                >
                  Launch the full assessment
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
