# Redesign status

Tick a task in the same commit that finishes it. Tasks within a phase can run in parallel only where noted.

## Phase 2 — Foundation
- [x] 00 Fix lint tooling
- [ ] 01 Tokens, fonts, base styles — after 00
- [x] 02 Content files and loader — after 00 (parallel with 01)
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

## Placeholders to fill
<!-- Filled by task 30. Format: - page: [PLACEHOLDER] -->

## Milestone notes
<!-- Short summaries / screenshots per task -->
- 00: Added eslint.config.mjs (flat config), lint script is now `eslint .`; unescaped-entity errors fixed mechanically; trimmed .env.example. Lint and build exit 0.
- 02: Added content/*.json, content/README.md and lib/content.ts (zod, parsed at module load; getters for site, season, workshops, partners, gallery, faq). `eventsInquiryUrl` (null) added to site.json for task 22. A deliberately bad date failed the build with a readable error naming the file and field. The loader is only checked at build once a page imports it (Phase 4).
