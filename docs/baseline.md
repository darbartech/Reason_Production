# Baseline — 1 November 2026

Recorded before the Phase 0–6 transformation work.

## Build

| Item | Result |
|---|---|
| Command | `npm run build` |
| Status | Pass (after fixing 4 `react/no-unescaped-entities` lint errors) |
| Next.js | 14.2.35 |
| Output | Static export (`output: "export"` in production) |
| Routes | 33 prerendered routes |

## Configuration

- `next.config.mjs`: `images.unoptimized: true` (static export cannot use the Next image optimiser).
- Production serves `/out` through `server.js`; `/api/*` is proxied to Express on port 8000 in dev.
- Fonts: Newsreader (`adjustFontFallback: false`) and Hanken Grotesk via `next/font/google`.

## Known baseline issues at audit

1. Hero callback form writes `fullName`, `phone` and `preferredDestination` into the contact-page URL; the contact form never reads them.
2. `company.registration` and `company.social` are empty, so `CredentialsStrip` renders nothing.
3. About page team uses initials circles plus “Roster and bios are a work in progress.”
4. All imagery is stock WebP at a single size; no AVIF or `srcset`.
5. Logo is a palette PNG; footer applies `brightness-0 invert`.
6. Inner pages (Study Abroad, IELTS, B2B, Services) use hand-written buttons and mismatched section openers.
7. Country cards are rendered twice (desktop grid + mobile strip).
8. Country pages carry hard-coded `lastUpdated` dates and thin content.
9. Sitemap uses build time for `lastModified`.
10. IELTS/PTE prices are duplicated in `FAQ.tsx` and `faq/page.tsx`.

## Lighthouse / axe

Not captured in this environment. Lighthouse and axe require a running browser
session; the Phase 6 quality gate re-checks the same routes once the rebuild is
in place. Target routes: `/`, `/countries/canada`, `/ielts`, `/contact`.
Widths: 360, 768, 1440.

## Responsive baseline

No automated width-matrix run was recorded. The Phase 6 pass checks the full
matrix (360, 390, 430, 768, 834, 1024, 1280, 1440, 1920, 2560).
