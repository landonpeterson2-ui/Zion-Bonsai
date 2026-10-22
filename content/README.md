# Editing site content

These files drive dates, links and contact info. Edit the JSON, then run `npm run build` to check your edit. A mistake stops the build with a message naming the file and field.

**Add a workshop:** open `workshops.json` and copy an entry inside `"workshops"`. Change:
- `id`: unique, no spaces (for example `2027-03-intro-manti`)
- `type`: `intro`, `shaping` or `popup`
- `title`, `price`, `venue` (a partner id such as `sweet-roots`)
- `date` as `YYYY-MM-DD`; `start` and `end` as 24-hour `HH:MM`
- `registrationUrl`: the Google Form link (never a payment link)
- `status`: `open`, `full` or `waitlist`

Past dates hide themselves; no need to delete them. Keep commas between entries.

Other files: `site.json` (contact info, `season`, `shopEnabled`), `seasons.json` (home hero copy), `partners.json`, `faq.json`, `gallery.json`.
