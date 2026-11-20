# 55 — Gift cards in Grist

Implement the Grist parts of `docs/redesign/gift-cards-handoff.md` (sections 1, 2, 3 steps 1–3, 4, 5, 6 including the optional Shaping_Window_Ends, and the acceptance checks). The spec is the authority; this file only adds how.

## How
- Read `docs/grist-sync.md` and task files 45, 48, 53 for API patterns. Doc API `http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b`, key `GRIST_API_KEY` in `.env.local`, workspace 3.
- **Rehearse on a fresh copy of the live doc** (`ZB-55-throwaway`, `POST /docs/{live}/copy`), run every acceptance check there with test rows, then delete the copy. On the live doc: back up to `~/zion-bonsai-backups/grist-before-55-<date>.grist`, apply the same build, then verify with **no test rows** (n8n watches the live doc): no formula errors in any column, Registrations non-blank Check count unchanged, a colId diff shows only the new columns/table, `npm run sync:grist -- --check` output unchanged, the seven tasks present.
- Untie colId with a separate `UpdateRecord` before setting a label. Merge choices into existing widgetOptions (keep `choiceOptions` colors). Read existing formulas from `_grist_Tables_column` and splice; never retype them.
- New formula columns go into the calculated-column `-U` access rule like earlier rounds.
- Page: "Gift cards" goes in the page order after "Quick add". Custom/record sections need a real `tableRef`; afterwards `select count(*) from _grist_Views_section_field f left join _grist_Tables_column c on c.id=f.colRef where c.id is null` must be 0 and no stray `Table1`.
- Don't set any real workshop to Tentative (task 56 ships the site support first).
- Docs: a "Gift cards" section in `docs/grist-workspace.md` for Cass (how to log a sale, link it on a registration, saucers). Don't commit; don't touch other docs.

## Don't
- Never store or print a full gift card number; never print emails, names, phones or keys. No changes to n8n.
