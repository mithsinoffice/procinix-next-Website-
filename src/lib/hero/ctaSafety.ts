/**
 * Validates an admin-entered CTA URL before it can be saved against a
 * campaign. Allows same-site relative paths ("/platform", "/book-demo#x")
 * and absolute https:// URLs; rejects everything else, including
 * javascript:, data:, file:, vbscript: and protocol-relative ("//host")
 * URLs (which can silently resolve to an attacker-controlled host).
 */
export function isSafeCtaHref(href: string | null | undefined): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.length === 0) return false;

  // Relative, same-site path: must start with a single "/" (not "//").
  if (trimmed.startsWith("/")) {
    return !trimmed.startsWith("//");
  }

  // Absolute URL: only https is allowed.
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

/** True when an external https:// URL should open in a new tab safely. */
export function isExternalHref(href: string): boolean {
  if (href.startsWith("/")) return false;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && url.host !== process.env.NEXT_PUBLIC_SITE_HOST;
  } catch {
    return false;
  }
}

/** rel attribute to apply when a CTA opens in a new tab. */
export const SAFE_EXTERNAL_REL = "noopener noreferrer";
