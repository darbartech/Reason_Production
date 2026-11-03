# Image credits

The site now uses photography for the hero, section visuals, destination cards/banners, blog cards
and share images. Source files live in `src-photos/` (outside `public/`) and are processed by
`scripts/build-images.mjs` into AVIF + WebP at 640 and 1200 px wide.

## Photography status

| Asset set | Source | Licence / status |
| --- | --- | --- |
| `src-photos/hero/hero-counselling.jpg` | Restored from this project's original `public/images/hero/counselling-session.webp` (git history) | Source and licence not recorded in the repo. Owner to confirm or replace. |
| `src-photos/sections/{study-abroad,services-documents,b2b-meeting}.jpg` | Restored from the project's original `public/images/visuals/*` assets | As above. |
| `src-photos/countries/dest-*.jpg` | Restored from the project's original `public/images/countries/*` assets | As above. |
| `src-photos/blog/{blog-canada,blog-ielts,blog-sop,blog-hero}.jpg` | Restored from the project's original `public/images/blog/*` assets | As above. |

New external image downloads were blocked by the project's image policy, so no new third-party
files were added. If the owner supplies licensed replacements, drop them into `src-photos/` using the
same base names and run `npm run images`.

## Fonts

| Asset | Source | Licence |
| --- | --- | --- |
| `scripts/fonts/NewsreaderDisplay.ttf` | Newsreader, Google Fonts — static instance (opsz 72, wght 450) | SIL Open Font License 1.1 — `scripts/fonts/OFL-Newsreader.txt`. Used only for `/public/og/*.png`. |
| `scripts/fonts/HankenGrotesk.ttf` | Hanken Grotesk, Google Fonts | SIL Open Font License 1.1 — `scripts/fonts/OFL-HankenGrotesk.txt`. Used only for `/public/og/*.png`. |

## Brand and portrait assets

| Asset | Source | Licence / status |
| --- | --- | --- |
| `public/logo/logo.png` | Owner-supplied logo artwork | Proprietary. Never redrawn. |
| `public/logo/logo-reversed.png`, `favicon-*.png`, `apple-touch-icon.png` | Generated mechanically from `logo.png` by `scripts/build-brand-assets.mjs` | Same artwork, recoloured/resized. |
| `public/students/*.jpg` | Photographs supplied by the business | Published only after written student consent is recorded; see `src/content/testimonials.ts`. |
