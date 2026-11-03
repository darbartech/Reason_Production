// Exports the live PostgreSQL database as portable SQL files.
//   npm run db:export
//
// Writes:
//   db/schema.sql  — extensions, sequences, functions, tables, constraints, indexes, triggers
//   db/data.sql    — one INSERT per row, for every table except live session state
//
// Restore into any PostgreSQL:
//   psql "<target-url>" -v ON_ERROR_STOP=1 -f db/schema.sql
//   psql "<target-url>" -v ON_ERROR_STOP=1 -f db/data.sql
//
// No Supabase-specific objects are involved — this is plain PostgreSQL DDL and DML.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { getPool, assertConfigured } = require("../server/db.js");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "db");

// Sessions, MFA challenges and recovery codes are short-lived credentials:
// restoring yesterday's logins would be a security bug, not a feature.
const SKIP_TABLES = new Set([
  "sessions",
  "admin_sessions",
  "admin_mfa_challenges",
  "admin_mfa_recovery_codes",
]);

const ident = (name) => `"${name.replace(/"/g, '""')}"`;
const literal = (value) => (value === null ? "NULL" : `'${String(value).replace(/'/g, "''")}'`);
const rows = (pool, sql, params) => pool.query(sql, params).then((r) => r.rows);

const listTables = async (pool) =>
  (
    await rows(
      pool,
      `SELECT c.relname AS name
         FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r'
        ORDER BY c.relname`
    )
  ).map((r) => r.name);

const listColumns = (pool, table) =>
  rows(
    pool,
    `SELECT a.attname AS name,
            format_type(a.atttypid, a.atttypmod) AS type,
            a.attnotnull AS not_null,
            pg_get_expr(d.adbin, d.adrelid) AS default_expr
       FROM pg_attribute a
       JOIN pg_class c ON c.oid = a.attrelid
       JOIN pg_namespace n ON n.oid = c.relnamespace
       LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
      WHERE n.nspname = 'public' AND c.relname = $1 AND a.attnum > 0 AND NOT a.attisdropped
      ORDER BY a.attnum`,
    [table]
  );

const listConstraints = (pool, table) =>
  rows(
    pool,
    `SELECT conname, pg_get_constraintdef(oid) AS def
       FROM pg_constraint
      WHERE conrelid = $1::regclass AND contype IN ('p','u','c','f')
      ORDER BY CASE contype WHEN 'p' THEN 1 WHEN 'u' THEN 2 WHEN 'c' THEN 3 ELSE 4 END, conname`,
    [`public.${ident(table)}`]
  );

const listIndexes = (pool, table) =>
  rows(
    pool,
    `SELECT indexname, indexdef
       FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = $1
        AND indexname NOT IN (
          SELECT conname FROM pg_constraint WHERE conrelid = $2::regclass AND contype IN ('p','u')
        )
      ORDER BY indexname`,
    [table, `public.${ident(table)}`]
  );

const listTriggers = (pool, table) =>
  rows(
    pool,
    `SELECT tgname, pg_get_triggerdef(oid) AS def
       FROM pg_trigger
      WHERE tgrelid = $1::regclass AND NOT tgisinternal
      ORDER BY tgname`,
    [`public.${ident(table)}`]
  );

const listSequences = (pool) =>
  rows(
    pool,
    `SELECT sequencename, start_value, min_value, max_value, increment_by, cycle
       FROM pg_sequences WHERE schemaname = 'public' ORDER BY sequencename`
  );

const listFunctions = (pool) =>
  rows(
    pool,
    `SELECT pg_get_functiondef(p.oid) AS def
       FROM pg_proc p
       JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'public' AND p.prokind = 'f'
      ORDER BY p.proname`
  );

const listForeignKeyEdges = (pool) =>
  rows(
    pool,
    `SELECT c.relname AS child, rc.relname AS parent
       FROM pg_constraint con
       JOIN pg_class c ON c.oid = con.conrelid
       JOIN pg_class rc ON rc.oid = con.confrelid
       JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND con.contype = 'f'`
  );

// Parents before children, so a straight replay of data.sql never trips a foreign key.
function orderTables(tables, edges) {
  const deps = new Map(tables.map((t) => [t, new Set()]));
  for (const { child, parent } of edges) {
    if (child !== parent && deps.has(child) && deps.has(parent)) deps.get(child).add(parent);
  }
  const done = new Set();
  const ordered = [];
  while (ordered.length < tables.length) {
    const next = tables.filter(
      (t) => !done.has(t) && [...deps.get(t)].every((p) => done.has(p))
    );
    if (!next.length) {
      ordered.push(...tables.filter((t) => !done.has(t))); // foreign-key cycle
      break;
    }
    for (const t of next) {
      done.add(t);
      ordered.push(t);
    }
  }
  return ordered;
}

async function buildSchema(pool, tables) {
  const out = [];
  out.push("-- Schema exported from the live database by `npm run db:export`.");
  out.push("-- Plain PostgreSQL — apply to an empty database:");
  out.push('--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/schema.sql');
  out.push("");
  out.push("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
  out.push("");

  const sequences = await listSequences(pool);
  if (sequences.length) {
    out.push("-- Sequences");
    for (const s of sequences) {
      out.push(`CREATE SEQUENCE public.${ident(s.sequencename)}`);
      out.push(`  START WITH ${s.start_value} INCREMENT BY ${s.increment_by}`);
      out.push(`  MINVALUE ${s.min_value} MAXVALUE ${s.max_value}`);
      out.push(`  ${s.cycle ? "CYCLE" : "NO CYCLE"};`);
    }
    out.push("");
  }

  const functions = await listFunctions(pool);
  if (functions.length) {
    out.push("-- Functions");
    for (const f of functions) out.push(`${f.def.trim().replace(/;$/, "")};`, "");
  }

  out.push("-- Tables");
  for (const table of tables) {
    const columns = await listColumns(pool, table);
    out.push(`CREATE TABLE public.${ident(table)} (`);
    out.push(
      columns
        .map((c) => {
          const parts = [ident(c.name), c.type];
          if (c.default_expr) parts.push(`DEFAULT ${c.default_expr}`);
          if (c.not_null) parts.push("NOT NULL");
          return `  ${parts.join(" ")}`;
        })
        .join(",\n")
    );
    out.push(");");
    out.push("");
  }

  out.push("-- Constraints");
  for (const table of tables) {
    for (const c of await listConstraints(pool, table)) {
      out.push(`ALTER TABLE public.${ident(table)} ADD CONSTRAINT ${ident(c.conname)} ${c.def};`);
    }
  }
  out.push("");

  out.push("-- Indexes");
  for (const table of tables) {
    for (const i of await listIndexes(pool, table)) {
      out.push(`${i.indexdef.replace(/^CREATE (UNIQUE )?INDEX /, "CREATE $1INDEX IF NOT EXISTS ")};`);
    }
  }
  out.push("");

  const triggers = (
    await Promise.all(tables.map((t) => listTriggers(pool, t).then((rs) => rs.map((t2) => ({ table: t, ...t2 })))))
  ).flat();
  if (triggers.length) {
    out.push("-- Triggers");
    for (const t of triggers) out.push(`${t.def};`, "");
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

async function buildData(pool, tables, sequences) {
  const out = [];
  out.push("-- Data exported from the live database by `npm run db:export`.");
  out.push("-- Contains real enquiries and staff accounts — do not commit or share.");
  out.push("-- Re-runnable: every INSERT uses ON CONFLICT DO NOTHING.");
  out.push(`-- Omitted on purpose (live session state): ${[...SKIP_TABLES].sort().join(", ")}.`);
  out.push("");
  out.push("SET standard_conforming_strings = on;");
  out.push("BEGIN;");
  out.push("");

  const counts = [];
  const skipped = [];
  for (const table of tables) {
    if (SKIP_TABLES.has(table)) {
      skipped.push(table);
      continue;
    }
    const columns = await listColumns(pool, table);
    if (!columns.length) continue;

    const selectList = columns.map((c) => `${ident(c.name)}::text`).join(", ");
    const data = await rows(pool, `SELECT ${selectList} FROM public.${ident(table)}`);
    counts.push({ table, count: data.length });
    if (!data.length) continue;

    out.push(`-- ${table}: ${data.length} row${data.length === 1 ? "" : "s"}`);
    out.push(`INSERT INTO public.${ident(table)} (${columns.map((c) => ident(c.name)).join(", ")}) VALUES`);
    out.push(
      data
        .map((row) => `  (${columns.map((c) => literal(row[c.name])).join(", ")})`)
        .join(",\n")
    );
    out.push("ON CONFLICT DO NOTHING;");
    out.push("");
  }

  const seqState = [];
  for (const s of sequences) {
    const [{ last_value, is_called }] = await rows(
      pool,
      `SELECT last_value, is_called FROM public.${ident(s.sequencename)}`
    );
    if (last_value !== null) {
      seqState.push(
        `SELECT setval('public.${s.sequencename}', ${last_value}, ${is_called ? "true" : "false"});`
      );
    }
  }
  if (seqState.length) {
    out.push("-- Keep generated lead numbers ahead of the rows just inserted");
    out.push(...seqState);
    out.push("");
  }

  out.push("COMMIT;");
  return { sql: out.join("\n").trimEnd() + "\n", counts, skipped };
}

(async () => {
  assertConfigured();
  const pool = getPool();

  const tables = await listTables(pool);
  const ordered = orderTables(tables, await listForeignKeyEdges(pool));
  const sequences = await listSequences(pool);

  await mkdir(OUT_DIR, { recursive: true });

  const schema = await buildSchema(pool, ordered);
  await writeFile(path.join(OUT_DIR, "schema.sql"), schema, "utf8");

  const { sql: data, counts, skipped } = await buildData(pool, ordered, sequences);
  await writeFile(path.join(OUT_DIR, "data.sql"), data, "utf8");

  console.log("✔ db/schema.sql written");
  console.log("✔ db/data.sql written");
  for (const c of counts) {
    console.log(`   ${c.table}: ${c.count} row${c.count === 1 ? "" : "s"}`);
  }
  if (skipped.length) {
    console.log(`   skipped (live session state): ${skipped.join(", ")}`);
  }

  await pool.end();
})().catch((err) => {
  console.error("✖ Export failed:", err.message);
  process.exit(1);
});
