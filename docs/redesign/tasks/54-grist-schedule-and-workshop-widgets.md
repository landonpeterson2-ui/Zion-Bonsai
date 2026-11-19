# 54 — Grist phone widgets: What's coming (replaces Calendar) and Workshop day

Follow-up to 53. Grist's calendar and the multi-section Workshop day page are unreadable on a phone. Replace each with one phone-first widget, same look and rules as 53's widgets.

## Context — read first
- Task 53 and the widgets it made: `public/grist/my-work.html` (closest model: reads tables by name, cards, sheets, Undo), `list.html`, `board.html`, `docs/grist-widgets.md`. Brand/look rules: the "Look" section of task 53 and `CLAUDE.md`.
- CUTF's "Message schedule" (grouped by week) is the model for What's coming: `ssh landon@cutf 'cat /opt/cutf/PAGES.md'` and the `group: "week"` code in `~/central-utah-tree-festival/src/grist/list.html`. Read-only.
- Tables (by name; `*` = formula): `Workshops` (Title, Date, Time*, Status, Format, Capacity, Seats_Taken*, Seats_Left*, Group_Photo, Care_Sent, Survey_Sent, Notes, Check_In_Button*), `Registrations` (Contact→Contacts, Workshop→Workshops, Seats, Amount_Paid, Status, Attended, Guest_Name, Notes, Payment_Method, Expected*, Check*, Attendee_Name*, Payment_Buttons*), `Tasks` (Task, Owner, Due, Workshop, Done, Done_On, Notes), `Trees` (Owner, Workshop, Species, Shaping_Due*, Return_Status), `Agreements` (Title, End_Date, Status, Heads_Up*), `Contacts` (Name*, Phone, Email), `Feedback` (Workshop, Rating).
- **Action-button columns are the source of truth.** `Check_In_Button` and `Payment_Buttons` are formula columns whose value is `{button, description, actions}` or a list of them (the same thing Grist's Action Button widget reads). Render one real button per entry, labelled `button`, and on tap apply its `actions` with `grist.docApi.applyUserActions`. Values from the REST/widget API may come encoded (`["L", …]` lists, `["O", {…}]` dicts) — decode before applying (task 48 hit this). An entry with empty `actions` is information: show its `button` text as a plain note, not a button. Don't re-implement payment or check-in logic.

## Do
1. **`public/grist/schedule.html` — "What's coming".** No mapping; full access. One list grouped Today / This week / Next week / Week of Mon D…, with past items folded under "Earlier" (last 30 days). Items, each with a small tracked label for its kind:
   - workshops (title, time, seats left, status), tasks not done (task, owner, overdue tint; big Done button that also sets Done_On), trees whose Shaping_Due falls in range ("Shaping due: <species> — <owner>"), agreements ending (End_Date, with Heads_Up if any).
   - "Show:" toggles for the four kinds (remembered in localStorage, try/catch). Tap a workshop to see its date, time, seats and checklist; tap a task to edit due date / notes like My work.
   - Hint line: "Everything coming up, week by week. Tap something to see more."
2. **`public/grist/workshop.html` — "Workshop day".** No mapping; full access.
   - Top: workshop picker (defaults to today's workshop, else the next upcoming, else the latest; remembered per session), with date, time, venue-free summary "8 of 10 seats taken".
   - Checklist: Group photo, Care sent, Survey sent as big toggles.
   - Check-in: the `Check_In_Button` entries as described above.
   - Guests: one card per registration for that workshop, sorted by name: Attendee_Name, guest, seats, status chip, Check text if any (as a warning line), a big **Here** toggle for Attended, and the `Payment_Buttons` entries (Paid by Square / Venmo / Cash, Offer the seat). Tap a name for a sheet: Call / Text / Email (from the Contact), Notes (editable), Seats, Status.
   - "+ Add a guest": searchable contact picker (or a new contact: first name, last name, email, phone) + seats; creates the Registration as Pending on this workshop.
   - Footer folds: trees potted at this workshop (count + list), feedback (count, average rating).
   - Hint line: "Pick the workshop. Tap Here as people arrive."
3. `node --check` each inline script; grep for CUTF names; `npm run lint` and `npm run build` (the build sometimes fails on a Next.js security notice after "Generating static pages"; rerun — that's unrelated). Add both to `docs/grist-widgets.md`. Commit on `grist-tools` (only these files; never AGENTS.md, .vscode/, docs/copy/welcome-series.md, docs/grist-sync.md, scripts/sync-brevo.mjs). Don't push. Stop and report.
4. (Later, when told) On the practice copy: new "Calendar" page = `schedule`, new "Workshop day" page = `workshop`, both with a real `tableRef` (Workshops) — never tableRef 0. Rename the old pages "Calendar (computer)" and "Workshop day (computer)" and move them under Tables.

## Don't
- No schema changes. Nothing on the live doc or `cutf`. Never print emails, phones, names or keys.
