# 49 — n8n: mark past workshops Done each morning

Workshops whose date has passed stay "On sale" until someone remembers, and the site sync holds them as `Waiting: Date has passed, set Status to Done`. Make n8n do it. After 46 (same n8n instance; don't run in parallel with it).

## Context
- Read `docs/grist-sync.md` (including the "Alerts and the Monday digest" section from 46) and task 46's file. Same n8n CLI approach, backups and credentials. Reuse the Grist credential/URL the other Zion Bonsai workflows use.

## Do
1. New workflow **"Zion Bonsai: mark past workshops Done"**, Schedule trigger daily 5:00 AM America/Denver (set the workflow timezone).
2. Fetch Workshops; select rows with `Status` in ("On sale", "Sold out", "Waitlist") and `Date` before today in America/Denver (Grist dates are UTC-midnight seconds). Leave Planning and Cancelled alone.
3. PATCH those rows' `Status` to "Done" in one request. The existing Workshops webhook then runs the site sync on its own; don't call it.
4. If any rows changed, email Landon and Cass one line per workshop: "Marked Done: <title> (<date>). Tick Attended for who came, if you haven't." (same email node/recipients as 46). No email when nothing changed.
5. Error output → "Zion Bonsai: error alert".
6. Test on a Grist doc copy (point the workflow's Grist URL at the copy for a manual run, emails to Landon only), then point it back at the real doc and activate. The real doc currently has one past "On sale" workshop; if it's still there at activation, the first real run will fix it — that's intended.
7. Add a line about it to the "Alerts and the Monday digest" section of `docs/grist-sync.md`. Don't commit.

## Done when
- Backup of n8n workflows exists; workflow active; manual test against the copy changed the right rows and only those; copy deleted.
