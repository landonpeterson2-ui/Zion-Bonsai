# Deploying on Cloudflare Workers

The site runs on Cloudflare Workers (free plan) through `@opennextjs/cloudflare`, live at https://zionbonsai.com. Cloudflare builds and deploys every push to `main`. The old Vercel project is gone.

## Files
- `wrangler.jsonc` — Worker `zion-bonsai`, `nodejs_compat`, assets from `.open-next/assets`, `IMAGES` binding (powers `next/image` resizing).
- `open-next.config.ts` — default config, no R2 cache (no page uses ISR).
- `public/_headers` — long cache for `/_next/static/*`.

## Commands
- `npm run build` — plain `next build` (local check; must pass before every commit).
- `npm run preview` — OpenNext build, then local Workers preview (port 8787).
- `npm run deploy` — OpenNext build and deploy (needs `wrangler login`; Cloudflare's Git build runs this for you).
- `npm run cf-typegen` — regenerates `cloudflare-env.d.ts` (git-ignored).

## Pages
Home and `/workshops` use `dynamic = 'force-dynamic'`, so past workshops drop off and the quote rotates with no redeploy. Dates compare in America/Denver. All other pages are static.

## Dashboard steps (Landon)
1. Cloudflare dashboard, Workers & Pages, Create, Import a repository (Git), pick this GitHub repo.
2. Project/Worker name: `zion-bonsai` (must match `name` in `wrangler.jsonc`).
3. Production branch: `main`.
4. Build command: `npx opennextjs-cloudflare build`
5. Deploy command: `npx wrangler deploy`
6. Root directory: leave blank. Node version: set build variable `NODE_VERSION` = `22` (the project needs 22.18+; use `22.18.0` if the build complains).
7. Build variables (Settings, Variables and Secrets, **Build** section; names only, set values yourself):
   - `NEXT_PUBLIC_APP_URL` (the public site URL)
   - `NEXT_PUBLIC_SHOPIFY_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`

   These are inlined at build time, so changing one needs a new build. `GRIST_API_KEY` is not needed on Cloudflare (sync runs on the NUC).
8. Settings, Builds, Branch control: turn on **non-production branch builds** so `redesign` gets a preview URL. Non-production deploy command can stay `npx wrangler versions upload`.
9. Custom domain and DNS: later, at launch.

## Limits
Free plan: Worker must be under 3 MiB compressed (current build is about 1.33 MiB gzip). Cloudflare Images allows 5,000 unique transformations a month; the site has ~52 photos at a handful of widths each, which should stay inside that but is worth watching.
