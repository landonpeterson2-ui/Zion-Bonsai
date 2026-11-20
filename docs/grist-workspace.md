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

**Plan a workshop.** The workshop list on the left and one workshop as a form on the right, so you can fill in everything without scrolling sideways. New workshops start pre-filled from the last one and in Planning.

**People.** Pick a person on the left to see their details, the workshops they've booked, their trees, their feedback and any agreements they're the contact for.

**Season.** How the year is going, as charts: seats taken against capacity per workshop, revenue and what was left after costs, how people heard about us, and how many workshops each person has come to. A plain table of the same numbers sits underneath.

**Quick add.** Three short forms, easiest on a phone: **New task**, **Add a tree**, **Log feedback**. They're published, so each has its own link that opens without the rest of Grist (only on the tailnet, like Grist itself):

- New task: http://nuc.pug-scylla.ts.net:8484/forms/e15KbpcguFa7PY8NKpRBnx/65
- Add a tree: http://nuc.pug-scylla.ts.net:8484/forms/e15KbpcguFa7PY8NKpRBnx/66
- Log feedback: http://nuc.pug-scylla.ts.net:8484/forms/e15KbpcguFa7PY8NKpRBnx/67

Save them to your phone's home screen. Unpublish from the form's page if you ever want them off.

**Landon's tasks** and **Cass's tasks.** Each person's open tasks, plus anything marked **Both**, soonest due first. Tick **Done** and the task drops off the list (it's still in the Tasks table).

**Tables** shows the latest site syncs. Under it are the raw tables (Organizations, Contacts, Agreements, Workshops, Registrations, Trees, Inventory, Feedback, Tasks, Site_Sync, Prep_Steps). The same raw tables as before.

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

## Smoother typing (Nov 2026)

- **Paid by Square / Venmo / Cash.** Select a Pending or Waitlist booking (a card on Workshop day, or a row on the Registrations page) and press one button. It sets Status to Paid, Amount paid to the expected price and the payment method. If the workshop has no price, Amount paid stays blank and the row turns red until you fill it in.
- **Shorter dropdowns.** Picking a workshop on a registration or a task only lists workshops that are Planning, On sale, Sold out or Waitlist. To file something against a finished workshop, change its Status back for a moment, or type in the Registrations table's Workshop column after clearing the condition in column settings.
- **Sorted tables.** Workshops newest first, Contacts and Organizations A–Z, Registrations by workshop then name, Tasks open first by due date, Site_Sync newest first. The first column stays put when you scroll sideways, and long text (Notes, Comment, Check…) wraps.

## Undo and history

- **Ctrl+Z** (Cmd+Z on a Mac) undoes the last change, including button presses. Ctrl+Shift+Z redoes.
- **Document history** (the clock icon at the top right, or the doc menu): the **Activity** tab shows every recent change and who made it; **Snapshots** has automatic saved copies of the whole doc. Open one to look around, and **Replace original** puts it back. Nothing is lost by looking.
- Landon also keeps a copy before each big change in `~/zion-bonsai-backups/` on his Mac.

## Waitlist, duplicates and trees (Nov 2026)

- **Offer the seat.** When a seat opens, Landon and Cass get an email naming who's next on the waitlist. On Workshop day, select that person's card and press **Offer the seat**: it moves them to Pending so the seat is held. Then get in touch; once they pay, use the Paid by buttons as usual.
- **Merge duplicates.** If someone is in Contacts twice with the same email, the **Duplicate?** button (on People and on the Contacts page) says which copy is kept. Select the other copy and press **Merge**: its registrations, trees, feedback, tasks and agreements move over, blanks are filled in, and the copy is deleted. Ctrl+Z undoes it.
- **Trees.** A new tree's Date potted fills in from its workshop by itself (you can still change it). Shaping due is now nine months after potting, the same time the Grow app invites people back.

## Gift cards (Nov 2026)

Every gift card we sell on Square gets one row in **Gift cards** (page after Quick add; the raw table is under Tables as Gift_Cards). Square holds the full card numbers. Here we keep only the **last 4 digits**, never the whole number, and never paste a whole number into Notes either.

**Log a sale.** Add a row and fill in:
- **Card last 4** (exactly four digits), **Buyer** (pick from Contacts; add them there first if they're new), **Recipient name**, **Offer**, **Design**, **Delivery** and the **Square order #**.
- **Amount** fills in from the Offer ($100 Date Night for Two, $65 One Seat). For Other, type it. **Sold date** fills in as today. **Status** starts as Active.
- **Saucer owed** ticks itself for cards sold by Dec 31, 2026 (the free saucer). Untick it if a card shouldn't get one.
- **Check** says what's missing or off in plain words; the row turns red until it's blank.

**When someone books with a card.** On their registration, set **Payment method** to **Gift card** and pick the card in **Gift card** (it shows as last 4, who it's for and the amount). Put the amount taken off the card in **Amount paid**. One card can cover more than one booking. The card then shows which registrations used it, **Amount used** and **Balance** (by our records; Square's balance is the one that counts). When the balance hits zero, set the card's **Status** to **Used**. For a refunded or cancelled sale, set **Refunded** or **Void**; the registration's Check will complain if one is still linked.

**Saucers.** The **Saucers to hand out** table on the Gift cards page lists cards that are owed a saucer and haven't had it. Tick **Saucer given** when you hand it over. In **Inventory**, the row "Saucer (gift card offer)" shows **Owed to gift cards** and counts them in **Short by**. Enter its On hand when you've counted.

**Gift cards by design** (on the same page) counts how many of each of the five designs we've sold and the total.

**Tentative dates.** We post the whole year but confirm one quarter at a time. The current quarter's workshops are **On sale**. Every later 2027 date is entered as **Tentative**: the site shows the date marked tentative, with no Register button, so gift card buyers can see what's coming. A Tentative row needs only a date. At the start of each quarter, check that quarter's dates against holidays and local events, then change those rows from Tentative to On sale. Tentative workshops get no prep tasks; they appear on your task pages once a workshop goes On sale.

**Trees.** Shaping is due nine months after potting and the window closes twelve months after (**Shaping window ends**, calculated).

## Prep steps

The **Prep_Steps** table is the checklist every workshop gets (Step, Days before or after the date, Owner, Formats, Active). Editing it changes what future workshops get; tasks already made for a workshop stay as they are.

Each upcoming workshop gets its prep tasks automatically (on Landon's or Cass's task page, with due dates counted from the workshop). Move the workshop's date and they move with it; cancel it and they're ticked Done.

## Trees from the Grow app

When someone claims their tree in the Grow app with a workshop tag, it shows up in **Trees** by itself within about 15 minutes (with its owner and workshop), and the person gets a Contact with **In the Grow app** ticked if they didn't have one. When the app sends someone a return invitation, that tree's Return status changes to Invited. Leave **App tree id** alone; it's how the sync knows a tree is already here. Tick **Email OK** yourself as usual; the sync never does.
