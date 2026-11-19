# Whatever is Lovely — Kansas City Wedding Planning + Coordination

A wedding planning + coordination website for Kansas City couples, built
same-to-same from a design screenshot, on the Creatix stack: Astro 7 +
Tailwind CSS 4, GSAP + Lenis motion, self-hosted fonts, generated images
in AVIF/WebP/JPG.

**Live (once deployed):** https://whatever-is-lovely.pages.dev

## Stack

- Astro 7.4.12 (static output, `trailingSlash: 'always'`), TypeScript 7.0.2 (strict)
- Tailwind CSS 4.3.5 via `@tailwindcss/vite`
- GSAP 3.15.1 + Lenis 1.3.27 (`src/scripts/motion.ts`), `@astrojs/sitemap` 3.7.5
- Fonts self-hosted woff2 (`public/fonts/`): Cormorant Garamond (display),
  Inter (body), Great Vibes (script accent). No Google Fonts CDN.
- Images: generated masters in `masters/`, converted with
  `scripts/convert-images.mjs` (sharp) to AVIF/WebP/JPG @ 480/800/1200/1600
  in `public/images/`, rendered via `src/components/Picture.astro`.

## Routes (16)

Home `/`, Our Team `/our-team/`, Services `/services/` +
`/services/full-service-planning/`, `/services/partial-planning/`,
`/services/day-of-coordination/`, The Blog `/blog/` + 3 posts,
Work With Us `/work-with-us/`, FAQ `/faq/`, Privacy `/privacy/`,
Terms `/terms/`, Search `/search/` (noindex, excluded from sitemap),
404. Sitemap: 14 URLs (16 pages − 404 − `/search/`).

All content is mock data in one file: `src/data/site.ts` (prices in $,
Kansas City, MO focus). Nothing is real yet — replace before launch.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/
node scripts/screenshot.mjs   # desktop + mobile screenshots (needs preview running)
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys `dist/`
to Cloudflare Pages project `whatever-is-lovely`. Requires repo secrets
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
