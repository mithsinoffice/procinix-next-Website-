import type { SolutionContent } from "./types";

export const SOLUTION_CONTENT: Record<string, SolutionContent> = {
  "india-p2p-software": {
    slug: "india-p2p-software",
    region: "India",
    focus: "Procure-to-Pay",
    tagline: "Procure-to-Pay software for India enterprises — GST, e-invoicing, multi-entity.",
    metaDescription:
      "Procure-to-Pay software for India — GST and e-invoicing (IRN/QR) built into requisition-to-PO, invoice capture, and vendor payments across multi-state, multi-entity operations.",
    painPoints: [
      "GST compliance across multi-state P2P",
      "E-invoicing (IRN/QR) integrated with AP",
      "Vendor onboarding and master data quality",
      "Branch-level procurement with central control",
    ],
    capabilities: [
      "Structured requisition-to-PO with budget check",
      "AI invoice capture with GSTIN and HSN validation",
      "3-way matching and exception workflow",
      "Payments via banks + TDS handled in-line",
    ],
    outcomes: [
      { metric: "Lower cost per invoice", detail: "Touchless processing on structured flows." },
      { metric: "GST accuracy", detail: "Tax codes, returns, and reconciliations on schedule." },
      { metric: "Vendor trust", detail: "On-time payment and fewer disputes." },
    ],
    faq: [
      {
        question: "Does this handle GST across multiple states?",
        answer:
          "Yes — GSTIN and HSN validation run inline on every invoice, and tax coding stays correct across multi-state, multi-entity structures rather than relying on manual state-wise mapping.",
      },
      {
        question: "Is e-invoicing (IRN/QR) built in for India?",
        answer:
          "Yes — IRN generation and QR code compliance are part of the standard invoice flow, not a separate integration project.",
      },
      {
        question: "Can branches procure independently while finance keeps central control?",
        answer:
          "Yes — branch-level requisitioning runs against central budgets and approval policy, so local teams keep autonomy without losing head-office visibility.",
      },
      {
        question: "Does TDS get handled automatically?",
        answer:
          "Yes — TDS is applied in-line during payment processing, reducing the manual adjustment that usually happens after the fact.",
      },
    ],
    relevantModuleSlugs: [
      "procurement",
      "accounts-payable",
      "payments",
      "vendor-reconciliation",
      "budgeting-spend-control",
    ],
  },
  "uae-accounts-payable-automation": {
    slug: "uae-accounts-payable-automation",
    region: "UAE",
    focus: "Accounts Payable Automation",
    tagline: "AP automation for UAE — VAT, multi-entity, shared services.",
    metaDescription:
      "AP automation for UAE enterprises — VAT and TRN validation, multi-bank AED/USD payment orchestration, and shared-services-ready workflows across free zone and mainland entities.",
    painPoints: [
      "VAT treatment across free zone and mainland entities",
      "Regional shared services supporting GCC",
      "Multi-bank payment operations in AED, USD, and others",
      "Vendor master quality across jurisdictions",
    ],
    capabilities: [
      "AI invoice capture with TRN and VAT validation",
      "Policy-aware approvals across entities",
      "Multi-bank payment orchestration in multiple currencies",
      "Shared-service-friendly exception workflows",
    ],
    outcomes: [
      { metric: "Lower cost per invoice", detail: "Touchless processing across entities." },
      { metric: "VAT confidence", detail: "Correct codes and returns by entity type." },
      { metric: "SSC efficiency", detail: "Regional team handles more entities, consistently." },
    ],
    faq: [
      {
        question: "Does this handle VAT differently for free zone vs. mainland entities?",
        answer:
          "Yes — VAT treatment is configured per entity type, so free zone and mainland invoices are coded correctly without a manual entity-by-entity review.",
      },
      {
        question: "Can one shared services team run AP for multiple GCC entities from here?",
        answer:
          "Yes — the workflow is built for regional shared services, with exception handling and approvals that scale across entities rather than requiring a separate setup per country.",
      },
      {
        question: "What currencies does payment orchestration support?",
        answer:
          "AED, USD, and other regional currencies are supported in the same multi-bank payment run, so treasury isn't managing separate processes per currency.",
      },
      {
        question: "Is TRN validated automatically on invoices?",
        answer:
          "Yes — TRN and VAT fields are validated as part of AI invoice capture, before the invoice reaches an approver.",
      },
    ],
    relevantModuleSlugs: [
      "accounts-payable",
      "payments",
      "vendor-reconciliation",
      "travel-expense",
      "budgeting-spend-control",
    ],
  },
  "saudi-finance-automation": {
    slug: "saudi-finance-automation",
    region: "Saudi Arabia",
    focus: "Finance Automation",
    tagline: "Finance automation for Saudi Arabia — ZATCA, multi-entity, enterprise scale.",
    metaDescription:
      "Finance automation for Saudi Arabia — ZATCA Phase 1 & 2 e-invoicing, multi-entity Kingdom-wide consolidation, and end-to-end S2P, O2C and R2R on one platform.",
    painPoints: [
      "ZATCA Phase 2 e-invoicing compliance",
      "Multi-entity Kingdom operations",
      "Local content, Saudization, and regulatory reporting",
      "Consolidation in Saudi Riyal with group reporting",
    ],
    capabilities: [
      "ZATCA Phase 1 & 2 e-invoicing built in",
      "End-to-end S2P, O2C, R2R on one platform",
      "Multi-entity consolidation with elimination",
      "Real-time visibility for Kingdom-wide operations",
    ],
    outcomes: [
      { metric: "ZATCA compliant", detail: "E-invoicing and clearance handled operationally." },
      { metric: "Clean close", detail: "Month-end and consolidation on schedule." },
      { metric: "Enterprise scale", detail: "Configurable for holding, operating, and trading entities." },
    ],
    faq: [
      {
        question: "Is this compliant with ZATCA Phase 2?",
        answer:
          "Yes — both ZATCA Phase 1 (generation) and Phase 2 (integration/clearance) e-invoicing requirements are built into the billing and AP workflows, not bolted on separately.",
      },
      {
        question: "Can it consolidate multiple Kingdom entities in SAR?",
        answer:
          "Yes — multi-entity consolidation with intercompany elimination runs natively in Saudi Riyal, with group reporting ready for holding, operating, and trading entity structures.",
      },
      {
        question: "Does it cover source-to-pay, order-to-cash, and record-to-report, or just one?",
        answer:
          "All three — S2P, O2C, and R2R run on one platform, so Kingdom-wide finance operations aren't split across disconnected systems.",
      },
      {
        question: "How does this help with month-end close timing?",
        answer:
          "Structured workflows across procurement, billing, and reconciliation feed directly into close, which is what keeps month-end and consolidation on schedule instead of slipping past ZATCA and local reporting deadlines.",
      },
    ],
    relevantModuleSlugs: [
      "billing-invoicing",
      "accounts-payable",
      "accounts-receivable",
      "month-end-close",
      "consolidation",
    ],
  },
  "singapore-invoice-automation": {
    slug: "singapore-invoice-automation",
    region: "Singapore",
    focus: "Invoice Automation",
    tagline: "Invoice automation for Singapore — IMDA InvoiceNow ready.",
    metaDescription:
      "Invoice automation for Singapore — IMDA InvoiceNow (Peppol) ready, with AI capture for non-Peppol suppliers, intercompany elimination, and multi-currency AR/AP for regional HQs.",
    painPoints: [
      "InvoiceNow / Peppol adoption across trading partners",
      "Regional HQ supporting multiple APAC entities",
      "Multi-currency and intercompany complexity",
      "IRAS filings and cross-border controls",
    ],
    capabilities: [
      "Peppol-compliant invoice sending and receiving",
      "AI invoice capture for inbound non-Peppol suppliers",
      "Intercompany matching and elimination",
      "Multi-currency AR/AP with live FX",
    ],
    outcomes: [
      { metric: "InvoiceNow adoption", detail: "Peppol flows live with your largest partners." },
      { metric: "APAC visibility", detail: "Entity and currency rollups available continuously." },
      { metric: "IRAS readiness", detail: "GST and reporting cleanly supported." },
    ],
    faq: [
      {
        question: "Is this InvoiceNow / Peppol compliant?",
        answer:
          "Yes — Peppol-compliant invoice sending and receiving is built in, matching IMDA's InvoiceNow framework for domestic e-invoicing.",
      },
      {
        question: "What about suppliers who aren't on Peppol yet?",
        answer:
          "Non-Peppol inbound invoices are still captured automatically via AI extraction, so the transition to full Peppol adoption doesn't create a two-track manual process.",
      },
      {
        question: "Can a Singapore regional HQ manage multiple APAC entities from here?",
        answer:
          "Yes — intercompany matching, elimination, and multi-currency AR/AP are built for exactly that regional-HQ pattern, with entity and currency rollups available continuously.",
      },
      {
        question: "Does this support IRAS GST reporting?",
        answer:
          "Yes — GST coding and reporting are supported cleanly as part of the standard invoice and reconciliation flow.",
      },
    ],
    relevantModuleSlugs: [
      "billing-invoicing",
      "accounts-payable",
      "accounts-receivable",
      "consolidation",
      "cash-flow-visibility",
    ],
  },
  "australia-expense-management": {
    slug: "australia-expense-management",
    region: "Australia",
    focus: "Expense Management",
    tagline: "Expense management for Australian enterprises — Peppol, multi-state.",
    metaDescription:
      "Expense management for Australian enterprises — mobile OCR capture, corporate card reconciliation, configurable per-diem rules, and accurate BAS/GST coding across multi-state teams.",
    painPoints: [
      "Mobile-first employee base across states",
      "Policy variability and per-diem handling",
      "Corporate card integration and reconciliation",
      "BAS and GST on travel/expense accurately coded",
    ],
    capabilities: [
      "Mobile capture with OCR and policy checks",
      "Corporate card feeds auto-matched",
      "Configurable per-diem and category rules",
      "Multi-state compliance and reporting",
    ],
    outcomes: [
      { metric: "Faster reimbursement", detail: "Employees paid sooner; finance touches fewer reports." },
      { metric: "Clean BAS", detail: "Tax coding accurate at the source." },
      { metric: "Better employee experience", detail: "Mobile-first capture; minimal chasing." },
    ],
    faq: [
      {
        question: "Does this work for a mostly mobile, multi-state workforce?",
        answer:
          "Yes — mobile-first receipt capture with OCR and policy checks is built for exactly that, with per-diem and category rules configurable by state or team.",
      },
      {
        question: "How does this affect BAS and GST accuracy?",
        answer:
          "Tax coding is applied at the point of capture, so travel and expense line items are coded correctly for BAS from the start rather than corrected during quarterly review.",
      },
      {
        question: "Does it reconcile against corporate card feeds?",
        answer:
          "Yes — card transaction feeds are matched to submitted claims automatically, cutting down the manual statement-to-receipt reconciliation.",
      },
      {
        question: "How much faster is employee reimbursement?",
        answer:
          "Because policy checks happen at capture rather than in a later review cycle, approved claims move straight to payment — most employees see reimbursement in days.",
      },
    ],
    relevantModuleSlugs: [
      "travel-expense",
      "petty-cash",
      "accounts-payable",
      "payments",
      "budgeting-spend-control",
    ],
  },
  "usa-finance-operations-platform": {
    slug: "usa-finance-operations-platform",
    region: "USA",
    focus: "Finance Operations Platform",
    tagline: "Finance operations platform for US enterprises — multi-state, ACH, ERP-ready.",
    metaDescription:
      "Finance operations platform for US enterprises — SOX-grade controls, ACH/wire payment fraud checks, multi-state tax handling, and full S2P, O2C, R2R coverage across diverse ERPs.",
    painPoints: [
      "Multi-state sales/use tax complexity",
      "SOX controls for public or IPO-bound companies",
      "ACH/wire payment control and fraud prevention",
      "ERP diversity across business units",
    ],
    capabilities: [
      "Full S2P, O2C, R2R coverage — one platform",
      "SOX-grade controls and evidence",
      "ACH/wire payment orchestration with fraud controls",
      "ERP-agnostic integration layer",
    ],
    outcomes: [
      { metric: "SOX comfort", detail: "Controls, segregation of duty, and evidence by design." },
      { metric: "Payment security", detail: "Beneficiary and sanctions validation before release." },
      { metric: "Enterprise flexibility", detail: "Configurable across BUs and ERPs." },
    ],
    faq: [
      {
        question: "Is this built for SOX compliance?",
        answer:
          "Yes — segregation of duty, approval controls, and audit evidence are designed in from the start, which matters for public companies and IPO-bound organizations under SOX.",
      },
      {
        question: "How are ACH and wire payments protected against fraud?",
        answer:
          "Beneficiary and sanctions validation run before any payment release, catching fraud risk before funds move rather than after.",
      },
      {
        question: "Does this work across multiple ERPs in different business units?",
        answer:
          "Yes — the integration layer is ERP-agnostic, so business units running different underlying systems can still operate on one finance operations platform.",
      },
      {
        question: "Does it cover procurement, receivables, and close, or just payables?",
        answer:
          "All of it — S2P, O2C, and R2R run on one platform, including multi-state tax handling and consolidation across business units.",
      },
    ],
    relevantModuleSlugs: [
      "accounts-payable",
      "payments",
      "accounts-receivable",
      "collections",
      "month-end-close",
      "consolidation",
    ],
  },
};

export const ALL_SOLUTION_SLUGS = Object.keys(SOLUTION_CONTENT);
