/**
 * Validates a post-login redirect target (the `?next=` param on
 * /admin/login, read client-side in LoginForm.tsx). Only a same-site
 * relative path is allowed — never an absolute URL — so a crafted link
 * like `/admin/login?next=https://evil.example.com` can't send a freshly
 * authenticated admin off-site. `/admin/login` itself is a public path
 * (reachable while logged out), so this value is attacker-influenceable
 * and must be validated, unlike the `next` middleware.ts generates on its
 * own redirects (which is always a same-origin pathname by construction).
 */
export function isSafeInternalPath(path: string | null | undefined): boolean {
  if (!path) return false;
  return path.startsWith("/") && !path.startsWith("//");
}
