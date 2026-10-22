# 00 — Fix lint tooling

**Phase:** 2 Foundation · **Depends on:** nothing

## Why
`npm run lint` runs `next lint`, which was removed in Next 16. It currently fails with "Invalid project directory ... lint". Every later task needs a working lint.

## Do
1. Add `eslint.config.mjs` using the flat config from `eslint-config-next` (already a devDependency). Use `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Ignore `.next/`, `node_modules/`, `next-env.d.ts`.
2. Change the `lint` script in `package.json` to `eslint .`.
3. Run `npm run lint`. Fix any errors the existing code produces only if the fix is mechanical (unused imports, unescaped entities). If an error needs a real change, disable that single rule on that line with a comment saying it'll be removed in a later task, and note it in STATUS.md "Found while working".
4. Remove the unused `DATABASE_URL` / NextAuth lines from `.env.example` (nothing uses them). Do not touch `.env` or `.env.local`.

## Done when
- `npm run lint` and `npm run build` both exit 0.
- No new dependencies besides what `eslint-config-next` needs (it should already resolve).
