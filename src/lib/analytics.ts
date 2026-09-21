/**
 * Thin GA4/GTM event helper.
 *
 * The site already loads GTM (preferred) or gtag.js directly in
 * `src/app/layout.tsx`, both of which read from `window.dataLayer`. Pushing
 * a plain `{ event, ...params }` object is the one format both consume, and
 * matches the existing ad-hoc push in `ContactForm.tsx` — this just gives it
 * a name and a single call site instead of re-implementing the guard clause
 * everywhere a new event is needed.
 *
 * No new analytics library is introduced.
 */

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}
