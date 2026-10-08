# New Zealand — Country Content Checklist

Route: `/countries/new-zealand`  
Component: `src/app/countries/new-zealand/page.tsx`

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — |
| Immigration New Zealand — Student Visa | `officialSources[0]` | [OWNER TO FILL] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fees-paying-student-visa> |
| Education New Zealand (ENZ) Nepal | `officialSources[1]` | [OWNER TO FILL] | <https://www.enzi.govt.nz/countries/nepal> |
| VFS Global New Zealand (Nepal) | `officialSources[2]` | [OWNER TO FILL] | <https://visa.vfsglobal.com/npl/en/nzl> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum UG / PG % / GPA | `requirements[]` | [VERIFY] | Individual NZ universities |
| IELTS minimum band (UG/PG overall + per-band) | `requirements[]` | [VERIFY] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fees-paying-student-visa> |
| PTE minimum band | `requirements[]` | [VERIFY] | Same as above |
| Financial evidence for living costs (annual figure) | `requirements[]` | [VERIFY — currently NZD 20,000] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/what-you-need-to-provide/evidence-funds-support-you> |
| SOP / study plan | `requirements[]` | [VERIFY] | Same as above |
| Medical & character certificates | `requirements[]` | [VERIFY] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/what-you-need-to-provide/medical-and-character-requirements> |

### 2. English proficiency (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tests accepted (IELTS, TOEFL iBT, PTE Academic, etc.) + bands | `englishRequirements[]` | [OWNER TO FILL] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fees-paying-student-visa> |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition range / year (UG vs PG) | `costs[0]` | [VERIFY] | <https://www.enz.govt.nz/study/fees-and-finances/cost-of-studying> |
| 12-month living cost figure (INZ requirement) | `costs[1]` | [VERIFY — currently NZD 20,000] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/what-you-need-to-provide/evidence-funds-support-you> |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + living + insurance) in NPR | `costsNPR[]` | [OWNER TO FILL — state FX source + date] |
| Visa fee + flights + medicals in NPR | `costsNPR[]` | [OWNER TO FILL] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Annual living cost INZ figure (× course duration) | `proofOfFunds[]` | [OWNER TO FILL] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/what-you-need-to-provide/evidence-funds-support-you> |
| Evidence types accepted (bank statement, loan, sponsorship undertaking form INZ 1025) | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |
| 6-month history requirement | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Offer of Place → fee payment → financial evidence → online app → medical → biometrics → decision | `visaProcess[]` | [VERIFY] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fees-paying-student-visa> |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Hours during term (20 hrs/wk) & breaks (full time) | `workRights[]` | [OWNER TO FILL] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fees-paying-student-visa> |
| Post-Study Work Visa (PSWV) durations — 1–3 yr based on qualification level and location (green list / regional rules) | `workRights[]` | [OWNER TO FILL] | <https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/post-study-work-visa> |

### 8. Typical processing time (sidebar)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Fee-Paying Student Visa — 50% / 75% / 90% processing times | `processingTime` | [OWNER TO FILL] | <https://www.immigration.govt.nz/about-us/processing-times> |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Insufficient / inconsistent financial evidence | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Genuine student criteria not met (weak SOP / ties) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Medical / character issues | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Fraudulent documents | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| New Zealand Scholarship (MFAT) | `scholarships[]` | [OWNER TO FILL] |
| University of Auckland / Otago / Victoria merit scholarships (Nepal cohort) | `scholarships[]` | [OWNER TO FILL — list top 3] |
| ENZ / institution specific grants | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| Course & institute shortlisting | `ourRole[]` | [OWNER TO FILL] |
| SOP drafting & review | `ourRole[]` | [OWNER TO FILL] |
| Offer chasing & fee-payment guidance | `ourRole[]` | [OWNER TO FILL] |
| RealMe / Immigration Online lodgement | `ourRole[]` | [OWNER TO FILL] |
| Pre-departure & airport help | `ourRole[]` | [OWNER TO FILL] |
