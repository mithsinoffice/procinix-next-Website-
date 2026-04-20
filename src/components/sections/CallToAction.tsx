"use client";

import { motion } from "framer-motion";
import { Sparkles, Calculator, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { ButtonLink } from "@/components/primitives/Button";
import { CORE_ROUTES } from "@/lib/routes";

export function CallToAction() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(17,197,198,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-[var(--accent-teal)]/60 to-transparent"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] animate-[pulse-soft_2.4s_ease-in-out_infinite]" />
            Ready when you are
          </span>

          <h2 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-0.02em] text-white">
            See the platform <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[var(--accent-teal-bright)] to-[var(--accent-amber)] bg-clip-text text-transparent">
              work on your numbers.
            </span>
          </h2>

          <p className="mt-7 text-[17px] lg:text-[18.5px] text-white/65 max-w-2xl leading-[1.6]">
            Start with a 20-minute walkthrough, or model the value yourself with
            our Finance Transformation Value Assessment.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <ButtonLink
              href={CORE_ROUTES.bookDemo.path}
              variant="primary"
              size="lg"
              icon={<Sparkles className="h-4 w-4" />}
              iconAfter
            >
              Book a Demo
            </ButtonLink>
            <ButtonLink
              href={CORE_ROUTES.roi.path}
              variant="secondary"
              size="lg"
              icon={<Calculator className="h-4 w-4" />}
            >
              Run the Value Assessment
            </ButtonLink>
            <ButtonLink
              href={CORE_ROUTES.contact.path}
              variant="ghost"
              size="lg"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Talk to an Expert
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
