# 58 — Grist on a phone: last widgets, and a phone-only page menu

Grist is mostly used on a phone. Every table someone works with should have a phone page, and on a phone the page menu (hamburger) should list only those pages. On a computer nothing changes.

## Context — read first
- `docs/redesign/tasks/57-grist-more-widgets.md` (look, rules, structure) and the widgets it made in `public/grist/`, plus `workshop.html` (renders `Payment_Buttons`) and `my-work.html`. Copy their CSS, helpers and patterns. Each widget is one self-contained HTML file. **Exactly one `<style>` and one closing `</style>`** (task 57 shipped a stray one that printed CSS on the phone).
- Gift card rules: `docs/redesign/gift-cards-handoff.md`. Only ever the last 4 digits.
- Practice copy for testing (synthetic data only): `http://nuc.pug-scylla.ts.net:8484/o/docs/97Xt6eYVbWFz18QJXkbEVL` (API: `…/api/docs/97Xt6eYVbWFz18QJXkbEVL`, key `GRIST_API_KEY` in `.env.local`). The live doc is `sMHSTmja714b8SLwqeWDcz`: **never touch it.** Grist has no logins, so headless Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new`) can open the practice copy directly. Headless Chrome's minimum window width is 500px; use device emulation or `--window-size=390,…` only with that in mind.
- Test harness for widgets (stubbed `grist` object fed with practice-copy data, then headless screenshots): see how it's done in `/private/tmp/claude-502/-Users-landonpeterson-Zion-Bonsai/5fe08a92-9f10-4f22-bca6-cf468004c82b/scratchpad/harness/` (`stub.js`, copied widgets with the plugin-API `<script>` swapped for `stub.js`). Reuse it; don't write into `public/` while testing.

## Part A — two widgets
1. **`gift-cards.html` — "Gift cards sold"** (on `Gift_Cards`, no mapping, full access). Hint: "Every card we've sold. Tap + to log a new one."
   - Search (recipient, buyer name, last 4, order #) and status chips (Active / Used / All).
   - Card: `Card_Label*`, Offer, Design, Sold_Date, Balance*, Status chip, `Check*` as a warning line.
   - Group at the top, only when non-empty: **Saucers to hand out** (`Saucer_Owed` and not `Saucer_Given`) with a big "Handed over" toggle per card.
   - **+ Log a sale** sheet: Card last 4 (exactly 4 digits, `inputmode=numeric`; reject anything else with a clear message; never accept more), Buyer (searchable Contacts picker, or "New person": first, last, email, phone → creates the contact in the same action bundle), Recipient name, Offer, Design, Delivery (choices read from the columns), Square order #. Amount, Sold_Date, Status and Saucer_Owed fill themselves — don't send them unless Offer is Other (then ask for Amount).
   - Tap a card: edit sheet for Recipient, Design, Delivery, Order_Ref, Status, Notes, Saucer_Given. Undo bar after every write.
   - Folded footer "By design": count and total per Design.
2. **`bookings.html` — "Bookings"** (on `Registrations`, no mapping, full access). Hint: "Everyone booked on upcoming workshops. Tap a payment button when the money comes in."
   - Filter chips: **Owes money** (Status Pending), **Waitlist**, **Paid**, **All**. Default Owes money. Search by name.
   - Grouped by upcoming workshop (date, title, `Seats_Taken*` of Capacity). Past workshops under a folded "Earlier" (last 60 days).
   - Card: Attendee_Name*, Guest_Name, Seats, Status chip, Amount_Paid vs Expected*, `Check*` as a warning, Call / Text / Email from the Contact, and the `Payment_Buttons*` entries rendered exactly as `workshop.html` does (decode, one button per entry, empty actions = plain note).
   - **+ Add a booking**: workshop picker, contact picker (or new person), seats, status Pending. Tap a card for Notes, Seats, Status, Payment_Method, Discount_Code, Discount_Reason.

## Part B — phone-only page menu
3. **`public/grist/phone-menu.js`**, loaded by `icons.js` (add a few lines there that append a `<script src=".../phone-menu.js">`). Grist loads `icons.js` on every page through `GRIST_INCLUDE_CUSTOM_SCRIPT_URL`.
   - Acts only when (a) the URL's doc id is one of `sMHSTmja714b8SLwqeWDcz`, `97Xt6eYVbWFz18QJXkbEVL` (list at the top of the file), and (b) the screen is a phone: `matchMedia('(max-width: 767px)')`. Re-check on resize.
   - In Grist's left panel page list, hide every **top-level** page whose name isn't on the phone list, and every indented page (so the whole "Tables" group disappears). Use CSS (a `<style>` with a class added to items you hide, or `display:none` on them) and a `MutationObserver`, because Grist re-renders the list. Find Grist's real DOM hooks by opening the practice copy in headless Chrome and inspecting the page list (Grist uses `test-…` classes such as tree-view item headers and page labels); pick the most stable selector and note it in a comment.
   - At the bottom of the list add a small link "Show all pages" / "Phone pages only" that toggles the filter (remember in localStorage, try/catch).
   - Phone list (top-level names, exact): Start here, My work, Calendar, Workshop day, Gift card, Bookings, Gift cards sold, Packing, Season at a glance, Workshop checklist, Boards, Phone book, Trees coming back, Follow-ups, Feedback wall, Partners, Agreements, Kit and supplies, Trees, Prep checklist, Sign-in sheet.
   - Never throws: wrap everything in try/catch; if the selectors find nothing, do nothing.
   - Test in headless Chrome against the practice copy with a phone-sized viewport (use DevTools device emulation via `--remote-debugging-port` and a small CDP script, or Puppeteer from a scratchpad `npm i` — not in the repo), injecting `icons.js` + `phone-menu.js` yourself since the NUC doesn't load them yet. Screenshot the open page menu at phone size and at 1280px. Save screenshots in the scratchpad and report their paths.

## Do (both parts)
- Touch only your own files (Part A: the two HTML files. Part B: `phone-menu.js` and `icons.js`). Don't commit, don't run `npm run build`/`lint`, don't edit docs or STATUS.md, never write to the live doc. Part B may read the practice copy but not change it. `node --check` every script.
- Report: files, how you tested (with screenshot paths), selectors used (Part B), judgement calls.

## Orchestrator (after)
- Lint, build, docs rows, commit, merge. Practice copy pages: Gift cards sold and Bookings (after Gift card), Agreements and Prep checklist as `list` pages, `+ Add a workshop` on Workshop checklist. Landon adds `GRIST_INCLUDE_CUSTOM_SCRIPT_URL=https://zionbonsai.com/grist/icons.js` in CasaOS. Goes live with 53/54/57.

## Don't
- No schema changes. Never print emails, phones, names, keys or card numbers.
