# 56 — Tentative workshops on the site

The site side of section 3 of `docs/redesign/gift-cards-handoff.md`: Grist's `Site_Status` gains `"tentative"` (task 55). Make the sync and the site handle it.

## Do
- `scripts/sync-grist.mjs` and the zod schema in `lib/content.ts`: accept `status: "tentative"`. Tentative rows may lack time, venue, price and registration form; the sync must not fail or drop them for that.
- Workshops page (and anywhere upcoming workshops render, e.g. `NextWorkshop`, home): a tentative row shows title and date with a small "Tentative" label (Montserrat label style), venue and time only if present; no Register button, no price, no seats left. `NextWorkshop` should prefer a bookable workshop over a tentative one.
- One line under the tentative dates: "Gift cards work for any public workshop except Sun River Gardens," linking to the Give a workshop page. That page doesn't exist yet: put the link in `content/site.json` (e.g. `giftCertificates.giveUrl`), pointing at `/contact#gift` for now, so Landon can repoint it. No hardcoded links.
- Leave tentative rows out of any calendar feed, sitemap event entries and Event structured data (JSON-LD).
- Brand and voice rules in `CLAUDE.md`. Check at 375px.

## Done when
- `npm run lint`, `npx tsc --noEmit`, `npm run build` pass (the build sometimes stops on a Next.js security notice after "Generating static pages"; rerun — unrelated).
- A temporary fixture with one tentative and one on-sale workshop renders correctly (describe what you checked); fixture removed; `content/workshops.json` unchanged.
- One commit on `grist-tools` with only this task's files plus `STATUS.md` (add and tick 56). Never commit AGENTS.md, .vscode/, docs/copy/welcome-series.md, docs/grist-sync.md, scripts/sync-brevo.mjs, docs/grist-workspace.md or other task files. Don't push.
