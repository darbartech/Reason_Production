# Reason Education Foundation — Controlled Improvement Implementation Plan

## Purpose

Upgrade the existing Reason Education Foundation website into a more professional, trustworthy and conversion-focused foreign-study website **without rebuilding or redesigning the entire project**.

The implementation must be performed phase-by-phase. Each phase must preserve all correct existing pages, routes, content, SEO, components and functionality unless the phase explicitly requires a change.

## Source of truth

The existing uploaded project is the implementation baseline.

The supplied Reason logo is the brand identity reference.

### Non-negotiable visual rules

- Do NOT redraw, recreate, simplify, stretch, rotate or recolor the logo.
- Keep the supplied logo exactly as provided.
- Do NOT introduce AI-generated visual patterns.
- Do NOT create decorative blobs, abstract 3D shapes, excessive glassmorphism or generic SaaS visuals.
- Do NOT use rainbow card colors.
- Do NOT redesign every section just for visual novelty.
- Do NOT introduce gradients as decoration.
- Prefer flat colors, borders, spacing, typography and real photography.
- Use the logo's existing visual direction: deep navy, blue/cyan and restrained crimson.
- Crimson is an accent, not a dominant UI color.
- Keep WhatsApp green only where it represents the WhatsApp brand.
- Do not replace working content with invented statistics, testimonials, universities or claims.

## Existing architecture to preserve

The current project already contains reusable components and routes. Reuse them.

Important existing areas include:

- `src/app/`
- `src/components/`
- `src/lib/`
- `src/styles/globals.css`
- existing country pages
- existing services pages
- existing IELTS page
- existing blog pages
- existing contact page
- existing SEO/schema implementation

## Implementation order

### Phase 1
Brand and visual system cleanup.

### Phase 2
Student enquiry / study assessment form.

### Phase 3
Enquiry backend and database.

### Phase 4
Protected admin panel.

### Phase 5
Lead pipeline, notes, follow-ups and basic analytics.

### Phase 6
Final QA, security, performance and deployment.

Do not combine all phases into one large implementation.

## Controlled-change rule

Before editing a file:

1. Inspect the current file.
2. Identify the smallest required change.
3. Preserve all unrelated code.
4. Do not rewrite a complete component when a targeted edit is sufficient.
5. Do not rename routes unless required.
6. Do not remove existing functionality unless explicitly superseded.
7. After implementation, run a build/type check.

## Definition of done

A phase is complete only when:

- requested functionality works,
- existing routes still work,
- no unrelated visual redesign was introduced,
- TypeScript/build checks pass,
- mobile layout remains usable,
- no placeholder/demo data is introduced,
- changed files are documented.

## Phase execution rule

Use one phase document at a time.

Do not start the next phase until the current phase passes its acceptance checklist.
