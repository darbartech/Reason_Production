# Reasons Education — Modern & Professional UI/UX Transformation Blueprint

**Project analysed:** `Reason_Production_polish.zip` (Next.js 14 static export · Tailwind 3 · Newsreader + Hanken Grotesk · Express/Postgres admin)
**Date:** 8 Oct 2026
**Goal:** make the public site look and feel like a modern, premium, trustworthy education brand — without a rebuild, without new dependencies, and without touching `server/`, `src/app/admin/`, `src/components/admin/`.

---

## 0. Verdict in one page

The site is **not broken — it is under-designed.** The earlier redesign pack fixed the worst things (fonts, palette, honest copy, local images). What remains is why it still reads as "a decent template" rather than "a modern brand":

| # | Root cause | Evidence (measured on your `out/` build, 1440×900 and 390×844) |
|---|---|---|
| 1 | **One layout recipe repeated** — eyebrow → H2 → lead → hairline list/grid, left-aligned, on alternating white/paper. No hero moment, no big-type moment, no full-bleed image, no depth. | Home has 9 sections of 714–1251 px that all share the same rhythm. |
| 2 | **The hero wastes the most valuable screen.** | Hero is **1002 px tall** on desktop with **160 px top padding under an already-sticky header**; stats row sits *below* the 900 px fold. On mobile the hero is **1384 px tall**; image after CTAs, stats ~1,100 px down. |
| 3 | **A real contrast bug on every primary button inside dark sections.** | `.surface-dark a:not(.btn)` also matches `.btn-primary` (its class is `btn-primary`, not `btn`) → button text computes to `#339BBA` on `#B8324A` = **1.82 : 1**. Visible on the homepage CTA band, UK "Quick facts" card, every country page. |
| 4 | **Two design systems in one site.** | Home/About/Countries/Contact = new system. `BlogPreview`, `FAQ`, `ServicesClient`, `study-abroad`, `B2bClient`, `BlogExplorer` still use pill badges + two-tone headings ("Latest from Our **Blog**", "Our **Core Expertise**"). B2B headline `#0B6E8F` on navy = **2.27 : 1** (nearly invisible). |
| 5 | **Serif everywhere makes it feel traditional/legal.** | `h1–h4` are all Newsreader. Card titles, list rows and steps are serif 600. Premium-modern sites use serif for *moments* and sans for *interface*. |
| 6 | **Flat — no depth, no layering, no motion.** | Zero scroll/reveal motion (only `animate-spin/pulse` and one `animate-fade-in`). Cards are 1 px hairline boxes. Nothing feels "alive". |
| 7 | **Small, faint UI text.** | 25 text nodes < 13 px on the homepage; 89 `text-xs` usages in `src/`; process durations use `primary-400` = 3.53 : 1; form labels and errors are `text-sm`/`text-xs`. |
| 8 | **Imagery is generic and inconsistent.** | Western café stock photo as hero; country photos have different grading; country "flags" are emoji (🇬🇧) — **Windows Chrome/Edge render these as the letters "GB"**, which is most of your audience. Blog preview uses icon-on-pastel placeholders although real blog covers exist in `public/images/blog/`. |
| 9 | **Chrome is heavy.** | Header = **109 px** (36 px top bar + 72 px nav) permanently sticky. Logo wordmark renders at only **111×48 px**. CTA band and footer are two stacked dark slabs. Footer logo sits in a white box (no reversed logo). |
| 10 | **Conversion UI is a link, not a moment.** | Every CTA sends the visitor to `/contact`. No short "call me back" form anywhere else. |

**The fix is composition + a handful of system changes, not more decoration.** Target feeling: *calm authority, modern editorial* — big confident type, generous whitespace, real photography, layered surfaces, subtle motion, one clear action per screen.

### The 10 changes, in order of impact

1. Fix the dark-section button bug (5 minutes, immediate quality lift) — §4.2
2. Rebuild the hero: shorter, form-led, real photo, stats above fold — §6.1
3. Split type roles: serif for display only, sans for UI — §4.3
4. Finish migrating the 6 legacy pages/components to the new system — §7
5. Break the repetition: bento services, vertical-timeline process, image-overlay destination cards, navy featured testimonial — §6.2–6.6
6. Header/footer: collapse top bar, bigger logo, merge CTA + footer into one closing moment — §5
7. Layered surfaces, radius and shadow scale — §4.1
8. Zero-JS scroll-reveal motion + micro-interactions — §9
9. Forms: 16 px inputs, visible labels, validate on blur, inline callback form — §8
10. Replace stock/emoji imagery; vector/reversed logo — §10

---

## 1. What was analysed

- All of `src/` (components, app routes, content, lib), `tailwind.config.ts`, `globals.css`, `layout.tsx`, `company.ts`.
- The three existing documents (`Redesign/00–06`, `Reasons_Education_UIUX_Content_Audit.md`, `production_audit_v2.md`) — **this file does not repeat them**; it covers the *visual/UX transformation* and links to their content/legal findings where relevant.
- Your static `out/` build, served locally and rendered in headless Chromium at **1440×900** and **390×844** for 11 pages (home, about, countries, UK, services, study-abroad, contact, IELTS, blog, B2B, FAQ). Computed styles, element sizes and contrast were measured from the DOM, not estimated.

**Limits:** no live-site analytics, no real-device or screen-reader testing, and `out/` may be older than `src/`. Re-verify numbers after a fresh `npm run build`.

---

## 2. Findings in detail

### 2.1 Layout & composition
- Every home section uses the identical 4/8 or full-width pattern with `divide-y` lists. Services and "Why choose us" are **visually the same section twice** (serif row + hairline + arrow/number).
- Process: five columns ~170 px wide with centred 14 px text and 12 px durations — cramped and hard to read; the connector line cuts through the circles.
- Testimonials: 1 large + 3 small cards in a 2-col grid produces an **orphan card** (4th sits alone below). Quote mark is 15 % opacity.
- Home FAQ: two columns with **uneven heights** (3 + 2) and still uses the centred pill + two-tone heading.
- No full-bleed image band, no pull-quote, no large numerals, no sticky storytelling, no overlap/offset composition — the page has no "wow" beats and no places for the eye to rest.

### 2.2 Typography
- Display serif is good (Newsreader 500, clamp scale up to 60 px) — **keep it for H1/H2 only.**
- `h3`/`h4` inherit the serif (`h1, h2, h3, h4 { @apply font-heading }`). That is why list rows and cards feel "law-firm". Switch to Hanken Grotesk 600.
- Body 16 px / 1.7 is fine. Reduce long measure to ~62 ch on lead text; raise secondary text to ≥ 14 px; stop using `primary-400/300` for text.
- No italic emphasis system. The Newsreader italic is loaded (`style: ["normal","italic"]`) but unused — wasted bytes and a missed brand signature.

### 2.3 Colour & contrast (computed)
| Pair | Ratio | Where | Verdict |
|---|---|---|---|
| `#339BBA` on `#B8324A` | **1.82** | `.btn-primary` inside `.surface-dark` | ❌ bug |
| `#0B6E8F` on `#103158` | **2.27** | B2B/Study-abroad accent headings | ❌ |
| `#6E849F` on `#F7F5F0` | **3.53** | Process durations, small meta | ❌ |
| `#9FB0C5` on white | 2.21 | Arrow icons | decorative OK |
| `#FFFFFF` on `#B8324A` | 5.84 | Primary button (correct state) | ✅ |
| `#0B6E8F` on `#F7F5F0` | 5.29 | Eyebrows/links | ✅ |
| `#55657A` on `#F7F5F0` | 5.46 | Muted text | ✅ |
| `#B8324A` on `#F7F5F0` | 5.36 | Crimson text/numerals | ✅ |

Everything on dark is teal `#339BBA` (top bar, footer links, CTA labels) → monotone, no hierarchy. Use white for primary links, `#8FD0E3` for accents, `#C9D3E0` for body.

### 2.4 Chrome (header / footer / mobile)
- Desktop header 109 px sticky. Top bar should scroll away; only the 72–80 px nav should stick.
- Logo PNG at 111×48: the wordmark "REASONS" is tiny next to the rocket mark. A horizontal lockup with a larger wordmark (SVG) is the single biggest brand-polish item; interim: render at `h-12 lg:h-14`.
- Footer: logo in a white rounded box = no reversed logo. Link colour = same teal as everything else. CTA band + footer are two adjacent navy slabs ~1,100 px of dark.
- Mobile: sticky action bar (call / WhatsApp / Free counselling) is **good — keep**. Problem is the 112 px of dead padding at the top of every page hero (`pt-28`) because the header is sticky, not fixed.

### 2.5 Pages still on the old system
`BlogPreview.tsx`, `FAQ.tsx` (home), `services/ServicesClient.tsx`, `study-abroad/page.tsx`, `b2b/B2bClient.tsx`, `blog/BlogExplorer.tsx` (dark hero, two-tone headline), and sections of `ielts/page.tsx` ("What Sets Us Apart"). See §7 for exact replacements.

### 2.6 Imagery
- Hero photo: Western café, three people, captioned with a Kathmandu address. Credibility mismatch.
- Arch frame + offset outline: the outline is a separate box translated `(+12px, −12px)` and does not follow the arch curve at the bottom — it looks like a rendering error rather than a design choice.
- Country cards: 8-up uniform grid; flag emoji; `text-[0.9375rem]` description clamped to 3 lines → truncated mid-sentence ("…cutting-edge research, and diverse scholarship…").
- Blog cards: icon on pastel gradient while `public/images/blog/*.webp` covers exist.

### 2.7 Conversion & UX
- Only one form (`/contact`). Fields are 14 px, labels `text-sm`, errors `text-xs`; iOS Safari zooms on focus for inputs < 16 px.
- No inline "Call me back". No country comparison. No sticky in-page navigation on long country pages (UK page = 4,648 px).
- No visible analytics events (covered in the existing audit — still P0 there).

---

## 3. Design direction — "Calm authority, modern editorial"

**Principles**
1. **One idea per screen.** Each viewport has one headline and one action.
2. **Big type, small chrome.** Display serif at 56–80 px for a few moments; everything else sans, quiet.
3. **Real over stock.** Real office, team, students. If a photo can't be real, don't use a photo.
4. **Depth through layering, not effects.** Paper → white → navy surfaces; soft shadows; overlapping elements. No gradients-as-decoration, no glassmorphism blobs.
5. **Every claim is verifiable.** Numbers only if the owner can prove them (keep your honest stance — it is your best differentiator).
6. **Motion explains, never decorates.** 400–600 ms reveals, hover feedback, nothing looping.

**Keep:** navy `#103158`, crimson `#B8324A`, paper `#F7F5F0`, teal `#0B6E8F`, Newsreader + Hanken Grotesk, the honest copy, sticky mobile bar, `company.ts` single source of truth.
**Retire:** pill badges, two-tone headings, `card-hover` lift on everything, icon-in-rounded-square tiles for every row, emoji flags, uniform 4-col grids, centred 14 px paragraphs.

---

## 4. Design system v3 (copy-paste)

### 4.1 `tailwind.config.ts` — extend (merge into existing `theme.extend`)

```ts
colors: {
  // keep existing primary / accent / crimson / paper / ink / muted / line / brand
  tint: "#EEF3F9",            // cool surface for alternating sections
  sand: "#EFE9DC",            // warm panel behind photos / callouts
  "on-dark": {
    DEFAULT: "#C9D3E0",       // body text on navy   (≈ 9 : 1 on #091B34)
    link:    "#8FD0E3",       // accent/link on navy (≈ 8 : 1)
  },
},
borderRadius: {
  DEFAULT: "8px",
  lg: "10px",    // buttons, inputs
  xl: "14px",    // small cards
  "2xl": "20px", // cards, media
  "3xl": "28px", // hero media, closing CTA card
},
boxShadow: {
  card:  "0 1px 2px rgba(12,39,73,.05), 0 12px 32px -16px rgba(12,39,73,.14)",
  lift:  "0 2px 4px rgba(12,39,73,.06), 0 24px 48px -20px rgba(12,39,73,.28)",
  float: "0 28px 64px -28px rgba(9,27,52,.50)",
},
fontSize: {
  display: ["clamp(2.75rem, 1.5rem + 4.6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
},
```

**Surface rhythm (replace plain white/paper alternation):**
`paper (hero) → white → tint → white → navy-feature → paper → inset navy CTA card → navy-950 footer`.

### 4.2 `src/styles/globals.css` — required edits

**a) Fix the button-contrast bug (do this first).** Replace in `@layer base`:

```css
/* BEFORE */
.surface-dark a:not(.btn) { @apply text-accent-light; }

/* AFTER — excludes every .btn-* variant, and uses the accessible on-dark link colour */
.surface-dark a:not([class*="btn"]) { @apply text-on-dark-link; }
.surface-dark a:not([class*="btn"]):hover { @apply text-white; }
.surface-dark .eyebrow { @apply text-on-dark-link; }
```

**b) Split type roles.** Replace the heading base rule and add:

```css
h1, h2 { @apply font-heading text-primary; font-optical-sizing: auto; }
h3, h4 { @apply font-sans text-primary; }

h1 { font-size: theme("fontSize.display[0]"); line-height: 1.02; letter-spacing: -0.025em; font-weight: 450; }
h2 { font-size: clamp(2rem, 1.35rem + 2.2vw, 3.25rem); line-height: 1.08; letter-spacing: -0.02em; font-weight: 450; }
h3 { font-size: clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem); line-height: 1.3; letter-spacing: -0.01em; font-weight: 600; }
h4 { font-size: 1rem; line-height: 1.4; font-weight: 600; }

/* Editorial emphasis: one italic phrase per headline, never two-tone colour spans */
h1 em, h2 em { font-style: italic; font-weight: 400; @apply text-crimson; }
.surface-dark h1 em, .surface-dark h2 em { @apply text-on-dark-link; }
```

**c) Components.** Replace/extend:

```css
.btn { @apply inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[0.9375rem] font-semibold
               transition duration-150 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none; }
.btn-primary { @apply btn bg-crimson text-white shadow-[0_1px_0_rgba(255,255,255,.15)_inset] hover:bg-crimson-dark; }
.btn-lg { @apply h-14 px-8 text-base; }

.card        { @apply rounded-2xl border border-line bg-white; }
.card-hover  { @apply transition duration-200 hover:-translate-y-0.5 hover:shadow-lift; }   /* use sparingly: destinations + blog only */

.link-arrow  { @apply inline-flex items-center gap-1.5 font-semibold text-accent; }
.link-arrow svg { @apply transition-transform duration-200; }
.link-arrow:hover svg { @apply translate-x-1; }

.stat-num { @apply font-heading text-5xl font-normal leading-none text-primary md:text-6xl; font-variant-numeric: lining-nums; }

.section-padding { @apply py-20 md:py-28 lg:py-32; }   /* more air */
.section-tight   { @apply py-12 md:py-16; }
```

**d) Remove the dead top padding pattern.** Header is `sticky`, so hero sections must not add `pt-28/pt-36/pt-40`. See `PageHero` and `Hero` below.

### 4.3 `src/app/layout.tsx` — use the optical-size axis

```ts
const heading = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
  axes: ["opsz"],               // crisper display cuts at large sizes
  adjustFontFallback: false,
});
```

### 4.4 Scale reference

| Token | Value |
|---|---|
| Container | 1200 px (`max-w-content`), gutters 20 / 32 / 40 |
| Section padding | 80 / 112 / 128 px |
| H1 / H2 | 44→80 px / 32→52 px, serif, −2 % tracking |
| H3 | 18→21 px, sans 600 |
| Body / lead | 16 px / 17–20 px |
| Min UI text | **14 px** (labels, captions); no `text-[10px]/[11px]`, avoid `text-xs` for anything the user must read |
| Radius | buttons 10, cards 20, media 28 |
| Min tap target | 44×44 px |

---

## 5. Global shell

### 5.1 Header (`Navbar.tsx`)
- Return a **fragment**: top bar is a normal (non-sticky) block; only the nav is `sticky top-0`. Saves 36 px of permanent chrome.
- Logo `h-12 lg:h-14` (interim) → commission SVG lockup (§10).
- Nav links 15→16 px, active state = 2 px crimson underline offset 8 px (already close).
- On scroll: reduce nav height 80 → 68 px and show shadow (`transition-[height]`), instead of toggling only the shadow.
- Top bar: white links with hover underline (not teal); drop the email on < xl screens.

```tsx
return (
  <>
    <div className="surface-dark hidden lg:block text-sm">{/* top bar – NOT sticky */}</div>
    <header className="sticky top-0 z-50">
      <nav className={`bg-white/95 backdrop-blur border-b border-line transition-[height,box-shadow] duration-300 ${scrolled ? "shadow-card" : ""}`}>
        <div className={`container-custom flex items-center justify-between ${scrolled ? "h-[68px]" : "h-20"} transition-[height] duration-300`}>
          {/* logo, links, CTA unchanged */}
        </div>
      </nav>
    </header>
  </>
);
```

### 5.2 Closing moment = CTA + Footer (`CTA.tsx`, `Footer.tsx`)
Today: navy CTA slab directly above a navy footer. Replace with **an inset navy card on a paper background**, then the deeper navy footer.

```tsx
<section className="bg-paper section-padding" aria-labelledby="cta-heading">
  <div className="container-custom">
    <div className="surface-dark relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-14 shadow-float md:px-14 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Free first session</p>
          <h2 id="cta-heading" className="text-balance">Talk to a counsellor <em>before</em> you decide anything.</h2>
          <p className="lead mt-5 !text-on-dark">Bring your results and your questions. We’ll tell you honestly what’s realistic.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary btn-lg">Book a free session</Link>
            <a href={whatsappLink()} className="btn-on-dark btn-lg" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
        {/* contact details dl: labels text-on-dark 14px, values text-white; remove teal */}
      </div>
    </div>
  </div>
</section>
```

Footer: `bg-primary-950`; headings white 14 px uppercase tracking-wide; links `text-on-dark hover:text-white`; reversed logo (§10); add a 4th small "Registered / PAN" line once `company.registration` is filled; social icons as 40 px circular outline buttons.

### 5.3 Mobile
Keep `MobileActionBar`. Make it `bg-white/95 backdrop-blur` + `shadow-[0_-8px_24px_-12px_rgba(12,39,73,.18)]` and add `scroll-padding-bottom` so anchored content isn't hidden behind it.

---

## 6. Homepage — section by section

> Target page height: desktop ≈ 6,500 px (from 8,773), mobile ≈ 11,500 px (from 15,525).

### 6.1 Hero (`Hero.tsx`) — rebuild

**Spec:** fits in one viewport (`min-h-[calc(100svh-108px)]`, max 780 px) with the proof row visible; text left, photo right with an **overlapping callback card**; on mobile the callback card replaces the photo directly under the CTAs.

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { company } from "@/lib/company";
import CallbackCard from "./CallbackCard";

const proof = [
  { value: "7",        label: "Study destinations" },
  { value: "Free",     label: "First counselling session" },
  { value: "In-house", label: "IELTS & PTE classes" },
  { value: `${company.established}`, label: "Counselling Nepali students since" },
];

export default function Hero() {
  return (
    <section className="bg-paper" aria-labelledby="hero-heading">
      <div className="container-custom pt-10 md:pt-14 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 lg:min-h-[560px]">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Education consultancy · New Baneshwor, Kathmandu</p>
            <h1 id="hero-heading" className="text-balance max-w-[16ch]">
              Study abroad, <em>planned one step</em> at a time.
            </h1>
            <p className="lead mt-6 max-w-xl">
              Course and country selection, applications, IELTS/PTE preparation and visa documents —
              handled by one counselling team you can meet in person.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary btn-lg group">
                Book a free counselling session
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href={`tel:${company.phoneTel}`} className="btn-secondary btn-lg">
                <Phone size={16} aria-hidden="true" /> {company.phoneDisplay}
              </a>
            </div>
            {/* mobile: callback card sits here */}
            <div className="mt-10 lg:hidden"><CallbackCard /></div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-float">
              <Image
                src="/images/hero/counselling-session.webp" /* REPLACE with a real office photo */
                alt="A counsellor and students reviewing course options at our Kathmandu office"
                fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/10" />
            </div>
            <div className="absolute -bottom-8 -left-10 w-[320px]"><CallbackCard compact /></div>
            <p className="mt-12 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-crimson" aria-hidden="true" />
              {company.address.street}, {company.address.city}
            </p>
          </div>
        </div>
      </div>

      {/* proof row — now above/at the fold, with numeric typography */}
      <div className="container-custom mt-16 lg:mt-20">
        <dl className="grid grid-cols-2 gap-y-8 border-t border-line py-10 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {proof.map((p) => (
            <div key={p.label} className="sm:px-8 first:sm:pl-0">
              <dd className="stat-num">{p.value}</dd>
              <dt className="mt-2 text-sm text-muted">{p.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

> Replace the arch + offset outline entirely. If the stat row must stay verifiable, keep it exactly as above (no invented numbers).

**`CallbackCard.tsx`** (client; no backend change — hands off to the existing form with prefilled values):

```tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PREFERRED_DESTINATIONS } from "@/lib/validations/enquiry";

export default function CallbackCard({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [v, setV] = useState({ name: "", phone: "", destination: "" });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams(Object.entries(v).filter(([, x]) => x));
    router.push(`/contact?${q.toString()}#enquiry`);
  }

  const field = "h-12 w-full rounded-lg border border-line bg-white px-4 text-base text-ink placeholder:text-muted/70 focus:border-accent";
  return (
    <form onSubmit={onSubmit} className="card shadow-float p-5 md:p-6" aria-label="Request a call back">
      <p className="font-semibold text-primary">Get a call back</p>
      {!compact && <p className="mt-1 text-sm text-muted">Leave your number — a counsellor will ring you in office hours.</p>}
      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium text-ink">Name
          <input className={`${field} mt-1`} autoComplete="name" value={v.name} onChange={set("name")} required /></label>
        <label className="block text-sm font-medium text-ink">Mobile number
          <input className={`${field} mt-1`} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} required /></label>
        <label className="block text-sm font-medium text-ink">Preferred country
          <select className={`${field} mt-1`} value={v.destination} onChange={set("destination")}>
            <option value="">Not sure yet</option>
            {PREFERRED_DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
          </select></label>
      </div>
      <button className="btn-primary mt-5 w-full">Request call back <ArrowRight size={16} aria-hidden /></button>
    </form>
  );
}
```
*Implementation note:* make `EnquiryForm` read `useSearchParams()` to prefill `fullName/phone/preferredDestination` (wrap in `<Suspense>` — required for static export) and give the form wrapper `id="enquiry"`. Phase 2: replace the hand-off with a direct `POST /api/enquiries` using a reduced schema.

### 6.2 Services → bento (`ServicesOverview.tsx`)
Merge "Documentation support" + "Application & admission" into **"Applications & documents"** (5 services). One tall featured card + four tiles; line icons (lucide, stroke 1.5, no coloured tile).

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, BookOpenCheck, FileCheck2, Plane } from "lucide-react";
import SectionHeader from "./SectionHeader";

const tiles = [
  { title: "IELTS / PTE preparation", text: "Classes and mock tests in our own centre, taught by our trainers.", href: "/ielts", Icon: BookOpenCheck },
  { title: "Applications & documents", text: "We prepare, check, translate where needed, and submit — you see every email.", href: "/services", Icon: FileCheck2 },
  { title: "Visa application", text: "Forms, financial evidence and interview preparation, step by step.", href: "/services", Icon: GraduationCap },
  { title: "Pre-departure briefing", text: "Accommodation, travel and first-month guidance before you fly.", href: "/services", Icon: Plane },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader eyebrow="Services" title={<>Everything from course choice <em>to visa filing</em></>}
          intro="One team, one file, no hand-offs between agents." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Link href="/study-abroad" className="group relative overflow-hidden rounded-2xl bg-primary-900 p-8 text-white lg:row-span-2 lg:p-10">
            <Image src="/images/visuals/services-counselling.webp" alt="" fill sizes="(min-width:1024px) 33vw, 100vw"
                   className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-primary-950/10" aria-hidden />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end">
              <h3 className="text-white !text-2xl">Study abroad counselling</h3>
              <p className="mt-3 max-w-sm text-on-dark">Course, university and country matched to your results, budget and goals.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">Start with a free session <ArrowUpRight size={18} /></span>
            </div>
          </Link>
          {tiles.map(({ title, text, href, Icon }) => (
            <Link key={title} href={href} className="card card-hover group flex flex-col p-7">
              <Icon size={28} strokeWidth={1.5} className="text-crimson" aria-hidden />
              <h3 className="mt-6">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
              <ArrowUpRight size={18} className="mt-auto pt-6 text-primary-300 transition group-hover:text-crimson" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```
(`lucide-react@0.330` includes these icons; if one is missing, swap for `FileText`/`Plane`.)

### 6.3 Destinations (`CountryCard.tsx`, `StudyDestinations.tsx`)
- Cards become **image-overlay, 4:5**, name + one key fact on the image (bottom gradient only: `from-primary-950/85 via-primary-950/20 to-transparent`).
- **Remove flag emoji** → 2-letter chip (`US, CA, UK, AU, NZ, EU, JP`) in a small white rounded label top-left. (Or ship 7 small inline SVG flags.)
- Desktop 4 columns × 2 rows with the 8th tile ("Not sure which country?") as a **navy card** with a crimson button, not a paper card.
- Mobile: horizontal scroll-snap rail (`flex snap-x snap-mandatory gap-4 overflow-x-auto -mx-5 px-5`; cards `min-w-[78%] snap-start`) instead of 8 stacked cards — saves ~1,500 px.

```tsx
<Link href={href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100" aria-label={`Study in ${name} from Nepal`}>
  <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 280px, 78vw"
         className="object-cover transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/15 to-transparent" aria-hidden />
  <span className="absolute left-4 top-4 rounded-md bg-white px-2 py-1 text-xs font-bold tracking-wider text-primary">{code}</span>
  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
    <h3 className="!text-white text-xl">{name}</h3>
    <p className="mt-1 line-clamp-2 text-sm text-white/85">{description}</p>
    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">Read guide <ArrowUpRight size={16} /></span>
  </div>
</Link>
```
Add a `code` field to `src/content/countries.ts` for each country (replace `flag`).

### 6.4 Process (`Process.tsx`) → sticky heading + vertical timeline
Five 170-px columns → one readable column with large numerals.

```tsx
<section className="section-padding bg-tint">
  <div className="container-custom grid gap-12 lg:grid-cols-12">
    <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
      <SectionHeader eyebrow="Process" title={<>Five steps from first meeting <em>to departure</em></>} intro="You’ll always know where you are and what’s next." />
    </div>
    <ol className="lg:col-span-8">
      {steps.map((s, i) => (
        <li key={s.n} className="reveal grid grid-cols-[auto_1fr] gap-6 border-t border-primary/15 py-8 first:border-t-0 first:pt-0">
          <span className="font-heading text-5xl leading-none text-crimson md:text-6xl" aria-hidden>{s.n}</span>
          <div>
            <h3>{s.title}</h3>
            <p className="mt-2 max-w-prose text-muted">{s.text}</p>
            <p className="mt-3 inline-block rounded-md bg-white px-3 py-1 text-sm font-medium text-primary-700">{s.duration}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>
```

### 6.5 "Why choose us" → navy feature band
Make this the page's **one dark feature section** (it is your strongest content). Left: heading in white with `<em>`. Right: 2×2 grid of four promises, numerals in `on-dark-link`, thin white/15 dividers. This replaces the second hairline list and breaks the pattern.

### 6.6 Student stories (`Testimonials.tsx`)
- Featured testimonial = **navy card** (`bg-primary-900`, quote in serif 28–32 px, large 64 px avatar, outcome chip). Remaining three = a simple stacked list with dividers on the right (no cards) → no orphan.
- Quote mark: remove the 15 % opacity icon; use a 64 px serif `“` in crimson.
- Add `source` (e.g., link to Google review/Facebook post) when the owner supplies one — a verifiable link beats five stars.

### 6.7 Blog preview (`BlogPreview.tsx`)
Use the real covers (`public/images/blog/*.webp`, 16:10, `rounded-2xl`), category as plain text above the title, remove the centred pill and `Latest from Our <span>Blog</span>`. Use `SectionHeader` with a right-aligned `link-arrow` ("All articles").

### 6.8 FAQ (`FAQ.tsx`)
Split layout: heading + "Can't find it? Call / WhatsApp" on the left (4 cols), single-column accordion on the right (8 cols, `max-w-3xl`). Use native `<details>` with `+`/`–` rotation; first item open. Remove centred pill + two-tone.

---

## 7. Inner pages — migration matrix

| Page / component | What to change |
|---|---|
| **`PageHero.tsx`** | `pt-28 md:pt-36` → `pt-10 md:pt-16`; `pb-12 md:pb-16` → `pb-12 md:pb-20`. Add props: `tone?: "paper" \| "navy"`, `aside?: ReactNode` (image or quick-facts card), `meta?: ReactNode` (e.g. "Last verified"). Breadcrumb 14 px. |
| **`services/ServicesClient.tsx`** | Replace all two-tone `<span className="text-accent">` headings with `SectionHeader` + `<em>`. 3-col icon-tile grid → alternating **image/text split rows** (2 rows) + compact list for the rest. "Why Students Trust Reasons Education" → reuse §6.5 band. |
| **`study-abroad/page.tsx`** | Navy hero with pills (`GLOBAL EDUCATION`, `SINCE 2015`) and `text-accent-light` heading → `PageHero tone="navy"`; drop pills; headline with `<em>`. Ensure no `#0B6E8F`/`accent` text on navy (use `on-dark-link`). Dark arch image is almost invisible — use a bright image or remove. |
| **`b2b/B2bClient.tsx`** | Hero: pill + `text-accent` brand name on navy (2.27 : 1) → white headline, `<em>`. Replace "Choose Your Partnership Path" cards with a 2-column comparison table (Sub-agent / Institution). Use the handshake photo at `rounded-3xl`. |
| **`blog/BlogExplorer.tsx` + `blog/page.tsx`** | Dark centred hero "Stay Informed, **Study Smarter**" → `PageHero` paper with search field inline on the right. Category filter = text tabs with underline, not pills. |
| **`ielts/page.tsx`** | "What Sets Us Apart" icon-card grid → numbered list / split with photo; add a visible *Batch timing / mock-test schedule* table (content from owner). |
| **`faq/page.tsx`** | Group headings as sticky left rail (desktop); same accordion as §6.8; add search-as-you-type filter (client, no deps). |
| **`about/page.tsx`** | Add a full-bleed office photo band + team grid (real photos, owner-supplied) + registration block (`CredentialsStrip` once data exists). |
| **`contact/ContactClient.tsx`** | Form first on mobile (`order-first`), office details second; add `id="enquiry"`, prefill from query string; embed static map image (no iframe) with "Get directions". |
| **`countries/*` (`CountryPageTemplate.tsx`)** | Add **sticky in-page tabs** (Overview · Requirements · Costs · Visa steps · FAQ) below the hero; make "Quick facts" card sticky (`lg:sticky lg:top-28`); hero `aside` = key facts; replace `rounded-xl` boxed lists with divided lists; at the end add a 3-field callback card pre-set to that country. |
| **`privacy`, `terms`** | `.blog-body` typography with a 2-column layout (sticky table of contents on the left). |
| **`not-found.tsx`** | Remove `text-9xl`; one friendly line + three links (Countries, Contact, Home). |

**Rule for every page:** one H1 via `PageHero`; every section header via `SectionHeader`; no `rounded-full` pills except small status chips; no `font-bold`/`font-black` outside buttons and stat labels.

---

## 8. Forms & conversion UI

1. **Inputs 16 px, `h-12`**, labels 14 px `text-ink font-medium` *above* the field (never placeholder-only, never 10–11 px).
2. **Validate on blur / submit**, not on first keystroke. Errors: 14 px, `text-red-700`, with an icon; link them with `aria-describedby` (already done).
3. **Step 1 must need only three fields** (name, mobile, preferred country). Everything else is "Step 2 — optional, helps us prepare" so abandoning step 2 still creates a lead.
4. Progress indicator: replace two 40 px circles with a single `Step 1 of 2` text + 4 px progress bar.
5. Success screen: show what happens next ("A counsellor will call within one working day, Sun–Fri 10–5"), WhatsApp button, and the office map link.
6. Place the same `CallbackCard` on: hero, closing CTA (as an alternative to the buttons), every country page (country pre-selected), and blog post footers.
7. Keep Turnstile, honeypot and duplicate guard exactly as they are.

---

## 9. Motion (zero-JS, progressive enhancement)

Add to `globals.css`:

```css
@layer utilities {
  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .reveal {
        animation: reveal-up linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 35%;
      }
    }
  }
}
@keyframes reveal-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
```

- Browsers without scroll-driven animations simply show content statically — **no flash, no hydration issues, no library**.
- Apply `.reveal` to: process steps, bento tiles, country cards, testimonial list items, blog cards (not hero, not above-the-fold).
- Stagger via `style={{ animationDelay: \`${i * 60}ms\` }}` only where it helps (grids).
- Micro-interactions: button `active:translate-y-px`; arrow glyph nudges 4 px on hover (`.link-arrow`); image zoom 105 % over 700 ms inside `overflow-hidden`; header height shrink on scroll; accordion chevron rotation. Nothing loops, nothing auto-plays.
- Keep the existing global `prefers-reduced-motion` rule.

---

## 10. Imagery & logo

**Photography (the biggest authenticity lever)**
- Shoot half a day at Indreni Complex: reception, counselling desk (with the real team), IELTS classroom with students (with consent), a student collecting documents, exterior/entrance (helps people find you), 4–6 portraits (real team page). Deliver 2400 px wide, export WebP 1600 + 800.
- Until then: keep the current photos but unify grading (same contrast/warmth) and remove the café hero from the first screen.
- Style: natural light, wide-ish, people mid-action, no stock smiles at laptops.
- All images: explicit `width/height` or `fill` + `sizes`; hero `priority`; everything else lazy. Keep each ≤ 150 KB.

**Logo**
- Request/produce: horizontal **SVG** lockup (rocket mark + larger "REASONS" + small "Education Foundation"), plus a **reversed (white) SVG** and a square mark for favicon/app icon.
- Interim reversed logo for the navy footer, no new asset needed: `className="h-12 w-auto brightness-0 invert"` on the existing PNG (turns it white; remove the white box).

---

## 11. Accessibility & performance gates

Ship only if all pass:
- Contrast ≥ 4.5 : 1 for all text (including on navy and on crimson) — re-run the table in §2.3.
- No text < 14 px that carries meaning; inputs ≥ 16 px.
- Tap targets ≥ 44 px; focus ring visible on every interactive element (already present).
- No horizontal scroll at 320 px; test 320 / 390 / 768 / 1024 / 1440.
- Home: LCP < 2.5 s on throttled 4G (hero image preloaded, ≤ 150 KB); CLS < 0.05; total page weight < 1.2 MB.
- `npm run typecheck` and `npm run build` pass; `out/` regenerated (the shipped one is stale relative to `src/`).
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

---

## 12. Phased plan

| Phase | Scope | Files touched | Done when |
|---|---|---|---|
| **A — Quick wins (½ day)** | §4.2a button bug · header top bar not sticky · remove `pt-28/36/40` · logo size · footer/topbar link colours | `globals.css`, `Navbar.tsx`, `PageHero.tsx`, `Hero.tsx`, `Footer.tsx` | CTA button text is white everywhere; hero first screen shows CTAs + proof row |
| **B — System (1 day)** | §4.1–4.3 tokens, type split, radius/shadow, motion utility | `tailwind.config.ts`, `globals.css`, `layout.tsx` | H3 is sans site-wide; no visual regressions on admin (admin keeps its own styles — verify) |
| **C — Homepage (2 days)** | §6.1–6.8 (Hero + CallbackCard, bento, destinations, process, why-us band, testimonials, blog, FAQ, CTA/footer) | `Hero`, `CallbackCard`, `ServicesOverview`, `StudyDestinations`, `CountryCard`, `Process`, `TrustIndicators`, `Testimonials`, `BlogPreview`, `FAQ`, `CTA`, `Footer`, `content/countries.ts` | Home ≈ 6,500 px desktop; every section visibly different in layout |
| **D — Inner pages (2–3 days)** | §7 matrix, in this order: study-abroad → services → countries template → b2b → blog → ielts → faq → about → contact → legal | listed in §7 | Zero `text-accent` two-tone headings; zero pill badges; one primary button colour |
| **E — Forms (1 day)** | §8 | `components/enquiry/*`, `ContactClient.tsx` | Mobile form visible without scrolling past 1 screen; inputs 16 px |
| **F — Assets & QA (owner + 1 day)** | §10 photography/logo, §11 gates | `public/images/*`, `public/logo/*` | All gates pass; before/after screenshots archived |

---

## 13. Owner inputs required (cannot be invented)

1. Registration authority + number + PAN → fills `company.registration` (unlocks the credentials strip and hero line).
2. Real photos: office, team (names, roles), classroom; written consent for student photos.
3. Official social URLs (Facebook, Instagram, LinkedIn, YouTube) for `company.social` and schema.
4. A source link for each testimonial (Google review / Facebook post) or permission/date.
5. Which statistics you can prove (students counselled, offers, visas) with a time period. **Until then keep the proof row exactly as it is.**
6. Vector logo files (SVG) or approval to commission them.
7. Fee schedule + refund policy page content.

---

## 14. Master prompt for Claude Code / Kilo

Paste after placing this file at `docs/08_UIUX_TRANSFORMATION.md`:

```text
Read docs/08_UIUX_TRANSFORMATION.md fully. Implement Phase A, then stop and report.
Then wait for "continue" and do Phase B, C, D, E in order (one phase per run).

Hard rules
- Do NOT touch: server/, src/app/admin/, src/components/admin/, src/lib/validations/, route slugs, next.config.mjs.
- No new npm dependencies. Tailwind 3 + lucide-react only. Keep `output: "export"` working (no server-only APIs; wrap useSearchParams in <Suspense>).
- Do not invent facts, numbers, testimonials, credentials or photos. If data is missing, render nothing or a clearly marked TODO placeholder.
- Keep company data in src/lib/company.ts; do not hard-code phone/address.
- Accessibility: contrast ≥ 4.5:1, inputs 16px, tap targets ≥ 44px, visible focus, prefers-reduced-motion respected.
- After each phase run: npm run typecheck && npm run build. Fix errors before reporting.

Output rules
- Return ONLY edited and new files, each with its full directory path, complete file contents.
- Then list: (1) what changed, (2) what you deliberately did not change, (3) owner inputs still needed, (4) how to verify visually (pages + viewport widths).
```

---

## 15. Appendix — measured baseline (for before/after)

| Metric | Home desktop 1440×900 | Home mobile 390×844 |
|---|---|---|
| Page height | 8,773 px | 15,525 px |
| Header height | 109 px (36 + 72 + 1) | 73 px |
| Hero section height | 1,002 px (pt 160 px) | 1,384 px (pt 112 px) |
| H1 size / weight | 60 px / 500 | 36 px / 500 |
| Logo rendered | 111 × 48 px | 92 × 40 px |
| Text nodes < 13 px | 25 | 25 |
| Primary button text on dark | `#339BBA` on `#B8324A` = 1.82 : 1 | same |
| Sections (heights, px) | 1002 · 893 · 1251 · 775 · 714 · 1133 · 989 · 773 · 538 | 1384 · 1238 · 3844 · 1351 · 1044 · 1622 · 1838 · 822 · 742 |

**Targets after Phase C:** hero ≤ 780 px (proof row visible at 1440×900) · desktop page ≈ 6,500 px · mobile ≈ 11,500 px (destinations rail saves ~2,000 px) · all text pairs ≥ 4.5 : 1 · zero pill badges and zero two-tone headings.
