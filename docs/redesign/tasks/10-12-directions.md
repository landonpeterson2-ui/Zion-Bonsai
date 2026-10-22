# 10 / 11 / 12 — Three visual directions

**Phase:** 3 Visual direction · **Depends on:** 01–05 · **Run as three separate tasks** (10 = A, 11 = B, 12 = C). Each agent builds one direction only.

## Why
Landon & Cass want to react to real pages, not descriptions. Each direction is a Home hero + one content section, built as a preview route. They pick one (or a blend) at the checkpoint.

**Read first:** CLAUDE.md "Brand rules" and "Look and feel", plus decisions.md "Refined, not kid-ish", "Reference sites" and "Type and palette". Cass's one-line brief: *classic high-end interior design meets trees.* All three directions must feel **refined and organic, grown-up, never cute**. They differ in composition and mood, not in how playful they are. If something you're adding could appear on a children's craft-kit box, cut it.

## Shared requirements (all three)
- Route: `app/directions/<a|b|c>/page.tsx`, with `export const metadata = { robots: { index: false } }`. Uses the real Header/Footer.
- Content, identical across directions so only the design differs:
  1. **Hero:** the current season from `getSeason()` (eyebrow, headline, lede, photo), plus "Unplug. Create. Grow." somewhere. Primary CTA "Book a workshop" → `/workshops#dates`, secondary "Plan a private event" → `/events`. The unplugging idea must be front and center (see CLAUDE.md Voice). Use a featured photo from `getGallery()` if the season has no photo.
  2. **"What a workshop is, in one breath"** section: 3–4 short beats of what happens at the table:
     - the phone goes away
     - you pick your tree and Taya's handmade pot
     - Landon walks you through soil, roots and shaping
     - you leave with your own bonsai

     Then show the next upcoming workshop from `getUpcomingWorkshops()`, or a quiet "New dates soon. Join the list." fallback.
- Use only `featured` photos and finished-tree photos. **No photos where attendees' faces are identifiable.** Photo permission is unconfirmed (see STATUS.md).
- Components for a direction live in `components/directions/<a|b|c>/`. Don't modify shared `components/ui/` in ways that affect other directions.
- Must look intentional at 375px first, then 768px and 1280px.
- Fonts are fixed for all three: Cormorant display headlines, Montserrat labels and buttons, Open Sans body. The directions differ in **composition, rhythm and photo treatment**, not type or palette.
- Tokens only. `.btn-primary` / `.btn-secondary` as defined. Script at most once on the page. Respect reduced motion; use `Reveal` for gentle fades only.
- No three-identical-card rows. The "beats" must not be an icon-card grid.

## Direction A — "Studio" (task 10)
A ceramicist's studio: natural light, stone, clay and bark. Calm and tactile through material, not decoration.
- Palette leans warm-neutral: `paper` / `paper-deep` grounds, `soil` and `forest` text, a single `clay` accent.
- Hero: a large photo in a soft **arch-topped frame** (top corners fully rounded into an arch, square bottom). Place it on the right on desktop, full-width on mobile. Headline on the left in Cormorant, with an italic second line and a lot of air around it. A small uppercase tracked eyebrow sits above it, and the lede is a short paragraph in `soil`. The `clay` primary button is paired with a quiet text link for the secondary CTA.
- Beats: two columns on desktop. A tall tightly cropped detail photo (roots, soil, glaze) sits on one side, and on the other the beats run as short paragraphs. Each beat has a small `clay` numeral and a 1px `forest/15` rule between beats.
- Next workshop: a simple bordered block (1px `forest/20`, 3px radius) with the date set large in Montserrat, venue and time small, and one button.

## Direction B — "Field Journal" (task 11)
Quiet, editorial, lots of air: a well-made botanical book.
- Mostly `paper` and `linen`, thin `forest/15` rules, generous whitespace, a strong grid.
- Hero: one large photo bleeding off one side, with an asymmetric 7/5 split on desktop and the photo first on mobile. A small uppercase Montserrat eyebrow, and the headline in `forest`. Under the photo, a small caption set like a journal annotation (Open Sans italic or small caps). Use a true caption; don't name trees.
- Beats: a numbered list set like journal entries. Use refined numerals: Montserrat 600 in `clay`, sized modestly, not giant. Keep the text short, with one hairline between entries. Add a "growth stage" strip (Plantlet → Established) as small labeled tick marks along a 1px line.
- Next workshop: a quiet date block in a margin column.

## Direction C — "Seasonal Table" (task 12)
Immersive and photo-led, like walking up to the table.
- Hero: a full-bleed photo, at least 80vh on desktop and about 70vh on mobile. Put a soft `forest` gradient at the bottom only for text contrast, and verify AA on the actual photo. The headline and CTA sit over it in `linen`. A small season label ("Fall at the table") goes in tracked uppercase, not script.
- Below, a `paper-deep` band:
  - Mobile: the beats as a horizontal scroll-snap row.
  - Desktop: a 2×2 offset grid, each beat paired with a photo, with square corners or a 3px radius.
- Seasonal accent applied only to small details (a rule, a numeral), driven by `getSeason()`: fall = `clay`, winter = `moss`, spring = `moss`, summer = `clay`.
- Next workshop: a full-width strip with the date, venue and one button.

## Done when
- The direction route renders at 375 / 768 / 1280 with no horizontal scroll.
- Headline and lede contrast passes AA, including over photos.
- Nothing from the CLAUDE.md "Never" list appears (no squiggles, torn edges, tape, tilted photos, blobs, dashed paths, pills).
- Every image has accurate alt text from content.
- Build and lint pass. A short description of the direction is added to STATUS.md under the task.

## Checkpoint (after 10–12)
Stop. Landon & Cass compare `/directions/a`, `/b` and `/c`, and record the pick (and any blend notes) in `decisions.md`. Phase 4 doesn't start until that entry exists.
