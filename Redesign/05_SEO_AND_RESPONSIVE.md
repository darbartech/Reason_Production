# 05 — SEO, Performance & Responsive Rules

Your SEO scaffolding is already above average (Metadata API, canonicals, sitemap, robots, JSON-LD). The gains now come from **accuracy, unique content, real images, local SEO, and speed on mobile in Nepal**.

---

## 1. Quick fixes (do these first — each is < 1 hour)

| # | Fix | Where |
|---|---|---|
| 1 | Replace the **Unsplash OG/Twitter image** with a branded, self-hosted `1200×630` image | `layout.tsx`, `page.tsx`, every page with `images: [...]` |
| 2 | **Remove `notranslate: true`** from robots metadata (blocks Google's "Translate this page" — unhelpful for a bilingual audience) | `layout.tsx` |
| 3 | Fix **opening-hours conflict** and use `company.hours` everywhere | `CTA.tsx`, `Schema.tsx`, footer, contact |
| 4 | Remove **superlatives and "98%"** from titles/descriptions | `page.tsx`, country pages, `ielts`, `study-abroad` |
| 5 | Delete guessed **`sameAs`** social URLs and `numberOfEmployees` from schema | `Schema.tsx` |
| 6 | **Sitemap `lastModified`**: stop using `new Date()` for everything | `sitemap.ts` |
| 7 | Remove the unverifiable `"icef consultancy nepal"` keyword | `page.tsx` |
| 8 | Favicon: use the icon-only mark, not the wide logo | `layout.tsx` icons |
| 9 | Keep admin pages `noindex` (already set in `admin/layout.tsx` ✔) — `robots.txt` alone does not stop a linked URL being indexed | `admin/layout.tsx` |

> The `keywords` meta tag is ignored by Google. Keeping it is harmless but it's not doing SEO work; spend the time on titles, headings and page content instead.

---

## 2. Metadata — one helper instead of 20 copy-pasted blocks

Every page repeats `authors`, `creator`, `publisher`, `robots`, `openGraph`, `twitter` (hundreds of lines). Centralise it.

```ts
// FILE: src/lib/seo.ts
import type { Metadata } from "next";
import { company } from "./company";

const DEFAULT_OG = "/og/default.png"; // 1200×630, self-hosted, branded (logo on paper background)

type Opts = {
  title: string;            // page title WITHOUT the site suffix (the template adds it)
  description: string;      // 120–155 characters
  path: string;             // "/countries/canada"
  image?: string;           // "/og/canada.png"
  absoluteTitle?: boolean;  // homepage only
};

export function buildMetadata({ title, description, path, image = DEFAULT_OG, absoluteTitle }: Opts): Metadata {
  const url = `${company.url}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: company.displayName,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
```

`layout.tsx` keeps only the global parts:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: `Study Abroad Consultancy in Kathmandu | ${company.displayName}`, template: `%s | ${company.displayName}` },
  description: "Study abroad counselling, IELTS/PTE classes and visa documentation in New Baneshwor, Kathmandu.",
  applicationName: company.displayName,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },   // icon-only mark, 512×512 and 180×180
};
```
(Next also picks up `src/app/icon.png` and `apple-icon.png` automatically.)

Use per page:

```ts
export const metadata = buildMetadata({
  title: "Study in Canada from Nepal: Costs & Visa",
  description: "Costs in NPR, intakes, IELTS requirements and the study permit steps for Nepali students applying to Canada. Updated for 2026.",
  path: "/countries/canada",
  image: "/og/canada.png",
});
```

### Proposed titles (checked: total ≤ 60 chars incl. suffix where possible)

| Page | Title (suffix ` \| Reasons Education` added by template) |
|---|---|
| `/` (absolute) | Study Abroad Consultancy in Kathmandu \| Reasons Education |
| `/study-abroad` | Study Abroad from Nepal: Process & Visas |
| `/ielts` | IELTS & PTE Classes in New Baneshwor |
| `/services` | Counselling, Visa & Document Services |
| `/countries` | Study Destinations for Nepali Students |
| `/countries/canada` | Study in Canada from Nepal: Costs & Visa |
| `/countries/{x}` | Study in {X} from Nepal: Costs & Visa |
| `/contact` | Contact & Visit Our Kathmandu Office |
| `/about` | About Us |
| `/blog` | Study Abroad Guides for Nepali Students |
| `/faq` | Study Abroad FAQs |
| `/b2b` | Partnerships for Colleges & Universities |

Descriptions: 120–155 chars, one concrete benefit, no superlatives, no "98%".

---

## 3. Structured data — replace `Schema.tsx`

Fixes: wrong/guessed fields, hours conflict, wrong type (use an education/professional-service type), and adds breadcrumbs.

```tsx
// FILE: src/components/Schema.tsx
import { company } from "@/lib/company";

const DAY_MAP = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // Sun–Fri office week in Nepal

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Schema() {
  const sameAs = Object.values(company.social).filter(Boolean); // only real profiles

  const org = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "ProfessionalService"],
    "@id": `${company.url}/#organization`,
    name: company.legalName,
    alternateName: company.displayName,
    url: company.url,
    logo: `${company.url}/logo/NEW.png`,
    image: `${company.url}/images/office-exterior.webp`, // real office photo
    telephone: company.phoneTel,
    email: company.email,
    foundingDate: String(company.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode,
      addressCountry: "NP",
    },
    geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP,
      opens: company.hours.open,
      closes: company.hours.close,
    }],
    areaServed: { "@type": "Country", name: "Nepal" },
    knowsAbout: ["Study abroad counselling", "IELTS preparation", "PTE preparation", "Student visa documentation"],
    ...(sameAs.length ? { sameAs } : {}),
    // Do NOT add aggregateRating from self-published testimonials — Google ignores/penalises it.
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: company.displayName,
    publisher: { "@id": `${company.url}/#organization` },
  };

  return <JsonLd data={[org, website]} />;
}

// Breadcrumbs: call on country, blog and service pages
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${company.url}${it.path}`,
        })),
      }}
    />
  );
}
```

Notes
- Keep the existing **Article/BlogPosting** schema on blog posts; add the author's profile URL and `dateModified`.
- FAQ pages: `FAQPage` markup is fine to keep, but since 2023 Google shows FAQ rich results mainly for government/health sites — don't expect a visual change.
- Validate in Google's Rich Results Test and Schema.org validator after deploy.

---

## 4. Sitemap & robots

```ts
// sitemap.ts — use real dates. Google ignores changeFrequency/priority, so drop them.
const countryUpdated: Record<string, string> = {
  canada: "2026-03-01", usa: "2026-03-01", uk: "2026-03-01",
  australia: "2026-03-01", "new-zealand": "2026-03-01", europe: "2026-03-01", japan: "2026-03-01",
}; // update the date whenever you actually update that page

const countryRoutes = Object.entries(countryUpdated).map(([slug, d]) => ({
  url: `${baseUrl}/countries/${slug}`, lastModified: new Date(d),
}));

const posts = blogPosts.map((p) => ({
  url: `${baseUrl}/blog/${p.slug}`, lastModified: new Date(p.dateISO ?? p.date),
}));
```
- Store blog dates as **ISO strings** (`"2026-04-10"`) — currently `"April 10, 2026"`, which parses differently across environments.
- `robots.ts`: fine as is. After launch, submit the sitemap in **Google Search Console** and **Bing Webmaster Tools**.

---

## 5. Pages & keywords (one primary intent per page)

| Page | Primary keyword (intent) | H1 |
|---|---|---|
| `/` | study abroad consultancy Kathmandu | Study abroad, planned one step at a time |
| `/study-abroad` | study abroad from Nepal | Study abroad from Nepal: how it works |
| `/countries/canada` | study in Canada from Nepal | Study in Canada from Nepal: costs, intakes and visa steps |
| `/countries/australia`, `/uk`, `/usa`, `/new-zealand`, `/europe`, `/japan` | study in {country} from Nepal | same pattern |
| `/ielts` | IELTS classes in Baneshwor / Kathmandu | IELTS & PTE classes in New Baneshwor |
| `/services` | education consultancy services Kathmandu | Study abroad services in Kathmandu |
| `/contact` | Reasons Education Kathmandu (brand + local) | Contact and visit our office |
| Blog posts | long-tail questions ("IELTS band needed for Australia student visa Nepal") | the question itself |

One `<h1>` per page, descriptive `<h2>`s that match what people search ("Cost of studying in Canada from Nepal"), and internal links between country ⇄ blog ⇄ IELTS ⇄ contact.

---

## 6. Country pages — the biggest SEO + trust opportunity

The seven pages come from one template (`CountryPageTemplate`) fed by ~3.6 KB of data each, so Google may see them as **thin and near-duplicate**. They also carry **time-sensitive visa facts that go stale**.

**Concrete example of why this matters:** the Canada page and the Canada blog guide still describe the **SDS stream and a GIC amount** as current. IRCC **closed SDS on 8 November 2024** (all applicants now use the regular stream), and the proof-of-funds figure has been revised since, with secondary sources quoting different amounts. For a visa-information site, outdated rules are a trust and credibility killer — and a risk to students. **Check every number against the official government page** (IRCC for Canada, DHA/Home Affairs for Australia, UKVI/gov.uk, etc.) before launch.

### Add these fields to the template and fill each page with real, country-specific content

| Field | Why |
|---|---|
| `lastUpdated` (ISO date, shown on page) | Freshness + trust |
| `officialSources[]` (links to government/university pages) | E-E-A-T |
| `costsNPR` — tuition + living in **NPR**, with the exchange-rate date | Nepal-specific, uniquely useful |
| `intakes` + application deadlines | Search intent |
| `englishRequirements` (IELTS/PTE by level) | High-volume queries |
| `proofOfFunds` and **who needs what** | Frequent refusal cause |
| `workRights` (hours, post-study work) | High-interest |
| `processingTime` (official vs. what students experienced) | Realistic expectations |
| `commonRefusalReasons` | Genuinely helpful; shows expertise |
| `scholarships` | Search intent |
| `ourRole` — what Reasons does at each step | Conversion |
| `studentStory` (real, consented) | Social proof |
| `faqs` (6–8, **specific** to the country) | Long-tail + FAQ schema |

Target **900–1,500 words of unique content** per country page. Add `Breadcrumbs` schema and a visible breadcrumb (`PageHero` crumbs).

---

## 7. Local SEO (cheap, high impact for a Kathmandu business)

1. **Google Business Profile**: claim it; category *Educational consultant* (+ *Study abroad consultant* if offered); address, hours (Sun–Fri), phone, website, services, **real photos**; post monthly.
2. **NAP consistency**: Name, Address, Phone identical on website, GBP, Facebook, directories. Same `company.ts` values.
3. **Reviews**: ask every successful student for a Google review via a WhatsApp link; reply to all reviews.
4. **Contact page**: embedded Google Map (lazy-loaded iframe, `loading="lazy"`), driving/landmark directions ("Indreni Complex, New Baneshwor, near ___").
5. Bing Places and Nepal business/education directories (consistent NAP).
6. Local content: "IELTS classes in Baneshwor", "documents needed for student visa — Kathmandu", exam-centre guidance.
7. `Nepal` language targeting: leave `<html lang="en">`. Consider `/ne/` Nepali summaries later with `hreflang`.

---

## 8. Images & performance (critical on mobile networks)

Your `next.config.mjs` uses `output: "export"` with `images.unoptimized: true`. That means **Next will not resize or compress images for you** — you must supply optimised files.

### 8.1 Self-host everything
- Download/replace all **78 Unsplash URLs** (`grep -rn "images.unsplash.com" src`) with files under `/public/images/...`.
- Remove the `remotePatterns` entry in `next.config.mjs` when done.
- Name files descriptively (`canada-campus-street.webp`), add `width`/`height` or `fill` + `sizes`.

### 8.2 One-time optimisation script
```bash
npm i -D sharp
node scripts/optimize-images.mjs
```
```js
// FILE: scripts/optimize-images.mjs
// Put originals in /raw-images (git-ignored). Outputs web-ready WebP to /public/images.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";

const IN = "raw-images", OUT = "public/images", MAX_W = 1600, QUALITY = 78;
mkdirSync(OUT, { recursive: true });

for (const f of readdirSync(IN)) {
  if (!/\.(jpe?g|png|webp|heic)$/i.test(f)) continue;
  const name = parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await sharp(join(IN, f))
    .rotate()                                        // respect phone orientation
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(join(OUT, `${name}.webp`));
  console.log("✓", name + ".webp");
}
```
Budgets: hero ≤ 200 KB; cards ≤ 100 KB; team portraits ≤ 60 KB; OG images PNG/JPG ≤ 300 KB.

### 8.3 Loading rules
- `priority` **only** on the hero image. Everything else lazy (default).
- Always give `sizes` so phones download the small version.
- Fonts: two families, `display: "swap"`, `subsets: ["latin"]` (done via `next/font`, self-hosted at build).
- Don't hotlink third-party scripts. Add analytics via a single lightweight script (GA4 or Plausible), loaded `afterInteractive`.
- Remove unused `lucide-react` imports; keep `use client` only on components that need state (Navbar, forms).

### 8.4 Targets (measure with PageSpeed Insights on **mobile**)
| Metric | Target |
|---|---|
| LCP | < 2.5 s (hero image is the LCP element) |
| INP | < 200 ms |
| CLS | < 0.1 |
| Total mobile page weight (home) | < 1.5 MB |
| Lighthouse (Mobile) | Performance 90+, Accessibility 95+, SEO 100 |

### 8.5 Hosting headers (static export can't set these in `next.config`)
Set at the host (Netlify `_headers`, Vercel `vercel.json`, nginx, etc.):
- `/_next/static/*` → `Cache-Control: public, max-age=31536000, immutable`
- `/images/*`, `/logo/*` → `Cache-Control: public, max-age=2592000`
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- Redirect `www` ↔ apex and `http` → `https` (one canonical host: `https://reasons.edu.np`).

---

## 9. Responsive rules

**Test widths:** 360 (most common Android), 390 (iPhone), 768, 1024, 1280, 1536.
Design **mobile-first**: write base classes for 360px, then add `sm:`/`md:`/`lg:` upgrades.

### Rules
1. **No horizontal scroll** at any width (`overflow-x-hidden` on body is a band-aid; fix the cause — usually fixed widths, long words, wide tables). Wrap tables in `overflow-x-auto`.
2. **Tap targets ≥ 44 × 44 px**; spacing ≥ 8px between adjacent buttons. Buttons are 48px tall in File 02.
3. **Fluid type** via `clamp()` (done in File 02) — no abrupt jumps; H1 never wider than the viewport.
4. **Hero order on mobile:** headline → CTAs → proof → image (not image-first).
5. Use `min-h-[100svh]`, not `100vh` (mobile address-bar jump).
6. **Grids:** 1 col (<640) → 2 col (640–1023) → 3–4 col (≥1024). Don't force 3 columns below 1024.
7. **Forms:** inputs `text-base` (16px) to prevent iOS zoom; `type="tel"` + `inputmode="tel"` for phone, `type="email"`, correct `autocomplete`; labels visible; error text next to the field; submit button full-width on mobile.
8. **Images:** `sizes` set, aspect ratio reserved (`aspect-[4/3]`), no layout shift.
9. **Safe areas:** pad bottom bars with `env(safe-area-inset-bottom)`.
10. `prefers-reduced-motion` respected (File 02).
11. Modals/drawers: lock scroll, trap focus, close on Esc (existing mobile menu locks scroll ✔; add Esc handler).

### Sticky mobile action bar (replaces the lone floating WhatsApp bubble on phones)
Most Nepali visitors are on mobile and prefer a call or WhatsApp to a form — put those actions one thumb-tap away.

```tsx
// FILE: src/components/MobileActionBar.tsx
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-2 p-2.5">
        <a href={`tel:${company.phoneTel}`} className="btn-secondary h-11 px-4" aria-label={`Call ${company.phoneDisplay}`}>
          <Phone size={18} aria-hidden="true" />
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary h-11 px-4" aria-label="Chat on WhatsApp">
          <MessageCircle size={18} aria-hidden="true" />
        </a>
        <Link href="/contact" className="btn-primary h-11">Free counselling</Link>
      </div>
    </div>
  );
}
```
Wiring (`layout.tsx`, inside `PublicOnly`):
```tsx
<Footer />
<WhatsAppButton />        {/* change its className to "hidden lg:flex ..." so it only shows on desktop */}
<MobileActionBar />
```
and give the footer/body bottom padding on mobile: `<main className="pb-16 lg:pb-0">`.

Update `WhatsAppButton.tsx` to use `whatsappLink()` from `company.ts` (one source for the number).

---

## 10. Accessibility (also helps SEO)

- Contrast verified for the new palette (File 02). Never use `accent-light` (`#339BBA`) on white.
- Visible focus ring (kept in `globals.css`).
- One `<h1>` per page; heading levels not skipped; landmarks: `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`.
- Add a **"Skip to content"** link as the first element in `<body>`:
  `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>`
- All informative images have meaningful `alt`; decorative ones `alt=""` / `aria-hidden`.
- Link text describes destination (no bare "Learn more").

---

## 11. Measurement

- Verify the domain in **Google Search Console**; submit sitemap; watch *Pages* and *Core Web Vitals*.
- Add one analytics tool (GA4 or Plausible) and track three events: **enquiry form submit**, **WhatsApp click**, **phone click** (`tel:`). These tell you which pages actually generate leads.
- Review monthly: top queries, pages with impressions but low CTR (rewrite titles), country pages' average position.

---

## 12. Pre-launch QA

- [ ] `npm run build` passes; no console errors
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO 100 (home, a country page, blog post, contact)
- [ ] All images local, WebP, within budgets; no `images.unsplash.com` in the built `out/` HTML (`grep -r unsplash out/ | wc -l` → 0)
- [ ] Title/description unique on every page; one H1 per page
- [ ] Canonical URLs correct (`https://reasons.edu.np/...`, no trailing-slash mismatch)
- [ ] Schema valid (Rich Results Test); address/hours/phone match GBP
- [ ] Sitemap lists only real pages with real dates; robots OK
- [ ] 360 / 390 / 768 / 1024 / 1280 manual pass: no horizontal scroll, buttons tappable, forms usable
- [ ] Sticky mobile bar doesn't cover form buttons or footer content
- [ ] Every statistic and visa rule has a documented source; country pages show *Last updated*
- [ ] Contact form tested end-to-end (submits, saves to admin, success message)
