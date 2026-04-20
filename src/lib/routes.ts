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
      "Unified finance operations platform. AP automation, P2P software, sourcing & RFx, vendor reconciliation, O2C and AR, month-end close, cash flow, and analytics — with agentic AI, intelligent workflows, and real-time insights across Source-to-Pay, Order-to-Cash, and Record-to-Report.",
    keywords: [
      "finance operations platform",
      "finance automation",
      "agentic AI finance",
      "AP automation",
      "accounts payable automation",
      "P2P software",
      "procure to pay",
      "source to pay",
      "S2P",
      "3-way matching",
      "invoice OCR",
      "AI invoice processing",
      "email invoice ingestion",
      "strategic sourcing",
      "RFP software",
      "RFQ",
      "RFx",
      "tender management",
      "procurement automation",
      "vendor reconciliation",
      "vendor governance",
      "budgeting software",
      "order to cash",
      "O2C",
      "AR automation",
      "accounts receivable",
      "collections automation",
      "DSO reduction",
      "customer reconciliation",
      "record to report",
      "R2R",
      "month-end close automation",
      "financial close software",
      "year-end close",
      "financial consolidation",
      "cash flow management",
      "cash flow forecasting",
      "data analytics and insights",
      "multi-entity finance",
      "shared services finance",
      "e-invoicing",
      "GST e-invoicing",
      "ZATCA e-invoicing",
      "Peppol",
      "InvoiceNow",
    ],
    group: "core",
  },
  platform: {
    path: "/platform",
    label: "Platform",
    title: "The Procinix Platform",
    description:
      "One unified finance operations platform for Source-to-Pay (S2P / P2P), Order-to-Cash (O2C), and Record-to-Report (R2R). Agentic AI, configurable workflows, real-time analytics, and insights at enterprise scale.",
    keywords: [
      "finance operations platform",
      "P2P software",
      "source-to-pay platform",
      "AP automation",
      "order-to-cash software",
      "record-to-report automation",
      "financial close software",
      "finance analytics",
      "agentic AI finance",
      "multi-entity finance platform",
    ],
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
    keywords: [
      "AP automation ROI",
      "finance transformation ROI",
      "DSO reduction calculator",
      "month-end close ROI",
      "procure-to-pay business case",
      "finance automation value assessment",
    ],
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
    title: "Source-to-Pay (S2P / P2P) Platform",
    description:
      "End-to-end Procure-to-Pay (P2P) and Source-to-Pay (S2P) automation — strategic sourcing, RFx, procurement, AI-powered AP automation, 3-way matching, payment automation, T&E, vendor reconciliation, budgeting, and fixed assets.",
    keywords: [
      "source to pay",
      "S2P",
      "procure to pay",
      "P2P software",
      "P2P automation",
      "AP automation",
      "accounts payable automation",
      "invoice OCR",
      "AI invoice processing",
      "3-way matching",
      "procurement automation",
      "strategic sourcing",
      "RFP software",
      "RFQ software",
      "RFx",
      "tender management",
      "e-sourcing",
      "vendor reconciliation",
      "vendor governance",
      "spend management",
      "budgeting software",
      "payment automation",
      "travel and expense management",
    ],
    group: "pillar",
    family: "s2p",
  },
  orderToCash: {
    path: "/order-to-cash",
    label: "Order-to-Cash",
    title: "Order-to-Cash (O2C) Platform",
    description:
      "Order-to-Cash (O2C) automation — billing and e-invoicing, Accounts Receivable (AR), cash application, agentic collections, dunning workflows, and customer reconciliation — built to lower DSO and release working capital.",
    keywords: [
      "order to cash",
      "O2C",
      "O2C automation",
      "AR automation",
      "accounts receivable automation",
      "cash application",
      "collections automation",
      "DSO reduction",
      "dunning automation",
      "customer reconciliation",
      "billing automation",
      "e-invoicing",
      "working capital management",
      "dispute and deduction management",
    ],
    group: "pillar",
    family: "o2c",
  },
  recordToReport: {
    path: "/record-to-report",
    label: "Record-to-Report",
    title: "Record-to-Report (R2R) Platform",
    description:
      "Record-to-Report (R2R) automation — month-end close, year-end close, financial consolidation, cash flow visibility, provisions & accruals, amortization, account reconciliation, and statutory reporting.",
    keywords: [
      "record to report",
      "R2R",
      "R2R automation",
      "month-end close automation",
      "financial close software",
      "close acceleration",
      "year-end close",
      "financial consolidation",
      "intercompany reconciliation",
      "account reconciliation",
      "provisions and accruals",
      "amortization software",
      "cash flow management",
      "cash flow forecasting",
      "statutory reporting",
      "finance analytics",
      "data analytics and insights",
    ],
    group: "pillar",
    family: "r2r",
  },
} satisfies Record<string, RouteDef>;

// -------- Module pages --------
export const MODULE_ROUTES = {
  // S2P
  sourcing: {
    path: "/modules/sourcing",
    label: "Sourcing",
    title: "Strategic Sourcing & RFx Automation",
    description: "Strategic sourcing software — RFI, RFP, RFQ, and tender management with structured supplier evaluation and one-click award-to-PO conversion.",
    keywords: ["strategic sourcing", "e-sourcing", "RFP software", "RFQ software", "RFx", "RFI", "tender management", "supplier evaluation", "sourcing automation"],
    group: "module",
    family: "s2p",
  },
  procurement: {
    path: "/modules/procurement",
    label: "Procurement",
    title: "Procurement Automation (PR-to-PO)",
    description: "Procurement automation — requisition to PO with real-time budget checks, configurable approvals, commitment accounting, and catalog buying.",
    keywords: ["procurement automation", "P2P", "procure to pay", "PR automation", "purchase order automation", "requisition software", "PO automation", "commitment accounting"],
    group: "module",
    family: "s2p",
  },
  accountsPayable: {
    path: "/modules/accounts-payable",
    label: "Accounts Payable",
    title: "AP Automation — Accounts Payable Software",
    description: "End-to-end Accounts Payable (AP) automation — AI invoice capture with OCR, email-based invoice ingestion, 3-way matching, touchless processing, exception workflows, and audit-ready controls.",
    keywords: ["AP automation", "accounts payable automation", "accounts payable software", "invoice OCR", "AI invoice capture", "AI invoice processing", "email invoice ingestion", "3-way matching", "touchless invoice processing", "invoice processing software", "AP software India", "AP software UAE"],
    group: "module",
    family: "s2p",
  },
  payments: {
    path: "/modules/payments",
    label: "Payments",
    title: "Payment Automation",
    description: "Payment automation across banks, entities, and currencies — with sanctions screening, beneficiary validation, and auto-reconciliation.",
    keywords: ["payment automation", "B2B payments", "multi-bank payment orchestration", "ACH automation", "vendor payment automation", "payment reconciliation"],
    group: "module",
    family: "s2p",
  },
  travelExpense: {
    path: "/modules/travel-expense",
    label: "Travel & Expense",
    title: "Travel & Expense (T&E) Management",
    description: "T&E software — policy-aware travel and expense management with mobile OCR capture, corporate card integration, and automated reimbursement.",
    keywords: ["T&E management", "travel and expense software", "expense management", "expense automation", "mobile receipt OCR", "corporate card reconciliation"],
    group: "module",
    family: "s2p",
  },
  pettyCash: {
    path: "/modules/petty-cash",
    label: "Petty Cash",
    title: "Petty Cash Management",
    description: "Digitized petty cash — cash advance workflows, receipt capture, float reconciliation, and site-level visibility with full audit trails.",
    keywords: ["petty cash management", "petty cash software", "site cash control", "cash advance workflow"],
    group: "module",
    family: "s2p",
  },
  vendorReconciliation: {
    path: "/modules/vendor-reconciliation",
    label: "Vendor Reconciliation",
    title: "Vendor Reconciliation & Governance",
    description: "Vendor reconciliation automation — statement matching, open item analysis, dispute workflows, and vendor governance at scale.",
    keywords: ["vendor reconciliation", "vendor recon", "vendor statement reconciliation", "vendor governance", "vendor management", "supplier reconciliation", "vendor dispute management"],
    group: "module",
    family: "s2p",
  },
  budgetingSpendControl: {
    path: "/modules/budgeting-spend-control",
    label: "Budgeting & Spend Control",
    title: "Budgeting & Spend Control Software",
    description: "Budgeting and spend control — live budget vs commitment tracking, category hierarchies, policy enforcement, and re-forecast workflows.",
    keywords: ["budgeting software", "spend control", "budget management", "budget vs actual", "commitment accounting", "spend analytics", "budget planning"],
    group: "module",
    family: "s2p",
  },
  fixedAssets: {
    path: "/modules/fixed-assets",
    label: "Fixed Assets",
    title: "Fixed Assets Management",
    description: "Fixed assets lifecycle — capitalization, depreciation, physical verification, and disposal with controls and full audit trail.",
    keywords: ["fixed assets management", "asset register", "depreciation automation", "asset lifecycle management", "capitalization workflow"],
    group: "module",
    family: "s2p",
  },
  // O2C
  orderManagement: {
    path: "/modules/order-management",
    label: "Order Management",
    title: "Order Management Automation",
    description: "Order management — multi-channel capture (EDI, portal, email), upfront credit and inventory validation, and fulfillment orchestration.",
    keywords: ["order management", "order to cash", "order capture", "order orchestration", "sales order automation"],
    group: "module",
    family: "o2c",
  },
  billingInvoicing: {
    path: "/modules/billing-invoicing",
    label: "Billing & Invoicing",
    title: "Billing & E-Invoicing Automation",
    description: "Automated billing and e-invoicing — compliant with GST e-Invoice, ZATCA, Peppol, IMDA InvoiceNow, and VAT regulations across regions.",
    keywords: ["billing automation", "e-invoicing", "electronic invoicing", "GST e-invoice", "ZATCA e-invoicing", "Peppol", "InvoiceNow", "VAT compliance", "invoice generation software"],
    group: "module",
    family: "o2c",
  },
  accountsReceivable: {
    path: "/modules/accounts-receivable",
    label: "Accounts Receivable",
    title: "AR Automation — Accounts Receivable",
    description: "Accounts Receivable (AR) automation — AI-powered cash application, remittance parsing, aging analysis, and deduction management.",
    keywords: ["AR automation", "accounts receivable automation", "cash application", "AR software", "remittance processing", "AR aging", "deduction management", "working capital optimization"],
    group: "module",
    family: "o2c",
  },
  collections: {
    path: "/modules/collections",
    label: "Collections",
    title: "Collections Automation — DSO Reduction",
    description: "Agentic collections automation — segmented strategies, dunning workflows, promise-to-pay tracking, and customer risk scoring to reduce DSO.",
    keywords: ["collections automation", "collections software", "DSO reduction", "dunning workflows", "AR collections", "agentic collections", "credit and collections", "B2B collections"],
    group: "module",
    family: "o2c",
  },
  customerReconciliation: {
    path: "/modules/customer-reconciliation",
    label: "Customer Reconciliation",
    title: "Customer Reconciliation & Dispute Management",
    description: "Customer statement reconciliation — deduction tie-out, dispute workflows, and audit confirmation support.",
    keywords: ["customer reconciliation", "customer statement reconciliation", "dispute management", "deduction management", "chargeback management"],
    group: "module",
    family: "o2c",
  },
  // R2R
  monthEndClose: {
    path: "/modules/month-end-close",
    label: "Month-End Close",
    title: "Month-End Close Automation",
    description: "Month-end close automation — task orchestration, auto-reconciliations (bank, AP, AR, GL, intercompany), journal workflow, and close analytics.",
    keywords: ["month-end close automation", "month end closure", "financial close software", "close automation", "account reconciliation", "journal automation", "close acceleration", "R2R automation"],
    group: "module",
    family: "r2r",
  },
  cashFlowVisibility: {
    path: "/modules/cash-flow-visibility",
    label: "Cash Flow Visibility",
    title: "Cash Flow Management & Forecasting",
    description: "Live cash flow visibility and forecasting — bank-synced positions, direct-method forecasting, scenario modeling, and intercompany/FX transparency.",
    keywords: ["cash flow management", "cash flow visibility", "cash flow forecasting", "treasury management", "liquidity management", "cash position", "direct method forecast"],
    group: "module",
    family: "r2r",
  },
  consolidation: {
    path: "/modules/consolidation",
    label: "Consolidation",
    title: "Financial Consolidation Software",
    description: "Multi-entity, multi-currency financial consolidation — chart-of-accounts mapping, intercompany elimination, FX translation, and group reporting packs.",
    keywords: ["financial consolidation", "consolidation software", "intercompany reconciliation", "intercompany elimination", "group reporting", "FX translation", "Ind-AS consolidation", "IFRS consolidation"],
    group: "module",
    family: "r2r",
  },
  provisionsAccruals: {
    path: "/modules/provisions-accruals",
    label: "Provisions & Accruals",
    title: "Provisions & Accruals Automation",
    description: "Policy-driven provisions and accruals — recurring templates, evidence chains, and automated reversal when actuals arrive.",
    keywords: ["provisions automation", "accruals automation", "provision management", "accrual workflow", "deferral accounting"],
    group: "module",
    family: "r2r",
  },
  amortization: {
    path: "/modules/amortization",
    label: "Amortization",
    title: "Amortization Schedule Automation",
    description: "Amortization schedules from contracts — modification handling, scheduled postings, and contract-to-ledger audit drill-down.",
    keywords: ["amortization software", "amortization schedules", "prepaid amortization", "contract amortization"],
    group: "module",
    family: "r2r",
  },
  yearEndClose: {
    path: "/modules/year-end-close",
    label: "Year-End Close",
    title: "Year-End Close & Statutory Reporting",
    description: "Year-end close orchestration — audit PBC workflow, statutory adjustments, group finalization, and statutory reporting packs.",
    keywords: ["year-end close", "annual close", "statutory reporting", "audit management", "audit PBC", "year-end audit", "finance audit software"],
    group: "module",
    family: "r2r",
  },
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
