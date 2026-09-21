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
    metaDescription:
      "Procurement automation software — a procurement solution for requisition-to-PO, budget checks, and approval workflows that sits alongside your ERP.",
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
    faq: [
      {
        question: "What does a procurement solution like Procinix actually automate?",
        answer:
          "It automates the requisition-to-PO cycle end to end: catalog and free-text buying, real-time budget checks at the point of request (not after invoicing), a configurable approval matrix, and live PO lifecycle tracking from draft through GRN and closure.",
      },
      {
        question: "Is Procinix a procurement ERP, or does it work alongside our existing ERP?",
        answer:
          "Procinix is a procurement automation layer that sits alongside your ERP rather than replacing it — requisitions, POs, budgets, and approvals sync with SAP, Oracle, Microsoft Dynamics, NetSuite, Tally, and other ERPs, so you get modern procurement workflow without a core-system migration.",
      },
      {
        question: "How does this prevent budget overruns?",
        answer:
          "Budgets are reserved as commitments the moment a requisition is approved — not discovered after the invoice lands — so overruns are prevented at the point of purchase decision, not reported after the fact.",
      },
      {
        question: "Can approval workflows be configured per category, entity, or threshold?",
        answer:
          "Yes — the approval matrix is fully policy-driven: thresholds, categories, entities, and delegations are all configurable without custom development, so procurement policy stays enforced as the organization scales.",
      },
    ],
    relatedSlugs: ["sourcing", "accounts-payable", "budgeting-spend-control", "inventory-management"],
  },
  "accounts-payable": {
    slug: "accounts-payable",
    family: "s2p",
    tagline: "Invoice to pay — captured, matched, approved, paid.",
    metaDescription:
      "Accounts payable automation software with AI invoice capture, configurable 3-way matching, and exception workflows — built for multi-entity, multi-country AP teams.",
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
    faq: [
      {
        question: "What is accounts payable automation?",
        answer:
          "Accounts payable automation replaces manual invoice entry, routing, and approval with software that captures invoice data, matches it to purchase orders and goods receipts, and routes only genuine exceptions to a human. Procinix's AP automation covers the full invoice-to-pay cycle — capture, matching, approvals, and payment handoff — in one workflow.",
      },
      {
        question: "How accurate is AI invoice capture?",
        answer:
          "Procinix captures invoice headers and line items with 99%+ accuracy across PDF, scanned, and email formats, and in multiple languages and currencies. Captured data is validated against tax rules and vendor master data before it ever reaches a matching step.",
      },
      {
        question: "Does Procinix support 2-way, 3-way, and 4-way matching?",
        answer:
          "Yes. Matching rules and tolerance thresholds are configurable per vendor, category, or entity, so you can run 2-way matching for low-risk spend and 3-way or 4-way matching (including goods receipt and quality inspection) for higher-risk categories — without custom development.",
      },
      {
        question: "How does AP automation reduce invoice processing cost?",
        answer:
          "By pushing routine, policy-compliant invoices through touchless — no manual keying, no manual routing — and reserving human review for true exceptions (price variances, missing POs, duplicate risk). Most Procinix customers see cost-per-invoice fall as touchless rates climb above 70%.",
      },
      {
        question: "Can this integrate with our existing ERP?",
        answer:
          "Procinix is built to sit alongside your ERP rather than replace it — invoices, POs, GRNs, vendor masters, and GL postings sync with common ERPs (SAP, Oracle, Microsoft Dynamics, NetSuite, Tally, and others) so AP automation adds control without a rip-and-replace project.",
      },
      {
        question: "Is Procinix AP automation suitable for multi-entity, multi-country finance teams?",
        answer:
          "Yes — it's a core design point. Approval matrices, tax handling (including GST, VAT, and ZATCA e-invoicing), currencies, and vendor governance are all entity-aware, so a shared-services or multi-country AP team runs on one platform instead of stitching together per-country tools.",
      },
    ],
    relatedSlugs: ["payments", "procurement", "vendor-reconciliation"],
  },
  payments: {
    slug: "payments",
    family: "s2p",
    tagline: "Secure, scheduled payments — across banks, entities, currencies.",
    metaDescription:
      "Payment automation across banks, entities, and currencies — including recurring vendor and utility payment automation, sanctions screening, and auto-reconciliation.",
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
    faq: [
      {
        question: "Can Procinix automate recurring vendor and utility payments?",
        answer:
          "Yes. Utility automation and other recurring vendor payments (rent, subscriptions, statutory dues) run as scheduled payment runs with the same approval, sanctions screening, and reconciliation controls as one-off payments — so recurring spend doesn't bypass control just because it's routine.",
      },
      {
        question: "How does payment automation reduce failed payments?",
        answer:
          "Beneficiary details, bank formats, and payment limits are validated before a payment run is released, catching errors that would otherwise bounce at the bank — a common source of late-payment penalties on recurring utility and vendor accounts.",
      },
      {
        question: "Does Procinix support multi-bank, multi-entity payment runs?",
        answer:
          "Yes — host-to-host connections, APIs, and file-based formats across multiple banks and entities are managed from one control plane, with payment runs orchestrated, approved, and released per entity's policy.",
      },
      {
        question: "How are payments reconciled back to invoices?",
        answer:
          "Payments auto-reconcile against AP invoices and bank statements as they clear, so the AP and treasury teams aren't manually tying out payment runs against the ledger every month.",
      },
    ],
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
    metaDescription:
      "Vendor reconciliation automation — statement matching, open-item analysis, and dispute workflows that keep vendor balances audit-ready ahead of month-end.",
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
    faq: [
      {
        question: "What is vendor reconciliation automation?",
        answer:
          "Vendor reconciliation automation matches vendor-supplied statements against your ledger balances automatically, surfaces unmatched invoices, missing credits, and disputed items, and routes each open item into a tracked resolution workflow — instead of a manual, spreadsheet-based reconciliation done once a month.",
      },
      {
        question: "How does this reduce surprises at month-end close?",
        answer:
          "Because vendor statements are reconciled continuously rather than at period-end, discrepancies surface and get resolved well before the close window opens, removing one of the most common sources of last-minute close delays.",
      },
      {
        question: "Can it handle disputes with vendors?",
        answer:
          "Yes — every disputed item is tracked from open to resolution with supporting documentation attached, so nothing gets lost in email threads and vendor relationships aren't strained by slow, undocumented resolution.",
      },
      {
        question: "Does reconciliation automation work across multiple entities and vendors at scale?",
        answer:
          "Yes — statement import and matching scale across hundreds of vendors and multiple entities, with the same rules and audit trail applied consistently everywhere.",
      },
    ],
    relatedSlugs: ["accounts-payable", "payments", "customer-reconciliation", "vendor-onboarding"],
  },
  "budgeting-spend-control": {
    slug: "budgeting-spend-control",
    family: "s2p",
    tagline: "Budgets that hold. Commitments that show.",
    metaDescription:
      "Budget module with live commitment tracking and budget forecast / re-forecast workflows — spend visibility before invoices post, not after.",
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
    faq: [
      {
        question: "What is a budget module in a finance operations platform?",
        answer:
          "A budget module tracks budgets against real commitments — requisitions, purchase orders, and actuals — in real time, rather than only comparing budget to posted invoices at month-end. Procinix reduces budgets the moment a PR or PO is approved, so overruns are visible before spend happens.",
      },
      {
        question: "How does budget forecast and re-forecasting work?",
        answer:
          "Re-forecast cycles are controlled workflows, not ad hoc spreadsheets — categories trending toward overrun are surfaced automatically, and agents can propose re-forecast scenarios with the underlying spend evidence, so cycles that used to take weeks run in days.",
      },
      {
        question: "Can budgets be tracked by category, entity, or cost center?",
        answer:
          "Yes — budget and commitment hierarchies go down to the lowest operating level you need: category, entity, cost center, or project, so spend visibility matches how the business is actually organized.",
      },
      {
        question: "Does the budget module enforce spend policy automatically?",
        answer:
          "Yes — soft and hard threshold limits are applied at requisition and PO time, so policy is enforced at the point of purchase decision instead of being a post-hoc audit finding.",
      },
    ],
    relatedSlugs: ["procurement", "sourcing", "accounts-payable"],
  },
  "fixed-assets": {
    slug: "fixed-assets",
    family: "s2p",
    tagline: "Asset lifecycle — acquisition to disposal, clean books throughout.",
    metaDescription:
      "Fixed assets automation — capitalization, depreciation, physical verification, and lease/right-of-use asset tracking (Ind AS 116) in one audit-ready register.",
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
    faq: [
      {
        question: "What is fixed assets automation?",
        answer:
          "Fixed assets automation keeps the asset register in sync with the ledger automatically — capitalizing assets from PO/invoice data, running depreciation on policy, and reconciling physical verification cycles back to the books — instead of manual spreadsheets and end-of-year clean-up.",
      },
      {
        question: "Which depreciation methods are supported?",
        answer:
          "Straight-line, written-down value (WDV), and units-of-production are all configurable per asset category and entity, so multi-entity groups can apply different policies where local accounting standards require it.",
      },
      {
        question: "Does Procinix handle lease and right-of-use assets under Ind AS 116?",
        answer:
          "Yes. Rental and lease arrangements accounted for under Ind AS 116 (or IFRS 16) — right-of-use asset amortization and the associated lease liability schedule — are tracked alongside owned fixed assets, so lease-heavy portfolios (offices, retail stores, equipment) stay reconciled to the ledger rather than managed on a side spreadsheet.",
      },
      {
        question: "How does automation improve audit readiness for fixed assets?",
        answer:
          "Every asset's lifecycle — capitalization, depreciation runs, physical verification, impairment, and disposal — is documented end-to-end, so audit queries are answered by pulling the record, not reconstructing it.",
      },
      {
        question: "Can this flag idle or unused assets?",
        answer:
          "Yes — agents monitor usage and verification data to flag assets that may be idle, unused, or candidates for impairment review, before they become a year-end surprise.",
      },
    ],
    relatedSlugs: ["procurement", "accounts-payable", "month-end-close"],
  },
  "inventory-management": {
    slug: "inventory-management",
    family: "s2p",
    tagline: "Inventory that ties out — from receipt to reconciliation.",
    heroStats: [
      { value: "100%", label: "GRN-to-ledger match" },
      { value: "Real-time", label: "multi-location stock visibility" },
    ],
    metaDescription:
      "Inventory management automation — GRN-to-ledger sync, multi-location stock visibility, automated valuation, and physical-to-book reconciliation.",
    painPoints: [
      "Physical stock and book inventory drift apart over time",
      "GRN mismatches break 3-way matching in AP",
      "No real-time visibility across warehouses or locations",
      "Stock valuation at close is a manual, error-prone exercise",
    ],
    features: [
      { title: "GRN-to-ledger sync", body: "Goods receipts flow straight into the inventory ledger — no re-keying, no lag." },
      { title: "Multi-location visibility", body: "Live stock positions across warehouses, plants, and stores in one view." },
      { title: "Automated valuation", body: "FIFO, weighted-average, or standard cost — applied consistently, every period." },
      { title: "Variance and reconciliation flags", body: "Physical-to-book mismatches surfaced early, with root cause evidence attached." },
    ],
    outcomes: [
      { metric: "Fewer 3-way match exceptions", detail: "Clean GRN data means fewer AP holds and disputes." },
      { metric: "Cleaner stock valuation at close", detail: "Valuation runs on policy, not a spreadsheet scramble." },
      { metric: "Faster physical-to-book reconciliation", detail: "Variances caught continuously, not just at count time." },
    ],
    aiAngle:
      "Agents reconcile goods receipts to the inventory ledger, flag valuation and quantity variances before they reach the books, and predict reorder points from consumption patterns.",
    faq: [
      {
        question: "What does inventory management automation cover?",
        answer:
          "It keeps the inventory ledger in sync with goods receipts and issues automatically, gives real-time stock visibility across every warehouse or location, applies consistent valuation methods, and reconciles physical counts to the book — instead of periodic manual stock-takes and spreadsheet valuation.",
      },
      {
        question: "How does this improve 3-way matching in AP?",
        answer:
          "Because goods receipts post to the inventory ledger the moment they happen, AP's 3-way match (PO, invoice, GRN) has clean, timely GRN data to match against — reducing the exception volume that comes from delayed or inconsistent receipt records.",
      },
      {
        question: "Can it handle multiple warehouses or locations?",
        answer:
          "Yes — stock positions are tracked per location with a consolidated multi-location view, so a multi-site or multi-entity operation sees one accurate picture instead of reconciling location-by-location reports manually.",
      },
      {
        question: "Which valuation methods are supported?",
        answer:
          "FIFO, weighted-average, and standard costing are all configurable per category or entity, applied consistently every period so valuation at close is policy-driven rather than a manual recalculation.",
      },
      {
        question: "How does automation catch stock discrepancies earlier?",
        answer:
          "Physical-to-book variances are flagged as they occur rather than discovered at the next scheduled count, with the underlying transaction evidence attached so the root cause is clear immediately.",
      },
    ],
    relatedSlugs: ["procurement", "fixed-assets", "month-end-close"],
  },
  "vendor-onboarding": {
    slug: "vendor-onboarding",
    family: "s2p",
    tagline: "Vendors onboarded, verified, and audit-ready — before the first PO.",
    heroStats: [
      { value: "50%+", label: "faster onboarding cycle" },
      { value: "100%", label: "audit-ready KYC trail" },
    ],
    metaDescription:
      "Vendor onboarding automation with a self-service portal, configurable KYC and compliance workflows, document tracking, and vendor master governance.",
    painPoints: [
      "Vendor documents chased manually over email",
      "KYC and compliance checks applied inconsistently across entities",
      "No vendor self-service — procurement does all the paperwork",
      "Duplicate and inactive vendor records pollute the master",
    ],
    features: [
      { title: "Self-service vendor portal", body: "Vendors submit and update their own documents, status, and bank details." },
      { title: "Configurable KYC workflows", body: "Tax registration, bank verification, and sanctions screening — per entity, per policy." },
      { title: "Document expiry tracking", body: "Licenses, certifications, and compliance documents renewed before they lapse, not after." },
      { title: "Vendor master governance", body: "Duplicate detection and risk scoring keep the vendor master clean at scale." },
    ],
    outcomes: [
      { metric: "Faster onboarding cycle", detail: "Vendors go live in days, not weeks of email back-and-forth." },
      { metric: "Cleaner vendor master", detail: "Duplicates and inactive records caught before they cause payment errors." },
      { metric: "Fewer compliance gaps at audit", detail: "Every vendor's KYC trail is complete and available on demand." },
    ],
    aiAngle:
      "Agents validate submitted documents against required checklists, flag sanctions or risk hits automatically, and detect duplicate vendor records before they ever enter the master.",
    faq: [
      {
        question: "What is vendor onboarding automation?",
        answer:
          "It replaces email-based document chasing with a self-service portal where vendors submit tax registration, banking, and compliance documents directly, routed through configurable KYC and approval workflows — so procurement isn't manually assembling every vendor file.",
      },
      {
        question: "How does vendor KYC verification work?",
        answer:
          "KYC and compliance checks — tax registration validity, bank account verification, sanctions and watchlist screening — run per your policy and per entity, with every check and its evidence logged for audit, instead of being handled ad hoc by whoever onboarded the vendor.",
      },
      {
        question: "Does this include a vendor self-service portal?",
        answer:
          "Yes — vendors update their own documents, banking details, and compliance status directly, with expiring documents (licenses, certifications, tax registrations) flagged for renewal automatically rather than discovered as expired mid-transaction.",
      },
      {
        question: "How does it support vendor governance and reduce duplicate records?",
        answer:
          "New vendor submissions are checked against the existing master for duplicates and risk signals before they're created, keeping the vendor master clean as it scales — a common source of payment errors and audit findings when done manually.",
      },
      {
        question: "Is this suitable for multi-entity, multi-country vendor onboarding?",
        answer:
          "Yes — KYC requirements, approval routing, and document checklists are all entity- and country-aware, so a shared-services or multi-country procurement team runs one onboarding process instead of ad hoc local variations.",
      },
    ],
    relatedSlugs: ["vendor-reconciliation", "procurement", "sourcing"],
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
    metaDescription:
      "Accounts receivable automation with 90%+ auto cash application, live aging, and dispute workflows — built to cut DSO for multi-entity B2B finance teams.",
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
    faq: [
      {
        question: "What is accounts receivable automation?",
        answer:
          "Accounts receivable automation applies incoming cash to open invoices automatically, keeps aging and customer exposure current in real time, and routes deductions or disputes into a structured workflow — instead of a finance team manually chasing remittances in spreadsheets and email.",
      },
      {
        question: "How does automated cash application work?",
        answer:
          "Procinix parses remittance advice from emails, customer portals, and bank files, then matches it to open invoices — including part-payments, combined payments, and deductions — reaching a 90%+ auto-match rate. Only genuinely ambiguous remittances are escalated to a person.",
      },
      {
        question: "Can Procinix AR automation handle partial payments and deductions?",
        answer:
          "Yes. Partial payments, short-pays, and deductions are flagged, categorized, and routed into a dispute workflow with the supporting documentation attached, so nothing sits unresolved in an aging bucket.",
      },
      {
        question: "How much can AR automation improve DSO?",
        answer:
          "Customers typically see a 3-7 day reduction in DSO once cash application and dispute resolution move off manual processes — driven by faster, more accurate posting and earlier visibility into at-risk accounts.",
      },
      {
        question: "Does Procinix AR automation integrate with our ERP and banks?",
        answer:
          "Yes — bank statement and lockbox feeds, customer portals, and ERP systems (SAP, Oracle, Dynamics, NetSuite, and others) connect directly, so AR automation runs on your existing infrastructure rather than requiring a separate ledger.",
      },
      {
        question: "Is this suitable for high-volume, multi-entity B2B billing?",
        answer:
          "Yes — Procinix AR automation is built for multi-entity, multi-currency B2B operations, with entity-aware aging, customer statements, and reconciliation so shared-services and regional finance teams work off one unified view of receivables.",
      },
    ],
    relatedSlugs: ["collections", "billing-invoicing", "customer-reconciliation"],
  },
  collections: {
    slug: "collections",
    family: "o2c",
    tagline: "Agentic collections — reduce DSO without damaging relationships.",
    metaDescription:
      "Collection automation with segmented dunning, promise-to-pay tracking, and risk scoring — built to cut DSO without over-chasing good customers.",
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
    faq: [
      {
        question: "What is collection automation?",
        answer:
          "Collection automation replaces one-size-fits-all dunning with segmented strategies by customer risk and value, tracks promise-to-pay commitments to closure, and coordinates outreach across email, portal, and phone — so collectors work a prioritized list instead of chasing everyone the same way.",
      },
      {
        question: "How does this reduce DSO without hurting customer relationships?",
        answer:
          "Risk scoring surfaces which accounts genuinely need escalation and which are just slow-payers with a good track record, so collectors spend effort where it moves cash — not on customers who don't need to be chased hard.",
      },
      {
        question: "Does it track promise-to-pay commitments?",
        answer:
          "Yes — every commitment a customer makes is logged, tracked, and escalated automatically if it's missed, so promises don't quietly fall through the cracks the way they do in spreadsheets and inboxes.",
      },
      {
        question: "Can collection strategies differ by customer segment?",
        answer:
          "Yes — enterprise, SMB, and at-risk accounts each run their own playbook, with escalation timing and channel mix configured per segment rather than one blanket policy for every customer.",
      },
    ],
    relatedSlugs: ["accounts-receivable", "customer-reconciliation", "cash-flow-visibility"],
  },
  "customer-reconciliation": {
    slug: "customer-reconciliation",
    family: "o2c",
    tagline: "Customer balances, agreed. Disputes, documented.",
    metaDescription:
      "Customer reconciliation automation — statement comparison, deduction tie-out, and dispute workflows that keep customer balances audit-ready.",
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
    faq: [
      {
        question: "What is customer reconciliation automation?",
        answer:
          "Customer reconciliation automation matches customer-provided statements against your ledger balances, ties deductions back to the invoices, POs, and contracts that justify them, and tracks disputes from open to closed with a full evidence chain — instead of a manual quarter-end scramble.",
      },
      {
        question: "How does it handle deductions and disputes?",
        answer:
          "Deductions are automatically classified and matched to their source documents, and every dispute moves through a tracked workflow so resolution history — not just the outcome — is available for audit or customer conversations.",
      },
      {
        question: "Does this help with external audit confirmations?",
        answer:
          "Yes — customer balances and supporting evidence are available on demand, so responding to audit confirmation requests is a matter of pulling records rather than reconstructing them under time pressure.",
      },
      {
        question: "Can reconciliation automation scale across many customers and entities?",
        answer:
          "Yes — statement comparison and deduction tie-out run the same way across hundreds of customer accounts and multiple entities, with consistent evidence capture throughout.",
      },
    ],
    relatedSlugs: ["accounts-receivable", "collections", "vendor-reconciliation"],
  },

  // ------------ Record-to-Report ------------
  "month-end-close": {
    slug: "month-end-close",
    family: "r2r",
    tagline: "Close faster. With controls. Every month.",
    metaDescription:
      "Month-end close automation (Record-to-Report) — task orchestration, auto-reconciliations, and journal controls that cut close days for multi-entity finance teams.",
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
    faq: [
      {
        question: "What is month-end close automation?",
        answer:
          "Month-end close automation — part of Record-to-Report (R2R) — replaces spreadsheet-and-email close checklists with a single workflow that tracks every close task, owner, and SLA; runs reconciliations before the close window opens; and routes journal entries through review and approval with a full audit trail.",
      },
      {
        question: "How does Procinix reduce close-cycle time?",
        answer:
          "By moving reconciliations earlier (bank, AP, AR, GL, and intercompany reconcile continuously, not just at period-end), giving controllers a live view of close progress and bottlenecks, and letting agentic AI draft routine reconciliations and journals so people focus on judgment calls. Customers typically see a 30-50% reduction in close days.",
      },
      {
        question: "Can Procinix automate reconciliations during close?",
        answer:
          "Yes. Bank, AP, AR, GL, and intercompany reconciliations run on a schedule ahead of close, with exceptions surfaced immediately rather than discovered during the close crunch — one of the most common causes of late-close surprises.",
      },
      {
        question: "Does Procinix support multi-entity consolidation during close?",
        answer:
          "Yes — close task orchestration, reconciliations, and journal controls are entity-aware, and pair with Procinix's consolidation module for multi-entity, multi-currency group reporting, so shared-services and multi-country finance teams close on one platform.",
      },
      {
        question: "How does agentic AI help with the financial close?",
        answer:
          "Agents draft reconciliations, propose journal entries with supporting evidence pre-attached, and prioritize the close dashboard by risk — so controllers spend their time reviewing judgment items instead of chasing task status across teams.",
      },
      {
        question: "Is Procinix's R2R close process audit-ready?",
        answer:
          "Every task, reconciliation, journal, and exception is documented end-to-end with owner, timestamp, and evidence, so audit support during and after close is a matter of pulling records rather than reconstructing them.",
      },
    ],
    relatedSlugs: ["consolidation", "provisions-accruals", "cash-flow-visibility", "bank-reconciliation"],
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
    metaDescription:
      "Provision and accrual automation, plus prepaid expense automation — policy-driven accruals, deferral schedules, and auto-reversal at month-end close.",
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
    faq: [
      {
        question: "What is provision and accrual automation?",
        answer:
          "It applies consistent, policy-driven rules to calculate accruals and provisions every period — instead of reconstructing them from memory or spreadsheets each month — with recurring templates for routine accruals and controlled workflows for one-off provisions.",
      },
      {
        question: "Does this cover prepaid expense automation too?",
        answer:
          "Yes — prepayments and deferrals are tracked on the same policy-driven basis as accruals, so prepaid balances don't slip through the cracks between the expense being paid and the cost being recognized in the right period.",
      },
      {
        question: "How does auto-reversal work?",
        answer:
          "When the actual invoice or transaction arrives, the corresponding accrual or provision reverses and true-ups automatically, with the evidence chain (contracts, POs, invoices) linked to every entry — reducing the size and pain of year-end true-ups.",
      },
      {
        question: "Can provision policy be applied consistently across multiple entities?",
        answer:
          "Yes — the same accrual and provision rules apply per category and entity, so a multi-entity group doesn't end up with inconsistent, locally-invented provisioning practices.",
      },
    ],
    relatedSlugs: ["month-end-close", "amortization", "year-end-close"],
  },
  amortization: {
    slug: "amortization",
    family: "r2r",
    tagline: "Amortization — schedule-driven, audit-traced.",
    metaDescription:
      "Amortisation automation for prepaid expenses and lease/rental schedules under Ind AS 116 — contract-to-schedule postings with full audit drill-down.",
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
    faq: [
      {
        question: "What is amortization automation?",
        answer:
          "Amortization automation builds monthly amortization schedules directly from source contracts and POs — prepaid expenses, software licenses, insurance, and lease arrangements — and posts them on schedule with approval and reversal controls, instead of a spreadsheet someone maintains by hand.",
      },
      {
        question: "Does Procinix handle rental and lease amortization under Ind AS 116?",
        answer:
          "Yes. Rental and lease contracts accounted for under Ind AS 116 (or IFRS 16) generate a right-of-use asset amortization schedule and lease liability unwind automatically from the contract terms, with modifications — extensions, early terminations, scope changes — tracked as they happen rather than reconstructed at audit time.",
      },
      {
        question: "How are prepaid expenses automated here?",
        answer:
          "Prepaid contracts (insurance, subscriptions, retainers) are converted into a schedule the moment the contract is loaded, and monthly postings happen automatically — so the prepaid balance always reflects reality instead of being a periodic clean-up exercise.",
      },
      {
        question: "Can every amortization posting be traced back to its source contract?",
        answer:
          "Yes — every posting drills down to the originating contract or PO, so an audit question about any amortization line is answered in seconds, not days.",
      },
      {
        question: "What happens when a contract is modified or terminated early?",
        answer:
          "Modifications and early terminations are handled as tracked events that adjust the remaining schedule going forward, with the accounting impact surfaced immediately rather than discovered at the next audit.",
      },
    ],
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
  "bank-reconciliation": {
    slug: "bank-reconciliation",
    family: "r2r",
    tagline: "Bank statements reconciled daily — not just at month-end.",
    heroStats: [
      { value: "99%+", label: "auto-match rate" },
      { value: "Daily", label: "reconciliation cadence" },
    ],
    metaDescription:
      "Bank reconciliation automation — auto-imported statements, rule-based and AI transaction matching, and multi-bank, multi-entity exception handling.",
    painPoints: [
      "Bank statements reconciled manually in spreadsheets",
      "Unmatched and unidentified transactions pile up",
      "Multi-bank, multi-entity reconciliation is fragmented",
      "Reconciliation only happens at close, hiding errors and fraud longer",
    ],
    features: [
      { title: "Automated statement import", body: "MT940, camt.053, and bank API feeds ingested on a schedule — no manual downloads." },
      { title: "Rule-based and AI matching", body: "Transactions matched to GL, AP, and AR records automatically, learning patterns over time." },
      { title: "Exception workflow", body: "Unmatched items routed for review with the context needed to resolve them fast." },
      { title: "Multi-bank, multi-entity view", body: "Every account, every entity, reconciled and visible in one consolidated view." },
    ],
    outcomes: [
      { metric: "Daily reconciliation, not monthly", detail: "Discrepancies caught the day they happen, not weeks later." },
      { metric: "Faster close", detail: "Bank reconciliation stops being a bottleneck at month-end." },
      { metric: "Earlier fraud and error detection", detail: "Anomalies surface in near real time instead of at period-end review." },
    ],
    aiAngle:
      "Agents match bank lines to GL, AP, and AR transactions, learn matching patterns as they go, and flag anomalies — duplicate payments, unusual transactions — as they occur, not weeks later.",
    faq: [
      {
        question: "What is bank reconciliation automation?",
        answer:
          "It automatically imports bank statements and matches each transaction to the corresponding GL, AP, or AR entry — using rules and AI matching that improve over time — so reconciliation happens continuously instead of being a manual, once-a-month spreadsheet exercise.",
      },
      {
        question: "Can this run daily instead of just at month-end?",
        answer:
          "Yes — that's the core benefit. Statements are pulled on a schedule (daily or more frequently) so discrepancies, duplicate payments, or unusual transactions are caught close to when they happen, not discovered weeks later during the close crunch.",
      },
      {
        question: "Does it support multiple banks and entities?",
        answer:
          "Yes — accounts across multiple banks and legal entities reconcile into one consolidated view, so a multi-entity or multi-country treasury function isn't stitching together separate bank portals and spreadsheets.",
      },
      {
        question: "What bank statement formats are supported?",
        answer:
          "Standard formats like MT940 and camt.053, along with direct bank API feeds where available, are ingested automatically — matching the connectivity options most banks already support.",
      },
      {
        question: "How does bank reconciliation automation help with fraud detection?",
        answer:
          "Because matching runs continuously rather than periodically, anomalies — duplicate payments, unexpected beneficiaries, out-of-pattern amounts — are flagged close to real time, giving finance teams a much shorter window to catch and act on issues.",
      },
      {
        question: "Does this connect to the month-end close process?",
        answer:
          "Yes — bank reconciliation is one of the reconciliation types run continuously ahead of close inside Procinix's month-end close workflow, alongside AP, AR, GL, and intercompany reconciliations, so nothing is left until the close window opens.",
      },
    ],
    relatedSlugs: ["month-end-close", "cash-flow-visibility", "payments"],
  },
};

export const ALL_MODULE_SLUGS = Object.keys(MODULE_CONTENT);
