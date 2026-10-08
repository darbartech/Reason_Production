# Japan — Country Content Checklist

Route: `/countries/japan`  
Component: `src/app/countries/japan/page.tsx`

---

## Metadata bar

| Field | Prop | Status | Official URL to verify against |
|---|---|---|---|
| Content last-updated date | `lastUpdated` | [OWNER TO FILL] | — |
| Immigration Services Agency (ISA) Japan — Student Visa | `officialSources[0]` | [OWNER TO FILL] | <https://www.moj.go.jp/isa/applications/procedures/nyuukoku_zairyuu02.html> |
| JASSO — Study in Japan | `officialSources[1]` | [OWNER TO FILL] | <https://www.jasso.go.jp/en/> |
| Embassy of Japan in Nepal — Visa Info | `officialSources[2]` | [OWNER TO FILL] | <https://www.np.emb-japan.go.jp/itprtop_en/index.html> |

---

## Page body sections

### 1. Admission requirements (`requirements[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum academic % / GPA | `requirements[]` | [VERIFY] | Individual Japanese schools |
| Japanese language proficiency (JLPT / NAT / J-TEST levels by program — language school vs UG vs PG) | `requirements[]` | [VERIFY — currently N5/N4/N3] | <https://www.jlpt.jp/e/> |
| EJU scores for direct UG entry (for Nepali pathway) | `requirements[]` | [VERIFY] | <https://www.jasso.go.jp/en/eju/index.html> |
| JLPT / NAT / J-TEST for some programs | `requirements[]` | [VERIFY] | Same as above |
| COE (Certificate of Eligibility) from MOJ via school | `requirements[]` | [VERIFY] | <https://www.moj.go.jp/isa/applications/procedures/zairyuu04.html> |
| Financial capacity monthly / annual figure | `requirements[]` | [VERIFY — currently JPY 150,000/mo] | <https://www.moj.go.jp/isa/applications/procedures/nyuukoku_zairyuu02.html> |
| Passport + photos + BRP-style "Residence Card" at port of entry | `requirements[]` | [VERIFY] | ISA Japan |

### 2. English proficiency (new)
| Field | Prop | Status |
|---|---|---|
| For G30 / English-taught UG/PG programs: TOEFL iBT / IELTS minimum ranges per top university | `englishRequirements[]` | [OWNER TO FILL] |
| For regular Japanese-taught programs: JLPT/NAT minimum levels | `englishRequirements[]` | [OWNER TO FILL] |

### 3. Costs sidebar (`costs[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Tuition range / year (language school → national UG → private UG/PG) | `costs[0]` | [VERIFY — currently JPY 500k–1.2M] | <https://www.jasso.go.jp/en/study_j/expense.html> |
| Monthly living (JASSO average) | `costs[1]` | [VERIFY — currently JPY 150,000] | Same as above |

### 4. Costs in NPR (new)
| Field | Prop | Status |
|---|---|---|
| 1-yr total (tuition + living + NHI) in NPR | `costsNPR[]` | [OWNER TO FILL — state FX source + date] |
| Visa fee + flights + placement fee (if any) in NPR | `costsNPR[]` | [OWNER TO FILL] |

### 5. Proof of funds (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Minimum annual financial evidence (JPY figure) per MOJ guidance | `proofOfFunds[]` | [OWNER TO FILL] | <https://www.moj.go.jp/isa/applications/procedures/nyuukoku_zairyuu02.html> |
| Evidence types (bank statement, remittance plan, scholarship letters, sponsor affidavit) | `proofOfFunds[]` | [OWNER TO FILL] | Embassy of Japan Nepal |
| 3/6 month history requirement | `proofOfFunds[]` | [OWNER TO FILL] | Embassy of Japan Nepal |

### 6. Visa process (`visaProcess[]`)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| School selection → application to school → COE request via school to MOJ → COE issuance → student visa application (VFS or embassy) → landing → Residence Card at airport | `visaProcess[]` | [VERIFY] | <https://www.moj.go.jp/isa/applications/procedures/nyuukoku_zairyuu02.html> |

### 7. Work rights (new)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| Term-time: 28 hrs/wk (max 40 hrs/wk during semester breaks, with permission) | `workRights[]` | [OWNER TO FILL] | <https://www.moj.go.jp/isa/applications/procedures/16-1.html> |
| Designated activities permission (post-grad job-search) — current duration & extension rules | `workRights[]` | [OWNER TO FILL] | ISA Japan |
| Specific Skilled Labor (i / ii) pathways post-study | `workRights[]` | [OWNER TO FILL] | ISA Japan |

### 8. Typical processing time (sidebar)
| Field | Prop | Status | Official URL |
|---|---|---|---|
| COE + embassy visa combined timeline from Nepal | `processingTime` | [OWNER TO FILL] | <https://www.moj.go.jp/isa/applications/results/index.html> (COE) + Embassy Nepal for visa step |

### 9. Common refusal reasons (new)
| Field | Prop | Status |
|---|---|---|
| Financial / remittance plan inconsistent or unproven | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Language ability mismatch with stated program (e.g. no JLPT for a JLPT-required course) | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Fake / altered certificates | `commonRefusalReasons[]` | [OWNER TO FILL] |
| Weak "purpose of study" essay | `commonRefusalReasons[]` | [OWNER TO FILL] |

### 10. Scholarships (new)
| Field | Prop | Status |
|---|---|---|
| MEXT (Monbukagakusho) Scholarship — Undergraduate / Research / Teacher Training | `scholarships[]` | [OWNER TO FILL] |
| JASSO (Honors Scholarship for Privately Financed International Students) | `scholarships[]` | [OWNER TO FILL] |
| Japanese Government (Monbukagakusho) via Embassy Nepal Recommendation | `scholarships[]` | [OWNER TO FILL] |
| University-specific merit & tuition-exemption programs (Waseda, Keio, Todai, etc.) | `scholarships[]` | [OWNER TO FILL — list 3–5] |

### 11. Our role (new)
| Field | Prop | Status |
|---|---|---|
| Language school / university placement (appropriate tier per student profile) | `ourRole[]` | [OWNER TO FILL] |
| Study plan / RPL (reason for applying) essay drafting & review (Japanese format) | `ourRole[]` | [OWNER TO FILL] |
| COE document collation & liaison with Japanese school | `ourRole[]` | [OWNER TO FILL] |
| Embassy / VFS visa lodgement & document review | `ourRole[]` | [OWNER TO FILL] |
| Airport pickup & hostel / dorm shortlisting | `ourRole[]` | [OWNER TO FILL] |
