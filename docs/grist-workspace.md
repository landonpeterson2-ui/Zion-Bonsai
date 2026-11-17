# Finding your way around Grist

The Zion Bonsai doc opens on **Home**. The day-to-day pages come next, and the raw tables are tucked under **Tables** at the bottom (click the arrow beside it to show or hide them). Nothing here changes what the website shows. It only changes how the doc looks and what's on each screen.

## The pages

**Home.** What needs you, at a glance. Upcoming workshops as cards (seats taken, seats left, anything the site is waiting on) on the left. On the right, only when there's something to show: tasks due this week or overdue, registrations with a problem, kit items we're short of for upcoming workshops, and agreements ending within 30 days or with a heads-up.

**Calendar.** Workshops on top, with the tasks due and the trees ready for shaping side by side underneath. Click an event to open its row. Switch between month, week and day in the calendar's top bar.

**Workshop day.** Pick a workshop on the left (newest first) and everything about it fills in on the right:

- the checklist: Group Photo, Care Sent, Survey Sent
- who's booked, as cards: name, guest, seats, status, attended, notes
- the trees potted at that workshop
- the feedback it got

Tick **Attended** on a card as people arrive, or press **Check everyone in** beside the checklist to tick every Paid and Comped booking at once, then untick anyone who didn't come (Ctrl+Z undoes the button too). The button only works from the workshop's date on, because ticking Attended starts the welcome emails. Add a registration here and it lands on the right workshop automatically.

**People.** Pick a person on the left to see their details, the workshops they've booked, their trees, their feedback and any agreements they're the contact for.

**Landon's tasks** and **Cass's tasks.** Each person's open tasks, plus anything marked **Both**, soonest due first. Tick **Done** and the task drops off the list (it's still in the Tasks table).

**Tables** shows the latest site syncs. Under it are the raw tables (Organizations, Contacts, Agreements, Workshops, Registrations, Trees, Inventory, Feedback, Tasks, Site_Sync). The same raw tables as before.

Registrations has a new locked column, **Attendee Name**, which shows the contact's name so a booking reads as a person and not a row number.

## What the colors mean

| Color | Where | Means |
|---|---|---|
| Red | Tasks | Not done and past its due date |
| Red | Contacts | Same email on more than one contact |
| Red | Registrations (row) | **Check** has something to say |
| Red | Site_Sync | **Not published**: read Details |
| Amber | Workshops | Ready and waiting to publish to the site |
| Amber | Inventory | Needs reordering |
| Amber | Agreements | Ends within 30 days, or past its end date but still active |
| Amber | Trees | Shaping is due within two weeks (and they haven't returned yet) |
| Green | Registrations, **Status** cell | Paid or Comped |
| Amber | Registrations, **Status** cell | Pending |
| Grey text | Tasks | Done |
| Grey text | Workshops | Done or Cancelled |

The colors are rules, not data. They update by themselves and you can't break anything by looking at them.

## What changed (task 48)

- **Hover a column header** and a short note says what it is, and whether you type it or Grist works it out ("Calculated, don't type here"). Columns that drive the site or the newsletter say so, for example **Email OK** and **Status** on Workshops.
- **Labels are plain words** now ("Seats left", "Ready for site", "Email OK"). Only the labels changed. Behind the scenes every column keeps its old name, so the site sync, Brevo and the n8n workflows aren't affected.
- **Status chips have colors:** Workshops (grey Planning, green On sale, clay Sold out, amber Waitlist, faded Done and Cancelled), Registrations (green Paid and Comped, amber Pending and Waitlist, grey Refunded and Cancelled), Trees **Return status**, Tasks **Owner** and Agreements **Status**.
- **The table pages are tidier:** the columns you type come first, then the calculated ones. A few you rarely need are out of the way (Workshops: Slug, Time, Price label, Site status; Registrations: Expected, Attendee name). They still exist; open the column list at the top of the page (Hidden columns) to bring one back. **Ready for site** and **Check** are on the page.
- **New workshops start pre-filled and in Planning.** Add a row to Workshops and Format, Venue, Capacity, Start, End, both prices and the registration link are copied from your most recent workshop by date, so you only change what's different. Status is **Planning**, so nothing goes on sale by accident. Change it to **On sale** when it's ready. Changing a workshop later never re-fills these.

## If something looks wrong

- **Delete a page.** Hover over its name in the left panel, open the menu, choose Remove. Removing a page never deletes data; the tables stay in Raw data. If Grist ever asks whether to delete the table too, say no.
- **Turn off a color.** Open the table's page, then Row style (or the column's Cell style for Status) in the right panel, and delete the rule.
- **Go back to before all this.** A full copy of the doc from before the change is saved on Landon's Mac at `~/zion-bonsai-backups/grist-before-45-<date>.grist`. Ask Landon to restore it. Anything entered after the backup would need re-entering, so try the two steps above first.

## Boards and the sign-in sheet

**Boards.** Two boards, one above the other. *Workshops by status* has a lane for each Status (Cancelled is hidden; tick it in the bar at the top to show it). *Tree returns* has a lane for each Return Status. Drag a card to another lane to change its status.

**Sign-in sheet.** Pick a workshop on the left and the sheet on the right fills in for it. Use it to print the sign-in sheet or the name tags on the day. The first time you open either page, Grist may ask you to allow the widget "Full document access". Say yes; these widgets come from our own website.

## Home, People and check-in (Nov 2026)

New locked columns that feed these pages: Workshops **Upcoming** and **Check-in button**, Tasks **Due soon**, Agreements **Needs a look**, Inventory **Needed for upcoming** and **Short by**. Short by counts one of each kit item per seat taken (Paid, Comped, Pending) across all upcoming workshops, against **On hand**. Keep On hand current or it will flag everything as short. Kit rows turn red when short.

The check-in button is Grist's Action Button widget (gristlabs.github.io), reading the Check-in button column.
