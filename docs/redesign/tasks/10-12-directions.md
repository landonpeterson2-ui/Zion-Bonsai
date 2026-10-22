# 10 / 11 / 12 — Three visual directions

**Phase:** 3 Visual direction · **Depends on:** 01–05 · **Run as three separate tasks** (10 = A, 11 = B, 12 = C). Each agent builds one direction only.

## Why
Landon & Cass want to react to real pages, not descriptions. Each direction is a Home hero + one content section, built as a preview route. They pick one (or a blend) at the checkpoint.

## Shared requirements (all three)
- Route: `app/directions/<a|b|c>/page.tsx`, with `export const metadata = { robots: { index: false } }`. Uses the real Header/Footer.
- Content, identical across directions so only the design differs:
  1. **Hero:** the current season from `getSeason()` (eyebrow, headline, lede, photo), plus "Unplug. Create. Grow." somewhere, primary CTA "Book a workshop" → `/workshops#dates`, secondary "Plan a private event" → `/events`. The unplugging idea must be front and center (see CLAUDE.md Voice).
  2. **"What a workshop is, in one breath"** section: 3–4 short beats of what happens at the table (phone goes away → you pick your tree and Taya's pot → Landon walks you through soil, roots and shaping → you leave with your own bonsai), plus the next upcoming workshop from `getUpcomingWorkshops()` (or a friendly "new dates soon — join the list" fallback).
- Components for a direction live in `components/directions/<a|b|c>/`. Don't modify shared `components/ui/` in ways that affect other directions.
- Must look intentional at 375px first, then 768px and 1280px.
- Use only tokens and fonts from task 01. Respect reduced motion. Real photos from `content/gallery.json` only.
- No three-identical-card rows. The "beats" must not be an icon-card grid.

## Direction A — "Potting Shed" (task 10)
Warm, tactile, handmade.
- Background `paper` with visible grain; sections separated by torn-paper SVG edges.
- Hero: photo in an irregular organic mask (`rounded-organic` or an SVG blob clipPath), slightly rotated (−2°), with a paper "tape" strip on a corner. Headline left, large Montserrat; a short Satisfy note in `clay` near the photo like a handwritten margin note ("phone stays in the bag").
- Beats: a vertical, slightly meandering path (dashed SVG line in `sage`) connecting numbered steps written like a note card. Small photo cutouts beside steps 2 and 4.
- Next workshop: styled as a kraft-paper tag/ticket.

## Direction B — "Field Journal" (task 11)
Quiet, editorial, lots of air.
- Mostly `paper` and `linen`; thin `forest/15` rules; generous whitespace.
- Hero: one large photo bleeding off one side (asymmetric 7/5 split on desktop, photo first on mobile), small uppercase Montserrat eyebrow, headline in `forest`, and a handwritten caption under the photo like a journal annotation ("Cheesecake, our oldest tree" if the photo isn't Cheesecake, use a true caption).
- Beats: a numbered list set like journal entries — large `coral` numerals (decorative, large display is OK), short text, one hairline between each. A "growth stage" strip (Plantlet → established) as small labeled marks along a line.
- Next workshop: a quiet date block in a margin column.

## Direction C — "Seasonal Table" (task 12)
Immersive, photo-led, seasonal.
- Hero: full-bleed photo (≥ 80vh on desktop, ~70vh mobile) with a soft `forest` gradient at the bottom for text contrast (verify AA on the actual photo), headline and CTA over it in `linen`. A season tag ("Fall at the table") in script.
- Below: a band in `paper-deep` with the beats as a horizontal scroll-snap row on mobile, a 2×2 offset grid on desktop, each beat paired with a photo.
- A seasonal accent color per season (fall = `clay`, winter = `moss`, spring = `sage`, summer = `coral`) applied to small details only, driven by `getSeason()`.
- Next workshop: a full-width strip with date, venue and one button.

## Done when
- The direction route renders at 375 / 768 / 1280 with no horizontal scroll.
- Headline + lede contrast passes AA (check over photos).
- Lighthouse accessibility ≥ 95 on the route (run `npx lighthouse` against the dev server if available, else note manual checks).
- Screenshots or a short description added to STATUS.md under the task.
- Build and lint pass.

## Checkpoint (after 10–12)
Stop. Landon & Cass compare `/directions/a`, `/b`, `/c` and record the pick (and any blend notes) in `decisions.md`. Phase 4 doesn't start until that entry exists.
