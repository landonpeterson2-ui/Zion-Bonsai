# Grist widgets: board and sign-in sheet

Two small custom widgets live in this repo and deploy with the site. They are plain HTML files. They only run inside Grist (in your browser, on the tailnet); your data is never sent to the site or to Cloudflare. Grist asks you to approve the access level the first time.

| Widget | URL | Add it to | Access |
|---|---|---|---|
| Board | `https://zionbonsai.com/grist/board.html` | Workshops (by Status) or Trees (by Return_Status) | Full document access |
| Sign-in sheet | `https://zionbonsai.com/grist/sign-in.html` | Registrations, linked to a Workshops section | Full document access |

Full access is needed because the board reads the choice order of the Lane column and writes the move, and the sign-in sheet reads the workshop's title and date from the Workshops table. The pages are ours and contain no third-party code besides Grist's own plugin script and the Google Fonts stylesheet.

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
