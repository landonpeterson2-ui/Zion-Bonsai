# 45 — Grist workspace: pages, calendars, colors

Make the Zion Bonsai Grist doc feel like a work app rather than a spreadsheet, using only Grist's own settings (no code in Grist, no fork). Parallel with 46 and 47.

## Context
- Doc API: `GRIST_DOC_API` in `.env.local` (default in `scripts/sync-grist.mjs`), key `GRIST_API_KEY`. Reachable over the tailnet. The UI is `http://nuc.pug-scylla.ts.net:8484`. Never print the key.
- Grist is `gristlabs/grist:latest` in Docker on the NUC (`ssh nuc`). Cass uses this doc daily. Read `docs/grist-sync.md` first: webhooks on Workshops, Registrations, Contacts, Organizations and Feedback trigger the site sync, and calculated columns are locked by an access rule.
- Existing pages: one raw-data page per table (Organizations, Contacts, Agreements, Workshops, Registrations, Trees, Inventory, Feedback, Tasks, Site_Sync). No conditional formatting anywhere yet.
- Work through `POST $DOC/apply` with Grist user actions (e.g. `CreateViewSection`, `UpdateRecord` on `_grist_Views_section` / `_grist_Views_section_field` / `_grist_Pages`, `AddEmptyRule`, `_grist_Filters`). Check the action names and argument shapes in the grist-core source (`sandbox/grist/useractions.py`, `app/client/models/entities/ViewSectionRec.ts`), not from memory. Test each kind of change on a throwaway copy of the doc first if you're unsure (copy via `POST /api/docs/{id}/copy` or the UI, then delete the copy).

## Before anything
Download a backup: `GET $DOC/download` → save to `~/zion-bonsai-backups/grist-before-45-<date>.grist` on this Mac (create the folder; it holds personal data, so never put it in the repo or the scratchpad of a shared location). Report the path.

## Do
1. **New pages** (put them at the top of the page list, in this order; keep the raw-data pages below them, indented under a "Tables" grouping if Grist's page indentation makes that easy):
   - **Calendar** — the built-in Calendar custom widget (`https://gristlabs.github.io/grist-widget/calendar/index.html`, the one Grist offers under Add widget → Calendar) on Workshops, mapped to `Date` and `Title`. A second calendar section on Tasks (`Due`, `Task`). A third on Trees (`Shaping_Due`, `Species`), titled "Shaping due". If the calendar's column mapping can't be set reliably through the API, create the sections and list the exact clicks to finish them under "Landon: finish in the UI" in your report.
   - **Workshop day** — left: Workshops as a list (Title, Date, Status, Seats_Left), sorted by Date descending. Right, linked to the selected workshop: Registrations as **cards** (Attendee_Name, Guest_Name, Seats, Status, Attended, Notes), Trees (Owner, Species, Pot), Feedback (Rating, Comment). Plus a small card of the workshop's checklist fields (Group_Photo, Care_Sent, Survey_Sent).
   - **Landon's tasks** and **Cass's tasks** — Tasks where Owner is that person or "Both", Done hidden (filter), sorted by Due ascending. Columns: Task, Due, Workshop, Contact, Done.
2. **Registrations.Attendee_Name** — new formula column `$Contact.Name`. Add it to the existing "Calculated column…" access rule so it can't be typed over. Don't change any other schema.
3. **Row/cell colors** (conditional formatting, on the sections where people see them — the raw-data pages and the new pages). Use these fills and text only (brand palette, readable):
   - red-ish fill `#F6D9CE`, text `#8F3E23` (clay-dark); amber fill `#F3E6C8`, text `#4A3426`; green fill `#E3ECD0`, text `#2F3B22`; muted text `#8A8178`.
   | Where | Rule | Style |
   |---|---|---|
   | Tasks rows | `not $Done and $Due and $Due < TODAY()` | red |
   | Tasks rows | `$Done` | muted |
   | Inventory rows | `$Needs_Reorder` | amber |
   | Agreements rows | `$Heads_Up` or (`$Days_Left` is not None and `0 <= $Days_Left <= 30`) | amber |
   | Contacts rows | `$Duplicate_Email` | red |
   | Registrations rows | `$Check` | red |
   | Registrations `Status` cell | Paid / Comped → green; Pending → amber | |
   | Workshops rows | `$Ready_For_Site and $Show_On_Site` | amber (it's waiting to publish) |
   | Workshops rows | `$Status in ("Done", "Cancelled")` | muted |
   | Site_Sync rows | `$Result == "Not published"` | red |
   | Trees rows | `$Shaping_Due and $Shaping_Due <= TODAY() + datetime.timedelta(days=14) and $Return_Status in ("Not yet due", "Invited")` | amber |
4. **Docs.** Write `docs/grist-workspace.md`: short, for Cass and Landon: what each new page is for, what each color means, how to undo (backup path pattern, and "delete the page" is safe — it never deletes data). Keep the tone of `docs/update-the-site.md`.

## Don't
- Don't change, rename or delete existing columns, formulas, access rules (except adding Attendee_Name to the calculated-column rule), webhooks or data rows.
- Don't delete existing pages.
- Don't touch n8n or the repo's code. Don't commit; leave `docs/grist-workspace.md` uncommitted and say so.
- Don't add custom widgets other than the Calendar (task 47 makes the board and sign-in sheet).

## Done when
- Backup exists. The four new pages exist and render (confirm via `_grist_Views`/`_grist_Views_section` SQL, and the sections have the right links/filters/sorts).
- Each color rule exists on the right section/column (show the SQL that proves it).
- `npm run sync:grist -- --check` still runs clean (no new errors).
- Report lists anything Landon has to click by hand, precisely.
