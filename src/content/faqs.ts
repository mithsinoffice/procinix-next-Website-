import type { Faq } from "@/components/sections/FaqSection";

export const HOME_FAQS: Faq[] = [
  {
    question: "What is Procinix?",
    answer:
      "Procinix is a unified finance operations platform that automates Source-to-Pay (S2P / P2P), Order-to-Cash (O2C), and Record-to-Report (R2R). It combines agentic AI, configurable workflows, and real-time analytics to help multi-entity, multi-country finance teams reduce cost, shorten close cycles, and release working capital.",
  },
  {
    question: "What finance workflows does Procinix automate?",
    answer:
      "Procinix automates 20+ finance workflows across three cycles: strategic sourcing / RFx / tender management, procurement and PR-to-PO, accounts payable (AP) automation with AI invoice capture, OCR, email ingestion and 3-way matching, payment automation, travel and expense, petty cash, vendor reconciliation and governance, budgeting and spend control, fixed assets, order management, billing and e-invoicing, accounts receivable (AR), agentic collections, customer reconciliation, month-end close, cash flow visibility and forecasting, financial consolidation, provisions and accruals, amortization, and year-end close.",
  },
  {
    question: "Is Procinix built for Indian finance teams?",
    answer:
      "Yes. Procinix handles GST, e-Invoicing (IRN / QR), TDS / TCS, and multi-state operations out of the box. It also supports finance teams across UAE (VAT, e-invoicing), Saudi Arabia (ZATCA Phase 1 & 2), Singapore (IMDA InvoiceNow / Peppol), Australia (Peppol), and USA (multi-state tax, ACH / wire) — all on a single platform.",
  },
  {
    question: "How is Procinix different from traditional AP automation software?",
    answer:
      "Procinix is a full finance operations platform, not a point tool. It covers S2P, O2C, and R2R on one platform, uses agentic AI that actually executes workflows (not just wrappers on top of chat), and is built natively for multi-entity, multi-country operations — so finance transformation happens on one system, not ten.",
  },
  {
    question: "How accurate is the AI invoice capture?",
    answer:
      "Procinix delivers 99%+ accuracy on structured finance workflows such as invoice capture, matching, GL coding, and reconciliations. Exceptions are routed intelligently to the right owner with full context — not dumped in a queue. Actual accuracy depends on workflow maturity, process design, data quality, automation scope, and user adoption.",
  },
  {
    question: "How do I estimate the ROI before committing?",
    answer:
      "Use the Finance Transformation Value Assessment at /roi-calculator. Pick a finance family (S2P / O2C / R2R), choose a module, and enter realistic operating inputs. The model returns directional monthly savings, annual savings, FTE capacity released, DSO improvement, cash released, and close days reduced.",
  },
  {
    question: "Can Procinix integrate with my existing ERP?",
    answer:
      "Yes. Procinix is ERP-agnostic and connects to SAP, Oracle, NetSuite, Microsoft Dynamics, Workday, Tally, Zoho Books, and others. It also connects to banks, tax authorities (GSTN, FTA, ZATCA, IRAS), e-invoicing networks (Peppol, InvoiceNow), identity providers (Okta, Entra ID, Google Workspace), and BI tools (Snowflake, BigQuery, Power BI, Tableau).",
  },
  {
    question: "How does Procinix handle multi-entity and multi-country operations?",
    answer:
      "Multi-entity, multi-country, multi-currency support is native — not bolted on. Procinix handles per-entity configuration, country-specific compliance (tax, e-invoicing, local controls), intercompany reconciliation and elimination, and multi-currency consolidation with FX translation — all on one configurable operating model.",
  },
];

export const S2P_FAQS: Faq[] = [
  {
    question: "What is Source-to-Pay (S2P)?",
    answer:
      "Source-to-Pay (S2P) is the end-to-end process of sourcing goods and services, procuring them, receiving and processing invoices, and paying vendors. It includes strategic sourcing / RFx, procurement (PR-to-PO), accounts payable (AP) with 3-way matching, payment execution, T&E, petty cash, vendor reconciliation, budgeting, and fixed assets.",
  },
  {
    question: "Is Source-to-Pay the same as Procure-to-Pay (P2P)?",
    answer:
      "P2P is a subset of S2P. P2P typically covers procurement through payment (requisition → PO → invoice → payment). S2P starts earlier with strategic sourcing and vendor selection. Procinix covers the full S2P value stream, with P2P as a core segment within it.",
  },
  {
    question: "Does Procinix support 3-way matching?",
    answer:
      "Yes. Procinix supports 2-way, 3-way, and 4-way matching with configurable tolerance rules per category, entity, and vendor. Exceptions are routed to the right owner with full context (PO, GRN, invoice, contract) for resolution.",
  },
  {
    question: "How does AI invoice capture / OCR work in Procinix?",
    answer:
      "Procinix uses AI invoice capture with 99%+ accuracy across formats (PDF, image, structured, email attachments) and languages. It extracts both header and line-item data, validates against PO and GRN, auto-codes to GL and cost center, and routes only true exceptions for human review — with context pre-loaded.",
  },
  {
    question: "Can suppliers submit invoices via email?",
    answer:
      "Yes. Email-based invoice ingestion is built in — suppliers email invoices to a dedicated mailbox, and Procinix parses, validates, and posts them without manual re-keying. Attachments, embedded invoices, and multi-invoice emails are all supported.",
  },
  {
    question: "What sourcing events does Procinix support?",
    answer:
      "Procinix supports RFI, RFP, RFQ, and RFx events with structured supplier evaluation, weighted scoring across cost / quality / risk / lead time, multi-round negotiations, and one-click conversion from award to PO — keeping budget checks and approvals intact.",
  },
];

export const O2C_FAQS: Faq[] = [
  {
    question: "What is Order-to-Cash (O2C)?",
    answer:
      "Order-to-Cash (O2C) is the end-to-end process from customer order through to cash collection. It includes order management, billing and e-invoicing, accounts receivable (AR), cash application, collections, dispute / deduction management, and customer reconciliation.",
  },
  {
    question: "How does Procinix reduce DSO?",
    answer:
      "Procinix reduces DSO (Days Sales Outstanding) through segmented collections strategies, agentic AI outreach that prioritizes the right accounts at the right time, AI-powered cash application with remittance parsing, and structured deduction / dispute resolution workflows. Typical improvements are 3–7 days, depending on baseline maturity.",
  },
  {
    question: "Does Procinix support e-invoicing across countries?",
    answer:
      "Yes. Procinix supports GST e-Invoice (IRN / QR) for India, VAT e-invoicing for UAE, ZATCA Phase 1 and Phase 2 for Saudi Arabia, IMDA InvoiceNow / Peppol for Singapore, Peppol for Australia, and is extensible to other e-invoicing networks.",
  },
  {
    question: "What is agentic collections?",
    answer:
      "Agentic collections uses AI agents to score accounts on payment likelihood, draft context-aware collection communications, sequence outreach across email / portal / phone, and track promise-to-pay commitments — so collectors focus on the accounts where human judgment actually moves the needle.",
  },
  {
    question: "How does auto cash application work?",
    answer:
      "Procinix parses remittance advice from emails, portals, and bank files; matches payments to open invoices including part-payments and deductions; and posts cash automatically. Typical auto-match rates exceed 90%, with exceptions routed with evidence for quick resolution.",
  },
];

export const R2R_FAQS: Faq[] = [
  {
    question: "What is Record-to-Report (R2R)?",
    answer:
      "Record-to-Report (R2R) covers the recording, processing, and reporting of financial information. It includes subledger-to-GL posting, provisions and accruals, amortization, account reconciliations, intercompany elimination, month-end close, consolidation, cash flow visibility, statutory reporting, and year-end close.",
  },
  {
    question: "How much can month-end close be compressed?",
    answer:
      "Typical deployments see 30–50% reduction in close days through task orchestration, automated reconciliations (bank, AP, AR, GL, intercompany), journal workflow, and close analytics. Actual compression depends on workflow maturity, process design, data quality, automation scope, and user adoption.",
  },
  {
    question: "Does Procinix handle multi-entity consolidation?",
    answer:
      "Yes. Procinix supports multi-entity, multi-currency consolidation with chart-of-accounts mapping, intercompany matching and elimination, FX translation per FASB / IAS rules, and group reporting packs. It handles diverse ERPs across entities.",
  },
  {
    question: "Is Procinix audit-ready?",
    answer:
      "Yes. Every transaction, reconciliation, journal, and approval is logged with actor, timestamp, and supporting evidence. Audit PBC workflows let external auditors request, receive, and sign off documents within the platform — compressing audit cycles and reducing back-and-forth.",
  },
  {
    question: "Can Procinix forecast cash flow?",
    answer:
      "Yes. Procinix provides direct-method cash flow forecasting built from live AP / AR / operating signals, with scenario modeling for stress cases (delayed collections, FX shocks, ramp costs). Forecasts refresh continuously, so treasury decisions run on current data — not month-old spreadsheets.",
  },
];

export const PLATFORM_FAQS: Faq[] = [
  {
    question: "What makes Procinix an 'agentic AI' platform?",
    answer:
      "Agentic AI means AI agents that act end-to-end on structured workflows — classifying, matching, drafting, and resolving — within policy. Humans stay in the loop for genuine judgment calls, not for every tick-box. This is different from chat-based AI, which answers questions but doesn't complete work.",
  },
  {
    question: "What integrations does Procinix support?",
    answer:
      "Procinix connects to major ERPs (SAP, Oracle, NetSuite, Microsoft Dynamics, Workday, Tally, Zoho Books), banks (HDFC, ICICI, Citi, HSBC, Emirates NBD, DBS, JPMorgan, etc.), tax and e-invoicing networks (GSTN, FTA, ZATCA, IMDA InvoiceNow, Peppol, IRAS), identity providers (Okta, Entra ID, Google Workspace), and BI tools (Snowflake, BigQuery, Power BI, Tableau, Looker, dbt).",
  },
  {
    question: "How configurable is Procinix?",
    answer:
      "Every workflow is configurable — approval thresholds, matching tolerances, delegation chains, entity hierarchies, tax codes, compliance rules, exception routing, and SLAs. Configuration is by admin console; you don't need to write code to adapt workflows to your operating model.",
  },
  {
    question: "How secure is Procinix?",
    answer:
      "Procinix enforces role-based access with segregation of duties, SSO (SAML / OIDC) with directory sync, encryption in transit and at rest, and regional data residency where mandated. Every action is logged for audit. Controls and evidence are built in — not bolted on.",
  },
];

export const R2R_BUYERS_GUIDE_FAQS: Faq[] = [
  {
    question: "What is record-to-report (R2R) software?",
    answer:
      "Record-to-report software is the system finance teams use to run period-end close — task orchestration, reconciliation, journal entries, provisions and accruals, intercompany elimination, consolidation, and reporting — in one connected workflow instead of spreadsheets and email.",
  },
  {
    question: "What's the difference between R2R software and my ERP's close module?",
    answer:
      "An ERP keeps the ledger. R2R software sits on top of one or several ERPs and orchestrates the close itself — task ownership, reconciliation, journal approval, consolidation, and audit evidence — on a fixed calendar across every entity, which most ERP close modules don't cover natively.",
  },
  {
    question: "How long does R2R software implementation take?",
    answer:
      "For a multi-entity rollout, expect roughly 8–10 weeks: 1–2 weeks of discovery and close-process mapping, 3–6 weeks of configuration, 7–8 weeks for a parallel run alongside the existing close, and go-live around week 9–10 — then ongoing tuning as more entities and automation are added.",
  },
  {
    question: "Can R2R software handle multi-entity, multi-currency consolidation?",
    answer:
      "A platform built for multi-entity finance should handle intercompany matching, FX translation, elimination, and minority-interest consolidation natively across your entity structure — ask any vendor for a live walkthrough with mismatched intercompany balances, not a slide.",
  },
  {
    question: "Is it worth replacing spreadsheets with R2R software?",
    answer:
      "Once you're closing more than a couple of entities, operating in more than one currency or statutory basis, or spending real controller time reconstructing audit evidence each cycle, spreadsheets stop scaling — teams that switch to a unified R2R platform typically see close-days compress by roughly 30–50%, directionally, depending on entity count and configuration discipline.",
  },
];

export const BANK_RECONCILIATION_GUIDE_FAQS: Faq[] = [
  {
    question: "What is bank reconciliation automation?",
    answer:
      "Bank reconciliation automation is matching ledger transactions against bank statement lines automatically, using rule-based logic, instead of exporting both to a spreadsheet and matching them by hand — leaving only genuine exceptions for manual review.",
  },
  {
    question: "Can automated bank reconciliation handle multiple bank accounts and entities?",
    answer:
      "Yes, when built for it — matching rules and exception queues should run per bank account and per entity, with a consolidated view across all of them, rather than requiring a separate manual process per account.",
  },
  {
    question: "How accurate is automated bank matching?",
    answer:
      "Auto-match rates above 90% are achievable once rules are tuned to your actual transaction patterns (exact matches, many-to-one, partial payments, FX), with the remaining lines routed to an exceptions queue rather than silently force-matched.",
  },
  {
    question: "Does automating reconciliation remove the audit trail?",
    answer:
      "No — done properly, it strengthens it. Every automated match carries its matching logic and timestamp, which is more consistent and easier to evidence for audit than reconstructing a manual process after the fact.",
  },
];

export const R2R_PROCESS_AUTOMATION_GUIDE_FAQS: Faq[] = [
  {
    question: "What does R2R process automation cover?",
    answer:
      "It covers every stage of the close in sequence: task orchestration, reconciliation, journal entries, provisions/accruals/amortization, and consolidation and reporting — each with its own automation opportunity rather than one single switch.",
  },
  {
    question: "In what order should you automate the R2R process?",
    answer:
      "The practical order is task orchestration first, then reconciliation, then journal automation, then provisions and amortization, and consolidation last, since consolidation depends on everything upstream being reliable.",
  },
  {
    question: "Does R2R automation remove the need for controller review?",
    answer:
      "No — automation handles the mechanical, repeatable work (matching, templated journals, scheduled provisions) so controllers spend their time on exception investigation, judgment calls, and final sign-off instead.",
  },
];
