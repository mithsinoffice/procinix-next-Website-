import type { ComparisonContent } from "./types";

export const COMPARISON_CONTENT: Record<string, ComparisonContent> = {
  "procinix-vs-highradius": {
    slug: "procinix-vs-highradius",
    competitor: "HighRadius",
    tagline: "Unified S2P/O2C/R2R vs. an order-to-cash and treasury specialist.",
    metaDescription:
      "Procinix vs HighRadius — how a unified source-to-pay, order-to-cash, and record-to-report platform compares to HighRadius's AI-driven O2C and treasury automation suite.",
    summary:
      "HighRadius is best known as an order-to-cash and treasury automation platform — AI-driven collections, cash application, and credit management aimed primarily at large enterprises. Procinix takes a different starting point: one platform covering procure-to-pay, order-to-cash, and record-to-report together, built with India, UAE, Saudi Arabia, Singapore, and Australia compliance (GST, VAT, ZATCA, Peppol, Ind AS 116) as first-class requirements rather than an add-on. The two approaches suit different buyers: a large enterprise standardizing specifically on receivables and treasury automation is HighRadius's core strength, while a multi-entity group that wants procurement, payables, receivables, and close on one system — with regional compliance built in — is where Procinix is built to fit.",
    procinixStrengths: [
      "One platform for S2P, O2C, and R2R — not a receivables-only point solution",
      "Regional compliance built in: GST/e-invoicing (India), VAT/TRN (UAE), ZATCA Phase 1 & 2 (Saudi Arabia), Peppol/InvoiceNow (Singapore), Ind AS 116 lease accounting",
      "Designed for multi-entity, multi-country mid-market to enterprise groups rather than single-country enterprise deployments",
      "Faster deployment footprint suited to finance teams that need results in weeks, not a multi-quarter enterprise rollout",
    ],
    competitorStrengths: [
      "Deep, mature AI/ML capability specifically in cash application, collections prioritization, and credit risk scoring",
      "Strong track record with large, US-headquartered enterprises running high transaction volumes",
      "Established treasury and deduction-management modules with years of enterprise refinement",
    ],
    comparisonRows: [
      { category: "Core scope", procinix: "S2P + O2C + R2R on one platform", competitor: "Primarily O2C (collections, cash application, credit, treasury)" },
      { category: "Target company profile", procinix: "Mid-market to enterprise, multi-entity, multi-country", competitor: "Large enterprise, high transaction volume" },
      { category: "India/GCC/APAC compliance", procinix: "GST, VAT/TRN, ZATCA, Peppol, Ind AS 116 built in", competitor: "Not a primary regional focus" },
      { category: "Procurement & AP coverage", procinix: "Full S2P: sourcing, procurement, AP, payments", competitor: "Not a core focus area" },
      { category: "Record-to-report / close", procinix: "Month-end close, consolidation, reconciliations included", competitor: "Not a core focus area" },
      { category: "Deployment profile", procinix: "Weeks-to-months, module-by-module adoption", competitor: "Typically longer enterprise implementation cycles" },
    ],
    whenToChooseProcinix:
      "Choose Procinix when you need procurement, payables, receivables, and close working together on one platform — especially if you operate across India, the GCC, Singapore, or Australia and need local compliance (GST, VAT, ZATCA, Peppol, Ind AS 116) handled natively rather than bolted on.",
    whenToChooseCompetitor:
      "HighRadius is a strong fit when receivables, collections, and treasury automation at large enterprise scale is the specific, isolated problem you're solving — particularly for US-centric organizations with very high invoice/transaction volumes.",
    relevantModuleSlugs: ["accounts-receivable", "collections", "customer-reconciliation", "cash-flow-visibility", "month-end-close"],
    faq: [
      {
        question: "Is Procinix a direct replacement for HighRadius?",
        answer:
          "Not exactly — HighRadius specializes in order-to-cash and treasury automation, while Procinix covers procure-to-pay, order-to-cash, and record-to-report as one platform. A team specifically shopping for AR/collections/treasury automation at large enterprise scale should evaluate HighRadius directly; a team wanting unified finance operations across S2P, O2C, and R2R — with India/GCC/APAC compliance built in — is Procinix's core fit.",
      },
      {
        question: "Does Procinix handle collections and cash application like HighRadius?",
        answer:
          "Yes — collections and customer reconciliation are part of Procinix's order-to-cash module set, though HighRadius has a longer track record and deeper AI tooling specifically in high-volume cash application and credit scoring for large enterprises.",
      },
      {
        question: "Which is better for a multi-entity group across India, UAE, and Singapore?",
        answer:
          "Procinix is built specifically for that profile — GST, VAT/TRN, and Peppol/InvoiceNow compliance are native to the platform, and procurement, AP, AR, and close all run on the same system rather than requiring separate tools per function.",
      },
      {
        question: "Can I run Procinix alongside HighRadius instead of replacing it?",
        answer:
          "Some organizations do run point solutions alongside a broader platform, though most of Procinix's value comes from having S2P, O2C, and R2R on one system rather than stitching multiple platforms together — worth discussing directly against your specific stack.",
      },
    ],
  },
  "procinix-vs-tipalti": {
    slug: "procinix-vs-tipalti",
    competitor: "Tipalti",
    tagline: "Full finance-ops platform vs. a global mass-payouts and AP specialist.",
    metaDescription:
      "Procinix vs Tipalti — how a unified procure-to-pay, order-to-cash, and record-to-report platform compares to Tipalti's global payments and AP automation platform.",
    summary:
      "Tipalti is widely known for global mass payouts and AP automation — strong in cross-border payment execution, tax form collection, and supplier onboarding, often used by marketplaces, networks, and tech companies paying large numbers of global payees. Procinix approaches the problem from the finance-operations side: procurement, AP, AR, and close on one platform, with India, GCC, Singapore, and Australia compliance built in for enterprises running structured multi-entity operations rather than high-volume payee networks.",
    procinixStrengths: [
      "Full source-to-pay coverage — sourcing, procurement, budget control — not just the payment/AP layer",
      "Order-to-cash and record-to-report included, so payables automation isn't a standalone tool disconnected from close",
      "Regional compliance built in: GST/e-invoicing (India), VAT/TRN (UAE), ZATCA (Saudi Arabia), Peppol/InvoiceNow (Singapore)",
      "Built for structured B2B vendor and multi-entity operations rather than high-volume payee/marketplace payouts",
    ],
    competitorStrengths: [
      "Purpose-built for global mass payouts — strong multi-currency, multi-country payment execution at scale",
      "Mature supplier/payee onboarding with automated tax form collection (W-9/W-8, etc.) for cross-border payee networks",
      "Well suited to marketplaces, networks, and platforms paying large numbers of individual or small-business payees",
    ],
    comparisonRows: [
      { category: "Core scope", procinix: "S2P + O2C + R2R on one platform", competitor: "Primarily AP automation and global payouts" },
      { category: "Payee profile", procinix: "Structured B2B vendor relationships, multi-entity groups", competitor: "High-volume global payee networks (marketplaces, creators, freelancers)" },
      { category: "Procurement coverage", procinix: "Sourcing, RFx, requisition-to-PO, budget control", competitor: "Not a core focus area" },
      { category: "Close & consolidation", procinix: "Month-end close, consolidation, reconciliations included", competitor: "Not a core focus area" },
      { category: "India/GCC/APAC compliance", procinix: "GST, VAT/TRN, ZATCA, Peppol built in", competitor: "Not a primary regional focus" },
      { category: "Global payout execution", procinix: "Multi-bank payment orchestration for vendor payments", competitor: "Deep specialization in mass, cross-border payout execution" },
    ],
    whenToChooseProcinix:
      "Choose Procinix when payables automation needs to sit inside a broader finance-operations platform — procurement, AP, AR, and close together — for a multi-entity organization operating in India, the GCC, Singapore, or Australia.",
    whenToChooseCompetitor:
      "Tipalti is a strong fit when the core problem is paying a large volume of global payees — freelancers, creators, marketplace sellers, or international suppliers — with automated tax compliance and cross-border payment execution as the priority.",
    relevantModuleSlugs: ["accounts-payable", "payments", "procurement", "vendor-onboarding", "vendor-reconciliation"],
    faq: [
      {
        question: "Is Procinix a direct alternative to Tipalti?",
        answer:
          "It depends on the use case — Tipalti specializes in global mass payouts and payee tax compliance for high-volume networks, while Procinix is a broader finance-operations platform (S2P, O2C, R2R) for structured B2B vendor relationships. Teams specifically needing marketplace-scale global payouts should evaluate Tipalti directly.",
      },
      {
        question: "Does Procinix handle multi-currency vendor payments?",
        answer:
          "Yes — multi-bank payment orchestration across currencies is part of the payments module, built for structured vendor payment operations rather than high-volume individual payee networks.",
      },
      {
        question: "Which is better for a multi-entity enterprise in the GCC or India?",
        answer:
          "Procinix, if the requirement is a full finance-operations platform with GST/VAT/ZATCA compliance built in across procurement, AP, AR, and close — rather than a payments-and-AP-only tool.",
      },
      {
        question: "Does Procinix do supplier tax form collection like Tipalti?",
        answer:
          "Vendor onboarding in Procinix covers compliance documentation as part of a structured B2B vendor master, though Tipalti's automated global tax form (W-9/W-8) collection at payee-network scale is a more specialized capability built for that specific problem.",
      },
    ],
  },
  "procinix-vs-coupa": {
    slug: "procinix-vs-coupa",
    competitor: "Coupa",
    tagline: "Right-sized S2P/O2C/R2R vs. an enterprise business spend management suite.",
    metaDescription:
      "Procinix vs Coupa — how a right-sized procure-to-pay, order-to-cash, and record-to-report platform compares to Coupa's enterprise business spend management (BSM) suite.",
    summary:
      "Coupa is an established enterprise business spend management (BSM) suite — procurement, invoicing, expense, and sourcing at large-enterprise scale, typically implemented over an extended timeline with significant configuration investment. Procinix covers similar procure-to-pay ground plus order-to-cash and record-to-report, aimed at mid-market to enterprise multi-entity groups — particularly in India, the GCC, Singapore, and Australia — that want the same category of control without a multi-quarter enterprise-suite rollout.",
    procinixStrengths: [
      "S2P, O2C, and R2R together, not procurement/spend management alone",
      "Regional compliance built in: GST/e-invoicing (India), VAT/TRN (UAE), ZATCA (Saudi Arabia), Peppol/InvoiceNow (Singapore), Ind AS 116",
      "Deployment sized for mid-market to enterprise multi-entity groups rather than only the largest global enterprises",
      "Module-by-module adoption path — start with AP or procurement, expand into O2C and R2R over time",
    ],
    competitorStrengths: [
      "Mature, broad business spend management suite with deep sourcing, contract, and supplier risk management capability",
      "Long enterprise track record with large global organizations and complex multi-currency, multi-BU procurement needs",
      "Extensive third-party marketplace and supplier network integrations built over many years",
    ],
    comparisonRows: [
      { category: "Core scope", procinix: "S2P + O2C + R2R on one platform", competitor: "Business spend management: procurement, invoicing, expense, sourcing" },
      { category: "Target company profile", procinix: "Mid-market to enterprise, multi-entity, multi-country", competitor: "Large global enterprise" },
      { category: "Order-to-cash coverage", procinix: "Order management, billing, AR, collections included", competitor: "Not a core focus area" },
      { category: "Record-to-report / close", procinix: "Month-end close, consolidation, reconciliations included", competitor: "Not a core focus area" },
      { category: "India/GCC/APAC compliance", procinix: "GST, VAT/TRN, ZATCA, Peppol, Ind AS 116 built in", competitor: "Available via configuration/partners, not a primary regional focus" },
      { category: "Implementation profile", procinix: "Weeks-to-months, module-by-module", competitor: "Typically longer enterprise implementation cycles" },
    ],
    whenToChooseProcinix:
      "Choose Procinix when you want procurement-to-pay control plus order-to-cash and record-to-report on one platform, sized for a multi-entity group operating in India, the GCC, Singapore, or Australia, without committing to a large-enterprise BSM implementation timeline.",
    whenToChooseCompetitor:
      "Coupa is a strong fit for large global enterprises that need deep, mature business spend management — sourcing, contract lifecycle, and supplier risk at scale — and have the implementation runway a suite of that size typically requires.",
    relevantModuleSlugs: ["procurement", "sourcing", "accounts-payable", "budgeting-spend-control", "vendor-onboarding"],
    faq: [
      {
        question: "Is Procinix a lighter-weight Coupa alternative?",
        answer:
          "In scope, Procinix covers similar procure-to-pay ground plus order-to-cash and record-to-report, sized for mid-market to enterprise multi-entity groups. Coupa's business spend management suite goes deeper in areas like supplier risk and contract lifecycle management for the largest global enterprises.",
      },
      {
        question: "Does Procinix support RFx and strategic sourcing like Coupa?",
        answer:
          "Yes — RFI/RFP/RFQ workflows with weighted supplier scoring and award-to-PO conversion are part of the sourcing module, though Coupa's sourcing and supplier-risk tooling has more configuration depth for very large, complex sourcing events.",
      },
      {
        question: "Which is a better fit for a group with entities in India and the GCC?",
        answer:
          "Procinix, when GST, VAT/TRN, ZATCA, and Peppol compliance need to be native to the platform rather than handled through partner configuration or add-ons.",
      },
      {
        question: "How does implementation time compare?",
        answer:
          "Procinix is built for module-by-module adoption — starting with, say, AP or procurement and expanding — which typically moves faster than a full enterprise BSM suite rollout, though exact timelines depend on scope and entity count either way.",
      },
    ],
  },
};

export const ALL_COMPARISON_SLUGS = Object.keys(COMPARISON_CONTENT);
