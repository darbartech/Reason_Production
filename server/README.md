# server/

Express + PostgreSQL backend used by `server.js`.

| File | Purpose |
|---|---|
| `migrate.js` | Creates/updates tables (safe to re-run) |
| `create-admin.js` | Creates a staff login |
| `enquiry-routes.js` | `POST /api/enquiries` (public form) |
| `admin-routes.js` | `/api/admin/*` (login, stats, list, detail, notes) |
| `admin-pages.js` | Serves exported `/admin*` pages only to signed-in staff |
| `auth.js`, `db.js`, `rate-limit.js`, `constants.js` | Helpers |

## Setup
1. Put a real connection string in `.env` (`DATABASE_URL=...`). Set `DATABASE_SSL=true` for Supabase/Neon/Render, `false` for local Postgres.
2. `npm run db:migrate`
3. `npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN`
4. `npm run build` then `npm run serve` -> http://localhost:8000 (admin at /admin)

Dev with hot reload: terminal 1 `npm run dev:api`, terminal 2 `npm run dev` (port 3000 proxies /api to 8000).

Counselors see leads assigned to them plus unassigned leads; admins see everything.
