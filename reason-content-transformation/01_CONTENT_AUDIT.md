# 01 · Content Audit – Reasons Education website

**Scope:** every public route in the Reason_Production project (home, study-abroad, services, IELTS/PTE, about, eligibility, 7 country pages, FAQ, blog, B2B, contact, stories, legal, UK landing page) plus the shared content files, components and phase docs.
**Method:** read all copy in source, estimated visible words per page, checked each claim against what the site can prove, compared figures with 2026 sources (see `02_FACT_BASE_2026.md`).

---

## 1. The honest diagnosis

Your instinct is right. The problem is **not too little information – it is the same information said many times, in different words, with a few claims that cannot be proven.**

The previous clean-up phases already removed the worst fake proof (empty partners, hidden testimonials, "owner-to-fill" placeholders). What is left is structural noise:

| # | Problem | Where it shows | Effect on the visitor |
|---|---|---|---|
| 1 | **Home page has 15 sections (~1,500 words)** | Hero → Services → Destinations → Courses → Process → Why us → Team → Blog → FAQ → Office → CTA | A student scrolls for minutes and still has no single next step |
| 2 | **Same CTA 7+ times** on home ("Book a free session / counselling" in hero button, hero form, process link, team cards ×5, office, CTA) | Home | Choice overload; CTA stops looking special |
| 3 | **Five different "Why choose us" lists** | Home (4), Study Abroad (6), Services (3), About (4), IELTS (4), every country page (5) | Reader meets the same promises 5× and trusts none |
| 4 | **Process explained 4 ways, with different step counts** | Home = 5 stages, Study Abroad = 6 steps, Country pages = 8–9 steps, Services cards = 6 | Contradiction ("is it 5 or 6?") |
| 5 | **Address/hours/phone printed 6× on home** | Hero footer line, Office block, CTA, Footer, Mobile bar, Schema | Noise; and a future number change must be made in many places |
| 6 | **Generic benefit copy** ("global career opportunities", "cultural immersion", "personal growth") | Study Abroad › Benefits | Zero decision value; students know this. Weakens SEO (thin, generic) |
| 7 | **Hero has ~8 actions** (button, call button, form with 3 fields + submit, 4 shortcut links) | Home hero | First screen competes with itself |
| 8 | **Too many UI patterns for the same content** (tabs, accordion, carousel, bento cards, sticky sidebars) | Process tabs, destination carousel + grid, bento services | Hides content behind clicks; bad for scanning and for search engines |
| 9 | **Country pages: 11 sections, many empty or generic** | Template renders requirements, English, NPR costs, proof of funds, visa, work rights, refusals, scholarships, "our role", FAQ, quick facts | Long, repetitive, and the sections with the *most* decision value (money, dates) are the thinnest |
| 10 | **Brand name drift** | "Reasons Education", "Reason Education", "The Reason Advantage", "Reason Production" | Weakens entity recognition for Google and for people |

### Rough size today (words visible in source, estimate)

| Page | Today | What it should do | Target |
|---|---|---|---|
| Home | ~1,500 | Get to *one* action | **~500** |
| Study abroad | ~670 | Explain the path + costs + documents | **~480** |
| Services | ~430 | List 4 services + what you get | **~300** |
| IELTS/PTE | ~365 | Fees, schedule, what's included | **~300** |
| About | ~300 | Prove who you are (licence, team) | **~350** *(needs more real content, not less)* |
| Country page | ~600 | Dated facts + steps + money | **~500, denser** |
| FAQ | ~400 | Answer-first, one answer per question | **~650** *(more questions, shorter answers)* |
| B2B | ~460 | Two audiences, no unproven claims | **~250** |
| Contact | ~45 | Reassure + what happens next | **~150** |

> The goal is **clearer, not just shorter.** Where a page is thin on things that matter (About, Contact, FAQ, money facts) the rewrite adds content.

---

## 2. Claims the site cannot currently prove (fix or remove)

Under Nepal's July 2026 consultancy regulation, "misleading or exaggerated" advertising can cost a licence. These lines should go or be backed with evidence.

| Claim (where) | Problem | Action |
|---|---|---|
| "top-rated IELTS/PTE classes" (Study abroad › step 2) | No rating shown | **Remove** |
| "ensuring all documents are perfect for a **high acceptance rate**" (Study abroad › step 3) | Implies outcome; contradicts "no guarantees" | **Remove** |
| "counsellors have **over 10 years** of experience" (Services) | No bios on About to support it | Replace with "Advising Nepali students since 2015" **or** add real bios |
| "sees a limited number of students each intake so every file is reviewed twice" (Study abroad) | Unverifiable | Keep only the process fact: "A second counsellor checks every file before submission" – if true |
| "Speaking practice with **native accents**" (IELTS) | Unclear and unprovable | **Remove** |
| "our **certified** trainers" (IELTS blog) vs "ask to meet your trainer" (FAQ) | Two different positions | Show trainer name + qualification on About; say that once |
| "A high band score … improves your **visa success rate**" (IELTS blog) | Causal claim | **Remove** |
| "Accommodation, flights, **airport pickup**" (Home › Services) | Is airport pickup really offered? | Keep only what is offered |
| "Post-arrival support … we stay connected after you land" (Services) | Undefined scope | Define in one line or **remove** |
| "**university relationships**" (B2B) while partners list is empty | Not documented | **Remove** until written agreements exist (and regulation requires recommended universities to be authorised) |
| "Agreed commission structure" (B2B) | Regulation bans *undisclosed* commissions | Needs legal review before any commission wording |
| "easy travel across the **Schengen** area" (Countries data) | Students do not travel on Schengen tourist rules; they hold a national visa/residence permit | **Rewrite** |
| "SOP & LOR **writing**" (Services meta) vs "we draft with you, **not for you**" (Study abroad) vs "we help you plan and review" (FAQ) | Three positions on the same service; embassies expect the student's own SOP | **One position: review and coach, never write** |
| "first **30-minute** meeting is free" vs "first counselling session is free" | Inconsistent | "Your first session (about 30 minutes) is free" |

---

## 3. Accuracy issues against 2026 rules

| Page | Issue | Fix |
|---|---|---|
| Canada | No actual proof-of-funds figure. Since 1 Sep 2026 it is **CAD 23,448** (single, outside Québec) | Add figure + date + IRCC link |
| UK | Says "higher amounts apply from 30 Nov 2026" without the numbers. They are **£1,570 London / £1,203 outside** | Show both periods in a small dated table |
| UK | Graduate route FAQ stops at "18 months from Jan 2027". On **28 Oct 2026** the Budget announced **2 years for graduates of "high-compliance" universities** (details pending) | Add one line, mark "not yet in force" |
| USA | No mention that **duration of status ended 15 Sep 2026** (fixed admit-until date, 30-day grace) – this directly affects planning | Add to USA page + FAQ |
| USA | "SEVIS ~USD 350", "DS-160", no visa-integrity-fee note | Add "check current fees at travel.state.gov" with date |
| Australia | Funds shown (AUD 29,710 ✓) but visa fee (AUD 2,000) and 295,000 planning level / processing tiers are missing | Add |
| Europe | Treated as one destination. Real rules are country-specific (blocked account €11,904 is **Germany only**) | Create a **Germany** page; Europe becomes a short hub |
| Japan | "JPY 150,000 monthly" has no source; 2026 rule changes not reflected | Source via JASSO/MOFA or remove |
| All countries | "IELTS 6.0 / 6.5" shown as if national rules | Say "typical; each institution sets its own" |
| All countries | "Page updated 2026-10-08" hard-coded on pages whose figures changed in Aug–Oct | Tie the date to a real review; show "Next review" |
| Nepal | New regulation and NOC rule not reflected anywhere (Fees page, licence, NOC explanation) | Add (see Home, About, Fees, FAQ) |

---

## 4. Inconsistencies in business facts

| Item | Where | Issue |
|---|---|---|
| Phone | Site: **01-5316680**, WhatsApp **9801085977** | Your Meta ad brief uses **01-59234023** and **9760808629**. Pick one set and use it everywhere (site, Google Business Profile, ads, schema) |
| Registration | `company.registration` empty | The Hero, Credentials strip and Schema all depend on it; **a licence number is now a trust *and* a compliance item** |
| Social links | all empty | No `sameAs` in schema; footer shows no social proof |
| Team | 5 names, no photos, no bio, no qualification | Biggest trust gap on the site; also the E-E-A-T gap for Google |
| Blog | 3 posts dated Mar–Apr 2026 | Looks abandoned; Canada post predates the Sep 2026 funds change |
| Hero video | 2.9 MB, `autoplay` + `preload="auto"` | Heavy on mobile data and slows first paint; poster image is enough on mobile |
| Sitemap | `lastModified` = build time for all static pages | Tells Google everything changed every deploy – use real dates |
| Image credits | "Source and licence not recorded" for hero, sections, destinations, blog | Licence risk – confirm or replace (see your Phase 6 audit) |

---

## 5. What is already good (keep)

- **Honesty tone** – "We tell you when a plan won't work", "What we can't do" – this is your differentiator and now legally prudent.
- **Fee transparency** direction – class fees shown from a single `pricing.ts`.
- **Proof discipline** – hidden testimonials/partners until consented/verified.
- **Accessibility basics** – skip link, focus styles, 44 px targets, `prefers-reduced-motion`.
- **Official-source links** on country pages.
- **Eligibility quiz** and 3-field callback concept (right idea, over-used).
- **Static export + schema + OG images** – good technical base.

---

## 6. Priority order

1. **Compliance & trust (week 1):** licence number, Fees page, remove unprovable claims, one phone set, team bios.
2. **Accuracy (week 1–2):** update Canada, UK, USA, Australia as in `02_FACT_BASE_2026.md`; fix Europe/Japan.
3. **Simplify (week 2–3):** new Home, Study Abroad, Services, IELTS, About from `pages/`.
4. **SEO/AEO (week 3–4):** titles, answer-first blocks, schema, internal links (`05_SEO_PLAN.md`).
5. **Growth (week 4+):** content calendar, GBP, lead magnets (`06_MARKETING_AND_CONVERSION.md`).
