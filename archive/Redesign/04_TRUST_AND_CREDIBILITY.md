# 04 — Trust & Credibility ("tells the users to trust")

Parents and students are handing over money, results and passports. They will look for **proof that you are real, registered, local and honest**. Design alone can't create that — the content has to be true and visible. This file lists exactly what to fix and what to add.

> Nothing here invents facts for you. Items marked **VERIFY** need the owner's real documents or data.

---

## 1. Fix the brand name first (everything else builds on it)

Currently:

| Where | Name used |
|---|---|
| Logo image | **REASONS** — Education **Foundation** |
| Site titles, schema, footer | **Reason** Education **Consultancy** |
| Domain | **reasons**.edu.np |
| WhatsApp prefilled text, alt text | "Reason Education" |
| `docs/*.md` | Reason Education **Foundation** |

Visitors (and Google) see three entities. **Decide one legal name from the registration certificate**, one short display name, and use only those.

- Put both in `src/lib/company.ts` (File 03 §0): `legalName`, `displayName`.
- Update: `layout.tsx` (title template, `siteName`, authors/publisher), every page's `openGraph.siteName`, `Schema.tsx`, `Footer`, `Navbar` alt text, WhatsApp message, `<Image alt>` texts.
- Find all occurrences: `grep -rn "Reason Education\|Reasons Education" src`.
- If the legal name is "Foundation" but you do consultancy work, keep legal name in the footer/schema and use the display name in the UI.

---

## 2. Claims audit — verify or remove

| Claim | Where it appears | Problem | Action |
|---|---|---|---|
| **"98% visa success rate"** | `Hero`, `TrustIndicators`, `app/page.tsx` metadata, `ielts`, `ServicesClient`, `study-abroad`, `countries/canada`, `countries/new-zealand` | No definition (of what? per country? which years?), no source, and it is the first thing a sceptical parent will question. Many visa outcomes are decided by embassies, not consultancies | **Remove** unless you can show the count (e.g., "of 412 applications filed in 2024, 395 approved") and keep the records. If you keep it, show *numerator, denominator and period*, and link to a "How we calculate this" note |
| "Approved Consultancy" | `Hero.tsx` | "Approved" by whom? Unverifiable as written | Replace with the actual registration line: *Registered with [authority], Reg. No. ___* in the credentials strip |
| "ICEF-certified consultants" + `icef consultancy nepal` keyword | `study-abroad/page.tsx`, `app/page.tsx` | ICEF training certificates are per-person; can't be claimed company-wide without proof | Show named counsellors' certificates (PDF/photo) or **delete** the claim and keyword |
| "Join thousands of successful students" / "helped thousands" | `Testimonials`, `about` | Destination cards add to ~3,600 but have no source | Use a real, dated number, or "Since 2015 we've supported students to …" without a figure |
| "Students Placed" per country (400+, 1200+, 500+…) | `StudyDestinations.tsx` | Unsourced; Canada = 1,200 stands out | **Remove** from cards (done in File 03 §4b) unless backed by records |
| "500+ global universities" | `study-abroad` | Partnership vs. "can apply to" are different | Say "Applications to 500+ universities" only if true; or list the real partners |
| "Free counseling", "100% secure", "No hidden costs" | various | Promises need to be literally true | Keep only if policy; pair with the fee schedule (§3) |
| 5★ on every testimonial | `Testimonials.tsx` | Self-published ratings carry no weight and look templated | Remove stars; add outcome + year; link to Google reviews |
| Social links in schema (facebook/instagram/linkedin/twitter) | `Schema.tsx` | Look guessed; broken profiles harm trust and local SEO | Keep only real, active profiles (via `company.social`) |
| Opening hours | CTA: Sun–Fri **7 AM–5 PM** · Schema: Mon–Fri + Sun **10:00–17:00** | Contradiction | One source: `company.hours`; use it in CTA, footer, contact page, schema |

**Rule going forward:** every number on the site must have a file in a folder somewhere that proves it. If it doesn't, say it in words instead of numbers.

---

## 3. Fix the About page — stock photos as "leadership"

`src/app/about/page.tsx` shows four people with real-sounding names and titles (CEO, Head of Operations, Senior Visa Officer, Lead IELTS Trainer) — but the photos are **Unsplash stock images of other people**. A visitor who knows the real team (or reverse-image-searches) will see this at once, and it undermines every other claim.

**Do:**
1. Replace with **real portraits** of the actual team, same crop (square, shoulders-up, plain or office background).
2. Each person: name, role, **years of experience**, one line on what they handle, and a certificate/qualification if relevant (IELTS trainer band score, counselling training).
3. If you can't photograph everyone yet, show **fewer people with real photos** rather than more with stock.
4. Never show the same faces for other roles.

Also on About:
- Replace the slogan H1 *"Empowering Dreams, Shaping Futures"* with *"About Reasons Education"* (File 03 §4h).
- The story paragraph should have **specifics**: year founded, first office, who started it and why, what changed, current team size.
- Add a visible "Our office" photo + map (see TeamOffice below).

---

## 4. Trust components to add

### 4a. Credentials strip (homepage, directly under hero) — **new**
A single thin band; renders only what's filled in `company.registration`.

```tsx
// FILE: src/components/CredentialsStrip.tsx
import { ShieldCheck } from "lucide-react";
import { company } from "@/lib/company";

export default function CredentialsStrip() {
  const { authority, number, pan } = company.registration;
  if (!number && !pan) return null;               // hide until real data exists

  return (
    <section aria-label="Registration details" className="border-y border-line bg-white">
      <div className="container-custom flex flex-col gap-2 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-primary font-medium">
          <ShieldCheck size={18} className="text-accent" aria-hidden="true" />
          {company.legalName}
        </p>
        <p>
          {number && <>Registered{authority ? ` with ${authority}` : ""} · Reg. No. {number}</>}
          {number && pan && " · "}
          {pan && <>PAN {pan}</>}
        </p>
        <p>{company.address.street}, {company.address.city}</p>
      </div>
    </section>
  );
}
```
Add any **memberships/affiliations you can prove** (e.g., test-centre partnership letters, university agent agreements) as small logos *with permission*.

### 4b. "Team & office" section — **new**, `TeamOffice.tsx`
Two-column: left, the **office** (real exterior/interior photo, address, hours, "Get directions" link to Google Maps, phone); right, **3–4 team portraits** with name/role/experience. This answers the question *"Are they real and can I visit?"*

### 4c. Fee & process transparency
- A page or section titled **"What it costs and how it works"**: service → what's included → fee (or range) → when you pay. Even a simple table builds more trust than any slogan.
- Add the **process timeline** with realistic durations and what *you* need from the student at each step.

### 4d. "What we don't promise" block (FAQ or Study Abroad page)
Short, plain, confident. Example (adjust to your reality):

> **What we can't do.** We can't guarantee a visa or an admission offer — those decisions belong to universities and embassies. What we do guarantee is that your file is accurate, complete and submitted on time, and that we tell you honestly where you stand.

This single block is one of the strongest trust signals you can add, and it protects you legally.

### 4e. Student results wall (replaces generic testimonials over time)
Collect, **with written consent**: first name + initial, photo, destination, university/course, intake year, visa month. Optional 30–60 second phone video. Put 6–12 on a page `/results`, and 3–4 on the homepage.

### 4f. Google reviews
Create/claim the **Google Business Profile**, add office photos, hours, services. Ask every satisfied student for a Google review (WhatsApp them the review link). Link "Read our reviews on Google" in the footer and testimonials. **Don't** add `aggregateRating` schema to your own site for self-published reviews (Google ignores it and may penalise it).

### 4g. Contact page
- Full address + embedded map link, hours, phone, WhatsApp, email — all from `company`.
- Short promise near the form: *"We reply within one working day."* (only if true).
- Privacy line beside the form: *"We use your details only to contact you about your enquiry"* + link to Privacy.

### 4h. Evidence on country/visa pages
Each page should show **"Last updated: {month year}"** and link to the **official** embassy/immigration source for rules and fees. This is the strongest E-E-A-T signal for visa content, which changes often.

### 4i. Blog authorship
Each article gets a named author (a counsellor from the Team), a short bio, and "Reviewed on {date}". Articles without a human author rank and convert worse.

---

## 5. Photography (the biggest "premium" lever you control)

Stock photos are the reason the site feels generic. A weekend with a phone camera in good light beats 78 Unsplash images.

### Shot list (aim for 20–25 photos)
| Shot | Use |
|---|---|
| Counsellor + student at desk, natural light (3 variants) | Hero, Study Abroad, Contact |
| Office exterior with signage (Indreni Complex) | Contact, Team & office, schema `image` |
| Reception / waiting area | Team & office |
| IELTS/PTE classroom in session (face-crop OK) | IELTS page |
| Team portraits, same background, 4:5 | About |
| Students holding offer letters / at send-off (with consent) | Results wall |
| Seminar / workshop in progress | Services, Blog |
| Detail shots: documents folder, laptop with application, passports (blurred numbers) | Process section |

### Technical specs
- Shoot landscape for banners, portrait for hero/team; phone is fine in daylight.
- Export **WebP**, long edge ≤ **1600px** (hero 1200×1500), **≤ 200 KB** each. (`npx sharp-cli` or squoosh.app.)
- Descriptive file names: `counselling-session-new-baneshwor.webp`.
- Real alt text (what's happening, not keywords): "Counsellor reviewing a student's IELTS results at the Reasons Education office".
- Keep original stock only as a **temporary** placeholder, and remove before launch.
- **Consent:** get written/WhatsApp consent from every student pictured; minors need guardian consent.

For country pages, destination imagery is fine from a stock library, but prefer **one consistent source and style**, license-clear, self-hosted. Avoid obviously famous landmark clichés; campus and street scenes feel more real.

---

## 6. Copywriting rules (kills the "AI voice")

**Write like a counsellor talking to a parent: concrete, calm, specific.**

| Avoid | Prefer |
|---|---|
| "Your future beyond borders" | "Study abroad, planned one step at a time" |
| "Bridge the gap between your potential and global excellence" | "We match your results and budget to courses that accept you" |
| "Unlock / empower / dreams / journey / world-class / cutting-edge / seamless" | Name the thing: "IELTS classes", "visa file checked twice" |
| "Nepal's most trusted / best / leading" | Evidence: "Registered since 2015 · 3 counsellors · office in New Baneshwor" |
| "98% success" | The real numbers with period, or nothing |
| Triplets for rhythm ("Fast. Easy. Reliable.") | One honest sentence |

- Reading level: grade 7–8; short sentences; Nepali names and places where relevant (NPR costs, Kathmandu, Baneshwor).
- Every service/country page should answer: *what is it, who is it for, what does it cost (NPR), how long, what you must bring, what we do.*
- CTAs: verb + outcome — "Book a free counselling session", not "Get Started" / "Learn More".
- Consider **Nepali-language summaries** on the homepage and contact page later (P3); parents are often the decision-makers.

---

## 7. Trust checklist (use before launch)

- [ ] One legal name and one display name used everywhere
- [ ] Registration number + PAN visible (footer + credentials strip)
- [ ] Real address, hours, phone, WhatsApp, email — same on every page and in schema
- [ ] Real team photos; no stock faces attached to names
- [ ] No percentage/number without a record behind it
- [ ] Fee schedule and process page published
- [ ] "What we can't promise" statement published
- [ ] 6+ student results with consent
- [ ] Google Business Profile claimed and linked
- [ ] Country pages show "last updated" + official sources
- [ ] Privacy Policy and Terms linked in footer and near forms
- [ ] No broken or guessed social links
