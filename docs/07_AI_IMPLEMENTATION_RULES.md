# AI Implementation Rules — Reason Website

This document should be supplied to any coding AI together with the phase document being implemented.

## Rule 1 — Inspect first

Before editing:

- inspect relevant files,
- inspect package.json,
- inspect existing routes,
- inspect existing components,
- inspect existing validation,
- inspect existing API/database code.

Never assume the project is empty.

## Rule 2 — Smallest possible change

If one component needs a 20-line change, do not rewrite a 300-line component.

If one CSS token needs changing, do not redesign every component.

## Rule 3 — No full redesign

Do not:

- rebuild the homepage from scratch,
- replace all components,
- rename routes unnecessarily,
- replace all typography,
- replace all images,
- rewrite SEO,
- change content without instruction.

## Rule 4 — No AI-generated visual style

Never introduce:

- decorative blobs,
- random floating shapes,
- excessive glassmorphism,
- neon effects,
- glowing borders,
- 3D cards,
- excessive gradients,
- random icon colors,
- oversized SaaS dashboards.

The visual target is a professional education foundation/consultancy.

## Rule 5 — No gradients by default

Use:

- solid colors,
- photography,
- borders,
- whitespace,
- typography.

A gradient is permitted only for necessary image text legibility.

## Rule 6 — Logo protection

The provided Reason logo is an immutable brand asset.

Never:

- redraw,
- recolor,
- invert,
- stretch,
- simplify,
- alter proportions.

## Rule 7 — Preserve real content

Do not invent:

- universities,
- scholarship amounts,
- visa success rates,
- student numbers,
- staff names,
- testimonials,
- rankings,
- government claims.

If content is missing, keep the existing content or use a clearly marked development placeholder that cannot ship.

## Rule 8 — No fake data

Admin dashboards must use database data.

Never display:

```text
126 leads
87 counseling
42 offers
```

unless those values actually exist.

## Rule 9 — Reuse existing dependencies

Before installing a package:

1. check package.json,
2. check whether the functionality already exists,
3. install only if genuinely required.

## Rule 10 — Do not mix phases

If implementing Phase 2:

Do not build Phase 4 admin pages.

If implementing Phase 4:

Do not redesign Phase 1 visual components.

Keep each implementation reviewable.

## Rule 11 — Validate after changes

At minimum:

```bash
npm run build
```

Also run the appropriate type/lint checks available in the project.

## Rule 12 — Report changes

At the end of each phase, report:

```text
Changed:
- file
- file
- file

Added:
- file
- file

Not changed:
- existing routes
- existing content
- unrelated components

Verification:
- build
- type check
- manual test
```

## Final instruction to coding AI

> You are modifying an existing production-oriented project. Do not treat this as a blank canvas. Inspect before changing, preserve correct architecture, make the smallest required edits, and implement only the requested phase. Professional simplicity is more important than visual novelty.
