# Europe — Country Content Checklist

Route: `/countries/europe`  
Component: `src/app/countries/europe/page.tsx`

> **Note:** "Europe" is a multi-country aggregate page. Pick 3–5 anchor countries Nepal students commonly apply to (recommend: Germany, France, Netherlands, Italy, Ireland) and verify each bullet against the specific nation's official immigration authority. If you later split this into per-country pages, mirror this checklist for each.

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — |
| DAAD Germany — Study & Scholarships | `officialSources[0]` | [OWNER TO FILL — Germany anchor] | <https://www.daad.de/en/> |
| Campus France Nepal | `officialSources[1]` | [OWNER TO FILL — France anchor] | <https://nepal.campusfrance.org/> |
| Nuffic NESO Nepal (Netherlands / EU) | `officialSources[2]` | [OWNER TO FILL — Benelux anchor] | <https://www.nesonepal.org/> |
| Education in Ireland | `officialSources[3]` | [OWNER TO FILL — Ireland anchor] | <https://www.educationinireland.com/> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Academic minimum (UG / PG — per anchor country) | `requirements[]` | [VERIFY] | Per-country ministries |
| English proficiency (IELTS/PTE/TOEFL) minimums | `requirements[]` | [VERIFY] | Per-country NARIC / admissions |
| Language proficiency (German / French / Dutch / Italian) where required | `requirements[]` | [VERIFY] | Goethe / Campus France / Nuffic / Dante Alighieri |
| Financial proof approximate floor (EUR / country) | `requirements[]` | [VERIFY — currently says ~EUR 10,000+] | <https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/cost-of-living/> + per-country |
| Schengen Type D visa process + interview | `requirements[]` | [VERIFY] | <https://www.schengenvisainfo.com/type-d-visa/> + per-country VACs |
| Health insurance (EU-wide minimum) | `requirements[]` | [VERIFY — usually EUR 30k minimum coverage] | <https://ec.europa.eu/social/main.jsp?catId=885&langId=en> |
| TB test + police clearance | `requirements[]` | [VERIFY — varies by country] | Per-country embassy Nepal |

### 2. English proficiency (new)
| Field | Prop | Status |
|---|---|---|
| For English-taught programs: IELTS/PTE/TOEFL minimum ranges (UG/PG per anchor country) | `englishRequirements[]` | [OWNER TO FILL — split by DE/FR/NL/IE/IT] |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status |
|---|---|---|
| Tuition range / year (public-zero in DE/NOR, low in FR/IT, moderate NL/IE) | `costs[0]` | [VERIFY — currently EUR 5,000–25,000] |
| Monthly living (range across anchors) | `costs[1]` | [VERIFY — currently EUR 800–1,500] | Per-country official "blocked account" / living-cost figures |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + living + insurance) in NPR — show per anchor country or a single range | `costsNPR[]` | [OWNER TO FILL — note FX source + date] |
| Visa + blocked-account (where required — e.g. Germany €11,208 Sperrkonto) + flights in NPR | `costsNPR[]` | [OWNER TO FILL] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Germany Sperrkonto / blocked-account annual figure | `proofOfFunds[]` | [OWNER TO FILL] | <https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/financing/> |
| France "justificatif de ressources" annual figure | `proofOfFunds[]` | [OWNER TO FILL] | Campus France Nepal |
| Netherlands IND annual requirement | `proofOfFunds[]` | [OWNER TO FILL] | Nuffic NESO |
| Acceptable evidence (bank statement, loan, sponsorship, scholarship letters) | `proofOfFunds[]` | [OWNER TO FILL] | Per-country VACs |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status |
|---|---|---|
| University admissions → acceptance letter → proof of funds → health insurance → Type D / national visa application → VFS / embassy interview → biometrics → residence permit after arrival | `visaProcess[]` | [VERIFY — adapt wording so it clearly covers multiple national processes without inventing steps] |

### 7. Work rights (new)
| Field | Prop | Status |
|---|---|---|
| Germany: 120 full days / 240 half days / year; post-study 18 months | `workRights[]` | [OWNER TO FILL] |
| France: 964 hrs / year; post-study APS 12 months | `workRights[]` | [OWNER TO FILL] |
| Netherlands: 16 hrs/wk term + full time breaks; post-study 1 year Orientation Year | `workRights[]` | [OWNER TO FILL] |
| Ireland: 20 hrs/wk term; Third Level Graduate Scheme 24 months | `workRights[]` | [OWNER TO FILL] |
| Italy: 20 hrs/wk; post-study 6–12 months | `workRights[]` | [OWNER TO FILL] |

### 8. Typical processing time (sidebar)
| Field | Prop | Status |
|---|---|---|
| Show a range (e.g. "4 – 12 weeks") since Schengen processing varies per embassy in Nepal | `processingTime` | [OWNER TO FILL] | Per-country VAC Nepal (check current VFS timelines) |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Weak / non-genuine study plan / motivation letter | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Insufficient / un-sourced funds (esp. blocked-account Germany) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Missing APS / VPD / country-specific documentation | `commonRefusalReasons[]` | [OWNER TO FILL] |
| False or inconsistent documentation | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| DAAD Scholarships (Germany) | `scholarships[]` | [OWNER TO FILL] |
| Erasmus Mundus Joint Masters (EU-wide) | `scholarships[]` | [OWNER TO FILL] |
| Eiffel Excellence Scholarship (France) | `scholarships[]` | [OWNER TO FILL] |
| NFP / Nuffic scholarships (Netherlands) | `scholarships[]` | [OWNER TO FILL] |
| Government of Ireland / Irish Aid Fellowships | `scholarships[]` | [OWNER TO FILL] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| Country & course shortlisting per student profile | `ourRole[]` | [OWNER TO FILL] |
| Motivation / cover letter drafting & review (per-country templates) | `ourRole[]` | [OWNER TO FILL] |
| APS (Germany) / VPD process coordination | `ourRole[]` | [OWNER TO FILL] |
| VFS / embassy appointment scheduling & document review | `ourRole[]` | [OWNER TO FILL] |
| Blocked-account & health insurance arrangement | `ourRole[]` | [OWNER TO FILL] |
| Pre-departure & city arrival briefings | `ourRole[]` | [OWNER TO FILL] |
