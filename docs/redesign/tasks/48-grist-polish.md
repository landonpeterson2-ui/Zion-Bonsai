# 48 — Grist polish: friendly labels, tidy tables, new-workshop defaults

Make the Grist doc nicer to type into. Settings and formulas only. After 45. Parallel with 46.

## Context
- Read `docs/grist-sync.md`, `docs/grist-workspace.md` and task 45's file first. Same API, key and safety rules as task 45 (`.env.local`, `POST $DOC/apply`, look up action shapes in grist-core source, never print keys or personal data).
- **Column ids are a contract.** `scripts/sync-grist.mjs`, `scripts/sync-brevo.mjs`, `scripts/grist-log.mjs`, the n8n workflows, access rules and formulas all use colIds like `Seats_Left`. In Grist, changing a column's label also renames its id **unless** `untieColIdFromLabel` is true. Set `untieColIdFromLabel: true` on a column *before* (or in the same `UpdateRecord` as) changing its label, and verify afterwards that every colId is unchanged (dump `select t.tableId, c.colId from _grist_Tables_column ...` before and after and diff them; they must be identical).
- Test the whole thing on a throwaway copy first (`POST /api/docs/{id}/copy`), run the colId diff and `npm run sync:grist -- --check` against the copy (`GRIST_DOC_API` pointed at it), then apply to the real doc and delete the copy.

## Before anything
Backup to `~/zion-bonsai-backups/grist-before-48-<date>.grist`.

## Do
1. **Labels.** Every user-visible column in every table gets a plain label: underscores to spaces, sentence case ("Seats left", "Ready for site", "Email OK", "Shaping due"). Leave labels that are already single plain words. Keep ids.
2. **Descriptions.** Give each column a one-line description (the column's `description` field, shown on hover): what it is, and either "Type this" or "Calculated — don't type here" for formula columns. For columns that drive the site or Brevo, say so ("Ticking this adds them to the newsletter", "Controls whether it shows on zionbonsai.com"). Use `docs/grist-sync.md` and the formulas to get these right; don't guess. Plain, warm, short.
3. **Choice colors.** Set `choiceOptions` fill/text colors on: Workshops.Status (Planning grey, On sale green, Sold out clay, Waitlist amber, Done and Cancelled muted), Registrations.Status (Paid/Comped green, Pending amber, Waitlist amber, Refunded/Cancelled grey), Trees.Return_Status, Tasks.Owner, Agreements.Status. Palette: green `#E3ECD0`/`#2F3B22`, amber `#F3E6C8`/`#4A3426`, clay `#F6D9CE`/`#8F3E23`, grey `#E9DFD2`/`#4A3426`, muted `#F4EEE6`/`#8A8178`. Keep the existing `choices` lists exactly.
4. **Tidy the raw pages.** On each table's main page (views 2–11), order fields: the columns people type first (in a sensible reading order), then calculated ones. Hide from the page (not delete) columns nobody reads day to day: Workshops `Slug`, `Time`, `Price_Label`, `Seats_Taken`; Registrations `Expected`; Contacts `Duplicate_Email` (rows already turn red). List any other you hide, with a reason. Keep `Ready_For_Site` and `Check` visible.
5. **New-workshop defaults.** Trigger formulas that apply **only on new records** (not on change) for Workshops: `Status` = "Planning" (so nothing goes on sale by accident), and `Format`, `Venue`, `Capacity`, `Start`, `End`, `Price_Single`, `Price_Pair`, `Registration_Form` copied from the most recent existing workshop by Date (excluding the new row itself). Check the trigger-formula settings (`isFormula: false` + `formula` + `recalcWhen`/`recalcDeps`) in the grist-core source. Test on the copy by adding a row via the API and checking the values, then delete that test row.
6. **Docs.** Add a short "What changed (task 48)" section to `docs/grist-workspace.md`: hover a column header for what it means, chip colors, new workshops start pre-filled and in Planning.

## Don't
- Don't change any colId, formula (other than adding the trigger formulas), access rule, webhook, data row, or the pages from task 45.
- Don't touch n8n. Don't commit.

## Done when
- Backup exists; colId diff before/after on the real doc is empty (show it).
- `npm run sync:grist -- --check` output is the same before and after.
- A test new Workshops row on the copy got the defaults (show values), and the copy is deleted.
