# 04 — Redirects, sitemap, robots

**Phase:** 2 Foundation · **Depends on:** 02

## Do
1. In `next.config.js`, add permanent redirects: `/about` → `/our-story`, `/workshops/:slug*` → `/workshops`, `/gift` → `/contact#gift`.
2. Tighten `images.remotePatterns` — the current `hostname: '**'` allows any host. Only keep hosts actually used (Shopify CDN `cdn.shopify.com` for the shop). Local images don't need an entry.
3. `app/sitemap.ts`: list routes from `decisions.md`; include `/shop` only when `shopEnabled`. Use `NEXT_PUBLIC_APP_URL` with a production fallback of `https://zionbonsai.com` (confirm domain in STATUS.md "Found while working" if unsure) instead of localhost.
4. `app/robots.ts`: same base URL fix; disallow `/directions/` (Phase 3 preview routes).
5. Move the existing About page to `app/our-story/page.tsx` unchanged (Phase 4 rebuilds it) so the redirect lands somewhere.

## Done when
- Visiting `/about`, `/workshops/series`, `/gift` in dev redirects correctly.
- `/sitemap.xml` shows no localhost URLs when `NEXT_PUBLIC_APP_URL` is unset.
- Build and lint pass.
