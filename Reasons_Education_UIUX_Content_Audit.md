# Reasons Education: UI / UX & Content Strategy Audit

**Site:** reasons.edu.np (Next.js 14 static export + Express/Postgres enquiry backend)
**Audit date:** 8 October 2026
**Scope:** public website: design system, layout, components, user journeys, forms, accessibility, copy, content strategy, trust, SEO, measurement. The admin panel and server were read only for their effect on the user experience.
**Deliverable:** one document, three layers: *what is wrong (with evidence)* → *how to fix it (with code/copy)* → *what to build next (strategy + roadmap)*.



## 0. How to read this document

| If you are… | Read… |
|---|---|
| The owner / decision-maker | §1 Executive summary → §4 P0 list → §11 Roadmap → Appendix F (what only you can supply) |
| A developer | §4 (P0 bugs with code) → §5–6 → Appendix C (code snippets) → Appendix A (finding register) |
| A content writer / counsellor | §7 Content audit → §8 Content strategy → Appendix D (copy deck) → Appendix E (country-page spec) |

**Evidence tags used throughout**

| Tag | Meaning |
|---|---|
| **[R]** | Verified in the rendered site (I built a browser test against your static `out/` build at 390 px mobile and 1440 px desktop, took screenshots and measured the DOM) |
| **[C]** | Verified by reading the source code |
| **[X]** | Verified against external sources (web search, 8 Oct 2026). Secondary sources cited in Appendix B; **re-check against the official government page before publishing** |
| **[O]** | Needs the owner's confirmation (facts only you have) |

**Severity:** **P0** = broken, misleading or legally/reputationally risky; fix first. **P1** = materially hurts conversion or consistency. **P2** = polish / growth. **P3** = optional.

---

## 1. Executive summary

### 1.1 Verdict

The site has **made real progress since the earlier audit pack** (`Redesign/`): the new type system, warm-paper/navy/crimson palette, `SectionHeader`, honest copy ("we tell you when a plan won't work"), local images, a unified `company.ts` and a working enquiry-to-admin pipeline are all in place, and the *new-style* pages (Home, About, Countries index, Contact) are genuinely good. The honest "what we can't do" block is a trust asset most competitors would never publish.

But the site is **in the middle of a migration, and the unfinished half is where the risk is.** Four problems matter more than any visual polish:

1. **Visa information on country pages is out of date or wrong**, which is the single most damaging thing a study-abroad consultancy can publish. Examples verified today: Australia still cites "GTE" and AUD 24,505 (now Genuine Student, AUD 29,710); the UK page uses £1,334/month and "Tier 4" (now £1,529, rising to £1,570 on 30 Nov 2026); Canada says 20 work-hours (24 since Nov 2024) and omits the PAL step; **three pages list a "Biometric Residence Permit"** (a UK document) as a requirement for Japan and Europe (§4, P0-1).
2. **The conversion path is leaky.** The only enquiry form is on `/contact`; on mobile it starts **1,641 px down the page** (37 % of the way); the inputs are 14 px (iOS zooms the screen on focus); labels are 10 px at 2.3:1 contrast; typing one letter triggers a red error banner. There is **no analytics**, so none of this is currently measurable (P0-3, P0-10).
3. **Trust proof is still missing.** Registration/licence number, PAN and social links are empty in `company.ts` so the credentials strip renders *nothing*; the About page tells visitors the team roster "is a work in progress"; the hero photo is a Western café stock image captioned with your office address (P0-6, P0-7).
4. **Two design systems and two voices coexist.** Home/About/Countries speak calmly and specifically. Services, Study Abroad, B2B, FAQ, Blog, Privacy and Terms still use the older pill-badge / two-tone-heading / `font-bold` / "High Success" / "Nepal's most trusted" template, with contrast failures and claims that contradict your own "no buzzwords" promise (UI-1, C-1, P0-9).

### 1.2 The ten highest-leverage fixes (in order)

| # | Fix | Why it comes first | Effort |
|---|---|---|---|
| 1 | Correct or temporarily hide inaccurate country-page facts; add a visible **"Last verified"** date + official link per country | Wrong visa advice destroys trust and can harm students | M (content) |
| 2 | Add registration/licence no., PAN, real team photos + bios, real office photos | First thing a parent checks; currently absent | S–M (owner supplies) |
| 3 | Fix mobile edge padding on 8 pages (7 one-line edits) | Visible layout bug on the pages where students compare countries | XS |
| 4 | Rebuild the enquiry form: 3 required fields up front, 16 px inputs, readable labels, validate on blur, richer success screen | Biggest conversion lever on the site | M |
| 5 | Put a short "Call me back" form (name + phone + destination) in the hero, CTA band and country pages; pass `?destination=` through | Today every CTA sends people to a long form on another page | M |
| 6 | Install privacy-friendly analytics + 8 events | You cannot improve what you cannot see | S |
| 7 | Remove dead space under the header (100–160 px on every page) so the hero stats and first CTA sit above the fold | Wastes the most valuable screen real estate | XS |
| 8 | Publish a **Fees & refund policy** page (your homepage already promises "a written fee schedule") | Pricing opacity is the #1 trust objection to consultancies | S (owner supplies) |
| 9 | Finish the design-system migration on 8 legacy pages; one primary-button colour; one vocabulary for CTAs | Removes the "two websites" feeling and the contrast failures | L |
| 10 | Replace the 6 stub country pages with the data-driven page spec in Appendix E; add a country comparison table | Biggest SEO + decision-support gain | L |

### 1.3 Scorecard (editorial judgement, *not* measured scores)

| Dimension | Score | Rationale |
|---|---|---|
| Brand & visual identity (new pages) | **7 / 10** | Cohesive palette, serif/sans pairing, restrained; logo wordmark too small |
| Design consistency across site | **4 / 10** | Two systems; primary button changes colour by page |
| Mobile UX | **5 / 10** | Good sticky bar and hero; broken padding, buried form, focus bug |
| Conversion funnel | **4 / 10** | One entry point, long form, no measurement, mismatched promise → form wording |
| Accessibility | **5 / 10** | Good foundations (skip link, focus ring, reduced motion); many contrast/size failures |
| Content accuracy | **3 / 10** | Multiple outdated or wrong visa facts; internal contradictions |
| Trust & credibility | **4 / 10** | Honest tone, but no verifiable proof (licence, team, results, reviews) |
| SEO foundations | **6 / 10** | Metadata, canonicals, sitemap, schema exist; content depth is thin |
| Content depth | **3 / 10** | 6 country pages ≈ 2.9 KB each; 3 blog posts ≈ 550 words each, none since April |

### 1.4 What is already good (keep it)

- **Voice on the new pages**: "Study abroad, planned one step at a time", "We tell you when a plan won't work", "Your originals stay with you". Specific, verifiable, calm.
- **"What we can't do"** (Study Abroad + FAQ): rare and powerful; promote it to the homepage.
- **Process with durations** and a "no 100 % guarantees" stance.
- **Footer, Contact and CTA** all show address, hours, phone, WhatsApp and directions: strong local-trust basics.
- **Tokens & type scale** in `tailwind.config.ts` / `globals.css`: clamp()-based headings, 16 px body, 1.7 line-height, a real `prefers-reduced-motion` rule, skip link, visible focus ring. New-system colour pairs pass WCAG AA (5.3–6.0 : 1).
- **Enquiry plumbing**: UTM capture, honeypot, Turnstile option, duplicate guard, admin pipeline. The *back end* is ahead of the *front end*.
- **Honest social/credential handling in code**: empty fields are hidden rather than faked. The code is right; the data is just missing.

---

## 2. Method, scope and limits

**What I did**
1. Extracted and read the project source (`src/`, `server/`, `docs/`, `Redesign/`, config), ~120 files.
2. Served your static build (`out/`) locally and drove it with a headless browser at **390×844 (mobile)** and **1440×900 (desktop)**; captured screenshots; measured computed font sizes, colours, form position, horizontal overflow and animation opacity.
3. Computed WCAG contrast ratios for every colour pair I flag (Appendix B).
4. Verified rule-sensitive claims (Australia, UK, Canada, Nepal licensing) with web searches dated 8 Oct 2026.
5. Cross-checked against the earlier `Redesign/01_DESIGN_AUDIT.md` and the engineering docs.

**What I did *not* do (limits)**
- I did not audit the *live* site, Search Console, Google Business Profile or real analytics: none were provided, so there are **no traffic/conversion baselines** in this report. I will not invent them.
- I did not test on physical devices, screen readers or slow networks; recommendations for those are flagged as checks to run.
- Rule changes in Europe/Japan/USA/NZ were **not** independently searched; those items are tagged **[O]** (verify), not asserted.
- Scores in §1.3 are professional judgement to help prioritise.

---

## 3. Status of the previous audit (`Redesign/01_DESIGN_AUDIT.md`)

| Earlier finding | Status now | Note |
|---|---|---|
| Same template repeated everywhere; pill badges; two-tone H2 | **Partly fixed** | Fixed on Home/About/Countries/Contact. **Still present** on Services, Study Abroad, B2B, FAQ (home), Blog preview, Privacy/Terms |
| Heavy `font-black` / oversized type / 18 px body | **Fixed** (new system) | Legacy pages still use `font-bold`/`font-medium` + low-opacity text |
| Colours/contrast (cyan on white, crimson under-used) | **Mostly fixed** | New tokens pass AA. Legacy teal-on-navy fails (2.27 : 1) |
| 78 Unsplash references, hotlinked | **Fixed** | All imagery is local `.webp`. *However the hero is still a stock photo (P0-7)* |
| "98 % visa success", ICEF/British Council badges | **Removed** | Residue remains in softer form: "High Visa Success", "High Success", "top-rated" |
| Stock faces labelled as named staff | **Fixed** | Replaced by initials, but the page now says the roster is "a work in progress" |
| Three brand names | **Mostly fixed** | `company.ts` centralises; confirm legal entity (see P0-6) |
| Opening-hours conflict | **Fixed** | Single `company.hours`; schema matches |
| Outdated Canada/SDS | **Partly fixed** | SDS removed, but Canada still has stale work-hours and omits PAL; UK/AUS/Europe/Japan are stale |
| `notranslate`, sitemap `lastModified`, superlative titles | **Mostly fixed** | Static-route `lastModified` is still "build time" |
| Thin, near-duplicate country pages | **Still open** | See C-5 / Appendix E |
| Credentials, team, office/map, "what we don't promise" | **Mostly open** | "What we can't do" exists; credentials/team/office photos do not |

---

## 4. P0: fix first

Each item: **Evidence → Why it matters → Fix.**

### P0-1 Visa & policy information is out of date or wrong  *(content accuracy, highest risk)*

**Evidence [C][X]:**

| Page | Site says | Current reality (verify on official page) | 
|---|---|---|
| **Australia** | "Genuine Temporary Entrant (GTE) statement"; "GTE assessment by the institution"; living cost "AUD 24,505" | GTE was **replaced by the Genuine Student (GS) requirement for applications lodged from 23 March 2024**; it is assessed by the Department of Home Affairs, not the institution. Living-cost evidence is **AUD 29,710** + tuition + travel [X] |
| **UK** | "Tier 4 Student Visa"; "GBP 1,334 Monthly (London)"; "approx. GBP 12,006 + tuition"; "BRP collection"; Graduate Route "2 years" | Route is called **Student visa** (Tier 4 retired 2020). Maintenance is **£1,529/month London, £1,171 outside** for up to 9 months (since 11 Nov 2025) and **rises to £1,570 / £1,203 for applications from 30 Nov 2026**. BRPs are being replaced by **eVisas**. Graduate Route becomes **18 months for bachelor's/master's applications from 1 Jan 2027** (PhD stays 3 years) [X] |
| **Canada** | FAQ: "work up to 20 hours per week" | **24 hours/week** off-campus since 8 Nov 2024 [X]. Visa-step list **omits the Provincial Attestation Letter (PAL)** entirely. The blog post calls PAL "a new requirement for 2026"; it has applied since January 2024. One source reports a further proof-of-funds increase from 1 Sept 2026 [O: confirm on canada.ca] |
| **Japan** | Requirement list includes "Biometric Residence Permit (BRP) collection" | BRP is the **UK** document. Japan issues a **Residence Card**. Also the step order puts "EJU/JLPT entrance exams" *after* "Travel to Japan" |
| **Europe** | "BRP collection"; "Schengen student visa (Type D)" described as "the Schengen visa"; FAQ says France and Norway offer tuition-free education; proof of funds "approx. EUR 10,000+" | BRP is wrong. A **national D visa** is not a Schengen short-stay visa. France charges higher fees for non-EU students and **Norway introduced tuition fees for non-EU students in 2023** [O: verify]. Germany's blocked-account figure is higher than €10,000 [O: verify]. "Europe" is not one process; each country differs |
| **USA** | No mention of current interview/vetting conditions | Add current F-1 requirements and any 2025–26 changes to online-presence screening and interview availability [O: verify on travel.state.gov] |
| **All 7** | Sidebar shows "Typical processing: 2 – 4 months" by default when `processingTime` isn't set | An invented default shown as fact on **all seven** country pages (none of them sets `processingTime`) |
| **Canada page** | `lastUpdated="2026-10-07"` shown in the meta bar | A fresh date on content that is still stale **creates false assurance**. Only stamp a date after a documented review |

**Why it matters:** a student who budgets from the UK page's £12,006 is ~£1,700 short for London; a student writing a "GTE" statement for Australia is addressing a test that no longer exists. This is the most consequential content risk on the site, and it quietly undermines the "we keep current with each embassy's requirements" promise on the homepage.

**Fix (immediate, 1–2 days):**
1. Correct the facts above using the **official** pages (links in Appendix B / `docs/country-content/*.md`).
2. Where you cannot verify today, **remove the specific number** and link to the official page rather than showing a stale figure. Do **not** default `processingTime`; hide the row when unset.
3. Only show `lastUpdated` when a named person verified it; rename it **"Last verified"** and show who/when.
4. Add a calendar of known upcoming changes (UK: 30 Nov 2026, 1 Jan 2027) and a **"What changed in 2026"** box per page (Appendix E).
5. Long-term: move facts into structured data with a `verifiedOn` + `sourceUrl` per fact (Appendix E).

### P0-2 Mobile layout bug: content flush to the screen edge on 8 pages  *(UI)*

**Evidence [R][C]:** On 390 px mobile the "Seven countries, one plan that fits you" heading and intro touch the left/right screen edges while the hero above has 20 px padding. Cause: `max-w-content mx-auto` is used **without horizontal padding** (`container-custom` adds it; `max-w-content` does not). Occurrences:

```
src/components/CountryPageTemplate.tsx : 136, 170   → affects all 7 country pages
src/app/countries/page.tsx            : 54, 76
src/app/ielts/page.tsx                : 128, 153, 178
```

**Fix:** replace `max-w-content mx-auto` with `container-custom` in all 7 places (the class already includes `max-w-content`, `mx-auto`, `px-5 sm:px-8 lg:px-10`). For the meta bar in the template, use `container-custom py-5` instead of `section-padding !py-5`.

### P0-3 The mobile enquiry form is buried, hard to read, and punishes typing  *(UX / conversion)*

**Evidence [R][C]:**

| Issue | Measurement |
|---|---|
| Form position on mobile | Starts at **y = 1,641 px of a 4,406 px page** (≈ 37 %), beneath five contact cards |
| Input font size | **14 px** (`text-sm`). iOS Safari zooms the page when an input < 16 px is focused |
| Label size / colour | **10 px**, `rgba(16,49,88,0.4)` → contrast **2.29 : 1** (AA needs 4.5). "(Optional)" labels are 1.8 : 1 |
| Error text | 10 px red (3.76 : 1) |
| Premature validation | `mode: "onChange"`: typing a single letter in *Full name* instantly shows a red **"Please fix the following error"** banner **and** a duplicate inline message, shifting the layout mid-typing |
| Placeholder | Phone placeholder is `+977 9801085977`, which is **your own WhatsApp number**; users may think it is pre-filled or call it |
| Length | Up to **15 inputs** over 2 steps, **11 required** (incl. budget, result type, contact preference *and* contact time) before a first conversation |
| Lead capture | Nothing is saved until the final submit. Abandoning at step 2 loses even the name and phone number |
| Server vs client | Server returns per-field `errors`; the client ignores them and shows a generic toast |
| Rate limit | 5 submissions / 15 min / IP; shared networks (colleges, cyber-cafés, mobile CGNAT) can block genuine users |

**Fix:** see §6.3 (form redesign spec) and Appendix C snippets. Minimum viable patch (≈ 2 hours): `text-base` on inputs, 14 px sentence-case labels at full ink colour, `mode: "onTouched"`, show the summary only after a failed submit, and change the phone placeholder to `98XXXXXXXX`.

### P0-4 Mobile navigation steals focus on load; closed drawer is keyboard-focusable  *(accessibility / UX)*

**Evidence [R][C]:** On every mobile page load the hamburger button shows a **focus ring** with no user interaction (visible in the screenshots). In `Navbar.tsx` the `[isOpen]` effect's `else` branch calls `menuButtonRef.current.focus()`, which also runs on first mount. Separately, the off-canvas drawer is only translated off-screen (`translate-x-full`); its links remain in the tab order and screen-reader tree, and it has no `role="dialog"` / `aria-modal`.

**Fix:** track "has been opened" and only restore focus when closing after an open; make the closed drawer `inert` + `aria-hidden` (or `visibility:hidden` after the transition); add `role="dialog" aria-modal="true" aria-label="Menu"`. Snippet in Appendix C.

### P0-5 Study-abroad hero flickers; legacy heroes fail contrast  *(UI)*

**Evidence [R][C]:** `/study-abroad` hero image uses `animate-fade-in` with a `0.6s` delay; the keyframe uses `forwards` only, so the image is **visible → vanishes → fades back in**. Measured opacity over time: `1 → 1 → 0.18 → 1`. This is also your priority/LCP image. The second line of the H1 is `text-accent` (#0B6E8F) on navy (#103158): **2.27 : 1** ("how it works, one step at a time" is hard to read). The breadcrumb ("Home", 3.4 : 1) and B2B/Blog/Privacy heroes repeat the pattern. `bg-secondary/10 text-secondary` is used on the Destinations heading icon but **`secondary` is not defined** in Tailwind, so that icon tile gets no colour.

**Fix:** change the animation token to `both` fill (`'fadeIn .6s ease-out both'`) or remove the delay; use `text-accent-light` (4.1 : 1) or white for emphasis on navy, or better, retire the navy hero and use `PageHero` (UI-1); replace `secondary` classes with defined tokens.

### P0-6 Credentials missing, and an unfinished sentence is public  *(trust)*

**Evidence [C][X]:**
- `company.registration` = `{ authority: "", number: "", pan: "" }` → `CredentialsStrip` returns `null`; hero and footer registration lines are hidden. `company.social` is all empty → no social links anywhere and `sameAs` is omitted from schema.
- About page: *"Roster and bios are a work in progress."* The team section shows four named people as **initials in circles** with titles (CEO, Head of Operations, …) but no photos, bios, qualifications or contact.
- Nepal requires education consultancies to hold a licence from the Ministry of Education, Science and Technology (or provincial education office), and press reports (Kantipur, July 2025) say a large share of consultancies operate without valid registration, so **showing your licence number is a genuine differentiator, not a formality** [X]. A newly reported 2026 consultancy regulation exists; confirm requirements with counsel [O].
- Legal name is **"Reasons Education Foundation."** In Nepal "Foundation" often suggests a non-profit. If you are a private company, show the exact registered name and entity type in the footer [O].

**Fix:** populate `company.registration` (licence authority + number, company registration, PAN), social profiles, and a Google Business Profile link; replace the About-page placeholder with real photos + one-paragraph bios (what each person actually does, qualifications, years). If photos aren't ready, **remove the sentence** and list roles only. See §9 for the full trust plan.

### P0-7 The hero photo is generic stock and its caption implies it is your office  *(trust / imagery)*

**Evidence [R]:** The homepage arch image shows two Western women laughing over laptops in a café; the caption beneath reads *"Free first session · Indreni Complex, New Baneshwor, Kathmandu."* Visitors in Kathmandu can tell. The Study Abroad hero is a US-style campus; Services shows a "celebrating" stock scene. The arch's offset outline also overlaps the caption.

**Fix:** book a half-day photo shoot: (1) the office exterior + entrance, (2) a real counselling session (with consent), (3) a classroom/IELTS batch, (4) team portraits, (5) a student document-checking moment. Until then, use a neutral non-photographic hero (typographic panel with the address/hours card) rather than a misleading photo. Never caption stock images as your premises. Shot list in §9.3.

### P0-8 The site contradicts itself  *(content)*

| Topic | Place A | Place B |
|---|---|---|
| First-session length | `Process.tsx`: "45–60 minutes" | `/study-abroad` & country FAQ: "**30-minute**" |
| Number of steps | Homepage: "**Five** transparent steps" | `/study-abroad`: "Our Proven **6-Step** Process" |
| Visa time | `Process.tsx`: "varies by country; we'll give you the current average" | Home FAQ + `/faq`: "Typically **2–4 months**"; country pages default to the same |
| Testimonials recency | Heading: "supported … **this intake**" | Cards dated **Fall 2024 / January 2025** (≈ 2 years old) |
| Page promises | `/study-abroad` meta + 404 blurb: "**costs in NPR**" | Page contains **no cost section** |
| Page promises | `/countries`: "Compare 7 destinations … tuition ranges" | No comparison table exists |
| Scale | About: "a limited number of students each intake", "small team" | B2B: "**300+** active partners", "**500+** global universities", "advanced CRM", "most robust infrastructure in Nepal" |
| Spelling | 45 uses of *counselling/counsellor* | 42 uses of *counseling/counselor* in 12 files (Nepal uses British spelling) |

**Fix:** pick one answer for each row (owner decision), apply everywhere via shared constants (`company.ts` or `content/*.ts`), and add a pre-publish check (grep for the old values). Standardise on British English.

### P0-9 Over-claiming copy that contradicts your own positioning  *(content / risk)*

The homepage promises "no buzzwords, no '100 % guarantees'." These remain (full ledger in §7.2):

`High Visa Success` (Services), `High Success` tag on Australia (Study Abroad), `top-rated IELTS/PTE classes`, `high acceptance rate`, `maximize your success rate`, `Proven 6-Step Process`, `10+ Years of Excellence`, `Nepal's most trusted education network`, `most robust education consultancy infrastructure in Nepal`, `300+ Active B2B Partners`, `500+ global universities`, `High Commission Rates`, `Tuition-Free` (Europe tag), `Most Popular` (unsupported).

**Why it matters:** unverifiable superlatives are exactly what sceptical parents (and Google's quality raters) discount; they also dilute the genuinely credible statements next to them. They may also carry advertising-standards risk.

**Fix:** delete, or replace with a **specific, checkable** statement (e.g., "Every file is checked by two counsellors before submission", **if** true and recorded). Anything numeric needs a source and date.

### P0-10 No analytics, and a single entry point to the funnel  *(measurement / conversion)*

**Evidence [C]:** no analytics script, tag or event code anywhere in `src/`. `EnquiryForm` is rendered **only** in `ContactClient.tsx`. Every CTA on every page links to `/contact` with no context (no destination, service or page source beyond `sourcePage`).

**Fix:** §10.3 (events + KPIs) and §6.2 (multi-entry funnel). Start measuring *before* redesigning so improvements are provable.
