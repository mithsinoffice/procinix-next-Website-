# Procinix (Next.js)

SEO-first Next.js 15 (App Router) rewrite of the Figma-AI-Make React app.

## Setup

```bash
cd procinix-next
cp .env.example .env.local       # then fill in values
npm install
npm run dev
```

Visit http://localhost:3000

## What's already built

- **File-based routing** for all ~25 pages (`/`, `/ap-automation`, `/ar-automation`, `/platform`, `/use-cases`, `/contact`, etc.) — every page has its own URL for SEO
- **Per-page metadata** via `generateMetadata` in every `page.tsx` — unique `<title>`, description, canonical, OG, Twitter/LinkedIn cards
- **JSON-LD structured data**: Organization (site-wide), SoftwareApplication (per platform page), Article (per blog post), FAQ helper available
- **`sitemap.xml`** auto-generated from `src/lib/routes.ts`
- **`robots.txt`** with sitemap reference
- **Contact form** → `src/app/api/contact/route.ts` using Resend (with Zod validation, honeypot, UTM capture, GTM `dataLayer` conversion event)
- **Blog** powered by Sanity CMS (`/blog`, `/blog/[slug]`) — works empty until you fill in Sanity env vars
- **Analytics/pixels**: GTM, GA4, LinkedIn Insight, Meta Pixel — all load automatically when env vars are set
- **i18n scaffolding** in `src/lib/i18n.ts` — ready to switch on multi-locale routing
- **Next.js optimisations**: `next/image` with AVIF/WebP, `next/font` with Inter, route-level code splitting, `optimizePackageImports` for lucide/framer-motion/recharts

## Env vars (see `.env.example`)

Before going live, set in Vercel / `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical production URL
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — contact form email delivery
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_READ_TOKEN` — blog CMS
- `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID` — analytics/ads
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Search Console verification

## Deploying

1. Push this project to a new GitHub repo
2. Import to Vercel → it auto-detects Next.js
3. Add the env vars above in Vercel project settings
4. Point the GoDaddy domain's DNS at Vercel (A record → `76.76.21.21`, or CNAME for www)
5. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console + Bing Webmaster Tools

## What's left before launch

- [ ] **Real OG image** at `/public/og-default.png` (1200x630)
- [ ] **Favicon** at `/public/favicon.ico` and `/public/apple-touch-icon.png`
- [ ] **301 redirects** from old GoDaddy URLs — add to `next.config.ts` `redirects()` once you have the old URL list
- [ ] **Sanity schema**: create `post` type in Sanity Studio (title, slug, excerpt, body, coverImage, publishedAt, seo subdoc)
- [ ] **Content review**: per-module pages need 600+ words each for SEO; add FAQ sections with FAQ schema
- [ ] **Search Console + GA4** property setup
- [ ] **Test Core Web Vitals** with PageSpeed Insights after deploy

## Project layout

```
src/
  app/                       # App Router pages — one folder per URL
    layout.tsx               # Site shell + Organization JSON-LD + analytics scripts
    page.tsx                 # /  (home)
    ap-automation/page.tsx   # /ap-automation
    ...25 total routes
    blog/page.tsx            # /blog (Sanity)
    blog/[slug]/page.tsx     # /blog/:slug
    api/contact/route.ts     # POST /api/contact → Resend
    sitemap.ts               # /sitemap.xml
    robots.ts                # /robots.txt
  components/
    Navigation.tsx           # Uses <Link> + usePathname()
    Footer.tsx               # Static links
    WhatsAppFloat.tsx
    pages/                   # Ported from Figma AI Make (each = one route's body)
    home/                    # Home section components
    ui/                      # Radix + shadcn-style primitives
  lib/
    seo.ts                   # buildMetadata(), JSON-LD helpers
    routes.ts                # Central route registry (labels, titles, descriptions, keywords)
    legacy-nav.ts            # Shim for components still using onNavigate(pageId)
    sanity.ts                # Minimal dependency-free Sanity client
    i18n.ts                  # Locale scaffolding
```

## Migration notes

- The original Vite SPA rendered every page at `/` via `useState` + `switch`. That's SEO-dead — Google sees one page. Every route now has a unique URL.
- Components that called `onNavigate(page)` from the old callback-prop pattern now use `useLegacyNavigate()` from `src/lib/legacy-nav.ts`, which maps old page IDs to real URLs.
- All Radix versioned imports (`@radix-ui/react-dialog@1.1.6` etc.) were rewritten to plain imports.
- `motion/react` → `framer-motion`.
- `figma:asset/...` → `/logo.png` in `public/`.
- `"use client"` directives added automatically to any component using hooks, framer-motion, or browser APIs.
