# Task 43 — Run the site on Cloudflare Workers

Landon is moving hosting off Vercel (Hobby forbids commercial use) to Cloudflare Workers, free plan, with Git deploys from `main` set up in the Cloudflare dashboard by Landon. This task makes the repo build and run on Workers locally. It does **not** deploy, log in to Cloudflare, push, or touch DNS.

## Scope
1. **Adapter.** Add `@opennextjs/cloudflare` and `wrangler` as devDependencies (approved by Landon; they're build tools, not UI libraries). Follow the current OpenNext Cloudflare docs (read them; don't work from memory): `open-next.config.ts`, `wrangler.jsonc` (worker name `zion-bonsai`, `nodejs_compat`, a current `compatibility_date`, assets binding for `.open-next/assets`), scripts `preview` (`opennextjs-cloudflare build && opennextjs-cloudflare preview`), `deploy`, `cf-typegen`. Add `.open-next/`, `.wrangler/` and `.dev.vars` to `.gitignore`. Keep `npm run build` = `next build` working (with its `prebuild` content check) and keep `vercel.json` for now; Vercel keeps building until launch.
2. **Images.** Keep `next/image`. Wire OpenNext's Cloudflare Images support (an `IMAGES` binding in `wrangler.jsonc`, per the docs) so resizing works like on Vercel. Free plan allows 5,000 unique transformations a month; the site has ~52 photos. If it can't be proven locally, say so; don't fall back to `unoptimized` without asking.
3. **Fresh pages instead of hourly ISR.** `app/page.tsx` and `app/workshops/page.tsx` use `revalidate = 3600` so past workshops drop off and the quote rotates. Make both render per request (Next 16: `await connection()` from `next/server`, or `export const dynamic = 'force-dynamic'`, whichever the codebase's Next version supports cleanly) and remove the `revalidate`. Update the comment at `lib/content.ts` (~line 99) that says pages revalidate hourly. Check no other route relies on ISR. Workshop dates must still compare in America/Denver (they already do in `lib/content.ts`).
4. **Env.** `NEXT_PUBLIC_APP_URL` and the Shopify `NEXT_PUBLIC_*` values are build-time. Document in `docs/deploy-cloudflare.md` which variables Landon sets in the Cloudflare build settings (names only, never values) and the dashboard steps: Workers & Pages → Create → Import a repository → this repo, production branch `main`, build command, deploy command, and non-production branch builds on for `redesign`.
5. **Grist sync notes.** In `docs/grist-sync.md`, replace "Vercel deploy" with Cloudflare, and mark the "commit author must be on the Vercel team" note as Vercel-only (remove at launch).
6. **Size.** Report the compressed Worker size from the build output against the free cap (3 MiB).

## Don't
- Don't deploy, `wrangler login`, push, or change DNS. Don't remove `vercel.json`.
- Don't kill or restart the dev servers on 3000 or 3001. `opennextjs-cloudflare preview` uses port 8787 by default; use 8790 if that's taken, and stop it by PID.
- No changes to page design or copy. Never print values from `.env.local`; if the preview needs them, write `.dev.vars` with a script that prints only "written".

## Done when
- `npm run lint` and `npm run build` pass; `npx opennextjs-cloudflare build` passes.
- In the local Workers preview: home, workshops, events, our-story, care-guide, partners, contact, gallery/shop load with no console errors; images load through the resizer (check a resized image URL returns an image); the redirects (`/about`, `/workshops/x`, `/gift`) still work; a workshop dated yesterday in a temporary local edit of `content/workshops.json` does not show (revert the edit, never commit it).
- `docs/deploy-cloudflare.md` exists. Tick 43 in `docs/redesign/STATUS.md` (add the line under Phase 5–6 if missing).
