# 04 — Implementation Phases and QA

## Phase 0 — Baseline and inventory (no design changes)
- Read all docs in this folder.
- Inspect `Hero.tsx`, `PageHero.tsx`, `CountryPageTemplate.tsx`, `BlogExplorer.tsx`, `ServicesClient.tsx`, and all `PageHero` call sites.
- Identify the actual package scripts and run existing lint/typecheck/build commands where available.
- Record screenshots at desktop 1440px, laptop 1280px, tablet 768px, and mobile 390px / 360px.
- Record CTA destinations, image paths, title/body copy, breadcrumb behavior, and which claims are factual.
- Do not guess how the page looks; run the app and inspect it.

## Phase 1 — Define tokens and reusable patterns
- Keep existing color/font tokens unless the brand owner confirms changes.
- Add hero-specific scoped classes/tokens only where needed.
- Define spacing, typography, media ratio, CTA layout, eyebrow, and proof-row standards.
- Avoid a sweeping global CSS rewrite.
- Confirm the `h1 em`, `.eyebrow`, `.btn-primary`, `.surface-dark`, and animation interactions before touching them.

## Phase 2 — Simplify home hero
- Refine `src/components/Hero.tsx` first.
- Keep existing headline, description, real CTA destinations, company details, and approved image unless there is a documented reason to change them.
- Remove competing decorations incrementally: first the redundant glows, then grid/arch/line as appropriate, then floating cards if they add little value.
- Keep at most one factual overlay and a compact proof row.
- Check desktop and mobile before continuing.

## Phase 3 — Refine the shared `PageHero`
- Document the behavior of `split`, `editorial`, and `compact`.
- Reduce visual options that create combinations with no clear purpose.
- Ensure `tone` changes color and contrast only, not layout semantics.
- Use one media treatment, one optional trust cue, and a consistent CTA region.
- Avoid making every non-split title use an ornamental vertical bar if it feels repetitive.
- Preserve public component props where possible. If props are removed or renamed, update all call sites in the same phase and verify TypeScript.

## Phase 4 — Destination, service, and content families
- Update `CountryPageTemplate` and service/IELTS heroes to use the approved patterns.
- Inspect `BlogExplorer` to align the blog index without adding a duplicate top section.
- Keep article metadata hierarchy clear and legal pages compact.
- Ensure page-specific imagery and content are not lost during shared-component changes.

## Phase 5 — Responsive, accessibility, and performance QA
- Check 1440px, 1280px, 1024px, 768px, 390px, and 360px widths.
- Test all CTAs and anchors.
- Check keyboard tab order and focus-visible.
- Check contrast for text on dark and light surfaces.
- Check reduced-motion behavior.
- Check image `sizes`, `priority` usage, loading, alt text, crop, and layout shift.
- Check no overflow from floating badges or chips.
- Check that each route has one clear H1 and no duplicate breadcrumb rendering.

## Phase 6 — Regression checks
- Run the repository's existing lint, typecheck, tests, and production build commands.
- Inspect public routes and admin routes.
- Verify enquiry forms still submit and preserve query prefill behavior.
- Verify blog search/filter, FAQ search, country links, phone links, WhatsApp links, and B2B form anchor.
- Check metadata and structured data were not changed unintentionally.
- Provide a summary of files changed, decisions made, and any remaining issues.

## Acceptance criteria

The transformation is complete only when:
- Every public route has an intentional page-top pattern.
- Home, service, destination, utility, article, and legal pages do not all look identical.
- A visitor can identify the page purpose and primary action quickly.
- No false claims or fabricated trust signals were added.
- No working CTA, link, form, route, metadata, or image asset was accidentally removed.
- The design looks clean at mobile and desktop sizes.
- No new dependency was added without a clear need.
- Build/type checks pass, or any pre-existing failures are documented separately.

## Change-control rules
- Do not redesign the entire website.
- Do not alter backend, database, admin workflow, form validation, analytics, SEO metadata, or page copy except where needed to integrate the hero and explicitly approved.
- Avoid broad find-and-replace across CSS.
- Make changes in small, reviewable phases.
