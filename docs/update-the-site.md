# Updating the website from Grist

Workshops, partners and quotes on the website come from Grist. Change them there, and the site updates itself a few minutes later. No code, no files.

**Locked columns** work themselves out (seats left, price label, sold out and so on). You can't type in them, and that's on purpose.

## Add a workshop

In **Workshops**, add a row:

| Column | What to put |
|---|---|
| Title | What the site shows, e.g. "Beginner Bonsai Workshop". The date shows separately, so leave it out. |
| Date, Start, End | Pick the times from the list. |
| Format | Public, Evening, Pop-up and Shaping go on the site. Corporate, School and Private never do. |
| Venue | Pick the place. |
| Capacity | Number of seats. |
| Price Single, Price Pair | e.g. 65 and 100. Leave Price Pair blank if there's no pair price. |
| Registration Form | The Google Form link. Without one, the site says "Registration opens soon." |
| Status | **Planning** while you set it up. **On sale** puts it on the site. |

Then look at **Ready For Site**. Blank means it's good to go. If it says something ("Needs a venue"), fix that and it publishes.

## Sold out, waitlist, done

- **Sold out happens by itself** once registrations fill the seats. Paid, Comped and Pending bookings all hold a seat. To close early, set Status to **Sold out**.
- **Waitlist** shows a "Join the waitlist" button that uses the Registration Form link.
- After the workshop, set Status to **Done**. It drops off the site after its date anyway.
- **Cancelled** takes it off the site right away.

## Registrations

One row per booking. **Seats** is 1 for a single, 2 for a pair. Status stays **Pending** until they pay, then switch it to **Paid** and fill in **Amount Paid**. **Expected** shows what they should have paid. **Check** flags anything odd, like "Paid less than expected, add a discount reason."

## Partners

In **Organizations**, tick **Show On Site** and fill in **Slug** (short-name-like-this), **Role** and **Blurb**. Website and Instagram need full links starting with `https://`. Send Landon a logo for a new partner.

## Quotes

In **Feedback**:

1. Tick **OK To Quote** only if the person said yes.
2. Copy their exact words into **Quote**. You can leave sentences out, but never reword them.
3. Pick **Show On**: *home* (Home rotates through its quotes), *workshops*, *workshops-top* (the one quote under the Workshops page header), or *events*.
4. Make sure their contact has a first name and a town. The site shows "Jill, Ephraim".

The quotes already on the site (Sierra, Jill and Lacee) live in the site files for now. Ask Landon to change those.

## Did it work?

Open **Site_Sync** and look at the newest row:

- **Published**: live in a few minutes.
- **Published, some rows waiting**: the rest went live, and Details says what the waiting rows need.
- **Not published**: nothing changed on the site, and Details says why.

No new row means nothing you changed affects the site.

## Not in Grist (ask Landon)

The FAQ, the home page photo and seasonal headline, the gallery, and page wording.
