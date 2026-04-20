"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/primitives/Section";

type Tone = "teal" | "amber" | "purple";

type Term = { label: string; href: string };

type Column = {
  tone: Tone;
  eyebrow: string;
  terms: Term[];
};

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

const columns: Column[] = [
  {
    tone: "teal",
    eyebrow: "Source-to-Pay (S2P)",
    terms: [
      { label: "Procure-to-Pay (P2P)", href: "/source-to-pay" },
      { label: "AP Automation", href: "/modules/accounts-payable" },
      { label: "Accounts Payable", href: "/modules/accounts-payable" },
      { label: "Invoice OCR", href: "/modules/accounts-payable" },
      { label: "AI Invoice Capture", href: "/modules/accounts-payable" },
      { label: "Email Invoice Ingestion", href: "/modules/accounts-payable" },
      { label: "3-Way Matching", href: "/modules/accounts-payable" },
      { label: "Touchless Invoice Processing", href: "/modules/accounts-payable" },
      { label: "Payment Automation", href: "/modules/payments" },
      { label: "Strategic Sourcing", href: "/modules/sourcing" },
      { label: "RFx / RFP / RFQ", href: "/modules/sourcing" },
      { label: "Tender Management", href: "/modules/sourcing" },
      { label: "Procurement Automation", href: "/modules/procurement" },
      { label: "Vendor Reconciliation", href: "/modules/vendor-reconciliation" },
      { label: "Vendor Governance", href: "/modules/vendor-reconciliation" },
      { label: "Budgeting & Spend Control", href: "/modules/budgeting-spend-control" },
      { label: "Travel & Expense (T&E)", href: "/modules/travel-expense" },
      { label: "Petty Cash Management", href: "/modules/petty-cash" },
      { label: "Fixed Assets Management", href: "/modules/fixed-assets" },
    ],
  },
  {
    tone: "amber",
    eyebrow: "Order-to-Cash (O2C)",
    terms: [
      { label: "Order-to-Cash (O2C)", href: "/order-to-cash" },
      { label: "AR Automation", href: "/modules/accounts-receivable" },
      { label: "Accounts Receivable", href: "/modules/accounts-receivable" },
      { label: "Order Management", href: "/modules/order-management" },
      { label: "Billing & E-Invoicing", href: "/modules/billing-invoicing" },
      { label: "Cash Application", href: "/modules/accounts-receivable" },
      { label: "Collections Automation", href: "/modules/collections" },
      { label: "DSO Reduction", href: "/modules/collections" },
      { label: "Dunning Workflows", href: "/modules/collections" },
      { label: "Customer Reconciliation", href: "/modules/customer-reconciliation" },
      { label: "Dispute & Deduction Mgmt", href: "/modules/customer-reconciliation" },
      { label: "Working Capital Optimization", href: "/modules/accounts-receivable" },
    ],
  },
  {
    tone: "purple",
    eyebrow: "Record-to-Report (R2R)",
    terms: [
      { label: "Record-to-Report (R2R)", href: "/record-to-report" },
      { label: "Month-End Close Automation", href: "/modules/month-end-close" },
      { label: "Year-End Close", href: "/modules/year-end-close" },
      { label: "Financial Close Software", href: "/modules/month-end-close" },
      { label: "Account Reconciliation", href: "/modules/month-end-close" },
      { label: "Journal Entry Automation", href: "/modules/month-end-close" },
      { label: "Financial Consolidation", href: "/modules/consolidation" },
      { label: "Intercompany Reconciliation", href: "/modules/consolidation" },
      { label: "Cash Flow Visibility", href: "/modules/cash-flow-visibility" },
      { label: "Cash Flow Forecasting", href: "/modules/cash-flow-visibility" },
      { label: "Provisions & Accruals", href: "/modules/provisions-accruals" },
      { label: "Amortization Schedules", href: "/modules/amortization" },
      { label: "Statutory Reporting", href: "/modules/year-end-close" },
      { label: "Finance Analytics & Insights", href: "/platform" },
    ],
  },
];

export function SearchTermsBand() {
  return (
    <Section
      id="capabilities-glossary"
      eyebrow="Every term. Every workflow."
      title={
        <>
          One platform,{" "}
          <span className="text-white/40">by every name it's known.</span>
        </>
      }
      description="Finance teams call these workflows by many names across industries and regions. Procinix covers all of them — search for what you need."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {columns.map((col, ci) => (
          <motion.div
            key={col.eyebrow}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: ci * 0.08, duration: 0.55, ease: "easeOut" }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 lg:p-7"
          >
            <div className="flex items-center gap-2 mb-5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: toneVar[col.tone] }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.22em] font-medium"
                style={{ color: toneVar[col.tone] }}
              >
                {col.eyebrow}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {col.terms.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12.5px] text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-[13px] text-white/45 max-w-4xl leading-relaxed">
        Also relevant for teams searching: <span className="text-white/60">AP automation India</span> · <span className="text-white/60">P2P software</span> · <span className="text-white/60">e-invoicing compliance</span> · <span className="text-white/60">multi-entity finance operations</span> · <span className="text-white/60">agentic AI for finance</span> · <span className="text-white/60">finance transformation</span> · <span className="text-white/60">shared services finance</span> · <span className="text-white/60">GST e-invoicing</span> · <span className="text-white/60">ZATCA e-invoicing</span> · <span className="text-white/60">Peppol InvoiceNow</span> · <span className="text-white/60">SOX-ready finance controls</span>.
      </p>
    </Section>
  );
}
