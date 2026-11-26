# 07 · Owner Checklist – what only you can supply or confirm

Tick each item before the related page goes live. Items are ordered by risk.

## A. Compliance and trust (do first)
- [ ] **Licence:** number, issuing authority, valid-until date (and test-prep/language-class permission, if separate)
- [ ] **PAN / registration number**
- [ ] **Confirm status of the 2026 consultancy regulation** (commencement date, test-prep permission, website duties) with MoEST / your lawyer
- [ ] **Fees page figures** – counselling, applications, visa support, English Foundation, refund policy
- [ ] **NOC process wording** – confirm the current MoEST process before publishing guidance
- [ ] **Phone numbers:** the site has **01-5316680** and WhatsApp **9801085977**; your Meta ad brief uses **01-59234023** and **9760808629**. Choose one set for site, Google Business Profile, ads and schema
- [ ] **Social profile URLs** (Facebook, Instagram, TikTok, YouTube, LinkedIn) and Google Business Profile link

## B. People and proof
- [ ] Team photos (same background), bios, languages, destinations handled, qualifications
- [ ] Trainer: name, qualification, years teaching, IELTS/PTE scores if you want to show them
- [ ] Written consent + documents for each student story you want to publish
- [ ] Written agreements for any partner institution you want to name
- [ ] Office photos (signboard, reception, classroom) you own
- [ ] **Image licences:** the repo says the source/licence of hero, destination, blog and section photos is "not recorded" – confirm or replace

## C. Facts only a counsellor can confirm
- [ ] Typical tuition ranges per country – check 3 institutions your students actually use
- [ ] Main intakes per country as you operate them
- [ ] **Japan:** monthly funds, post-study rules, 2026 document/language-school changes
- [ ] **Australia / UK / USA:** work-hour limits and fee amounts marked "confirm" on each page
- [ ] **USA:** whether the US$250 visa integrity fee applies to F-1 now; whether the duration-of-status rule is in force (court status)
- [ ] **Europe:** which countries besides Germany you actively advise on
- [ ] Reviewer name for each country page ("Reviewed by …")

## D. Service definitions (remove if not offered)
- [ ] Airport pickup, accommodation help, post-arrival support – exact scope or remove
- [ ] Scholarship guidance – what you do and don't do
- [ ] "One counsellor per file" and "every file checked by a second counsellor" – true? keep; else remove
- [ ] IELTS/PTE batch timings, class length, fee for English Foundation
- [ ] Response-time promise for enquiries
- [ ] B2B model (institution/agent) – with legal review

## E. Decisions for you
- [ ] Publish `/lp/uk-january-2027` or switch to UK September 2027 (recommended)?
- [ ] Add light Nepali lines (Home, Contact, countries)? Who proofreads?
- [ ] Rename `/ielts` to `/ielts-pte`?
- [ ] Keep hero video on desktop (trimmed) or use a still image only?

## F. Technical follow-ups (for your developer)
- [ ] Update `company.ts` (licence, PAN, socials, single phone set)
- [ ] `countries.ts`: rewrite Europe line; add Germany
- [ ] `pricing.ts`, `faq.ts`: single source for class fees and FAQs (no duplicates)
- [ ] `CountryPageTemplate`: 7 blocks; add snapshot table and "Last checked / Reviewed by"
- [ ] Callback form handoff into the contact form (baseline issue #1)
- [ ] Sitemap `lastModified` from content dates
- [ ] Hero video and image `srcset`
