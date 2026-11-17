# 50 — n8n: workshop prep tasks and waitlist openings

Two automations on the NUC's n8n. Read `docs/grist-sync.md` (all of it, including "Alerts and the Monday digest") and task files 46 and 49 first; reuse their patterns, credentials, recipients and backup location (`/DATA/AppData/n8n/backups/before-50-<date>/`).

## Context
- Grist now has a **Prep_Steps** table (Step, Days, Owner, Formats, Active) that Landon and Cass edit, and **Tasks.Prep_Step** (Ref:Prep_Steps) to link a made task back to its step. `Days` is relative to the workshop date: -14 = two weeks before, 0 = the day of, 1 = the day after.
- Grist dates are seconds since epoch at UTC midnight. "Today" means America/Denver.
- Test everything against a throwaway Grist copy named `ZB-50-throwaway` (see task 49 for how the copy was made), emails to Landon only, then point at the real doc and activate. Delete the copy. Delete any file you write on the NUC that holds an email address.

## Do
1. **New workflow "Zion Bonsai: workshop prep tasks"** — every 15 minutes, no emails.
   - Workshops in scope: Date today or later, Status not Done or Cancelled.
   - For each in-scope workshop and each Active Prep_Step whose Formats is empty or contains the workshop's Format: if no Tasks row has that Workshop and Prep_Step, add one: Task = the Step text, Owner = the step's Owner, Due = workshop Date + Days (if that is before today, use today), Workshop, Prep_Step, Done false. Add all missing rows for a run in one request.
   - **Workshop moved:** remember each workshop's Date in static data. When it changes, shift Due on that workshop's not-Done prep tasks by the same number of days (keep the "not before today" rule). Seed the memory on the first run without changing anything.
   - **Workshop cancelled:** tick Done on its not-Done prep tasks (don't delete rows).
   - Check the Monday digest shows each task's workshop title; if it only shows the Task text, add " — <workshop title>" for tasks that have a Workshop. That's the only change allowed to the digest.
2. **Waitlist opening alert** — add to "Zion Bonsai: heads-up alerts" (same schedule, same once-only memory):
   - A workshop with Date today or later and Status On sale / Sold out / Waitlist, `Seats_Left >= 1`, and at least one Registration with Status Waitlist → email once: subject `A seat opened: <title> (<Mon D>)`. Body: seats left; next on the waitlist = the Waitlist registration with the lowest row id (first name only, how many seats they asked for, and "needs 2 seats, only 1 open" when that's the case); then "Open Workshop day, select their card and press Offer the seat, then get in touch."
   - Re-arm for that workshop when Seats_Left goes back to 0 or the waitlist empties, so a later opening alerts again.
3. **Docs:** add both to the "Alerts and the Monday digest" section of `docs/grist-sync.md`, plus one line in `docs/grist-workspace.md` under a "Prep steps" heading telling Cass that editing Prep_Steps changes what future workshops get (existing tasks stay as they are). Don't commit.

## Don't
- Don't change Grist schema or the Prep_Steps rows. Don't touch the other workflows beyond what's listed. Never print or write email addresses or keys.

## Done when
- On the copy: a new future workshop got exactly the matching prep tasks with the right Due dates; moving its date shifted them; cancelling ticked them Done; a second run added nothing. A waitlist opening sent one email to Landon, and a second run didn't repeat it.
- Both workflows active on the real doc; backup path reported; copy deleted.
