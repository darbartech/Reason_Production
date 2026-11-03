
> **Precedence:** your existing `docs/01_PHASE_1_BRAND_VISUAL_CLEANUP.md` palette and "don't replace typography" rule are superseded by this pack for **visual tokens only**: the navy/blue values are now sampled from the logo and contrast-checked (File 02), and the font change is explicitly authorised. Everything else in `docs/` (enquiry form, backend, admin, security) stays as is.

---

## Global preamble (paste at the top of every phase)

```text
You are working on the existing Next.js 14 (static export) + Tailwind 3 project for Reasons Education.

Rules:
- Inspect the relevant files first. Do NOT rebuild or rename routes.
- Make the smallest change that satisfies the task. Reuse existing components and class names.
- Do NOT touch: server/, src/app/admin/, src/components/admin/, src/components/enquiry/, src/lib/validations/, package.json dependencies (except where a phase says so).
- Do NOT recreate, recolor, stretch or redraw the logo.
- No gradients, blobs, glassmorphism, glow, 3D effects, rainbow icon colours.
- Do NOT invent statistics, testimonials, certifications, partner names, team members, or photos.
  If a fact is missing, leave a clearly marked TODO / VERIFY comment or render nothing.
- Follow the design tokens and type scale in 02_BRAND_DESIGN_SYSTEM.md exactly.
- After editing, run `npm run build` and fix every TypeScript/ESLint error.
- At the end, list every file you changed and anything you intentionally skipped.
```

---

## Phase 0 — Hygiene + single source of truth

**Attach:** `00_START_HERE.md`, `03_HERO_AND_HOMEPAGE.md` §0, `04_TRUST_AND_CREDIBILITY.md` §1

```text
1. Move HERO_REDESIGN_DOC.md and font_color_fix.md into /archive (they describe an obsolete orange/Poppins/ICEF-badge design and must not guide future work).
2. Ensure .gitignore contains: .next, out, node_modules, .kilo, *.rar, raw-images.
3. Create src/lib/company.ts exactly as in 03 §0.
4. Replace hard-coded phone, WhatsApp number, email, address, opening hours in: Navbar, Footer, CTA, WhatsAppButton, ContactClient, Schema, layout with imports from company.ts. Do not change layout/styling in this phase.
5. Do not guess registration numbers or social URLs: leave them as empty strings.
Acceptance: `grep -rn "015316680\|9779801085977" src` only matches src/lib/company.ts; opening hours appear identically everywhere; build passes.
```

## Phase 1 — Visual foundation (tokens, fonts, type scale)

**Attach:** `02_BRAND_DESIGN_SYSTEM.md`

```text
Implement 02_BRAND_DESIGN_SYSTEM.md sections 2, 3, 4 and 7:
- Update fonts in src/app/layout.tsx (Newsreader as --font-heading, Hanken Grotesk as --font-body).
- Replace theme.extend colors/fontFamily/borderRadius/boxShadow/maxWidth in tailwind.config.ts, keeping legacy token names.
- Replace src/styles/globals.css with the version in the file.
- Create src/components/SectionHeader.tsx.
- Create scripts/normalize-headings.mjs, run it, then review the diff: headings on dark backgrounds must still have text-white (or be inside .surface-dark).
- Project-wide replace: font-black→font-semibold, tracking-tighter→tracking-tight, rounded-3xl/rounded-2xl→rounded-xl.
- Do not change copy or layout in this phase.
Acceptance: no h1–h4 uses text-5xl+ or font-bold/black; body text is 16px; headings render in Newsreader; contrast in dark sections still readable; build passes.
```

## Phase 2 — Hero, navigation, footer, mobile action bar

**Attach:** `03_HERO_AND_HOMEPAGE.md` §1–3, `05_SEO_AND_RESPONSIVE.md` §9

```text
1. Replace src/components/Hero.tsx with the version in 03 §1. Use /images/hero-counselling.webp if it exists; otherwise keep the previous Unsplash URL as a TEMPORARY src with a TODO comment.
2. Navbar: apply 03 §2 (link list incl. About, remove Home/B2B from main links, add utility bar, crimson active underline, remove logo hover-scale).
3. Footer: apply 03 §3 (4 columns, logo on white plate, address/hours/phone from company.ts, registration rendered only when filled).
4. Add MobileActionBar (05 §9). Make WhatsAppButton desktop-only (hidden lg:flex). Add pb-16 lg:pb-0 to <main>.
5. Add a "Skip to content" link as the first element in <body>.
Acceptance: at 360px the H1, both buttons and the first proof item are visible without scrolling; no horizontal scroll; nav active state shows crimson underline; bottom bar does not cover the footer.
```

## Phase 3 — Homepage sections and shared page header

**Attach:** `03_HERO_AND_HOMEPAGE.md` §4–6

```text
- Replace the pill badge + two-tone H2 + intro blocks in all homepage section components with <SectionHeader>.
- ServicesOverview: ruled 2-column list (03 §4a). Remove the "Free Counseling" card (it's a CTA, not a service).
- CountryCard + StudyDestinations: photo-above-text card; remove the `students` field everywhere; add an 8th "Not sure which country?" card linking to /contact.
- TrustIndicators: numbered ruled list (03 §4c) — keep the owner-editable `reasons` array with VERIFY comment.
- Process: horizontal numbered timeline on desktop, vertical on mobile; no icon tiles.
- Testimonials: remove star rows and "Join thousands…" copy; add `intake` and `outcome` fields to the data (leave blank if unknown and don't render blanks).
- CTA: left-aligned dark band per 03 §4g.
- Create PageHero (03 §4h) and use it on About, Services, IELTS, Blog, Countries, each country page, FAQ, Contact. Replace slogan H1s with the page-specific H1s from 05 §5.
- Reorder src/app/page.tsx per 03 §6 (CredentialsStrip and TeamOffice may render null until content exists).
Acceptance: no Sparkles pills remain; no section uses a coloured icon tile; at most one crimson button visible per viewport; build passes.
```

## Phase 4 — Trust content

**Attach:** `04_TRUST_AND_CREDIBILITY.md`

```text
- Apply the claims audit (04 §2): remove "98%" everywhere (grep "98%"), remove "Approved Consultancy", "ICEF" claims and the "icef consultancy nepal" keyword, remove "Join thousands" and per-country "Students Placed". Replace with factual wording; do not substitute new numbers.
- About page: remove the Unsplash team portraits. Render the team from an array in src/lib/team.ts with { name, role, years, bio, photo }. If `photo` is missing, show initials in a navy circle — never a stock face. Leave the list EMPTY or minimal and mark TODO for the owner.
- Add src/components/CredentialsStrip.tsx (04 §4a) and a TeamOffice section (04 §4b) that renders only the data provided.
- Add a "What we can't promise" block to the Study Abroad page and FAQ (04 §4d), using the exact wording in the file unless the owner changes it.
- Contact page: show address/hours/phone/WhatsApp/email from company.ts and a "Get directions" link; add a one-line privacy note beside the form (do not alter form logic).
Acceptance: `grep -rn "98%" src` returns nothing; no images.unsplash.com remains on About; every number left on the site has a TODO/VERIFY note or a documented source.
```

## Phase 5 — SEO, schema, images

**Attach:** `05_SEO_AND_RESPONSIVE.md`

```text
- Create src/lib/seo.ts (05 §2) and migrate every page's metadata to buildMetadata(). Remove duplicated authors/creator/publisher/robots/openGraph/twitter blocks. Remove `notranslate` from layout.tsx. Use the titles in the table; descriptions 120–155 chars, no superlatives.
- Replace src/components/Schema.tsx (05 §3). Add <Breadcrumbs> to country, blog and service pages.
- Update sitemap.ts (05 §4): real dates, drop priority/changeFrequency; convert blog dates to ISO (add dateISO to BlogPost, keep the display date).
- Create scripts/optimize-images.mjs (05 §8.2). Do NOT download images yourself; list every Unsplash URL still in src/ with the file and line so the owner can supply replacements, and replace only those that have local files available in /public/images.
- Do not add aggregateRating schema.
Acceptance: build passes; each page has a unique title/description; schema validates; the only remaining external image hosts are listed in the final report.
```

## Phase 6 — Country pages (content depth) and final QA

**Attach:** `05_SEO_AND_RESPONSIVE.md` §6, §12

```text
- Extend CountryPageTemplate props (lastUpdated, officialSources, costsNPR, englishRequirements, proofOfFunds, workRights, processingTime, commonRefusalReasons, scholarships, ourRole). Render each section only when data is present and show "Last updated {date}" + "Official sources" links.
- Do NOT write visa rules, fees or thresholds from memory. For each country, produce a checklist file docs/country-content/{country}.md listing the fields the owner must fill, with the official government URL to verify each against.
- Known outdated item to flag: the Canada page and Canada blog guide describe the Student Direct Stream and a GIC amount as current. SDS closed 8 Nov 2024 and the proof-of-funds amount has been revised; mark both for owner verification against IRCC before publishing.
- Run the QA checklist in 05 §12 and report results.
```

---

## Review checklist for you (after each phase)

1. Open at **360px** and **1280px** — scroll the whole page.
2. Is there a single clear crimson action per screen?
3. Does any text feel larger than it needs to be? (Headings ≤ 60px, body 16px.)
4. Does every number/claim have a source you could show a parent?
5. Is the brand name identical everywhere?
6. Would a visitor believe these photos are *your* office and *your* people?

If the answer to #6 is "no", the next best investment is not more code — it's a half-day photo shoot (04 §5).
