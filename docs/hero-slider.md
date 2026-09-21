# Homepage Hero Campaign Slider

The homepage's first viewport (directly under the nav, above `TrustBand`) is
an admin-managed campaign slider — not a static hero and not a separate
section. Left ~30–40% is copy (eyebrow, headline, description, badge, up to
two CTAs); right ~60–70% is a dominant product screenshot or video. It is
built from:

- `src/lib/hero/*` — types, eligibility/scheduling logic, CTA URL safety,
  media validation, zod form validation, the evergreen fallback, and the
  Postgres-backed data layer (`data.ts`).
- `src/components/hero/*` — the public slider (`HeroSliderSection` — async
  Server Component — wrapping the interactive `HeroSlider` Client Component
  in `<Suspense>`, with a non-interactive server-rendered fallback for the
  pre-hydration paint).
- `src/app/admin/**`, `src/app/api/admin/**` — the authenticated management
  UI and its server actions / API routes.
- `src/lib/auth/*`, `src/middleware.ts` — session auth, password hashing,
  rate limiting, and the edge route guard.
- `src/lib/db/*`, `scripts/db/*` — schema and one-time setup scripts.

## One-time environment setup

1. Provision a Postgres database (Vercel dashboard → Storage → Neon, or
   directly at neon.tech) and set `DATABASE_URL`.
2. Provision a Vercel Blob store (Vercel dashboard → Storage → Blob) and set
   `BLOB_READ_WRITE_TOKEN`.
3. Generate a session signing secret and set `ADMIN_SESSION_SECRET`:
   ```
   openssl rand -base64 32
   ```
4. Apply the schema and seed the 6 migrated campaigns + the evergreen slide:
   ```
   node --env-file=.env.local scripts/db/migrate.mjs
   ```
   Safe to re-run — schema statements are `IF NOT EXISTS`, seed inserts are
   `ON CONFLICT (slug) DO NOTHING`.
5. Create the first admin user:
   ```
   node --env-file=.env.local scripts/db/create-admin.mjs you@procinix.com "a-strong-password" ADMIN
   ```
   Role is `ADMIN` or `CONTENT_EDITOR`; re-running with the same email
   updates that user's password/role instead of duplicating them.

Until `DATABASE_URL` is set (or the database is unreachable), the public
homepage automatically serves the evergreen fallback campaign
(`src/lib/hero/fallback.ts` — the original "Don't change your business to
fit software." slide) and the admin dashboard shows a "database not
configured" notice instead of erroring. The public site never breaks
because of the admin system being unconfigured.

## Day-to-day operations (via `/admin/slider`)

All of these require signing in at `/admin/login`. `CONTENT_EDITOR` can
create and edit campaigns but cannot publish, unpublish, pause, or archive
one (`ADMIN`-only); every action is written to the audit log.

- **Add a campaign** — "+ Add New Slide" → fill in copy, upload
  desktop/mobile media, pick an accent and overlay, set the CTA(s) → Save as
  draft, then Preview, then Publish when ready.
- **Replace a screenshot or video** — open the campaign, use the media
  field to upload a new asset (validated client-side and server-side for
  type/size before it reaches Blob storage), Save. Cache revalidation makes
  it live on the homepage within seconds, no redeploy.
- **Schedule a campaign** — set "Start at" / "End at" (UTC) on the
  Scheduling tab and set status to Published; it becomes eligible only
  inside that window (`src/lib/hero/eligibility.ts`), and a deep link to a
  campaign outside its active window does not surface it.
- **Pause a campaign** — set status to Paused (or use the table's Pause
  action). It stops appearing in the slider immediately but keeps its data,
  history, and audit trail for republishing later.
- **Remove a campaign permanently** — Archive it first (removes it from the
  rotation), then Delete from the archived state. Archiving the evergreen
  fallback campaign is blocked, so the slider can never end up with zero
  eligible slides.
- **Reorder** — use the up/down controls in the slider table; this updates
  every affected campaign's `priority` in one atomic statement.

## Deep-linking

`?showcase=<slug>` on the homepage pre-selects that campaign on first paint
(server-rendered, not a post-hydration flicker) if — and only if — it is
currently eligible (published and inside its scheduling window). An
inactive, draft, or out-of-window slug is not reachable this way.

## Analytics (GA4 via `window.dataLayer`)

| Event | Fires when |
|---|---|
| `hero_slide_view` | Once per page load, for the initially-shown slide |
| `hero_slide_change` | On every slide change, with `campaign_id`, `slide_index`, and `selection_source` (`autoplay`, `arrow`, `dot`, `swipe`, `keyboard`, `preview_strip`, `deep_link`) |
| `showcase_cta_click` | A primary/secondary CTA is clicked |
| `showcase_video_start` / `showcase_video_complete` | A video slide starts/finishes playing |

## Security notes

- Session cookie is httpOnly, `secure` in production, `sameSite: lax`,
  signed with `ADMIN_SESSION_SECRET` (HS256 via `jose`), 12h TTL.
- `/admin/*` and `/api/admin/*` are gated in edge middleware (fast, no DB
  round-trip) *and* every server action re-checks the role server-side —
  the middleware is defense-in-depth, not the only check.
- Login is rate-limited per IP (in-memory sliding window — best-effort on
  serverless; swap in Upstash Ratelimit if strict cross-instance limiting
  is needed later) and returns a generic "Invalid email or password" with
  no user enumeration.
- CTA hrefs are validated server- and render-side
  (`src/lib/hero/ctaSafety.ts`): relative paths and `https:` only —
  `javascript:`, `data:`, `file:`, and protocol-relative URLs are rejected.
- No campaign field is ever rendered via `dangerouslySetInnerHTML`.
- A site-wide Content-Security-Policy was **not** added. The site already
  loads several inline GTM/GA4/LinkedIn/Meta-pixel scripts
  (`src/app/layout.tsx`) that would need a nonce-based CSP to keep working,
  and that requires building and testing against a live deploy rather than
  guessing at header values. Flagged as a follow-up, not an oversight. The
  other standard headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS, and `noindex` on `/admin/*`)
  are applied site-wide in `next.config.ts`.

## Testing

```
npm run typecheck   # tsc --noEmit
npm run lint        # next lint (non-interactive; see eslint.config.mjs)
npm test            # node --conditions=react-server --test "tests/*.test.ts"
```

`npm test` runs the real TypeScript source directly via Node's native type
stripping (no bundler, no separate test runtime) and requires
`--conditions=react-server`: the real `server-only` package
(`node_modules/server-only/index.js`) unconditionally throws on its default
export and only resolves to a no-op under the `react-server` export
condition — a condition Next.js's own compiler sets automatically during a
build, which plain `node --test` does not unless told to.
