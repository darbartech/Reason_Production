# production_audit_v2.md
### Full Production Audit — Reason Education Consultancy
**Source audited:** the actual shipped static build (`out/` — 13 HTML pages, compiled CSS/JS), not source code. This is what a browser and Google actually receive.
**Focus per request:** professionalism, SEO, design consistency, full responsiveness.

This is a re-audit following two prior rounds of fixes. It confirms what's genuinely fixed, and lists everything still standing between this build and a real client launch — with exact evidence from the build, not assumptions.

---

## 1. Critical — Fix Before Any Launch

### 1.1 Contact form does not deliver leads
The shipped JS for the contact form (`_next/static/chunks/app/contact/page-*.js`) still runs:
```
await new Promise(setTimeout, 1500) → console.log("Contact form submission received:") → success toast
```
No network request is made to any email service, CRM, or database. **Every inquiry submitted on launch day is lost.** This must be wired to a real backend (Resend/SendGrid/SMTP + a lead store) before the domain goes live. Since the site is a static export, this needs either a serverless function endpoint or a third-party form-relay service (e.g. Web3Forms) called via `fetch` from the client.

### 1.2 Broken testimonial photo
`students/sarana.jpg` is a **0-byte empty file**. Barsa's testimonial card is currently shipping a broken image icon in production. Re-export or re-upload this file.

### 1.3 Domain identity mismatch
`studynepal.edu.np` is hardcoded into canonical tags, Open Graph tags, JSON-LD schema, `robots.txt`, and `sitemap.xml` on **all 13 pages**, while the real contact email is `@reasons.edu.np` and B2B contact shows `@gmail.com`. Search engines read this as an unresolved identity — pick the one real production domain and propagate it everywhere before indexing starts. Indexing under the wrong domain is very costly to undo later.

### 1.4 B2B form still has a foreign placeholder
`b2b.html` still ships `placeholder="john@example.com"` (2 occurrences) — the Contact page was fixed to `rudesh@gmail.com` but B2B was missed.

---

## 2. SEO — Detailed Findings

### 2.1 Title tags are duplicated and oversized (High Priority)
Every interior page title repeats the business name **twice**, once from the page's own title string and again from a template suffix:
```
About Us | Reason Education Consultancy Kathmandu | Reason Education Consultancy
B2B Partnership | Reason Education Consultancy | Reason Education Consultancy
Contact Us | Reason Education Consultancy Kathmandu | Reason Education Consultancy
```
This pushes most titles to 65–85 characters — Google truncates display around ~60 characters, so the second "Reason Education Consultancy" is invisible in search results and wastes the entire keyword budget. **Fix:** remove the automatic site-name suffix from the page-level `<title>` template, or remove the manually-typed brand name from each page's own title, so it appears once. Target format: `Primary Keyword | Reason Education Consultancy` (one instance only), under 60 characters.

### 2.2 Meta descriptions run long (Medium Priority)
Several exceed the ~155–160 character range Google reliably displays without truncation:
| Page | Length |
|---|---|
| index.html | 258 chars |
| b2b.html | 227 chars |
| countries.html | 209 chars |
| ielts.html | 210 chars |
| 404.html / about.html | 208 chars |
| study-abroad.html | 202 chars |
| services.html | 198 chars |

Trim each to end its core message by ~155 characters; the homepage description in particular buries "Certified ICEF experts with 98% visa success rate" past the likely truncation point.

### 2.3 Structured data — solid but incomplete
- LocalBusiness, WebSite, Organization, Service, and now **FAQPage** schema are correctly present — good, above-average for this stage.
- No **BreadcrumbList** schema found on country or blog detail pages — cheap addition, real rich-result value.
- No **AggregateRating/Review** schema — correct to leave this out until real Google reviews exist; do not fabricate ratings.

### 2.4 Open Graph images are generic and reused (Medium Priority)
Every non-homepage page — including **Privacy Policy and Terms of Service** — shares the exact same Unsplash stock `og:image`. Sharing a legal page on WhatsApp/Facebook currently shows an unrelated stock photo. At minimum, give the homepage, Services, IELTS, and Contact distinct, owned, branded 1200×630 images; legal pages can share one simple branded card rather than a random stock photo.

### 2.5 Technical hygiene — passed
- ✅ Exactly one `<h1>` per page, all 13 pages checked
- ✅ Zero empty `alt=""` attributes found across the build
- ✅ Per-page canonical tags present and correctly self-referencing (once the domain is fixed, these are otherwise correct)
- ✅ `sitemap.xml` (22 URLs) and `robots.txt` both generating correctly
- ✅ Viewport meta tag correctly set for responsive rendering

### 2.6 Missing performance-SEO link
No `<link rel="preconnect">` to `images.unsplash.com` despite every hero and card image loading from it — this adds an avoidable connection-negotiation delay directly on the Largest Contentful Paint path. This becomes moot once images are self-hosted (see §5 in the earlier audit — still outstanding), but if Unsplash hotlinking continues even temporarily, add the preconnect now.

---

## 3. Design Consistency

### 3.1 What is actually consistent (verified, not assumed)
- Hero section background color token (`bg-primary`) is identical across Home, Services, IELTS, Blog, Study Abroad, About, and Countries — no drift found in the shipped CSS.
- The only hardcoded hex color anywhere in the build is `#25D366`, and it's used exclusively and consistently for the WhatsApp floating button on all 13 pages — this is intentional brand-color usage, not inconsistency.
- Button/CTA styling (`bg-accent`, rounded corners, hover-arrow micro-animation) repeats identically sitewide — consistent, if slightly repetitive (see prior audit §1 for the "reduce repetition" note, still applies).

### 3.2 Remaining inconsistency
- **Logo file weight/format:** `logo/NEW.png` is 140KB as a flat PNG. A logo this size should be an SVG (scales perfectly, typically <10KB) or a heavily compressed WebP/PNG — 140KB for a logo that loads on every single page is disproportionate and hurts every page's load time equally.
- **Legal pages inherit marketing OG imagery** (§2.4) — a design/content mismatch: Privacy Policy and Terms shouldn't visually promote study-abroad marketing photography when shared.
- **Team photos vs. real names** (carried over from prior audit, still unresolved): `about.html` still shows 4 different Unsplash stock headshots next to real Nepali staff names — this is as much a design-authenticity issue as a trust one, since the imagery style clearly doesn't match a small Baneshwor office's real team.

---

## 4. Responsiveness

- ✅ `viewport` meta tag correct; Tailwind responsive breakpoint classes (`sm:` `md:` `lg:` `xl:`) are used extensively and consistently across Hero, Trust, Testimonials, and Services sections.
- ✅ Touch targets on social icons meet the 44px+ minimum (56px, verified in source in the prior audit).
- ⚠️ Not verifiable from static HTML alone: actual rendered behavior at 320px width (small mobile), specifically whether the hero's floating stat cards overlap the hero image at the narrowest breakpoint, and whether long real testimonial names (e.g. "Aryan Dev Acchami") wrap cleanly in the 2-column mobile testimonial grid. **Recommend a manual device-lab or Chrome DevTools pass at 320px, 375px, and 768px before launch** — this class of bug only shows up in the rendered browser, not in markup.

---

## 5. Professionalism — Net Assessment

The engineering foundation remains genuinely solid: real per-page metadata, real structured data, real static-export performance baseline, clean single-H1 hierarchy, complete alt-text coverage, and no leftover Lorem-ipsum-style content anywhere in the build. What still reads as "not yet a real business" are concrete, fixable items, not structural ones:
1. A contact form that silently discards every real inquiry
2. A broken image file
3. Two identities (domains) presented as one business
4. Stock photography standing in for the real team and the real office, sitewide
5. Search-result titles that waste half their character budget repeating the brand name

None of these require redesign. They require: one backend integration, one file fix, one domain decision, one photography session, and one title-template edit.

---

## 6. Production Checklist

### Critical
- [ ] Wire the contact form to a real email/CRM backend (currently `console.log`-only)
- [ ] Replace the empty `students/sarana.jpg` file
- [ ] Resolve the `studynepal.edu.np` vs `reasons.edu.np` domain mismatch across metadata, schema, sitemap, robots.txt
- [ ] Fix the last `john@example.com` placeholder in `b2b.html` (2 instances)

### High Priority
- [ ] Remove the duplicated brand name from page `<title>` tags (currently appears twice on every interior page)
- [ ] Trim meta descriptions to ~155 characters, especially homepage (258 chars)
- [ ] Replace Unsplash team headshots in `about.html` with real staff photos or a group photo
- [ ] Self-host and compress the logo (convert `NEW.png`, 140KB, to SVG or optimized WebP)

### Medium Priority
- [ ] Give Homepage, Services, IELTS, and Contact distinct branded OG images instead of one shared stock photo reused across all pages, including legal pages
- [ ] Add BreadcrumbList schema to country and blog detail pages
- [ ] Add `preconnect` to `images.unsplash.com` if hotlinking continues short-term
- [ ] Self-host all content imagery (carried over — still the largest open item from the original audit; ~145 Unsplash references remain across the build)

### Low Priority
- [ ] Manually test 320px/375px/768px breakpoints in-browser for hero stat-card overlap and testimonial name wrapping
- [ ] Reduce repeated "badge + centered heading" section formula across pages for visual variety (carried over, cosmetic)

### Verified Passing — No Action Needed
- [x] Single `<h1>` per page, all 13 pages
- [x] Zero images with empty `alt` attributes
- [x] Per-page canonical tags present
- [x] FAQPage, LocalBusiness, WebSite, Organization, Service schema all present
- [x] `sitemap.xml` (22 URLs) and `robots.txt` generating correctly
- [x] Hero background color consistent across all page types — no rogue hex colors found
- [x] No underline styling on any hero `<h1>` — confirmed absent in both markup and global CSS

---

## 7. Final Verdict

| Category | Score | Change from prior audit |
|---|---|---|
| Design consistency | 78/100 | ↑ from 68 — color/underline concerns not found in build |
| SEO (technical) | 74/100 | ↓ slightly — title duplication is a real, sitewide regression to fix |
| SEO (local) | 60/100 | ↑ from 55 — spelling fixed, domain mismatch still open |
| Responsiveness | 80/100 | Stable — structurally sound, needs manual device QA |
| Content | 68/100 | Stable |
| Professionalism | 68/100 | Stable — held back by stock photos and broken image file |
| Trustworthiness | 55/100 | Stable — same core issue (stock photos, unverified stats) |
| Security/Lead capture | 35/100 | Unchanged — contact form still non-functional, this is the ceiling on the whole score |

### **Overall Production Readiness: 65 / 100**

The build has measurably improved on cosmetic and metadata polish since the last review, but **the score cannot move meaningfully past the mid-60s until the contact form actually sends you leads and the domain identity is resolved** — those two items gate everything else. Everything else on this list is genuinely quick, mechanical work once those two are done.
