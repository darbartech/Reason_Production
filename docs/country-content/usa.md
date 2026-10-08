# USA — Country Content Checklist

Route: `/countries/usa`  
Component: `src/app/countries/usa/page.tsx`

## How to use this file

For every field below marked **[OWNER TO FILL]**, confirm the value against the official government source URL shown. Then paste the final value into the corresponding prop of `CountryPageTemplate` in the page file.

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — self-attested |
| Study in the States (SEVP / DHS) | `officialSources[0]` | [OWNER TO FILL] | <https://studyinthestates.dhs.gov/> |
| US Embassy Nepal — Student Visas | `officialSources[1]` | [OWNER TO FILL] | <https://np.usembassy.gov/visas/student-visa/> |
| Education USA Nepal | `officialSources[2]` | [OWNER TO FILL] | <https://educationusa.state.gov/centers/educationusa-kathmandu-us-embassy> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum GPA / % for UG | `requirements[]` | [VERIFY] | Individual university sites |
| IELTS / TOEFL / Duolingo minimum (UG) | `requirements[]` | [VERIFY] | <https://studyinthestates.dhs.gov/sevis-help-hub/student-records/general-school-requirements> |
| IELTS / TOEFL minimum (PG) | `requirements[]` | [VERIFY] | Individual university sites |
| SAT / ACT requirement (UG — test-optional list) | `requirements[]` | [VERIFY] | Individual university sites |
| GRE / GMAT (PG — waivers & minimums) | `requirements[]` | [VERIFY] | Individual university sites |
| SEVIS fee current amount (USD) | `requirements[]` | [VERIFY] | <https://studyinthestates.dhs.gov/sevp-i-901-sevis-fee> |
| DS-160 reference | `requirements[]` | [VERIFY] | <https://ceac.state.gov/GenNIV/> |

### 2. English proficiency (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tests accepted broadly (TOEFL iBT, IELTS Academic, Duolingo DET, PTE Academic) | `englishRequirements[]` | [OWNER TO FILL] | <https://www.ets.org/toefl.html> + <https://ielts.org/> |
| Typical UG minimum bands (per test) | `englishRequirements[]` | [OWNER TO FILL] | Average of top 20 schools Nepali students apply to |
| Typical PG minimum bands (per test) | `englishRequirements[]` | [OWNER TO FILL] | Same as above |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition range per year (public UG / private UG / PG) | `costs[0]` | [VERIFY] | <https://educationdata.org/average-cost-of-college> |
| Monthly living estimate (on / off campus) | `costs[1]` | [VERIFY] | <https://studyinthestates.dhs.gov/sevis-help-hub/student-records/financial-requirements> |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + living) in NPR, with exchange rate date | `costsNPR[]` | [OWNER TO FILL] |
| Visa (USD 185 SEVIS + MRV) + flights + insurance in NPR | `costsNPR[]` | [OWNER TO FILL] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum 1-yr financial evidence requirement | `proofOfFunds[]` | [OWNER TO FILL] | <https://studyinthestates.dhs.gov/sevis-help-hub/student-records/financial-requirements> |
| Acceptable evidence types (bank letter, loan sanction, fixed deposits, scholarship letters) | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |
| History requirement (e.g. 6 months) | `proofOfFunds[]` | [OWNER TO FILL] | US Embassy Nepal guidance |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| F-1 steps (I-20 → SEVIS → DS-160 → interview → approval) | `visaProcess[]` | [VERIFY] | <https://np.usembassy.gov/visas/student-visa/> |
| Interview waiver / dropbox eligibility for Nepal | `visaProcess[]` | [OWNER TO FILL] | <https://np.usembassy.gov/visas/visa-waiver-program/> |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| On-campus work hours (term / break) | `workRights[]` | [OWNER TO FILL] | <https://studyinthestates.dhs.gov/working-united-states> |
| CPT (Curricular Practical Training) rules | `workRights[]` | [OWNER TO FILL] | Same as above |
| OPT (Optional Practical Training) durations — UG/PG/STEM extension | `workRights[]` | [OWNER TO FILL] | <https://studyinthestates.dhs.gov/practical-training-opt-cpt-h4> |
| STEM OPT 24-month extension rule | `workRights[]` | [OWNER TO FILL] | Same as above |

### 8. Typical processing time (sidebar)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Visa interview wait time — Kathmandu (business days) | `processingTime` | [OWNER TO FILL] | <https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html> |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Section 214(b) — non-immigrant intent (ties to Nepal) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Insufficient / unsubstantiated finances | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Mismatch between SOP, academic record and course choice | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Missing SEVIS / I-20 documentation | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| Fulbright Foreign Student Program (Graduate) | `scholarships[]` | [OWNER TO FILL] |
| Hubert H. Humphrey Fellowship | `scholarships[]` | [OWNER TO FILL] |
| University merit scholarships (flag 3–5 favourites for Nepal cohort) | `scholarships[]` | [OWNER TO FILL] |
| Assistantships (TA / RA) and graduate tuition waivers | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| Shortlisting + deadline tracking | `ourRole[]` | [OWNER TO FILL] |
| SOP / Personal Statement drafting & review | `ourRole[]` | [OWNER TO FILL] |
| Interview prep (VOE + university interview) | `ourRole[]` | [OWNER TO FILL] |
| DS-160 + SEVIS fee guidance | `ourRole[]` | [OWNER TO FILL] |
| Pre-departure | `ourRole[]` | [OWNER TO FILL] |
