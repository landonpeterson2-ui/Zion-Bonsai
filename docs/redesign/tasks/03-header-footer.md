# 03 — Header, footer, navigation

**Phase:** 2 Foundation · **Depends on:** 01, 02

## Why
Mobile menu has no label/aria state, footer links 404 (`/workshops/one-time`, `/series`, `/private`), the Shopify cart sits in the header though nothing's for sale, and there's no persistent booking path.

## Do
### Header (`components/layout/Header.tsx`)
- Background `paper` (with grain from body), thin bottom border `forest/10`. Not sage.
- Logo left (`ZB Logo Transparent.png`, ~48px tall mobile, 56px desktop, `priority`).
- Desktop nav (≥ `lg`): Workshops · Events · Gallery · Shop (only if `shopEnabled`) · Our Story · Care Guide, then a `.btn-primary` "Book a workshop" → `/workshops#dates`.
- Mobile: logo, a compact "Book" button, and a menu button with `aria-label="Open menu"`, `aria-expanded`, `aria-controls`. Menu opens as a full-height panel on `paper`, links in Montserrat at a comfortable 1.25rem with 44px+ targets, Escape closes it, focus moves into the panel and returns to the button on close, body scroll locked while open, closes on route change.
- Current page link gets `aria-current="page"` and a hand-drawn-feeling underline (SVG squiggle or uneven border) in `coral`.
- ShopifyCart renders only when `shopEnabled`.
- Header can be sticky but must stay short (≤ 72px) and must not cover anchor targets (add `scroll-margin-top` to sections).

### Footer (`components/layout/Footer.tsx`)
- Background `soil`, text `linen`. Top edge: an irregular wavy/torn SVG edge instead of a straight line.
- Columns (stack on mobile): brand (logo + "Dirt. Creativity. Connection." in `font-script`), Visit (Workshops, Events, Gallery, Care Guide), About (Our Story, Partners, Contact), Connect (email, phone, Instagram, Facebook — from `getSite()`).
- Sign-off line: "Come grow with us." in script.
- Bottom row: © year · "Sanpete County, Central Utah".
- All links must point to routes in `decisions.md` "Routes". Pages not yet built will 404 until Phase 4 — that's acceptable; the redirects task (04) covers old URLs.

### Shared
- Nav items defined once in `components/layout/nav.ts` and used by both.
- Add a skip link ("Skip to content") as the first focusable element in `app/layout.tsx`, targeting `<main id="main">`.

## Done when
- At 375px: logo, Book button and menu button fit on one row without overlap.
- Keyboard: Tab reaches skip link first; menu fully operable with keyboard; Escape closes it.
- No footer link points to `/workshops/one-time|series|private` or `/gift`.
- Build and lint pass.
