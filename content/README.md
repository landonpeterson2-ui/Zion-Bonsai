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

**From Grist:** workshops, partners and quotes can come from the Grist doc instead. Workshops go on the site when their Status is *On sale* (or *Waitlist*); partners when *Show On Site* is ticked; quotes when *OK To Quote*, *Quote* and *Show On* are filled. Each table's *Ready For Site* column says what a row still needs. Run `npm run sync:grist` on a computer on the tailnet (`-- --check` to preview). It rewrites `workshops.json`, `partners.json` and the Grist quotes in `testimonials.json`; check `git diff content/` before committing. Once n8n is set up this runs on its own a couple of minutes after a Grist edit; see `docs/grist-sync.md`. Don't hand-edit `workshops.json` or `partners.json` after that: Grist is their home.
