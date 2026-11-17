# 51 — Unsubscribes in Brevo untick Email OK in Grist

When someone unsubscribes from our emails in Brevo, Grist should stop saying they opted in. Change `scripts/sync-brevo.mjs` only (plus its docs).

## Context
- Read the comment at the top of `scripts/sync-brevo.mjs` and the "Brevo" parts of `docs/grist-sync.md`. The script already never sets `emailBlacklisted`, so Brevo keeps unsubscribed people unsubscribed; the gap is that Grist's `Email_OK` stays ticked.
- The script runs on the NUC after every Grist sync (the NUC clone pulls `main`), so it reaches production when Landon's reviewer merges to `main`.
- Check the current Brevo API docs for how to read a contact's `emailBlacklisted` and per-list unsubscribe state (e.g. `GET /v3/contacts/{identifier}` or the bulk `GET /v3/contacts`); don't work from memory. Prefer one bulk read over one call per contact if the API allows it.

## Do
1. For each Grist contact with `Email_OK` ticked whose Brevo contact is `emailBlacklisted` true, or is unsubscribed from the Newsletter list (id in the script), untick `Email_OK` in Grist (one PATCH for all of them) and append to that contact's `Notes`: `Unsubscribed in Brevo, Email OK unticked by the sync (<YYYY-MM-DD>).` Do this before the list-membership step, so the same run removes them from Newsletter.
2. Respect `--check`: report what it would untick, write nothing.
3. Log counts only (`Unticked Email OK for N contacts who unsubscribed in Brevo.`), never emails or names.
4. Update the comment at the top of the script and the Brevo paragraph in `docs/grist-sync.md`.

## Don't
- Don't change list ids, the welcome-series logic, the APP_NEWSLETTER exception, or anything else in the script. Don't set or clear `emailBlacklisted`. Don't commit.

## Done when
- `npm run lint` and `npx tsc --noEmit` pass.
- `npm run sync:brevo -- --check` runs against the real Grist and Brevo (keys in `.env.local`) and prints the count line (likely 0). Show its output with any personal data removed.
- A unit-ish check in the scratchpad (not the repo) feeds fake Brevo/Grist responses through the new function and shows it unticks only the right contacts.
