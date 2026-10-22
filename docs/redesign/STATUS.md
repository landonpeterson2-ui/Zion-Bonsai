# Redesign status

Tick a task in the same commit that finishes it. Tasks within a phase can run in parallel only where noted.

## Phase 2 — Foundation
- [x] 00 Fix lint tooling
- [x] 01 Tokens, fonts, base styles — after 00
- [x] 02 Content files and loader — after 00 (parallel with 01)
- [x] 03 Header, footer, navigation — after 01 + 02
- [x] 04 Redirects, sitemap, robots — after 02
- [x] 05 Optimize and catalog photos — after 02

## Phase 3 — Visual direction
- [x] ~~10–12 three directions~~ — replaced by the home concept (`/directions/concept`), see decisions.md
- [x] **CHECKPOINT — Cass approved the concept direction (2026-10-21)**

## Phase 4 — Pages
- [x] 20 Home
- [ ] 21 Workshops — after 20
- [ ] 22 Events — after 20
- [ ] 23 Our Story — after 20
- [x] 24 Care Guide — after 20
- [ ] 25 Partners and Contact — after 20
- [ ] 26 Gallery and Shop — after 20
- [ ] **CHECKPOINT — Landon & Cass review all pages**

## Phase 5–6 — Content and polish
- [ ] 30 Copy pass
- [ ] 40 SEO and sharing
- [ ] 41 Accessibility, performance, mobile QA
- [ ] 42 Cleanup and PR

## Found while working
<!-- Out-of-scope issues agents notice. Format: - (task NN) description -->
- (task 00) types/shopify.d.ts: one lint warning (`import/no-anonymous-default-export`), left as is; revisit in task 26 (Shop).
- (task 01) Existing pages still use legacy classes (`bg-cream-light`, `text-charcoal`, `.card`, coral-on-paper text) that predate the contrast rules; replace as pages are rebuilt, final sweep in task 42.
- (task 01) `font-medium` (500) is used in a few places but Open Sans loads only 400/600; browser snaps to the nearest weight.
- (task 05) Confirm sold/workshop status: all 21 `public/gallery` trees are marked `sold` by default (none confirmed). Some may be unsold or Shop candidates, so Landon to confirm. `status` can be `available` in content/gallery.json.
- (task 05) Possible Cheesecake sightings, NOT labeled as such: `jade-dark-tray-wide-canopy.jpg` (orig gallery/15, thick gnarled trunk, dark tray) is the most established tree in the set; also the large tree in the blue pot on the table in `workshop-display-table-doorway.jpg` (IMG_6492) and `workshop-tables-set-for-class.jpg` (IMG_7454). Landon to confirm which, if any.
- (task 05) Privacy: 16 workshop photos show identifiable attendees' faces, including minors in IMG_6550 and IMG_6541. Confirm attendee permission before the photos go public. Alt text is generic, no names. `featured` is only on `workshop-hands-in-soil-round-table` and `workshop-finished-jade-thank-you-card` (no posed faces).
- (task 05) Landon & Cass portrait: `workshop-selfie-in-venue.jpg` (IMG_7456) and `workshop-instructor-holding-jade-roots.jpg` (_DSC7906) may be Landon/Cass; not labeled, Landon to confirm. Still no proper portrait.
- (task 05) Handoff wishlist shots still missing: Cheesecake (unconfirmed), clean hands-in-soil close-up (only the group shots IMG_6047/6048), Taya's pots close-up (handmade pots appear only small in workshop shots), Landon & Cass portrait, a phone face-down on the table.
- (task 05) app/layout.tsx still uses OG image `/gallery/1.jpeg` (tasks 03/40); originals in public/gallery can be deleted after that.
- (task 05) Hero and Gallery page now show only non-`workshop` items; workshop photos (19) are for the Workshops page (task 21). Gallery page lightbox still has legacy a11y issues (no focus trap, non-semantic buttons), for task 26.
- (task 05) Photo budget: public/photos is ~13 MB at q74 / 2000px. Adding more photos to photos-inbox needs an entry in scripts/photos-map.json and content/gallery.json.
- (task 04) confirm production domain: sitemap/robots fall back to https://zionbonsai.com (guessed from plants@zionbonsai.com) when NEXT_PUBLIC_APP_URL is unset.
- (task 04) Old links to /about, /gift, /workshops/series remain in Header, Footer, Hero and About (redirects cover them; update in tasks 03/20). /contact, /events, /partners do not exist yet, so /gift lands on a 404 until task 25.

- (task 03) HeaderNav renders `cart` (ShopifyCart) in both the desktop and mobile markup when `shopEnabled`, so two instances mount. Task 26 should check it when the shop goes live.

- (task 24) Care Guide kept ONE generic claim, for Landon to verify: "Give it a bright spot by a window" (light section). Everything else is from handoff section 5. Dropped from the old page: fixed watering schedules, dormant, temperatures, fertilizer, pruning, repotting, pests, emoji, PNG icons, stray zionbonsaiplants@gmail.com. Little Jade topics (propagation, wiring, defoliation) not added since no section 5 facts back them.
- (task 24) Care Guide placeholders: three middle growth-stage names ([STAGE NAME]) and [PHOTO - snapped jade leaf]. public/icons/*.png are now unused by the care page.

## Placeholders to fill
<!-- Filled by task 30. Format: - page: [PLACEHOLDER] -->

## Milestone notes
<!-- Short summaries / screenshots per task -->
- 00: Added eslint.config.mjs (flat config), lint script is now `eslint .`; unescaped-entity errors fixed mechanically; trimmed .env.example. Lint and build exit 0.
- 01: Brand tokens are RGB-channel CSS vars in globals.css, mapped in tailwind.config.ts; legacy coral/sage scales, olive, cream, charcoal kept under a LEGACY comment. Montserrat/Open Sans/Satisfy via next/font; focus ring, reduced-motion, .reveal and components/ui/Reveal.tsx added. Old `.bg-linen` class renamed `.bg-grain-legacy` (collided with the `linen` token); `.btn-outline` now aliases `.btn-secondary`.
- 02: Added content/*.json, content/README.md and lib/content.ts (zod, parsed at module load; getters for site, season, workshops, partners, gallery, faq). `eventsInquiryUrl` (null) added to site.json for task 22. Schemas live in lib/content-schemas.ts; `npm run build` first runs the `prebuild` script (scripts/check-content.mjs, plain Node type stripping, needs Node 22.18+), which validates every content file and exits 1 with a readable error naming the file and field. Tested with a bad date: build exit 1, then exit 0 after revert.
- 05: `npm run photos` (scripts/optimize-photos.mjs) turns public/gallery + photos-inbox into 40 named JPGs in public/photos (~13 MB); original -> name mapping in scripts/photos-map.json. content/gallery.json has specific alt text for all 40 (21 sold trees, 19 workshop), 6 featured. Hero and Gallery page read getGallery().
- 04: Permanent redirects in next.config.js (/workshops/:slug+ so /workshops does not loop), remotePatterns limited to cdn.shopify.com, sitemap/robots use lib/site-url.ts (fallback https://zionbonsai.com), robots disallows /directions/, app/about moved to app/our-story via git mv. Verified with next start: 308s for all three; sitemap has no localhost.
- 03: Header split into server Header.tsx (reads getSite) + client HeaderNav.tsx (menu state, aria-current squiggle). Menu open state is keyed to the pathname it opened on, so route changes close it without an effect. Footer reads getSite(); nav items/footer groups live in components/layout/nav.ts; skip link, main#main and global [id] scroll-margin-top added.
- 24: Care Guide rewritten: quiet text header, jump links, numbered two-column blocks, hairline growth-stage timeline (Cormorant labels, vertical on phones). Only handoff section 5 facts plus one flagged light claim; no primitive changes.
- 20: Home promoted from the concept. Primitives in components/ui: Eyebrow, TextLink, Photo, Section, SectionHeading, NextWorkshop (+ formatDate/formatTime), PhotoHero (soil-washed hero, reusable on inner pages); lib/photos.ts `getPhoto(name)` reads gallery.json. Home sections in components/home/; Testimonial is a dashed placeholder. Hero photo swaps via HERO_PHOTO in components/home/Hero.tsx. Old Hero/About/WorkshopPreview/ShopByStage deleted.
