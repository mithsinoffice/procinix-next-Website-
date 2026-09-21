import "server-only";
import { cookies, headers } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken, type SessionPayload } from "./session.ts";
import type { AdminRole } from "@/lib/hero/types";

/** Reads and verifies the admin session cookie for the current request.
 *  Returns null when there is no session or it's invalid/expired. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/**
 * Defense-in-depth guard for server actions and route handlers: the
 * middleware already blocks unauthenticated requests to /admin and
 * /api/admin, but every mutating server action re-checks the session and
 * role itself, rather than trusting that the request could only have
 * arrived here if middleware had approved it.
 */
export async function requireRole(...allowed: AdminRole[]): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated.");
  if (!allowed.includes(session.role)) {
    throw new Error(`This action requires one of: ${allowed.join(", ")}.`);
  }
  return session;
}

/** Best-effort client IP for rate limiting — Vercel sets x-forwarded-for. */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
