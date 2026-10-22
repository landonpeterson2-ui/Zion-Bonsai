# Zion Bonsai — Website Redesign Handoff

**For:** Claude Code
**From:** Landon & Cass, co-founders of Zion Bonsai
**Date:** October 2026

---

## 0. How to use this document

You're picking up an existing website that already works. This is a **redesign and enhancement**, not a rebuild from scratch. Before you change anything:

1. **Audit first.** Read through the project: framework, folder structure, routing, styling approach (CSS modules, Tailwind, styled-components, plain CSS), components, content sources, and how it's deployed. Write a short summary of what you found and anything that looks fragile or outdated.
2. **Propose a plan.** Based on this document and your audit, propose the redesign in phases. Wait for our approval before making large structural changes.
3. **Stay on the existing stack.** Keep the current framework and hosting unless something is genuinely broken. Upgrading dependencies is fine; migrating frameworks is not, without asking.
4. **Work on a branch** and commit in small, reviewable steps so we can roll back anything we don't love.
5. **Show us.** At each milestone, run the dev server and describe (or screenshot) what changed so we can react to the actual look, not a description of it.

Everything is fair game — copy, structure, layout, and visuals can all change. What must *not* change is the brand foundation in sections 3–5.

---

## 1. Why we're redesigning

The current site was built early, when Landon was still getting comfortable with modern web development. It's functional, but it doesn't feel like *us*. The goal is a site that reflects not just the brand (logo, colors, fonts) but the **vibe** — what it actually feels like to sit at one of our tables with your hands in soil, phone put away, shaping a tree for the first time.

If someone lands on the site and feels a little calmer and a little more curious than they did a second ago, it's working.

---

## 2. About Zion Bonsai

- **What we do:** Beginner-friendly bonsai workshops in Central Utah (Sanpete County, the Ephraim/Manti area). Participants leave with their own jade bonsai in a handmade ceramic pot.
- **Who we are:** A husband-and-wife team. **Landon** brings the technical side — soil, roots, technique, the "how." **Cass** brings the aesthetic and emotional side from her floral design background — the "why" and the feel.
- **Where:** Most public workshops are hosted at **Sweet Roots** in Manti. We also do corporate wellness sessions (our first was an HR retreat for Snow College), school programs, private events, and pop-ups like the Sanpete Harvest Market.
- **Market:** We serve the Spanish Fork-to-Richfield corridor (~70–80k people). There's no other bonsai workshop within ~90 miles. People regularly drive 15 minutes to 1.5 hours to attend.
- **The model:** A workshop is the beginning, not a one-time purchase. Trees mature, and participants come back in 6–9 months for shaping and training sessions.
- **Partners:**
  - **Taya's Clay Creations** (@tayasclaycreations) — handthrown custom pots for every workshop
  - **Sweet Roots** (Manti) — our primary workshop venue
  - **Thistle & Honey** — local partner and early outreach venue
- **Our oldest tree** is named **Cheesecake**. It shows up at every workshop as a visual anchor and would make a great recurring character on the site.

---

## 3. The vibe (most important section)

### Words that describe us
Warm · grounded · unhurried · handmade · imperfect on purpose · earthy · curious · welcoming · quiet confidence

### The philosophy behind it
**Wabi-sabi** — beauty in imperfection, impermanence, and the natural. Cass's version: *"You don't force a flower — the flower tells you where it wants to go."* The site should feel shaped by that idea rather than engineered against it.

**Unplug and create.** Our workshops are screen-free. There's a gentle irony in a website for that, so the site should feel like a pause, not another feed.

### What it should feel like
- Walking into a sunlit potting shed, not a spa lobby or a tech startup
- Tactile: you can almost feel the clay, soil, and paper
- Spacious: generous whitespace, nothing crammed, room to breathe
- Personal: clearly made by two real people in a real place, not a template

### What to avoid
- Corporate or SaaS-template layouts (three identical icon cards in a row, gradient hero, "Get Started" everything)
- Glossy "wellness spa" aesthetics: pastel gradients, generic lotus imagery, stock photos of meditating models
- Salesy urgency patterns: countdown timers, aggressive popups, "ONLY 2 SPOTS LEFT!!" banners
- Busy animation; anything that flashes, bounces, or competes for attention
- Bonsai gatekeeping or intimidating jargon

### Design moves we'd love to see explored
- **Textured, warm backgrounds** — cream/paper tones with a subtle grain, not flat white
- **Organic shapes** — soft irregular edges, hand-drawn-feeling dividers, gentle asymmetry. Imperfect circles over perfect rectangles where it makes sense
- **Photography-led** — real photos of hands in soil, trees mid-shaping, Taya's pots, the workshop tables, Cheesecake. Real always beats stock
- **Slow, subtle motion** — soft fades, gentle reveals on scroll, nothing fast. Respect `prefers-reduced-motion`
- **Script accents used sparingly** — a handwritten touch on a tagline or pull quote, never on body text
- **Seasonal feel** — our messaging shifts with the seasons ("Find calm as seasons shift"). A structure that makes seasonal hero swaps easy would be a plus

Please propose 2–3 distinct visual directions within these guardrails before committing to one, so we can pick the one that feels most like us.

---

## 4. Brand system

### Logo
Bold geometric sans-serif **"ZION"** paired with a flowing script **"bonsai."** Use the existing logo files in the project. Don't recreate or redraw the logo.

### Color palette
These are approximate values from early brand work. **Check them against the actual logo files in the repo and use the logo's true colors if they differ.**

| Role | Color | Approx. hex | Notes |
|---|---|---|---|
| Primary | Terracotta / coral | `#E76F51` | Buttons, accents, highlights |
| Secondary | Sage green | `#9DAD7F` | Backgrounds, secondary accents, botanical touches |
| Neutral | Cream / off-white | `#FAF3E0` | Page backgrounds |
| Text / contrast | Deep green or warm brown | *to define* | Body text and anything that needs to be readable |

**Accessibility note:** Terracotta and sage are both too light to use as text on cream — roughly 2.8:1 and 2.2:1 contrast, below the WCAG AA minimum of 4.5:1. Please define a deep forest green and/or warm soil brown for body text and headings, and use terracotta/sage for fills, accents, and large display elements. If terracotta buttons use white text, darken the button shade until it passes AA.

Set all colors up as design tokens (CSS custom properties or the theme config of whatever styling system the project uses) so they're defined once.

### Typography
| Role | Font | Use |
|---|---|---|
| Headlines | **Montserrat Bold** | Page titles, section headers |
| Body | **Open Sans** | All paragraph text |
| Accent | Script similar to the logo (e.g. Satisfy or Dancing Script) | Taglines and pull quotes only, 1–2 lines max |

All are Google Fonts. Self-host or load efficiently (`font-display: swap`, only the weights actually used).

---

## 5. Voice and copy

### Tone
Warm, conversational, authentic — **never salesy or corporate.** Talk to visitors like a friend inviting them over, not a business converting a lead. Beginner-first: assume no prior knowledge and explain without condescending.

There are two voices in the brand:
- **Cass** — emotional, reflective, wabi-sabi-forward
- **Landon** — technical, practical, credibility-building

The best copy blends both: the feeling *and* the reassurance that we know what we're doing.

### Taglines and statements (use as-is)
- **Mission:** *Zion Bonsai cultivates stillness, curiosity, and connection — one tree at a time.* (Formal contexts, Our Story page)
- **Short tagline:** *Dirt. Creativity. Connection.*
- **Call to action phrase:** *Unplug. Create. Grow.*
- **Sign-off / invitation:** *Come grow with us.*

### Copy rules
- No business mechanics on the public site (margins, costs, how pricing is structured)
- **Tools:** Tools are used during the workshop and **available for purchase** — they are *not* included to take home. Earlier copy caused confusion here; be precise.
- Short and punchy beats long and explanatory. Edit hard.
- Don't invent testimonials, reviews, attendance numbers, or quotes. Use clearly marked placeholders (e.g. `[TESTIMONIAL — from a real attendee]`) and we'll fill them in.

### Plant care facts (if a care section is included, get these right)
- **Watering:** Water thoroughly until it drains completely out the bottom, then let it dry out. It's not about whether the soil feels dry.
- **Bonsai hates wet feet** — roots shouldn't sit in water. Jades store water in their stems and leaves.
- **Leaf snap test:** Snap a leaf in half. Firm and wet inside = hydrated, wait. Limp and dry = time to water.
- **Indoors year-round:** Dwarf jade (*Portulacaria*) and jade (*Crassula*) thrive indoors in Central Utah — a real advantage here versus outdoor bonsai.
- **Seasons:** Summer is the faster growth season; fall/winter is slower (not dormant, just paced).
- **Growth stages:** We label trees by growth stage, from Plantlet up through multi-year established specimens. This could make a nice visual on the site.
- Our custom soil mix is engineered to hold just enough moisture without staying soggy.

---

## 6. Visitors and what they need to do

### Who's arriving
- Mostly **local adults** in Central Utah, many discovering us through **local Facebook community groups** (our best channel) and Instagram
- **Likely on their phones** — design mobile-first and treat desktop as the enhancement
- Complete beginners, couples and friends looking for something to do together, gift-givers, and HR/wellness coordinators exploring group bookings

### Primary goal: book a workshop
This should be the most obvious action on every page, without being pushy.

**Registration flow constraint:** We collect contact info **before** showing a payment link. The current flow is a Google Form for registration, then Square payment links (separate links per workshop and pricing tier). Please preserve that order. If you see a cleaner way to present it on the site, propose it but don't swap out Google Forms or Square without asking.

### Secondary goals
- Inquire about **corporate wellness, private events, or school programs**
- Buy a **gift certificate**
- **Follow @zionbonsai** on Instagram/Facebook
- Join an interest list for future workshops

---

## 7. Suggested site structure

This is a starting proposal — compare it to what exists and recommend changes.

| Page | Purpose |
|---|---|
| **Home** | The feeling first. Hero with tagline, what a workshop is in one breath, next workshop, a glimpse of real photos, clear booking path |
| **Workshops** | Upcoming dates, what to expect (step by step), what you take home, who it's for, FAQ (do I need experience? what should I wear? can I bring a friend? are tools included?) |
| **Private & Corporate Events** | Wellness retreats, team events, school programs, private parties. Inquiry form |
| **Our Story** | Origin story, Landon & Cass, the wabi-sabi philosophy, mission statement, Cheesecake |
| **Care Guide** | Simple beginner care using the facts in section 5. Doubles as a resource for past attendees and good for search |
| **Partners** | Taya's Clay Creations, Sweet Roots, Thistle & Honey — with links |
| **Contact** | Simple contact, social links, location area |

Workshop dates change often. Make upcoming workshops easy for us to update without touching layout code — a single data file (JSON/MD/collection) is ideal.

---

## 8. Technical requirements

- **Mobile-first, responsive** — test at ~375px wide first
- **Performance** — optimized/responsive images (modern formats, lazy loading), minimal JS, no heavy animation libraries unless justified
- **Accessibility** — WCAG AA contrast (see section 4), semantic HTML, alt text on every image, keyboard navigable, visible focus states, `prefers-reduced-motion` respected
- **Local SEO** — descriptive titles and meta descriptions; `LocalBusiness` structured data; natural use of terms like "bonsai workshop," "Central Utah," "Sanpete County," "Manti," "Ephraim"
- **Social sharing** — Open Graph and Twitter card tags with a good default share image (people will share links in Facebook groups, so this matters)
- **Design tokens** — colors, type scale, spacing, and radii defined once and reused
- **Placeholders** — where real photos or content are missing, use clearly labeled placeholders rather than stock images

---

## 9. Suggested phases

1. **Audit & report** — what exists, what's working, what's not
2. **Foundation** — design tokens, fonts, base styles, layout shell (header, footer, navigation)
3. **Visual direction** — 2–3 directions on the Home page hero and one content section; we pick one
4. **Pages** — rebuild page by page in the chosen direction, starting with Home → Workshops
5. **Content pass** — tighten copy to match the voice guidelines
6. **Polish** — accessibility check, performance check, mobile QA, SEO and share tags

Check in with us at the end of phases 1, 3, and 4.

---

## 10. Open items for Landon & Cass to fill in

- [ ] Confirm final brand hex codes from the logo source files
- [ ] Confirm current workshop pricing and upcoming dates
- [ ] Gather real workshop photos (hands in soil, tables, finished trees, Cheesecake, Taya's pots)
- [ ] Collect 2–3 real attendee testimonials (with permission)
- [ ] Decide if gift certificates are purchasable online or by inquiry
- [ ] Confirm which links to use for registration (Google Form) and payment (Square)
- [ ] Any sites whose *feel* you love (bonsai or not) to share as references
