#!/usr/bin/env node
/**
 * Creates (or resets the password of) a Homepage Slider admin user.
 * Never run this with a password on the command line in a shared shell
 * history you don't control — prefer typing it interactively when possible.
 *
 * Usage:
 *   node --env-file=.env.local scripts/db/create-admin.mjs <email> <password> [ADMIN|CONTENT_EDITOR]
 *
 * Role defaults to CONTENT_EDITOR. Re-running with an existing email
 * updates that user's password/role rather than creating a duplicate.
 */
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const [, , email, password, roleArg] = process.argv;
const role = (roleArg || "CONTENT_EDITOR").toUpperCase();

if (!email || !password) {
  console.error("Usage: node --env-file=.env.local scripts/db/create-admin.mjs <email> <password> [ADMIN|CONTENT_EDITOR]");
  process.exit(1);
}
if (role !== "ADMIN" && role !== "CONTENT_EDITOR") {
  console.error("Role must be ADMIN or CONTENT_EDITOR.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Password must be at least 12 characters.");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run migrate.mjs first — see docs/hero-slider.md.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);
  const rows = await sql`
    INSERT INTO admin_users (email, password_hash, role)
    VALUES (${email}, ${passwordHash}, ${role})
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, disabled_at = NULL
    RETURNING email, role
  `;
  console.log(`Admin user ready: ${rows[0].email} (${rows[0].role})`);
}

main().catch((err) => {
  console.error("create-admin failed:", err);
  process.exit(1);
});
