# Redesign status

Tick a task in the same commit that finishes it. Tasks within a phase can run in parallel only where noted.

## Phase 2 — Foundation
- [x] 00 Fix lint tooling
- [x] 01 Tokens, fonts, base styles — after 00
- [ ] 02 Content files and loader — after 00 (parallel with 01)
- [ ] 03 Header, footer, navigation — after 01 + 02
- [ ] 04 Redirects, sitemap, robots — after 02
- [ ] 05 Optimize and catalog photos — after 02

## Phase 3 — Visual direction
- [ ] 10 Direction A: Potting Shed — after Phase 2
- [ ] 11 Direction B: Field Journal — after Phase 2 (parallel with 10, 12)
- [ ] 12 Direction C: Seasonal Table — after Phase 2 (parallel with 10, 11)
- [ ] **CHECKPOINT — Landon & Cass pick a direction; record it in decisions.md**

## Phase 4 — Pages
- [ ] 20 Home
- [ ] 21 Workshops — after 20
- [ ] 22 Events — after 20
- [ ] 23 Our Story — after 20
- [ ] 24 Care Guide — after 20
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
- (task 00) components/home/Hero.tsx: `react-hooks/set-state-in-effect` disabled on one line; remove when Hero is rebuilt (task 20).
- (task 00) types/shopify.d.ts: one lint warning (`import/no-anonymous-default-export`), left as is; revisit in task 26 (Shop).
- (task 01) Existing pages still use legacy classes (`bg-cream-light`, `text-charcoal`, `.card`, coral-on-paper text) that predate the contrast rules; replace as pages are rebuilt, final sweep in task 42.
- (task 01) `font-medium` (500) is used in a few places but Open Sans loads only 400/600; browser snaps to the nearest weight.

## Placeholders to fill
<!-- Filled by task 30. Format: - page: [PLACEHOLDER] -->

## Milestone notes
<!-- Short summaries / screenshots per task -->
- 00: Added eslint.config.mjs (flat config), lint script is now `eslint .`; unescaped-entity errors fixed mechanically; trimmed .env.example. Lint and build exit 0.
- 01: Brand tokens are RGB-channel CSS vars in globals.css, mapped in tailwind.config.ts; legacy coral/sage scales, olive, cream, charcoal kept under a LEGACY comment. Montserrat/Open Sans/Satisfy via next/font; focus ring, reduced-motion, .reveal and components/ui/Reveal.tsx added. Old `.bg-linen` class renamed `.bg-grain-legacy` (collided with the `linen` token); `.btn-outline` now aliases `.btn-secondary`.
