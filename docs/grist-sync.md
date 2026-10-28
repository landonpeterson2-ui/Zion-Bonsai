# Grist → site sync

Workshops, partners and quotes can be edited in the Grist doc on the NUC. `npm run sync:grist` copies the rows marked for the site into `content/*.json`; `scripts/sync-and-push.sh` wraps it with git pull/commit/push so n8n can run it on its own. Cloudflare (and Vercel before it) can't reach Grist (it's only on the tailnet), so the site still builds from the JSON in the repo.

```
Grist row edited ─webhook─▶ n8n ─wait 2 min─▶ SSH to NUC host ─▶ scripts/sync-and-push.sh ─push─▶ Cloudflare deploy
                                                                 └▶ npm run sync:brevo ─▶ Brevo lists
```

The same run also copies workshop guests and newsletter consent to Brevo (`scripts/sync-brevo.mjs`, see the comment at its top): someone whose latest attended workshop (Paid or Comped, **Attended** ticked) was in the last 30 days joins the **Workshop guests** list, which starts the welcome series; anyone with **Email_OK** ticked on their contact joins **Newsletter**, and leaves it when it's unticked. Email_OK is the newsletter opt-in: tick it only when the person said yes (the registration form's newsletter question).

## What Grist decides

The site-facing logic lives in Grist formulas, so the script stays simple and problems show up right where Cass types:

- **Workshops:** `Site_Status` (open / full / waitlist, or blank for off-site formats and anything not on sale) and `Show_On_Site` come from Format, Status, Capacity and Seats_Left. Sold out happens on its own when Seats_Taken (Paid + Comped + Pending) reaches Capacity. `Slug`, `Time` and `Price_Label` are formulas too; Start/End are pick lists ("1:00 PM"), converted to 24-hour by the script.
- **Ready_For_Site** on Workshops, Organizations and Feedback names what a row still needs, in plain words. Rows with something listed are skipped and reported as `Waiting:`; everything else publishes.
- A workshop that's on the site now is never dropped by accident. It stays until its Grist row is taken off sale (Done, Cancelled, Planning). If it isn't in Grist at all, it's kept and reported.
- Every calculated column is locked against typing by an access rule (Access Rules, note "Calculated column…"). Formulas can still be edited in column settings.
- Each sync that changes something or has rows waiting adds a row to the **Site_Sync** table (`scripts/grist-log.mjs`), so Cass can see "Published" or what's waiting without asking.

`npm run sync:grist -- --check` runs everything but writes nothing.

## One-time setup on the NUC host

1. Node 22.18+ and git on the host (not in the n8n container).
2. A dedicated clone used only by the sync, e.g. `~/zion-bonsai-sync`. Don't edit files in it by hand.
   - GitHub: add a **deploy key with write access** to this repo, and clone over SSH with it.
   - In that clone, set `git config user.name` / `user.email` to Landon's GitHub identity. (Vercel-only: the Hobby plan skips deploys from commit authors who aren't on the team. Remove this note at launch, once Vercel is gone.)
   - Put `GRIST_API_KEY=...` and `BREVO_API_KEY=...` in `.env.local` in the clone.
   - Test: `scripts/sync-and-push.sh` should print "No content changes." or "Pushed: <sha>".
3. A host user n8n can SSH in as (key-only login), able to run the script in that clone.

## n8n workflow

1. **Webhook** node (POST). Copy its production URL.
2. **Wait** 2 minutes, so a burst of edits becomes one run. Extra runs are harmless: the script locks, and a run with nothing new does nothing.
3. **SSH** node → Execute command: `s=0; ~/zion-bonsai-sync/scripts/sync-and-push.sh || s=1; cd ~/zion-bonsai-sync && npm run -s sync:brevo || s=1; exit $s` (both run every time; a failure in either reaches step 4). Host: the NUC as seen from the container (add `extra_hosts: ["host.docker.internal:host-gateway"]` to the n8n service and use `host.docker.internal`).
4. On failure (non-zero exit), send yourself the output (n8n Error Workflow or the node's error output → email). A failed run pushes nothing; the message names the Grist row to fix.

Optional: a **Schedule** trigger (e.g. hourly) into the same Wait/SSH nodes, as a backstop for missed webhooks.

## Grist webhook

- Self-hosted Grist only calls allowed hosts, and only over https unless the setting is `*`. n8n on the NUC is plain http, so `ALLOWED_WEBHOOK_DOMAINS=*` is set on the Grist container (CasaOS app settings). The webhook URL is `http://172.17.0.1:5678/webhook/zion-bonsai-sync` (the NUC as seen from Grist's container); the n8n SSH credential uses the same `172.17.0.1` to reach the host.
- In Grist, open Settings → Webhooks and add one webhook per table: **Workshops**, **Registrations** (seats sold change sold-out status; Attended feeds Brevo), **Contacts** (Email_OK feeds Brevo), **Organizations**, **Feedback**, each pointing to the n8n Webhook URL, event types add and update.

## Registration form → Grist

n8n workflow "Zion Bonsai: registration form to Grist", every 15 minutes. The Google Form's responses go to the sheet `Zion Bonsai registrations`. n8n reads it with the "Google Sheets account" credential, an OAuth client named `n8n` in the Google Cloud project `Zion Bonsai n8n`. The client is internal to the business account. A service-account key isn't an option because the organization policy blocks key creation. To sign in again, open n8n through `ssh -L 5678:localhost:5678 nuc` at http://localhost:5678, because Google only accepts the localhost callback.

- Only rows submitted after the workflow went live (2026-10-27 23:37, Utah time) are read. Earlier registrations were entered by hand.
- **Workshop:** the soonest workshop dated on or after the submission whose `Registration_Form` is exactly the form's link (`https://forms.gle/zUgmpDQrtbPmVvhD7`) and whose Status is On sale, Sold out or Waitlist. A new form means a new link in the workflow's "Tidy new rows" step.
- **Contact:** matched by email, ignoring case.
  - A new contact gets the name, phone, `Attendee`, Lead_Source (best guess from "How did you hear", else Other) and Email_OK from the "Stay rooted with us" checkbox.
  - An existing contact only gains Email_OK when ticked, plus a phone if Grist has none. An unticked box never removes an opt-in.
- **Registration:** Seats 1 or 2 (pair), Guest_Name, Notes from the questions box. Status is Pending, or Waitlist when the workshop isn't On sale or has fewer seats left. Cass fills in payment and changes the status.
- If the contact already has a registration for that workshop (for example, one entered by hand), nothing is added.
- A row with no matching workshop or a broken email is emailed once ("A registration needs a look") and is picked up automatically once fixed. A failed run emails through the "Zion Bonsai: error alert" workflow.
