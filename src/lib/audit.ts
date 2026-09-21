import "server-only";
import { sql } from "@/lib/db/client";
import type { AuditAction, AuditEntry } from "@/lib/hero/types";

/**
 * Records who did what to which campaign, and when. Read-only to content
 * editors (enforced in the admin UI/route, not here); write-only from
 * server actions that already re-validated the actor's session.
 *
 * Best-effort: a failed audit write is logged but never blocks the
 * underlying publish/edit/reorder action — losing an audit row is bad,
 * but silently blocking a legitimate content change because of it would
 * be worse, and it's still visible in server logs either way.
 */
export async function writeAuditLog(entry: {
  actorEmail: string;
  action: AuditAction;
  campaignId?: string | null;
  campaignSlug?: string | null;
  changeSummary?: string | null;
}): Promise<void> {
  if (!sql) return;
  try {
    await sql`
      INSERT INTO audit_log (actor_email, action, campaign_id, campaign_slug, change_summary)
      VALUES (${entry.actorEmail}, ${entry.action}, ${entry.campaignId ?? null}, ${entry.campaignSlug ?? null}, ${entry.changeSummary ?? null})
    `;
  } catch (err) {
    console.error("writeAuditLog failed (non-fatal)", err);
  }
}

export async function listAuditLog(limit = 200): Promise<AuditEntry[]> {
  if (!sql) return [];
  const rows = await sql`
    SELECT * FROM audit_log ORDER BY created_at DESC LIMIT ${limit}
  `;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rows.map((row: any) => ({
    id: row.id,
    actorEmail: row.actor_email,
    action: row.action,
    campaignId: row.campaign_id,
    campaignSlug: row.campaign_slug,
    changeSummary: row.change_summary,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}
