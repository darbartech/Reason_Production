# 05 · SEO & Answer-Engine Plan (2026)

## 1. What matters for this site in 2026
- **Search now includes AI answers** (AI Overviews / AI Mode). They quote pages that answer a question directly, with a date and a named source. Our "Quick answer" boxes, dated fact tables and official links are built for this.
- **Trust signals matter more for visa/money topics** (they affect real decisions). Google looks for real people, real address, real licence, sources, and update dates (E-E-A-T).
- **Thin or repeated pages lose.** The old Study Abroad "benefits" and five "why us" lists add nothing a search engine can use.
- **Speed is a ranking and conversion factor** – especially on mobile data in Nepal.
- **FAQ rich results** are limited to a few site types since 2023; keep `FAQPage` markup for machines, but don't expect a snippet.
- **Local search** (Google Maps, "near me", "New Baneshwor") is the cheapest lead source for a physical office.

> I did not have keyword-volume data. Intent and priority below are judgement; confirm volumes in Google Search Console and Keyword Planner (set location Nepal) before final decisions.

## 2. Keyword & intent map

| Page | Primary query (intent) | Secondary | Title (≤ 60) |
|---|---|---|---|
| `/` | study abroad consultancy in Kathmandu *(commercial/local)* | education consultancy New Baneshwor | Study Abroad Consultancy in Kathmandu \| Reasons Education |
| `/study-abroad` | study abroad from Nepal *(informational)* | how to study abroad from Nepal, documents | Study Abroad from Nepal: Process, Costs & Visa Steps |
| `/ielts` | IELTS classes in New Baneshwor *(local)* | PTE classes Kathmandu, IELTS preparation fee | IELTS & PTE Classes in New Baneshwor, Kathmandu |
| `/countries/canada` | study in Canada from Nepal *(informational)* | Canada study permit proof of funds 2026, PAL Nepal | Study in Canada from Nepal: Costs & Visa (2026) |
| `/countries/uk` | study in UK from Nepal | UK student visa money requirement 2026, graduate route | Study in the UK from Nepal: Costs & Visa (2026) |
| `/countries/australia` | study in Australia from Nepal | subclass 500 Nepal, genuine student | Study in Australia from Nepal: Costs & Visa (2026) |
| `/countries/usa` | study in USA from Nepal | F-1 visa Nepal, I-20, SEVIS | Study in the USA from Nepal: Costs & F-1 Visa (2026) |
| `/countries/new-zealand` | study in New Zealand from Nepal | NZ student visa work hours | Study in New Zealand from Nepal: Costs & Visa (2026) |
| `/countries/germany` | study in Germany from Nepal | blocked account Nepal, Type D visa | Study in Germany from Nepal: Costs & Visa (2026) |
| `/countries/japan` | study in Japan from Nepal | Japan student visa COE | Study in Japan from Nepal: Costs & Visa (2026) |
| `/fees` | consultancy fees Nepal *(trust)* | – | Our Fees \| Reasons Education, Kathmandu |
| `/faq` | study abroad FAQ Nepal | NOC, IELTS vs class fee | Study Abroad FAQs for Nepali Students (2026) |
| Blog | long-tail "how/what changed" queries | see calendar in `pages/09_blog.md` | one per post |

**Nepali queries** to test (add on Home, Contact and each country intro): विदेश अध्ययन परामर्श · आइएल्टस क्लास · अस्ट्रेलिया पढ्न · क्यानडा पढाइ खर्च. Check real search behaviour in GSC first.

## 3. On-page checklist (every page)
- [ ] One H1 with the primary phrase; H2s answer sub-questions
- [ ] **Quick answer** box in the first 100 words (≤ 55 words)
- [ ] Title ≤ 60 chars, meta ≤ 155 chars, unique, includes a benefit or fact
- [ ] "Last checked" date + reviewer name, visible
- [ ] Figures have date + official link (not just "see website")
- [ ] 3–5 internal links with descriptive anchors (see section 5)
- [ ] One CTA, same wording everywhere
- [ ] Images: descriptive alt, width/height set, AVIF/WebP via `srcset`
- [ ] Canonical set (already built in `seo.ts`)

## 4. Structured data

| Where | Type | Notes |
|---|---|---|
| Site | `EducationalOrganization` + `ProfessionalService` (exists) | Add `identifier` (licence/PAN), `sameAs` (once socials exist), `hasMap`, `contactPoint` |
| Site | `WebSite` (exists) | Optional `SearchAction` only if site search is added |
| All inner pages | `BreadcrumbList` (exists) | Keep |
| Country pages, blog | `Article` with `author` (Person), `dateModified`, `publisher` | Matches "Last checked" |
| FAQ & home FAQ | `FAQPage` (exists) | Machine readability only |
| Team | `Person` for each counsellor on About | Requires real bios |
| Reviews | `Review`/`AggregateRating` | **Only** with real, consented, verifiable reviews |
| Events | `Event` | Only when real (component already gated) |

## 5. Internal linking map (descriptive anchors)

- **Home →** each country page (tiles), Study abroad ("see the full process"), Services, IELTS ("IELTS & PTE classes"), Eligibility, Fees, FAQ.
- **Study abroad →** all 7 country pages, Fees, Eligibility, IELTS.
- **Country page →** Study abroad ("how the process works"), IELTS ("prepare for the English test"), its 2 closest comparison countries, Fees, Contact.
- **IELTS →** Study abroad, Countries (which test each needs), Contact.
- **Blog post →** one country page + one service page.
- **Footer →** all core pages (keeps crawl depth ≤ 3).

## 6. Local SEO (highest return for a walk-in office)
1. **Google Business Profile:** primary category *Educational consultant*; secondary *Language school / Test preparation*; same name, address, phone (NAP) as the site; hours Sun–Fri 10–5; services list; photos (office, team, classroom, signboard); weekly post.
2. **One phone set everywhere** (resolve the 01-5316680 / 9801085977 vs 01-59234023 / 9760808629 mismatch).
3. **Reviews:** ask every student after an outcome; reply to all; never pay or gate reviews; no fake ones.
4. **Citations:** Facebook, LinkedIn, YouTube, Apple/Bing places, Nepali directories, with identical NAP.
5. **Maps embed:** lazy-load; add a "Get directions" link (exists).
6. **Service-area copy:** mention Kathmandu valley areas students come from (Baneshwor, Koteshwor, Lalitpur, Bhaktapur…) once on Contact.

## 7. Technical items tied to content
| Item | Action |
|---|---|
| Sitemap `lastModified` | Use real content dates (per page), not build time |
| Hero video 2.9 MB (autoplay, `preload="auto"`) | Poster-only on mobile / `Save-Data` / reduced motion; ≤ 800 KB; `preload="none"` |
| Images | Serve the generated AVIF/WebP with `srcset` (static export bypasses Next optimiser) |
| Map iframe | Lazy-load on tap |
| `noindex` | Keep landing pages `noindex` until approved; add `/admin` to robots disallow (verify) |
| Redirects | If renaming `/ielts` → `/ielts-pte`, add 301 and update sitemap |
| `hreflang` | Only if full Nepali pages are added |
| Core Web Vitals targets | LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 (mobile, Nepal 4G) |
| 404 | Helpful links (see `pages/00_global.md`) |

## 8. Freshness plan
- Monthly: USA, UK; quarterly: other countries; ad-hoc: when a government announces a change.
- On each update: change the on-page date, update `dateModified`, update sitemap `lastmod`, add one line to the page's *"What changed"* note.
- Publish a short blog post for any change that students will search for (e.g., "UK funds from 30 Nov 2026").

## 9. Measurement
- **Search Console:** impressions/clicks per page & query; coverage; Core Web Vitals.
- **GA4 events:** `callback_submit`, `enquiry_step1`, `enquiry_submit`, `whatsapp_click`, `call_click`, `directions_click`, `quiz_complete`, `country_view`, `fee_page_view`.
- **GBP insights:** calls, direction requests, website clicks.
- **AI visibility check (monthly):** ask 10 target questions in AI search and note whether Reasons is cited.
- **Baseline first (30 days), then set targets.** I haven't invented benchmark numbers.
