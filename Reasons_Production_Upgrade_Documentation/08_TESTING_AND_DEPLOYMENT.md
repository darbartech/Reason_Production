# Testing, CI/CD & Production Deployment

**Goal:** Make every production release reproducible, testable, observable and reversible.

## 1. Current project commands

From `package.json`:
- `npm run dev`
- `npm run build`
- `npm run images`
- `npm run og`
- `npm run lint`
- `npm run typecheck`
- `npm run serve`
- `npm run db:migrate`
- `npm run admin:create`
- `npm run dev:api`

There is no dedicated automated `test`, `test:e2e` or CI quality-gate script in the supplied package manifest. Add them deliberately.

## 2. Clean build reproducibility

The archive baseline describes static export (`output: "export"`), but no root `next.config.*` file was present in the inspected archive. Resolve this before release.

Required:
1. Confirm the intended `next.config` file.
2. Add it to version control and archive packaging.
3. Document required environment variables.
4. Run clean dependency install (`npm ci`).
5. Run image/brand/OG prebuild scripts.
6. Run lint and typecheck.
7. Run production build.
8. Verify output route files and assets.
9. Verify clean build from CI, not only from a developer machine.

Do not commit secrets or local `.env` files.

## 3. Suggested scripts

Add scripts only after selecting the test stack and confirming compatibility. Suggested names:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:a11y": "playwright test --grep @a11y",
  "check": "npm run lint && npm run typecheck && npm test"
}
```

Use Playwright for browser workflows and Vitest for unit tests. Add axe-core for automated accessibility checks. If existing lint script is incompatible with the installed Next version, correct the script rather than skipping lint.

## 4. Test pyramid

### Unit tests
- Zod validation.
- UTM normalization.
- Phone/email normalization.
- Date and currency formatting.
- Lead status transitions.
- Access-control helpers.
- Sitemap generation rules.

### Component tests
- Navbar open/close.
- Callback form validation.
- Enquiry step navigation.
- Error and success states.
- FAQ accordion.
- Mobile action bar.
- Consent-gated testimonials.

### Integration tests
- Enquiry POST and database insert.
- Duplicate/idempotency behavior.
- Turnstile success/failure.
- Admin login/session.
- CSRF-protected updates.
- Role restrictions.
- Database migrations.

### E2E tests
- Public landing → enquiry submit → success.
- Callback handoff → contact form prefill.
- Quiz handoff → contact form prefill.
- Admin login → lead list → detail → note/status update → logout.
- Direct access to protected admin page while signed out.
- 404 route behavior.

Use a dedicated test database and synthetic test data.

## 5. Public route matrix

At minimum:
- `/`
- `/about`
- `/services`
- `/study-abroad`
- `/ielts`
- `/eligibility`
- `/fees`
- `/countries`
- `/countries/uk`
- `/countries/canada`
- `/b2b`
- `/blog`
- `/blog/[known-slug]`
- `/faq`
- `/contact`
- `/privacy`
- `/terms`
- `/robots.txt`
- `/sitemap.xml`

Check HTTP status, page title, H1, canonical, metadata, internal links, image loading and console errors.

## 6. Responsive and accessibility matrix

Viewport widths:
`320, 360, 375, 390, 430, 768, 834, 1024, 1280, 1440, 1920, 2560`.

Target pages:
Home, contact, UK, Canada, IELTS, FAQ, blog article, eligibility, admin login and enquiry detail.

Run keyboard and screen-reader checks separately; screenshots cannot prove accessibility.

## 7. Deployment architecture

The supplied `server.js` serves static files from `out/` and handles API/admin routes in Express. This implies the production runtime must support both static serving and a persistent server process, unless the architecture is intentionally split.

Document one of these supported patterns:

### Option A — Combined Node deployment
- Build Next static export.
- Run Express server serving `out/` plus API/admin routes.
- Connect to managed PostgreSQL.
- Configure persistent secrets and health checks.

### Option B — Split deployment
- Deploy static frontend to a static host/CDN.
- Deploy Express API to a Node-capable service.
- Configure exact API base/proxy behavior.
- Configure CORS, cookies, CSRF and HTTPS across domains.
- Ensure admin pages are served securely and do not become public static files.

Do not assume Vercel static hosting can run this custom Express server. Verify the chosen platform’s runtime support and routing behavior.

## 8. Environment variable inventory

Create `.env.example` with names and safe placeholders only. Derive the exact list by searching all `process.env` references in the repository.

At minimum inspect:
- `NODE_ENV`
- `PORT`
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL` or equivalent DB variables
- `SESSION_SECRET`
- `ALLOWED_ORIGINS`
- `TRUST_PROXY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Turnstile secret key
- Analytics IDs, if enabled

For each variable document:
- Required in development/staging/production.
- Public or secret.
- Owning service.
- Rotation procedure.
- Safe example format.

Never expose server secrets through `NEXT_PUBLIC_*`.

## 9. Release pipeline

Suggested pipeline:
1. Pull request checks.
2. `npm ci`.
3. Lint.
4. Typecheck.
5. Unit tests.
6. Build.
7. E2E tests against staging.
8. Accessibility scan.
9. Dependency and secret scan.
10. Deploy staging.
11. Smoke tests.
12. Manual approval.
13. Production deploy.
14. Production smoke tests.
15. Monitor errors and lead creation.
16. Rollback if critical checks fail.

## 10. Smoke tests after deployment

- Homepage returns 200.
- Contact and all destination pages return 200.
- Missing URL returns 404.
- Sitemap/robots return valid content.
- Static assets load.
- API health check works.
- Valid synthetic enquiry creates one record.
- Invalid enquiry is rejected.
- Admin login works.
- Signed-out admin access is denied.
- Status update passes CSRF and authorization.
- Session persists across expected process lifecycle.
- No critical browser console/network error.

## 11. Database backup and rollback

Before migration:
- Confirm recent successful backup.
- Test restore in staging.
- Review migration SQL.
- Estimate lock/downtime.
- Confirm rollback or forward-fix plan.
- Run migration once through controlled deployment job.
- Verify schema and application compatibility.

Do not rely solely on provider backup badges; perform restore drills.

## 12. Monitoring

Track:
- HTTP 5xx rate.
- API latency.
- Enquiry submission success/failure.
- Database connectivity/pool exhaustion.
- Admin login failure spikes.
- CSP violations.
- Disk/storage and memory.
- Backup success.
- Certificate expiry.
- Uptime of critical routes.

Alert the responsible operator with actionable details and a runbook.

## 13. Acceptance criteria

- Clean build passes in CI.
- Test suite covers critical user journeys.
- Production host supports actual app topology.
- All route/status smoke tests pass.
- Database migration and restore procedures are tested.
- Secrets are configured in hosting secret manager.
- Monitoring and rollback are available.
- Production release has an evidence-backed sign-off.
