/**
 * Route registry — aligned with docs/BLUEPRINT.md sitemap.
 * Every URL on the site lives here so the nav, footer, sitemap, and SEO layer
 * stay in sync.
 */

export type Family = "s2p" | "o2c" | "r2r";

export type RouteDef = {
  path: string;
  label: string;
  title: string;
  description: string;
  keywords?: string[];
  group:
    | "core"
    | "pillar"
    | "module"
    | "industry"
    | "region"
    | "solution"
    | "utility";
  family?: Family;
};

// -------- Core pages --------
export const CORE_ROUTES = {
  home: {
    path: "/",
    label: "Home",
    title: "Procinix",
    description:
      "Unified finance operations platform. Agentic AI + intelligent workflows + real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report.",
    keywords: [
      "finance operations platform",
      "agentic AI finance",
      "source-to-pay",
      "order-to-cash",
      "record-to-report",
      "multi-entity finance",
    ],
    group: "core",
  },
  platform: {
    path: "/platform",
    label: "Platform",
    title: "The Procinix Platform",
    description:
      "One unified platform for Source-to-Pay, Order-to-Cash, and Record-to-Report. Agentic AI, configurable workflows, and real-time intelligence at enterprise scale.",
    group: "core",
  },
  industries: {
    path: "/industries",
    label: "Industries",
    title: "Industries",
    description:
      "Procinix adapts to the complexity of your industry — from retail and manufacturing to construction, D2C, and shared-services finance.",
    group: "core",
  },
  global: {
    path: "/global",
    label: "Global Coverage",
    title: "Global Coverage",
    description:
      "Built for multi-country, multi-currency, multi-entity operations across India, Middle East, Southeast Asia, Australia, and North America.",
    group: "core",
  },
  roi: {
    path: "/roi-calculator",
    label: "ROI / Value Assessment",
    title: "Finance Transformation Value Assessment",
    description:
      "Model monthly savings, annual savings, FTE capacity released, DSO improvement, cash released, and close days reduced — by finance family and module.",
    group: "core",
  },
  resources: {
    path: "/resources",
    label: "Resources",
    title: "Resources",
    description:
      "Guides, case studies, and perspectives on finance transformation, P2P, O2C, and R2R.",
    group: "core",
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contact Procinix",
    description: "Talk to a finance operations specialist.",
    group: "core",
  },
  bookDemo: {
    path: "/book-demo",
    label: "Book Demo",
    title: "Book a Demo",
    description:
      "See Procinix in action. A 30-minute walkthrough tailored to your finance operating model.",
    group: "core",
  },
} satisfies Record<string, RouteDef>;

// -------- Pillar pages (S2P / O2C / R2R) --------
export const PILLAR_ROUTES = {
  sourceToPay: {
    path: "/source-to-pay",
    label: "Source-to-Pay",
    title: "Source-to-Pay Platform",
    description:
      "Sourcing, procurement, AP, payments, T&E, petty cash, vendor reconciliation, budgeting, and fixed assets — one configurable S2P value stream.",
    keywords: ["source to pay", "P2P", "AP automation", "procurement automation"],
    group: "pillar",
    family: "s2p",
  },
  orderToCash: {
    path: "/order-to-cash",
    label: "Order-to-Cash",
    title: "Order-to-Cash Platform",
    description:
      "From order to cash, with AI-driven billing, AR, collections, and customer reconciliation — built to lower DSO and release working capital.",
    keywords: ["order to cash", "O2C", "AR automation", "DSO reduction", "collections automation"],
    group: "pillar",
    family: "o2c",
  },
  recordToReport: {
    path: "/record-to-report",
    label: "Record-to-Report",
    title: "Record-to-Report Platform",
    description:
      "Faster close, stronger controls, and real-time visibility across month-end, consolidation, provisions, amortization, and year-end.",
    keywords: ["record to report", "R2R", "month-end close", "financial consolidation"],
    group: "pillar",
    family: "r2r",
  },
} satisfies Record<string, RouteDef>;

// -------- Module pages --------
export const MODULE_ROUTES = {
  // S2P
  sourcing: { path: "/modules/sourcing", label: "Sourcing", title: "Sourcing", description: "Strategic sourcing workflows from RFx to award.", group: "module", family: "s2p" },
  procurement: { path: "/modules/procurement", label: "Procurement", title: "Procurement", description: "Requisition to PO with policy enforcement and controls.", group: "module", family: "s2p" },
  accountsPayable: { path: "/modules/accounts-payable", label: "Accounts Payable", title: "Accounts Payable", description: "End-to-end AP: capture, match, approve, pay — with audit-ready controls.", group: "module", family: "s2p" },
  payments: { path: "/modules/payments", label: "Payments", title: "Payments", description: "Secure, scheduled payments across banks, entities, and currencies.", group: "module", family: "s2p" },
  travelExpense: { path: "/modules/travel-expense", label: "Travel & Expense", title: "Travel & Expense", description: "Policy-aware T&E with mobile capture and automated reimbursement.", group: "module", family: "s2p" },
  pettyCash: { path: "/modules/petty-cash", label: "Petty Cash", title: "Petty Cash", description: "Digitized petty cash with full audit trails.", group: "module", family: "s2p" },
  vendorReconciliation: { path: "/modules/vendor-reconciliation", label: "Vendor Reconciliation", title: "Vendor Reconciliation", description: "Automated vendor statement matching and dispute workflows.", group: "module", family: "s2p" },
  budgetingSpendControl: { path: "/modules/budgeting-spend-control", label: "Budgeting & Spend Control", title: "Budgeting & Spend Control", description: "Real-time budget checks and commitment accounting.", group: "module", family: "s2p" },
  fixedAssets: { path: "/modules/fixed-assets", label: "Fixed Assets", title: "Fixed Assets", description: "Lifecycle management from acquisition to disposal.", group: "module", family: "s2p" },
  // O2C
  orderManagement: { path: "/modules/order-management", label: "Order Management", title: "Order Management", description: "Order capture, validation, and fulfilment orchestration.", group: "module", family: "o2c" },
  billingInvoicing: { path: "/modules/billing-invoicing", label: "Billing & Invoicing", title: "Billing & Invoicing", description: "Automated billing, e-invoicing, and revenue recognition support.", group: "module", family: "o2c" },
  accountsReceivable: { path: "/modules/accounts-receivable", label: "Accounts Receivable", title: "Accounts Receivable", description: "Cash application, aging, and AR intelligence at scale.", group: "module", family: "o2c" },
  collections: { path: "/modules/collections", label: "Collections", title: "Collections", description: "Agentic collections workflows that reduce DSO and protect relationships.", group: "module", family: "o2c" },
  customerReconciliation: { path: "/modules/customer-reconciliation", label: "Customer Reconciliation", title: "Customer Reconciliation", description: "Automated statement reconciliation and dispute resolution.", group: "module", family: "o2c" },
  // R2R
  monthEndClose: { path: "/modules/month-end-close", label: "Month-End Close", title: "Month-End Close", description: "Close faster with task orchestration, auto-reconciliations, and journals.", group: "module", family: "r2r" },
  cashFlowVisibility: { path: "/modules/cash-flow-visibility", label: "Cash Flow Visibility", title: "Cash Flow Visibility", description: "Real-time cash position and forecasting across entities.", group: "module", family: "r2r" },
  consolidation: { path: "/modules/consolidation", label: "Consolidation", title: "Consolidation", description: "Multi-entity, multi-currency consolidation with eliminations and controls.", group: "module", family: "r2r" },
  provisionsAccruals: { path: "/modules/provisions-accruals", label: "Provisions & Accruals", title: "Provisions & Accruals", description: "Automated provision, accrual, and deferral workflows.", group: "module", family: "r2r" },
  amortization: { path: "/modules/amortization", label: "Amortization", title: "Amortization", description: "Schedule-driven amortization with full audit trail.", group: "module", family: "r2r" },
  yearEndClose: { path: "/modules/year-end-close", label: "Year-End Close", title: "Year-End Close", description: "Streamlined year-end with packs, provisions, and controls.", group: "module", family: "r2r" },
} satisfies Record<string, RouteDef>;

// -------- Industry pages --------
export const INDUSTRY_ROUTES = {
  retailFashion: { path: "/industries/retail-fashion", label: "Retail & Fashion", title: "Retail & Fashion Finance Operations", description: "SKU-level spend, vendor complexity, and multi-channel reconciliation handled.", group: "industry" },
  manufacturing: { path: "/industries/manufacturing", label: "Manufacturing", title: "Manufacturing Finance Operations", description: "Plant-level cost control, vendor mgmt, and multi-entity close.", group: "industry" },
  constructionInfrastructure: { path: "/industries/construction-infrastructure", label: "Construction & Infrastructure", title: "Construction & Infrastructure Finance Operations", description: "Project-based costing, progress billing, and vendor reconciliation at scale.", group: "industry" },
  d2cEcommerce: { path: "/industries/d2c-ecommerce", label: "D2C / E-commerce", title: "D2C & E-commerce Finance Operations", description: "Marketplace reconciliation, high-velocity billing, and cash visibility.", group: "industry" },
  enterpriseFinance: { path: "/industries/enterprise-finance", label: "Enterprise Finance", title: "Enterprise Finance Teams", description: "Shared services, multi-entity, multi-country operations at enterprise scale.", group: "industry" },
} satisfies Record<string, RouteDef>;

// -------- Region pages --------
export const REGION_ROUTES = {
  india: { path: "/regions/india", label: "India", title: "Procinix in India", description: "GST, e-invoicing, multi-entity India operations at scale.", group: "region" },
  uae: { path: "/regions/uae", label: "UAE", title: "Procinix in UAE", description: "VAT, e-invoicing roadmap, and regional finance shared services.", group: "region" },
  saudiArabia: { path: "/regions/saudi-arabia", label: "Saudi Arabia", title: "Procinix in Saudi Arabia", description: "ZATCA e-invoicing and Kingdom-wide finance operations.", group: "region" },
  singapore: { path: "/regions/singapore", label: "Singapore", title: "Procinix in Singapore", description: "Regional HQs, IMDA InvoiceNow, and APAC finance operations.", group: "region" },
  australia: { path: "/regions/australia", label: "Australia", title: "Procinix in Australia", description: "Peppol e-invoicing and multi-state finance operations.", group: "region" },
  usa: { path: "/regions/usa", label: "USA", title: "Procinix in USA", description: "Multi-state tax, ACH/wire payments, and enterprise finance operations.", group: "region" },
} satisfies Record<string, RouteDef>;

// -------- Geo + use-case landing (SEO/SEM) --------
export const SOLUTION_ROUTES = {
  indiaP2P: { path: "/solutions/india-p2p-software", label: "India P2P Software", title: "P2P Software for India", description: "Procure-to-pay automation for India enterprises — GST, e-invoicing, multi-entity.", group: "solution" },
  uaeAp: { path: "/solutions/uae-accounts-payable-automation", label: "UAE AP Automation", title: "AP Automation for UAE", description: "Accounts payable automation for UAE — VAT, multi-entity, shared services.", group: "solution" },
  saudiFinance: { path: "/solutions/saudi-finance-automation", label: "Saudi Finance Automation", title: "Finance Automation for Saudi Arabia", description: "Finance operations automation for Saudi — ZATCA, multi-entity, enterprise scale.", group: "solution" },
  singaporeInvoice: { path: "/solutions/singapore-invoice-automation", label: "Singapore Invoice Automation", title: "Invoice Automation for Singapore", description: "Invoice automation for Singapore — IMDA InvoiceNow ready.", group: "solution" },
  australiaExpense: { path: "/solutions/australia-expense-management", label: "Australia Expense Management", title: "Expense Management for Australia", description: "Expense management for Australian enterprises — Peppol, multi-state.", group: "solution" },
  usaFinanceOps: { path: "/solutions/usa-finance-operations-platform", label: "USA Finance Operations Platform", title: "Finance Operations Platform for USA", description: "Finance operations platform for US enterprises — multi-state, ACH, ERP-ready.", group: "solution" },
} satisfies Record<string, RouteDef>;

// -------- Utility --------
export const UTILITY_ROUTES = {
  privacy: { path: "/privacy-policy", label: "Privacy Policy", title: "Privacy Policy", description: "How Procinix handles your data.", group: "utility" },
  terms: { path: "/terms", label: "Terms of Service", title: "Terms of Service", description: "Terms governing use of procinix.ai.", group: "utility" },
} satisfies Record<string, RouteDef>;

// -------- Aggregates --------
export const ROUTES = {
  ...CORE_ROUTES,
  ...PILLAR_ROUTES,
  ...MODULE_ROUTES,
  ...INDUSTRY_ROUTES,
  ...REGION_ROUTES,
  ...SOLUTION_ROUTES,
  ...UTILITY_ROUTES,
};

export type RouteKey = keyof typeof ROUTES;

export const ALL_ROUTE_PATHS = Object.values(ROUTES).map((r) => r.path);

export const MODULES_BY_FAMILY: Record<Family, RouteDef[]> = {
  s2p: Object.values(MODULE_ROUTES).filter((r) => r.family === "s2p"),
  o2c: Object.values(MODULE_ROUTES).filter((r) => r.family === "o2c"),
  r2r: Object.values(MODULE_ROUTES).filter((r) => r.family === "r2r"),
};

export const PILLARS: Array<{
  route: RouteDef;
  tagline: string;
  modules: RouteDef[];
}> = [
  {
    route: PILLAR_ROUTES.sourceToPay,
    tagline: "Spend, sourced and controlled end-to-end.",
    modules: MODULES_BY_FAMILY.s2p,
  },
  {
    route: PILLAR_ROUTES.orderToCash,
    tagline: "Revenue, realized faster — DSO in your favour.",
    modules: MODULES_BY_FAMILY.o2c,
  },
  {
    route: PILLAR_ROUTES.recordToReport,
    tagline: "Close, controllership, visibility — on time, every time.",
    modules: MODULES_BY_FAMILY.r2r,
  },
];
