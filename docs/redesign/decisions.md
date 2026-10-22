# Redesign decisions

Answers from Landon & Cass and choices made during planning. This file overrides the handoff and task files where they conflict. Append new decisions at the bottom with a date.

## 2026-10-21 — Planning

**Booking flow.** Registration is a Google Form; payment is a Square / Venmo / other link sent after the form. The site links only to the Google Form. Shopify is *not* used for workshop booking — remove the Shopify buy button from the Workshops page.
- Assumption (confirm with Landon): payment links are shown in the Google Form's confirmation message, so the site never needs them.

**Offerings.** "One-Time Workshops / Workshop Series / Private Sessions" are retired. The offerings are:
1. **Intro workshop** — public, beginner, leave with a jade bonsai in a handmade Taya's Clay Creations pot. Usually at Sweet Roots, Manti.
2. **Return shaping session** — for past attendees, 6–9 months after their workshop, to shape and train their tree.
3. **Private & corporate events** (new `/events` page): corporate wellness and retreats (first was a Snow College HR retreat), private parties, school programs, private one-on-one or small-group tutoring, pop-ups (e.g. Sanpete Harvest Market).

**Shop and Gallery stay separate pages.**
- Gallery = past work. Most trees shown have been sold; frame it as "trees we've shaped" and mark sold pieces, not as inventory.
- Shop = trees currently for sale, via Shopify Buy Button (existing integration). Hidden from nav until `shopEnabled` is true in `content/site.json`.

**Sweet Roots.** Their website is under development. Store its URL in `content/partners.json` as `null` for now; components render the link only when a URL is present.

**Wellness / unplugging is the lead message.** Landon: people respond really well to the "get off your phone and be with your tree" idea — not in those words, but that idea. Lead with it on Home and Workshops; carry it everywhere else (see CLAUDE.md "Voice"). Plain, warm, a little wry; never preachy or spa-like.

**Workshop length** is two hours (from Landon's pre-redesign hero copy: "Just two hours where you disconnect from screens"). OK to state in copy.

**Brand colors** were sampled from the logo files: coral `#DD6F47`, sage `#97B953`. These replace the handoff's approximations (`#E76F51`, `#9DAD7F`). Text and button colors were picked to pass WCAG AA; see the token table in CLAUDE.md.

**Routes.**
| Route | Page |
|---|---|
| `/` | Home |
| `/workshops` | Intro workshops + return shaping sessions, dates, FAQ |
| `/events` | Private & corporate events (new) |
| `/our-story` | Our Story (replaces `/about`, which redirects) |
| `/care-guide` | Care Guide |
| `/gallery` | Past work |
| `/shop` | Trees for sale (gated by `shopEnabled`) |
| `/partners` | Partners (new) |
| `/contact` | Contact, gift certificates, interest list (new) |

Redirects: `/about` → `/our-story`; `/workshops/*` → `/workshops`; `/gift` → `/contact#gift`.

**Visual direction.** Not chosen yet. Tasks 10–12 build three options; Landon & Cass pick at the Phase 3 checkpoint and record the choice here. Phase 4 tasks must follow the recorded choice.

## 2026-10-21 — Refined, not kid-ish

Landon, after seeing the new header/footer: "It needs to feel less kid-ish and more refined and organic."
- Removed from the shell: coral squiggle under the active nav link (now a 1px clay rule), wavy torn footer edge, pill buttons (now 3px radius, uppercase tracked labels), two script lines in the footer (now one).
- "Organic" = natural materials, photography, asymmetry, fine detail. Not hand-drawn/craft-fair motifs. See CLAUDE.md "Look and feel" for the do/don't list; it overrides handoff section 3's "hand-drawn-feeling dividers" and "imperfect circles" suggestions.
- Direction A "Potting Shed" (torn paper, tape, tilted photos, dashed path) is replaced by "Studio" in tasks 10–12.

## 2026-10-21 — Reference sites (from Cass)

Builders can't browse, so these notes are the reference. Capture the *feel*; never copy layouts, copy text, or assets.

**Bergs Potter (bergspotter.com)** — Danish terracotta pot maker since 1942. Cass likes: minimalism, earthy tones, classy type, "storytelling meets craftsmanship."
- Lifestyle photography: pots and plants on wooden tables in sunlit rooms, process shots of clay being shaped by hand.
- Alternating editorial blocks: image → short heading → 2–3 sentence paragraph → plain text link ("Explore collections"). Buttons often just text links.
- Sentence-case headings; small uppercase labels for utility items.
- Story copy that treats irregularity as proof of craft: "The small variations left behind are part of the craft – and part of what makes each pot its own." That's our wabi-sabi idea, said plainly. Their headline voice is short and warm ("Pots your plants love").
- Journal series profiling makers/homes — a model for a future "From the table" story section.

**Magnolia (magnolia.com)** — Cass likes: warm tones, classic, cozy.
- Type pairing: **Minion** (classic book serif) for display + **Brandon Grotesque** (geometric sans) for UI/labels. Classic serif + clean geometric sans is the "classier" feel.
- Mostly neutral ground (warm white, near-black #1C1C1C, greys) with one warm accent (a muted gold, #EABC63). Warmth comes from photography and a restrained palette, not from colored backgrounds.
- Friendly, conversational, personal copy ("Jo's Picks", "Home Team").

**Zion National Park — ambiance and palette.** Iron-stained Navajo sandstone: deep red base, red-brown lower cliffs, white/buff/grey upper cliffs; pine green; desert sky. Colors glow in low reflected light. Reference palette (eggradients "Zion Colors"): terracotta #C26142, pine #3A5E43, gold #D99B3B, sandy clay #D9AE93, sky #87BCD9. Our `clay` (#A84A2B), `forest` (#2F3B22) and `coral` already sit in this family; the gap is a **pale sandstone/buff neutral** and a warmer, less yellow paper.

**Little Jade Bonsai (littlejadebonsai.com)** — content reference only. Cass dislikes the logo; likes the depth of information about *Portulacaria afra* as bonsai and the "new version of an old art form" angle.
- Topics worth covering in our voice (Care Guide / future journal): why dwarf jade suits bonsai (forgiving, takes most styles, indoor-friendly), a growth timeline from cutting to established tree, propagating from cuttings, soil, trimming for branching, wiring, defoliation.
- Our care facts still come only from handoff section 5 (their watering advice differs — ignore it).
- Frame: bonsai has a thousand-year history; we're a modern, beginner-first, succulent take on it. Respect the tradition, skip the gatekeeping.

## 2026-10-21 — Type and palette (Cass)

Cass's summary of the feel: **"classic high-end interior design meets trees."** Additional references: McGee & Co (Sainte Colombe serif display, warm cream, rust-brown, olive) and Sunriver Gardens (Lora serif). Every reference uses a classic serif for display.

Compared four headline fonts on a rendered sample (same copy, photos, palette). **Cass picked Option A: Cormorant Garamond.** This overrides handoff section 4's "Headlines: Montserrat Bold."
- Display headlines: Cormorant Garamond 500 + italic (`font-display`).
- Montserrat 600 moves to labels, nav and buttons (`font-label`, renamed from `font-heading`).
- Open Sans body and Satisfy accent unchanged.

**Palette:** Cass likes the "Zion stone" palette, especially Stone and Stone deep. `paper` is now #F4EEE6 (Stone, was a yellower #FAF3E0), `paper-deep` is #E9DFD2 (Stone deep), and there's a new `sandstone` (#D9AE93) fill. Logo coral and sage are unchanged. Contrast was rechecked; see the CLAUDE.md table.

## Open items (from Landon & Cass)
- [ ] Google Form URL(s) for registration
- [ ] Upcoming workshop dates and prices
- [ ] Gift certificates: online purchase or by inquiry?
- [ ] Sweet Roots site URL when live
- [ ] Cass's workshop photos → drop into `photos-inbox/workshop/` (any format; full-size is fine). Featured on the Workshops page.
- [ ] Real photos still needed: Cheesecake, hands in soil, Taya's pots, workshop tables
- [ ] 2–3 real testimonials (with permission)
- [ ] Interest list: Google Form, or something else?
