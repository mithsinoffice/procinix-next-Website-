"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { CORE_ROUTES, REGION_ROUTES } from "@/lib/routes";

const regionCompliance: Record<string, string> = {
  india: "GST · e-Invoice",
  uae: "VAT · e-Invoicing",
  "saudi-arabia": "ZATCA",
  singapore: "InvoiceNow",
  australia: "Peppol",
  usa: "Multi-state · ACH",
};

export function GlobalStrip() {
  const regions = Object.values(REGION_ROUTES);
  return (
    <Section
      id="global-home"
      eyebrow="Global Coverage"
      title={
        <>
          Multi-country. Multi-currency. <span className="text-white/40">Multi-entity.</span>
        </>
      }
      description="Six core regions on one platform — compliance flexibility and operating-model variation where you need it."
      className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-px rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.04]">
        {regions.map((r, i) => {
          const slug = r.path.split("/").pop() ?? "";
          return (
            <motion.div
              key={r.path}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
              className="bg-[var(--bg-primary)]"
            >
              <Link
                href={r.path}
                className="group flex h-full flex-col justify-between p-6 lg:p-7 hover:bg-white/[0.03] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--accent-teal)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/25 group-hover:text-[var(--accent-teal-bright)] transition-colors" />
                  </div>
                  <h3 className="font-display text-[18px] font-semibold text-white leading-tight mb-1.5">
                    {r.label}
                  </h3>
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-white/40">
                    {regionCompliance[slug]}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-start">
        <Link
          href={CORE_ROUTES.global.path}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-[13.5px] text-white hover:border-[var(--accent-teal)]/70 hover:bg-white/[0.04] transition-all"
        >
          Global coverage detail
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
