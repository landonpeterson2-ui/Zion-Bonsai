# Grist → site sync

Workshops, partners and quotes can be edited in the Grist doc on the NUC. `npm run sync:grist` copies the rows marked for the site into `content/*.json`; `scripts/sync-and-push.sh` wraps it with git pull/commit/push so n8n can run it on its own. Vercel can't reach Grist (it's only on the tailnet), so the site still builds from the JSON in the repo.

```
Grist row edited ─webhook─▶ n8n ─wait 2 min─▶ SSH to NUC host ─▶ scripts/sync-and-push.sh ─push─▶ Vercel deploy
```

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
   - In that clone, set `git config user.name` / `user.email` to Landon's GitHub identity. Vercel on the Hobby plan skips deploys from commit authors who aren't on the team.
   - Put `GRIST_API_KEY=...` in `.env.local` in the clone.
   - Test: `scripts/sync-and-push.sh` should print "No content changes." or "Pushed: <sha>".
3. A host user n8n can SSH in as (key-only login), able to run the script in that clone.

## n8n workflow

1. **Webhook** node (POST). Copy its production URL.
2. **Wait** 2 minutes, so a burst of edits becomes one run. Extra runs are harmless: the script locks, and a run with nothing new does nothing.
3. **SSH** node → Execute command: `~/zion-bonsai-sync/scripts/sync-and-push.sh`. Host: the NUC as seen from the container (add `extra_hosts: ["host.docker.internal:host-gateway"]` to the n8n service and use `host.docker.internal`).
4. On failure (non-zero exit), send yourself the output (n8n Error Workflow or the node's error output → email). A failed run pushes nothing; the message names the Grist row to fix.

Optional: a **Schedule** trigger (e.g. hourly) into the same Wait/SSH nodes, as a backstop for missed webhooks.

## Grist webhook

- Self-hosted Grist only calls allowed hosts: set `ALLOWED_WEBHOOK_DOMAINS` on the Grist container to the n8n host and restart Grist.
- In Grist, open Settings → Webhooks and add one webhook per table: **Workshops**, **Registrations** (seats sold change sold-out status), **Organizations**, **Feedback**, each pointing to the n8n Webhook URL, event types add and update.
