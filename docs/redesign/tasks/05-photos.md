# 05 — Optimize and catalog photos

**Phase:** 2 Foundation · **Depends on:** 02

## Why
`public/gallery/` is 21 phone photos at 4032×3024, 67 MB total. Alt text everywhere is "Zion Bonsai gallery image N".

## Do
1. Write `scripts/optimize-photos.mjs` using `sharp` (already installed with Next): read `public/gallery/*.jpeg` **and** `photos-inbox/**/*.{jpg,jpeg,png,heic,webp}` (Cass's workshop photos get dropped into `photos-inbox/workshop/`; anything in that subfolder defaults to `status: "workshop"`). Add `photos-inbox/` to `.gitignore` — only the optimized output is committed. HEIC may not decode with sharp; if so, log the filename and skip it with a clear message rather than failing. auto-rotate from EXIF, strip metadata, resize to max 2000px on the long edge, write `public/photos/<name>.jpg` at quality 80 (mozjpeg). `next/image` handles WebP/AVIF at request time. Add an npm script `photos` that runs it. Make it idempotent (skip if output newer than input).
2. Run it and commit the output in `public/photos/`. Leave originals in `public/gallery/` for now (a later decision whether to delete them from the repo).
3. **Look at every photo** (open each with the Read tool) and give it a meaningful name and catalog entry in `content/gallery.json`:
   - Rename outputs descriptively, e.g. `jade-white-hex-pot.jpg`, `hands-wiring-branch.jpg`. Keep a mapping comment in the script or a `photos-map.json` so originals → names is traceable.
   - `alt`: what's actually in the frame, concise (≤ 125 chars), e.g. "Dwarf jade bonsai with a thick twisting trunk in a speckled white ceramic pot".
   - `caption`: short, warm, optional.
   - `status`: default `"sold"` for finished trees (most gallery pieces have sold), `"workshop"` for photos of workshops/people/process. Flag uncertain ones in STATUS.md "Found while working" for Landon to confirm.
   - `featured: true` for the 6 strongest images for the home page and share image.
4. Update `components/home/Hero.tsx` and `app/gallery/page.tsx` to read from `getGallery()` instead of their hardcoded arrays (minimal change; Phase 4 redesigns them). Delete the duplicated arrays.
5. Note in STATUS.md which shots from the handoff wishlist are **missing**: Cheesecake, hands in soil, Taya's pots close-up, workshop tables, Landon & Cass portrait.

## Done when
- `public/photos/` total under 15 MB.
- Every gallery entry has specific alt text; no "gallery image N" remains anywhere.
- Build and lint pass.
