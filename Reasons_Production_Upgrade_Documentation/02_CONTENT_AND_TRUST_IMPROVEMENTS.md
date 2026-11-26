# Content, Accuracy & Trust Improvements

**Goal:** Make Reasons Education content useful, specific, verifiable and safe for students making high-cost education decisions.

## 1. Content governance

Create a controlled fact register before editing marketing copy. Each fact must include:
- Exact approved wording.
- Source document or official URL.
- Owner / reviewer.
- Date verified.
- Expiry or next review date.
- Pages where the fact appears.

No AI agent or developer may invent missing company details, licence numbers, student outcomes, university partnerships, success percentages, prices or visa conditions.

## 2. Company identity — owner verification required

Current values in `src/lib/company.ts` include:
- Legal name: `Reasons Education Foundation`
- Display name: `Reasons Education`
- Address: `Indreni Complex, New Baneshwor`, Kathmandu
- Phone: `01-5316680`
- WhatsApp: `9801085977`
- Email: `info@reasons.edu.np`
- Hours: Sunday–Friday, 10:00–17:00
- Established: 2015
- Registration authority/number/PAN: blank
- Licence authority/number/valid-until: blank
- Social URLs: blank

Treat these as unverified source data until the owner confirms them. Verify legal entity versus trading name and public-facing address. Do not expose PAN or registration details unless the owner approves and publication is appropriate.

### Required owner fact sheet

| Fact | Required evidence | Publish? |
|---|---|---|
| Legal entity name | Registration certificate | After confirmation |
| Trading name | Owner/legal confirmation | After confirmation |
| Office address | Current lease/utility/business record | Confirm public address |
| Consultancy licence | Valid licence and scope | Only if applicable and verified |
| Registration number | Registration certificate | Owner approval |
| PAN/VAT | Official certificate | Owner approval |
| Phone / WhatsApp | Test call and account control | Yes after verification |
| Email | Mailbox test | Yes after verification |
| Hours | Owner confirmation | Yes |
| Years operating | Documentary support | Only if defensible |
| Social profiles | Official account URLs | Yes after verification |

## 3. Claims policy

Do not publish:
- “100% visa success” or guaranteed admission/visa claims.
- Unverified visa success rates.
- Unverified student placement counts.
- Unverified partner/university logos.
- “Official representative” without evidence.
- Guaranteed jobs, permanent residency or post-study outcomes.
- “No hidden fees” unless fee policy and exceptions support it.
- “Licensed” without the applicable licence number, authority and current validity where required.

Replace absolute promises with accurate process descriptions, for example:
- “We help you understand course options and application requirements.”
- “Visa decisions are made by the relevant government authority.”
- “Eligibility and outcomes depend on your individual circumstances.”

Any numeric performance claim must have a defined denominator, period, cohort, source and approval. Display methodology or avoid the claim.

## 4. Team content

`src/content/team.ts` includes five names and roles:
- Rudesh Khadgi — Chief Executive Officer
- Roji Barnawa — Head of Operations
- Rajesh Poudel — Senior Visa Officer
- Anita Shrestha — Lead IELTS Trainer
- Suman Thapa — Content Writer

Photos, bios, specialisations, languages and qualifications are optional and are not currently supplied in the data module. Verify each person’s current employment, title and credentials before publication.

Do not create synthetic headshots or invented professional histories. If a person has not approved publication, remove or omit their profile.

## 5. Testimonials and student stories

`src/content/testimonials.ts` contains sample testimonial records, all with `consent: false`. This is an intentional safety gate.

Rules:
1. Keep the consent gate.
2. Retain signed written consent securely outside the public repository.
3. Confirm the student identity and exact quote.
4. Verify destination, institution, programme, intake and outcome.
5. Do not publish offer letters, passports, visa documents or sensitive student data.
6. Use only the approved photo and approved attribution.
7. Do not imply one student’s result is typical or guaranteed.
8. Provide a way to withdraw future publication consent where appropriate.

A quote must not be edited in a way that changes its meaning. If anonymized, clearly label it as anonymized and preserve supporting evidence.

## 6. Country page content standard

Relevant files:
- `src/content/countries.ts`
- `src/content/countryPages.ts`
- `docs/country-content/*.md`
- `src/components/CountryPageTemplate.tsx`

Every country page should contain:
1. Who may consider this destination.
2. Study levels and common programme types.
3. Admission requirements and academic equivalency caveats.
4. English-language requirements with institution-specific variation.
5. Tuition and living costs with currency, range, date and source.
6. Application timelines and intake caveats.
7. Visa process overview with official government links.
8. Financial evidence requirements with effective date.
9. Work conditions with official source and caveat.
10. Post-study options with official source and caveat.
11. Required documents.
12. Common mistakes.
13. Reasons Education’s actual service scope.
14. Clear CTA.
15. Last reviewed date and named reviewer.

### UK priority

For UK pages, link to official UK government and institution sources for current:
- Student visa eligibility and application process.
- Financial maintenance requirements.
- Immigration health surcharge and application fee.
- Work conditions.
- Graduate route and other post-study rules.
- English-language and course requirements.

Do not hard-code immigration fees or maintenance figures without effective dates. These can change; label the checked date and review regularly. Avoid interpreting law as individualized legal advice.

## 7. Fees and pricing

Relevant file: `src/content/pricing.ts`; also inspect `src/content/faq.ts`, `src/app/faq/page.tsx`, `src/app/fees/page.tsx` and course-related pages.

Create a single source of truth for every fee. For each price state:
- NPR or other currency.
- Whether VAT/tax applies.
- What is included.
- What is excluded.
- Whether the amount is a range or fixed.
- Effective date.
- Refund/cancellation conditions.
- Who confirms final costs.

The previous baseline identified duplicated IELTS/PTE prices in FAQ sources. Recheck the current archive and remove duplicated constants by importing from one canonical pricing module.

Never present a consultancy fee as a university fee or government visa fee.

## 8. Blog editorial standards

Each article should have:
- Unique search intent.
- Named author and short verified bio.
- Named reviewer for visa/immigration-sensitive topics.
- Publication and genuine updated dates.
- Primary official sources.
- Clear scope and limitations.
- Useful original guidance rather than paraphrased filler.
- Internal links to relevant destination/service pages.
- No guarantee or unsubstantiated outcome claim.

Do not change `dateModified` merely to make content appear fresh. Update only after a meaningful review/edit.

## 9. Nepali and English language quality

- Use fluent, natural Nepali rather than literal machine translation.
- Have a native reviewer proofread Nepali copy.
- Set `lang` attributes for mixed-language passages.
- Ensure Devanagari font coverage and line-height.
- Avoid inconsistent transliteration of institution names and visa terms.
- Keep terminology consistent across forms, buttons, FAQs and email notifications.

## 10. Acceptance criteria

- Every legal/business claim has owner approval.
- All country facts have official sources and checked dates.
- No unsupported success rate or guarantee remains.
- Testimonials remain hidden unless consent and evidence are recorded.
- Team biographies contain only verified information.
- All pricing is sourced from one canonical module.
- Blog author/reviewer details are real and approved.
- English and Nepali copy has human editorial review.
- A content owner and review cadence are assigned.
