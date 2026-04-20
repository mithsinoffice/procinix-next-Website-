"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart, CreditCard, BookOpen } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { PILLARS } from "@/lib/routes";
import type { ReactNode } from "react";

const pillarIcons: Record<string, ReactNode> = {
  s2p: <ShoppingCart className="h-5 w-5" />,
  o2c: <CreditCard className="h-5 w-5" />,
  r2r: <BookOpen className="h-5 w-5" />,
};

const pillarAccent: Record<string, string> = {
  s2p: "var(--accent-teal)",
  o2c: "var(--accent-amber)",
  r2r: "var(--accent-purple)",
};

export function FinanceFamilies() {
  return (
    <Section
      id="families"
      eyebrow="The Backbone"
      title={
        <>
          One platform.{" "}
          <span className="text-white/40">Three finance cycles.</span>
        </>
      }
      description="Source-to-Pay, Order-to-Cash, and Record-to-Report — unified under one configurable operating model. Every entity, every country, every module in sync."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {PILLARS.map((p, i) => {
          const family = p.route.family!;
          const accent = pillarAccent[family];
          return (
            <motion.div
              key={p.route.path}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Link href={p.route.path} className="block h-full">
                <Card interactive glow className="h-full p-8 lg:p-10 flex flex-col">
                  {/* Top: icon + family label */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                        color: accent,
                      }}
                    >
                      {pillarIcons[family]}
                    </span>
                    <span
                      className="text-[10.5px] font-medium uppercase tracking-[0.22em]"
                      style={{ color: accent }}
                    >
                      {family.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[26px] lg:text-[30px] text-white leading-[1.15] tracking-[-0.01em] mb-3">
                    {p.route.label}
                  </h3>
                  <p className="text-[15px] text-white/60 leading-relaxed mb-8">
                    {p.tagline}
                  </p>

                  {/* Modules list */}
                  <ul className="space-y-1.5 mb-8 flex-1">
                    {p.modules.slice(0, 6).map((m) => (
                      <li
                        key={m.path}
                        className="flex items-center gap-2 text-[13.5px] text-white/55"
                      >
                        <span
                          className="h-px w-3"
                          style={{ backgroundColor: accent, opacity: 0.5 }}
                        />
                        {m.label}
                      </li>
                    ))}
                    {p.modules.length > 6 && (
                      <li className="text-[12.5px] text-white/35 pl-5">
                        +{p.modules.length - 6} more
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-[13.5px] text-white/90 group-hover:text-white transition-colors">
                    <span>Explore {p.route.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: accent }}
                    />
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
