# Security & Backend Production Audit

**Scope:** Express API, PostgreSQL, admin authentication, static hosting, enquiry data and operational security.

## 1. Security posture

The archive includes useful security controls:
- Express disables `x-powered-by`.
- Security headers are added in `server.js`.
- Admin and enquiry routes are separated.
- Admin pages are served through `adminPages` before static assets.
- Authentication/session code is in `server/auth.js`.
- Rate limiting exists in `server/rate-limit.js`.
- Database access is in `server/db.js`.
- Enquiry validation is in server routes and shared validation modules.
- CSP is currently `Content-Security-Policy-Report-Only`.

These are positive foundations, but production security depends on correct environment configuration, hosting and tests.

## 2. P0 configuration checks

### Session secret
Inspect `server/auth.js`. The audit identified a random fallback for `SESSION_SECRET`. Production must require a persistent, high-entropy secret from the hosting secret manager. Do not silently generate a new secret at process startup.

Acceptance:
- App refuses to start in production if secret is missing or weak.
- Secret is not committed or logged.
- Rotation plan exists and expected session invalidation is understood.

### Allowed origins
The API uses `ALLOWED_ORIGINS` configuration. Configure exact production origins, including scheme and host. Do not use wildcard origin with credentials. Reject untrusted browser origins where applicable, but remember CORS/origin checks do not replace authentication or CSRF.

### Reverse proxy
`server.js` configures Express `trust proxy` only when `TRUST_PROXY` is set. Configure the exact proxy hop count or trusted proxy range for the actual host. Incorrect trust can make IP-based rate limiting and secure-cookie logic unreliable.

### Cookies and HTTPS
Verify:
- `Secure` in production.
- `HttpOnly`.
- Appropriate `SameSite`.
- Narrow cookie path/domain.
- Expiration and server-side session expiry.
- HSTS only when HTTPS is consistently enabled and all subdomains support it.

## 3. CSP

`server.js` currently sets `Content-Security-Policy-Report-Only`, allowing observation rather than enforcement.

Plan:
1. Collect reports in staging.
2. Inventory required script/style/image/font/frame/connect hosts.
3. Remove unnecessary inline scripts and broad wildcards where possible.
4. Use nonces/hashes where compatible.
5. Test forms, analytics, Turnstile, maps and embeds.
6. Enforce CSP in staging.
7. Monitor violations.
8. Promote to production after validation.

Do not switch directly to a restrictive CSP without testing; do not leave report-only as a permanent substitute for enforcement.

Also ensure the report endpoint is size-limited, rate-limited and does not log sensitive request bodies.

## 4. Rate limiting and abuse prevention

`server/rate-limit.js` should be reviewed for:
- Per-IP and per-route limits.
- Correct proxy-derived IP.
- Bounded memory.
- Expiration behavior.
- Shared storage if multiple app instances are deployed.
- Clear 429 responses and Retry-After.
- Protection against distributed spam.
- No accidental blocking of legitimate users behind shared NAT.

In-memory rate limiting is not consistent across multiple instances and resets on restart. Use a shared store if horizontal scaling is used.

## 5. Enquiry API

Review `server/enquiry-routes.js` and validation modules:
- Enforce a strict schema server-side.
- Reject unknown/oversized fields.
- Limit body size.
- Normalize phone/email fields.
- Escape or safely render user input in admin UI.
- Use parameterized SQL.
- Rate-limit.
- Verify Turnstile token server-side if enabled.
- Avoid returning internal errors.
- Add idempotency or duplicate handling.
- Add request IDs for support/debugging.
- Do not trust client timestamps/source attribution.

## 6. Admin authentication and authorization

Review `server/admin-routes.js`, `server/admin-pages.js` and `server/auth.js`.

Test:
- Login success/failure.
- Password hashing and verification.
- Rate limiting and lockout policy.
- Session creation and expiry.
- Logout invalidates session.
- CSRF validation for state-changing actions.
- Role checks for every privileged operation.
- Direct access to admin HTML without a session.
- IDOR: user A cannot read/update another record outside permitted scope.
- Session fixation prevention.
- Secure cookie flags.
- Password reset/rotation process if supported.
- Audit trail for exports, status changes and notes.

Hiding a button in the UI is not authorization. Every privileged API endpoint must enforce access on the server.

## 7. Database

Review:
- `server/db.js`
- `server/migrate.js`
- Migration files under `server/`

Requirements:
- TLS for remote database connections where supported.
- Least-privilege DB user.
- Parameterized queries.
- Connection pool limits and timeout.
- Statement/query timeouts.
- Migration backup and rollback strategy.
- Indexes for frequently queried lead fields.
- Foreign-key and uniqueness constraints.
- PII retention and deletion process.
- Automated backups and tested restore.
- Separate production/staging databases.
- No production data copied into development without anonymization.

Never run destructive migrations against production without reviewed SQL, backup and rollback plan.

## 8. Logging and privacy

Log:
- Request ID.
- Route and method.
- Status and latency.
- Error category.
- Authentication event outcome (without credentials).
- Admin audit events.

Never log:
- Passwords or password hashes.
- Session cookies or tokens.
- Full enquiry payload.
- Student documents.
- Secret environment variables.
- Full phone/email unless explicitly justified and access-controlled.

Use structured logs with retention and access restrictions. Define alerting for repeated login failures, elevated 5xx, database outages and form submission failures.

## 9. Security headers

Current `server.js` sets HSTS, nosniff, Referrer-Policy, Permissions-Policy and CSP Report-Only.

Validate:
- HSTS only on HTTPS deployment.
- CSP policy and report endpoint.
- `frame-ancestors` / anti-clickjacking protection.
- Referrer policy.
- Permissions policy.
- Cache-Control for admin and sensitive API responses.
- Content type and download behavior.

Consider a maintained security-header library if it materially reduces mistakes, but avoid unnecessary dependencies.

## 10. Dependency and supply-chain checks

- Run `npm audit` and review advisories rather than blindly applying breaking fixes.
- Update Next.js/React and dependencies through tested changes.
- Pin and lock dependency versions.
- Enable Dependabot/Renovate or equivalent.
- Scan secrets in repository history.
- Verify CI uses trusted actions and protected deployment secrets.
- Build from a clean lockfile install.

## 11. Incident readiness

Document:
- Who receives security alerts.
- How to disable compromised accounts.
- How to rotate session/API/database secrets.
- How to restore database backups.
- How to roll back a deployment.
- How to notify affected users if required.
- How long logs and backups are retained.

## 12. Acceptance criteria

- Production refuses unsafe missing secrets.
- Allowed origins and proxy trust are explicit.
- Cookies are secure.
- CSRF and authorization tests pass.
- Rate limiting works with actual deployment topology.
- CSP is tested and enforced according to approved policy.
- SQL access is parameterized and least privilege.
- Backup restore has been demonstrated.
- No secrets/PII leak into logs or client bundles.
- Security review findings are documented and resolved or accepted by owner.
