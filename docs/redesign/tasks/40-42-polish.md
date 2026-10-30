# 40 / 41 / 42 — Polish

**Phase:** 6 · Run as three tasks.

## 40 — SEO and sharing

Revised 2026-10-30. The site is live on Cloudflare at https://zionbonsai.com and work happens on `main` (the `redesign` branch is stale). The share image is done (`public/og-image.jpg`, set in `app/layout.tsx`); don't replace it. Every page already has its own `title` and `description`.

1. **Per-page share tags and canonical (bug).** Pages set `title`/`description` but not `openGraph`, so every page inherits the home page's `og:title` and `og:url` (check: `curl -s https://zionbonsai.com/workshops | grep og:`). Fix so each page's `og:title`, `og:description`, `og:url`, Twitter title/description and `<link rel="canonical">` match that page. Keep the shared `og-image.jpg`. Prefer one small helper (e.g. `lib/metadata.ts`, `pageMetadata({ path, title, description })`) over copy-pasting `openGraph` blocks into every page. The home page keeps its current title. Remove the `keywords` meta from `layout.tsx` (search engines ignore it).
2. **`LocalBusiness` JSON-LD** in `app/layout.tsx`, built from `getSite()`: `@type` `LocalBusiness`, name, description (the layout's), url (site URL), email, telephone, logo (absolute URL of `/ZB Logo Transparent.png`, URL-encoded), image (`/og-image.jpg`), `areaServed` (Sanpete County, Manti, Ephraim as `Place`/`City` names), `sameAs` from `site.social`. **No street address** (site.json has none; don't invent one). Render with a plain `<script type="application/ld+json">` server-side; escape `<` in the JSON.
3. **`Event` JSON-LD on `/workshops`** for each item from `getUpcomingWorkshops()` (the page is per-request, so past dates drop off). name = title, `startDate`/`endDate` as ISO with the correct America/Denver offset for that date (MST −07:00 / MDT −06:00 — compute it, don't hardcode), `eventAttendanceMode` offline, `eventStatus` scheduled, `location` = `Place` with the venue partner's name and a `PostalAddress` of `addressLocality` from the partner's `location` (e.g. Manti), `addressRegion` UT, `addressCountry` US. `offers`: `url` = registrationUrl when present, `availability` from `status`; omit `price` if it can't be parsed cleanly from `price` (it's a label like "$65 solo · $100 pair" — a `lowPrice`/`highPrice` AggregateOffer is fine if parsed robustly, else leave it out). `organizer` = Zion Bonsai with url. `image` = the workshops hero photo absolute URL. Nothing from outside content files.
4. **`/directions/concept`** should not be indexable: add `robots: { index: false }` to its metadata (it's deleted in task 42; robots.txt already disallows it).
5. **Sitemap** (`app/sitemap.ts`): confirm it lists every public page and no `/directions/`.

### Done when
- `npm run lint` and `npm run build` pass.
- On `npm run start`, `curl` each public route (`/`, `/workshops`, `/events`, `/our-story`, `/care-guide`, `/partners`, `/contact`, `/gallery`, `/shop`): unique `<title>`, description, `og:title`, `og:url` and canonical matching the route; `og:image` present. Paste a short table of the results in the final report.
- The JSON-LD blocks parse (`JSON.parse`) and the Event `startDate` for 2026-11-07 13:00 reads `2026-11-07T13:00:00-07:00`.
- Task 40 ticked in `STATUS.md`, with a one-line milestone note. Validating with Google's Rich Results Test is for Landon after deploy; mention it in the report.

## 41 — Accessibility, performance, mobile QA
- Each page at 375, 768, 1280: no horizontal scroll, tap targets ≥ 44px, text never under 16px for body.
- Keyboard-only walkthrough of every page; screen-reader landmarks and heading order (one h1 per page).
- Contrast spot-check of every text-over-photo spot.
- `prefers-reduced-motion`: emulate in dev tools, confirm nothing moves.
- Lighthouse (mobile) on Home and Workshops: Performance ≥ 90, Accessibility ≥ 95, SEO 100. Record scores in STATUS.md.
- Remove any `console.error` left in components for missing config — fail gracefully and silently in production.

## 42 — Cleanup
- Delete `app/directions/` and unused `components/directions/*`.
- Remove LEGACY color scales from `tailwind.config.ts` and fix any remaining usages (`grep -rn "charcoal\|olive\|cream\b\|coral-[0-9]\|sage-[0-9]" app components`).
- Remove unused components, icons and the `bg-linen` class if superseded.
- Decide with Landon whether to remove `public/gallery/` originals from the repo (they're 67 MB); don't delete without a note in `decisions.md`.
- Final `npm run build` + `npm run lint`; open PR `redesign` → `main`.
