# Finding your way around Grist

The Zion Bonsai doc has four day-to-day pages at the top of the page list, then the raw tables underneath. Nothing here changes what the website shows. It only changes how the doc looks and what's on each screen.

## The pages

**Calendar.** Workshops on top, with the tasks due and the trees ready for shaping side by side underneath. Click an event to open its row. Switch between month, week and day in the calendar's top bar.

**Workshop day.** Pick a workshop on the left (newest first) and everything about it fills in on the right:

- the checklist: Group Photo, Care Sent, Survey Sent
- who's booked, as cards: name, guest, seats, status, attended, notes
- the trees potted at that workshop
- the feedback it got

Tick **Attended** on a card as people arrive. Add a registration here and it lands on the right workshop automatically.

**Landon's tasks** and **Cass's tasks.** Each person's open tasks, plus anything marked **Both**, soonest due first. Tick **Done** and the task drops off the list (it's still in the Tasks table).

**Tables** (Organizations, Contacts, Agreements, Workshops, Registrations, Trees, Inventory, Feedback, Tasks, Site_Sync). The same raw tables as before.

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

## If something looks wrong

- **Delete a page.** Hover over its name in the left panel, open the menu, choose Remove. Removing a page never deletes data; the tables stay in Raw data. If Grist ever asks whether to delete the table too, say no.
- **Turn off a color.** Open the table's page, then Row style (or the column's Cell style for Status) in the right panel, and delete the rule.
- **Go back to before all this.** A full copy of the doc from before the change is saved on Landon's Mac at `~/zion-bonsai-backups/grist-before-45-<date>.grist`. Ask Landon to restore it. Anything entered after the backup would need re-entering, so try the two steps above first.
