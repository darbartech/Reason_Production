# Reasons Education — Master Production Audit & Upgrade Plan

**Project:** Reasons Education / Reasons Education Consultancy  
**Audit baseline:** 2 November 2026  
**Source reviewed:** `Reason_Production.zip` (Next.js application, Express API, PostgreSQL integration, static export in `out/`)  
**Purpose:** A controlled, evidence-led upgrade plan for production readiness.  
**Status:** Implementation specification — not a claim that all tests have already passed.

---

## 1. Executive decision

The project has a useful foundation: Next.js 14, React 18, TypeScript, reusable page components, a static export, an Express API, PostgreSQL-backed enquiry/admin functionality, metadata helpers, and consent-gated testimonials.

**Recommendation: do not treat the supplied archive as automatically production-approved.** First reconcile the live deployment with the source/build supplied, verify the public business identity and all claims, confirm the actual hosting topology, and execute the release gates in this document.

The earlier inspection found a mismatch between the live public site and the supplied source/export. The live site appeared to show older copy and claims that are not aligned with the supplied content controls. The live `/contact` route also returned an error to the inspection method at the time. These observations must be re-tested from a normal browser and HTTP client before making a final diagnosis; a crawler response alone is not proof that a route is broken for all users.

### Release blockers (P0)

1. Establish which source commit and build are actually deployed.
2. Verify `/`, `/contact`, country pages, blog pages, sitemap and robots endpoints in production.
3. Confirm legal entity, trading name, office address, phone, email, licence/registration and all numerical marketing claims.
4. Set and validate production secrets, allowed origins, proxy trust and cookie settings.
5. Confirm static frontend and Express API deployment architecture, database connectivity and session persistence.
6. Verify image, font, video and testimonial permissions.
7. Test the full lead lifecycle from public form to database to admin follow-up.
8. Establish backup, restore, logging and incident-response procedures.

## 2. Evidence and limitations

This audit is based on source-code and archive inspection plus a limited live-site check. It is not a full browser QA, penetration test, legal review, Lighthouse run, field Core Web Vitals report, or WCAG conformance certification.

Known inspected files include:

- `package.json`
- `server.js`
- `src/lib/company.ts`
- `src/lib/seo.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/components/Hero.tsx`
- `src/components/Photo.tsx`
- `src/components/enquiry/EnquiryForm.tsx`
- `src/content/team.ts`
- `src/content/testimonials.ts`
- `docs/baseline.md`
- `server/` implementation files
- generated `out/` export

The supplied `docs/baseline.md` is dated 1 November 2026 and records that Lighthouse/axe results were not captured. Its earlier observations must not be assumed to describe the 2 November archive without rechecking. In particular, the current `Photo.tsx` has AVIF/WebP sources and responsive widths, unlike the older baseline statement that imagery was single-size WebP.

## 3. Architecture inventory

### Frontend
- Next.js `14.2.35`, React `18`, TypeScript.
- App Router pages under `src/app/`.
- Reusable public components under `src/components/`.
- Content modules under `src/content/`.
- SEO helper at `src/lib/seo.ts`.
- Image build pipeline in `scripts/build-images.mjs`.
- Static export output supplied in `out/`.

### Backend
- Express 5 in `server.js`.
- API routes in `server/enquiry-routes.js` and `server/admin-routes.js`.
- Admin HTML/page handling in `server/admin-pages.js`.
- Database code and migrations in `server/db.js`, `server/migrate.js`.
- Authentication in `server/auth.js`.
- Rate limiting in `server/rate-limit.js`.

### Build scripts
`package.json` defines `dev`, `build`, `images`, `og`, `lint`, `typecheck`, `serve`, `db:migrate`, `admin:create`, and `dev:api`. It does not define dedicated automated unit, integration or E2E test scripts.

### Important configuration question
The archive inspected did not contain a root `next.config.*` file, although the project baseline describes `output: "export"` configuration. Verify whether this file is omitted from the archive, generated elsewhere, or absent from the actual clean checkout. A clean clone must be able to reproduce the build from documented files alone.

## 4. Scorecard (preliminary)

These are engineering review estimates, not measured laboratory scores.

| Area | Preliminary score | Main concern |
|---|---:|---|
| Design / brand | 8/10 | Improve consistency, real proof and mobile hierarchy |
| UX / navigation | 7.5/10 | Reduce competing CTAs and validate mobile journey |
| Content / trust | 7/10 | Verify identity, credentials, claims and country facts |
| Technical SEO | 8/10 | Good foundations; fix dates and validate deployment |
| Local SEO | 5.5/10 | Incomplete public business identity and local proof |
| Performance | 6.5/10 | Measure real pages; optimize hero/media/third parties |
| Accessibility | 7/10 | Good baseline patterns; manual/automated audit needed |
| Lead conversion | 7/10 | Strong form foundation; privacy and attribution gaps |
| Security | 7/10 | Production configuration and operational checks remain |
| Deployment readiness | 5/10 | Source/live parity and runtime topology unresolved |

Do not publish these numbers as independent certification or benchmark results.

## 5. Source-of-truth policy

Create one owner-approved source for every business fact. At minimum:

- Legal entity name and trading name.
- Registered office and public office address.
- Registration authority and number.
- PAN/VAT if applicable and approved for publication.
- Consultancy licence authority, number, validity and scope.
- Main phone, WhatsApp, email and hours.
- Social media URLs.
- Team names, roles, qualifications and biographies.
- Student outcomes and written consent.
- Course/service availability and prices.
- Country-specific immigration and education facts.

The current `src/lib/company.ts` contains:
- Legal name: `Reasons Education Foundation`
- Display name: `Reasons Education`
- Address: `Indreni Complex, New Baneshwor`, Kathmandu
- Phone: `01-5316680`
- WhatsApp: `9801085977`
- Email: `info@reasons.edu.np`
- Hours: Sun–Fri, 10 AM–5 PM
- Established: 2015
- Registration, licence and social fields are blank.

These are source values, not independently verified facts. The business owner must confirm them before publication. Do not invent missing licence, registration or tax details.

## 6. Priority definitions

- **P0 — Release blocker:** security, legal/credibility, broken critical route, lead loss, data loss, or deployment integrity.
- **P1 — High:** materially affects trust, conversions, discoverability or usability.
- **P2 — Medium:** quality improvement with manageable workaround.
- **P3 — Later:** optional enhancement.

## 7. Implementation sequence

| Phase | Scope | Exit condition |
|---|---|---|
| 0 | Source/deployment reconciliation | Deployed commit and artifact are known and reproducible |
| 1 | P0 blockers | Identity, routes, secrets, API, DB and lead journey verified |
| 2 | Design / UX | Approved responsive design and accessible components |
| 3 | Content / trust | All claims and facts approved with evidence |
| 4 | SEO / local SEO | Crawlable pages, canonical, sitemap, schema and local profile aligned |
| 5 | Performance / accessibility | Lab and manual tests meet release thresholds |
| 6 | Security / tests / operations | CI, backups, monitoring, recovery and release sign-off |

Do not begin with a wholesale redesign. Preserve working architecture and improve the smallest responsible surface.

## 8. Global engineering rules

1. Inspect the current implementation before editing. Do not assume the older baseline is current.
2. Preserve existing routes, data contracts, admin workflows and content unless a change is explicitly approved.
3. Do not remove security checks to make a test pass.
4. Never invent business facts, student outcomes, fees, visa rules, licence numbers or testimonials.
5. Do not expose PII in analytics, URLs, logs or error messages.
6. Keep secrets server-side; `NEXT_PUBLIC_*` values are public by design.
7. Make changes small, testable and reversible.
8. Add or update tests for every behavior changed.
9. Avoid introducing a new library when the existing stack can solve the problem safely.
10. Record migration, rollback and deployment instructions.

## 9. Definition of done

A release can be approved only when:

- The production commit is traceable to the reviewed source.
- A clean install and production build pass.
- All required public routes return correct status codes and canonical URLs.
- Forms create exactly one valid lead and show a clear success/error state.
- Admin authentication, authorization, CSRF and session expiry are tested.
- No secrets or student PII are exposed in client bundles, analytics or logs.
- Database backup and restore have been tested.
- Lighthouse and field performance are measured, not guessed.
- WCAG 2.2 AA checks have automated and manual evidence; known exceptions are documented.
- Country, fee, visa, licence and testimonial content has owner approval.
- Monitoring, incident contacts and rollback are ready.

## 10. Release sign-off record

Complete this table at release time:

| Sign-off | Owner | Evidence / link | Status |
|---|---|---|---|
| Business/legal facts | Business owner | Approved fact sheet | Pending |
| Content / country facts | Content reviewer | Sources and review dates | Pending |
| Engineering | Technical lead | CI build and test report | Pending |
| Security | Technical lead | Security checklist / scan | Pending |
| Accessibility | QA reviewer | axe + manual results | Pending |
| SEO | SEO owner | Crawl + Search Console | Pending |
| Operations | Hosting owner | Backup/restore + monitoring | Pending |

---

**Instruction to implementers:** Read this master file first, then execute the specialist documents in dependency order. Do not mark an item complete merely because code was changed; attach test evidence.
