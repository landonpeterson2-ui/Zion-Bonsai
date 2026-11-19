# 53 — Grist phone pages: My work, lists, a better board, Start here

Make the Zion Bonsai Grist doc as easy on a phone as Landon's CUTF planning doc. The rule from CUTF: someone who has never seen Grist opens a page on their phone and knows what to do. Every everyday page is one widget, big tap targets, no grid, and says what to do on it.

## Context — read first
- The model to copy: `~/central-utah-tree-festival/src/grist/` (`my-work.html`, `list.html`, `board.html`, `welcome.html`, `icons.js`) and its page builder and docs on the CUTF server: `ssh landon@cutf 'cat /opt/cutf/PAGES.md /opt/cutf/build_pages.py'`. Read-only there: change nothing on `cutf`. It's Landon's own code; port freely.
- This repo: `public/grist/board.html` and `sign-in.html` (our current widgets), `docs/grist-widgets.md`, `docs/grist-workspace.md`, task files 45, 47, 48 for how pages and custom sections were built through the API. Scratchpad scripts from earlier rounds aren't available; the patterns are in those task files and below.
- Grist doc API: `http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b`, key `GRIST_API_KEY` in `.env.local`, workspace id 3. Grist here has no logins (everyone is the default owner), so there is no "who am I": people tap their name once and the widget remembers it in `localStorage` (wrap in try/catch).
- Custom section pattern: section `options.customView = {mode:"url", url, access:"full", columnsMapping:{slot: colRef or [colRefs]}, widgetOptions:{…}}` pre-grants access (Landon confirmed no prompt). Widget URLs have no `.html` (Cloudflare redirects).
- Relevant tables: `Tasks` (Task, Owner Choice Landon/Cass/Both, Due, Workshop, Agreement, Contact, Done, Due_Soon*, Prep_Step), `Contacts` (First_Name, Last_Name, Email, Phone, Town, Contact_Type, Lead_Source, Email_OK, Photo_OK, In_App, Notes, Name*), `Workshops` (Title, Date, Status, Format, Seats_Left*, Group_Photo, Care_Sent, Survey_Sent, Notes), `Trees` (Owner, Workshop, Species, Growth_Stage, Return_Status, Shaping_Due*, Notes), `Inventory` (Item, Category, On_Hand, In_Kit, Short_By*, Needs_Reorder*, Notes), `Feedback` (Contact, Workshop, Rating, Comment, OK_To_Quote). `*` = formula.

## Look
Zion Bonsai brand, not CUTF's: colors from the token table in `CLAUDE.md` (hex is fine inside these standalone widget files, but only those values; `clay` text only on `paper`/`linen`), Montserrat 600 small tracked uppercase for labels and buttons, Open Sans body, Cormorant Garamond only for a page heading ≥24px. Buttons 3px radius, ≥44px tall. No emoji, no icons beyond thin-line SVG if needed. Overdue = a muted clay tint, due soon = sandstone tint, done = faded. Check contrast stays AA.

## Do
1. **Widgets** in `public/grist/` (port from CUTF, restyle, strip CUTF-only logic):
   - `my-work.html`: on `Tasks`. Top: next workshop and a countdown ("Bonsai Basics, Sat Nov 22 — in 5 days"), read from `Workshops` (Date ≥ today, Status not Cancelled/Done). Tap your name (Landon / Cass); "Not you?" to switch. Your open tasks (Owner = you or Both) as cards, soonest first, overdue and due-in-3-days tinted, each with a big **Done** button and its workshop's title. "+ Add a task" (task, due date, optional workshop; Owner = you). Tap a title to change due date, workshop or notes. A folded "Done lately" (last 14 days) with Undo.
   - `list.html`: CUTF's reusable list (search, subtitle, detail, date, Call/Text/Email buttons, tappable check boxes, locked formula checks shown dashed and saying why when tapped, add button, edit sheet, read-only and add-only options, searchable reference picker). Drop CUTF-only bits (`taskFrom`, Givebutter wording, year filter unless trivial).
   - `board.html`: upgrade ours with CUTF's board behaviour (one lane at a time with tabs on a phone, drag on a computer, tap a card for details, "Show:" lane toggles) **keeping our mapping slots and options** (Lane, Title, Date, Detail; `hidden`) so the existing Boards page keeps working unchanged.
   - `start.html`: "Start here" page, no mapping: what each page is for in one line each, how Done/Undo work, and that history lives in Document history. Write it in the site's voice (warm, short). The Quick add form links come from widget options (`forms: [{label,url}]`), not hardcoded.
   - `icons.js` + icons: home-screen icon from `public/ZB Logo Transparent.png` (don't redraw, recolor or crop; pad onto a `paper` square). Title "Zion Bonsai".
   - `npm run lint` and `npm run build` pass. Update `docs/grist-widgets.md` (one table row per widget and its slots/options). Commit on `grist-tools` (don't push or merge; Landon's reviewer merges to `main` so the widgets go live). **Stop and report** after this step; step 2 starts once the widgets are live.
2. **Practice copy** (after the widgets are on zionbonsai.com): copy the doc to `ZB-53-practice` in workspace 3, build the pages there, report its link. Pages:
   - **Start here** (right after Home): `start` widget.
   - **My work** (after Start here): `my-work` on Tasks. Move "Landon's tasks" and "Cass's tasks" under Tables (keep them).
   - **Phone book**: `list` on Contacts — title Name, subtitle Contact_Type and Town, Phone/Email, checks Email_OK, Photo_OK, In_App (In_App read-only: "Set by the Grow app"), edit fields First/Last name, Email, Phone, Town, Contact_Type, Notes; "+ Add a person".
   - **Workshop checklist**: `list` on Workshops — title Title, date Date, subtitle Status and Seats_Left, checks Group_Photo, Care_Sent, Survey_Sent.
   - **Kit and supplies**: `list` on Inventory — title Item, subtitle Category, detail On_Hand and Short_By, checks In_Kit and Needs_Reorder (locked); "+ Add an item".
   - **Trees**: `list` on Trees — title Species, subtitle Owner and Workshop, date Shaping_Due, edit Growth_Stage, Return_Status, Notes; "+ Add a tree".
   - Every page gets a one-line "what to do here" (widget heading or option).
   - Keep page order: Home, Start here, My work, Calendar, Workshop day, Plan a workshop, Boards, Phone book, Workshop checklist, Kit and supplies, Trees, Sign-in sheet, People, Season, Quick add, Tables (with children). Indented children under Tables stay.
   - Check with a colId diff that nothing was renamed; `npm run sync:grist -- --check` output unchanged against the copy (`GRIST_DOC_API=<copy url>`). **Stop and report** the practice link so Landon can try it on his phone.
3. **For real** (only when told): backup to `~/zion-bonsai-backups/grist-before-53-<date>.grist`, apply the same build to the live doc, move the practice copy to trash, update `docs/grist-workspace.md` ("Phone pages" section for Cass), tick 53 in `STATUS.md`. Don't commit beyond step 1's commit plus a docs commit.

## Don't
- No schema changes except `Tasks.Notes` (Text, label "Notes") and `Tasks.Done_On` (Date, label "Done on", description "Filled in by My work when you tap Done."); untie colId before labelling. No changes to n8n, the site's pages, or `cutf`. Never print or write emails, phones, names or keys in reports or files outside Grist.

## Done when
- Step 1: four widgets + icons committed, lint/build pass, docs updated.
- Step 2: practice copy link reported; colId diff clean; sync check unchanged.
- Step 3: live doc has the pages; backup path reported; practice copy trashed.
