import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless Postgres client (HTTP-based — no persistent TCP
 * connection, no native bindings, works in both the Node and Edge
 * runtimes on Vercel).
 *
 * Provisioning: create a Neon Postgres database via the Vercel dashboard
 * (Storage tab → "Neon" → Create) or directly at neon.tech, then set
 * DATABASE_URL in the project's environment variables. See
 * docs/hero-slider.md for the exact one-time setup steps.
 *
 * When DATABASE_URL is unset (not yet provisioned), `sql` is null and
 * every caller in src/lib/hero/data.ts and src/lib/auth/* falls back to
 * safe, documented behavior (the evergreen hero, a login rejection)
 * rather than throwing — see src/lib/hero/data.ts's getPublicHeroCampaigns
 * for the public-facing example.
 */
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export function isDatabaseConfigured(): boolean {
  return sql !== null;
}
