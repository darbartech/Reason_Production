# 04 · Information Architecture & UX Blueprint

## 1. Principle
**One page = one job. One screen = one next step.** Visitors arrive with one of four questions; the site should answer each in two clicks.

| Visitor's question | Lands on | Next step |
|---|---|---|
| "Can I study abroad with my marks and budget?" | Eligibility / Study abroad | Book a free session |
| "How much does *Canada/UK/…* cost, what's the visa?" | Country page | Book / WhatsApp |
| "I need IELTS/PTE" | IELTS & PTE | Ask about a batch |
| "Is this consultancy real and honest?" | About + Fees + Contact | Visit the office |

## 2. Proposed sitemap (14 → 12 core pages; 1 new, 2 merged)

```
/                         Home (8 blocks)
/study-abroad             Process, documents, costs  (absorbs “benefits”, “why us”)
/countries                Compare 7 destinations
  /countries/canada
  /countries/uk
  /countries/usa
  /countries/australia
  /countries/new-zealand
  /countries/germany      NEW – split out of Europe (blocked account, Type D visa)
  /countries/europe       Short hub: which European countries we advise on
  /countries/japan
/services                 4 services (B2B moves out)
/ielts                    IELTS & PTE classes (keep URL; add /ielts-pte later with 301)
/eligibility              Quiz
/fees                     NEW – public fee schedule (required by 2026 regulation)
/about                    Story, licence, team with bios
/faq                      One answer per question
/blog  /blog/[slug]       3 updated + 1 post/2 weeks
/stories                  Hidden until consented stories exist
/contact                  Book a session; 3 ways to reach us
/b2b                      Partners (institutions + local agents) – legal review first
/privacy  /terms          Plain-language rewrite + legal review
/lp/[slug]                Campaign pages (noindex until approved)
```

**Removed as standalone sections:** Course areas (fold into Study abroad as one table), Events (until real), Partner strip, Credentials strip (becomes the header trust line), Benefits of studying abroad.

## 3. Navigation
**Desktop header (5 items + CTA):**
`Study abroad ▾ (country list)` · `Services` · `IELTS & PTE` · `About` · `Blog` · **[Book a free session]**
(Move *Eligibility* into the Study abroad menu and hero link; move *FAQ*, *Fees*, *Stories*, *B2B* to footer.)

**Mobile:** logo, menu button, and the existing bottom bar – keep **three** actions only: **Call · WhatsApp · Book a free session** (drop the eligibility icon; it is not a primary action).

**Footer (4 columns):** Countries · Services · Company (About, Fees, FAQ, Blog, Contact) · Contact + licence number + legal links.

## 4. Home page wireframe (8 blocks, ~500 words)

```
1  HERO        H1 + 1 line + [Book a free session] + text link “Check eligibility”
               trust line: Since 2015 · Licence no. · Sun–Fri 10–5 · New Baneshwor
               (desktop: 3-field callback form on right; mobile: no form in hero)
2  SERVICES    4 cards → counselling, applications & documents, visa, IELTS/PTE
3  DESTINATIONS 7 tiles + “Not sure?” (grid on desktop, 2-col grid on mobile – no carousel)
4  PROCESS     5 steps in one row (no tabs) → link to Study abroad
5  WHY US      3 points: fees in writing · straight answers · one office
6  TEAM        3 named people with photo + role (only when photos & bios exist)
7  FAQ         5 questions, answers ≤ 40 words
8  VISIT + CTA ONE block: address, hours, phone, WhatsApp, directions + 3-field form
```
**Removed from Home:** Course areas, Blog preview (until ≥ 3 fresh posts), Events, Partner/Credential strips (hidden), second CTA block, 4 shortcut links, duplicate address lines, destination carousel.

## 5. Page templates

### 5.1 Country page (7 blocks – replaces 11)
```
1  Header:   H1 · 1-line overview · “Last checked <date> · Reviewed by <name>”
2  Snapshot: facts table (tuition range · proof of funds + date · intakes · work rights · post-study work · English test)
3  Who it suits / who should think twice   (2 short lists)
4  Requirements checklist   (≤ 7)
5  Visa steps               (≤ 7, numbered)
6  Money & mistakes: proof-of-funds detail + 3 common refusal reasons
7  FAQ (4) + official sources + CTA
```
Sidebar (desktop): sticky “Book a free session” + “Official sources”. No scholarships/“our role”/“why us” blocks – one line in the CTA instead.

### 5.2 Service page
`H1 → 4 service blocks (what you get / what you bring / how long) → "What we can't do" → CTA`

### 5.3 Article
`H1 → "Quick answer" box → H2 sections → sources → author + reviewer + date → related country guide → CTA`

## 6. UX rules that remove "noise"
1. **No hidden content behind tabs/accordions** for core facts (Process, requirements). Use plain sections; accordions only for FAQ.
2. **No carousels.** Use a 2-column grid on phones (7 destinations fit in 4 rows).
3. **Max one animated element per page** (the existing `reveal` effect only on Why-us and cards; hero video poster-only on mobile or when `Save-Data`/reduced motion).
4. **Vertical rhythm:** alternate white / paper backgrounds; reduce section padding on mobile (~40–56 px).
5. **Typographic scale:** H1 36–44 px desktop / 30–34 mobile; H2 28–32; body 17–18 px; line-height 1.6; max line length 65–75 chars.
6. **Contrast:** body text ≥ 4.5:1; on the dark navy (`#071A33`) use white, never mid-grey. Keep the 44 px tap targets already used.
7. **Forms:** Step 1 = name, phone, destination (3 fields). Everything else optional on step 2. No CAPTCHA wall before submit (keep honeypot + rate limit).
8. **Proof near the ask:** put "free first session" and "no guarantee, honest advice" **next to** each form button, not far above it.
9. **Facts have dates.** Any figure that can change shows a small "as of" label.
10. **Sticky mobile bar:** Call · WhatsApp · Book a free session. Remove desktop floating WhatsApp if the header already has a WhatsApp link (or keep it and drop the header link – not both).
11. **Performance as UX:** hero video ≤ 800 KB or removed on mobile; serve the AVIF/WebP files already generated with `srcset` (static export disables Next's optimiser, so use `<picture>`/`<img srcset>`); lazy-load map iframe until the user scrolls to it or taps "Show map".
12. **Empty states are honest:** if no events/stories, the section does not render (already implemented – keep).

## 7. Components: keep / change / remove

| Component | Decision |
|---|---|
| `Hero` | Simplify: remove shortcuts, call button, registration/address line → trust line |
| `CallbackCard` | Keep (desktop hero + final block); fix: pass values into `/contact` form (baseline issue #1) |
| `ServicesOverview` | 6 → 4 cards; remove bento spans |
| `StudyDestinations` | Replace carousel + duplicate grids with one grid |
| `CourseAreas` | Remove from Home; move to `/study-abroad` as a table |
| `Process` | Replace tabs with a 5-step static row (details live on Study abroad) |
| `TrustIndicators` | 4 → 3 points |
| `Testimonials`, `Events`, `PartnerStrip`, `CredentialsStrip` | Keep as hidden-until-proven |
| `CounsellorCard` | Keep; require photo + bio + languages before showing |
| `BlogPreview` | Home: remove until ≥ 3 fresh posts |
| `FAQ` (home) | Keep 5; single column on mobile |
| `OfficeBlock` + `CTA` | **Merge** into one "Visit or message us" block |
| `CountryPageTemplate` | 11 → 7 blocks as above |
| `WhatsAppButton` | Keep desktop only |
| `MobileActionBar` | 4 → 3 actions |

## 8. Success measures (UX)
- Home: scroll depth to the Visit block ≥ 60 % (it should be ~5 screens, not 12).
- ≥ 1 primary CTA click per session on country pages.
- Form completion step 1 → submit.
- Mobile LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
