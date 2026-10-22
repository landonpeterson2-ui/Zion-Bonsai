# 26 — Gallery and Shop

**Phase:** 4 Pages · **Depends on:** 05, 20

## `/gallery` — past work
Most trees pictured have sold. Frame the page as "Trees we've shaped" — a portfolio, not inventory.
- Intro: every tree is shaped by hand, and most have found homes. Point people to a workshop to make their own, and to `/shop` when `shopEnabled`.
- Masonry-style or asymmetric layout in the chosen direction; real alt text from `getGallery()`; a small "Found a home" tag on `status: "sold"` items (subtle, not a red SOLD stamp).
- Lightbox: keep, but fix accessibility — `role="dialog"`, `aria-modal`, focus trapped and returned, Escape closes, arrow keys navigate, alt text on the enlarged image (currently "Gallery image"). Remove the `scale-110` hover zoom (too busy).
- Server-render the grid; only the lightbox is a client component (current page is entirely `'use client'`, and its metadata lives in `app/gallery/layout.tsx` only because of that — move metadata back into the page and delete the layout).

## `/shop` — trees for sale
- Keep the Shopify Buy Button integration, restyled to tokens (pass `clay` / `clay-dark` to the buy button styles instead of the old hex).
- Move product handles into `content/shop.json` (`{ "handles": [] }`) with zod schema.
- Remove the emoji stage cards. If useful, reuse the growth-stage visual from the Care Guide.
- Empty state (no handles): warm note that trees come and go, link to Instagram and the interest list. Never show "Add product handles…" dev text to visitors.
- Page renders regardless of `shopEnabled` (the flag only controls nav/sitemap), with `robots: noindex` when disabled.

## Done when
- Lightbox fully keyboard operable.
- Build and lint pass. Summary in STATUS.md.
