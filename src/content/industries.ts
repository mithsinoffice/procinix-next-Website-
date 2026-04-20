import type { IndustryContent } from "./types";

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  "retail-fashion": {
    slug: "retail-fashion",
    tagline: "SKU-level spend, vendor complexity, and multi-channel reconciliation — handled.",
    painPoints: [
      "Thousands of SKUs and seasonal vendors",
      "Marketplace deductions and chargebacks that pile up",
      "Store-level petty cash with weak audit trails",
      "Multi-entity operations across regions and banners",
    ],
    useCases: [
      { family: "s2p", title: "Vendor onboarding at scale", body: "Structured onboarding, compliance, and reconciliation for seasonal and long-tail vendors." },
      { family: "o2c", title: "Marketplace reconciliation", body: "Match marketplace settlements to invoices; deductions tied back to SKUs and orders." },
      { family: "r2r", title: "Store-level close", body: "Orchestrated month-end across banners, stores, and entities." },
    ],
    relevantModuleSlugs: [
      "accounts-payable",
      "vendor-reconciliation",
      "petty-cash",
      "accounts-receivable",
      "collections",
      "customer-reconciliation",
      "month-end-close",
    ],
    complexityHandled: [
      "Multi-entity, multi-banner rollups",
      "Marketplace deductions & chargebacks",
      "SKU-level spend analytics",
      "Seasonal vendor and workforce flows",
    ],
    outcomes: [
      { metric: "Cleaner reconciliation", detail: "Marketplace and store settlements tied out systematically." },
      { metric: "Faster month-end", detail: "Close orchestrated across stores and entities." },
      { metric: "Better vendor economics", detail: "Tight control of discounts, rebates, and deductions." },
    ],
  },
  manufacturing: {
    slug: "manufacturing",
    tagline: "Plant-level cost control. Vendor management. Multi-entity close.",
    painPoints: [
      "Plant-level spend visibility is weak",
      "Contract manufacturing vendors with complex invoicing",
      "Fixed assets scale and depreciation complexity",
      "Multi-plant, multi-entity close orchestration",
    ],
    useCases: [
      { family: "s2p", title: "Plant-level P2P", body: "Sourcing, procurement, and AP configured per plant with central oversight." },
      { family: "o2c", title: "B2B billing and AR", body: "Structured billing against contracts; AR intelligence for large-ticket customers." },
      { family: "r2r", title: "Multi-plant close", body: "Close with entity and plant hierarchies; intercompany automated." },
    ],
    relevantModuleSlugs: [
      "procurement",
      "accounts-payable",
      "fixed-assets",
      "budgeting-spend-control",
      "accounts-receivable",
      "consolidation",
      "month-end-close",
    ],
    complexityHandled: [
      "Plant and entity hierarchies",
      "Contract manufacturing economics",
      "Fixed asset lifecycle at scale",
      "Intercompany transactions and elimination",
    ],
    outcomes: [
      { metric: "Plant-level control", detail: "Spend visibility and commitments at the plant level, not just group." },
      { metric: "Fixed asset accuracy", detail: "Clean register; clean depreciation; clean audit." },
      { metric: "Faster group reporting", detail: "Consolidation packs out on schedule with IC handled." },
    ],
  },
  "construction-infrastructure": {
    slug: "construction-infrastructure",
    tagline: "Project-based finance — costing, billing, reconciliation at scale.",
    painPoints: [
      "Project-based costing across sites and phases",
      "Progress billing and retention accounting",
      "Subcontractor management and payment control",
      "Long project cycles; cash and working-capital pressure",
    ],
    useCases: [
      { family: "s2p", title: "Subcontractor P2P", body: "Subcontractor onboarding, POs, milestone-based invoicing, and payments." },
      { family: "o2c", title: "Progress billing", body: "Milestone billing, retention, and receivables tracked per project." },
      { family: "r2r", title: "Project close", body: "Project close with accruals, retentions, and completion accounting." },
    ],
    relevantModuleSlugs: [
      "procurement",
      "accounts-payable",
      "payments",
      "billing-invoicing",
      "accounts-receivable",
      "provisions-accruals",
      "amortization",
    ],
    complexityHandled: [
      "Project and phase hierarchies",
      "Retention, mobilization, and milestone accounting",
      "Subcontractor compliance and payment control",
      "Multi-site operations with shared central functions",
    ],
    outcomes: [
      { metric: "Better project economics", detail: "Cost and revenue tracked with discipline at project level." },
      { metric: "Stronger cash discipline", detail: "Progress billing and collections paced to the project curve." },
      { metric: "Control at scale", detail: "Subcontractor payments only after compliance and milestone sign-off." },
    ],
  },
  "d2c-ecommerce": {
    slug: "d2c-ecommerce",
    tagline: "High-velocity billing. Marketplace reconciliation. Cash visibility.",
    painPoints: [
      "Multi-channel billing across marketplaces and DTC",
      "Payment gateway and marketplace reconciliation",
      "Short cash cycles; working capital sensitivity",
      "Fragmented customer data and deduction chaos",
    ],
    useCases: [
      { family: "o2c", title: "Channel reconciliation", body: "Match gateway and marketplace settlements to orders and invoices." },
      { family: "o2c", title: "Deduction tie-out", body: "Marketplace chargebacks and deductions matched to root causes." },
      { family: "r2r", title: "Rolling cash visibility", body: "Cash forecasted continuously across channels and entities." },
    ],
    relevantModuleSlugs: [
      "billing-invoicing",
      "accounts-receivable",
      "customer-reconciliation",
      "collections",
      "cash-flow-visibility",
      "month-end-close",
    ],
    complexityHandled: [
      "High order volume, thin margins",
      "Marketplace reconciliation at scale",
      "Multi-entity, multi-country D2C ops",
      "Cash-sensitive working-capital cycles",
    ],
    outcomes: [
      { metric: "Cleaner reconciliation", detail: "Channel settlements tied out quickly and accurately." },
      { metric: "Better cash forecasting", detail: "Rolling forecasts refreshed from live transaction data." },
      { metric: "Faster month-end", detail: "Close not held hostage by deduction backlog." },
    ],
  },
  "enterprise-finance": {
    slug: "enterprise-finance",
    tagline: "Shared services, multi-entity, multi-country — at enterprise scale.",
    painPoints: [
      "Dozens of entities, ERPs, and policies",
      "Shared service centers operating at scale with weak tooling",
      "Global consolidation and group reporting pressure",
      "Controls and audit readiness across jurisdictions",
    ],
    useCases: [
      { family: "s2p", title: "Global P2P for shared services", body: "Standardized P2P across entities with regional variation handled." },
      { family: "o2c", title: "Global O2C", body: "AR and collections intelligence across currencies and jurisdictions." },
      { family: "r2r", title: "Global close and consolidation", body: "Orchestrated close with eliminations, translation, and group packs." },
    ],
    relevantModuleSlugs: [
      "accounts-payable",
      "payments",
      "accounts-receivable",
      "collections",
      "month-end-close",
      "consolidation",
      "year-end-close",
    ],
    complexityHandled: [
      "Multi-ERP, multi-entity, multi-country",
      "Shared service center operating models",
      "Global consolidation and elimination",
      "Jurisdictional controls and compliance",
    ],
    outcomes: [
      { metric: "Shared service scale", detail: "Consistent process, local flexibility — one platform." },
      { metric: "Faster global close", detail: "Group consolidation compressed significantly." },
      { metric: "Audit-ready posture", detail: "Controls, evidence, and documentation by design." },
    ],
  },
};

export const ALL_INDUSTRY_SLUGS = Object.keys(INDUSTRY_CONTENT);
