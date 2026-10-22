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
| `paper` | `#FAF3E0` | page background |
| `paper-deep` | `#F3E9D2` | alternate section background |
| `linen` | `#FBF8F3` | text on dark/clay backgrounds, cards |
| `coral` | `#DD6F47` | logo coral. Fills, large display shapes, decorative only. **Never text on paper, never small text.** |
| `clay` | `#A84A2B` | primary buttons (with `linen` text, 5.4:1), text links, coral-toned text |
| `clay-dark` | `#8F3E23` | button hover |
| `sage` | `#97B953` | logo sage. Fills, botanical accents. **Never text.** |
| `moss` | `#4F6420` | sage-toned text, eyebrows, secondary links (6:1 on paper) |
| `forest` | `#2F3B22` | headings and body text (10.7:1) |
| `soil` | `#4A3426` | warm alternate text, footer background |

**Type**
- Headings: Montserrat 700 (600 for small labels). Body: Open Sans 400/600. Accent: Satisfy 400.
- Script (`.font-script`) is for taglines and pull quotes only, 1–2 lines, never body text, never buttons.

**Logo** — use the files in `public/` (`ZB Logo Transparent.png`, `ZB Logo Hero.png`). Never redraw, recolor or crop the logo.

## Look and feel

Sunlit potting shed: warm paper backgrounds with grain, organic/irregular shapes, generous whitespace, real photos, slow subtle motion. Read section 3 of the handoff before any visual work.

Never: three identical icon cards in a row, gradient heroes, pastel spa styling, emoji as icons, countdowns or scarcity banners, popups, bouncing/flashing animation, carousels that auto-advance faster than ~8s.

Motion: fades/rises under 600ms, triggered once on scroll. Everything must be static under `prefers-reduced-motion: reduce`.

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
