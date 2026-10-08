# UK — Country Content Checklist

Route: `/countries/uk`  
Component: `src/app/countries/uk/page.tsx`

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — |
| UK Student Visa (GOV.UK) | `officialSources[0]` | [OWNER TO FILL] | <https://www.gov.uk/student-visa> |
| British Council Nepal — Study UK | `officialSources[1]` | [OWNER TO FILL] | <https://www.britishcouncil.np/en> |
| VAC UK — Nepal (TLScontact) | `officialSources[2]` | [OWNER TO FILL] | <https://www.tlscontact.com/np/KTM/index.php> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum UG / PG academic % | `requirements[]` | [VERIFY] | UCAS + individual universities |
| IELTS minimum band (UG / PG overall + sub-band) | `requirements[]` | [VERIFY] | <https://www.ielts.org/for-organisations/recognition-list> |
| PTE UKVI minimum band | `requirements[]` | [VERIFY] | <https://www.pte.com/test-takers/pte-academic/ukvi> |
| CAS (Confirmation of Acceptance for Studies) | `requirements[]` | [VERIFY] | <https://www.gov.uk/student-visa/documents-you-must-provide> |
| TB test requirement (Nepal — approved clinics) | `requirements[]` | [VERIFY] | <https://www.gov.uk/government/publications/tuberculosis-test-for-a-uk-visa-clinics-in-nepal> |
| Financial evidence (living costs figure) | `requirements[]` | [VERIFY — currently says GBP 12,006] | <https://www.gov.uk/student-visa/money-you-need> |
| BRP collection | `requirements[]` | [VERIFY] | <https://www.gov.uk/biometric-residence-permits> |

### 2. English proficiency (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| SELT tests accepted (IELTS UKVI, PTE UKVI, etc.) | `englishRequirements[]` | [OWNER TO FILL] | <https://www.gov.uk/student-visa/knowledge-of-english> |
| Typical UG band (overall + each subskill) | `englishRequirements[]` | [OWNER TO FILL] | Average of top 20 schools Nepal cohort applies to |
| Typical PG band | `englishRequirements[]` | [OWNER TO FILL] | Same as above |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition per year (UG / PG range) | `costs[0]` | [VERIFY] | <https://www.gov.uk/student-finance-for-students-from-abroad> |
| Monthly living — London vs outside London (Home Office figures) | `costs[1]` | [VERIFY — currently says GBP 1,334/month London only] | <https://www.gov.uk/student-visa/money-you-need> |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + living) in NPR | `costsNPR[]` | [OWNER TO FILL — note exchange rate + date] |
| IHS + visa fee + TB test + flights in NPR | `costsNPR[]` | [OWNER TO FILL — list IHS rate per year] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Home Office monthly figure (London / outside London) × course months | `proofOfFunds[]` | [OWNER TO FILL] | <https://www.gov.uk/student-visa/money-you-need> |
| Evidence types accepted (bank statement, loan sanction letter, etc.) | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |
| 28-day rule + bank letter format | `proofOfFunds[]` | [OWNER TO FILL] | Same as above |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| CAS → IHS → online app → biometrics → decision → BRP steps | `visaProcess[]` | [VERIFY — still says "Tier 4" — rename to Student Visa] | <https://www.gov.uk/student-visa> |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Term-time hours (UG/PG) | `workRights[]` | [OWNER TO FILL] | <https://www.gov.uk/student-visa/working-while-you-study> |
| Full-time during vacations | `workRights[]` | [OWNER TO FILL] | Same as above |
| Graduate Route: 2 years (UG/PG) / 3 years (PhD) | `workRights[]` | [OWNER TO FILL] | <https://www.gov.uk/graduate-visa> |

### 8. Typical processing time (sidebar)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Standard Student Visa service (working days) + priority services fees | `processingTime` | [OWNER TO FILL] | <https://www.gov.uk/government/publications/average-visa-processing-times/average-visa-processing-times> |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Insufficient / incorrect bank history (28-day rule) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| False / forged documentation | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Course progression / credibility of study | `commonRefusalReasons[]` | [OWNER TO FILL] |
| TB test missing or from unapproved clinic | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| Chevening Scholarships (Masters, Nepal-eligible) | `scholarships[]` | [OWNER TO FILL] |
| Commonwealth Scholarships | `scholarships[]` | [OWNER TO FILL] |
| GREAT Scholarships (Nepal) | `scholarships[]` | [OWNER TO FILL] |
| University merit awards (top 3–5 UK schools Nepal students use) | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| UCAS / direct-app university applications | `ourRole[]` | [OWNER TO FILL] |
| SOP & LOR drafting/review | `ourRole[]` | [OWNER TO FILL] |
| CAS chasing & CAS checks | `ourRole[]` | [OWNER TO FILL] |
| UK online app (VFS/TLS) + document package | `ourRole[]` | [OWNER TO FILL] |
| Pre-departure & accommodation shortlist | `ourRole[]` | [OWNER TO FILL] |
