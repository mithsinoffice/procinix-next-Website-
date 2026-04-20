import type { ModuleContent } from "./types";

export const MODULE_CONTENT: Record<string, ModuleContent> = {
  // ------------ Source-to-Pay ------------
  sourcing: {
    slug: "sourcing",
    family: "s2p",
    tagline: "Strategic sourcing, from RFx to award — on one workflow.",
    heroStats: [
      { value: "45%", label: "faster RFx cycle" },
      { value: "3×", label: "more vendors evaluated" },
    ],
    painPoints: [
      "RFQs run in email and spreadsheets with no audit trail",
      "No structured supplier evaluation across price, quality, risk",
      "Award decisions disconnected from budgets and procurement",
      "Renewals slip because no one owns the timeline",
    ],
    features: [
      { title: "Structured RFx workflows", body: "Pre-configured RFI, RFQ, and RFP templates with response normalization." },
      { title: "Multi-criteria evaluation", body: "Weighted scoring across cost, quality, lead time, risk, and compliance." },
      { title: "Supplier collaboration portal", body: "Vendors respond in a controlled environment — no inbox chaos." },
      { title: "Award to PO handoff", body: "One-click conversion to procurement with budget check and approvals intact." },
    ],
    outcomes: [
      { metric: "Faster RFx cycle", detail: "Reduced turnaround from event launch to award decision." },
      { metric: "Better supplier mix", detail: "Structured scoring surfaces vendors ranked by more than just price." },
      { metric: "Audit-ready sourcing", detail: "Every decision, evaluation, and award documented end-to-end." },
    ],
    aiAngle:
      "Agentic AI summarizes supplier responses, flags outliers on commercial and legal terms, and pre-scores evaluations so the sourcing team reviews faster without losing rigor.",
    relatedSlugs: ["procurement", "budgeting-spend-control", "vendor-reconciliation"],
  },
  procurement: {
    slug: "procurement",
    family: "s2p",
    tagline: "Requisition to PO — policy-enforced, commitment-aware.",
    painPoints: [
      "Off-catalog spend with no pre-approval",
      "Budget overruns discovered after the fact",
      "PR-to-PO backlog; approvers chasing context",
      "Weak three-way matching because PO data is incomplete",
    ],
    features: [
      { title: "Catalog + free-text buying", body: "Structured catalog plus controlled free-text for long-tail spend." },
      { title: "Real-time budget checks", body: "Commitments reserved at PR approval — not after invoice hits." },
      { title: "Configurable approval matrix", body: "Thresholds, categories, entities, delegations — all policy-driven." },
      { title: "PO lifecycle tracking", body: "Live status from draft through dispatch, GRN, and closure." },
    ],
    outcomes: [
      { metric: "Higher PO coverage", detail: "More spend captured on PO, fewer invoices without a PR." },
      { metric: "Fewer budget breaches", detail: "Commitments visible before purchase decisions close." },
      { metric: "Shorter PR→PO cycle", detail: "Approvals move with context; no back-and-forth." },
    ],
    aiAngle:
      "Agents classify PR line items to the right catalog categories, route approvals based on policy, and flag high-risk or duplicate requisitions before they progress.",
    relatedSlugs: ["sourcing", "accounts-payable", "budgeting-spend-control"],
  },
  "accounts-payable": {
    slug: "accounts-payable",
    family: "s2p",
    tagline: "Invoice to pay — captured, matched, approved, paid.",
    heroStats: [
      { value: "99%+", label: "capture accuracy" },
      { value: "70%+", label: "touchless invoice rate" },
    ],
    painPoints: [
      "Manual invoice entry drives cost and errors",
      "3-way matching exceptions pile up without resolution ownership",
      "Duplicate and fraudulent invoice risk",
      "Late payments — lost discounts, vendor friction",
    ],
    features: [
      { title: "AI invoice capture", body: "Headers and lines with 99%+ accuracy, across formats and languages." },
      { title: "Configurable matching", body: "2-way, 3-way, or 4-way matching with tolerance rules per category." },
      { title: "Exception workflows", body: "Exceptions routed to the right owner with full context and SLA." },
      { title: "Policy-aware approvals", body: "Thresholds, delegations, absences, and segregation-of-duty handled." },
    ],
    outcomes: [
      { metric: "Cost per invoice down", detail: "Lower processing cost through touchless flow and exception automation." },
      { metric: "Higher on-time payment rate", detail: "Discount capture up, vendor friction down." },
      { metric: "Stronger controls", detail: "Duplicate detection, tax validation, and audit trail end-to-end." },
    ],
    aiAngle:
      "Agents auto-code invoices to GL and cost center, validate against PO and GRN, resolve tolerances, and only escalate true exceptions to humans — with the context pre-loaded.",
    relatedSlugs: ["payments", "procurement", "vendor-reconciliation"],
  },
  payments: {
    slug: "payments",
    family: "s2p",
    tagline: "Secure, scheduled payments — across banks, entities, currencies.",
    painPoints: [
      "Multiple bank portals, multiple file formats",
      "No single view of payment run status",
      "Weak control on payment approvals and sanctions screening",
      "Reconciliation pain across payments, bank, and AP",
    ],
    features: [
      { title: "Multi-bank connectivity", body: "Host-to-host, APIs, file-based — all under one control plane." },
      { title: "Payment run orchestration", body: "Select, approve, release, and monitor payment batches end-to-end." },
      { title: "Sanctions and compliance", body: "Screening and validation before funds move." },
      { title: "Auto-reconciliation", body: "Payments reconcile back to AP invoices and bank statements." },
    ],
    outcomes: [
      { metric: "Fewer failed payments", detail: "Validation upfront catches banking and beneficiary errors." },
      { metric: "Stronger payment control", detail: "Segregation of duty and sanctions screening by design." },
      { metric: "Reconciliation lift", detail: "Bank-to-AP reconciliation time compressed significantly." },
    ],
    aiAngle:
      "Agents validate beneficiary details, flag anomalies in payment amounts vs history, and auto-reconcile payment status back to invoices and bank statements.",
    relatedSlugs: ["accounts-payable", "cash-flow-visibility", "vendor-reconciliation"],
  },
  "travel-expense": {
    slug: "travel-expense",
    family: "s2p",
    tagline: "Policy-aware T&E — mobile capture, automated reimbursement.",
    painPoints: [
      "Receipts lost, expense reports late",
      "Policy violations slip through or block legitimate spend",
      "Manual coding to GL and cost centers",
      "Slow reimbursement hurts employee experience",
    ],
    features: [
      { title: "Mobile capture with OCR", body: "Snap the receipt, fields extracted, policy checked." },
      { title: "Policy-aware validation", body: "Daily limits, category rules, per-diem handling — built in." },
      { title: "Card integration", body: "Corporate card feeds matched to expense claims automatically." },
      { title: "Controlled reimbursement", body: "Approved claims flow to payment with full audit trail." },
    ],
    outcomes: [
      { metric: "Faster reimbursement", detail: "Employees paid sooner; fewer escalations." },
      { metric: "Higher policy compliance", detail: "Violations flagged at capture, not after the fact." },
      { metric: "Finance lift", detail: "Less manual review; finance reviews only the exceptions." },
    ],
    aiAngle:
      "Agents classify expenses to the right categories, detect duplicates and policy breaches, and only escalate cases that need human judgment — with evidence attached.",
    relatedSlugs: ["petty-cash", "accounts-payable", "payments"],
  },
  "petty-cash": {
    slug: "petty-cash",
    family: "s2p",
    tagline: "Digitized petty cash — audit trails, not shoeboxes.",
    painPoints: [
      "Cash advances tracked on spreadsheets",
      "No audit trail for site-level cash spend",
      "Reconciliation is manual and error-prone",
      "Control gaps in branch or field operations",
    ],
    features: [
      { title: "Cash advance workflow", body: "Request, approve, disburse, and settle — all tracked." },
      { title: "Receipt capture at the point", body: "Mobile capture by the custodian; no more paper pileups." },
      { title: "Float reconciliation", body: "Site-level float balances reconciled on a schedule." },
      { title: "Exception flags", body: "Unused advances, overdue settlements, anomaly spend — surfaced early." },
    ],
    outcomes: [
      { metric: "Full site-level visibility", detail: "Every rupee/AED/USD accounted for, per site, per custodian." },
      { metric: "Faster settlements", detail: "Advances reconciled in days, not weeks." },
      { metric: "Cleaner audits", detail: "No more hunting for paper receipts at year-end." },
    ],
    aiAngle:
      "Agents parse site-level receipts, detect anomalies in pattern or amount, and escalate only items that break the policy or exceed normal variance.",
    relatedSlugs: ["travel-expense", "accounts-payable", "fixed-assets"],
  },
  "vendor-reconciliation": {
    slug: "vendor-reconciliation",
    family: "s2p",
    tagline: "Vendor statements, matched and reconciled at scale.",
    painPoints: [
      "Vendor statements pile up unreviewed",
      "Disputes surface late, straining relationships",
      "Reconciliation is manual, monthly, and painful",
      "Open items hide errors and double payments",
    ],
    features: [
      { title: "Automated statement import", body: "Vendor statements parsed and matched to ledger balances." },
      { title: "Open item analysis", body: "Unmatched invoices, missing credits, and pending disputes highlighted." },
      { title: "Dispute workflow", body: "Track, resolve, and document every disputed item." },
      { title: "Period-close readiness", body: "Vendor balances confirmed and reconciled ahead of month-end." },
    ],
    outcomes: [
      { metric: "Fewer surprises at close", detail: "Vendor balances agreed before the month-end crunch." },
      { metric: "Cleaner disputes", detail: "Disputes flow through a tracked workflow with documentation." },
      { metric: "Better vendor relationships", detail: "Fewer escalations, faster resolutions." },
    ],
    aiAngle:
      "Agents match statement lines to ledger entries, classify mismatches, and draft dispute documentation so AP teams spend time deciding — not preparing.",
    relatedSlugs: ["accounts-payable", "payments", "customer-reconciliation"],
  },
  "budgeting-spend-control": {
    slug: "budgeting-spend-control",
    family: "s2p",
    tagline: "Budgets that hold. Commitments that show.",
    painPoints: [
      "Budgets set once a year, never tracked in real time",
      "Spend visibility only after invoice posting",
      "No commitment accounting — overruns found late",
      "Re-forecasting is a manual, painful spreadsheet exercise",
    ],
    features: [
      { title: "Live budget vs commitment", body: "Budgets reduced by PRs, POs, and actuals in real time." },
      { title: "Category and entity hierarchies", body: "Track spend down to the lowest operating level." },
      { title: "Threshold and policy enforcement", body: "Soft and hard limits applied at requisition and PO time." },
      { title: "Re-forecast workflows", body: "Controlled re-forecast cycles that surface changes to the right approvers." },
    ],
    outcomes: [
      { metric: "Fewer overruns", detail: "Overruns prevented, not reported." },
      { metric: "Faster re-forecasting", detail: "Cycles run in days, not weeks." },
      { metric: "Better finance partnership", detail: "Finance becomes the co-pilot, not the blocker." },
    ],
    aiAngle:
      "Agents project run-rate spend against budget, surface categories trending overrun, and suggest re-forecast scenarios with evidence.",
    relatedSlugs: ["procurement", "sourcing", "accounts-payable"],
  },
  "fixed-assets": {
    slug: "fixed-assets",
    family: "s2p",
    tagline: "Asset lifecycle — acquisition to disposal, clean books throughout.",
    painPoints: [
      "Asset register out of sync with ledger",
      "Depreciation errors and manual adjustments",
      "Poor physical-to-book reconciliation",
      "Weak disposal and impairment controls",
    ],
    features: [
      { title: "Capitalization workflow", body: "Assets created from PO/invoice with accurate cost components." },
      { title: "Depreciation engines", body: "Straight-line, WDV, units-of-production — per policy, per entity." },
      { title: "Physical verification", body: "Barcoded verification cycles that reconcile to the book." },
      { title: "Disposal and impairment", body: "Controlled workflows with accounting impact surfaced upfront." },
    ],
    outcomes: [
      { metric: "Clean asset register", detail: "Book and physical in sync, period after period." },
      { metric: "Accurate depreciation", detail: "Fewer manual adjustments at close." },
      { metric: "Audit-ready asset trail", detail: "Lifecycle documented from PR to disposal." },
    ],
    aiAngle:
      "Agents classify capex line items into asset categories, flag misclassified expenses, and monitor for idle or unused assets that may need impairment review.",
    relatedSlugs: ["procurement", "accounts-payable", "month-end-close"],
  },

  // ------------ Order-to-Cash ------------
  "order-management": {
    slug: "order-management",
    family: "o2c",
    tagline: "Orders captured, validated, and orchestrated to fulfillment.",
    painPoints: [
      "Orders arrive across channels — email, portal, EDI, voice",
      "Credit and inventory checks happen late",
      "Order status visibility is patchy across teams",
      "Rework on pricing, terms, and tax inputs",
    ],
    features: [
      { title: "Multi-channel order capture", body: "Normalized intake across email, portal, EDI, and direct entry." },
      { title: "Validation at the gate", body: "Credit, inventory, pricing, tax — all checked before acceptance." },
      { title: "Fulfillment orchestration", body: "Orders routed to the right plant, warehouse, or service flow." },
      { title: "Live order status", body: "Single source of truth for sales, ops, and finance." },
    ],
    outcomes: [
      { metric: "Cleaner order book", detail: "Fewer holds, fewer reworks, fewer escalations." },
      { metric: "Faster order-to-fulfillment", detail: "Orders move because validations run upfront, not in batches." },
      { metric: "Better customer experience", detail: "Credible commit dates, accurate documentation." },
    ],
    aiAngle:
      "Agents parse orders from any channel, validate against price books and credit profiles, and suggest resolution paths for holds and exceptions.",
    relatedSlugs: ["billing-invoicing", "accounts-receivable", "customer-reconciliation"],
  },
  "billing-invoicing": {
    slug: "billing-invoicing",
    family: "o2c",
    tagline: "Billing that's accurate, timely, and e-invoicing-ready.",
    painPoints: [
      "Manual billing runs are slow and error-prone",
      "Tax and compliance (VAT, GST, ZATCA, Peppol) complexity",
      "Rebills and credit notes badly tracked",
      "Revenue timing questions at close",
    ],
    features: [
      { title: "Structured billing runs", body: "Scheduled, batch, and on-demand billing with full control." },
      { title: "E-invoicing compliance", body: "Country-specific e-invoicing formats and connectivity." },
      { title: "Credit note workflows", body: "Rebills and credit notes tracked with audit trail." },
      { title: "Revenue recognition support", body: "Structured handoff to close teams for revenue posting." },
    ],
    outcomes: [
      { metric: "Faster billing cycle", detail: "Bills out sooner; collections start earlier." },
      { metric: "Fewer rebills", detail: "Accuracy at first pass through upstream data validation." },
      { metric: "Compliance confidence", detail: "E-invoicing rules handled, not improvised." },
    ],
    aiAngle:
      "Agents validate billable data against contracts and price books, detect timing anomalies, and pre-assemble credit notes when the evidence supports it.",
    relatedSlugs: ["order-management", "accounts-receivable", "collections"],
  },
  "accounts-receivable": {
    slug: "accounts-receivable",
    family: "o2c",
    tagline: "Cash applied fast. AR at enterprise scale.",
    heroStats: [
      { value: "3–7", label: "days DSO improvement" },
      { value: "90%+", label: "auto-cash-app rate" },
    ],
    painPoints: [
      "Cash application is manual and slow",
      "Remittance advice missing or inconsistent",
      "AR aging unreliable; working capital guesswork",
      "No unified view of customer open items",
    ],
    features: [
      { title: "Auto cash application", body: "Remittances parsed and matched to open invoices automatically." },
      { title: "Aging and exposure", body: "Live aging and customer exposure across entities." },
      { title: "Dispute and deduction", body: "Deductions flagged, documented, and routed for resolution." },
      { title: "Customer statements", body: "Statements assembled and sent on a schedule, with PDFs tracked." },
    ],
    outcomes: [
      { metric: "DSO improvement", detail: "Cash applied faster; open items cleared quicker." },
      { metric: "Working capital released", detail: "Cleaner AR means better forecasts and liquidity." },
      { metric: "Customer trust", detail: "Accurate statements and timely resolution of deductions." },
    ],
    aiAngle:
      "Agents parse remittance advice from emails, portals, and bank files; match to invoices including part-payments and deductions; escalate only what needs a human.",
    relatedSlugs: ["collections", "billing-invoicing", "customer-reconciliation"],
  },
  collections: {
    slug: "collections",
    family: "o2c",
    tagline: "Agentic collections — reduce DSO without damaging relationships.",
    painPoints: [
      "Dunning sequences are one-size-fits-all",
      "Promise-to-pay tracking falls through the cracks",
      "Collection teams work from stale data",
      "No prioritization — everyone gets chased the same way",
    ],
    features: [
      { title: "Segmented collection strategies", body: "Different playbooks for enterprise, SMB, and at-risk accounts." },
      { title: "Promise-to-pay tracking", body: "Commitments tracked, escalated, and closed out." },
      { title: "Omnichannel outreach", body: "Email, portal, and phone touches — coordinated and logged." },
      { title: "Risk scoring", body: "Customer risk and priority surfaced on every worklist." },
    ],
    outcomes: [
      { metric: "DSO reduction", detail: "Cash released by prioritizing the right accounts, the right way." },
      { metric: "Better customer relationships", detail: "Fewer over-chased accounts; fewer missed commitments." },
      { metric: "Collector productivity", detail: "More resolutions per collector per day." },
    ],
    aiAngle:
      "Agents draft contextual collection touches, score accounts on payment likelihood, and sequence outreach so collectors focus on the accounts where human judgment moves the needle.",
    relatedSlugs: ["accounts-receivable", "customer-reconciliation", "cash-flow-visibility"],
  },
  "customer-reconciliation": {
    slug: "customer-reconciliation",
    family: "o2c",
    tagline: "Customer balances, agreed. Disputes, documented.",
    painPoints: [
      "Customer disputes linger for months",
      "Reconciliation is manual at quarter/year end",
      "Deductions don't tie back to invoices cleanly",
      "Audit confirmations are a scramble",
    ],
    features: [
      { title: "Statement comparison", body: "Customer-provided statements matched to ledger balances." },
      { title: "Deduction tie-out", body: "Deductions matched to invoices, POs, and contracts." },
      { title: "Dispute workflow", body: "Tracked from open to closed with full evidence chain." },
      { title: "Audit confirmation support", body: "Balances available on demand for external confirmations." },
    ],
    outcomes: [
      { metric: "Faster dispute resolution", detail: "Cycle times reduced through structured workflow." },
      { metric: "Cleaner quarter-end", detail: "Customer balances agreed ahead of close." },
      { metric: "Audit-ready trail", detail: "Evidence captured once, reused everywhere." },
    ],
    aiAngle:
      "Agents reconcile customer statements line by line, classify deductions, and draft resolution pathways backed by the supporting documentation.",
    relatedSlugs: ["accounts-receivable", "collections", "vendor-reconciliation"],
  },

  // ------------ Record-to-Report ------------
  "month-end-close": {
    slug: "month-end-close",
    family: "r2r",
    tagline: "Close faster. With controls. Every month.",
    heroStats: [
      { value: "30–50%", label: "close-days reduction" },
      { value: "100%", label: "task ownership traceability" },
    ],
    painPoints: [
      "Close tasks tracked on spreadsheets and email",
      "Reconciliations done at close, not before",
      "Hand-offs between entities and teams slip",
      "Late surprises in provisions, accruals, and intercompany",
    ],
    features: [
      { title: "Close task orchestration", body: "Every task, owner, SLA, and dependency tracked in one place." },
      { title: "Auto-reconciliations", body: "Bank, AP, AR, GL, intercompany — reconciled before the window closes." },
      { title: "Journal workflow", body: "Prepare, review, approve journals with full evidence and controls." },
      { title: "Close analytics", body: "Progress, risk, and bottleneck visibility across entities." },
    ],
    outcomes: [
      { metric: "Close days reduced", detail: "Cycle-time compression measured and sustained." },
      { metric: "Fewer late surprises", detail: "Reconciliation done early; exceptions handled in-flight." },
      { metric: "Audit comfort", detail: "Every journal, reconciliation, and exception documented." },
    ],
    aiAngle:
      "Agents draft reconciliations, propose journals, and prioritize the close dashboard so controllers spend time on judgment items — not status chasing.",
    relatedSlugs: ["consolidation", "provisions-accruals", "cash-flow-visibility"],
  },
  "cash-flow-visibility": {
    slug: "cash-flow-visibility",
    family: "r2r",
    tagline: "Cash position and forecast — live, multi-entity, multi-currency.",
    painPoints: [
      "Cash position known weekly at best",
      "Forecasting is spreadsheet-heavy and stale",
      "FX and intercompany mask real liquidity",
      "No scenario analysis under stress",
    ],
    features: [
      { title: "Live cash dashboard", body: "Bank-synced cash positions by entity and currency." },
      { title: "Direct method forecasting", body: "Forecasts built from AP, AR, and operating signals." },
      { title: "Scenario modeling", body: "Stress tests for delayed collections, FX shocks, or ramp costs." },
      { title: "Intercompany & FX visibility", body: "Net positions across legal structures and currencies." },
    ],
    outcomes: [
      { metric: "Higher forecast accuracy", detail: "Forecasts built from real operational data, refreshed daily." },
      { metric: "Better liquidity decisions", detail: "Treasury acts on current data, not month-old snapshots." },
      { metric: "Stronger stakeholder trust", detail: "Board-grade cash reporting without the manual assembly." },
    ],
    aiAngle:
      "Agents continuously refresh cash forecasts from AP/AR flows, surface deviations from plan, and propose scenario responses (payment deferrals, collection pushes) with expected impact.",
    relatedSlugs: ["month-end-close", "accounts-receivable", "payments"],
  },
  consolidation: {
    slug: "consolidation",
    family: "r2r",
    tagline: "Multi-entity consolidation — with intercompany eliminated and FX handled.",
    painPoints: [
      "Group reporting takes days post-close",
      "Intercompany elimination is manual and fragile",
      "FX translation errors surface late",
      "Different ERPs per entity — mapping nightmare",
    ],
    features: [
      { title: "Chart-of-accounts mapping", body: "Local GL mapped to group COA with full audit trail." },
      { title: "Intercompany matching", body: "IC matching, elimination, and dispute workflow." },
      { title: "Currency translation", body: "Translation by FASB/IAS rules, with gains/losses surfaced." },
      { title: "Group packs", body: "Consolidated P&L, balance sheet, and cash flow — on schedule." },
    ],
    outcomes: [
      { metric: "Faster group reporting", detail: "Consolidation packs land days earlier." },
      { metric: "Fewer IC surprises", detail: "Matches resolved pre-close, not after." },
      { metric: "Clean audit position", detail: "Eliminations, translations, and journals fully documented." },
    ],
    aiAngle:
      "Agents match intercompany transactions, propose elimination entries, and flag translation mismatches — so the group team validates, not assembles.",
    relatedSlugs: ["month-end-close", "year-end-close", "provisions-accruals"],
  },
  "provisions-accruals": {
    slug: "provisions-accruals",
    family: "r2r",
    tagline: "Provisions and accruals — policy-driven, not tribal knowledge.",
    painPoints: [
      "Accruals reconstructed from memory each month",
      "Inconsistent provision policies across entities",
      "Deferrals and prepayments slip through",
      "Year-end true-ups are painful and large",
    ],
    features: [
      { title: "Policy-driven accruals", body: "Accrual rules applied consistently per category and entity." },
      { title: "Recurring and one-off flows", body: "Templates for recurring accruals; controls for one-off provisions." },
      { title: "Evidence chain", body: "Supporting contracts, POs, and invoices linked to every provision." },
      { title: "Reversal automation", body: "Automatic reversal and true-up when actual data arrives." },
    ],
    outcomes: [
      { metric: "Fewer year-end true-ups", detail: "Monthly accruals held closer to reality." },
      { metric: "Consistent policy application", detail: "Same rules, same way, every entity." },
      { metric: "Auditable provisions", detail: "Full documentation at the entry level." },
    ],
    aiAngle:
      "Agents recommend accrual amounts from outstanding POs, contracts, and historical patterns, and auto-reverse when invoices arrive — with full evidence.",
    relatedSlugs: ["month-end-close", "amortization", "year-end-close"],
  },
  amortization: {
    slug: "amortization",
    family: "r2r",
    tagline: "Amortization — schedule-driven, audit-traced.",
    painPoints: [
      "Prepaid schedules on spreadsheets",
      "New contracts added manually to schedules",
      "Partial terminations and modifications untracked",
      "Audit questions that take days to answer",
    ],
    features: [
      { title: "Contract-to-schedule automation", body: "Schedules built from contracts and POs, not re-keyed." },
      { title: "Modification handling", body: "Extensions, early terminations, and scope changes tracked." },
      { title: "Scheduled postings", body: "Monthly postings with approval and reversal controls." },
      { title: "Audit drill-down", body: "Every posting traces back to the source contract." },
    ],
    outcomes: [
      { metric: "Clean prepaid balance", detail: "Schedules reflect reality; no forgotten contracts." },
      { metric: "Faster close", detail: "Amortization no longer a scramble at period end." },
      { metric: "Audit clarity", detail: "Full contract-to-ledger trace in seconds." },
    ],
    aiAngle:
      "Agents build amortization schedules from contract PDFs, propose modification entries, and detect contracts due for renewal or expiry.",
    relatedSlugs: ["provisions-accruals", "month-end-close", "fixed-assets"],
  },
  "year-end-close": {
    slug: "year-end-close",
    family: "r2r",
    tagline: "Year-end without the scramble.",
    painPoints: [
      "Year-end is a different process to month-end",
      "Audit requests are ad-hoc and stressful",
      "Adjustments land in the last week",
      "Consolidation complexity spikes at year-end",
    ],
    features: [
      { title: "Year-end task plan", body: "Structured plan with owners, evidence, and controls." },
      { title: "Audit PBC orchestration", body: "Auditor requests received, tracked, fulfilled — on a portal." },
      { title: "Statutory adjustments", body: "Stat vs. management differences handled with traceability." },
      { title: "Group finalization", body: "Consolidation packs and notes ready for stat sign-off." },
    ],
    outcomes: [
      { metric: "Predictable year-end", detail: "Same rhythm as month-end — just wider in scope." },
      { metric: "Shorter audit cycle", detail: "Evidence ready, requests fulfilled at pace." },
      { metric: "Board confidence", detail: "Statutory numbers land on schedule, documented end-to-end." },
    ],
    aiAngle:
      "Agents draft PBC responses from existing evidence, flag audit risks from anomalies in the ledger, and surface statutory vs. management differences for review.",
    relatedSlugs: ["month-end-close", "consolidation", "provisions-accruals"],
  },
};

export const ALL_MODULE_SLUGS = Object.keys(MODULE_CONTENT);
