# Zion Bonsai Grist: gift card tracking handoff

Nov 20, 2026 · Landon. Spec from Landon's planning session, saved as given (tables re-set as markdown). Tasks 55 (Grist) and 56 (site) implement it.

This adds gift card tracking to the Zion Bonsai Grist doc: one new table (Gift_Cards), small changes to Registrations, Workshops and Inventory, and the launch tasks. Nothing else in the Grist doc changes.

## Before you run this
1. Back up the doc first (`GET /download` to `~/zion-bonsai-backups/`). Keep it until every acceptance check at the bottom passes.
2. Where it runs: the doc lives on the NUC, tailnet only. Grist REST API with `GRIST_API_KEY` from `.env.local`. Never paste the key into chat or commit it.
3. Order: Gift_Cards, Registrations, Workshops, Inventory, Tasks (then Trees). Run each section's checks before moving on.

Rules:
- **Read before you edit.** Before changing any existing formula, read it in full from `_grist_Tables_column` and insert the new lines into it. Never retype an existing formula from this doc.
- **Never write to formula columns.** Only data and trigger columns take values.
- **House style.** Every new column gets a plain-language description: data columns say what to put in and end with "Type this." or "Pick one."; formula columns start with "Calculated — don't type here."
- **Gift card numbers.** Store the last 4 digits only. Never store, log, print or paste a full gift card number (GAN) or anything that redeems a card. Square's dashboard holds the full numbers.
- **Choice lists.** When adding a choice, merge it into the column's existing widgetOptions so the current choices and their colors stay.
- **Trigger formulas.** Through the API, a trigger column is `isFormula: false` with `formula` set, `recalcWhen: 0`, and `recalcDeps` set to the listed columns (`["L", <colRef>, …]`), or none for "new records only".
- Leave the syncs alone (site, Brevo, Grow app) except for the site change in the Workshops section.

## 1. New table: Gift_Cards

One row per Square gift card sold. A card is matched by its last 4 digits, its buyer and its Square order number; the full number stays in Square.

Data and trigger columns:

| Column | Label | Type | Kind | Choices / default | Description |
|---|---|---|---|---|---|
| Card_Last4 | Card last 4 | Text | data | | The last 4 digits of the gift card number, from the card or the Square dashboard. Type only the last 4, never the whole number. |
| Buyer | | Ref:Contacts | data | | Who bought it. Pick from Contacts; add them there first if they're new. |
| Recipient_Name | Recipient name | Text | data | | Who it's for, as the buyer wrote it. Type this. |
| Offer | | Choice | data | Date Night for Two, One Seat, Other | What they bought. Pick one. Amount fills in from it. |
| Amount | Amount ($) | Numeric | trigger | formula A, on Offer changes | What the card is worth, in dollars. Fills in from the Offer ($100 or $65); type it for Other. |
| Design | | Choice | data | 1 Prune What No Longer Serves You, 2 Utah Grown, 3 Step Away From the Watering Can, 4 Breathe Snip Repeat, 5 Humble Beginnings | Which of the five designs they picked. Pick one. |
| Delivery | | Choice | data | eGift, Printable, Both | How it went to them. Pick one. |
| Sold_Date | Sold date | Date | trigger | `value or TODAY()`, new records only | The day it was sold. Fills in today's date; type or pick another. |
| Order_Ref | Square order # | Text | data | | The Square order number for the sale. Type this. |
| Saucer_Owed | Saucer owed | Bool | trigger | formula B, on Sold_Date changes | Ticked by itself when the card was sold by Dec 31, 2026 (the free saucer offer). Untick if this card doesn't get one. |
| Saucer_Given | Saucer given | Bool | data | | Tick once they have their saucer. |
| Status | | Choice | trigger | Active, Used, Refunded, Void; default "Active", new records only | Where the card stands. New cards start Active. Set Used once it's spent, Refunded or Void if the sale was undone. |
| Notes | | Text | data | | Anything worth remembering. Type this. Never a card number. |

Formula A (Amount):
```python
{"Date Night for Two": 100, "One Seat": 65}.get($Offer, value)
```
Formula B (Saucer_Owed):
```python
bool($Sold_Date) and $Sold_Date <= datetime.date(2026, 12, 31)
```

Formula columns (descriptions start with "Calculated — don't type here."):

| Column | Label | Type | Formula | Description (after the prefix) |
|---|---|---|---|---|
| Card_Label | Card label | Text | C | Last 4, who it's for and the amount. It's what you see when you pick a card on a registration. |
| Used_On | Used on | RefList:Registrations | `Registrations.lookupRecords(Gift_Card=$id)` | The registrations paid with this card. Link the card from the registration, not here. |
| Amount_Used | Amount used ($) | Numeric | `sum(r.Amount_Paid or 0 for r in $Used_On if r.Status == "Paid")` | What's been spent from it on Paid registrations. |
| Balance | Balance ($) | Numeric | `($Amount or 0) - $Amount_Used` | What's left by our records. Square's balance is the one that counts. |
| Check | | Text | D | Says what looks off about this card. Blank means all good. A problem turns the row red. |

Formula C (Card_Label):
```python
who = $Recipient_Name or ($Buyer.Name if $Buyer else "")
amt = ("$%g" % $Amount) if $Amount else None
return " · ".join(filter(None, [$Card_Last4 or "????", who, amt]))
```
Formula D (Check):
```python
todo = []
if not $Card_Last4: todo.append("needs the card's last 4")
elif len($Card_Last4) != 4 or not $Card_Last4.isdigit(): todo.append("card last 4 should be exactly 4 digits")
elif len(Gift_Cards.lookupRecords(Card_Last4=$Card_Last4)) > 1: todo.append("another card has the same last 4, check the order # in Square")
if not $Buyer: todo.append("needs a buyer")
if not $Offer: todo.append("needs an offer")
if not $Amount: todo.append("needs an amount")
if not $Design: todo.append("needs a design")
if not $Delivery: todo.append("needs a delivery")
if $Saucer_Given and not $Saucer_Owed: todo.append("saucer given but none owed")
if $Balance < 0: todo.append("more used than it's worth")
if $Status == "Used" and not $Used_On: todo.append("marked Used but no registration is linked")
if $Status == "Active" and $Used_On and $Balance <= 0: todo.append("fully spent, set Status to Used")
if $Status in ("Refunded", "Void") and $Used_On: todo.append("%s but linked to a registration" % $Status)
msg = "; ".join(todo)
return msg[:1].upper() + msg[1:]
```
Why Used_On is a formula: the link lives on Registrations instead (next section), so it's typed in one place, and one card can cover more than one booking.

Page and views:
- Add a **Gift cards** page with the table sorted by Sold date, newest first, and a red-row rule on Check like Registrations has.
- On the same page, a summary table grouped by Design (count and total Amount).
- A filtered view **Saucers to hand out**: Saucer_Owed ticked, Saucer_Given unticked, Status not Refunded or Void.

## 2. Registrations
1. Payment_Method: add the choice **Gift card** after Venmo, keeping existing choices and colors. Description: "How they paid. Pick one. For Gift card, also pick the card in Gift card."
2. New column Gift_Card (label "Gift card"), Ref:Gift_Cards, data. Description: "The gift card they paid with, if any. Pick it by its last 4." Show column = Card_Label. Add it before Used_On (Used_On errors until it exists).
3. Check: read the current formula in full, then insert these lines just before the line that joins todo into the message. Change nothing else.
```python
if $Payment_Method == "Gift card" and not $Gift_Card: todo.append("paid by gift card but no card is linked")
if $Gift_Card and $Payment_Method != "Gift card": todo.append("a gift card is linked but Payment method isn't Gift card")
if $Gift_Card and $Gift_Card.Status in ("Refunded", "Void"): todo.append("the linked gift card is " + $Gift_Card.Status)
```
Amount_Paid on a gift card booking is the amount taken off the card. Payment_Buttons stays as it is; Gift card is picked by hand.

## 3. Workshops: a Tentative status
Tentative 2027 dates show on zionbonsai.com marked tentative, with no Register button.
1. Status: add **Tentative** right after Planning, keeping the others and their colors. Description: "Pick one. Tentative shows the date on zionbonsai.com marked tentative, with no Register button. On sale puts it on the site for booking (once Ready for site is blank). Sold out and Waitlist change what the site shows. Done and Cancelled take it off. New workshops start in Planning."
2. Site_Status: read the formula, then insert right after the Format check (the first `return None`), before the Waitlist line:
```python
if $Status == "Tentative":
  return "tentative"
```
   Description: "What the site shows: tentative, open, full or waitlist."
3. Ready_For_Site: a tentative row needs a date, nothing else. Read the formula in full, then insert right after the date checks (needs a date / date has passed), ending the same way the formula builds and returns the message:
```python
if $Site_Status == "tentative":
  if $Venue and not $Venue.Slug: todo.append("the venue needs a Slug in Organizations")
  msg = "; ".join(todo)
  return msg[:1].upper() + msg[1:]
```
   Show_On_Site and Upcoming pick up Tentative rows with no change.

**Site change** (zionbonsai.com): where the site sync and the workshops page read Site_Status, add a tentative case:
- Show the title and date with a "Tentative" label. Show the venue and time only if filled in.
- No Register button, no price, no seats left.
- One line under tentative dates: "Gift cards work for any public workshop except Sun River Gardens," linking to the Give a workshop page. (Settled Nov 20: gift cards don't cover Sun River Gardens; it sells its own seats.)
- Leave tentative rows out of any calendar feed or event structured data.

## 4. Inventory: saucers
1. New column Gift_Card_Saucer (label "Gift card saucer"), Bool, data. Description: "Tick on the one item handed out with gift cards. Its Owed to gift cards and Short by count them."
2. New column Saucers_Owed (label "Owed to gift cards"), Int, formula. Description: "Calculated — don't type here. For the gift card saucer: how many sold gift cards are still owed one."
```python
if not $Gift_Card_Saucer:
  return 0
return sum(1 for g in Gift_Cards.lookupRecords(Saucer_Owed=True, Saucer_Given=False)
           if g.Status not in ("Refunded", "Void"))
```
3. Short_By: replace the formula with the line below, and add to its description: "For the gift card saucer, it also counts saucers still owed."
```python
max(0, $Kits_Needed + $Saucers_Owed - ($On_Hand or 0)) if ($In_Kit or $Gift_Card_Saucer) else 0
```
4. Add one row: Item "Saucer (gift card offer)", Category Pot, In kit unticked, Gift card saucer ticked. Leave Unit cost, On hand, Reorder at, Lead time and Supplier blank for Landon.

## 5. Tasks: gift card launch checklist
Seven rows; Done unticked; Workshop, Agreement, Contact and Prep step blank.

| Task | Owner | Due |
|---|---|---|
| Turn on Square eGift cards and upload the five designs | Landon | 2026-11-22 |
| Pick the printable certificate designs | Both | 2026-11-22 |
| Add the Give a workshop button to zionbonsai.com | Landon | 2026-11-25 |
| Connect Metricool | Landon | 2026-11-26 |
| Approve the gift card launch posts | Landon | 2026-11-26 |
| Get the past-guest email list ready for the launch | Landon | 2026-11-26 |
| Count saucer stock and enter it in Inventory | Landon | 2026-11-26 |

The rows due Nov 26 need to be done before the posts start on Fri Nov 27.

## 6. Trees: shaping is due 9 to 12 months after potting
Keep Shaping_Due as it is (months=9) and fix the descriptions:
- Shaping_Due: "Calculated — don't type here. Nine months after Date potted, when the 9 to 12 month shaping window opens."
- Date_Potted: "The day it was potted. Type or pick a date. Shaping is due 9 to 12 months later."
- Optional: Shaping_Window_Ends (label "Shaping window ends"), Date, formula `DATEADD($Date_Potted, months=12) if $Date_Potted else None`, description "Calculated — don't type here. Twelve months after Date potted, when the shaping window closes."

## Acceptance checks
Note first how many Registrations rows have a non-blank Check. Test rows: a test workshop with Status Planning and a past date; never tick Attended or Email OK; test card last 4 = 0000. Delete every test row afterwards.

- [ ] A new Gift_Cards row with Offer Date Night for Two fills Amount 100, Sold date today and Saucer owed ticked; Status is Active.
- [ ] Changing Offer to One Seat changes Amount to 65; Other keeps whatever is typed.
- [ ] Card last 4 of 12345 or 12a4 makes Check say it should be exactly 4 digits and the row turns red. With every field filled, Check is blank.
- [ ] Card label reads like `0000 · Test Recipient · $100`.
- [ ] A test registration with Payment method Gift card and no card: its Check says no card is linked. Linking the test card clears it.
- [ ] With that registration Paid at $100: the card's Used on lists it, Amount used is 100, Balance is 0, and Check says to set Status to Used. Setting Used clears it.
- [ ] The saucer row's Owed to gift cards counts the test card; ticking Saucer given drops it by one; Short by follows On hand.
- [ ] Setting the test workshop to Tentative makes Site status tentative, and Ready for site asks for nothing but the date (it says the date has passed).
- [ ] The seven launch tasks show with the right owners and due dates, and Due soon is ticked on the ones due within a week.
- [ ] After deleting the test rows, the count of Registrations with a non-blank Check matches, and no existing formula shows an error.

If any check fails and can't be fixed in place, restore the backup.
