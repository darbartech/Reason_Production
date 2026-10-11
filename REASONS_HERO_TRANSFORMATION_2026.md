# Reasons Education — 2026 Hero Transformation Guide

**Scope:** Redesign the hero (first screen) of **every public page** — homepage + shared `PageHero` — using crisp HD **transparent PNG (alpha) cutout imagery**, an editorial 2026 layout language, and the existing Reasons brand.
**Rules:** Change design only. **Do not** change brand identity, routes, SEO metadata, copy intent, company data, forms, admin, or backend.
**Owner file map:** `src/components/Hero.tsx` (home), `src/components/PageHero.tsx` (all inner pages), plus per-page prop tweaks.

---

## 0. How to use this document

1. Read §1–§4 for the *why* and the design language.
2. Produce/replace the transparent PNG assets using the brief in §5.
3. Implement the two components using §6, then apply the page map in §7.
4. Verify with §8–§13 before shipping.

Everything below is written to preserve Reasons' current voice (calm, honest, local, "one step at a time") and its palette: navy `#103158`, blue `#0B6E8F`, cyan `#339BBA`, crimson `#B8324A`, paper `#F7F5F0`, ink `#14213A`, muted `#55657A`, line `#E3E7EE`. Headings are **Newsreader** (serif), body is **Hanken Grotesk**.

---

## 1. Current-state audit — why the heroes read as "traditional / poor"

| # | Problem observed in code | Effect |
|---|---|---|
| 1 | `Hero.tsx` is a text-left / photo-right split where the photo is a **cropped rectangle** (`girl.jpg`, 366×546 — low-res, `object-cover`) | Feels like a 2015 template; the subject is boxed in and small |
| 2 | `PageHero.tsx` uses the **same 7/5 split** for every page type (services, legal, articles, countries) | Monotonous "sameness"; no sense of art direction |
| 3 | Images sit inside `rounded-2xl ring-1 shadow-md` "cards" | Card-heavy, bordered, template-generated |
| 4 | `hero-grid` dotted texture + soft radial wash + floating `figcaption` badge all at once | Competing layers, visual noise, not premium |
| 5 | Chips, badge, meta, aside, breadcrumbs frequently stack together | Cognitive overload above the fold; CTA loses dominance |
| 6 | Photos are landscape/raster stock crops, never cut out | No depth, no personality; the person is background, not the story |
| 7 | Type is set flat against the same paper tone on every page | No editorial hierarchy, no signature moment |
| 8 | Deep navy `PageHero` is used inconsistently (`study-abroad`, `b2b`, `terms`) with the same decoration | Random rather than intentional |

**Root cause:** rectangle-in-a-card photography + uniform layout. **Fix:** isolate the subject on transparency, break the grid with intentional overlap, and give each page family its own density — using **one** shared, disciplined system.

---

## 2. Brand & content guardrails (non-negotiable)

- **Palette:** only the tokens above. No new colours, no rainbow gradients, no neon, no glass/glow/3D.
- **Accent discipline:** crimson = primary CTA + **one** accent stroke per hero. Blue/cyan = links, labels, secondary.
- **Typography:** Newsreader headings, Hanken Grotesk body. Keep the crimson *italic* `<em>` device — it is the home-hero signature (globals.css:32). Do not add a second type system.
- **Copy intent is frozen:** keep every existing H1, intro, eyebrow, and chip meaning. This document lists the exact copy per page in §7 — do **not** rewrite it.
- **No invented facts:** no success percentages, student totals, certifications, staff names, or partner logos. Reuse only `company.*` data.
- **One H1 per page.** Breadcrumbs stay. Phone/CTA routes stay (`/contact`, `tel:` from `company`).
- **Motion:** one subtle entrance only, gated behind `prefers-reduced-motion` (already handled in `globals.css:133`).

---

## 3. What "best hero" means in 2026 (research synthesis)

Across 2026 hero showcases and UI/UX writing, the patterns that read as *premium and current*:

1. **Isolated subject / cutout imagery** — the human or object is freed from its background and composed against the brand canvas with real depth. This replaces the "rounded photo card".
2. **Editorial asymmetry** — off-centre composition, intentional overlap, oversized type, and disciplined whitespace instead of a balanced boxed grid.
3. **Kinetic-adjacent restraint** — micro entrance motion (fade + 8–16px rise), a slowly moving accent, not full parallax chaos.
4. **Layered depth via soft shadows + shapes**, not borders — an arch/plate behind the subject, a thin offset outline, a ground shadow.
5. **Bento / floating factual card** — at most **one** small, genuinely useful card (a real stat, a location, a "free first session").
6. **Craft typography** — large serif display + tiny uppercase mono-style eyebrow labels; contrast of scale does the work.
7. **One dominant CTA** plus one quieter secondary action.
8. **Performance as design** — the hero cutout is the LCP element, so it must be small, correct, and prioritized.

We adopt these selectively — **no bento grid, no lava/blob, no 3D, no neon** — because Reasons is a trust-driven local consultancy, not a SaaS.

### Chosen concept: **"The Reasons Cutout"**

> A real person, cleanly cut out, stepping *forward* out of the page — calm paper canvas, an arch of soft navy behind, a crimson gestural stroke, one honest floating fact, and a single strong CTA. Editorial, human, quietly confident.

This is the through-line for the whole site. Every page is a controlled variation of it.

---

## 4. Hero design system (shared across all pages)

### 4.1 Composition grid

- Container: existing `.container-custom` (max 1200px).
- Desktop: 12-col. Copy `lg:col-span-6/7`, subject zone `lg:col-span-5/6`.
- **Anchor the copy and subject to a shared baseline** (`items-end`) so the cutout "stands" on the same line as the CTA row.
- Subject may **overflow the container** on `lg+` (bleed 4–10% right and below) for the break-the-grid effect. Section clips vertical overflow; container is `overflow-visible`.

### 4.2 Layered depth (z-index contract)

```
z-0   canvas wash (radial primary-50 → paper) + optional grain
z-0   very faint blueprint grid (opacity ≤ 0.05, md+, decorative only)
z-0   arch / plate shape behind the subject (primary-50 / sand)
z-0   thin crimson gestural stroke (SVG or ::before)
z-10  SUBJECT cutout (transparent PNG/WebP) + ground shadow (ellipse under feet)
z-20  at most ONE floating factual card / chip (optional, desktop only)
z-10  copy column (H1, intro, CTA row, trust line)
```

Never stack two floating cards. Never put text over the person.

### 4.3 Type scale in hero

- H1: existing `h1` clamp (`tailwind.config.ts:79`), max-width ~`max-w-[15ch]`, `text-balance`, `leading-[1.05]`.
- Eyebrow: `.eyebrow` (uppercase, letterspaced, crimson rule via `::before`).
- Intro: `.lead`, `max-w-xl`.
- Trust line: `text-sm text-muted`, thin top rule.
- Keep the `<em>` crimson italic only on the homepage H1; inner pages keep it neutralised as today.

### 4.4 Colour usage per hero tone

| Tone | Background | Subject plate | Text | Use |
|---|---|---|---|---|
| `paper` | `#F7F5F0` | primary-50 / sand arch | primary/ink | Most pages |
| `navy` (`surface-dark`) | primary-950 | white/5 arch + crimson stroke | white / on-dark | Study Abroad, B2B, Terms |
| `editorial` | paper, no subject | none | primary | FAQ, Privacy, Legal, Article |
| `compact` | paper | optional small subject or object | primary | Countries index, Contact |

### 4.5 Motion

- Load: copy fades + rises 12px (0→1, 0.5s); subject fades + rises 16px (0.6s, 60ms delay); everything else static.
- Hover: CTA colour shift + arrow nudge (existing). Subject: none (or ≤1.02 scale, optional).
- Respect `prefers-reduced-motion` — already globally disabled in `globals.css`.

---

## 5. The transparent PNG system (core deliverable)

The single biggest upgrade is replacing rectangle photos with **HD transparent cutouts**. This section is the production brief.

### 5.1 Technical specs

| Spec | Requirement |
|---|---|
| Source format | PNG-24 **with alpha** (for editing/master) — or a layered PSD/TIFF |
| Web format | **WebP with alpha** (`.webp`) preferred; PNG-24 fallback if a specific tool/asset breaks |
| Long-edge resolution | Master ≥ **2400 px**; delivered hero cutout **1600–2000 px** long edge (covers 2× retina on typical hero size) |
| Effective output DPI | Treat as 144 ppi equivalent (retina); deliver by pixel dimensions, not DPI tags |
| Weight budget | Hero cutout **≤ 300 KB** (target 150–220 KB); object cutouts ≤ 120 KB |
| Trim | Trim transparent margin to the subject's alpha bounds (predictable positioning) |
| Colour | sRGB, subject lit consistently; no coloured rim-light that fights the palette |
| Alpha edges | Clean, slightly feathered edges; **no white fringing / halo** |
| File naming | `kebab-case`, descriptive: `home-student-stepping-forward.webp` |
| Location | `public/images/hero/cutouts/` (people) and `public/images/hero/objects/` (non-people) |

> Because `next.config.mjs` uses `output: "export"` + `images.unoptimized: true`, **Next will not resize/convert for you.** Every asset must be pre-optimized. (See the existing `05_SEO_AND_RESPONSIVE.md` optimization script.)

### 5.2 Subject/pose direction (people)

- Real Nepali students / counsellors (≈18–35), **not** Western stock archetypes.
- Full or three-quarter body, **feet in frame**, weight forward (a step), 3/4 camera angle.
- Neutral-to-warm expression; slight off-camera or direct gaze (not over-smiling).
- Wardrobe: plain, modern, no legible third-party logos, no claim-making props (no fake medals/partners).
- Props allowed: folder, offer-letter envelope (blank), laptop, passport (numbers blurred), backpack.
- Lighting matches a soft office/daylight — one direction, soft shadows.

### 5.3 Per-page cutout shot list

| Page | Cutout | Notes |
|---|---|---|
| **Home** | Student stepping forward, folder/envelope in hand | Hero signature; also shoot a 2-person variant for A/B |
| **About** | Counsellor **+** student together (group cutout) | Reinforces "small team, in person" |
| **Services** | Counsellor holding a document folder | End-to-end support |
| **IELTS / PTE** | Student at desk with laptop + headphones | Test-prep context |
| **Study Abroad** | Student with rolling suitcase + boarding pass | The "journey" page |
| **B2B** | Two professionals in a handshake / reviewing a file | Partnership tone |
| **Blog** | Object: stack of books + coffee + glasses | Reading/insight |
| **Country pages** | Object: single-tone **destination silhouette** (landmark) in navy/blue, transparent | Avoids repeating people 7×; see §7.7 |
| **Countries index** | no subject (typographic) | Keeps focus on the 8 cards |
| **Contact / FAQ / Privacy / Terms** | no subject (editorial/compact) | Typography + rule + optional object accent |

Budget a half-day phone/lights shoot with a plain wall, then cut out. A phone in good daylight + `remove.bg`/Photoroom/Photoshop "Select Subject" is enough for launch.

### 5.4 How to produce the cutouts

1. Shoot on a plain (ideally paper/neutral) background, subject ≥ 2000 px long edge.
2. Cut out: Photoshop *Select Subject* → *Refine Edge* → export layered PNG; or `remove.bg` / Photoroom for speed.
3. Clean edges at 200% zoom — remove halos, fix hair.
4. Trim to alpha bounds; export master PNG-24.
5. Optimize to WebP-alpha:
   - `cwebp -q 82 in.png -o out.webp` (or Squoosh "WebP, quality 82")
   - Verify transparency survived; check weight ≤ 300 KB.
6. Place in `public/images/hero/cutouts/`.
7. Record the asset in the §12 checklist (who/consent/source).

**Consent:** written/WhatsApp consent from every student pictured (guardian for minors). No stock face may be presented as a Reasons team member.

### 5.5 AI / stock fallback (temporary only)

If a shoot isn't possible yet: use a **licensed** transparent-PNG stock cutout (one consistent source/style) or an AI cutout **strictly as a temporary placeholder**, never implying a real staff member, claim, or credential. Mark with a `TODO(asset)` comment in code. Example generation prompt (placeholder only):

> "Transparent-background PNG cutout, full body, Nepali university student mid-20s stepping forward, holding a plain folder, soft daylight, neutral expression, modern casual clothing, no logos, crisp clean alpha, 2400px long edge."

### 5.6 Rendering rules (critical)

- Use **intrinsic `width`/`height` + `object-contain`**, never `fill` + `object-cover` (cropping would destroy the cutout).
- `priority` on the hero subject only.
- Add a separate soft **ground shadow** (an absolutely-positioned blurred ellipse) rather than a CSS `drop-shadow` on the whole PNG, so the feet look planted.
- Provide a **no-asset fallback** in code: if the cutout is missing, render the arch plate + accent stroke + typography only. The layout must never break without the image.

---

## 6. Component architecture

### 6.1 Homepage — `src/components/Hero.tsx`

Keep the existing props-free component and copy. Change only the composition.

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Globe2, CalendarCheck, BookOpenCheck, BadgeCheck } from "lucide-react";
import { company } from "@/lib/company";

const proof = [
  { Icon: Globe2, label: "7 study destinations" },
  { Icon: CalendarCheck, label: "Free first session" },
  { Icon: BookOpenCheck, label: "In-house IELTS & PTE" },
  { Icon: BadgeCheck, label: `Counselling since ${company.established}` },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper" aria-labelledby="hero-heading">
      {/* z-0 canvas wash */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_72%_0%,theme(colors.primary-50)_0%,theme(colors.paper)_62%)]" />
      {/* z-0 faint blueprint grid (decorative, md+) */}
      <div aria-hidden className="hero-grid absolute inset-0 -z-10 hidden text-primary opacity-[0.05] md:block" />
      {/* z-0 arch behind subject (desktop) */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[6%] -z-10 hidden h-[78%] w-[34rem] rounded-t-full bg-primary-50 lg:block" />
      {/* z-0 crimson gestural stroke */}
      <div aria-hidden className="pointer-events-none absolute left-[7%] top-[30%] -z-10 hidden h-px w-24 bg-crimson lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line" />

      <div className="container-custom relative py-14 md:py-20 lg:py-24">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="order-1 lg:col-span-6">
            <p className="eyebrow mb-6">Education consultancy · New Baneshwor, Kathmandu</p>
            <h1 id="hero-heading" className="text-balance max-w-[15ch] leading-[1.05]">
              Study abroad, <em>planned one step at a time.</em>
            </h1>
            <p className="lead mt-7 max-w-xl">
              Course and country selection, applications, IELTS/PTE preparation and visa documents —
              handled by one counselling team you can meet in person.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
                Book a free counselling session
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a href={`tel:${company.phoneTel}`} className="btn-secondary btn-lg w-full sm:w-auto">
                <Phone size={16} aria-hidden="true" />
                Call {company.phoneDisplay}
              </a>
            </div>
            {company.registration.number && (
              <p className="mt-6 text-sm text-muted">
                Registered{company.registration.authority ? ` with ${company.registration.authority}` : ""} · Reg. No. {company.registration.number}
                {company.registration.pan ? ` · PAN ${company.registration.pan}` : ""}
              </p>
            )}
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-7" aria-label="What we offer">
              {proof.map(({ Icon, label }, i) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-white text-crimson shadow-sm">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-primary">{label}</span>
                  {i < proof.length - 1 && <span aria-hidden className="hidden h-5 w-px bg-line sm:block" />}
                </li>
              ))}
            </ul>
          </div>

          {/* Subject */}
          <div className="order-2 lg:col-span-6">
            <div className="relative mx-auto flex w-full max-w-xl items-end justify-center">
              {/* ground shadow */}
              <div aria-hidden className="absolute bottom-2 h-6 w-3/5 rounded-[100%] bg-primary-950/10 blur-xl" />
              <Image
                src="/images/hero/cutouts/home-student.webp"
                alt="A student at Reasons Education, ready to plan their study abroad"
                width={900}
                height={1100}
                priority
                sizes="(min-width: 1024px) 46vw, 88vw"
                className="relative z-10 h-auto w-full object-contain lg:scale-[1.08]"
              />
              {/* ONE factual floating card (desktop) */}
              <div className="absolute -left-2 bottom-16 z-20 hidden rounded-xl border border-brand-border bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:block">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">In person</p>
                <p className="text-sm font-semibold text-primary">New Baneshwor, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 6.2 Inner pages — `src/components/PageHero.tsx`

Keep the **existing public API** (`title, intro, crumbs, tone, aside, meta, eyebrow, image, imagePriority, badge, chips, variant`) so no caller breaks. Internal changes:

1. **New optional prop** `subject?: { src: string; alt: string; width: number; height: number; priority?: boolean }` for the cutout. If absent, fall back to the arch + typography (never a rectangle card).
2. Deprecate the image-in-a-card treatment: when `subject` is present, render it as a cutout with ground shadow + arch; keep `image` working for backward compatibility but route it to the same cutout renderer, or to a contained object.
3. Replace `hero-grid` opacity `0.08` → `0.05`, decorative only.
4. Remove the floating `figcaption` badge rectangle; convert `badge` into a single floating factual chip (max one).
5. Variant behaviour:

| Variant | Layout | Subject |
|---|---|---|
| `split` | copy left (7), subject right (5), `items-end` | cutout + arch + ground shadow |
| `editorial` | single column, `max-w-2xl`, shorter padding | none (optional small object accent) |
| `compact` | single/narrow column, reduced padding | optional small subject or object |
| `navy` tone | `surface-dark` + white/5 arch + crimson stroke | cutout with light rim |

```tsx
// Excerpt — subject renderer inside PageHero
{subject ? (
  <div className="relative mx-auto flex w-full max-w-[30rem] items-end justify-center">
    <div aria-hidden className="absolute bottom-2 h-6 w-3/5 rounded-[100%] bg-primary-950/10 blur-xl" />
    <Image
      src={subject.src}
      alt={subject.alt}
      width={subject.width}
      height={subject.height}
      priority={subject.priority ?? imagePriority}
      sizes="(min-width: 1024px) 42vw, 90vw"
      className="relative z-10 h-auto w-full object-contain"
    />
  </div>
) : (
  <div aria-hidden className="relative mx-auto hidden h-full w-full max-w-[28rem] items-end justify-center lg:flex">
    <div className="h-[78%] w-[34rem] rounded-t-full bg-primary-50" />
  </div>
)}
```

The `badge` (when supplied) becomes the single floating factual card, positioned bottom-left of the subject zone on `lg+` only, and hidden if it would collide with the CTA on mobile.

---

## 7. Page-by-page transformation map

Copy is **preserved verbatim**; only the visual treatment changes. "Cutout" = add `subject`.

| # | Route | File:line | Current | New treatment (tone / variant) | Subject |
|---|---|---|---|---|---|
| 1 | `/` | `Hero.tsx:13` | split, `girl.jpg` | **paper · home cutout** | student stepping forward |
| 2 | `/study-abroad` | `study-abroad/page.tsx:94` | navy split + image + badge + chips | **navy · split** | student + suitcase |
| 3 | `/about` | `about/page.tsx:36` | split + image + badge + chips | **paper · split** | counsellor + student |
| 4 | `/services` | `ServicesClient.tsx:69` | split + image + badge + chips | **paper · split** | counsellor with folder |
| 5 | `/ielts` | `ielts/page.tsx:109` | split + image + badge + chips | **paper · split** | student at desk, headphones |
| 6 | `/countries` | `countries/page.tsx:47` | compact, no image | **paper · editorial index** | none (typographic) |
| 7 | `/countries/{7}` | `CountryPageTemplate.tsx:161` | compact + image | **paper · compact cutout** | landmark silhouette object |
| 8 | `/contact` | `ContactClient.tsx:48` | compact + chips | **paper · compact** | none |
| 9 | `/b2b` | `B2bClient.tsx:127` | navy split + aside image | **navy · split** | two professionals |
| 10 | `/blog` | `BlogExplorer.tsx:48` | split + image + search aside | **paper · split** | books/coffee object |
| 11 | `/blog/[slug]` | `blog/[slug]/page.tsx:86` | compact + meta | **paper · editorial compact** | none |
| 12 | `/faq` | `FaqExplorer.tsx:76` | editorial + search | **paper · editorial** | none |
| 13 | `/privacy` | `privacy/page.tsx:16` | editorial | **paper · editorial** | none |
| 14 | `/terms` | `terms/page.tsx:16` | navy editorial | **navy · editorial** | none |

### 7.1 Homepage (`/`)
Preserve H1 *"Study abroad, planned one step at a time."*, the intro paragraph, both CTAs, the registration line, and the 4 proof items. Replace `girl.jpg` with `home-student.webp`. Mobile order unchanged: eyebrow → H1 → intro → CTAs → trust → proof → subject.

### 7.2 Study Abroad (`/study-abroad`)
Keep navy tone, eyebrow "Study abroad guide", title *"Study abroad from Nepal — how it works, one step at a time."*, the emotive intro, the "7 study destinations" badge, and 3 chips. Move the badge to a single floating factual card. Subject: suitcase student.

### 7.3 About (`/about`)
Keep split, eyebrow "About us", title *"About Reasons Education"*, intro, "A small team, one process" badge, 3 chips. Subject: counsellor + student group cutout (reinforces the in-person promise).

### 7.4 Services (`/services`)
Keep eyebrow "Our services", title *"Study abroad services in Kathmandu."*, intro, "End-to-end support" badge, 3 chips. Subject: counsellor with document folder.

### 7.5 IELTS / PTE (`/ielts`)
Keep eyebrow "Test preparation", title *"IELTS & PTE classes in New Baneshwor"*, intro, "Small-batch classes" badge, 3 chips. Subject: student at desk with laptop + headphones.

### 7.6 Countries index (`/countries`)
Keep `compact`, eyebrow "Destinations", title, intro. **No subject** — this page's job is the 8 destination cards directly below. Optional thin object accent only.

### 7.7 Country pages (7 routes)
Replace the rectangular landmark photo with a **transparent single-tone landmark silhouette**, navy or blue, as an object cutout (e.g., Canada → CN Tower/maple form, UK → Tower Bridge outline, Japan → torii, New Zealand → mountain, Australia → Opera House, USA → skyline, Europe → rothenburg roofline). Same `compact` layout, tone `paper`. Keep `h1`, `overview`, and breadcrumbs. This avoids seven near-identical people heroes and feels bespoke per destination.

### 7.8 Contact (`/contact`)
Keep `compact`, eyebrow "Visit or get in touch", title, intro, 3 chips. No subject — the page's subject is the form/map. Optionally a tiny object accent (pin).

### 7.9 B2B (`/b2b`)
Keep navy split, eyebrow "For partners & institutions", title, intro, both CTAs in `meta`, 2 chips. Replace the `aside` rectangle with a two-professional cutout. Keep the `hidden lg:block` behaviour for the subject zone.

### 7.10 Blog index (`/blog`)
Keep split, eyebrow, title, intro, and the search `aside`. Subject: books/coffee object cutout (smaller, right-aligned).

### 7.11 Blog article (`/blog/[slug]`)
Keep `compact`, breadcrumbs, category eyebrow, post title, and the date/author/tag meta. No hero image (the article's own figure stays in the body). Pure typographic hero.

### 7.12 FAQ (`/faq`)
Keep `editorial`, eyebrow, title, intro, search `aside`. No subject.

### 7.13 Privacy (`/privacy`) & Terms (`/terms`)
Keep `editorial` (privacy = paper, terms = navy). Legal pages stay quiet and text-led. No subject.

---

## 8. Responsive rules

- Test **360 / 390 / 768 / 1024 / 1280 / 1536**.
- Mobile order: eyebrow → H1 → intro → CTA → trust → subject (subject last, never first).
- Subject cutout scales with `w-full object-contain`, `mx-auto`, `max-w-xl` on mobile; the arch/plate and floating card are `lg:` only and `hidden` below.
- Section uses `overflow-hidden` to contain the `lg:` bleed; the inner container stays `overflow-visible`.
- No horizontal scroll at any width. Watch the subject's negative offsets on `lg`.
- Tap targets ≥ 44px; buttons full-width on mobile only when comfortable.
- `min-h` uses `svh`, not `vh`.

---

## 9. Accessibility

- Semantic H1 per page; breadcrumb `<nav aria-label="Breadcrumb">` retained.
- Meaningful `alt` on the subject (what's happening, e.g., "A counsellor and student reviewing course options at the Reasons Education office"); decorative shapes/grid `aria-hidden="true"`.
- Icons that duplicate text are `aria-hidden`.
- Visible focus rings retained (`globals.css:19`); focus never obscured by the floating card.
- Contrast: never use `accent-light` (#339BBA) on white for small text; on navy use white/on-dark.
- Reduced-motion respected (entrance is non-essential).

---

## 10. Performance (hero = LCP)

| Item | Target |
|---|---|
| Hero cutout transfer | ≤ 300 KB, ideally ≤ 220 KB |
| Other hero objects | ≤ 120 KB |
| LCP (mobile) | < 2.5 s |
| CLS | < 0.1 (reserve width/height) |
| Total home mobile weight | < 1.5 MB |

- Optimize every asset yourself (static export → no Next image optimization).
- `priority` on the hero subject only; everything else lazy.
- Always set `width`/`height` + `sizes`.
- Keep two font families with `display: swap`.
- Don't hotlink images; self-host in `public/images/hero/...`.
- Set long-cache headers for `/images/*` and `/logo/*` at the host.

---

## 11. Implementation phases

**Phase 1 — Assets (blocking).** Produce the cutouts in §5.3; place under `public/images/hero/{cutouts,objects}/`; verify alpha + weight. Until then, code falls back to typography + arch.

**Phase 2 — Homepage.** Refactor `Hero.tsx` per §6.1. Verify mobile order, LCP, no scroll.

**Phase 3 — PageHero.** Add `subject` prop + cutout renderer + arch fallback; reduce grid opacity; convert badge to one floating card. Keep API backward-compatible.

**Phase 4 — Page map.** Apply §7 variants/props one page at a time; keep all copy and metadata untouched.

**Phase 5 — QA.** §8–§13 on all routes; run `npm run typecheck`, `npm run lint`, `npm run build`.

---

## 12. Asset & naming checklist

- [ ] `public/images/hero/cutouts/home-student.webp` (900×1100 master ratio, ≤300 KB)
- [ ] `about-team.webp`, `services-counsellor.webp`, `ielts-student.webp`, `study-abroad-student.webp`, `b2b-partners.webp`
- [ ] `public/images/hero/objects/blog-books.webp`, country landmark silhouettes ×7
- [ ] All trimmed to alpha bounds, WebP-alpha, clean edges
- [ ] Consent recorded per person; not a stock face presented as staff
- [ ] `TODO(asset)` removed once real assets are in
- [ ] Old rectangle photos kept only until replaced, then deleted

---

## 13. QA acceptance

- [ ] Every route's H1/intro/eyebrow/chips match §7 exactly (no copy drift).
- [ ] Homepage: H1 + both CTAs visible without scrolling at 360px; subject appears after CTAs on mobile.
- [ ] No rectangle-in-a-card hero image remains anywhere.
- [ ] Transparent cutouts render with no halo, no crop, planted shadow, no horizontal scroll.
- [ ] At most **one** floating factual card per hero; no invented numbers.
- [ ] Navy tones readable (white/on-dark); crimson used once as accent.
- [ ] Keyboard focus visible; breadcrumbs intact; one H1/page; alt text meaningful.
- [ ] `prefers-reduced-motion` disables entrance motion.
- [ ] `npm run build` passes; hero cutout ≤ 300 KB; LCP element is the subject.
- [ ] 360/390/768/1024/1280/1536 manual pass.

---

## 14. Explicit "do not"

- Do not add gradients-as-decoration, glassmorphism, glow, 3D, neon, rainbow icons, or new colours/fonts.
- Do not use `fill`/`object-cover` for cutouts (it destroys transparency).
- Do not stack multiple floating cards, chips, and a badge together.
- Do not re-introduce the `hero-grid` at high opacity or decorative blobs/circles.
- Do not change brand name, routes, SEO metadata, `company.ts`, forms, admin, or backend.
- Do not invent success rates, student counts, certifications, partners, or team members.
- Do not present stock/AI faces as real Reasons staff.

---

### One-line summary for implementers
> Free the subject from the box: cut them out on transparency, stand them on a paper canvas with an arch, a single crimson stroke, one honest fact and one dominant CTA — then vary density by page (split / editorial / compact / navy) without touching a word of the existing copy.
