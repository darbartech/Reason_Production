# 01 — Design Audit (what's wrong, with evidence)

Everything below was found in your actual code. Counts are from searching `src/`.

---

## A. Why it reads as "AI-generated / traditional"

### A1. One template, repeated everywhere
Every section is built from the same four parts:

```
[pill badge with icon]  →  [H2 with a colored second half]  →  [grey intro paragraph]  →  [grid of identical rounded cards with icon tile]
```

| Pattern | Count in code | Where |
|---|---|---|
| Pill badges (`rounded-full`, uppercase, tracking) | ~17 | Trust, Services, Destinations, Testimonials, CTA, About |
| Two-tone H2 (`<span className="text-accent">`) | 14 | Almost every section |
| Icon-in-rounded-square tile | every card grid | Trust, Services, Process, Study Abroad |
| `card-hover` lift on hover | 10 | Cards everywhere |
| `rounded-2xl` / `rounded-xl` | 58 / 73 | Everything is "bubbly" |

**Fix:** one `SectionHeader` (plain eyebrow text, one-color heading), fewer icon tiles, smaller radius. See File 03.

### A2. The hero is generic (`src/components/Hero.tsx`)
- Headline "Study Abroad: Your Future Beyond Borders" — says nothing specific; "Beyond Borders" and "bridge the gap between your potential and global excellence" are stock phrases.
- The proof row uses **three identical dot-in-circle icons** — decorative bullets with no meaning.
- Hero image is a **generic Unsplash stock photo**, which on mobile is `order-first`, pushing the headline and CTA below the fold.
- H1 goes to `text-7xl` (72px) in bold serif — shouting rather than reassuring.
- No phone number, no location, no credential visible in the first screen.

### A3. Typography is heavy and oversized
- `font-black` (900 weight) used **28×**; `text-7xl` on **14** headings; `text-9xl` on the 404.
- `globals.css` forces **every** `h1–h6` to bold Lora with `tracking-tight`; `h3` defaults to up to 36px (so cards must override it).
- Global `p { text-base sm:text-lg }` → **18px body copy everywhere**. Premium sites use 16–17px body and let headings do the work.
- Lora at 700 weight reads as "textbook/newspaper", not "modern consultancy".
- Some headings use `tracking-tighter`, which hurts legibility at small sizes.

### A4. Colour: close to the logo, but not working hard enough
Your tokens are already near the logo (navy `#071A33`, blue `#087EA4`, cyan `#18A9C7`, crimson `#B8324A`) — good. Problems:

| Issue | Detail |
|---|---|
| Crimson barely used | Site reads as monotone blue; the logo's red/blue duality is lost |
| `#18A9C7` (cyan) fails contrast on white | **2.79 : 1** (needs 4.5 for text). Only use on dark backgrounds |
| `#087EA4` text on white | 4.64 : 1 — passes, but barely; use a slightly deeper tone for text links |
| Cool grey-blue `#F6F9FC` surface | Reads "SaaS dashboard"; a warm off-white feels more editorial/premium |
| Logo is a transparent PNG with a **navy wordmark** | Disappears on dark backgrounds (footer/CTA are dark) — needs a reversed version |
| `bg-primary hover:bg-accent` buttons | Primary action changes colour family on hover — feels unsteady |

### A5. Photography
- **78 Unsplash references** in `src/`, including the hero, all 7 destination cards, the OG/Twitter share image, the schema `image`, and the About page.
- `CountryCard` puts `opacity-85` on the photo plus a black gradient → muddy images.
- Generic landmark shots; none show Nepal, your office, your students, your counselors.

### A6. Layout rhythm
- `section-padding` tops out at `py-24`; with 18px body and large cards, pages feel dense rather than airy.
- Max container 1280px with 3–4-col card grids everywhere; no editorial variation (no split sections, no large single-column text moments, no full-bleed photo band).

---

## B. Trust & credibility gaps (details in File 04)

| Finding | Where |
|---|---|
| **Stock Unsplash faces labelled as named staff** ("Rudesh Khadgi – CEO", etc.) | `src/app/about/page.tsx` team array |
| "**98% visa success**" with no definition or source | 8 files: `Hero`, `TrustIndicators`, `page.tsx`, `ielts`, `ServicesClient`, `study-abroad`, `canada`, `new-zealand` |
| "Approved Consultancy" badge, no registration shown | `Hero.tsx` |
| "ICEF-certified consultants" | `study-abroad/page.tsx`, and `icef consultancy nepal` keyword in homepage metadata |
| "Join thousands of successful students" | `Testimonials.tsx`, `about/page.tsx` — but destination cards sum to ~3,600 and aren't sourced |
| Per-country "Students Placed" figures | `StudyDestinations.tsx` |
| Testimonials: 4 people, all 5★, no date, no link to a verifiable source | `Testimonials.tsx` |
| Three brand names | Logo: *REASONS Education Foundation* · Site: *Reason Education Consultancy* · Docs: *Reason Education Foundation* |
| **Outdated visa information**: Canada page and Canada blog guide present the Student Direct Stream (closed 8 Nov 2024) and a GIC amount (since revised) as current | `countries/canada/page.tsx`, `lib/blog-data.ts` |
| Opening hours conflict | CTA says **Sun–Fri 7:00 AM–5 PM**; schema says **Mon–Fri + Sun 10:00–17:00** |
| Social profiles in schema look guessed | `Schema.tsx` `sameAs` (facebook/instagram/linkedin/twitter URLs) |

---

## C. Technical issues that hurt SEO / speed (details in File 05)

- `images.unoptimized: true` (needed for static export) → **no automatic image compression**; images must be pre-optimized by you.
- Hotlinked Unsplash = third-party dependency for LCP image and OG image (can break, slow in Nepal, license ambiguity).
- `robots: { notranslate: true }` in `layout.tsx` — tells Google not to offer translation; unhelpful for a bilingual audience.
- `sitemap.ts` sets `lastModified: new Date()` on every build → tells Google everything changed daily.
- Titles use superlatives ("Best Study Abroad Experts in Nepal") — risky, unverifiable, and rewritten by Google more often.
- Seven country pages are ~3.6 KB source each driven by one template → **thin/near-duplicate content risk**.
- Admin routes are disallowed in `robots.txt` but should also carry `noindex`.

---

## D. What's already good (keep it)

- Clear information architecture: Study Abroad · Countries · IELTS/PTE · Services · B2B · Blog · Contact.
- Metadata API, canonical URLs on 20 pages, `sitemap.ts`, `robots.ts`, JSON-LD in place.
- WhatsApp + phone CTAs already present — important for Nepal.
- Enquiry form with validation + admin pipeline.
- Accessible focus ring in `globals.css`; `aria-labelledby` on sections.
- Tokens already close to logo; flat-colour direction in `docs/00_MASTER_IMPLEMENTATION_PLAN.md` is the right instinct. This pack follows that rule: **no decorative gradients, blobs, or glassmorphism.**
