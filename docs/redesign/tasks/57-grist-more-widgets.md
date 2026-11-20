# 57 — Grist widgets, round 3: gift cards, packing, season, trees, follow-ups, feedback, partners

Seven more phone-first widgets in the style of 53/54. Two builders split them (Part A and Part B) and work at the same time in the same checkout, so each touches **only its own files**.

## Context — read first
- The models: `public/grist/my-work.html` (cards, sheets, Undo, name remembered), `public/grist/workshop.html` (reads several tables by name, renders action-button columns), `public/grist/schedule.html` (grouping, "Show:" toggles). Copy their structure, CSS variables, helpers (decode `["L"…]`/`["O"…]`, dates, localStorage in try/catch) and tone. Each widget is one self-contained HTML file, no build step, loads `grist-plugin-api.js` like the others.
- Look: the "Look" section of `docs/redesign/tasks/53-grist-phone-pages.md` and `CLAUDE.md`. Token hex values only; `clay` text only on paper/linen; Montserrat labels, Open Sans body, Cormorant only for headings ≥24px; 3px radius; ≥44px taps; no emoji; thin-line SVG or no icons.
- Every widget: no column mapping, `requiredAccess: 'full'`, reads tables by name with `grist.docApi.fetchTable`, refreshes on `grist.onRecords`/`onRecord` or a doc change, a one-line hint at the top, and an empty state that says what to do.
- Grist doc for reading the schema (read-only for you): `http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b`, key `GRIST_API_KEY` in `.env.local`. `GET …/tables/<T>/columns` shows columns. `*` below = formula (never write to it).
- Gift card rules: `docs/redesign/gift-cards-handoff.md` and the "Gift cards" section of `docs/grist-workspace.md`. **Only ever the last 4 digits.** Never ask for, accept, store or show a full card number.

## Part A — `gift-card.html`, `packing.html`, `season.html`

1. **`gift-card.html` — "Gift card".** Hint: "Type the last 4 digits on the card."
   - A big 4-digit input (`inputmode="numeric"`, `maxlength=4`, strip non-digits; refuse anything longer). Matches on `Gift_Cards.Card_Last4`. If several match, list them all (Card_Label*).
   - Card view: Recipient_Name, Offer, Amount, Balance* (large), Status chip, Check* as a warning line, Used_On* listed as "workshop title — date". Note under the balance: "Our records. Square's balance is the one that counts."
   - **Use it for a guest** (only when Status is Active and Balance > 0): pick a workshop (default today's, else next upcoming), then a registration on it that is Pending or Waitlist (Attendee_Name*, Seats). Shows the amount it will take: `min(Balance, Expected*)` (if Expected is blank, ask for the amount). Confirm sets on that Registration: `Gift_Card`, `Payment_Method: "Gift card"`, `Amount_Paid`, `Status: "Paid"`. If the card's balance is then 0, also set the card's `Status: "Used"`. One `applyUserActions` call so Undo is one step. Show an Undo bar that reverts both.
   - If the guest owes more than the card covers, say so plainly: "The card covers $X. They owe $Y more." Don't record the remainder; that's the Payment buttons' job on Workshop day.
   - Saucer: if `Saucer_Owed` and not `Saucer_Given`, show a toggle "Saucer handed over" that sets `Saucer_Given`.
2. **`packing.html` — "Packing and restock".** Hint: "Tick things off as they go in the car."
   - Two tabs: **Pack** and **Buy**.
   - Pack: workshop picker (same default as Workshop day), then every `Inventory` row with `In_Kit` true, grouped by Category, as big checkboxes. Packed ticks are **not** saved in Grist: keep them in localStorage keyed by workshop id (try/catch), with "Start over" to clear. Show "Need N for this workshop" from the workshop's `Seats_Taken*`. Under the kit, a free "Also bring" list kept in localStorage too.
   - Buy: Inventory rows where `Needs_Reorder*` or `Short_By* > 0`, showing Item, Short_By, On_Hand, Supplier name, Lead_Time_Days ("order N days ahead"). Each has − / + buttons on On_Hand and a "Got it" button that opens a sheet to type the new On_Hand.
3. **`season.html` — "Season at a glance".** Hint: "Every workshop this year. Put a quarter on sale when the dates are checked."
   - Year picker (default the year of the next upcoming workshop). Workshops grouped by quarter (Jan–Mar = Q1 …), sorted by Date. Each row: date, Title, Format, Status chip, seats `Seats_Taken*` of `Capacity`, money in = sum of `Amount_Paid` on that workshop's Registrations with Status Paid, and `Ready_For_Site*` as a warning line if not blank.
   - Quarter header shows totals: workshops, seats sold of capacity, money in.
   - **Put this quarter on sale**: on a quarter with Tentative rows, a button that sets every Tentative row in that quarter to `On sale` in one action, after a confirm sheet listing them and warning about any whose Ready_For_Site would block the site (no registration link, etc.). Undo bar. Single rows also get a status sheet (Planning, Tentative, On sale, Sold out, Waitlist, Done, Cancelled).
   - Note under the button: "On sale workshops get their prep tasks overnight."

## Part B — `returns.html`, `follow-ups.html`, `feedback.html`, `partners.html`

4. **`returns.html` — "Trees coming back".** Hint: "Trees due for shaping. Invite the owner, then mark what they said."
   - `Trees` where `Shaping_Due*` is set and `Return_Status` is not Returned or Not interested, grouped by month of Shaping_Due ("Overdue", then "December 2026", …). Overdue = past `Shaping_Window_Ends*` tinted clay; inside the window = sandstone.
   - Card: Species, owner name (Contacts.Name*), workshop title, potted date, Return_Status chip. Call / Text / Email buttons from the owner's Contact (`tel:`, `sms:`, `mailto:`), shown only when present.
   - Status buttons: **Invited**, **Booked**, **Returned**, **Not interested** (sets `Return_Status`), Undo bar. Show "Show done" toggle to reveal Returned / Not interested.
   - Top line: next upcoming workshop with Format "Shaping / return session" ("Next Level 2: Fri Feb 26"), so you know what to invite them to.
5. **`follow-ups.html` — "Follow-ups".** Hint: "People worth a friendly nudge. Tap Contacted when you've reached out."
   - Uses `Contacts.Last_Contacted` (Date). **This column doesn't exist yet**; it's added with the page build (step 2). Code for it, and if the column is missing show the list without the Contacted button and a note "Ask Landon to add Last contacted".
   - Two groups: **Came before** — `Workshops_Attended* ≥ 1` and no Registration on an upcoming workshop (Workshop.Upcoming*); **Interested** — Contact_Type includes "Lead" and `Workshops_Attended* = 0`. Hide anyone contacted in the last 60 days ("Show everyone" toggle). Sort: never contacted first, then oldest contact.
   - Card: Name*, Town, Lead_Source, workshops attended, trees owned (Trees_Owned*), Last_Contacted ("Last reached out Oct 3" or "Never"). Call / Text / Email. **Contacted** sets `Last_Contacted` to today; Undo bar. Tap name for a sheet editing Notes.
   - `Email_OK` means "on the email list", and it is false for every current contact. Keep the Email button for personal notes; when Email_OK is false, add a small note "Not on the email list. A personal note is fine; no newsletters."
6. **`feedback.html` — "Feedback".** Hint: "What people said. Pick the good ones to quote on the site."
   - Grouped by workshop (newest first), header shows count and average Rating. Card: rating as a number out of 5 (no stars, no emoji), Comment, who said it (Contacts.Name*).
   - Edit sheet: `OK_To_Quote` toggle, `Quote` (prefilled from Comment when empty — the quote is the edited, shortened version), `Show_On` as toggle chips (home, workshops, workshops-top, events). Show `Ready_For_Site*` as the warning line. Cards that are on the site get a small "On the site" label (OK_To_Quote and Quote and blank Ready_For_Site).
   - Filter chips: All / Not reviewed (OK_To_Quote false and no Quote) / On the site.
7. **`partners.html` — "Partners".** Hint: "Everyone we work with. Tap one for people, agreements and workshops."
   - Cards from `Organizations` sorted by Name: Name, Type chips, Town. Search box.
   - Detail sheet: Website / Instagram links; people (Contacts with that Organization: Name*, Role, Call/Text/Email); agreements (Title, Status chip, End_Date, `Heads_Up*` warning); workshops held there (`Workshops.Venue`, upcoming first, then past, with date and status); Notes editable.

## Do (both parts)
1. Build your files in `public/grist/`. Touch nothing else: not `docs/`, not `STATUS.md`, not other widgets, not `.env.local`. Don't commit, don't run `npm run build` or `npm run lint` (the other builder is working in the same folder; the orchestrator runs them). Do run `node --check` on each inline script (extract it to the scratchpad) and open each file in a quick static check for unbalanced tags.
2. Report: files made, any column you needed that isn't in this file, anything you couldn't do, and the widget options (if any) each one takes.

## Step 2 (orchestrator, later, with the 53/54 live build)
- Lint, build, add rows to `docs/grist-widgets.md`, commit on `grist-tools`, merge to main so the widgets go live.
- Practice copy first, then live after Landon's go: add `Contacts.Last_Contacted` (Date, label "Last contacted", description "Filled in by Follow-ups when you tap Contacted."), untie colId before labelling. Pages (real tableRef, run the orphan check): Gift card (after Workshop day), Packing (after Gift card), Season (after Plan a workshop), Trees coming back, Follow-ups, Feedback, Partners (after Phone book). Update `docs/grist-workspace.md`. Tick 57 in `STATUS.md`.

## Don't
- No schema changes except `Contacts.Last_Contacted`. Never print emails, phones, names, keys or card numbers in reports. No changes to n8n, the site's pages or `cutf`.
