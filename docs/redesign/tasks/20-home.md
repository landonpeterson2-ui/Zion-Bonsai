# 20 — Home page

**Phase:** 4 Pages · **Depends on:** Phase 3 checkpoint (direction recorded in `decisions.md`)

## Before you start
Read the chosen direction in `decisions.md`. Promote the chosen direction's components from `components/directions/<x>/` into `components/home/` or `components/ui/` (move, don't copy). Leave the other directions' routes alone; task 42 deletes them.

## Sections, in order
1. **Hero** — from the chosen direction, seasonal (`getSeason()`). Leads with unplugging. CTAs: "Book a workshop" (primary) → `/workshops#dates`, "Plan a private event" → `/events`. No auto-advancing carousel; one photo (replaces the 21-image 4s rotation in the current `Hero.tsx`).
2. **What a workshop is** — from the direction, plus next upcoming workshop.
3. **What you take home** — your own jade bonsai in a handmade pot by Taya's Clay Creations (link via `getPartner('tayas-clay')`). One line making the tool policy clear is *not* needed here; save it for the FAQ.
4. **Meet Cheesecake** — short, charming intro to our oldest tree as the workshop's mascot/anchor; links to `/our-story#cheesecake`. Photo placeholder `[PHOTO — Cheesecake]` until a real one exists.
5. **A glimpse** — 4–6 `featured` photos from `getGallery()`, laid out asymmetrically (not a uniform grid), link to `/gallery`.
6. **Bring it to your team / group** — one short band for corporate wellness, private parties, schools, tutoring → `/events`.
7. **Testimonial** — one slot: `[TESTIMONIAL — from a real attendee]` with `[NAME, TOWN]`. Visible placeholder styling (dashed border) so it's obviously unfinished.
8. **Closing invitation** — "Come grow with us." in script + Book button + Instagram follow link.

Remove `components/home/ShopByStage.tsx` and the old `About.tsx` / `WorkshopPreview.tsx` if no longer used.

## Done when
- Every section works at 375px; the Book button is visible within the first screen on mobile.
- Only one image has `priority`.
- No reference to "Series" or "Private Sessions" workshop types remains.
- Build and lint pass. Add a 2–3 line summary of what changed to STATUS.md.
