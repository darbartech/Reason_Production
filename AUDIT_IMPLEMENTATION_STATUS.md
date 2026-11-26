# Audit Implementation Status — Phase 0

**Project:** Reasons Education / Reasons Education Consultancy
**Audit date:** 2 November 2026
**Scope:** Phase 0 repository and deployment reconciliation only.
**Mode:** Read-only. No application code, configuration, database or deployment was changed.
**Deliverable:** Facts, conflicts, blockers, route inventory and a safe implementation sequence.

---

## 1. Executive summary

The local repository contains a substantially upgraded Next.js static export with a working Express/PostgreSQL lead pipeline. TypeScript and ESLint pass, and the current export contains 32 HTML pages with 26 sitemap URLs.

However, **the live site is not serving the current source or export**:

- The live homepage is an older Next.js build (`buildId uUTF_ceE-QKbf47CAvD-P`).
- The current local export is `buildId Kv45yZXitHuJ7kwCxYoLA`.
- Every live sitemap route except `/` returns **404 at its extensionless URL**, while the same route with `.html` returns 200. Site navigation links to the extensionless URLs.
- `/blog` and `/countries` redirect to `/blog/` and `/countries/`, which both return 404.
- The live sitemap has 22 URLs dated 3 July 2026 and uses old blog slugs; the local sitemap has 26 URLs dated 2 November 2026.

This is a **P0 release blocker**. Until the hosting topology and clean-URL rewriting are confirmed, the current build must not be deployed and the live site should not be treated as evidence that the upgraded routes work.

The repository also has **133 uncommitted working-tree entries**. HEAD (`3d21465`, 8 October 2026) is not the source that produced the current `out/`. A clean clone is not currently reproducible.

**Decision:** Do not begin Phase 1 implementation until the owner confirms the deployment unit, approves the business-fact verification workflow, and authorises a staging deployment path.

---

## 2. Evidence and limitations

Evidence was gathered from:

- `git status`, `git log`, `git remote -v`.
- Source inspection of `next.config.mjs`, `server.js`, `server/*.js`, `src/lib/*`, `src/content/*`, `src/app/*`, `src/components/*`.
- The existing static export in `out/` (timestamp 2 November 2026, 10:56).
- HTTP requests to `https://reasons.edu.np/` and every URL in its live sitemap.
- `npm run typecheck` and `npm run lint`.
- The upgrade documentation in `Reasons_Production_Upgrade_Documentation/`.

Not performed in Phase 0:

- No production deployment.
- No database connection, query, migration or backup.
- No Lighthouse, axe, screen-reader or browser width-matrix run.
- No penetration test.
- No legal review of company facts, visa facts or asset rights.
- No fresh `npm run build` (to avoid overwriting the supplied export artifact).

No Lighthouse, WCAG, performance, security-certification or legal-compliance claim is made in this document.

---

## 3. Established repository facts

| Item | Fact | Evidence |
|---|---|---|
| Framework | Next.js 14.2.35, React 18, TypeScript, Tailwind 3 | `package.json` |
| Static export | Configured for production | `next.config.mjs:36-38` (`output: "export"`) |
| Local serving model | Express serves `out/`, maps extensionless URLs to `.html` | `server.js:65-70`, fallback at `server.js:74-84` |
| Backend | Express 5, PostgreSQL via `pg`, DB sessions, HMAC CSRF, scrypt | `server.js`, `server/auth.js`, `server/db.js` |
| Database setup | Re-runnable schema script; no rollback/down migration | `server/migrate.js` |
| CI | GitHub Actions runs install, typecheck, lint, build | `.github/workflows/ci.yml` |
| Unit/integration/E2E tests | None defined | `package.json` scripts |
| Current export | 32 HTML files, 26 sitemap URLs | `out/`, `out/sitemap.xml` |
| Local build ID | `Kv45yZXitHuJ7kwCxYoLA` | `out/*.html` |
| Live build ID | `uUTF_ceE-QKbf47CAvD-P` | `https://reasons.edu.np/` |
| Git HEAD | `3d21465c809abd3a626d468bad1c37f37302f067`, 8 Oct 2026 | `git log -1` |
| Working tree | 133 changed/renamed/deleted/untracked entries | `git status --porcelain` |
| Remote | `github.com/darbartech/Reason_Production.git`; `main` tracks `origin/main` | `git remote -v`, `git status -sb` |

### 3.1 Local route inventory

The export contains these public and operational HTML routes:

| Route | Source file in `out/` | Indexability | Notes |
|---|---|---|---|
| `/` | `index.html` | index | Canonical `https://reasons.edu.np` |
| `/about` | `about.html` | index | |
| `/services` | `services.html` | index | |
| `/study-abroad` | `study-abroad.html` | index | |
| `/ielts` | `ielts.html` | index | |
| `/eligibility` | `eligibility.html` | index | |
| `/fees` | `fees.html` | index | |
| `/countries` | `countries.html` | index | |
| `/countries/usa` | `countries/usa.html` | index | |
| `/countries/canada` | `countries/canada.html` | index | |
| `/countries/uk` | `countries/uk.html` | index | |
| `/countries/australia` | `countries/australia.html` | index | |
| `/countries/new-zealand` | `countries/new-zealand.html` | index | |
| `/countries/germany` | `countries/germany.html` | index | |
| `/countries/europe` | `countries/europe.html` | index | |
| `/countries/japan` | `countries/japan.html` | index | |
| `/b2b` | `b2b.html` | index | |
| `/blog` | `blog.html` | index | |
| `/blog/study-in-canada-from-nepal-2026` | `blog/study-in-canada-from-nepal-2026.html` | index | |
| `/blog/ielts-tips-for-a-higher-band-score` | `blog/ielts-tips-for-a-higher-band-score.html` | index | |
| `/blog/visa-sop-writing-guide-nepal` | `blog/visa-sop-writing-guide-nepal.html` | index | |
| `/faq` | `faq.html` | index | |
| `/contact` | `contact.html` | index | |
| `/privacy` | `privacy.html` | index | |
| `/terms` | `terms.html` | index | |
| `/lp/uk-september-2027` | `lp/uk-september-2027.html` | index | Approved landing page |
| `/stories` | `stories.html` | **noindex** | Correctly withheld: no testimonial has consent |
| `/admin` | `admin.html` | noindex/nofollow/nocache | Express-guarded only |
| `/admin/login` | `admin/login.html` | noindex/nofollow/nocache | Express-guarded only |
| `/admin/enquiries` | `admin/enquiries.html` | noindex/nofollow/nocache | Express-guarded only |
| `/admin/enquiries/<id>` | `admin/enquiries/_.html` | noindex/nofollow/nocache | Express rewrite only |
| `/404` | `404.html` | noindex | |

Local sitemap contains 26 URLs: 14 static public routes, 8 country routes, 3 blog posts and 1 approved landing page. `/stories` is correctly absent because it is noindex. Admin and 404 are correctly absent.

### 3.2 Local build quality baseline

| Command | Result |
|---|---|
| `npm run typecheck` | Pass, exit 0 |
| `npm run lint` | Pass, no warnings or errors |
| `npm run build` | Not re-run during Phase 0; existing export was generated at 10:56 on 2 November 2026 |

No test command exists to run. CI currently provides typecheck, lint and build only.

---

## 4. Deployment reconciliation — P0 evidence

### 4.1 Live vs local artifact

| Check | Result |
|---|---|
| Live homepage | HTTP 200, `Last-Modified: 7 Aug 2026` |
| Live server | LiteSpeed (static hosting layer) |
| Live build ID | `uUTF_ceE-QKbf47CAvD-P` |
| Local export build ID | `Kv45yZXitHuJ7kwCxYoLA` |
| Live sitemap | 22 URLs, lastmod 3 July 2026 |
| Local sitemap | 26 URLs, lastmod 2 November 2026 |
| Live blog slugs | Older slugs such as `/blog/how-to-study-in-canada-from-nepal-2026` and `/blog/top-5-ielts-tips-for-high-score` |
| Local blog slugs | `/blog/study-in-canada-from-nepal-2026` and `/blog/ielts-tips-for-a-higher-band-score` |

The live site is therefore **not** the current source or export.

### 4.2 Live route status

Every inner route was tested both extensionless and with `.html`:

| Route | Extensionless | `.html` |
|---|---:|---:|
| `/` | 200 | n/a |
| `/about` | **404** | 200 |
| `/contact` | **404** | 200 |
| `/services` | **404** | 200 |
| `/b2b` | **404** | 200 |
| `/study-abroad` | **404** | 200 |
| `/ielts` | **404** | 200 |
| `/faq` | **404** | 200 |
| `/blog` | **301 → `/blog/` → 404** | 200 |
| `/countries` | **301 → `/countries/` → 404** | 200 |
| `/privacy` | **404** | 200 |
| `/terms` | **404** | 200 |
| `/countries/usa` | **404** | 200 |
| `/countries/canada` | **404** | 200 |
| `/countries/uk` | **404** | 200 |
| `/countries/australia` | **404** | 200 |
| `/countries/new-zealand` | **404** | 200 |
| `/countries/europe` | **404** | 200 |
| `/countries/japan` | **404** | 200 |
| `/blog/how-to-study-in-canada-from-nepal-2026` | **404** | 200 |
| `/blog/top-5-ielts-tips-for-high-score` | **404** | 200 |
| `/blog/visa-sop-writing-guide-nepal` | **404** | 200 |

The live homepage navigation and sitemap use extensionless URLs. A normal visitor following those links reaches 404 pages. This is a production outage of all inner pages, not an SEO-only issue.

### 4.3 Likely cause and what must be confirmed

The local `server.js` deliberately maps `/about` to `about.html` via `express.static(..., { extensions: ['html'] })` and a fallback resolver. The live host is LiteSpeed and shows no evidence of that Node layer. The most likely explanation is that only the static `out/` directory was uploaded to a host without clean-URL rewrite rules.

This is a hypothesis, not a confirmed topology. The owner/host must confirm:

1. Is production intended to be Node + Express (`node server.js`) or static hosting only?
2. Is `/api/*` and `/admin/*` served by the same Node process, a separate service, or not deployed?
3. What is the actual document root, and does it include `admin.html`?
4. Which deployment artifact is authoritative: the repository `out/`, `Reason_Production.zip`, or a host-side build?
5. Who controls DNS, TLS, LiteSpeed rewrite rules and environment secrets?

Until these are answered, any deployment would risk either leaving inner pages broken or exposing admin shells on a static host.

---

## 5. Conflicts with the upgrade documentation

| Document statement | Current repository fact | Impact |
|---|---|---|
| Doc 00 says the archive did not contain a root `next.config.*` and asks whether static export is configured. | `next.config.mjs` exists and sets `output: "export"` in production (`next.config.mjs:36-38`). | The documentation is stale on this point. The config must be committed and preserved. |
| Doc 00 and `docs/baseline.md` describe an older baseline (single-size WebP, 33 routes, earlier content). | Current export has AVIF/WebP `srcset` via `Photo.tsx`, 32 HTML files and 26 sitemap URLs. | Do not treat baseline observations as current. Re-verify every finding. |
| The documentation treats live-site checks as inconclusive. | Live route failures are now confirmed with direct HTTP requests: inner extensionless routes return 404. | This is no longer an uncertain observation; it is a blocker. |
| The documentation assumes a reproducible build from the supplied source. | HEAD is 8 October 2026; 133 working-tree entries are uncommitted; the current export is newer and has a different build ID from live. | A clean clone cannot reproduce the reviewed output. Commit/review is required before deployment. |
| Phase numbering differs between the master table (Phases 0–6) and the execution prompt (Phases 0–9). | The execution prompt is more granular. | Use Doc 09 phase numbering for execution; use the master audit for release gates. |

---

## 6. Environment and configuration inventory

Only environment **key names** were inspected. Values were not printed or copied into this document.

### 6.1 Keys present in local `.env`

- `ALLOWED_ORIGINS`
- `COOKIE_SECURE`
- `DATABASE_SSL`
- `DATABASE_URL`
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- `PORT`
- `TRUST_PROXY`

### 6.2 Keys documented in `.env.example` but not observed in local `.env`

- `SESSION_SECRET`
- `NODE_ENV`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_SESSION_HOURS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `DATABASE_CA_CERT`

Consequences:

1. **No `SESSION_SECRET`:** `server/auth.js:11-15` falls back to a random per-boot secret and only logs a warning in production. Admin sessions/CSRF tokens do not survive a restart, and a misconfigured multi-instance deployment would fail unpredictably. This is a P0 configuration blocker.
2. **No Turnstile keys:** the public enquiry form has no CAPTCHA. It still has a honeypot, server-side validation, and an in-memory 5-per-15-minute limiter, but those are not equivalent to a bot challenge.
3. **No `NEXT_PUBLIC_SITE_URL`:** canonical/OG/sitemap URLs default to `https://reasons.edu.np` (`src/lib/company.ts:6`). That is correct for production but unsafe for staging: a staging build would emit production canonicals.
4. **`NODE_ENV` absent from `.env`:** Next sets it during build, but the Express runtime may not. Cookie `Secure` fallback and production logging/security branches depend on it. It must be set explicitly by the process manager.
5. **`DATABASE_CA_CERT` absent:** if `DATABASE_SSL=true` and no CA is supplied, `server/db.js` uses `rejectUnauthorized: false`. This permits a TLS connection without certificate verification. Acceptable only as a documented temporary compromise; verify the provider CA path.

### 6.3 Secret-handling observations

- `.env` is gitignored; only `.env.example` is tracked. No `.env` entry was found in the `Reason_Production.zip` listing.
- The zip is still sensitive because it includes source, `server/`, `out/` and admin HTML shells. It is gitignored and must not be posted publicly.
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is public by design. Confirm it is the intended public form key and that spam/abuse controls are configured in Web3Forms.
- No secret values were written to logs in the inspected code, but production error logging should be re-checked after deployment.

---

## 7. Security, backend and operations findings

### P0 — Release blockers

| # | Finding | Evidence | Why it blocks release |
|---|---|---|---|
| P0-1 | Live deployment does not serve extensionless routes; all inner pages 404. | Live HTTP checks in §4.2 | Core site unusable for visitors and search crawlers. |
| P0-2 | Deployed artifact/source parity unknown; live build differs from local export. | Build IDs in §4.1; 133 uncommitted entries | Cannot certify what is live or reproduce a rollback. |
| P0-3 | `SESSION_SECRET` is optional and only warns in production. | `server/auth.js:11-15` | Sessions/CSRF invalidated on restart; unsafe multi-instance behavior. |
| P0-4 | Hosting/API/DB/admin topology is not documented or confirmed. | `server.js`, live LiteSpeed behavior | Unknown whether forms, admin and DB actually work in production. |
| P0-5 | No verified database backup/restore procedure or migration rollback. | `server/migrate.js`; no runbook | Lead data loss is unrecoverable; destructive schema change risk. |
| P0-6 | Public business identity and licence/registration claims are unverified. | `src/lib/company.ts`; `src/app/about/page.tsx:83-86` | Legal/credibility risk; "Licensed and accountable" is displayed while licence and PAN fields are blank. |
| P0-7 | Current source is uncommitted; clean clone/build not demonstrated from HEAD. | `git status`; §3 | Review, rollback and deployment traceability are not possible. |

### P1 — High priority

| # | Finding | Evidence | Recommendation |
|---|---|---|---|
| P1-1 | CSP is report-only, with `unsafe-inline` for scripts and styles. | `server.js:27-30` | Review reports, remove inline dependencies where feasible, then enforce a tested policy. Do not enforce blind. |
| P1-2 | Rate limiting is in-memory and assumes one Node process. | `server/rate-limit.js` | Document single-instance deployment or use a shared store/reverse-proxy limit before scaling. |
| P1-3 | Admin pages exist in the static export; they are protected only by Express middleware. | `out/admin*.html`; `server/admin-pages.js`; `server.js:61-63` | Never upload `out/admin*` to a static-only host. If static hosting is chosen, exclude admin or put it behind host-level auth. |
| P1-4 | CSV export is not visibly audit-logged. | `server/admin-routes.js:305` | Record who exported leads and when; add retention guidance. |
| P1-5 | `/api/admin/meta` returns `allCounselors` to every signed-in user, including counselors. | `server/admin-routes.js:158-172` | Return only what each role needs, or confirm staff-directory exposure is acceptable. |
| P1-6 | Public enquiry form has no explicit privacy-consent checkbox. | `src/components/enquiry/EnquiryForm.tsx`; privacy page link only in contact copy | Obtain legal review; add a clear notice/consent record if required. Do not invent consent language without owner approval. |
| P1-7 | No automated tests for enquiry, auth, CSRF, admin or lead lifecycle. | `package.json`; CI workflow | Add focused integration/E2E tests before release; CI should gate on them. |
| P1-8 | No production monitoring, alerting, log retention or incident runbook. | repository | Establish before launch; lead loss and auth failures need alerting. |
| P1-9 | Unused 2.9 MB `public/hero-video.mp4` is copied into `out/`. | `public/hero-video.mp4`; `out/hero-video.mp4`; no source reference | Remove from deployment payload unless a designed, performance-budgeted use is approved. |

### P2 — Medium / follow-up

- `server/admin-routes.js:43` maps `stage: null`; the legacy stage column was dropped by migration. The field is dead API surface and should be removed only after confirming no client depends on it.
- HSTS is set unconditionally in `server.js:23`, including when TLS terminates elsewhere. Confirm the production scheme and proxy behavior before changing it.
- `server/db.js` has no visible statement/query timeout. Long queries can exhaust the pool; add timeouts during the security/operations phase.
- `src/components/CredentialsStrip.tsx` is not used by the current public pages. Confirm whether it is intentionally retained or should be removed to reduce dead code.
- The archived blank office photo `src-photos/office/office-entrance.jpg` is not used. Do not reintroduce it.
- Internal `.txt` RSC payload files are present in `out/`. They are generated by the export and generally harmless, but confirm the host does not expose unintended artifacts.

---

## 8. Content, trust and legal blockers

### 8.1 Business facts requiring owner evidence

The following are **source values, not verified facts**:

- Legal name: `Reasons Education Foundation`.
- Display name: `Reasons Education`.
- Address: Indreni Complex, New Baneshwor, Kathmandu 44600.
- Phone: `01-5316680`; WhatsApp: `9801085977`; email: `info@reasons.edu.np`.
- Hours: Sunday–Friday, 10:00–17:00.
- Established: 2015.
- Team names and roles (Rudesh Khadgi, Roji Barnawa, Rajesh Poudel, Anita Shrestha, Suman Thapa).
- IELTS price `Rs. 8,000` for 6 weeks; PTE `Rs. 10,000` for 4 weeks.
- Registration, licence number, PAN and social URLs are blank.

The owner must confirm every item before publication. Missing licence/PAN must remain unpublished; do not invent values. The About page currently uses the eyebrow **"Licensed and accountable"** while the licence is blank (`src/app/about/page.tsx:83-86`). This is a credibility/legal inconsistency and should be corrected in Phase 1/3 after owner input.

### 8.2 Time-sensitive and numeric claims

The site publishes specific figures and rules, including:

- Canada proof of funds CAD 23,448; UK £1,570/month in London from 30 November 2026; Australia AUD 29,710; New Zealand NZ$20,000; Germany €11,904 (`src/content/faq.ts`).
- Canada 24 hours/week and New Zealand 25 hours/week work limits.
- UK Graduate route 18 months from 1 January 2027, with a pending two-year policy for some universities.
- Country-specific costs, intakes and visa steps under `src/content/countryPages.ts`.
- IELTS/PTE prices under `src/content/pricing.ts`.

Each figure needs a dated official source and owner sign-off. Dates exist in some places (`LAST_CHECKED`, blog `checkedISO`), but the source-of-truth policy in Doc 00 is not yet implemented as a per-fact audit trail.

### 8.3 Testimonials and student outcomes

- All testimonial `consent` flags are `false` (`src/content/testimonials.ts`).
- `consentedTestimonials` is therefore empty and `/stories` is correctly noindexed.
- No testimonial is rendered publicly by `Testimonials.tsx`.
- Do **not** set consent to true without a signed form on file and owner confirmation. No student outcome should be added without evidence.

### 8.4 Trust content gaps

- Team biographies, qualifications, languages, specialisations and photos are absent.
- Registration/licence/PAN/social proof are blank.
- The About page says "advising Nepali students since 2015" and "Licensed and accountable"; both require evidence.
- The site has no public success-rate claim, which is correct. Do not add one without audited data.

---

## 9. SEO, analytics, performance and accessibility baseline

### 9.1 SEO

Positive findings:

- Canonical URLs are absolute and correct for the local export.
- Titles/descriptions are present on all public pages inspected.
- `/stories` is noindex while fewer than three consented stories exist.
- Admin pages are noindex/nofollow/nocache.
- Sitemap excludes noindex/admin pages and includes approved landing pages.
- JSON-LD exists for organization, website, breadcrumbs, articles and FAQ pages.
- Country pages include dated "last checked" content and official source links.

Risks:

- **Live canonical/sitemap mismatch:** production returns 404 for every canonical inner URL. Search engines cannot index the intended pages.
- **Stale live sitemap:** 22 URLs dated 3 July 2026, with old blog slugs.
- **Sitemap dates:** most static/country/landing URLs share one build-level `lastChecked` date. This is honest only if every page was actually checked on that date; otherwise it becomes a false freshness signal. Doc 00 requires per-page verification.
- **Duplicate URL forms:** locally, `/about` and `/about.html` can both return content. Canonicals point to the extensionless form, which is correct, but the host must not canonicalise the `.html` form.
- **Staging canonical leakage:** with `NEXT_PUBLIC_SITE_URL` unset, staging builds emit production canonicals.

### 9.2 Analytics and PII

- No public analytics, GA4, `gtag`, `dataLayer`, Meta pixel or ad tracker was found in `src/`.
- `src/app/privacy/page.tsx` says analytics/advertising tools are not used and will be disclosed before use. That matches the current code.
- UTM/source/referrer are captured in the enquiry form and stored with the lead for attribution. That is first-party lead data, not analytics PII.
- Callback handoff uses session storage, not URL parameters. This avoids putting name/phone in the address bar.
- No evidence that student PII is sent to an analytics provider. Preserve this invariant.

### 9.3 Performance

Not measured in Phase 0. Observations only:

- `Photo.tsx` emits AVIF/WebP `srcset` at 640/1200/1920 and lazy-loads by default.
- The hero uses a static photo, not the unused 2.9 MB video.
- `public/hero-video.mp4` is copied into `out/` and is unreferenced.
- Fonts are loaded through `next/font/google`.
- `<Script>` is used for Turnstile only when a site key is configured.

No LCP/INP/CLS claim is made. Phase 5 must measure the real deployed pages on the target widths and record field/lab evidence.

### 9.4 Accessibility

Not audited in Phase 0. Positive patterns observed:

- Skip link in `src/app/layout.tsx`.
- Form labels, `aria-invalid`, error summaries, `role="alert"`, focus management and a live step status.
- Progressbar semantics on the enquiry form.
- Buttons/links use visible focus styles in several components.
- Heading structure is generally hierarchical, but a full page-by-page check is still required.

No WCAG 2.2 AA conformance claim is made. Phase 6 must run axe/manual keyboard/screen-reader checks at the agreed widths.

---

## 10. Lead pipeline and admin baseline

### Public enquiry flow

`POST /api/enquiries` (`server/enquiry-routes.js`) implements:

- 20 KB JSON limit.
- 5 submissions per 15 minutes per IP (in-memory).
- Optional `ALLOWED_ORIGINS` check.
- Honeypot field.
- Optional Cloudflare Turnstile server verification.
- Whitelist validation against `server/constants.js`.
- 24-hour duplicate guard by phone + destination.
- Parameterised insert and a unique fingerprint fallback.
- Generic client errors; no PII in the response.
- `RECEIVED` event written with the lead.

### Admin flow

`/api/admin/*` (`server/admin-routes.js`) implements:

- Login rate limit, scrypt password verification, constant-ish timing for unknown emails.
- DB-backed sessions, HttpOnly/SameSite=Lax cookies, Secure in production or when configured.
- `requireAuth` and `requireCsrf` after login.
- Role scoping: admins see all; counselors see assigned + unassigned.
- Status/priority/assignment/follow-up updates with audit events.
- Notes capped at 5,000 characters.
- CSV export declared before `/:id`.

### Gaps requiring tests/evidence

- No automated test proves exactly one lead is created under retries, duplicate submissions or fingerprint collisions.
- No test proves CSRF rejection, session expiry, counselor scoping or admin-only assignment rules.
- No staging smoke test has been run against the current build.
- No evidence that production `/api/enquiries` and `/api/admin/*` are reachable at all. The live `/api/admin/auth/me` returns 404, which may mean the API is not deployed or is on a different host.
- No backup/restore test exists for `student_enquiries`, `enquiry_notes`, `enquiry_events`, `sessions` or `users`.

Until the lead lifecycle is exercised end-to-end in staging, the form must not be advertised as production-ready.

---

## 11. Prioritised blocker register

| Priority | Count | Items |
|---|---:|---|
| P0 | 7 | Live route outage; source/live parity; session secret; topology; backup/restore; business identity/licence; uncommitted source |
| P1 | 9 | CSP report-only; in-memory rate limit; admin static exposure; CSV audit; meta role leakage; consent record; no automated tests; monitoring; unused video |
| P2 | 5 | Dead `stage` field; HSTS/proxy review; DB query timeouts; unused CredentialsStrip; archive hygiene |

No P0 item can be closed by a copy or UI change alone. Each needs an owner decision or verified infrastructure evidence.

---

## 12. Safe implementation sequence (after Phase 0 approval)

### Gate 0 — Owner/infrastructure decisions

Before any code edit:

1. Confirm the production topology (Node/Express + PostgreSQL vs static-only).
2. Confirm the authoritative deployment artifact and document root.
3. Provide owner-approved business facts, licence/PAN, team bios, prices, social URLs and asset rights.
4. Provide access/confirmation for staging, database backup, DNS/TLS and environment secrets.
5. Approve the staging deployment path and a no-production-deploy rule.

**Stop if these are missing.** Do not guess or invent.

### Phase 1 — P0 production blockers

1. **Commit and tag the reviewed source.**
   - Review the 133 working-tree changes.
   - Commit the content transformation and visual pass to a review branch.
   - Record the commit hash and build ID in the release record.
   - Do not deploy from an uncommitted tree.

2. **Fix the deployment unit.**
   - If using Node: run `node server.js` behind the TLS proxy, with `TRUST_PROXY` and `X-Forwarded-Host` configured correctly.
   - If using static hosting: add host rewrite rules mapping extensionless paths to `.html` and `/blog`/`/countries` to their flat files; exclude `admin*` from the public document root.
   - Add a route-status test that asserts 200 for every sitemap URL and 404 for unknown paths.

3. **Enforce production configuration.**
   - Require a strong `SESSION_SECRET`; fail fast in production if absent or too short.
   - Set `NODE_ENV=production`, `COOKIE_SECURE=true`, exact `ALLOWED_ORIGINS`, and correct `TRUST_PROXY`.
   - Set `NEXT_PUBLIC_SITE_URL` per environment; never emit production canonicals from staging.
   - Configure Turnstile keys or explicitly accept the residual bot risk.

4. **Protect data.**
   - Verify database connectivity and SSL/CA behavior.
   - Take and restore-test a backup before any migration.
   - Add a rollback note for every schema change.
   - Do not run destructive migrations without explicit approval.

5. **Resolve identity/trust blockers.**
   - Replace the "Licensed and accountable" claim until licence evidence is on file.
   - Publish only owner-approved legal name, registration/licence/PAN, address, phone, email, hours, team and prices.
   - Keep testimonials at `consent: false` until signed evidence exists.
   - Add a documented per-fact source register for visa/fee claims.

6. **Verify the lead lifecycle in staging.**
   - Submit the public form; confirm exactly one lead and one `RECEIVED` event.
   - Test duplicate submission, validation failure, honeypot and rate limit.
   - Log in as admin and counselor; verify scoping, detail view, notes, status, priority, assignment, follow-up and CSV export.
   - Confirm no PII in logs, URLs or analytics.
   - Test session expiry, logout, CSRF rejection and production cookie flags.

7. **Asset and payload hygiene.**
   - Confirm rights for every photo/video used.
   - Remove the unused `hero-video.mp4` from the deployment payload unless a designed use is approved.
   - Keep the blank office photo out of the build.

### Phase 2 — Design and UX

Improve the existing components without changing brand direction:

- Navbar/mobile navigation and CTA hierarchy.
- Hero clarity and one primary action.
- Country and service page section rhythm.
- Responsive matrix at 360, 390, 430, 768, 834, 1024, 1280, 1440, 1920 and 2560 px.
- Remove duplicate card renderings and mismatched section openers identified in the baseline.

### Phase 3 — Content and trust

- Implement the owner-approved source-of-truth register.
- Rewrite/remove unverified licence, establishment and team claims.
- Add dated official sources for every numeric country/visa claim.
- Publish testimonials only with signed consent.
- Add clear privacy/consent handling to the enquiry form after legal review.

### Phase 4 — SEO and local SEO

- Align canonical, sitemap and live routes; verify 200s after the deployment fix.
- Replace shared build-date `lastModified` with per-page verification dates.
- Validate JSON-LD against the live rendered pages.
- Align Google Business Profile, address, phone and hours with the site once owner-approved.
- Submit the corrected sitemap only after route status is clean.

### Phase 5 — Performance

- Measure LCP/INP/CLS on `/`, `/countries/canada`, `/ielts`, `/contact` at 360/768/1440.
- Tune the hero image priority/size, fonts and third-party scripts.
- Record before/after evidence; do not claim success without measurements.

### Phase 6 — Accessibility

- Run axe on the same routes and widths.
- Manual keyboard, focus-visible, heading-order, form-error, contrast and screen-reader checks.
- Verify WCAG 2.2 AA target size, focus not obscured, redundant entry and accessible authentication.
- Document exceptions with owner approval.

### Phase 7 — Leads and analytics

- Keep first-party lead attribution; do not send PII to analytics.
- If analytics is added, implement consent-aware loading and update the privacy page before activation.
- Add conversion events that contain no student PII.
- Verify CSV export audit logging and retention.

### Phase 8 — Security and operations

- Enforce CSP after a report-only observation period.
- Add query timeouts, structured error logging and secret rotation.
- Add monitoring/alerting for form failures, login failures, DB errors and certificate expiry.
- Decide shared rate limiting if the deployment scales beyond one process.
- Complete backup/restore, incident-response and rollback runbooks.

### Phase 9 — Testing and release

- Add integration tests for the enquiry API and admin API.
- Add E2E tests for the public form and admin login/lead flow.
- Add route-status and sitemap/canonical tests to CI.
- Run typecheck, lint, build, tests, Lighthouse and axe.
- Produce `TEST_RESULTS.md`, `CHANGELOG_PRODUCTION_UPGRADE.md`, `OPEN_BLOCKERS.md` and `DEPLOYMENT_RUNBOOK.md`.
- Deploy only with explicit approval and a verified rollback artifact.

---

## 13. Owner inputs required

Please provide or confirm:

1. **Hosting topology:** Node/Express process? Static-only? Both? Who manages LiteSpeed/DNS/TLS?
2. **Authoritative artifact:** repository, `out/`, or `Reason_Production.zip`?
3. **Database:** provider, backup policy, restore procedure, retention, who has access.
4. **Secrets:** where `SESSION_SECRET`, `DATABASE_URL`, `ALLOWED_ORIGINS`, `TRUST_PROXY`, `COOKIE_SECURE` and Turnstile keys are managed.
5. **Legal identity:** legal name, trading name, registration authority/number, PAN/VAT, consultancy licence authority/number/validity.
6. **Public contact facts:** address, phone, WhatsApp, email, hours, map link, social URLs.
7. **Team:** names, roles, qualifications, languages, bios and photo rights.
8. **Prices:** IELTS/PTE fees, validity dates and what is included.
9. **Visa/fee facts:** owner-approved sources and review dates for every numeric claim.
10. **Testimonials:** signed consent forms and permission to publish names/photos/outcomes.
11. **Assets:** licences/releases for every photo, logo and video; confirmation that the blank office photo is discarded.
12. **Analytics decision:** none, GA4, or another tool; consent model and retention.
13. **Turnstile:** site/secret keys and intended enforcement.
14. **Staging:** URL, access method and approval to run an end-to-end lead test.
15. **Release approval:** who signs off, and the rollback window.

---

## 14. Stop conditions currently active

Per Doc 09, the following stop conditions apply:

- Hosting topology is unclear.
- Legal/company facts and licence/registration are unverified.
- Database backup/restore is unverified.
- A production deployment would be requested without approval/access.
- Third-party credentials (Turnstile, database, hosting) are absent or unconfirmed.

No Phase 1 code changes should begin until these are resolved or explicitly deferred with owner approval.

---

## 15. Commands and evidence used

| Command / check | Result |
|---|---|
| `git log -1` | HEAD `3d21465`, 8 Oct 2026 |
| `git status --porcelain` | 133 changed/renamed/deleted/untracked entries |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, no warnings/errors |
| `find out -name "*.html"` | 32 HTML routes |
| `grep "<loc>" out/sitemap.xml` | 26 URLs |
| `curl` live sitemap routes | 1 × 200, 19 × 404, 2 × 301-to-404 |
| `curl` live `.html` routes | 200 for inner pages |
| Local export build ID | `Kv45yZXitHuJ7kwCxYoLA` |
| Live build ID | `uUTF_ceE-QKbf47CAvD-P` |

---

## 16. Phase 0 conclusion

Phase 0 is complete for the evidence available.

The local upgrade is a credible foundation, but production is currently serving a stale build with broken inner routes. The next action is **not** another visual/content pass. It is an owner/infrastructure decision on deployment topology and business-fact sign-off, followed by the P0 fixes in Phase 1.

No code was edited, no database was touched and no deployment was performed during this audit.
