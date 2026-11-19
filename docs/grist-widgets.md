# Grist widgets: phone pages, board and sign-in sheet

Small custom widgets live in this repo and deploy with the site. They are plain HTML files. They only run inside Grist (in your browser, on the tailnet); your data is never sent to the site or to Cloudflare. Grist asks you to approve the access level the first time.

| Widget | URL | Add it to | Access |
|---|---|---|---|
| Board | `https://zionbonsai.com/grist/board` | Workshops (by Status) or Trees (by Return_Status) | Full document access |
| Sign-in sheet | `https://zionbonsai.com/grist/sign-in` | Registrations, linked to a Workshops section | Full document access |
| My work | `https://zionbonsai.com/grist/my-work` | Tasks | Full document access |
| List | `https://zionbonsai.com/grist/list` | Contacts, Workshops, Inventory or Trees (any table) | Full document access |
| Start here | `https://zionbonsai.com/grist/start` | Any table (no mapping) | None |
| What's coming | `https://zionbonsai.com/grist/schedule` | Workshops (no mapping) | Full document access |
| Workshop day | `https://zionbonsai.com/grist/workshop` | Workshops (no mapping) | Full document access |

Mapping slots and options at a glance (details in the sections below):

| Widget | Mapping slots | Options |
|---|---|---|
| Board | Lane (required, Choice), Title (required), Date, Detail | `hidden` (lanes unticked in "Show:"), `hint` (one line: what to do here) |
| Sign-in sheet | Name, Guest, Seats, Status, Workshop | none |
| My work | none (reads Tasks and Workshops by name) | none |
| List | Title (required), Subtitle (several), Detail (several), Date, Phone, Email, Checks (several true/false), Consent, Edit (several) | `hint`, `addLabel`, `readOnly` (column ids), `addOnly` (column ids), `notes` ({ColId: "why it's locked"}) |
| Start here | none | `forms`: `[{label, url}]` for the Quick add buttons |
| What's coming | none (reads Workshops, Tasks, Trees, Agreements, Contacts by name) | none |
| Workshop day | none (reads Workshops, Registrations, Contacts, Trees, Feedback by name) | none |

`icons.js` is for the NUC's `GRIST_INCLUDE_CUSTOM_SCRIPT_URL`: `https://zionbonsai.com/grist/icons.js` gives every Grist page the Zion Bonsai home-screen icon (`icon-32/180/192.png`, the logo on a paper square) and the title "Zion Bonsai".

Full access is needed (except for Start here) because the board reads the choice order of the Lane column and writes the move, and the sign-in sheet reads the workshop's title and date from the Workshops table. The pages are ours and contain no third-party code besides Grist's own plugin script and the Google Fonts stylesheet.

## Adding one

1. Open the page, then **Add New → Add Widget to Page**.
2. Pick **Custom**, choose the table, and (for the sign-in sheet) set **Select By** to the Workshops section.
3. In the right panel, under **Widget**, choose **Custom URL**, paste the URL from the table above, and click the green tick if it shows one.
4. Grist asks for access. Choose **Full document access**.
5. Map the columns (right panel, "Pick a column" boxes), as below.

## Board

| Slot | Workshops | Trees |
|---|---|---|
| Lane (required, a Choice column) | Status | Return_Status |
| Title (required) | Title | Species |
| Date (optional) | Date | Shaping_Due |
| Detail (optional) | Format or Seats_Left | Owner |

- One lane per choice, in the column's own order, plus "(none)" when some rows are blank. Cards sort by date, oldest first.
- Drag a card to another lane, or use the **Move to…** box on the card (works on a phone and with the keyboard). Click a card to select that row, so a section linked to this one follows it.
- Tick or untick a lane name in the bar at the top to hide or show it (for example Done and Cancelled). Grist remembers this when you save the widget options (the green highlight on the widget's icon, then Save).

- Phones: one lane at a time with tabs along the top. Computers: all lanes side by side. Tap a card to open its details (title, lane, date, and detail when they can be edited); Save writes it back.
- The existing slots and the `hidden` option are unchanged, so a Boards page set up with the old board keeps working.

## My work

On Tasks, no mapping. Phone-first page for one person.

- Top: the next workshop (Date today or later, Status not Cancelled or Done) and a countdown, from Workshops.
- Tap your name (Landon or Cass, from the Owner choices). This phone remembers it in its own storage; "Not you?" switches. There are no Grist logins here, so there is no automatic "who am I".
- Your open tasks (Owner is you or Both) as cards, soonest first. Overdue cards have a muted clay tint, due in 3 days a sandstone tint. **Done** has an Undo bar; **Done lately** (folded) lists the last 14 days with Undo.
- "+ Add a task": task, optional due date, optional workshop. Owner is you. Tap a title to change its name, due date, workshop or notes.
- Optional Tasks columns it uses if they exist: `Notes` (Text) for the notes field, `Done_On` (Date) so "Done lately" knows when a task was finished (it also writes today's date there on Done). Without `Done_On`, "Done lately" falls back to done tasks whose due date was in the last 14 days.

## List

Any table as searchable cards. Phone-first, no grid.

| Slot | Use |
|---|---|
| Title (required) | The card heading, e.g. Name, Species. Several columns are joined with spaces |
| Subtitle (several) | Small line under it, joined with " · ". Numbers and yes/no get their label ("Short by: 3") |
| Detail (several) | Lines under the subtitle, same labelling |
| Date | Shown after the subtitle |
| Phone, Email | Call, Text and Email buttons |
| Checks (several true/false) | Tap-to-tick boxes. Formula columns and `readOnly` ones are dashed and say why when tapped |
| Consent | True/false. False hides the Text button ("No texts") |
| Edit (several) | Extra columns shown in the edit sheet |

- Reference columns show the other table's name on the card, and open a drop-down (or a searchable picker above 12 choices) in the sheet.
- Options: `hint` is a line under the search box saying what to do on this page. `addLabel` (e.g. `+ Add a person`) turns on the big add button and Delete in the sheet. `readOnly` lists column ids that show in the sheet but can't be changed; `notes` gives the reason per column (e.g. `{"In_App": "Set by the Grow app"}`). `addOnly` lists columns offered only when adding. A page with neither `addLabel` nor editable fields is look-and-tick only.

## Start here

No mapping. Plain-language tour of the pages, how Done and Undo work, and that every change is kept in Document history. Quick add buttons appear when the `forms` option has links; nothing is hardcoded in the page.

## What's coming

On Workshops, no mapping. Replaces the computer calendar on a phone: one list grouped Today, This week, Next week, then "Week of Mon D". The last 30 days fold under **Earlier**; open tasks that are overdue always show there, however old.

- Four kinds, each with a small label: workshops (time, seats left, status), open tasks that have a due date (big **Done** with Undo, which also sets `Done_On`), trees whose `Shaping_Due` falls in range, and agreements ending (not Expired or Declined, with `Heads_Up` if any). Cancelled workshops are left out.
- **Show:** tick boxes hide or show each kind. They are remembered on this phone (`localStorage`).
- Tap a workshop, tree or agreement for its details. Tap a task to change its name, due date or notes.

## Workshop day

On Workshops, no mapping. Runs one workshop from a phone.

- The picker starts on today's workshop, else the next upcoming, else the latest, and remembers your choice for the session (`sessionStorage`). Summary: date, time, "8 of 10 seats taken".
- **Checklist:** Group photo, Care sent, Survey sent as big toggles.
- **Check-in** and each guest's payment buttons are the document's own Action Button columns (`Workshops.Check_In_Button`, `Registrations.Payment_Buttons`). The widget decodes the values (`["L", ...]`, `["O", {...}]`) and shows one button per entry; tapping applies that entry's `actions` unchanged. An entry with no actions (for example "Status: Paid") is shown as a plain note. Payment and check-in rules stay in Grist; change them there. UpdateRecord actions get an Undo.
- **Guests:** one card per registration, sorted by name: guest, seats, status chip, the `Check` warning if any, a big **Here** toggle (Attended), and the payment buttons. Tap a name for Call, Text, Email, and to edit Seats, Status and Notes.
- **+ Add a guest** picks an existing contact (searchable) or adds a new one (first name, last name, email, phone), then creates the registration as Pending on this workshop.
- Folded at the bottom: trees potted at this workshop, and feedback (count and average rating).

## Sign-in sheet

On Registrations, with Select By set to the Workshops section.

| Slot | Column |
|---|---|
| Name | Attendee_Name |
| Guest (optional) | Guest_Name |
| Seats (optional) | Seats |
| Status | Status |
| Workshop (optional) | Workshop (gives the heading its title and date) |

- Shows Paid, Comped and Pending only. Seats 2 adds a second line: the guest's name, or "Guest of <name>".
- **Sign-in sheet**: Name, Signature / initials, Tree, Email OK? (blank to fill in by hand), sorted by last name.
- **Name tags**: first names large, two across, five down on a Letter page, with plain cut lines. A guest with no name gets a tag that says "Guest".
- **Print** opens the browser's print box. The controls are hidden and the page prints black on white.

## If something looks off

- "Open this inside Grist as a custom widget" means you opened the URL directly. That's expected.
- Blank board or sheet: check the column mapping in the right panel.
- Changes to these files reach Grist after the next site deploy; reload the Grist page to pick them up.
