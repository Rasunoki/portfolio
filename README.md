# Portfolio — Joseph Rafael A. Macasling

Single-page portfolio for a music video director, photographer, and designer.
Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build         # production build
npm start             # serve the production build
npm run lint          # eslint
npm run build:resume  # regenerate public/resume.pdf from the site data
```

## Configuration

All identity, links, and the featured showreel video live in one file:
[`src/data/site.ts`](src/data/site.ts). Metadata, the sitemap, `robots.txt`,
the OG image, and the JSON-LD structured data all read from it, so changing a
link or the deployed URL means editing one place.

### Environment variables

Both are optional. Copy `.env.example` to `.env.local` to set them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for absolute URLs in metadata, `sitemap.xml`, `robots.txt`, and OG tags. On Vercel this is inferred from `VERCEL_PROJECT_PRODUCTION_URL`; set it explicitly for a custom domain. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | POST target for the contact form (e.g. a Formspree URL). **If unset, the form falls back to opening a pre-filled email** in the visitor's mail client, so it always works. |

## Content

| What | Where |
| --- | --- |
| Identity, socials, showreel video | `src/data/site.ts` |
| Projects and video lists | `src/data/projects.ts` |
| Work history and education | `src/data/experience.ts` |
| Gallery photos, alt text, categories | `src/data/gallery.ts` |
| Photo files | `public/gallery/` |

Gallery categories are derived from the photos themselves, so a filter can
never render an empty grid. Each photo stores its intrinsic `width`/`height`
so the masonry lays frames out uncropped.

## SEO

Generated automatically from `src/data/site.ts`:

- `/sitemap.xml` — homepage plus each in-page section anchor
- `/robots.txt`
- `/opengraph-image` and `/twitter-image` — 1200×630 PNGs rendered at build time
- `Person` JSON-LD in the document body

## Accessibility

- Every animation respects `prefers-reduced-motion`: the intro sequence and
  custom cursor are skipped entirely, and CSS animations are disabled.
- The gallery lightbox supports <kbd>Esc</kbd>, <kbd>←</kbd>, and <kbd>→</kbd>,
  locks background scroll, and restores focus to the thumbnail on close.
- Skip-to-content link, visible focus rings, and labelled landmarks throughout.
