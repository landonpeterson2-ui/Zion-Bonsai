# 47 — Grist custom widgets: board and sign-in sheet

Two small custom widgets for the Grist doc, served as static files from the site so they cost nothing and need no server. Parallel with 45 and 46. Task 45 adds `Registrations.Attendee_Name`.

## Context
- A Grist custom widget is an HTML page Grist shows in an iframe; it reads/writes rows through `grist-plugin-api.js` (`https://docs.getgrist.com/grist-plugin-api.js`). Read the current docs (https://support.getgrist.com/widget-custom/ and the API reference) before writing; don't work from memory. Use `grist.ready({ requiredAccess, columns })` column mapping so the widgets aren't tied to column names.
- Files go in `public/grist/` and deploy with the site to `https://zionbonsai.com/grist/...`. Only Landon's and Cass's browsers load them, inside Grist on the tailnet; the data never passes through Cloudflare. `public/_headers` sets no frame headers; keep it that way for `/grist/*` and confirm nothing else (next.config.js, OpenNext) blocks framing.
- These are standalone pages, not React: plain HTML + CSS + a little JS, no libraries besides the Grist plugin API, no build step. Look calm and match the site (paper `#F4EEE6`, linen `#FBF8F3`, forest `#2F3B22` text, clay `#A84A2B` accents, 1px `rgba(47,59,34,.15)` rules, 3px radius, Open Sans / Montserrat labels via Google Fonts or system fallback). Define the colors once as CSS variables at the top of each file.
- Add `<meta name="robots" content="noindex">` to each, and `disallow: '/grist/'` in `app/robots.ts`. Don't link them from the site or sitemap.

## Do
1. **`public/grist/board.html` — drag-and-drop board.**
   - Columns to map: **Lane** (a Choice column, required), **Title** (required), **Date** (optional), **Detail** (optional, any column shown small under the title). `requiredAccess: 'full'` (needed to read the Lane column's choices from `_grist_Tables_column` and to write).
   - One lane per choice, in the column's choice order, plus "(none)" for blanks if any exist. Cards sorted by Date. A "Show <choice>" toggle hides lanes the user doesn't want (persist per-widget with `grist.setOption`), so Cass can hide Cancelled/Done.
   - Drag a card to another lane → `grist.selectedTable.update({ id, fields: { [laneCol]: choice } })`. Also a small "Move to…" `<select>` on each card for keyboard and touch. Clicking a card sets the cursor (`grist.setCursorPos({ rowId })`) so linked sections follow.
   - Works for Workshops by Status and Trees by Return_Status without code changes.
2. **`public/grist/sign-in.html` — printable sign-in sheet and name tags.**
   - On Registrations, linked to a Workshops section. Map: **Name** (Attendee_Name), **Guest** (Guest_Name, optional), **Seats**, **Status**, plus optional **Workshop title** and **Workshop date** (Grist lets you map a formula column; if needed say in the docs to add `$Workshop.Title`-style columns, but prefer `grist.onRecords` + reading the linked workshop via `grist.docApi.fetchTable('Workshops')` with `requiredAccess: 'read table'` if that's allowed; otherwise `full`).
   - Shows only Paid, Comped and Pending rows. A pair (Seats 2) gets two lines: the attendee and the guest (or "Guest of <name>" if no guest name).
   - Two modes via a toggle: **Sign-in sheet** (workshop title + date heading, columns: Name, Signature/initials blank, Tree (blank), Email OK? (blank checkbox), sorted by last word of name) and **Name tags** (first names large in Cormorant-like serif fallback, 2 × 5 grid per Letter page, for Avery 5395-style sheets is a nice-to-have, plain cut lines are fine).
   - A Print button; `@media print` hides the controls and prints clean black-on-white.
3. **`docs/grist-widgets.md`** — for Landon: each widget's URL, which table/section to add it to, the column mapping, access level to grant, and the exact clicks (Add widget → Custom → Enter custom URL...). Short.

## Don't
- No changes to Grist itself, n8n, or any site page/component. No new npm dependencies.
- Don't commit (Landon's reviewer commits after 45/46 land); leave files uncommitted and list them.

## Done when
- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
- Both pages open in the dev server at `/grist/board.html` and `/grist/sign-in.html` without console errors outside Grist (they should show a short "Open this inside Grist as a custom widget" note when not framed).
- Logic is checked against a local mock: write a throwaway test harness in the scratchpad (not the repo) that stubs `window.grist` with sample Workshops/Registrations rows, and confirm lanes, moves (the update call payload), pairs, filtering and print layout. Report what you checked.
