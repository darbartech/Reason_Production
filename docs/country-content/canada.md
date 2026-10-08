# Canada — Country Content Checklist

Route: `/countries/canada`  
Component: `src/app/countries/canada/page.tsx`

## How to use this file

For every field below marked **[OWNER TO FILL]**, confirm the value against the official government source URL shown. Then paste the final value (with currency, duration, dates, etc.) into the corresponding prop of `CountryPageTemplate` in the page file.

Do **not** copy numbers, bands, or visa rules from this document — verify every figure at the source before you publish.

---

## Known outdated items (flag before publishing)

1. **Student Direct Stream (SDS)** — **closed 8 November 2024** per IRCC.  
   Any mention of SDS in requirements, visa process, or FAQs must be removed and replaced with current **regular study permit stream** guidance.  
   *Verify at:* <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/student-direct-stream.html>

2. **GIC / proof-of-funds amount** — **revised by IRCC** after the SDS closure.  
   The current `CAD 20,635` figure on the page and in `costs[1]` / the GIC FAQ must be confirmed against the latest IRCC "living costs" requirement and updated.  
   *Verify at:* <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/financial-support.html>

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date (e.g. `2026-03-15`) | `lastUpdated` | [OWNER TO FILL] | — self-attested, date you last cross-checked |
| Official source label + URL (1) | `officialSources[0]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html> |
| Official source label + URL (2, optional) | `officialSources[1]` | [OWNER TO FILL] | <https://www.canada.ca/en/employment-social-development/services/foreign-workers/international-students.html> |
| Official source label + URL (3, optional) — Designated Learning Institutions | `officialSources[2]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html> |

---

## Page body sections

### 1. Admission requirements (currently inline `requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum GPA / academic % for UG entry | `requirements[]` | [VERIFY] | Individual DLI websites |
| IELTS UG minimum band (overall + per-band) | `requirements[]` | [VERIFY] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/language-test.html> |
| IELTS PG minimum band (overall + per-band) | `requirements[]` | [VERIFY] | Same as above |
| PTE / TOEFL equivalencies (regular stream) | `requirements[]` | [VERIFY] | Same as above |
| SOP — current format / length guidance | `requirements[]` | [VERIFY] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html> |
| Police clearance certificate requirement | `requirements[]` | [VERIFY] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html> |
| Medical exam requirement / panel physician list | `requirements[]` | [VERIFY] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-temporary-residents.html> |

### 2. English proficiency — separate block (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Acceptable English tests (CELPIP, IELTS, PTE, TOEFL iBT, etc.) | `englishRequirements[]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/language-test.html> |
| Minimum per-test scores for UG entry | `englishRequirements[]` | [OWNER TO FILL] | Same as above |
| Minimum per-test scores for PG entry | `englishRequirements[]` | [OWNER TO FILL] | Same as above |

### 3. Costs — quick facts sidebar (currently `costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition range (UG / PG, CAD/yr) | `costs[0]` | [VERIFY] | <https://www.educanada.ca/study-plan-etudes/education-system-systeme-education/tuition-frais-scolaires.aspx?lang=eng> |
| IRCC living-costs figure (replaces old GIC line) | `costs[1]` | [OWNER TO FILL — REMOVE OLD GIC CAD 20,635 LINE] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/financial-support.html> |

### 4. Costs in NPR (new)
| Field | Prop | Status | Notes |
|---|---|---|---|
| Approximate 1-yr total (tuition + living) in NPR | `costsNPR[]` | [OWNER TO FILL] | Note exchange rate used (date + source: NRB or central bank) |
| Approximate visa + ancillary costs (medical, biometric, flights) in NPR | `costsNPR[]` | [OWNER TO FILL] | Itemise so student can cross-check |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| IRCC required minimum living cost / 12-month figure | `proofOfFunds[]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/financial-support.html> |
| Acceptable evidence (bank statement, loan sanction, sponsorship affidavit, etc.) | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |
| 6/12-month history requirement | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |

### 6. Visa process (currently `visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Remove "SDS or Non-SDS" wording; describe only **regular study permit** stream | `visaProcess[]` | [FIX — SDS closed Nov 2024] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html> |
| Biometric / medical steps and timing | `visaProcess[]` | [VERIFY] | Same as above |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Off-campus hours during term | `workRights[]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work.html> |
| Off-campus hours during breaks | `workRights[]` | [OWNER TO FILL] | Same as above |
| Post-Graduation Work Permit (PGWP) duration (UG / PG / PhD) | `workRights[]` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work-after-study.html> |
| PGWP eligibility caveats (DLIs, program length) | `workRights[]` | [OWNER TO FILL] | Same as above |

### 8. Typical processing time (sidebar, currently hardcoded "2 – 4 months")
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Current IRCC posted processing time (Nepal / India VAC) | `processingTime` | [OWNER TO FILL] | <https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html> |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Inadequate proof of funds | `commonRefusalReasons[]` | [OWNER TO FILL — expand list from counsellor experience + TRV refusal bulletins] |
| Weak / generic SOP (no genuine-temporary-resident intent) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Insufficient ties to Nepal | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Missing / inconsistent documentation | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Incomplete medical / biometrics | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| Vanier Canada Graduate Scholarships (PhD) | `scholarships[]` | [OWNER TO FILL] |
| Banting Postdoctoral Fellowships | `scholarships[]` | [OWNER TO FILL] |
| Ontario Graduate Scholarship (OGS) | `scholarships[]` | [OWNER TO FILL] |
| University-specific merit/entrance awards (list top 3–5 DLIs for Nepal cohort) | `scholarships[]` | [OWNER TO FILL] |
| IDAC / IDP partial awards | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| Course & DLI shortlisting aligned to Nepal pipeline | `ourRole[]` | [OWNER TO FILL — using company's actual service list] |
| SOP drafting + review | `ourRole[]` | [OWNER TO FILL] |
| Document authenticity & arrangement | `ourRole[]` | [OWNER TO FILL] |
| Visa form (IMM 1294 / 5709) review before lodgement | `ourRole[]` | [OWNER TO FILL] |
| Post-approval predeparture & airport pickup help | `ourRole[]` | [OWNER TO FILL] |

### 12. FAQ (currently `faqs[]`)
| Field | Prop | Status |
|---|---|---|
| Remove / rewrite SDS FAQ — SDS is closed | `faqs[0]` | [FIX — SDS closed Nov 2024] |
| Rewrite GIC FAQ — rename to "proof of funds"; update figure and rules | `faqs[2]` | [FIX — GIC amount revised] |
| Add "Can I apply without IELTS?" FAQ | `faqs[]` | [OWNER TO FILL (optional)] |
| Add "How long is PGWP?" FAQ | `faqs[]` | [OWNER TO FILL (optional)] |
