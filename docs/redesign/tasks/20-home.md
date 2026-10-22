# 20 — Home page (promote the approved concept)

**Phase:** 4 Pages · **Depends on:** Phase 3 checkpoint (done: the concept was approved 2026-10-21)

## Why
Cass approved `app/directions/concept/page.tsx` as the direction (see decisions.md "Home concept approved"). The live home page (`app/page.tsx`) is still the old design: tan gradient, olive block, a 21-image carousel, and three identical cards. This task makes the concept the real home page and extracts reusable pieces for every later page.

## Do
1. **Extract shared UI primitives** into `components/ui/`. Later tasks (21–26) build every page from these, so keep the APIs small and obvious:
   - `Eyebrow`: the small tracked Montserrat label. Props: `tone` (`clay` | `moss` | `linen`). Note: `clay` only on `paper`, never on `paper-deep` (contrast; see CLAUDE.md).
   - `TextLink`: the uppercase underlined text link.
   - `Photo`: a `next/image` fill wrapper with an aspect-ratio class and an optional italic caption below.
   - `Section`: a vertical-rhythm wrapper (`py-20 md:py-28`), with a `tone` prop (`paper` | `paper-deep`) and an optional `bordered` prop.
   - `SectionHeading`: eyebrow + Cormorant h2 at the concept's sizes, with optional italic emphasis passed as children.
   - `NextWorkshop`: the bordered next-date block, including the date/time formatting helpers. Task 21 reuses these.

   Keep `.btn-primary` / `.btn-secondary` as they are.
2. **Home sections** go in `components/home/`, one file each, ported from the concept with the same look and copy:
   - Hero
   - Statement
   - TheWorkshop
   - WhoYoullLearnFrom
   - TreesWeveShaped
   - Groups
   - Close
3. **Add one section** that the concept doesn't have yet: a testimonial slot between Groups and Close. It's one quiet centered pull quote in Cormorant italic with `[TESTIMONIAL — from a real attendee]` and `[NAME, TOWN]`. Mark it visibly as a placeholder with a 1px dashed `forest/30` border and a small "Placeholder" label, so nobody mistakes it for a real quote.
4. **`app/page.tsx`** composes those sections. Give it page metadata:
   - title: "Zion Bonsai | Beginner Bonsai Workshops in Manti, Utah"
   - description: one sentence covering screen-free, beginner, Sanpete County, and taking home a jade bonsai in a handmade pot
5. **Use data, not hardcoded copies.** Photos and alt text come from `getGallery()` by `src` where practical (the Cheesecake hero, featured trees). The next workshop comes from `getUpcomingWorkshops()`. Contact info comes from `getSite()` if needed.
6. **Delete the old home components** once nothing imports them: `components/home/Hero.tsx` (the carousel, plus its eslint-disable), `About.tsx`, `WorkshopPreview.tsx`, `ShopByStage.tsx`, and the `.bg-grain-legacy` usage in `app/page.tsx`. Leave `app/directions/concept/` in place; task 42 removes it.
7. Remove the two STATUS.md "Found while working" items this resolves: the Hero eslint-disable, and the old `/gallery/*.jpeg` paths in About and WorkshopPreview.

## Must match the concept
Same copy, same spacing scale, same type sizes, same photo choices and crops, and the same Cheesecake caption ("He comes to every workshop."). Don't redesign. If something in the concept breaks a CLAUDE.md rule, fix only that and note it.

## Done when
- `/` looks like `/directions/concept` plus the testimonial placeholder. Compare screenshots of both routes at 375 and 1280 and describe any differences in your report.
- Exactly one image has `priority` (the hero).
- No imports remain of the deleted components. No "Series" or "Private Sessions" text anywhere on `/`.
- Build and lint pass, and the lint warning count doesn't go up.
- STATUS.md: task ticked, milestone note added, and the primitive names listed in the milestone note so later builders know they exist.
