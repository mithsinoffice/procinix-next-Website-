# "See Procinix in Action" — homepage product showcase

A tabbed, deep-linkable product showcase on the homepage, positioned
between `TrustBand` and `FinanceFamilies`. Manual navigation (pill tabs,
prev/next arrows, swipe on mobile, arrow keys) — no autoplay.

## Where things live

| What | Where |
|---|---|
| Campaign data + type | `src/content/showcase.ts`, `ShowcaseCampaign` in `src/content/types.ts` |
| Eligibility/scheduling logic | `getEligibleCampaigns()` in `src/content/showcase.ts` |
| Components | `src/components/showcase/*` |
| Analytics helper | `src/lib/analytics.ts` (`trackEvent`) |
| Screenshots/video | `public/showcase/<category>/...` (create the folder when you add the first asset — see below) |
| Config-logic checks | `scripts/validate-showcase-config.mjs` (`node scripts/validate-showcase-config.mjs`) |

## Adding a new campaign

1. Open `src/content/showcase.ts` and add a new object to the
   `SHOWCASE_CAMPAIGNS` array. Every field is documented on the
   `ShowcaseCampaign` type in `src/content/types.ts`. You do **not** need to
   touch any component file — the UI renders entirely from this array.
2. Pick a `priority` (lower renders first / further left in the tab strip)
   and a unique `slug` (used for the deep link, e.g. `?showcase=<slug>`) and
   `id` (stable internal key — don't reuse or repurpose an old campaign's
   `id` once it's shipped, since analytics history keys off
   `analyticsCampaignId`, not `id`).
3. Set `accent` to one of the three site tones — `teal` (S2P), `amber`
   (O2C), or `purple` (R2R/AI) — matching `familyTone` in
   `ModuleDetail.tsx` if the campaign maps to one of those families.
4. Leave `media.desktopSrc`/`mobileSrc` unset until you have an approved
   screenshot or clip — the showcase renders a branded placeholder frame
   instead of a broken image, so shipping the campaign ahead of final
   creative is safe.
5. Run `node scripts/validate-showcase-config.mjs` — it sanity-checks
   scheduling/slug logic against the array (see below) — then
   `npm run typecheck` and `npm run build`.

## Adding the real screenshot/video once it's approved

1. Create `public/showcase/<category>/` if it doesn't exist yet (e.g.
   `public/showcase/r2r/`).
2. Drop the file in — recommended: `desktop.png` (or `.webp`) at **1600×1000px**
   (16:10, matches the component's `aspect-[16/10]` frame) and, optionally,
   a narrower `mobile.png` at **900×1125px** (4:5) for small screens. For
   video: `.mp4` (H.264) plus a `poster.jpg` frame at the same 16:10 ratio.
   Keep desktop screenshots under ~400KB (compress/export as WebP where
   possible) — this section sits above the fold-adjacent area and its
   images count toward LCP if they're the eagerly-loaded (`priority: 0`)
   campaign.
3. In `src/content/showcase.ts`, set that campaign's
   `media.desktopSrc` / `media.mobileSrc` (and `poster` for video) to the
   `/showcase/...` path. That's it — no component changes.
4. Write real `alt` text describing what the image actually shows. Never
   leave placeholder alt text on a real screenshot.

## Scheduling

- `active: false` removes a campaign from rotation immediately without
  deleting its config — the fastest way to pull something.
- `startAt` / `endAt` are optional ISO 8601 instants, e.g.
  `"2026-11-01T00:00:00Z"`. **Always include the `Z`** (UTC) — the
  comparison is `new Date(startAt).getTime() <= Date.now()`, so an
  unzoned string is parsed by the browser/Node's local-time rules and will
  drift depending on where it's evaluated. Omit either bound for an
  open-ended window (no start = already started; no end = never ends).
- Eligibility (`active` + in-window) is computed once per page load in
  `getEligibleCampaigns()`, memoized for the lifetime of that load. It is
  **not** re-evaluated live in an open tab — a campaign scheduled to end at
  09:00 won't disappear from someone's browser mid-session at 09:00, only
  on their next full page load. This is intentional: recomputing it on a
  timer would risk the active tab disappearing under a visitor's cursor.
- SSR/hydration note: the eligible-campaigns list is computed once via
  `useMemo(() => getEligibleCampaigns(), [])` inside
  `ProductShowcaseInner`, so the array is identical between the server
  render and the client hydration pass for a normal page load (both
  happen within the same request/response round trip, well under any
  campaign's start/end boundary). The only theoretical edge case is a page
  load that straddles the *exact* second a campaign starts or ends — in
  that instant the visitor may see either version depending on timing;
  it self-corrects on the next navigation and isn't worth engineering
  around.

## Deep linking

`https://www.procinix.ai/?showcase=r2r` opens the homepage with the R2R
campaign active (match is on `slug`, not `id`). Switching tabs updates the
URL via `history.replaceState` (not a full Next.js navigation), so it
doesn't add browser-back-button entries per tab click and doesn't scroll
the page — it's purely for making the *current* view shareable/linkable.
Canonical tags and metadata are unaffected — the homepage's canonical URL
stays `https://www.procinix.ai/` regardless of the query param.

## Deactivating or reordering

- Deactivate: flip `active` to `false`. Leave the object in the array
  (don't delete it) if you might turn it back on — its historical
  `analyticsCampaignId` events stay queryable in GA4 either way.
- Reorder: change `priority` values. They don't need to be contiguous
  (0, 1, 2, ...) — only their relative order matters.

## GA4 events

All events go through `trackEvent()` in `src/lib/analytics.ts`, which
pushes a plain object onto `window.dataLayer` — the same mechanism the
site's existing GTM/gtag.js snippet in `src/app/layout.tsx` and
`ContactForm.tsx`'s conversion event already use. No second analytics
library was added.

| Event | Fires when | Key params |
|---|---|---|
| `showcase_view` | The showcase section crosses 40% into the viewport, once per page load | `campaign_id` (whichever campaign was active at that moment) |
| `showcase_select` | A visitor changes the active campaign (click, arrow key/button, swipe) — **not** fired for the initial deep-link selection, since that's a page load, not a user action | `campaign_id`, `campaign_name`, `slide_index`, `selection_source` (`click`\|`keyboard`\|`swipe`) |
| `showcase_cta_click` | Either CTA button is clicked | `campaign_id`, `campaign_name`, `cta_type` (`primary`\|`secondary`), `cta_destination` |
| `showcase_video_start` | A video campaign starts playing | `campaign_id` |
| `showcase_video_complete` | A video campaign finishes playing | `campaign_id` |

`campaign_id` is always the stable `analyticsCampaignId` field, not the
internal `id` — keep `analyticsCampaignId` unchanged if you ever rename or
restructure a campaign's config, so GA4 history stays continuous.

## CMS (Sanity) status — deliberately not wired up here

`src/lib/sanity.ts` is a dependency-free stub: the `sanity`/`@sanity/client`
packages aren't installed, and `NEXT_PUBLIC_SANITY_PROJECT_ID` isn't set
anywhere in this repo's `.env.example`. Since Sanity isn't actually
configured and usable today, this showcase intentionally ships as typed
local configuration only — making it depend on an unfinished CMS would
risk the homepage failing if that CMS is ever half-configured in
production. If Sanity is completed later, the natural extension point is a
data-adapter that fetches campaign documents into the same
`ShowcaseCampaign[]` shape and falls back to `SHOWCASE_CAMPAIGNS` on any
fetch error — but that's a deliberately separate, future piece of work.

## Accessibility

The tab strip follows the WAI-ARIA tabs pattern: `role="tablist"` /
`role="tab"` / `role="tabpanel"`, roving `tabIndex` (only the active tab is
in the tab order; arrow keys move focus between tabs), and
`aria-selected`/`aria-controls`/`aria-labelledby` linking each tab to its
panel. The screenshot placeholder is exposed as `role="img"` with a
descriptive `aria-label` rather than being purely decorative. All
animation (crossfade, video autoplay) is skipped when
`prefers-reduced-motion` is set (via framer-motion's `useReducedMotion()`).

## Testing

There's no test runner in this repo (no Jest/Vitest/Playwright config) as
of this writing, so this feature does not add one. What exists instead:
`scripts/validate-showcase-config.mjs` is a dependency-free Node script
(no TypeScript path-alias resolution or extra tooling required — it runs
under plain `node`) that re-implements and asserts the same pure
config-selection logic as `getEligibleCampaigns`/`findCampaignBySlug` in
`src/content/showcase.ts` — active/inactive filtering, `startAt`/`endAt`
window checks, priority ordering, and slug resolution — against a set of
fixture campaigns. If you change that selection logic in
`src/content/showcase.ts`, update the mirrored copy in this script too
(both are short and the script says so at the top). Run it with
`node scripts/validate-showcase-config.mjs`; it exits non-zero on any
failed assertion, so it's safe to wire into a CI step later if a proper
test runner gets added to the repo.
