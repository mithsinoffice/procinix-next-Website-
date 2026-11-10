#!/usr/bin/env node
/**
 * Idempotent schema + seed migration for the Homepage Slider feature.
 *
 * Usage (after provisioning a Neon/Vercel Postgres database and setting
 * DATABASE_URL — see docs/hero-slider.md):
 *
 *   node --env-file=.env.local scripts/db/migrate.mjs
 *
 * Safe to re-run any number of times:
 * - schema: every statement is CREATE ... IF NOT EXISTS.
 * - seed: every campaign insert is keyed on the unique `slug` column with
 *   ON CONFLICT (slug) DO NOTHING, so re-running never creates duplicates
 *   or clobbers content an admin has since edited.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(
    "DATABASE_URL is not set. Provision a Postgres database (Vercel dashboard → Storage → Neon, " +
      "or neon.tech directly), copy its connection string, and either export it or put it in " +
      ".env.local, then re-run:\n\n  node --env-file=.env.local scripts/db/migrate.mjs\n",
  );
  process.exit(1);
}

const sql = neon(databaseUrl);

async function applySchema() {
  const schemaPath = path.join(__dirname, "..", "..", "src", "lib", "db", "schema.sql");
  const schema = readFileSync(schemaPath, "utf8");
  // Strip `--` line comments before splitting on `;` — a naive split
  // misparses when a comment sits directly above a statement (no semicolon
  // between them merges the comment and statement into one discarded
  // chunk) or when a comment itself contains a semicolon.
  const withoutComments = schema.replace(/--.*$/gm, "");
  const statements = withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await sql.query(statement);
  }
  console.log(`Applied ${statements.length} schema statement(s).`);
}

// Mirrors the 6 campaigns migrated from the previous src/content/showcase.ts,
// plus the evergreen brand hero as the first, default slide (spec section 11).
const SEED_CAMPAIGNS = [
  {
    slug: "brand",
    internalName: "Brand / Evergreen — Don't change your business to fit software.",
    eyebrow: "Automation & Beyond",
    headline: "Don't change your business to fit software.",
    description:
      "A unified finance operations platform that goes beyond automation — combining agentic AI, intelligent workflows, and real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report.",
    primaryCtaLabel: "Book a Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "Launch Value Assessment",
    secondaryCtaHref: "/roi-calculator",
    accent: "teal",
    analyticsCampaignId: "brand_evergreen",
    priority: 0,
    isEvergreen: true,
  },
  {
    slug: "command-centre",
    internalName: "Finance Command Centre",
    eyebrow: "FINANCE COMMAND CENTRE",
    headline: "Your entire finance operation. One command centre.",
    description:
      "A unified view across entities, cash, payables, receivables, close, approvals, exceptions, and operational performance.",
    primaryCtaLabel: "Explore the Platform",
    primaryCtaHref: "/platform",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "teal",
    analyticsCampaignId: "command_centre",
    priority: 1,
  },
  {
    slug: "s2p",
    internalName: "Source-to-Pay",
    eyebrow: "SOURCE-TO-PAY",
    headline: "From request to payment. Controlled end to end.",
    description:
      "Procurement, vendors, purchase orders, invoice intelligence, matching, exceptions, and approvals connected in one lifecycle through to payment.",
    primaryCtaLabel: "Explore Source-to-Pay",
    primaryCtaHref: "/source-to-pay",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "teal",
    analyticsCampaignId: "s2p",
    priority: 2,
  },
  {
    slug: "o2c",
    internalName: "Order-to-Cash",
    eyebrow: "ORDER-TO-CASH",
    headline: "Turn receivables into cash, faster.",
    description: "Invoicing, receivables, collections, deductions, cash application, and reconciliation connected in one operating flow.",
    primaryCtaLabel: "Explore Order-to-Cash",
    primaryCtaHref: "/order-to-cash",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "amber",
    analyticsCampaignId: "o2c",
    priority: 3,
  },
  {
    slug: "r2r",
    internalName: "Record-to-Report",
    eyebrow: "RECORD-TO-REPORT",
    headline: "Close with control, not chaos.",
    description:
      "Reconciliations, journals, provisions, accruals, amortization, and consolidation coordinated from one controlled close workspace.",
    primaryCtaLabel: "Explore Record-to-Report",
    primaryCtaHref: "/record-to-report",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "purple",
    analyticsCampaignId: "r2r",
    priority: 4,
  },
  {
    slug: "nixbot",
    internalName: "Nixbot (enterprise AI)",
    eyebrow: "ENTERPRISE AI",
    headline: "Ask. Analyse. Act.",
    description:
      "Query and act across finance and operations in plain language, within the same permissions, entity scope, and data access controls as the underlying platform.",
    primaryCtaLabel: "Explore AI-powered Finance",
    primaryCtaHref: "/platform#agentic-ai",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "purple",
    badge: "Illustrative prompts",
    analyticsCampaignId: "nixbot",
    priority: 5,
  },
  {
    slug: "month-end-close",
    internalName: "Featured — Month-End Close",
    eyebrow: "FEATURED",
    headline: "Transform Month-End Close",
    description:
      "Bring tasks, reconciliations, journals, provisions, dependencies, evidence, and approvals into one controlled close process.",
    primaryCtaLabel: "Explore Month-End Close",
    primaryCtaHref: "/modules/month-end-close",
    secondaryCtaLabel: "Book a Demo",
    secondaryCtaHref: "/book-demo",
    accent: "purple",
    badge: "New",
    analyticsCampaignId: "campaign_month_end_close",
    priority: 6,
  },
];

async function seedCampaigns() {
  let inserted = 0;
  for (const c of SEED_CAMPAIGNS) {
    const rows = await sql`
      INSERT INTO hero_campaigns (
        slug, internal_name, eyebrow, headline, description,
        primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href,
        media_type, alt_text, accent, badge, status, priority,
        analytics_campaign_id, is_evergreen_fallback, created_by, updated_by, published_at
      ) VALUES (
        ${c.slug}, ${c.internalName}, ${c.eyebrow}, ${c.headline}, ${c.description},
        ${c.primaryCtaLabel}, ${c.primaryCtaHref}, ${c.secondaryCtaLabel ?? null}, ${c.secondaryCtaHref ?? null},
        'image', ${c.headline}, ${c.accent}, ${c.badge ?? null}, 'published', ${c.priority},
        ${c.analyticsCampaignId}, ${Boolean(c.isEvergreen)}, 'migration-seed', 'migration-seed', now()
      )
      ON CONFLICT (slug) DO NOTHING
      RETURNING slug
    `;
    if (rows.length > 0) inserted += 1;
  }
  console.log(`Seeded ${inserted} new campaign(s) (existing slugs were left untouched).`);
}

async function main() {
  await applySchema();
  await seedCampaigns();
  console.log("\nMigration complete. Next: create your first admin user with:");
  console.log("  node --env-file=.env.local scripts/db/create-admin.mjs <email> <password> ADMIN\n");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
