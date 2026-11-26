# Reason Education — Minimum Transform to a Premium, Trustworthy Website

> Based on a full read of your uploaded project (`src/`, `tailwind.config.ts`, `globals.css`, `Schema.tsx`, your logo `NEW.png`, and the existing `docs/*.md`).
> Stack kept as-is: **Next.js 14 (static export) + Tailwind 3 + lucide-react**. No rebuild. No new dependencies.

---

## The one-paragraph diagnosis

Your site is **structurally solid** (routes, SEO scaffolding, enquiry form, admin all exist) but it *looks* generic for three reasons:

1. **Every section uses the same template**: pill badge → two-tone H2 → grey intro → card grid with icon tile. It repeats on every page, which is exactly what "AI-generated" looks like.
2. **Typography is heavy and oversized**: 28× `font-black`, `text-7xl` H1s on 14 pages, global body text at 18px, bold Lora serif everywhere.
3. **It doesn't *prove* anything.** Stock Unsplash photos (78 references, including the "leadership team"), an unverifiable "98% visa success" in 8 files, three different brand names, outdated visa rules on the Canada pages (it still presents the Student Direct Stream as current; IRCC closed it on 8 Nov 2024), and no registration/credentials visible. For a service where parents hand over money and documents, **trust is the product**.

Premium here does **not** mean more effects. It means: fewer things, better type, real photos, real proof, more white space.

---

## Files in this pack (read in this order)

| # | File | What it gives you |
|---|------|-------------------|
| 01 | `01_DESIGN_AUDIT.md` | Evidence-based findings with file names |
| 02 | `02_BRAND_DESIGN_SYSTEM.md` | Logo-derived colors, fonts, type scale, spacing — **copy-paste code** for `tailwind.config.ts`, `globals.css`, `layout.tsx` |
| 03 | `03_HERO_AND_HOMEPAGE.md` | New hero (full component), navbar/footer/section changes, homepage order |
| 04 | `04_TRUST_AND_CREDIBILITY.md` | Claims you must verify/remove, trust components to add, photo shot-list, copy rules |
| 05 | `05_SEO_AND_RESPONSIVE.md` | Metadata, schema fixes, local SEO, images, Core Web Vitals, mobile rules |
| 06 | `06_IMPLEMENTATION_PROMPTS.md` | Phase-by-phase prompts for Claude Code / Kilo with guardrails |

---

## The "minimum transform" — priority order

**P0 — do first (biggest visual + trust lift, ~1–2 days)**
1. Replace tokens, fonts, and base type scale (File 02)
2. Decide **one legal brand name** and use it everywhere (File 04 §1)
3. Rebuild the Hero (File 03)
4. Remove/verify unprovable claims; fix About-page stock "team" photos (File 04)
5. Fix OG image (currently an Unsplash URL) and opening-hours mismatch (File 05)

**P1 — next (~2–3 days)**
6. Replace pill badges + two-tone headings with one `SectionHeader` (File 03)
7. Restyle cards: smaller radius, no lift-on-everything, real photos (File 03)
8. Add credentials strip, team, office/map, "what we don't promise" block (File 04)
9. Navbar utility bar + mobile sticky action bar (Files 03, 05)

**P2 — then**
10. Unique content for each of the 7 country pages (File 05 §6) — biggest SEO win
11. Self-host & compress all images; schema cleanup; local SEO (File 05)

**P3 — optional**: SVG logo + reversed logo, Nepali-language pages, video testimonials.

---

## What NOT to touch

- `server/`, `src/app/admin/`, `src/components/admin/`, `src/components/enquiry/`, `src/lib/validations/` — the working enquiry + admin system.
- Route structure and slugs (keeps existing SEO equity).
- The logo artwork itself. Don't redraw, recolor, or stretch it.

## Repo hygiene (quick wins)

- Delete `HERO_REDESIGN_DOC.md` and `font_color_fix.md` (or move to `/archive`). They describe an **orange accent, Poppins, gradient, "ICEF badge" and "British Council badge"** design that contradicts your current code and logo — and an AI agent following them will re-introduce unverified claims.
- Remove `.next/`, `out/`, `.kilo/`, `*.rar` from the project you share/commit (the zip carried ~200 MB, mostly build output and a 38 MB `.rar`). Check `.gitignore` covers `.next` and `out`.

## A note on the name

You wrote "Consultact"; the project is **Reason / Reasons Education**. The logo reads **"REASONS — Education Foundation"**, the site says **"Reason Education Consultancy"**, the domain is **reasons.edu.np**. Fixing this inconsistency is covered in File 04 §1 and is a real trust issue, not a cosmetic one.
