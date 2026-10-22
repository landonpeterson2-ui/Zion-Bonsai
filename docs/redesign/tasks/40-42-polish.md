# 40 / 41 / 42 — Polish

**Phase:** 6 · Run as three tasks.

## 40 — SEO and sharing
- `LocalBusiness` JSON-LD in `app/layout.tsx`: name, description, email, phone, `areaServed` (Sanpete County, Manti, Ephraim, Spanish Fork–Richfield corridor), `sameAs` socials, logo, url. Built from `getSite()`. No street address unless in `site.json`.
- `Event` JSON-LD on `/workshops` for each upcoming workshop (name, startDate with America/Denver offset, location from partner, `offers.url` = registrationUrl when present).
- Default share image: `app/opengraph-image.tsx` at 1200×630 using `next/og` — a featured photo with the logo and "Unplug. Create. Grow." Replace the square `/gallery/1.jpeg` OG image in `layout.tsx`. Per-page titles/descriptions reviewed against local terms.
- Verify with `curl` on the built output that each page has unique `<title>`, description, og:image.

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
