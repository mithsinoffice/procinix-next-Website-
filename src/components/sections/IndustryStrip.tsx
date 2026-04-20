"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShoppingBag,
  Factory,
  HardHat,
  Smartphone,
  Building2,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { CORE_ROUTES, INDUSTRY_ROUTES } from "@/lib/routes";
import type { ReactNode } from "react";

const industryIcons: Record<string, ReactNode> = {
  "retail-fashion": <ShoppingBag className="h-5 w-5" />,
  manufacturing: <Factory className="h-5 w-5" />,
  "construction-infrastructure": <HardHat className="h-5 w-5" />,
  "d2c-ecommerce": <Smartphone className="h-5 w-5" />,
  "enterprise-finance": <Building2 className="h-5 w-5" />,
};

export function IndustryStrip() {
  const industries = Object.values(INDUSTRY_ROUTES);
  return (
    <Section
      id="industries-home"
      eyebrow="Industry Coverage"
      title={
        <>
          Complexity handled <span className="text-white/40">by sector.</span>
        </>
      }
      description="Configurable for the real operating models of retail, manufacturing, construction, D2C, and enterprise finance teams."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {industries.map((ind, i) => {
          const slug = ind.path.split("/").pop() ?? "";
          return (
            <motion.div
              key={ind.path}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
            >
              <Link href={ind.path} className="block h-full">
                <Card interactive glow className="h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)] mb-5">
                    {industryIcons[slug]}
                  </span>
                  <h3 className="font-display text-[16px] font-semibold text-white leading-snug mb-2">
                    {ind.label}
                  </h3>
                  <p className="text-[12.5px] text-white/55 leading-relaxed mb-5">
                    {ind.description}
                  </p>
                  <div className="flex items-center gap-1 text-[12px] text-white/70">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-start">
        <Link
          href={CORE_ROUTES.industries.path}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-[13.5px] text-white hover:border-[var(--accent-teal)]/70 hover:bg-white/[0.04] transition-all"
        >
          All industries
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
