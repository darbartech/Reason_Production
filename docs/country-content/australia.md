# Australia — Country Content Checklist

Route: `/countries/australia`  
Component: `src/app/countries/australia/page.tsx`

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — |
| Subclass 500 Student Visa (Home Affairs) | `officialSources[0]` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500> |
| Study Australia (Gov) | `officialSources[1]` | [OWNER TO FILL] | <https://studyinaustralia.gov.au/> |
| VFS Global Australia (Nepal) | `officialSources[2]` | [OWNER TO FILL] | <https://visa.vfsglobal.com/npl/en/aus> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum UG / PG GPA | `requirements[]` | [VERIFY] | Individual CRICOS providers |
| IELTS UG/PG minimum band | `requirements[]` | [VERIFY] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/english-language> |
| PTE minimum band | `requirements[]` | [VERIFY] | Same as above |
| GTE statement (Genuine Temporary Entrant) | `requirements[]` | [VERIFY] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant-gte> |
| Financial capacity annual figure (living + tuition + family) | `requirements[]` | [VERIFY — page says AUD 24,505, confirm current] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/evidence-of-financial-capacity> |
| OSHC requirement (minimum coverage) | `requirements[]` | [VERIFY] | <https://www.health.gov.au/initiatives-and-programs/overseas-student-health-cover-oshc> |

### 2. English proficiency (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tests accepted (IELTS, PTE, TOEFL iBT, Cambridge C1, OET) + minimum bands | `englishRequirements[]` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/english-language> |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition range / year (UG vs PG) | `costs[0]` | [VERIFY] | <https://studyinaustralia.gov.au/en/Scholarships-Costs/Costs> |
| 12-month living cost figure (Home Affairs) | `costs[1]` | [VERIFY — currently AUD 24,505] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/evidence-of-financial-capacity> |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + OSHC + living) in NPR | `costsNPR[]` | [OWNER TO FILL — state FX source + date] |
| Visa (base charge + any subsequent entrant) + flights + insurance in NPR | `costsNPR[]` | [OWNER TO FILL] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| 12-month figure (student + dependants if any) | `proofOfFunds[]` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/evidence-of-financial-capacity> |
| Evidence types (bank statement, loan, Government sponsorship, etc.) | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |
| 3/6 month history requirement | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| CRICOS → GTE → CoE → OSHC → ImmiAccount lodgement → Biometrics (if requested) → decision | `visaProcess[]` | [VERIFY] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500> |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Work hours during term (48 hours/fortnight — current rule) | `workRights[]` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/work> |
| Unrestricted during scheduled breaks | `workRights[]` | [OWNER TO FILL] | Same as above |
| Subclass 485 Temporary Graduate Visa durations (Bachelor 2yr, Masters 2–3yr, PhD 4yr — per current list of eligible qualifications/regions) | `workRights[]` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485> |

### 8. Typical processing time (sidebar)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Subclass 500 — global (75% / 90% processing times) + Nepal offshore | `processingTime` | [OWNER TO FILL] | <https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times> |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| GTE criteria not met (weak ties / unclear study rationale) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Insufficient / inconsistent funds | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Missing OSHC / incomplete health checks | `commonRefusalReasons[]` | [OWNER TO FILL] |
| CoE / provider issues | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| Australia Awards Scholarships (DFAT) | `scholarships[]` | [OWNER TO FILL] |
| Destination Australia | `scholarships[]` | [OWNER TO FILL] |
| Research Training Program (RTP) — PhD/Masters by Research | `scholarships[]` | [OWNER TO FILL] |
| University-specific merit scholarships (top 3–5) | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| CRICOS course & provider shortlisting | `ourRole[]` | [OWNER TO FILL] |
| GTE drafting & review | `ourRole[]` | [OWNER TO FILL] |
| CoE & OSHC arrangement | `ourRole[]` | [OWNER TO FILL] |
| ImmiAccount lodgement + document compilation | `ourRole[]` | [OWNER TO FILL] |
| Pre-departure | `ourRole[]` | [OWNER TO FILL] |
