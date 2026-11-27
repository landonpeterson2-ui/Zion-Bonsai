# 61 — Sign up on our own site (replaces the Google Form)

People register on zionbonsai.com instead of a Google Form, see the right Square payment link straight after, get a confirmation email from us, and land in Grist like today. Approved by Landon 2026-11-26 (see decisions.md). The approved look is the mockup: `app/mockups/register/`, `components/register/RegisterForm.tsx` on branch `register-mock`.

v1 is this file. **v2, not now:** pay on our page with Square's Web Payments SDK (card, Apple/Google Pay, gift cards, split) instead of the payment link; live "seats left" from Grist.

## How it fits together

```
/register?date=<id>  --POST /api/register-->  Worker: check, Turnstile, save to D1, Brevo confirmation
        |                                              |
/register/thanks?id=<uuid>  (Square link for 1 or 2 seats)
                                                       |
n8n on the NUC (every 15 min) --GET /api/signups (Bearer)--> new rows --> Grist (same steps as the form) --> email to plants@
                              --POST /api/signups/ack------> marks them picked up
```

Cloudflare can't reach Grist (tailnet only), so n8n pulls. Same pattern as Square → Grist (task 59).

## Shared contract (all three tasks build to this; change it only by asking)

**Content** (`content/site.json` → `registration`, schema in `lib/content-schemas.ts`, already added):
- `mode`: `"form"` (today: Register → Google Form) or `"site"` (Register → `/register?date=<id>`). Stays `"form"` until task 61 integration flips it.
- `prices.single` / `prices.pair` (75 / 125), `payLinks.single` / `payLinks.pair` (Square links; only ever shown on /register/thanks), `turnstileSiteKey` (public; test key `1x00000000000000000000AA` until the real one).
- A workshop takes sign-ups when mode is site and its status is `open` (seat) or `full`/`waitlist` (waitlist sign-up, no payment). Never tentative or past.

**D1** database `zion-bonsai-signups`, binding `DB`, table `signups`:
| column | type | notes |
|---|---|---|
| id | TEXT PK | `crypto.randomUUID()` |
| created_at | TEXT | ISO UTC |
| workshop_id | TEXT | content id, e.g. `2027-02-12-sweet-roots-6` |
| workshop_date | TEXT | YYYY-MM-DD |
| seats | INTEGER | 1 or 2 |
| waitlist | INTEGER | 0/1 |
| name, email, phone, guest, notes, heard | TEXT | phone/guest/notes/heard nullable; email lowercased, trimmed |
| gift_card, email_opt_in, text_opt_in, photo_ok | INTEGER | 0/1; text_opt_in is 0 when there's no phone |
| ip_hash | TEXT | SHA-256 of IP + SIGNUPS_TOKEN, for rate limiting only |
| picked_up_at | TEXT | null until n8n acks |

Rows are deleted 30 days after `picked_up_at` (cleanup runs inside GET /api/signups).

**API** (Next.js route handlers, Cloudflare env via `getCloudflareContext()` from `@opennextjs/cloudflare`):
- `POST /api/register` — JSON `{ workshopId, seats, name, email, phone?, guest?, giftCard, notes?, emailOptIn, textOptIn, photoOk, heard?, turnstileToken, company }` (`company` is a hidden honeypot; non-empty → pretend success, save nothing). Validate with zod (name ≤ 100, notes ≤ 1000, guest required when seats is 2). Verify Turnstile with secret `TURNSTILE_SECRET`. Rate limit 5 per ip_hash per 10 minutes → 429. Same email + workshop already saved → return the existing id, `already: true`. Responses: `200 {ok:true, id, waitlist, already}`, `400 {ok:false, errors:{field: message}}` (plain, friendly words), `429 {ok:false, errors:{form: …}}`.
- `GET /api/signups` — header `Authorization: Bearer <SIGNUPS_TOKEN>` else 401. Returns `{signups:[…rows where picked_up_at is null, oldest first, max 100, without ip_hash]}`.
- `POST /api/signups/ack` — Bearer; body `{ids:[…]}`; sets picked_up_at. Returns `{acked:n}`.
- All three: `Cache-Control: no-store`.

**Confirmation email (Brevo transactional)** — sent by the Worker right after a new row is saved (not for `already` or honeypot), via `POST https://api.brevo.com/v3/smtp/email` with secret `BREVO_API_KEY`, From `Zion Bonsai <plants@zionbonsai.com>`, Reply-To the same. Best effort: a failure is logged (no personal data in the log) and never fails the sign-up. Skipped quietly when `BREVO_API_KEY` is unset. Plain, warm, short HTML + text, in the site voice: first name, workshop title, date, time, venue; seats (and guest first name); for a seat: "Pay $X to confirm" with the right Square link and "your seat is held as Pending until you pay"; gift card line if ticked ("use your gift card at checkout"); for waitlist: "you're on the list, we'll get in touch if a seat opens". Then `[WHAT TO BRING]` / `[PARKING]` placeholders, and the sign-off *Come grow with us.* Tools: never say they're included to take home.

**Worker secrets / vars:** `TURNSTILE_SECRET`, `SIGNUPS_TOKEN`, `BREVO_API_KEY`. Local dev uses `.dev.vars` (gitignored) with Turnstile's test secret `1x0000000000000000000000000000000AA` and a made-up SIGNUPS_TOKEN. Never commit a real secret or print one.

**Thank-you page:** `/register/thanks?id=<uuid>` reads the row from D1 (first name, seats, workshop, gift card, waitlist). No name, email or phone in any URL. Unknown id → a generic "You're in" with both pay links.

## 61a — Back end (builder)
Worktree `~/Zion-Bonsai-reg-a`, branch `register-api`.
1. `wrangler d1 create zion-bonsai-signups`; add the `d1_databases` binding to `wrangler.jsonc`; migration `migrations/0001_signups.sql`; apply locally (`--local`) and remotely (`--remote`). Run `npm run cf-typegen` so `CloudflareEnv` has DB and the secrets.
2. Make bindings work in `next dev` (`initOpenNextCloudflareForDev()` in next.config.js, per OpenNext docs), `.dev.vars` gitignored, `.dev.vars.example` committed.
3. The three route handlers in `app/api/`, shared code in `lib/signups.ts` (zod schema exported for the front end to reuse: `signupInputSchema`), Brevo email in `lib/confirmation-email.ts`.
4. Test with curl against `next dev`: good sign-up, missing fields, honeypot, duplicate, rate limit, tentative workshop refused, seat vs waitlist, GET without/with token, ack, 30-day cleanup (fake an old row). Report results as a table, no personal data.
Done when: lint, tsc, `npm run build` and `npm run preview` (OpenNext) all pass; curl table all green; nothing in the repo holds a secret.

## 61b — Front end (builder)
Worktree `~/Zion-Bonsai-reg-b`, branch `register-ui`. Promote the mockup; don't redesign it.
1. Move to `/register` (date list + form) and `/register/thanks`. Delete `app/mockups/`. (`/workshops/*` redirects to /workshops, so don't nest under it.) `robots: noindex` on both; not in the sitemap.
2. Form posts JSON to `/api/register` (contract above; import `signupInputSchema` from `lib/signups.ts` once 61a lands — until then a local copy of the type). Turnstile widget (explicit render, `turnstileSiteKey` from content, appearance "interaction-only"), hidden honeypot `company`. Show server field errors inline; keep what was typed. Disable the button while sending. On success → `/register/thanks?id=…`.
3. Thank-you page reads the row by id (server component; until 61a lands, stub the lookup behind one function `getSignup(id)` in `lib/signups.ts`). Pay button = `payLinks.single`/`pair`, opens in the same tab. Keep the calendar file, placeholders and sign-off. Remove the mockup banner and the "Show it sold out" link; full/waitlist comes from the workshop status.
4. When `registration.mode` is `"site"`, Register / Join the waitlist buttons on /workshops (`components/workshops/Dates.tsx`) and anywhere else that uses `registrationUrl` point to `/register?date=<id>`; in `"form"` mode nothing changes.
5. A short "How we use this" line under the button: we use your details only to run your workshop and, if you tick a box, to tell you about new dates; we never sell or share them. Link to the contact email.
6. Check at 375px and desktop, keyboard only, VoiceOver labels; 44px targets.
Done when: lint, tsc, build pass; with mode flipped to "site" locally every Register button goes to /register; in "form" mode the site is unchanged.

## 61c — n8n: website sign-ups into Grist, and the plants@ email (builder)
On the NUC (`ssh nuc`, container `n8n`). Read `docs/grist-sync.md` and the "registration form to Grist" workflow first. Back up all workflows to `/DATA/AppData/n8n/backups/before-61-<date>/` and the Grist doc (`/download`) first.
1. In "Zion Bonsai: registration form to Grist", add a second input: HTTP GET `https://zionbonsai.com/api/signups` with a new Header Auth credential "Zion Bonsai site sign-ups" (Landon pastes the token; you create it empty if needed and say so). A Code node turns each sign-up into exactly the shape "Tidy new rows" produces, so Plan / Adds / Add registration / alerts run unchanged. Notes get "Signed up on the website." and the gift card line like today. After the Grist writes succeed, POST `/api/signups/ack` with those ids. If the site call fails, the Google Sheet branch still runs.
2. Grist (back up, rehearse on a `/copy`, then live): Contacts `Text_OK` (Toggle, label "Texts OK"), Registrations `Photo_OK` (Toggle, label "Photos OK"), and `Source` (Choice: Google Form, Website). Map email opt-in to the existing email permission column, text opt-in to Text_OK, photo to Photo_OK.
3. **"Email new registration" goes to plants@zionbonsai.com** (in addition to whoever gets it now), for both Google Form and website sign-ups. Subject unchanged; add "via website" or "via Google Form" in the body.
4. Keep the website branch disabled until 61 integration (the endpoint isn't live yet); rehearse its Code node with a fixture of 3 fake sign-ups (seat, pair with guest, waitlist) against the Grist copy. Delete the copy after.
Done when: rehearsal shows 3 correct Registrations and Contacts on the copy, the Google Form path still works, the plants@ email change is live, nothing personal in the report.

## 61 integration (Fable, after a–c)
Merge a and b into `register-mock`, set the real secrets (`wrangler secret put`), real Turnstile key in content, deploy with mode still "form", test /register on the live site end to end (sign-up → D1 → n8n → Grist → plants@ email → Brevo confirmation → pay link), then flip mode to "site".

## Needs from Landon
- Cloudflare Turnstile widget for zionbonsai.com (site key + secret).
- `BREVO_API_KEY` and plants@zionbonsai.com verified as a sender in Brevo (domain authenticated). Without it the confirmation email is skipped, nothing else breaks.
- The SIGNUPS_TOKEN goes into the n8n credential; Fable generates it.
