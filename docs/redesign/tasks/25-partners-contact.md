# 25 — Partners and Contact pages (new)

**Phase:** 4 Pages · **Depends on:** 20

## `/partners`
- Short intro: the workshop is a local collaboration.
- One section per partner from `getPartners()`: name, role, blurb, location, Instagram link, website link **only when `url` is non-null** (Sweet Roots' site is under development — when its URL is added to `content/partners.json`, the link appears with no code change). Photo placeholder per partner, e.g. `[PHOTO — Taya's pots]`.
- Alternate layout per partner (not identical cards).

## `/contact`
- Email, phone, Instagram, Facebook from `getSite()`; area: "Sanpete County — most public workshops are at Sweet Roots in Manti." No street address unless added to `site.json`.
- **Gift certificates** (`id="gift"`): if `giftCertificates.mode` is `"inquiry"`, explain they're available and how to ask (email link with a prefilled subject). If `"online"` with a `url`, a Buy button.
- **Interest list**: link to `interestListUrl` if set; otherwise an email link with subject "Add me to the workshop list".
- Link to `/events` for groups.

## Done when
- Both pages pull every contact detail from `content/` (no hardcoded email/phone).
- Setting a URL on `sweet-roots` in `partners.json` makes the link appear (try it, then revert).
- Build and lint pass. Summary in STATUS.md.
