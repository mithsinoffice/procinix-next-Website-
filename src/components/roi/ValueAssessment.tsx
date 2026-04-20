"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Wallet,
  Timer,
  TrendingDown,
  Users2,
  RotateCcw,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Card } from "@/components/primitives/Card";
import { Button, ButtonLink } from "@/components/primitives/Button";
import {
  MODULES_BY_FAMILY,
  PILLAR_ROUTES,
  CORE_ROUTES,
  type RouteDef,
  type Family,
} from "@/lib/routes";
import {
  COMMON_INPUTS,
  MODULE_ROI,
  calculateRoi,
  formatInr,
  type RoiInputs,
} from "@/lib/roi-model";
import { iconForModule } from "@/lib/module-icons";

type Step = 1 | 2 | 3 | 4;

type FamilyMeta = { label: string; tone: string; pillar: RouteDef };

const familyMeta: Record<Family, FamilyMeta> = {
  s2p: {
    label: "Source-to-Pay",
    tone: "var(--accent-teal)",
    pillar: PILLAR_ROUTES.sourceToPay,
  },
  o2c: {
    label: "Order-to-Cash",
    tone: "var(--accent-amber)",
    pillar: PILLAR_ROUTES.orderToCash,
  },
  r2r: {
    label: "Record-to-Report",
    tone: "var(--accent-purple)",
    pillar: PILLAR_ROUTES.recordToReport,
  },
};

const steps = [
  { n: 1, label: "Family" },
  { n: 2, label: "Module" },
  { n: 3, label: "Inputs" },
  { n: 4, label: "Outcomes" },
];

export function ValueAssessment() {
  const [step, setStep] = useState<Step>(1);
  const [family, setFamily] = useState<Family | null>(null);
  const [moduleSlug, setModuleSlug] = useState<string | null>(null);
  const [inputs, setInputs] = useState<RoiInputs>({});

  const moduleRoute: RouteDef | null = useMemo(() => {
    if (!family || !moduleSlug) return null;
    return (
      MODULES_BY_FAMILY[family].find((m) => m.path.endsWith(`/${moduleSlug}`)) ??
      null
    );
  }, [family, moduleSlug]);

  const moduleRoi = moduleSlug ? MODULE_ROI[moduleSlug] : null;
  const allInputs = moduleRoi
    ? [...COMMON_INPUTS, ...moduleRoi.extraInputs]
    : [];

  const output =
    family && moduleSlug
      ? calculateRoi(family, moduleSlug, inputs)
      : null;

  const reset = () => {
    setStep(1);
    setFamily(null);
    setModuleSlug(null);
    setInputs({});
  };

  const goNext = () => {
    if (step === 1 && family) {
      // seed defaults for the chosen family's modules upon entry to step 3
      setStep(2);
    } else if (step === 2 && moduleSlug) {
      // seed defaults
      const mod = MODULE_ROI[moduleSlug];
      const defaults: RoiInputs = {};
      [...COMMON_INPUTS, ...mod.extraInputs].forEach((spec) => {
        defaults[spec.key] = spec.defaultValue;
      });
      setInputs(defaults);
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const canNext =
    (step === 1 && family !== null) ||
    (step === 2 && moduleSlug !== null) ||
    step === 3;

  const tone = family ? familyMeta[family].tone : "var(--accent-amber)";

  return (
    <Container size="wide" className="relative z-10 py-16 lg:py-24">
      {/* Step indicator */}
      <div className="mb-12 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((s, i) => {
            const done = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} className="flex items-center gap-2">
                <div
                  className={
                    "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-mono font-semibold transition-all " +
                    (active
                      ? "border-[var(--accent-teal-bright)] bg-[var(--accent-teal-bright)]/15 text-[var(--accent-teal-bright)]"
                      : done
                        ? "border-[var(--accent-teal)]/60 bg-[var(--accent-teal)]/15 text-[var(--accent-teal-bright)]"
                        : "border-white/15 text-white/40")
                  }
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : s.n}
                </div>
                <span
                  className={
                    "text-[13px] " +
                    (active ? "text-white" : done ? "text-white/65" : "text-white/35")
                  }
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <span className="h-px w-8 bg-white/10 mx-1" />
                )}
              </div>
            );
          })}
        </div>
        {(family || moduleSlug) && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[12.5px] text-white/50 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Start over
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <StepHeading
              eyebrow="Step 1"
              title="Which finance family do you want to model?"
              sub="You can model more families by running the assessment again — outcomes stack at the enterprise level."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(Object.keys(familyMeta) as Family[]).map((f) => {
                const fm = familyMeta[f];
                const active = family === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFamily(f)}
                    className={
                      "group relative block text-left rounded-2xl border p-7 transition-all " +
                      (active
                        ? "border-white/25 bg-white/[0.04]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]")
                    }
                    style={
                      active
                        ? { boxShadow: `0 0 0 2px ${fm.tone}` }
                        : undefined
                    }
                  >
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border mb-5"
                      style={{
                        borderColor: `color-mix(in srgb, ${fm.tone} 35%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${fm.tone} 10%, transparent)`,
                        color: fm.tone,
                      }}
                    >
                      {f.toUpperCase().slice(0, 1)}
                    </span>
                    <span
                      className="text-[10.5px] uppercase tracking-[0.22em] block mb-2"
                      style={{ color: fm.tone }}
                    >
                      {f.toUpperCase()}
                    </span>
                    <h3 className="font-display text-[22px] text-white mb-2">
                      {fm.label}
                    </h3>
                    <p className="text-[13.5px] text-white/55 leading-relaxed">
                      {MODULES_BY_FAMILY[f]
                        .slice(0, 4)
                        .map((m) => m.label)
                        .join(" · ")}
                      {MODULES_BY_FAMILY[f].length > 4 && " +more"}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && family && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <StepHeading
              eyebrow="Step 2"
              title={`Pick a ${familyMeta[family].label} module to model.`}
              sub="Each module has its own productivity profile. We'll show outputs for this module; assessment can be re-run for others."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES_BY_FAMILY[family].map((m) => {
                const slug = m.path.split("/").pop()!;
                const active = moduleSlug === slug;
                return (
                  <button
                    key={m.path}
                    onClick={() => setModuleSlug(slug)}
                    className={
                      "group relative block text-left rounded-xl border p-5 transition-all " +
                      (active
                        ? "border-white/25 bg-white/[0.05]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]")
                    }
                    style={
                      active ? { boxShadow: `0 0 0 2px ${tone}` } : undefined
                    }
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
                      {active && (
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: tone,
                            color: "var(--bg-primary)",
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <div className="text-[14.5px] font-medium text-white mb-1">
                      {m.label}
                    </div>
                    <div className="text-[12px] text-white/45 leading-relaxed">
                      {m.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && moduleRoute && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <StepHeading
              eyebrow="Step 3"
              title="Enter your operating inputs."
              sub="Realistic order-of-magnitude is fine. The model compounds small accuracy gains; major decisions should use a joint workshop."
            />
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {allInputs.map((spec) => (
                  <div key={spec.key} className="flex flex-col gap-2">
                    <label className="text-[12.5px] text-white/70">
                      {spec.label}
                      {spec.hint && (
                        <span className="block text-[11px] text-white/40 mt-0.5">
                          {spec.hint}
                        </span>
                      )}
                    </label>
                    <div className="relative flex items-center">
                      {spec.suffix === "₹" && (
                        <span className="absolute left-4 text-[14px] text-white/40">
                          ₹
                        </span>
                      )}
                      <input
                        type="number"
                        step={spec.step}
                        min={spec.min}
                        max={spec.max}
                        value={inputs[spec.key] ?? spec.defaultValue}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            [spec.key]: Number(e.target.value),
                          }))
                        }
                        className={
                          "w-full rounded-lg border border-white/10 bg-[var(--bg-primary)] text-white text-[15px] focus:border-[var(--accent-teal-bright)] focus:outline-none transition-colors " +
                          (spec.suffix === "₹" ? "pl-8 pr-4 py-3" : "px-4 py-3")
                        }
                      />
                      {spec.suffix && spec.suffix !== "₹" && (
                        <span className="absolute right-4 text-[13px] text-white/40">
                          {spec.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[12px] text-white/40 italic">
                Estimates are directional and depend on workflow maturity, process design, data quality, automation scope, and user adoption.
              </p>
            </div>
          </motion.div>
        )}

        {step === 4 && family && moduleRoute && output && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <StepHeading
              eyebrow="Step 4"
              title={`Directional outcomes — ${moduleRoute.label}.`}
              sub={`${familyMeta[family].label} module-level projection. Family and enterprise-level rollups available in a joint workshop.`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <OutcomeCard
                icon={<Wallet className="h-4 w-4" />}
                tone={tone}
                label="Monthly Savings"
                value={formatInr(output.monthlySavings)}
              />
              <OutcomeCard
                icon={<Wallet className="h-4 w-4" />}
                tone={tone}
                label="Annual Savings"
                value={formatInr(output.annualSavings)}
                highlight
              />
              <OutcomeCard
                icon={<Users2 className="h-4 w-4" />}
                tone={tone}
                label="FTE Capacity Released"
                value={`${output.fteReleased} FTE`}
              />
            </div>

            {(output.dsoImprovement !== undefined || output.closeDaysReduced !== undefined) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {output.dsoImprovement !== undefined && (
                  <OutcomeCard
                    icon={<TrendingDown className="h-4 w-4" />}
                    tone={tone}
                    label="DSO Improvement"
                    value={`${output.dsoImprovement} days`}
                  />
                )}
                {output.cashReleased !== undefined && output.cashReleased > 0 && (
                  <OutcomeCard
                    icon={<Wallet className="h-4 w-4" />}
                    tone={tone}
                    label="Cash Released (one-time)"
                    value={formatInr(output.cashReleased)}
                    highlight
                  />
                )}
                {output.closeDaysReduced !== undefined && (
                  <OutcomeCard
                    icon={<Timer className="h-4 w-4" />}
                    tone={tone}
                    label="Close Days Reduced"
                    value={`${output.closeDaysReduced} days`}
                  />
                )}
                {output.closeDaysCompressionPct !== undefined &&
                  output.closeDaysCompressionPct > 0 && (
                    <OutcomeCard
                      icon={<Timer className="h-4 w-4" />}
                      tone={tone}
                      label="Close Cycle Compression"
                      value={`${output.closeDaysCompressionPct}%`}
                      highlight
                    />
                  )}
              </div>
            )}

            <Card className="p-6 lg:p-7 mb-6">
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/50 mb-3">
                Assumption note
              </div>
              <p className="text-[14px] text-white/75 leading-relaxed max-w-3xl">
                Estimates are directional and depend on workflow maturity,
                process design, data quality, automation scope, and user adoption.
                Enterprise roll-ups across multiple modules and families become
                more accurate with a joint scoping workshop.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonLink
                href={CORE_ROUTES.bookDemo.path}
                variant="primary"
                size="lg"
                iconAfter
              >
                Book the joint workshop
              </ButtonLink>
              <ButtonLink
                href={CORE_ROUTES.contact.path}
                variant="secondary"
                size="lg"
              >
                Talk to a specialist
              </ButtonLink>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-[14px] text-white/70 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Model another module
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer nav */}
      {step < 4 && (
        <div className="mt-12 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
          <Button
            variant="ghost"
            size="md"
            onClick={goBack}
            disabled={step === 1}
            className={step === 1 ? "opacity-40 cursor-not-allowed" : ""}
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </span>
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={goNext}
            disabled={!canNext}
            className={!canNext ? "opacity-40 cursor-not-allowed" : ""}
          >
            <span className="inline-flex items-center gap-1.5">
              {step === 3 ? "See outcomes" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      )}
    </Container>
  );
}

function StepHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-amber)]">
        {eyebrow}
      </span>
      <h2 className="font-display text-[28px] lg:text-[36px] text-white leading-[1.15] tracking-[-0.015em] mt-2">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-[14.5px] text-white/55 leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

function OutcomeCard({
  icon,
  tone,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border p-6 lg:p-7 " +
        (highlight
          ? "border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
          : "border-white/[0.07] bg-white/[0.02]")
      }
    >
      {highlight && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: `radial-gradient(40% 80% at 20% 0%, color-mix(in srgb, ${tone} 14%, transparent), transparent 70%)`,
          }}
        />
      )}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${tone} 12%, transparent)`,
              color: tone,
            }}
          >
            {icon}
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
            {label}
          </span>
        </div>
        <div className="font-display text-[38px] lg:text-[44px] leading-none tracking-[-0.02em] text-white">
          {value}
        </div>
      </div>
    </div>
  );
}
