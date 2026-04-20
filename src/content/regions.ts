import type { RegionContent } from "./types";

export const REGION_CONTENT: Record<string, RegionContent> = {
  india: {
    slug: "india",
    tagline: "GST, e-Invoicing, and multi-entity India operations at scale.",
    compliance: [
      "GST & GSTR filings",
      "E-Invoice (IRN/QR) compliance",
      "TDS & TCS handling",
      "Multi-state operations",
      "Ind-AS reporting",
    ],
    painPoints: [
      "Multi-state GST compliance across branches",
      "E-invoicing mandates evolving rapidly",
      "Complex vendor and customer reconciliations",
      "Reconciling TDS/TCS across payments and receipts",
    ],
    outcomes: [
      { metric: "Compliance confidence", detail: "GST, e-invoicing, and TDS/TCS handled end-to-end." },
      { metric: "Faster close", detail: "Multi-entity India close with reconciliations automated." },
      { metric: "Better controls", detail: "Branch-level visibility with central governance." },
    ],
    signatureModuleSlugs: [
      "accounts-payable",
      "billing-invoicing",
      "accounts-receivable",
      "vendor-reconciliation",
      "month-end-close",
    ],
  },
  uae: {
    slug: "uae",
    tagline: "VAT, e-invoicing roadmap, and regional finance shared services.",
    compliance: [
      "VAT (5%) compliance and filings",
      "E-invoicing readiness",
      "Multi-entity UAE free zone + mainland",
      "AML and sanctions screening",
    ],
    painPoints: [
      "VAT treatment across free zone and mainland entities",
      "E-invoicing mandate readiness",
      "Regional shared services supporting GCC operations",
      "Multi-currency cash and working capital",
    ],
    outcomes: [
      { metric: "VAT accuracy", detail: "Tax codes, returns, and disclosures handled correctly by entity." },
      { metric: "Shared service efficiency", detail: "Regional SSC operating model supported natively." },
      { metric: "E-invoicing ready", detail: "Prepared for mandated e-invoicing rollouts." },
    ],
    signatureModuleSlugs: [
      "accounts-payable",
      "payments",
      "billing-invoicing",
      "accounts-receivable",
      "consolidation",
    ],
  },
  "saudi-arabia": {
    slug: "saudi-arabia",
    tagline: "ZATCA e-invoicing and Kingdom-wide finance operations.",
    compliance: [
      "ZATCA e-invoicing (Phase 1 and 2)",
      "VAT compliance and filings",
      "Saudization and local content considerations",
      "Multi-entity Kingdom operations",
    ],
    painPoints: [
      "ZATCA Phase 2 integration complexity",
      "E-invoice formats and QR validation",
      "Local content and government reporting",
      "Multi-entity consolidation in Saudi Riyal",
    ],
    outcomes: [
      { metric: "ZATCA compliant", detail: "Phase 1 and Phase 2 e-invoicing handled end-to-end." },
      { metric: "Clean VAT posture", detail: "Returns and reconciliations on schedule." },
      { metric: "Kingdom-wide visibility", detail: "Consolidated view across Kingdom operations." },
    ],
    signatureModuleSlugs: [
      "billing-invoicing",
      "accounts-payable",
      "accounts-receivable",
      "month-end-close",
      "consolidation",
    ],
  },
  singapore: {
    slug: "singapore",
    tagline: "Regional HQs, InvoiceNow, and APAC finance operations.",
    compliance: [
      "GST compliance",
      "IMDA InvoiceNow (Peppol) adoption",
      "Regional HQ & holding structures",
      "IRAS filings and reporting",
    ],
    painPoints: [
      "Regional HQ supporting multiple APAC entities",
      "InvoiceNow / Peppol integration",
      "Multi-currency and intercompany complexity",
      "Cross-border compliance and transfer pricing",
    ],
    outcomes: [
      { metric: "InvoiceNow ready", detail: "Peppol-compliant e-invoicing flows live." },
      { metric: "APAC visibility", detail: "Regional consolidation and intercompany flows automated." },
      { metric: "Clean IRAS posture", detail: "GST and reporting on schedule." },
    ],
    signatureModuleSlugs: [
      "billing-invoicing",
      "accounts-receivable",
      "consolidation",
      "cash-flow-visibility",
      "month-end-close",
    ],
  },
  australia: {
    slug: "australia",
    tagline: "Peppol e-invoicing and multi-state finance operations.",
    compliance: [
      "GST compliance",
      "Peppol e-invoicing",
      "PAYG and superannuation reporting",
      "Multi-state operations",
    ],
    painPoints: [
      "Peppol e-invoicing adoption across trading partners",
      "Multi-state operations and shared services",
      "Superannuation and payroll-adjacent controls",
      "Reporting across AU and NZ entities",
    ],
    outcomes: [
      { metric: "Peppol-ready", detail: "E-invoicing flows live with compliant trading partners." },
      { metric: "Multi-state clarity", detail: "Branch-level visibility with central governance." },
      { metric: "Clean reporting", detail: "BAS/GST and statutory reporting on schedule." },
    ],
    signatureModuleSlugs: [
      "billing-invoicing",
      "accounts-payable",
      "travel-expense",
      "accounts-receivable",
      "month-end-close",
    ],
  },
  usa: {
    slug: "usa",
    tagline: "Multi-state tax, ACH & wires, and enterprise finance operations.",
    compliance: [
      "Multi-state sales/use tax",
      "1099 reporting",
      "ACH/wire payment controls",
      "SOX controls for public companies",
    ],
    painPoints: [
      "Multi-state sales and use tax complexity",
      "ACH/wire payment control and fraud prevention",
      "SOX controls for public or IPO-bound finance functions",
      "1099 reporting at vendor scale",
    ],
    outcomes: [
      { metric: "SOX-grade controls", detail: "Segregation of duties, evidence, and audit trails by design." },
      { metric: "Payment security", detail: "Controls on ACH/wires with sanctions and beneficiary validation." },
      { metric: "Multi-state clarity", detail: "Tax handled per jurisdiction with full visibility." },
    ],
    signatureModuleSlugs: [
      "accounts-payable",
      "payments",
      "accounts-receivable",
      "collections",
      "month-end-close",
    ],
  },
};

export const ALL_REGION_SLUGS = Object.keys(REGION_CONTENT);
