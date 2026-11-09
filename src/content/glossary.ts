import type { GlossaryContent } from "./types";

export const GLOSSARY_CONTENT: Record<string, GlossaryContent> = {
  "record-to-report": {
    slug: "record-to-report",
    term: "Record-to-Report (R2R)",
    shortDefinition:
      "Record-to-report (R2R) is the finance process that turns transaction activity into closed, reconciled, audit-ready financial statements.",
    metaDescription:
      "Record-to-report (R2R) definition — the close process from transaction recording through reconciliation, consolidation, and statutory reporting. What it covers and how it's measured.",
    definition: [
      "Record-to-report (R2R) is the end-to-end finance process that takes transaction activity already posted in the general ledger and turns it into a closed, reconciled, and reported set of financial statements. It runs on a fixed calendar — typically monthly, quarterly, and annually — and sits downstream of both source-to-pay (S2P) and order-to-cash (O2C) activity.",
      "R2R covers everything between \"the transactions are in the system\" and \"the books are closed and the numbers are trustworthy\": account and bank reconciliation, journal entries, provisions and accruals, intercompany elimination, multi-entity consolidation, variance analysis, and statutory or management reporting.",
      "The process is owned by controllership and finance operations teams, and its output — closed, reconciled financials — feeds everything downstream: management reporting, statutory filings, audit, and board-level decision-making.",
    ],
    keyComponents: [
      { title: "Close task orchestration", body: "A calendar of close tasks assigned to owners across every entity, with dependencies and due dates." },
      { title: "Account & bank reconciliation", body: "Matching ledger balances to source systems and bank statements, with exceptions investigated and cleared." },
      { title: "Journal entries & approvals", body: "Recurring, allocation, and adjustment journals posted and approved under a maker-checker control." },
      { title: "Provisions & accruals", body: "Policy-driven recognition of expenses and revenue not yet invoiced, reversed as actuals arrive." },
      { title: "Intercompany & consolidation", body: "Eliminating intercompany transactions and translating foreign-currency entities into one group result." },
      { title: "Reporting", body: "Statutory financial statements and internal management packs, built from the same closed numbers." },
    ],
    family: "r2r",
    relatedTermSlugs: ["order-to-cash", "source-to-pay"],
    relatedModuleSlugs: ["month-end-close", "consolidation", "bank-reconciliation"],
    faq: [
      {
        question: "What's the difference between R2R and the general ledger?",
        answer:
          "The general ledger just records transactions. R2R is the process layered on top of it — reconciling, adjusting, consolidating, and reporting those transactions on a fixed close calendar.",
      },
      {
        question: "How long should record-to-report take?",
        answer:
          "It varies by entity count and process maturity, but finance teams running R2R software rather than spreadsheets typically compress close by roughly 30–50% compared to a manual process.",
      },
      {
        question: "Who is responsible for record-to-report?",
        answer:
          "Controllership and finance operations teams own R2R, typically a controller or finance operations lead per entity, rolling up to a group controller for consolidation.",
      },
    ],
  },

  "order-to-cash": {
    slug: "order-to-cash",
    term: "Order-to-Cash (O2C)",
    shortDefinition:
      "Order-to-cash (O2C) is the process from order capture through billing, collections, and cash application to fully reconciled revenue.",
    metaDescription:
      "Order-to-cash (O2C) definition — the revenue process from order capture through billing, AR, collections, and cash application. What it covers and how DSO is used to measure it.",
    definition: [
      "Order-to-cash (O2C) is the process that runs from the moment a customer places an order to the moment that revenue is fully collected and reconciled. It covers order capture, billing and e-invoicing, accounts receivable, collections and dunning, cash application, and customer (deduction/dispute) reconciliation.",
      "O2C is the mirror process to source-to-pay (S2P) — where S2P governs what a company spends, O2C governs what it collects. The two processes meet at record-to-report (R2R), where both feed the close.",
      "O2C performance is usually measured through DSO (Days Sales Outstanding), collections effectiveness, and cash application match rates — all of which directly affect a company's working capital position.",
    ],
    keyComponents: [
      { title: "Billing & e-invoicing", body: "Generating and issuing customer invoices, increasingly through mandated e-invoicing networks (GST, ZATCA, Peppol)." },
      { title: "Accounts receivable", body: "Tracking what customers owe, by invoice, due date, and aging bucket." },
      { title: "Collections & dunning", body: "Proactive outreach and automated reminder workflows to bring in payment before and after due dates." },
      { title: "Cash application", body: "Matching incoming payments to open invoices, automatically where remittance data allows." },
      { title: "Customer reconciliation", body: "Resolving disputes and short-payments between what was billed and what was paid." },
    ],
    family: "o2c",
    relatedTermSlugs: ["source-to-pay", "dso"],
    relatedModuleSlugs: ["accounts-receivable", "collections", "cash-application"],
    faq: [
      {
        question: "What's the difference between O2C and AR?",
        answer:
          "Accounts receivable (AR) is one piece of O2C — tracking what's owed. O2C is the full process: order capture, billing, AR, collections, and cash application together.",
      },
      {
        question: "How is O2C performance measured?",
        answer:
          "The primary metric is DSO (Days Sales Outstanding) — how long it takes on average to collect after a sale. Collections effectiveness and cash application auto-match rate are the supporting metrics.",
      },
      {
        question: "Does O2C include e-invoicing compliance?",
        answer:
          "Yes — in markets with mandated e-invoicing (India's GST network, Saudi Arabia's ZATCA, Singapore's InvoiceNow/Peppol), billing has to route through those networks as part of the O2C process, not as a separate step.",
      },
    ],
  },

  "source-to-pay": {
    slug: "source-to-pay",
    term: "Source-to-Pay (S2P)",
    shortDefinition:
      "Source-to-pay (S2P) spans sourcing and procurement through accounts payable and payment — choosing a supplier through paying them.",
    metaDescription:
      "Source-to-pay (S2P) definition — the procurement process from sourcing and RFx through AP, 3-way matching, and payment. How S2P differs from P2P.",
    definition: [
      "Source-to-pay (S2P) is the full value stream from identifying and selecting a supplier through to paying them. It starts upstream of procure-to-pay (P2P) — with strategic sourcing, RFx (RFI/RFP/RFQ), and supplier evaluation — then continues through purchase orders, invoice processing (often AI-driven OCR and 3-way matching), approvals, and payment.",
      "S2P is sometimes used interchangeably with P2P, but strictly, P2P is the subset that starts once a purchase order is raised; S2P includes the sourcing and supplier-selection work that happens before that.",
      "S2P is the mirror process to order-to-cash (O2C) on the buy side — where O2C governs what a company collects, S2P governs what it spends, and both feed record-to-report (R2R) at close.",
    ],
    keyComponents: [
      { title: "Strategic sourcing & RFx", body: "RFI, RFP, and RFQ processes to evaluate and select suppliers before any purchase order exists." },
      { title: "Procurement & purchase orders", body: "Raising and approving purchase orders against budget and policy." },
      { title: "AP automation & 3-way matching", body: "Invoice capture (often via OCR), matching against PO and goods receipt, and exception handling." },
      { title: "Payments", body: "Scheduling and executing supplier payments against approved, matched invoices." },
      { title: "Vendor reconciliation & governance", body: "Reconciling vendor statements and managing vendor master data, onboarding, and KYC." },
    ],
    family: "s2p",
    relatedTermSlugs: ["order-to-cash", "record-to-report"],
    relatedModuleSlugs: ["sourcing", "accounts-payable", "vendor-portal"],
    faq: [
      {
        question: "What's the difference between S2P and P2P?",
        answer:
          "P2P (procure-to-pay) starts once a purchase order is raised. S2P (source-to-pay) is broader — it includes the sourcing and supplier-evaluation work (RFI/RFP/RFQ) that happens before any PO exists.",
      },
      {
        question: "Does S2P include accounts payable?",
        answer:
          "Yes — AP automation, invoice matching, and payment are the downstream half of S2P, following on from sourcing, procurement, and purchase orders.",
      },
      {
        question: "Why does S2P matter for multi-entity companies?",
        answer:
          "Multi-entity companies run sourcing and AP across different currencies, tax regimes, and approval hierarchies per entity — unifying S2P on one platform keeps vendor data, approvals, and spend visibility consistent across all of them.",
      },
    ],
  },

  dso: {
    slug: "dso",
    term: "DSO (Days Sales Outstanding)",
    shortDefinition:
      "DSO (Days Sales Outstanding) measures the average number of days it takes a company to collect payment after a sale.",
    metaDescription:
      "DSO (Days Sales Outstanding) definition and formula — how to calculate DSO, what counts as a good DSO, and how to reduce it through order-to-cash automation.",
    definition: [
      "DSO (Days Sales Outstanding) measures the average number of days it takes a company to collect payment after making a sale on credit. It's the core efficiency metric for order-to-cash (O2C) and a direct driver of working capital: a lower DSO means cash is tied up in receivables for less time.",
      "The standard formula is: DSO = (Accounts Receivable ÷ Total Credit Sales) × Number of Days in Period. A company with ₹50 lakh in receivables, ₹3 crore in credit sales over a 90-day quarter, has a DSO of roughly 15 days.",
      "What counts as a \"good\" DSO depends heavily on industry and standard payment terms — a business invoicing on Net 30 terms with a DSO of 35–40 is performing reasonably, while the same number against Net 60 terms would be a red flag.",
    ],
    keyComponents: [
      { title: "Accounts receivable balance", body: "Total unpaid customer invoices at the end of the period being measured." },
      { title: "Credit sales", body: "Total sales made on credit terms (not cash) over that same period — cash sales are excluded." },
      { title: "Collections effectiveness", body: "How proactively and systematically a team follows up on invoices approaching or past due." },
      { title: "Cash application speed", body: "How quickly incoming payments are matched to open invoices — a slow match inflates apparent DSO even when cash has arrived." },
    ],
    family: "o2c",
    relatedTermSlugs: ["order-to-cash"],
    relatedModuleSlugs: ["collections", "cash-application", "accounts-receivable"],
    faq: [
      {
        question: "What is the formula for DSO?",
        answer:
          "DSO = (Accounts Receivable ÷ Total Credit Sales) × Number of Days in Period. It's usually calculated monthly or quarterly using that period's sales and the receivable balance at its end.",
      },
      {
        question: "What is a good DSO?",
        answer:
          "It depends on your standard payment terms — a DSO close to your stated terms (for example, around 30 for Net 30 customers) is healthy; a DSO well above your terms signals collections or dispute problems.",
      },
      {
        question: "How do you reduce DSO?",
        answer:
          "The biggest levers are proactive, automated collections and dunning workflows, faster cash application (automated matching instead of manual), and resolving disputes and short-payments quickly rather than letting them age — directionally, teams automating order-to-cash see DSO improve by roughly 3–7 days.",
      },
    ],
  },
};

export const ALL_GLOSSARY_SLUGS = Object.keys(GLOSSARY_CONTENT);
