"use client";

import { Container } from "@/components/primitives/Container";

const stats = [
  {
    value: "3",
    label: "Finance cycles",
    detail: "S2P · O2C · R2R",
  },
  {
    value: "20+",
    label: "Modules",
    detail: "Configurable, not bespoke",
  },
  {
    value: "6",
    label: "Core regions",
    detail: "India · ME · SEA · ANZ · NA",
  },
  {
    value: "99%+",
    label: "Accuracy",
    detail: "Structured workflows",
  },
];

export function TrustBand() {
  return (
    <section className="relative border-y border-white/[0.05] bg-[var(--bg-secondary)]/50 py-14">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <div className="font-display text-4xl lg:text-[44px] text-white tracking-[-0.02em] leading-none">
                {s.value}
              </div>
              <div className="text-[13px] text-white mt-2.5">{s.label}</div>
              <div className="text-[12px] text-white/45 mt-0.5">{s.detail}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
