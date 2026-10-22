# 02 — Content files and loader

**Phase:** 2 Foundation · **Depends on:** 00

## Why
Workshop dates, links and contact info are hardcoded across pages (and the email is inconsistent: `plants@zionbonsai.com` vs `zionbonsaiplants@gmail.com`). Landon & Cass need to update dates without touching layout code.

## Do
Create `content/` with these JSON files, `lib/content.ts` with zod schemas + typed getters, and use them nowhere yet except where noted (pages adopt them in Phase 4).

### `content/site.json`
```json
{
  "name": "Zion Bonsai",
  "email": "plants@zionbonsai.com",
  "phone": "435-201-0336",
  "area": "Sanpete County, Central Utah",
  "towns": ["Manti", "Ephraim"],
  "social": { "instagram": "https://instagram.com/zionbonsai", "facebook": "https://facebook.com/zionbonsai" },
  "interestListUrl": null,
  "giftCertificates": { "mode": "inquiry", "url": null },
  "shopEnabled": false,
  "season": "fall"
}
```

### `content/seasons.json`
One entry per season (`spring`, `summer`, `fall`, `winter`): `{ "eyebrow", "headline", "lede", "photo", "photoAlt" }`. Fill `fall` with: headline "Find calm as seasons shift.", lede in the brand voice (1–2 sentences, unplugging-forward). Other seasons: draft copy, mark each with `"draft": true`. Photos reference `/photos/...` paths from task 05 (use placeholders like `"[PHOTO]"` if 05 isn't done — the schema should allow null photo).

### `content/workshops.json`
```json
{
  "registrationNote": "Register first — we'll send a payment link once we have your info.",
  "workshops": [
    {
      "id": "2026-11-intro-manti",
      "type": "intro",
      "title": "Intro to Bonsai",
      "date": "2026-11-14",
      "start": "10:00",
      "end": "12:00",
      "venue": "sweet-roots",
      "price": "[PRICE]",
      "registrationUrl": null,
      "status": "open"
    }
  ]
}
```
- `type`: `"intro" | "shaping" | "popup"`. `status`: `"open" | "full" | "waitlist"`.
- Use one or two clearly fake placeholder entries (title prefixed `[SAMPLE]`) — real dates are an open item.
- Getter `getUpcomingWorkshops()` filters out dates before today (America/Denver) and sorts ascending. Past entries can stay in the file.
- **Never add payment link fields.** See CLAUDE.md "Booking flow".

### `content/partners.json`
Array of `{ "id", "name", "role", "blurb", "url", "instagram", "location" }`:
- `tayas-clay` — Taya's Clay Creations, handthrown pots for every workshop, instagram `https://instagram.com/tayasclaycreations`, url null.
- `sweet-roots` — Sweet Roots, Manti, primary workshop venue, url **null** (site under development).
- `thistle-honey` — Thistle & Honey, local partner and early outreach venue, url null.
Blurbs: one warm sentence each, no invented facts beyond the handoff.

### `content/gallery.json`
Leave as `[]` with schema `{ "src", "alt", "caption", "status": "sold" | "available" | "workshop", "featured": boolean }`. Task 05 fills it.

### `content/faq.json`
Workshop FAQ, beginner voice, short answers:
- Do I need experience? (no)
- What should I wear? (clothes you don't mind getting a little soil on)
- Can I bring a friend? (yes — encourage registering together)
- Are tools included? **Exact meaning: tools are provided to use during the workshop and available to purchase; they're not included to take home.**
- What do I take home? (your own jade bonsai in a handmade ceramic pot by Taya's Clay Creations, plus care basics)
- Do I need to put my phone away? (we keep the table screen-free; warm framing)
- What happens after? (return shaping sessions in 6–9 months)

### `lib/content.ts`
- Import JSON, parse with zod at module load (fail the build loudly on bad data), export typed getters: `getSite()`, `getSeason()`, `getUpcomingWorkshops()`, `getPartners()`, `getPartner(id)`, `getGallery()`, `getFaq()`.
- Add a short `content/README.md` for Landon & Cass: how to add a workshop, what each field means, "run `npm run build` to check your edit".

## Done when
- `npm run build` passes; a deliberately broken field (try it, then revert) fails the build with a readable zod error.
- `content/README.md` explains adding a workshop in under 15 lines.
