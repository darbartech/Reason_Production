# 02 — Brand Design System (logo-derived, copy-paste ready)

**Approach:** keep your existing token *names* (`primary`, `accent`, `crimson`, `brand.*`) and change the *values*. Because components already reference those names, most of the site updates automatically — that is what makes this a **minimum** transform.

---

## 1. Colours — sampled from your logo

I sampled the actual pixels of `public/logo/NEW.png`:

| Logo element | Sampled | Role in the system |
|---|---|---|
| "REASONS" wordmark | `#103158` | **Primary navy** — headings, nav text, dark sections |
| "EDUCATION FOUNDATION" tagline | `#339BBA` | **Logo cyan** — decoration, and text *on dark only* |
| Pen nib / arc (blue) | `#2067A0` – `#2A6EAD` | Secondary blue (charts, hover tints) |
| Pen nib / arc (red) | `#B8324A` (clean) | **Crimson** — the single CTA colour + tiny accents |

### Final palette (all contrast values verified)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `primary` (navy) | `#103158` | Headings, buttons (secondary), nav | 13.1 : 1 on white text |
| `primary-950` | `#091B34` | Footer, dark bands | white on it 17.2 : 1 |
| `accent` (blue) | `#0B6E8F` | Links, eyebrows, icons on light | 5.77 : 1 on white · 5.29 on paper |
| `accent-light` | `#339BBA` | Icons/links **on navy only** | 5.37 : 1 on `#091B34` |
| `crimson` | `#B8324A` | **Primary CTA button**, hairline rules | white on it 5.84 : 1 |
| `crimson-dark` | `#9C2A3F` | CTA hover | white on it 7.46 : 1 |
| `paper` | `#F7F5F0` | Alternate section background (warm off-white) | — |
| `ink` | `#14213A` | Body text | 16.0 : 1 on white |
| `muted` | `#55657A` | Secondary text | 5.95 : 1 on white · 5.46 on paper |
| `line` | `#E3E7EE` | Borders / dividers | — |

**Usage ratio (keep it restrained):** ~70% white/paper · ~20% navy · ~7% blue · ~3% crimson.

**Rules**
- One crimson button per screen. Everything else is navy/outline.
- Never use `#18A9C7` (old cyan) as text on white — it fails (2.79 : 1).
- No gradients, blobs, glass blur. The only overlay allowed is a flat `bg-primary-950/40` on photos where text sits on them.
- WhatsApp green `#25D366` only on the WhatsApp button.
- Form errors: use a different red than crimson (`#B42318`) **plus an icon and text**, so error ≠ brand.

> If the owner prefers a calmer feel, make the primary CTA navy (`bg-primary`) and keep crimson only for the small rule beside eyebrows. Both work; crimson gives clearer conversion contrast and uses your logo's second colour.

---

## 2. Fonts

**Current:** Inter + Lora (bold, everywhere, up to 72px).
**Problem is weight and size more than the families** — but Lora-bold is the "textbook" feel.

**Recommended pairing (both on Google Fonts / `next/font`, self-hosted at build, no extra packages):**

| Role | Font | Why |
|---|---|---|
| Headings | **Newsreader** (variable, weights 400–700) | Refined editorial serif with optical sizing; reads "established institution" without feeling dated. Use at **500–600**, never 900 |
| Body / UI | **Hanken Grotesk** (variable) | Clean, slightly warmer than Inter, very legible on low-end Android screens |

Fallbacks: `Georgia, 'Times New Roman', serif` and `system-ui, sans-serif`.
If you'd rather change nothing in families: keep Lora + Inter but follow the *weight and size* rules below — that alone removes most of the "template" feel.

### `src/app/layout.tsx` — font setup (replace the Inter/Lora block)

```tsx
import { Newsreader, Hanken_Grotesk } from "next/font/google";

const heading = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// ...
<html lang="en" className={`${heading.variable} ${body.variable}`}>
```

---

## 3. `tailwind.config.ts` — replace `theme.extend.colors` and `fontFamily`

Names are preserved so existing classes keep working.

```ts
colors: {
  primary: {
    DEFAULT: "#103158",
    50:  "#F1F4F9",
    100: "#E4EAF3",
    200: "#C9D3E0",
    300: "#9FB0C5",
    400: "#6E849F",
    500: "#4A6485",
    600: "#2A5A94",
    700: "#1B4577",
    800: "#103158",
    900: "#0C2749",
    950: "#091B34",
  },
  accent: {
    DEFAULT: "#0B6E8F",   // text/links/icons on light
    light:   "#339BBA",   // logo cyan — on dark surfaces only
    50:  "#E8F4F8",       // (was an off-brand emerald tint)
    100: "#D2E9F1",
    500: "#0B6E8F",
    600: "#339BBA",       // kept so old `accent-600` usages don't break
  },
  crimson: {
    DEFAULT: "#B8324A",
    dark:    "#9C2A3F",
    50:      "#FBEFF1",
  },
  paper: "#F7F5F0",
  ink:   "#14213A",
  muted: "#55657A",
  line:  "#E3E7EE",
  brand: {                // legacy aliases → existing components keep working
    navy: "#103158",
    "navy-secondary": "#0C2749",
    blue: "#0B6E8F",
    cyan: "#339BBA",
    crimson: "#B8324A",
    "light-bg": "#F7F5F0",
    text: "#14213A",
    "text-muted": "#55657A",
    border: "#E3E7EE",
  },
},
fontFamily: {
  sans:    ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
  heading: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
},
borderRadius: {            // calmer than the current 2xl/3xl everywhere
  DEFAULT: "6px",
},
boxShadow: {
  card:  "0 1px 2px rgba(16,49,88,.06), 0 8px 24px -12px rgba(16,49,88,.12)",
  lift:  "0 2px 4px rgba(16,49,88,.06), 0 16px 32px -16px rgba(16,49,88,.18)",
},
maxWidth: { content: "1200px", prose: "65ch" },
```

Remove the `float` animation (decorative) — keep `fade-in` and `slide-up` but only use on the hero.

---

## 4. `src/styles/globals.css` — full replacement

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

  body {
    @apply font-sans bg-white text-ink antialiased overflow-x-hidden;
    font-size: 1rem;           /* 16px */
    line-height: 1.7;
    text-rendering: optimizeLegibility;
  }

  :focus-visible { @apply outline-none ring-2 ring-accent ring-offset-2; }

  /* Headings: serif, MEDIUM weight, fluid size. Components should NOT re-specify size/weight. */
  h1, h2, h3, h4 { @apply font-heading text-primary; font-optical-sizing: auto; }

  h1 { font-size: clamp(2.25rem, 1.55rem + 2.8vw, 3.75rem); line-height: 1.08; letter-spacing: -0.02em; font-weight: 500; }
  h2 { font-size: clamp(1.75rem, 1.3rem + 1.7vw, 2.75rem); line-height: 1.15; letter-spacing: -0.015em; font-weight: 500; }
  h3 { font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem); line-height: 1.3;  letter-spacing: -0.005em; font-weight: 600; }
  h4 { font-size: 1.125rem; line-height: 1.4; font-weight: 600; }

  p  { @apply text-ink; max-width: 68ch; }          /* 16px body, readable measure */
  .lead { font-size: clamp(1.0625rem, 1rem + 0.35vw, 1.25rem); line-height: 1.6; @apply text-muted; }

  /* Dark surfaces: flip heading + text colours in one place */
  .surface-dark { @apply bg-primary-950 text-primary-200; }
  .surface-dark h1, .surface-dark h2, .surface-dark h3, .surface-dark h4 { @apply text-white; }
  .surface-dark p { @apply text-primary-200; }
  .surface-dark a:not(.btn) { @apply text-accent-light; }
}

@layer components {
  .container-custom { @apply mx-auto w-full max-w-content px-5 sm:px-8 lg:px-10; }
  .section-padding  { @apply py-16 md:py-24 lg:py-28; }
  .section-tight    { @apply py-10 md:py-14; }

  /* Eyebrow: plain text with a short crimson rule. Replaces pill badges. */
  .eyebrow {
    @apply inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase text-accent;
    letter-spacing: 0.14em;
  }
  .eyebrow::before { content: ""; @apply block h-px w-6 bg-crimson; }
  .surface-dark .eyebrow { @apply text-accent-light; }

  /* Buttons: 48px high, 8px radius, one crimson primary per screen */
  .btn { @apply inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[0.9375rem] font-semibold
                 transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none; }
  .btn-primary   { @apply btn bg-crimson text-white hover:bg-crimson-dark; }
  .btn-navy      { @apply btn bg-primary text-white hover:bg-primary-900; }
  .btn-secondary { @apply btn border border-primary/25 bg-white text-primary hover:border-primary hover:bg-primary-50; }
  .btn-outline   { @apply btn border border-primary/25 bg-transparent text-primary hover:border-primary hover:bg-primary-50; }
  .btn-ghost     { @apply btn bg-transparent text-primary hover:bg-primary-50; }
  .btn-on-dark   { @apply btn border border-white/30 bg-transparent text-white hover:bg-white/10; }

  /* Cards: border first, soft shadow only on hover, no vertical "lift" jump */
  .card        { @apply rounded-xl border border-line bg-white; }
  .card-hover  { @apply transition-shadow duration-200 hover:shadow-card; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .content-auto { content-visibility: auto; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

---

## 5. Type scale (what you should see on screen)

| Element | Mobile (360px) | Desktop (1280px) | Weight | Font |
|---|---|---|---|---|
| Hero H1 | ~36px | **60px** (was 72) | 500 | Newsreader |
| Section H2 | ~28px | **44px** | 500 | Newsreader |
| Card H3 | 20px | 24px | 600 | Newsreader |
| Lead paragraph | 17px | 20px | 400 | Hanken |
| Body | **16px** (was 18) | 16–17px | 400 | Hanken |
| Eyebrow / label | 12px caps, +14% tracking | 12px | 600 | Hanken |
| Button | 15px | 15px | 600 | Hanken |

Rules: no `font-black`; no `tracking-tighter`; max line length 65–68 characters; headings never wider than ~20ch on mobile (use `text-balance`).

---

## 6. Spacing, radius, shadow

| Property | Old | New |
|---|---|---|
| Section vertical padding | 48 → 96px | **64 → 112px** (more air) |
| Card radius | `rounded-2xl` (16px) | `rounded-xl` (12px); buttons 8px; photos 8–12px; pills only for tiny tags |
| Card hover | translate-up + shadow | shadow only |
| Container | 1280px | 1200px |
| Icon tiles | 56–64px coloured squares | 40px, outline icon, no background — or drop the icon |

---

## 7. Replace the pill + two-tone heading with one component

Create `src/components/SectionHeader.tsx`:

```tsx
import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export default function SectionHeader({
  eyebrow, title, intro, align = "left", as: Tag = "h2", id,
}: Props) {
  const center = align === "center";
  return (
    <header className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <Tag id={id} className="text-balance">{title}</Tag>
      {intro && <p className={`lead mt-4 ${center ? "mx-auto" : ""}`}>{intro}</p>}
    </header>
  );
}
```

Then, in every section component, replace the badge + H2 + paragraph block with:

```tsx
<SectionHeader eyebrow="Services" title="Everything from course choice to visa filing" intro="One team handles your counselling, applications, IELTS/PTE and documents." />
```

Titles are one colour. If you want emphasis, use `<em className="italic">` (Newsreader italic looks elegant) instead of a colour change.

---

## 8. One-time heading clean-up script

Existing components hard-code heading sizes/weights (`text-5xl font-bold tracking-tighter`) which override the new base styles. This script strips those from `<h1>`–`<h4>` class lists so the new global scale applies. **Run it, then review `git diff`.**

Save as `scripts/normalize-headings.mjs` and run `node scripts/normalize-headings.mjs`:

```js
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src";
// utilities to strip from heading class lists (sizes, weights, leading, tracking)
const STRIP = /(^|\s)((?:[a-z]+:)*)(text-(?:xs|sm|base|lg|[1-9]?xl)|font-(?:thin|light|normal|medium|semibold|bold|extrabold|black)|leading-[\w.\[\]\/-]+|tracking-[\w-]+)(?=\s|$)/g;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes("/admin/") || file.includes("/enquiry/")) continue;  // leave admin + enquiry form alone
  const src = readFileSync(file, "utf8");
  const out = src.replace(
    /(<h[1-4]\b[^>]*?className=")([^"]*)(")/g,
    (_, a, cls, c) => {
      const cleaned = cls.replace(STRIP, "$1").replace(/\s+/g, " ").trim();
      return a + cleaned + c;
    }
  );
  if (out !== src) { writeFileSync(file, out); changed++; console.log("updated", file); }
}
console.log(`\n${changed} files updated. Review with: git diff`);
```

Note: it keeps colour classes (`text-white`, `text-accent`, `text-primary`) so headings on dark backgrounds stay white. Headings inside dark sections should still carry `text-white`, or wrap the section in `.surface-dark`.

Also run these find-and-replace operations project-wide (VS Code → Replace in Files):

| Find | Replace with |
|---|---|
| `font-black` | `font-semibold` |
| `tracking-tighter` | `tracking-tight` |
| `rounded-3xl` | `rounded-xl` |
| `rounded-2xl` | `rounded-xl` |
| `<span className="text-accent"> ` inside headings | remove the span (keep inner text) — review manually (14 places) |

---

## 9. Logo usage

- Your logo is a **transparent PNG, 753×326** with a navy wordmark. It works on white/paper only.
- **Ask your designer for:** (a) an **SVG** of the logo (sharp at any size, ~5 KB vs 139 KB), (b) a **reversed/white** version for dark footer and CTA bands, (c) a square **icon-only** mark (pen+book+globe) for favicon and social avatars.
- **Interim (no new files):** in the dark footer, place the logo on a white rounded plate (`bg-white p-3 rounded-lg`). Do **not** CSS-invert it into a flat white shape without designer approval.
- Navbar logo height: **40px mobile / 48px desktop**, no hover scale (`group-hover:scale-105` removed), clear space ≥ the height of the "R".
- Favicon: currently the full wide logo is used as favicon/apple icon — at 16×16 it's unreadable. Use the icon-only mark.
- Make the brand name text match the logo/legal name (see File 04 §1).
