import type { ShowcaseCampaign } from "./types";
import { CORE_ROUTES, PILLAR_ROUTES, MODULE_ROUTES } from "@/lib/routes";

/**
 * "See Procinix in Action" homepage showcase.
 *
 * Adding a new campaign is a config + asset change, not a component change —
 * see docs/product-showcase.md for the full walkthrough. Screenshots are
 * optional: omit `desktopSrc`/`mobileSrc` and the showcase renders a
 * branded placeholder frame instead of a broken image, so this file can ship
 * ahead of final production screenshots.
 */
export const SHOWCASE_CAMPAIGNS: ShowcaseCampaign[] = [
  {
    id: "command-centre",
    slug: "command-centre",
    navigationLabel: "Command Centre",
    eyebrow: "FINANCE COMMAND CENTRE",
    headline: "Your entire finance operation. One command centre.",
    description:
      "A unified view across entities, cash, payables, receivables, close, approvals, exceptions, and operational performance.",
    media: {
      mediaType: "image",
      alt: "Procinix Finance Command Centre — consolidated view of cash position, payables, receivables, close status, and exceptions across entities.",
    },
    accent: "teal",
    primaryCta: { label: "Explore the Platform", href: CORE_ROUTES.platform.path },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    metrics: [
      { label: "Finance cycles", value: "3" },
      { label: "Modules", value: "20+" },
    ],
    priority: 0,
    active: true,
    analyticsCampaignId: "command_centre",
  },
  {
    id: "source-to-pay",
    slug: "s2p",
    navigationLabel: "S2P",
    eyebrow: "SOURCE-TO-PAY",
    headline: "From request to payment. Controlled end to end.",
    description:
      "Procurement, vendors, purchase orders, invoice intelligence, matching, exceptions, and approvals connected in one lifecycle through to payment.",
    media: {
      mediaType: "image",
      alt: "Procinix Source-to-Pay workbench — requisition-to-PO, AI invoice capture, 3-way matching, and exception workflow.",
    },
    accent: "teal",
    primaryCta: { label: "Explore Source-to-Pay", href: PILLAR_ROUTES.sourceToPay.path },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    priority: 1,
    active: true,
    analyticsCampaignId: "s2p",
  },
  {
    id: "order-to-cash",
    slug: "o2c",
    navigationLabel: "O2C",
    eyebrow: "ORDER-TO-CASH",
    headline: "Turn receivables into cash, faster.",
    description:
      "Invoicing, receivables, collections, deductions, cash application, and reconciliation connected in one operating flow.",
    media: {
      mediaType: "image",
      alt: "Procinix Order-to-Cash dashboard — accounts receivable aging, collections queue, and cash application status.",
    },
    accent: "amber",
    primaryCta: { label: "Explore Order-to-Cash", href: PILLAR_ROUTES.orderToCash.path },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    priority: 2,
    active: true,
    analyticsCampaignId: "o2c",
  },
  {
    id: "record-to-report",
    slug: "r2r",
    navigationLabel: "R2R",
    eyebrow: "RECORD-TO-REPORT",
    headline: "Close with control, not chaos.",
    description:
      "Reconciliations, journals, provisions, accruals, amortization, and consolidation coordinated from one controlled close workspace.",
    media: {
      mediaType: "image",
      alt: "Procinix Record-to-Report close cockpit — task orchestration, reconciliation status, and provisions across entities.",
    },
    accent: "purple",
    primaryCta: { label: "Explore Record-to-Report", href: PILLAR_ROUTES.recordToReport.path },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    priority: 3,
    active: true,
    analyticsCampaignId: "r2r",
  },
  {
    id: "nixbot",
    slug: "nixbot",
    navigationLabel: "Nixbot",
    eyebrow: "ENTERPRISE AI",
    headline: "Ask. Analyse. Act.",
    description:
      "Query and act across finance and operations in plain language, within the same permissions, entity scope, and data access controls as the underlying platform.",
    media: {
      mediaType: "image",
      alt: "Nixbot enterprise AI assistant — illustrative prompts for overdue receivables, provision true-ups, and pending AP approvals.",
    },
    accent: "purple",
    // No dedicated Nixbot page exists yet — links to the platform's agentic-AI
    // section rather than a page that doesn't exist. Repoint this once a
    // standalone Nixbot page ships.
    primaryCta: { label: "Explore AI-powered Finance", href: `${CORE_ROUTES.platform.path}#agentic-ai` },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    badges: ["Illustrative prompts"],
    priority: 4,
    active: true,
    analyticsCampaignId: "nixbot",
  },
  {
    id: "campaign-month-end-close",
    slug: "month-end-close",
    navigationLabel: "What's New",
    eyebrow: "FEATURED",
    headline: "Transform Month-End Close",
    description:
      "Bring tasks, reconciliations, journals, provisions, dependencies, evidence, and approvals into one controlled close process.",
    media: {
      mediaType: "image",
      alt: "Procinix Month-End Close workspace — task orchestration, reconciliation status, and approval workflow for period close.",
    },
    accent: "purple",
    primaryCta: { label: "Explore Month-End Close", href: MODULE_ROUTES.monthEndClose.path },
    secondaryCta: { label: "Book a Demo", href: CORE_ROUTES.bookDemo.path },
    badges: ["New"],
    priority: 5,
    active: true,
    analyticsCampaignId: "campaign_month_end_close",
  },
];

/**
 * Campaigns eligible to render right now: `active: true` and, if bounds are
 * set, `now` falls inside [startAt, endAt]. Both bounds are optional and
 * compared as UTC instants — see docs/product-showcase.md for the exact
 * scheduling contract and the SSR/hydration note.
 */
export function getEligibleCampaigns(
  campaigns: ShowcaseCampaign[] = SHOWCASE_CAMPAIGNS,
  now: Date = new Date(),
): ShowcaseCampaign[] {
  const t = now.getTime();
  return campaigns
    .filter((c) => c.active)
    .filter((c) => (c.startAt ? new Date(c.startAt).getTime() <= t : true))
    .filter((c) => (c.endAt ? new Date(c.endAt).getTime() >= t : true))
    .sort((a, b) => a.priority - b.priority);
}

export function findCampaignBySlug(
  slug: string | null | undefined,
  campaigns: ShowcaseCampaign[],
): ShowcaseCampaign | undefined {
  if (!slug) return undefined;
  return campaigns.find((c) => c.slug === slug);
}
