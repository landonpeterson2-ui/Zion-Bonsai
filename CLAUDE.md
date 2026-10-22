# Zion Bonsai website

Marketing site for Zion Bonsai: beginner bonsai workshops in Sanpete County, Central Utah (Manti / Ephraim), run by Landon and Cass.

The site is mid-redesign on the `redesign` branch. The brief is [docs/redesign/handoff.md](docs/redesign/handoff.md); decisions made since are in [docs/redesign/decisions.md](docs/redesign/decisions.md); work is split into task files under [docs/redesign/tasks/](docs/redesign/tasks/), tracked in [docs/redesign/STATUS.md](docs/redesign/STATUS.md). If a task file and the handoff disagree, `decisions.md` wins, then the task file, then the handoff.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 3. Deployed on Vercel from `main`.
- Do not add UI or animation libraries (no framer-motion, no component kits). CSS transitions and a small IntersectionObserver hook are enough.
- `zod` is available for validating content files.
- Server components by default. Add `'use client'` only for real interactivity (menu toggle, lightbox).

## Commands

- `npm run dev` — dev server (port 3000, or 3001 if taken)
- `npm run build` — must pass before every commit
- `npm run lint` — must pass before every commit (fixed by task 00)
- `npx tsc --noEmit` — quick typecheck

## Where things live

- `app/` — routes. One folder per page.
- `components/layout/` — Header, Footer. `components/ui/` — small shared pieces (Button, Section, PhotoFrame, etc.). `components/<page>/` — page-specific sections.
- `content/*.json` — everything Landon and Cass edit without touching layout: workshops, site info, partners, gallery, seasonal hero. Loaded and validated through `lib/content.ts`. Never hardcode dates, prices, links, emails or phone numbers in components.
- `public/photos/` — optimized photos (task 05). `public/gallery/` holds the 4032px originals; don't reference them directly once task 05 lands.

## Brand rules (do not change)

**Colors** — only use tokens, never raw hex in components. Defined once as CSS variables in `app/globals.css`, mapped in `tailwind.config.ts`.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4EEE6` | "Stone" — page background |
| `paper-deep` | `#E9DFD2` | "Stone deep" — alternate section background. `clay` text here only ≥24px (4.3:1) |
| `sandstone` | `#D9AE93` | pale Zion sandstone. Fills, image mats, accents only; `forest`/`soil` text on it. **Never text.** |
| `linen` | `#FBF8F3` | text on dark/clay backgrounds, cards |
| `coral` | `#DD6F47` | logo coral. Fills, large display shapes, decorative only. **Never text on paper, never small text.** |
| `clay` | `#A84A2B` | primary buttons (with `linen` text, 5.4:1), text links and small labels **on `paper` only** (4.95:1) |
| `clay-dark` | `#8F3E23` | button hover |
| `sage` | `#97B953` | logo sage. Fills, botanical accents. **Never text.** |
| `moss` | `#4F6420` | sage-toned text, eyebrows, secondary links (5.7:1 on paper) |
| `forest` | `#2F3B22` | headings and body text (10.3:1) |
| `soil` | `#4A3426` | warm alternate text, footer background |

**Type** (changed 2026-10-21 — Cass chose Option A; see decisions.md)
- **Display: Cormorant Garamond 500 (600 sparingly), with its italic** — `font-display`. h1–h3 use it by default. Sentence case. Only at ≥24px; it's too delicate below that. An italic second line ("*Pick up a tree.*") is the signature move — use it for emphasis instead of color or weight.
- **Labels: Montserrat 600** — `font-label`. Nav, buttons, eyebrows, small uppercase labels with wide tracking (0.14–0.22em), h4. Never for big headlines. It echoes the bold "ZION" in the logo.
- **Body: Open Sans 400/600** — `font-sans`.
- **Accent: Satisfy** — `font-script`. At most once per page, small, signature-like ("Come grow with us."). Never body text or buttons.

**Logo** — use the files in `public/` (`ZB Logo Transparent.png`, `ZB Logo Hero.png`). Never redraw, recolor or crop the logo.

## Look and feel

**Refined and organic — grown-up, never cute.** Cass's brief: **classic high-end interior design meets trees.** Think a ceramicist's studio, a botanical journal, a quiet design showroom: calm, restrained, made by hand by adults who take the craft seriously but aren't precious about it. Read section 3 of the handoff before any visual work, and read the 2026-10-21 "Refined, not kid-ish" entry in `decisions.md`.

"Organic" comes from **real materials and composition**, not from cartoon shapes:
- Photography does the heavy lifting: soil, roots, bark, glaze, hands, natural light. Let photos run large with generous margins.
- Asymmetric, editorial layouts; quiet alignment; lots of whitespace.
- Fine details: 1px rules in `forest/15`, small uppercase Montserrat labels with wide tracking, restrained numerals.
- Gentle natural geometry is fine when used sparingly: a soft arch-topped image frame, a single subtle radius. One per page section at most.
- Paper grain at a whisper.
- Color is mostly paper, linen, forest and soil. Clay and coral are accents — a button, a thin rule, one numeral — never large playful fills.

Type is restrained: Cormorant display headlines with generous size and air; small tracked Montserrat labels; Open Sans body at a comfortable 1.65 line height and ~65ch measure.

Buttons are small-radius (3px) with uppercase tracked labels, not pills. Icons are thin-line (1.5px stroke) or absent.

Never: squiggles, wavy/torn-paper edges, tape strips, stickers, blob masks, tilted/rotated photos, polaroid frames, doodles, bouncy pills, emoji, bright saturated fills, dashed "path" illustrations, three identical icon cards in a row, gradient heroes, pastel spa styling, countdowns or scarcity banners, popups, bouncing/flashing animation, carousels that auto-advance faster than ~8s.

Motion: fades/rises under 600ms, triggered once on scroll. Everything must be static under `prefers-reduced-motion: reduce`.

## Building pages (Phase 4 onward)

The approved look is the home page (`app/page.tsx` + `components/home/`), originally `app/directions/concept/page.tsx`. Every page should feel like it belongs next to it. Where an older task file says "the chosen direction", read it as this.

- Build pages from `components/ui/`: `PhotoHero` (soil-washed photo hero, one per page, linen text), `Section` (vertical rhythm, `paper` / `paper-deep`), `SectionHeading` (eyebrow + Cormorant h2), `Eyebrow`, `TextLink`, `Photo` (plain rectangle + optional caption), `NextWorkshop`. Extend a primitive with a prop rather than forking it; don't restyle it for one page.
- Photos and alt text come from `content/gallery.json` via `getPhoto(name)` in `lib/photos.ts`.
- Page rhythm: alternate `paper` and `paper-deep` sections, and use at most one dark soil-washed band besides the hero. Use two-column, photo + text layouts with asymmetric columns (5/7 or 6/6). Use numbered lists with hairlines instead of card grids.
- Inner page heroes can use `PhotoHero` with that page's best photo, or a quieter text-only header on `paper` (eyebrow + h1 + one line). Don't put a full-bleed hero on every page. Workshops and Events get `PhotoHero`; Care Guide, Partners and Contact get the quiet header.

## Voice

Warm, conversational, beginner-first. A friend inviting you over, not a business converting a lead. Short and punchy; edit hard.

**Unplugging is the hook — lead with it.** It's the idea attendees respond to most: put the phone down and be with your tree. Every page should carry it, and the home hero and workshop pages should lead with it. Say it plainly and with a little warmth and wit — gentle, a bit wry, never preachy, never crude, never guilt-trippy about screens. Good: "Two hours. No notifications. Just you, some soil, and a tree that's going to be yours." Bad: "Escape the digital noise on your self-care journey." Express it through imagery too (hands, soil, a phone face-down on the table), not spa clichés ("find your zen", lotus imagery).

Taglines — use exactly as written:
- Mission: *Zion Bonsai cultivates stillness, curiosity, and connection — one tree at a time.*
- Short tagline: *Dirt. Creativity. Connection.*
- CTA phrase: *Unplug. Create. Grow.*
- Sign-off: *Come grow with us.*

Hard rules:
- **Tools are used during the workshop and available for purchase. They are NOT included to take home.** Never imply otherwise.
- No business mechanics (margins, costs, target demographics like "ages 25-45").
- Never invent testimonials, quotes, attendee counts or reviews. Use visible placeholders like `[TESTIMONIAL — from a real attendee]`.
- Care facts come only from section 5 of the handoff.

## Booking flow (do not change)

Register via Google Form first; the payment link (Square, Venmo, etc.) is given after contact info is collected. The site links to the Google Form only — it never shows payment links directly. See `content/workshops.json`.

## Accessibility and performance

- WCAG AA contrast (use the token table above), semantic landmarks and heading order, alt text on every image describing what is actually in it, keyboard-navigable, visible `:focus-visible` rings, 44px minimum tap targets.
- Mobile-first: build and check at 375px, then enhance with `md:`/`lg:`.
- `next/image` for every photo with correct `sizes`; `priority` only on the above-the-fold image.

## Working rules

- Work on the `redesign` branch. One task = one or a few small commits. Commit message: imperative summary line, then a blank line, then the co-author trailer the session gives you.
- Stay inside your task's scope. If you find something out of scope, add it to the "Found while working" list in `docs/redesign/STATUS.md` instead of fixing it.
- When a task is done, tick it in `STATUS.md` in the same commit.
- Placeholders: if a real photo, link or fact is missing, use a clearly labeled placeholder (`[PHOTO — Cheesecake on the workshop table]`, `[LINK — Sweet Roots site]`), never stock imagery or made-up content.
