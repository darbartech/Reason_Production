# 08 — Deployment runbook (Vercel, single Next.js process)

The site and its API are one Next.js app. There is no Express process, no port 8000, and no
static-export step: pages that read no request-time data are prerendered at build, the admin
pages and `/api/*` are rendered per request.

## Local

```
npm install
npm run dev     # http://localhost:3000 — serves pages and /api in the same process
```

`.env` is loaded by Next for the app and by `scripts/db-tool.mjs` for the CLI scripts.

## Build

```
npm run build
```

`prebuild` regenerates brand assets, photos and OG images first. `sharp` is a devDependency and
must be installed at build time; do not prune dev dependencies before building.

Verified route classes from the last `npm run build`:
- static / SSG: the 22 public pages, `/blog/[slug]`, `/lp/[slug]`, `/robots.txt`, `/sitemap.xml`
- dynamic (`ƒ`): `/admin`, `/admin/enquiries`, `/admin/enquiries/[id]`, `/admin/users`,
  `/admin/login`, `/healthz`, `/csp-report` and every `/api/*` route

## Vercel

Framework preset: Next.js. Build command `npm run build`, start command left to the platform.
No `vercel.json` is required — `output: export` was removed, so the app deploys as a standard
Next.js server.

### Environment

| Variable | Value on Vercel |
|---|---|
| `DATABASE_URL` | transaction-pooler URL, port **6543** — see below |
| `DATABASE_SSL` | `true` |
| `DATABASE_CA_CERT` | provider CA if the pooler host is not on a trusted path |
| `SESSION_SECRET` | required, stable (`openssl rand -hex 32`) — see below |
| `ALLOWED_ORIGINS` | production origin only, or empty to disable the public-origin check |
| `COOKIE_SECURE` | leave unset: it defaults to true when `NODE_ENV=production` |
| `NEXT_PUBLIC_SITE_URL` | production origin |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | unset disables the captcha check |

`PORT` and the old two-terminal `dev:api`/`serve` scripts are gone. `TRUST_PROXY` still exists but
only gates whether `sameOrigin()` may read `X-Forwarded-Host`; leave it unset unless your proxy
overwrites that header. Both are inert on Vercel — remove them there.

Environment variables are snapshotted per deployment. Editing one in the panel does **not** change
the running functions: the new value only takes effect on the next build/deploy. If `/healthz` returns
`{"ok":false}` after you fix `DATABASE_URL`, check the deployment is newer than the edit before
chasing anything else. Paste values with a text editor that shows whitespace — a trailing newline in
`DATABASE_URL` makes `pg` throw before it ever reaches the server.

**`SESSION_SECRET`** signs the derived CSRF tokens. If it is unset each warm container generates
its own at boot, so a staff member's CSRF token can stop matching their still-valid session cookie
after a re-deploy or a cold start, and writes fail with "CSRF check failed" until they sign in again.

### Database connection

Containers on a serverless platform are short-lived and scale to zero, so use Supabase's
transaction pooler (port `6543`), not the direct `5432` session connection. `src/lib/server/db.ts`
already opens **one** connection per warm container (`max: 1`) and scales out by starting more.

`prepare: false` — the advice that usually accompanies the pooler — is a `postgres.js` option. This
project uses `pg`, which has no such option and sends *unnamed* Parse messages
(`query.name || ''` in `pg-protocol`'s serializer), which transaction pooling passes without error.

### Rate limiting

The limiter in `src/lib/server/rate-limit.ts` is an in-memory `Map`, so its counters are **per warm
instance**, not global, and they reset when an instance is recycled. Application-side ceilings still
work as designed (per-account login 10 / 15 min, per-IP login 30 / 15 min, per-IP enquiry 5 / 15
min), but the enforced ceiling is effectively `limit × instances`.

For a hard global cap, add Vercel WAF rate-limit rules (all plans; Hobby includes one rule). With a
single rule, protect `POST /api/enquiries` — the endpoint reachable without a login. Note that WAF
counters are per region, and a rule with no action is monitor-only.

### Headers

Set in `next.config.mjs` `headers()`, so they apply to the dynamic routes too:
- all routes: HSTS, `nosniff`, `X-Frame-Options: DENY`, COOP/CORP, `Referrer-Policy`, `Permissions-Policy`
- `/` and every public path: Content-Security-Policy-Report-Only, report target `/csp-report`
  (report-only while the enquiry form depends on Turnstile and Web3Forms)
- `/admin` and `/admin/*`: enforced CSP in production, report-only elsewhere, plus `X-Robots-Tag: noindex, nofollow`
- `/api/*` and `/healthz`: `Cache-Control: no-store`

## Admin access

`src/app/admin/(protected)/layout.tsx` awaits `requireStaffUser()` before rendering any staff page,
so an unauthenticated visitor is redirected to `/admin/login` and the staff shell is never produced —
that is what replaced `admin-pages.js`. Because Next streams the layout, an unauthenticated `GET /admin`
answers HTTP 200 with the 307 redirect carried inside the document rather than as a response status;
no staff content is present in that body. If you need a literal 307 status for crawlers, that has to be
solved at the platform edge, not in the app.

Staff visibility rule (unchanged): counselors see leads assigned to them plus unassigned leads; admins
see everything.

## Operator CLI

```
npm run db:migrate          # create or update the schema; safe to re-run
npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN
npm run admin:create        # same, reading ADMIN_EMAIL / ADMIN_NAME / ADMIN_ROLE / ADMIN_PASSWORD
npm run db:export           # writes db/schema.sql and db/data.sql
```

Flags take precedence over the environment; with no password from either source a strong one is
generated and printed once. Never set `--password` on a shared machine — it is visible in shell
history and process listings; use `ADMIN_PASSWORD` and delete it afterwards.

`admin:create` imports the app's own scrypt module, so hashes it writes always verify at login; that
needs Node 22.18+ or 23.6+. Resetting an existing account deletes that user's sessions.

### First staff account on a deployment

Vercel has no shell, so the CLI cannot run there. Provision the deployed database from your machine
instead — it is the same Postgres the app talks to:

1. Put the deployment's `DATABASE_URL` (the port `6543` pooler form) in local `.env`.
2. `npm run db:migrate`
3. `npm run admin:create` — with the `ADMIN_*` variables set, or with explicit flags.
4. Remove the `ADMIN_*` entries from `.env` and do not add `ADMIN_PASSWORD` to Vercel at all.

The app itself never writes schema or accounts, so a redeploy cannot reset a staff password.

## When login says "Something went wrong on the server."

That string comes from the catch-all in `src/lib/server/guard.ts`; the real exception is logged as
`[admin] error:` in the deployment's runtime logs (Vercel → Deployments → latest → Logs). Read that
line before changing code. The usual signatures:

| Log shows | Cause |
|---|---|
| `relation "users" does not exist` | the deployment points at a database that was never migrated |
| `Cannot find module` / `pg-native` | `pg` got bundled — `serverExternalPackages: ["pg"]` in `next.config.mjs` prevents it |
| `connect ETIMEDOUT` / `getaddrinfo` / SSL errors | direct `5432` URL instead of the pooler, `DATABASE_SSL` unset, or a network restriction blocking Vercel |
| `CSRF check failed` after a successful sign-in | `SESSION_SECRET` unset, so each warm instance holds a different key |

`GET /healthz` narrows it down: `{"ok":true}` means `pg` loaded and the database answered `SELECT 1`,
so the failure is below the connection layer.


## Health

`GET /healthz` → `{"ok":true}` when the database answers, `no-store`.
