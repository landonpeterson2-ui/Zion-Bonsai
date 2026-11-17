# Grist → site sync

Workshops, partners and quotes can be edited in the Grist doc on the NUC. `npm run sync:grist` copies the rows marked for the site into `content/*.json`; `scripts/sync-and-push.sh` wraps it with git pull/commit/push so n8n can run it on its own. Cloudflare can't reach Grist (it's only on the tailnet), so the site still builds from the JSON in the repo.

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
   - In that clone, set `git config user.name` / `user.email` to Landon's GitHub identity.
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

## Alerts and the Monday digest

Five n8n pieces work for Landon and Cass (the prep-task one sends no email). All send through the same Brevo SMTP credential and From address as the "error alert" workflow, and go to the same two people. Nothing in them shows an email address or phone number.

- **New registration** (a step at the end of "Zion Bonsai: registration form to Grist"): one short email per registration the form adds. Subject `New registration: <first name> for <workshop> (<Mon D>)`. Body: seats, Pending or Waitlist, guest name and notes if any, seats left, and a link to the Grist doc.
- **Zion Bonsai: heads-up alerts** (every 15 minutes), three kinds:
  - `Sold out: <workshop> (<date>)`: a workshop that is On sale, Sold out or Waitlist has no seats left. If its Status is still "On sale", the email says to change it to Sold out or Waitlist.
  - `A seat opened: <workshop> (<Mon D>)`: a workshop dated today or later (On sale, Sold out or Waitlist) has at least one seat left and someone on the waitlist. The email says how many seats are open, who is next (the Waitlist registration with the lowest row id: first name and how many seats they asked for, with "needs 2 seats, only 1 open" when it doesn't fit), and to open Workshop day, select their card and press Offer the seat, then get in touch. It re-arms when the workshop fills up again or its waitlist empties, so a later opening alerts again.
  - `Feedback needs a look: <rating>/5 from <workshop>`: a Feedback row rated 1 to 3, with its comment. A rating of 0 means "not rated" and is ignored.
- **Zion Bonsai: Monday digest** (Mondays 7:00 AM Utah time): `This week at Zion Bonsai (<Mon D>)`. Sections, each left out when empty: workshops in the next 14 days with seats left; tasks due within 7 days or overdue, grouped by Landon and Cass ("Both" counts for each); trees to invite back (shaping due within 14 days, not yet due or invited); reorder; agreements (a heads-up, or 30 days or fewer left); registrations whose Check column has a problem; the last site sync if it wasn't "Published". If everything is empty it says "Nothing needs you this week. Come grow with us."

- **Zion Bonsai: mark past workshops Done** (every day at 5:00 AM Utah time): a workshop whose date has passed and whose Status is still On sale, Sold out or Waitlist is changed to Done in one request. Planning and Cancelled are left alone. The Workshops webhook then runs the site sync on its own. If anything changed, it emails one line per workshop: "Marked Done: <workshop> (<date>). Tick Attended for who came, if you haven't." A day with nothing to change sends nothing. Pause it by switching it off in n8n like the others; it reports failures through "Zion Bonsai: error alert".

- **Zion Bonsai: workshop prep tasks** (every 15 minutes, no email): for each workshop dated today or later that isn't Done or Cancelled, and each Active row in **Prep_Steps** whose Formats is empty or includes the workshop's Format, it adds a Task if that workshop doesn't have one for that step yet (Task = the step, Owner = the step's Owner, Due = workshop date plus Days, or today if that's already past, Prep_Step linked). All missing rows go in one request. If a workshop's date changes, the Due dates on its not-done prep tasks shift by the same number of days (never earlier than today). If a workshop is Cancelled, its not-done prep tasks are ticked Done (rows aren't deleted). Editing Prep_Steps only affects workshops that don't have those tasks yet; existing tasks stay as they are. The Monday digest already shows each task's workshop title. It remembers each workshop's date in its static data; the first run only records them. Pause it by switching it off in n8n.

**Once-only memory.** The heads-up workflow keeps a list of what it has already told you in its n8n static data, keyed by table and row (`Workshops 5`, `Feedback 12`). The first run after it is turned on records everything that is already true and sends nothing, so there is no backlog. After that each workshop or feedback row alerts once (waitlist openings were seeded the same way on their first run), and only after its email was sent. A workshop that is still sold out tomorrow does not repeat. To get an alert again for a row, it has to be a new row. (Static data only saves on real scheduled runs, not on manual test runs in the editor.)

**Pausing.** In n8n, open the workflow and switch it off with the Active toggle: "Zion Bonsai: heads-up alerts" or "Zion Bonsai: Monday digest". For the new-registration email, open "Zion Bonsai: registration form to Grist" and disconnect or disable the last three nodes (Registration details, Write registration email, Email new registration); keep the rest running. All three report failures through "Zion Bonsai: error alert".

## Grow app → Grist

n8n workflow "Zion Bonsai: Grow app to Grist" (every 15 minutes, no email) pulls a small one-way feed from the companion app (grow.zionbonsai.com) into Grist. Nothing flows back, Grist stays private, and the app never sees the NUC.

- **What flows:** people with an app account, trees claimed at a workshop (workshop tag), and return invitations the app has sent. Nothing else leaves the app (no photos, notes, stories, locations).
- **Contacts:** matched by email, ignoring case. A match gets **In the Grow app** (`In_App`) ticked. Someone unknown becomes a new Contact (first word of their app name, Lead_Source `Other`, `Attendee` only if they claimed a workshop tree). **Email_OK is never touched**: the app manages its own newsletter in Brevo.
- **Trees:** a claimed tree becomes a Trees row (Owner, Species = the name given in the app, **App tree id** `App_Tree_Id`; Date_Potted fills from the workshop). The Workshop is the Grist workshop on the tag's date when there's exactly one; otherwise it's left blank and Notes says so. A tree with an App tree id already is skipped, so nothing doubles.
- **Return invitations:** when the app has sent one, the tree's Return_Status moves `Not yet due` or blank to `Invited`. It never moves backwards.
- **How it asks:** the Supabase function `public.grist_feed(p_secret, p_since)` (app repo, migration `20261117000100_grist_feed.sql`). It is security definer, callable with the public anon key, and refuses unless `p_secret` equals the Vault secret `grist_feed_secret`. n8n holds the anon key and that secret in the credential **Grow feed (Supabase)** (Custom Auth), never the service-role key. `p_since` is kept in the workflow's static data; the first run starts at 2026-10-01, later runs overlap by 30 minutes (harmless, everything is idempotent) and the point only moves after Grist accepted every write.
- **Rotate the secret:** in the Supabase SQL editor run `select vault.update_secret((select id from vault.secrets where name = 'grist_feed_secret'), '<new random value>');`, then paste the same value into the n8n credential (the Custom Auth JSON's `body.p_secret`). Until both match, runs fail and the "error alert" workflow emails.
- **Pause:** switch off the Active toggle on "Zion Bonsai: Grow app to Grist". Nothing else depends on it. Failures report through "Zion Bonsai: error alert".
