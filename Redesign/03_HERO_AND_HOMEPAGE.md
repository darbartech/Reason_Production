# 03 — Hero, Navigation, Footer & Homepage Sections

Depends on File 02 (tokens, fonts, `SectionHeader`, button classes).
All components below use only what's already installed: `next`, `react`, `lucide-react`, Tailwind.

---

## 0. Single source of truth for company facts

Right now the name, hours and contact details are typed separately in `Navbar`, `CTA`, `Footer`, `Schema`, `layout`, etc. — which is how the hours ended up conflicting. Create one file and import it everywhere.

**`src/lib/company.ts`**

```ts
// FILE: src/lib/company.ts
// Confirm every value with the owner. Anything marked VERIFY must match the registration documents.
export const company = {
  legalName: "Reasons Education Foundation",          // VERIFY: exact registered name (logo says this)
  displayName: "Reasons Education",                   // short form used in UI/titles — pick ONE and keep it
  tagline: "Study abroad counselling · IELTS & PTE",
  url: "https://reasons.edu.np",
  phoneDisplay: "01-5316680",
  phoneTel: "+97715316680",
  whatsappNumber: "9779801085977",
  email: "info@reasons.edu.np",
  address: {
    street: "Indreni Complex, New Baneshwor",
    city: "Kathmandu",
    postalCode: "44600",
    country: "Nepal",
  },
  geo: { lat: 27.6915, lng: 85.3331 },                // VERIFY on Google Maps
  hours: { days: "Sun – Fri", open: "10:00", close: "17:00", label: "Sun – Fri, 10 AM – 5 PM" }, // VERIFY: CTA said 7 AM, schema said 10 AM
  established: 2015,                                  // VERIFY (schema says 2015; site says "10+ years")
  registration: {
    authority: "",   // e.g. issuing office — VERIFY
    number: "",      // registration no. — fill, or leave blank to hide
    pan: "",         // PAN/VAT no. — fill, or leave blank to hide
  },
  social: {
    facebook: "",    // add ONLY profiles that exist and are active
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export const whatsappLink = (msg = "Hello, I'd like to ask about studying abroad.") =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(msg)}`;
```

---

## 1. New Hero

### Design intent
- **Left-aligned, calm, specific.** One clear promise, one primary action, one phone number.
- **Real photograph in an arch shape** — echoes the arc around the pen in your logo, so the brand shape appears *in* the layout rather than as generic decoration.
- **Proof strip** beneath: factual items only (no percentages unless documented).
- **Mobile:** text first, image second (current code puts the image first and pushes the headline off-screen).
- Warm `paper` background, no gradients, no blobs.

### Headline options (pick one; all avoid clichés and unprovable claims)
1. **Study abroad, planned one step at a time.** ← recommended
2. Honest guidance for studying abroad from Nepal.
3. From IELTS to visa, one counselling team.

Supporting line: *Course and country selection, applications, IELTS/PTE preparation and visa documents — handled by one team in New Baneshwor, Kathmandu.*

### `src/components/Hero.tsx` (full replacement)

```tsx
// FILE: src/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/company";

// Facts only. Add numbers (students, universities, years) ONLY once the owner can document them.
const proof = [
  { value: "7", label: "Study destinations" },
  { value: "Free", label: "First counselling session" },
  { value: "In-house", label: "IELTS & PTE classes" },
  { value: `Since ${company.established}`, label: "Counselling Nepali students" }, // VERIFY year
];

export default function Hero() {
  return (
    <section className="bg-paper pt-28 pb-14 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24" aria-labelledby="hero-heading">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Education consultancy · New Baneshwor, Kathmandu</p>

            <h1 id="hero-heading" className="text-balance max-w-[18ch] sm:max-w-[20ch]">
              Study abroad, planned one step at a time.
            </h1>

            <p className="lead mt-6 max-w-xl">
              Course and country selection, applications, IELTS/PTE preparation and visa
              documents — handled by one counselling team you can meet in person.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary group w-full sm:w-auto">
                Book a free counselling session
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a href={`tel:${company.phoneTel}`} className="btn-secondary w-full sm:w-auto">
                <Phone size={16} aria-hidden="true" />
                Call {company.phoneDisplay}
              </a>
            </div>

            {/* Credential line — renders only when real registration data is filled in */}
            {company.registration.number && (
              <p className="mt-5 text-sm text-muted">
                Registered{company.registration.authority ? ` with ${company.registration.authority}` : ""} · Reg. No. {company.registration.number}
                {company.registration.pan ? ` · PAN ${company.registration.pan}` : ""}
              </p>
            )}
          </div>

          {/* Photo in an arch (echoes the logo's arc) */}
          <div className="lg:col-span-5">
            <figure className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-y-3 translate-x-3 rounded-b-xl rounded-t-[999px] border border-accent-light/60"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-b-xl rounded-t-[999px] bg-primary-100">
                {/*
                  TODO: replace with a REAL photo (counselling desk, office, or students) — see File 04 §5.
                  Save as /public/images/hero-counselling.webp (1200×1500, <200 KB).
                */}
                <Image
                  src="/images/hero-counselling.webp"
                  alt="A counsellor at Reasons Education advising a student at the New Baneshwor office"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted">
                Counselling at our New Baneshwor office.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Proof strip */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 lg:mt-20">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block font-heading text-2xl font-medium text-primary md:text-3xl">{p.value}</span>
                <span className="mt-1 block text-sm text-muted">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

> `sr-only` + `dd` order is a small a11y trick: screen readers announce "label, value". If you prefer simplicity, replace the `<dl>` with plain divs.

**Photo brief:** a real, warm, natural-light photo (counsellor and student at a desk, or students outside the Baneshwor office). Portrait 4:5, subject's face in the upper-middle. No stock images of foreign campuses in the hero.

---

## 2. Navigation

### What to change (small edits to `Navbar.tsx`)

1. **Add a dark utility bar** (desktop only) with phone, email, hours, address — immediate trust.
2. **Fix the link list.** *About* is currently **missing from the nav** (a major trust page); *Home* is redundant (logo is home); *B2B* crowds the bar.
3. **Active state:** a 2px crimson underline instead of a tinted pill.
4. **No logo hover-scale.** Main bar height 72px; sticky; 1px bottom border; shadow only after scroll.

```tsx
// navLinks — replace
const navLinks = [
  { name: "Study Abroad", href: "/study-abroad" },
  { name: "Countries", href: "/countries" },
  { name: "IELTS / PTE", href: "/ielts" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];
// B2B moves to the utility bar ("For institutions") and footer. FAQ goes in the footer.
```

```tsx
// Utility bar — put just inside the <> fragment, above <nav>. Hide on mobile.
<div className="surface-dark hidden lg:block text-[0.8125rem]">
  <div className="container-custom flex h-9 items-center justify-between">
    <p className="text-primary-300">
      {company.address.street}, {company.address.city} · {company.hours.label}
    </p>
    <div className="flex items-center gap-6">
      <a href={`tel:${company.phoneTel}`} className="text-white hover:underline">{company.phoneDisplay}</a>
      <a href={`mailto:${company.email}`} className="text-white hover:underline">{company.email}</a>
      <Link href="/b2b" className="text-primary-300 hover:text-white">For institutions</Link>
    </div>
  </div>
</div>
// Offset the fixed nav: give <nav> className "top-0" on mobile and "lg:top-9" while not scrolled,
// or simplest: make utility bar + nav a single sticky wrapper: <header className="sticky top-0 z-50">…</header>
```

```tsx
// Desktop link — replace className
className={`relative px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
  isActive(link.href)
    ? "text-primary after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-crimson"
    : "text-primary/80 hover:text-primary"
}`}

// Nav CTA — smaller, still crimson
<Link href="/contact" className="btn-primary h-10 px-5 text-sm">Free counselling</Link>
```

Remove `group-hover:scale-105` from the logo wrapper. Logo size: `h-10 w-auto sm:h-12` via `next/image` with explicit `width={140} height={61}`.

**Mobile bar:** keep the drawer. Replace the green/blue phone square with a plain outlined phone icon button; the real fix is the **sticky bottom action bar** in File 05 §8.

---

## 3. Footer

Make it the **credibility anchor** (this is what parents scroll to when deciding).

Structure (4 columns desktop, stacked mobile), on `surface-dark`:

| Column | Content |
|---|---|
| 1 | Logo on white plate (`bg-white rounded-lg p-3 inline-block`), one-line description, **registration / PAN** from `company.registration` (hide if blank) |
| 2 | Destinations (7 links) |
| 3 | Services: Study Abroad · IELTS/PTE · Visa documentation · For institutions · FAQ · Blog |
| 4 | **Visit & contact**: full address, `Sun – Fri, 10 AM – 5 PM`, phone, WhatsApp, email, "Get directions" (Google Maps link) |

Bottom bar: `© {year} {company.legalName}` · Privacy · Terms. Show social icons **only** for profiles that exist.

---

## 4. Section templates (replace the repeated look)

### 4a. Services — `ServicesOverview.tsx`
Drop the 6 icon tiles. Use a **2-column ruled list** (reads more editorial, scans faster, and is lighter on mobile).

```tsx
// FILE: src/components/ServicesOverview.tsx  (structure)
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const services = [
  { title: "Study abroad counselling", text: "Course, university and country matched to your results, budget and goals.", href: "/study-abroad" },
  { title: "IELTS / PTE preparation",  text: "Classes and mock tests in our own centre, taught by our trainers.",       href: "/ielts" },
  { title: "Documentation support",    text: "We check, organise and, where needed, translate your documents.",          href: "/services" },
  { title: "Visa application",         text: "Step-by-step help with forms, financial evidence and interview preparation.", href: "/services" },
  { title: "Application & admission",  text: "We prepare and submit applications and track offers with you.",           href: "/services" },
  { title: "Pre-departure briefing",   text: "Accommodation, travel and first-month guidance before you fly.",          href: "/services" },
];
// VERIFY each line describes a service you actually deliver.

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="Services" title="Everything from course choice to visa filing" intro="One team, one file, no hand-offs between agents." />
          <Link href="/services" className="btn-secondary mt-8">All services</Link>
        </div>
        <ul className="lg:col-span-8 divide-y divide-line border-y border-line">
          {services.map((s) => (
            <li key={s.title}>
              <Link href={s.href} className="group grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h3 className="group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.text}</p>
                </div>
                <ArrowRight size={20} className="hidden text-primary-300 transition-all group-hover:translate-x-1 group-hover:text-crimson sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

### 4b. Destination cards — `CountryCard.tsx`
**Photo on top, text below on white.** No text over photos (better legibility, lighter, no overlay needed), no blur pill, no `opacity-85`, no fabricated student counts.

```tsx
// FILE: src/components/CountryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CountryCardProps {
  name: string;
  image: string;
  href: string;
  description: string;
}

export default function CountryCard({ name, image, href, description }: CountryCardProps) {
  return (
    <Link href={href} className="group card card-hover block overflow-hidden" aria-label={`Study in ${name} from Nepal`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-100">
        <Image
          src={image}
          alt={`Study in ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="flex items-center justify-between">
          {name}
          <ArrowUpRight size={18} className="text-primary-300 transition-colors group-hover:text-crimson" aria-hidden="true" />
        </h3>
        <p className="mt-2 text-[0.9375rem] text-muted line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
```
In `StudyDestinations.tsx` delete the `students:` field and the prop. Use `SectionHeader`. Keep the grid, but make it `lg:grid-cols-4` with the 7th card + a "Not sure which country?" card as the 8th (links to /contact) — fills the grid cleanly.

### 4c. "Why us" — `TrustIndicators.tsx`
Convert four icon cards into a numbered, ruled list beside a sticky heading. Use **behaviours that can be verified**, not adjectives.

```tsx
const reasons = [
  { n: "01", title: "A written fee schedule before you commit", text: "You see what each service costs, in writing, at the first meeting." },
  { n: "02", title: "We tell you when a plan won't work",       text: "If a course, country or budget doesn't fit your profile, we say so and suggest alternatives." },
  { n: "03", title: "Your originals stay with you",             text: "We work from verified copies and return every document we collect." },
  { n: "04", title: "Counselling and IELTS/PTE under one roof", text: "Your counsellor and your trainer talk to each other about your timeline." },
];
// VERIFY each statement is actual company policy. Replace with the owner's real differentiators.
```
Layout: `lg:grid-cols-12`; heading `lg:col-span-4 lg:sticky lg:top-32 self-start`; list `lg:col-span-8 divide-y divide-line` with `n` in `font-heading text-crimson text-xl`.

### 4d. Process — `Process.tsx`
Keep content. Change to a **horizontal numbered timeline** on desktop (4–5 steps with a 1px line connecting numbers), vertical on mobile; numbers in `font-heading`, no icon tiles. Add one line under each step: *typical duration* (only if accurate).

### 4e. Testimonials — `Testimonials.tsx`
Do **not** show a row of five crimson stars on every card (reads as templated, and self-published ratings carry no weight). Instead:
- One **featured quote** (large, `font-heading`, 24–28px) + 3 small cards.
- Each: first name + last initial or full name **with consent**, destination, **intake/year**, and an **outcome line** ("Offer received: ___ · Visa granted: Mar 2025").
- Add a link: "Read our reviews on Google" (when profile exists).
- Remove "Join thousands of successful students" unless a number is documented.
- Photos: the four student photos are low-res (239–562px). Show at ≤ 72px, circular crop, or replace with consent-based higher-res images.

### 4f. FAQ before CTA
Reorder so the page ends with the closing CTA then footer (see §6).

### 4g. Closing CTA — `CTA.tsx`
Left-aligned two-column on `surface-dark`: headline *"Talk to a counsellor before you decide anything."*, one crimson button, one white outline WhatsApp button; right column = contact card (phone, hours, address from `company`). Remove the Sparkles pill, `text-accent` word highlight and `text-7xl` heading.

```tsx
<section className="surface-dark section-padding">
  <div className="container-custom grid items-center gap-12 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className="eyebrow mb-5">Free first session</p>
      <h2 className="text-balance">Talk to a counsellor before you decide anything.</h2>
      <p className="lead mt-5 !text-primary-200">Bring your results and your questions. We'll tell you honestly what's realistic.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact" className="btn-primary">Book a free session</Link>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-on-dark">Chat on WhatsApp</a>
      </div>
    </div>
    <dl className="lg:col-span-5 space-y-5 border-l border-white/15 pl-8 text-white">
      {/* Phone · Hours · Address from `company` */}
    </dl>
  </div>
</section>
```

### 4h. Interior page hero — new `PageHero.tsx`
Every interior page currently has its own navy header with a `text-7xl` H1 and slogan-like text (e.g. About: *"Empowering Dreams, Shaping Futures"*). Use one component:

```tsx
// FILE: src/components/PageHero.tsx
import Link from "next/link";
import { ReactNode } from "react";

type Crumb = { name: string; href?: string };

export default function PageHero({
  title, intro, crumbs = [],
}: { title: ReactNode; intro?: string; crumbs?: Crumb[] }) {
  return (
    <section className="bg-paper pt-28 pb-12 md:pt-36 md:pb-16 border-b border-line">
      <div className="container-custom">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {c.href ? <Link href={c.href} className="hover:text-primary">{c.name}</Link> : <span aria-current="page" className="text-primary">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-balance">{title}</h1>
        {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}
      </div>
    </section>
  );
}
```
Use it on About, Services, IELTS, Blog, Countries, each country page, FAQ, Contact. Pair with `BreadcrumbList` schema (File 05).

**Replace slogan H1s with page-specific, keyword-aware ones**, e.g.
- About → "About Reasons Education" (intro: who, where, since when, how many on the team)
- Services → "Study abroad services in Kathmandu"
- IELTS → "IELTS & PTE classes in New Baneshwor"
- Country → "Study in Canada from Nepal: costs, intakes and visa steps"

---

## 5. Photo & card treatment rules (apply sitewide)

- Photos: flat, no overlay unless text sits on them; radius 8–12px; `object-cover`; no hover zoom beyond 1.03.
- Cards: `card card-hover` (border + soft shadow on hover). Icon tiles removed or reduced to a bare 20px outline icon in `text-accent`.
- Max **one** accent colour per card. No coloured icon circles.
- Alternate section backgrounds white ↔ `paper`; use **one** dark band (closing CTA) + footer.

---

## 6. Recommended homepage order

```
1. Hero (+ proof strip)
2. Credentials strip        ← NEW (File 04 §3): registration, PAN, memberships — one thin line
3. Services                 ← moved up: parents want to know *what* you do first
4. Destinations
5. Process (How it works)
6. Why us (verifiable behaviours)
7. Team & office            ← NEW (File 04 §3): real photos, names, location, map
8. Student stories
9. Blog preview (3 latest)
10. FAQ
11. Closing CTA  (dark)
─ Footer
```

`src/app/page.tsx` body:

```tsx
<>
  <Hero />
  <CredentialsStrip />
  <ServicesOverview />
  <StudyDestinations />
  <Process />
  <WhyChooseUs />
  <TeamOffice />
  <Testimonials />
  <BlogPreview />
  <FAQ />
  <CTA />
</>
```

---

## 7. Motion (keep it to almost nothing)

- Hero text: one `fade-in` on load (≤ 400 ms). Nothing else animates on load.
- Hover: colour changes (150 ms) and `1.03` photo zoom. Remove translate-up lifts, `animate-pulse` on the 404 and loader numerals, and the unused `float` keyframe.
- Respect `prefers-reduced-motion` (already in File 02 CSS).
