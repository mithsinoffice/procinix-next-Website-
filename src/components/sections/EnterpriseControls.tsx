"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  History,
  Users2,
  FileSearch,
  Lock,
} from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";

type Control = {
  icon: ReactNode;
  title: string;
  body: string;
};

const controls: Control[] = [
  {
    icon: <Users2 className="h-5 w-5" />,
    title: "Role-based access + SoD",
    body: "Fine-grained permissions with segregation-of-duty enforcement across every workflow.",
  },
  {
    icon: <KeyRound className="h-5 w-5" />,
    title: "SSO & directory-aware",
    body: "SAML/OIDC SSO, directory-sync, and conditional access — enterprise identity out of the box.",
  },
  {
    icon: <History className="h-5 w-5" />,
    title: "Immutable audit trail",
    body: "Every action, every change, every approval logged with actor, timestamp, and context.",
  },
  {
    icon: <FileSearch className="h-5 w-5" />,
    title: "Policy-driven controls",
    body: "Thresholds, delegations, and compliance rules enforced at the workflow — not the spreadsheet.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Data protection",
    body: "Encryption in transit and at rest; regional data residency where mandated.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Audit-ready by design",
    body: "Evidence captured at source — available at the click, not reconstructed at year-end.",
  },
];

export function EnterpriseControls() {
  return (
    <Section
      eyebrow="Enterprise Controls"
      title={<>Built for <span className="text-white/40">audit and scale.</span></>}
      description="Controls and evidence aren't a feature — they're the foundation. Every workflow assumes an auditor will ask."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {controls.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
          >
            <Card className="h-full p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/8 text-[var(--accent-teal-bright)] mb-5">
                {c.icon}
              </span>
              <h3 className="font-display text-[17px] font-semibold text-white leading-snug mb-2">
                {c.title}
              </h3>
              <p className="text-[13.5px] text-white/60 leading-relaxed">
                {c.body}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
