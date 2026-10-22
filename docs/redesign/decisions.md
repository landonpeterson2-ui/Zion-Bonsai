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

## Open items (from Landon & Cass)
- [ ] Google Form URL(s) for registration
- [ ] Upcoming workshop dates and prices
- [ ] Gift certificates: online purchase or by inquiry?
- [ ] Sweet Roots site URL when live
- [ ] Cass's workshop photos → drop into `photos-inbox/workshop/` (any format; full-size is fine). Featured on the Workshops page.
- [ ] Real photos still needed: Cheesecake, hands in soil, Taya's pots, workshop tables
- [ ] 2–3 real testimonials (with permission)
- [ ] Interest list: Google Form, or something else?
