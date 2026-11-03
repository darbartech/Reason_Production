# Implementation Prompt — Hero Sections Only

You are editing the existing Reasons Education project from `Reason_ProductionPhase.zip`. Read `00_HERO_AUDIT.md` and `01_HERO_DESIGN_SPEC.md` first, then inspect the current source files before making changes.

## Scope
Transform only the homepage hero and the shared inner-page hero:
- `src/components/Hero.tsx`
- `src/components/PageHero.tsx`
- Minimal page-level prop adjustments only where necessary for the listed variants.

Keep the existing Next.js 14, React, Tailwind CSS, `next/image`, `next/link`, `lucide-react`, company data and current routes. Do not install dependencies.

## Required implementation
1. Simplify the homepage hero hierarchy: clear H1, concise existing service message, one primary CTA, one secondary contact action and a compact factual reassurance row.
2. Preserve existing working CTA destinations and the phone link sourced from `company`.
3. Remove unnecessary floating panels, decorative circles and redundant card-like proof tiles. Keep at most one useful factual overlay, and only if it does not compete with the CTA.
4. Keep mobile content before the image. Make sure the headline, primary action and contact action appear before the photo on narrow screens.
5. Refactor `PageHero` into a small set of optional layout variants (`split`, `editorial`, `compact`) while preserving backwards compatibility. Default behavior for callers without a variant must remain safe and visually sensible.
6. Remove or greatly reduce the decorative `hero-grid` treatment; no blobs or decorative circles.
7. Keep breadcrumbs, metadata, chips, optional aside, image alt text and existing tone support functional. Do not silently remove meaningful page content.
8. Update only the page props needed to assign suitable variants. Use editorial/text-led treatment for FAQ/Privacy/Terms; use split only where a relevant image exists and adds value; use compact where a large hero is unnecessary.
9. Preserve existing copy and brand tokens except where the audit identifies unsupported claims. Do not invent facts, metrics, credentials, testimonials, staff or image assets.
10. Preserve accessibility: semantic H1, breadcrumb nav label, visible focus styles, useful alt text, sufficient contrast and reduced-motion compatibility.

## Strict constraints
- Do not redesign the whole website.
- Do not touch admin pages, enquiry forms, backend/server, database, authentication, validation, SEO metadata, route slugs or package dependencies.
- Do not replace the logo, invent new brand colours, add gradients/glassmorphism/glow/3D or introduce generic AI-looking decorative visuals.
- Do not replace working content with placeholder marketing copy.
- Do not rewrite other sections or perform broad global CSS changes for this task.
- Do not assume a photo exists. Verify the exact file path before referencing it. If a photo is missing, use the existing valid image or render the layout without it.

## Verification
- Inspect every current `PageHero` consumer before deciding its variant.
- Run the project's existing lint/typecheck/build scripts if available; do not invent script names.
- At minimum run the production build.
- Check 360px, 390px, tablet and desktop layouts.
- Confirm there is no horizontal overflow and that all CTA links work.
- Report the exact files changed, checks run and any unresolved image/factual dependencies.
- If build fails because of pre-existing unrelated issues, identify the exact error and do not make unrelated changes to hide it.

## Definition of done
The homepage hero reads clearly within the first mobile viewport, the image supports rather than dominates the message, inner-page hero layouts suit their content type, existing routes and functionality remain unchanged, and the design looks intentionally art-directed rather than like a repeated template.
