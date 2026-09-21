import "server-only";

/**
 * Origin/Host verification for the admin API's plain Route Handlers
 * (login, logout, media upload).
 *
 * Next.js Server Actions (src/app/admin/(dashboard)/slider/actions.ts) get
 * this check automatically from the framework itself — see
 * isCsrfOriginAllowed in next/dist/server/app-render/action-handler.js,
 * which rejects a Server Action request whose Origin doesn't match the
 * deployment's host. Route Handlers under /api/admin/* do not get that for
 * free, so it's applied explicitly here.
 *
 * Requires a same-origin `Origin` header on every state-changing request.
 * All of this app's own admin API calls go through `fetch`, which sends
 * `Origin` on POST regardless of whether the request happens to be
 * same-origin — a legitimate browser request always has one to check.
 */
export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
