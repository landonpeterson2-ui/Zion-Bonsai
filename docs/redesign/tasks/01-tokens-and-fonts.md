# 01 — Design tokens, fonts, base styles

**Phase:** 2 Foundation · **Depends on:** 00

## Why
The site uses Work Sans + Newsreader and a color scale with a misnamed `cream` (actually tan) and a primary button that fails contrast. Everything later builds on these tokens.

## Do
1. **Colors.** In `app/globals.css`, define the token table from CLAUDE.md as CSS variables on `:root` (e.g. `--color-paper: 250 243 224;` as RGB channels so Tailwind opacity modifiers work). In `tailwind.config.ts`, map each to a color: `paper`, `paper-deep`, `linen`, `coral`, `clay`, `clay-dark`, `sage`, `moss`, `forest`, `soil`, using `rgb(var(--color-x) / <alpha-value>)`.
   - **Keep** the old `coral` scale shades (`coral-50`…`coral-900`), `sage-*`, `olive`, `cream`, `charcoal` working for now so existing pages don't break. Put them under a `// LEGACY — removed in task 42` comment. Note: the new `coral` DEFAULT and `sage` DEFAULT stay the same hex as the old ones, so merge carefully.
2. **Spacing, radii, type scale.** Add to Tailwind `extend`:
   - `borderRadius`: `organic: '42% 58% 55% 45% / 48% 42% 58% 52%'` (imperfect circle), `soft: '1.25rem'`.
   - `fontSize`: `display` (clamp 2.5rem→4.5rem, line-height 1.05), `title` (clamp 1.875rem→3rem, 1.1), `lead` (1.25rem, 1.6).
   - `maxWidth.prose-narrow: '38rem'`.
3. **Fonts.** In `app/layout.tsx`, replace Work Sans / Newsreader with `next/font/google`:
   - `Montserrat` weights 600, 700 → `--font-heading`
   - `Open_Sans` weights 400, 600 → `--font-sans`
   - `Satisfy` weight 400 → `--font-script`
   - All with `display: 'swap'`, `subsets: ['latin']`. Add `fontFamily.script` in Tailwind.
4. **Base styles** in `globals.css`:
   - `body`: `bg-paper text-forest font-sans`, plus a subtle paper grain (reuse the SVG noise idea from `.bg-linen`, at very low opacity, fixed so it doesn't scroll-shimmer). Grain must not reduce text contrast.
   - `h1–h4`: `font-heading font-bold text-forest`, `text-wrap: balance`.
   - `:focus-visible`: 3px `clay` outline, 3px offset, on everything. Remove any `outline: none`.
   - `@media (prefers-reduced-motion: reduce)`: kill transitions and animations (`*, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }`).
   - `.btn-primary`: `bg-clay text-linen hover:bg-clay-dark`, min-height 44px, rounded-full. `.btn-secondary`: outlined `forest` on paper. Remove `.btn-outline` coral-on-paper text (fails contrast) — make it an alias of `.btn-secondary`.
   - `.font-script` utility stays from Tailwind; add `.eyebrow` in `moss`.
   - `.reveal` class: `opacity:0; translate: 0 12px; transition: opacity .6s ease, translate .6s ease;` and `.reveal.is-visible { opacity:1; translate:0 0 }`. Under reduced motion `.reveal` is always visible.
5. **Reveal hook.** `components/ui/Reveal.tsx` — a tiny client component wrapping children in a div with `.reveal`, adding `is-visible` once via IntersectionObserver (threshold 0.15, unobserve after). No library.
6. Update `app/layout.tsx` body classes to the new tokens. Don't restyle individual pages beyond what's needed to keep them readable.

## Done when
- No reference to Work_Sans or Newsreader remains.
- Headings render in Montserrat, body in Open Sans (check in dev tools).
- Tabbing through the home page shows a visible clay focus ring on every link/button.
- `npm run build` and `npm run lint` pass; existing pages still render.
