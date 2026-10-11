# Phased Execution — Hero UI/UX

Use these prompts one at a time. Provide the project and this documentation folder to your coding assistant. Do not combine phases unless the previous phase has passed its acceptance criteria.

## Phase 1 — Inspect and map
Read `00_HERO_AUDIT.md` and inspect `Hero.tsx`, `PageHero.tsx`, and every page importing `PageHero`. Do not edit files yet. Return a route-to-hero map, confirm image paths exist, and identify which existing claims/content are factual versus unverified. No code changes.

**Acceptance:** complete list of consumers, no guessed file paths, no unrelated redesign plan.

## Phase 2 — Homepage hero
Implement the homepage-only requirements in `01_HERO_DESIGN_SPEC.md` using `02_IMPLEMENTATION_PROMPT.md` guardrails. Keep the existing brand and copy intent. Make text and CTAs the priority on mobile; simplify overlays and proof strip.

**Acceptance:** desktop split layout is balanced; mobile shows H1 and actions before image; all links work; no unsupported metrics or new dependencies.

## Phase 3 — Shared PageHero
Add restrained, backwards-compatible layout variants. Remove default decorative circles/grid where they do not add meaning. Keep current props and behavior working when no variant is supplied.

**Acceptance:** existing callers compile and render; breadcrumbs, chips, metadata, image and dark/light tone work.

## Phase 4 — Assign variants carefully
Use the route map from Phase 1. Apply editorial to text-led legal/FAQ pages, compact to pages that need a smaller introduction, and split only where an image is relevant. Make the smallest page-level prop changes possible.

**Acceptance:** no duplicate headings, no empty image columns, no forced photos on text-led pages, no route changes.

## Phase 5 — Verify and report
Run available lint/typecheck/build commands. Test 360px, 390px, 768px, 1024px and wide desktop. Inspect keyboard focus and 200% zoom. Compare the before/after screenshots if available.

**Acceptance:** no new errors, no horizontal scroll, visible CTA focus, no clipped text. Return a concise change log and list any checks that could not be run.
