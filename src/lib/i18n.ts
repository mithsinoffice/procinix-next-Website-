/**
 * i18n scaffolding for future locale support.
 *
 * Current state: English-only. To enable multi-locale routing (e.g. /en-us/,
 * /en-gb/, /en-ae/, /hi-in/) without rewriting the app:
 *
 *  1. Install next-intl: `npm i next-intl`
 *  2. Move src/app/* under src/app/[locale]/* (a one-line config change)
 *  3. Add middleware.ts:
 *       import createMiddleware from 'next-intl/middleware';
 *       export default createMiddleware({ locales: LOCALES, defaultLocale: 'en' });
 *  4. Create src/messages/<locale>.json files for translated strings
 *  5. Update `alternates.languages` in SEO helpers with hreflang mapping
 *
 * Until then, every page renders in English.
 */

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string }> = {
  en: { label: "English", htmlLang: "en" },
};
