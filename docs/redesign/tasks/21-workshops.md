# 21 — Workshops page

**Phase:** 4 Pages · **Depends on:** 20

## Why
Current page books through a Shopify buy button, shows "Wellness-focused experiences for individuals ages 25-45" (internal targeting copy), uses emoji icons, and lists retired offerings. This is the most important page on the site.

## Sections, in order
1. **Intro** — short headline leading with unplugging (e.g. two hours, no notifications, your hands in soil). Photo from the chosen direction's style.
2. **Upcoming dates** (`id="dates"`) — from `getUpcomingWorkshops()`. Each: type label, title, day + date + time, venue (from `getPartner(venue)`; link only if `url` non-null), price, status. Button "Register" → `registrationUrl`, opens in a new tab with an accessible "(opens in new tab)" hint. If `registrationUrl` is null, show "Registration opens soon". `full` → "Join the waitlist" if a URL exists, else "Full". Below the list: `registrationNote` ("Register first — we'll send a payment link once we have your info."). Empty state: warm "New dates coming soon" + interest-list link from `getSite().interestListUrl` (or email fallback).
3. **What to expect** — step by step through the two hours, phone-free framing. Make it feel like a path, not a card grid.
4. **What you take home** — your jade bonsai (*Portulacaria afra* dwarf jade or *Crassula* jade) in a handmade Taya's Clay Creations pot; care basics. **Tools: used during the workshop, available to purchase — not included.** Say this plainly here.
5. **Photos from the table** — a real highlight of the page: 4–8 of Cass's workshop photos (`status: "workshop"` in gallery, sourced from `photos-inbox/workshop/` via task 05 — re-run `npm run photos` if new ones were added). Asymmetric collage, people and hands over finished trees. Don't caption people by name unless Landon confirms. If there aren't enough yet, use labeled placeholders: `[PHOTO — hands in soil]`, `[PHOTO — workshop table at Sweet Roots]`, `[PHOTO — Taya's pots lined up]`.
6. **Return shaping sessions** — trees keep growing; come back in 6–9 months to shape and train yours. Explain in 2–3 sentences, show any `type: "shaping"` dates.
7. **Who it's for** — complete beginners, couples and friends, gift-givers. Short list, not cards. Gift certificate link → `/contact#gift`.
8. **FAQ** — from `getFaq()`, using `<details>/<summary>` (no JS), styled to the direction.
9. **Groups?** — one line + link to `/events`.

## Also
- Remove `ShopifyBuyButton` usage from this page and the `workshopTypes` / `workshopHandles` arrays.
- Update metadata: title "Bonsai Workshops in Manti & Central Utah", description mentioning beginner, Sanpete County, screen-free.

## Done when
- Changing a date in `content/workshops.json` updates the page with no code change.
- A past-dated workshop doesn't show.
- Tool policy wording is correct in both the take-home section and FAQ.
- Build and lint pass. Summary in STATUS.md.
