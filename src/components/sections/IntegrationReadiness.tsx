"use client";

import { motion } from "framer-motion";
import { Plug, Building2, Landmark, Receipt, Globe, Network } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";

type Group = {
  icon: ReactNode;
  label: string;
  examples: string[];
};

const groups: Group[] = [
  {
    icon: <Building2 className="h-4 w-4" />,
    label: "ERPs",
    examples: ["SAP", "Oracle", "NetSuite", "Microsoft Dynamics", "Workday", "Tally", "Zoho Books"],
  },
  {
    icon: <Landmark className="h-4 w-4" />,
    label: "Banks",
    examples: ["HDFC", "ICICI", "Citi", "HSBC", "Emirates NBD", "DBS", "JPMorgan"],
  },
  {
    icon: <Receipt className="h-4 w-4" />,
    label: "Tax & e-Invoicing",
    examples: ["GSTN (India)", "FTA (UAE)", "ZATCA (KSA)", "IMDA InvoiceNow", "Peppol", "IRAS"],
  },
  {
    icon: <Globe className="h-4 w-4" />,
    label: "Identity & SSO",
    examples: ["Okta", "Azure AD / Entra", "Google Workspace", "OneLogin", "SAML 2.0", "OIDC"],
  },
  {
    icon: <Network className="h-4 w-4" />,
    label: "Data & BI",
    examples: ["Snowflake", "BigQuery", "Power BI", "Tableau", "Looker", "dbt"],
  },
  {
    icon: <Plug className="h-4 w-4" />,
    label: "Productivity",
    examples: ["Slack", "Teams", "Email", "Webhooks", "REST APIs", "SFTP"],
  },
];

export function IntegrationReadiness() {
  return (
    <Section
      eyebrow="Integration Readiness"
      title={<>Connected to <span className="text-white/40">everything that matters.</span></>}
      description="Procinix sits on top of your existing landscape — not beside it. ERPs, banks, tax authorities, identity providers, BI stacks, and productivity tools."
      className="bg-[var(--bg-secondary)]/50 border-y border-white/[0.04]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
          >
            <Card className="h-full p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                  {g.icon}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)]">
                  {g.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.examples.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11.5px] text-white/70"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-[13px] text-white/40 max-w-3xl">
        Additional connectors available via REST APIs, webhooks, SFTP, and
        partner integrations. Integration layer is ERP-agnostic — deploy
        Procinix first, and add integrations progressively.
      </p>
    </Section>
  );
}
