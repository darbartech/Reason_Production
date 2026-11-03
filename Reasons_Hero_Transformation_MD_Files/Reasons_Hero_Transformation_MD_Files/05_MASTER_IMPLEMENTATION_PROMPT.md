# 05 — Master Prompt for the Coding Agent

Act as a senior product designer, UX strategist, accessibility specialist, and experienced Next.js engineer.

You are working inside the existing Reasons Education consultancy website project. The goal is to analyze and transform the hero sections at the top of **all public pages** because the current visual direction is not satisfactory. Read every Markdown file in `Reasons_Hero_Transformation_MD_Files/` before making changes, especially the audit, design system, page-by-page plan, and implementation phases.

## First: inspect, do not guess
1. Inspect the complete project structure and package scripts.
2. Read `src/components/Hero.tsx`, `src/components/PageHero.tsx`, `src/components/CountryPageTemplate.tsx`, `src/components/BlogExplorer.tsx`, `src/app/services/ServicesClient.tsx`, every page using these components, and `src/styles/globals.css`.
3. Run the website locally and inspect screenshots at desktop, tablet, and mobile widths if the environment supports it.
4. Identify every public route and classify it as home, service/course, destination, utility, B2B, blog index/article, or legal.
5. Before editing, list the current hero problems observed in code and confirmed in browser. Clearly label anything that cannot be verified.

## Target design
Create a premium, modern, professional consultancy website with:
- confident typography and clear hierarchy;
- restrained use of the existing brand palette;
- authentic, well-cropped photography;
- intentional whitespace and balanced composition;
- concise page-specific messaging;
- one primary CTA and an optional secondary CTA;
- factual trust indicators only;
- excellent mobile layout and accessibility.

Do not create a generic AI-generated template. Avoid excessive gradients, blurry glow blobs, glassmorphism, decorative grids, random arches, multiple floating cards, repeated chips, huge empty areas, and unnecessary animations. Use visual effects only when they directly improve hierarchy or meaning.

## Preserve
- Reasons Education's existing brand identity, approved logo/assets, fonts, tokens, page copy, and route structure;
- working links, CTA destinations, phone and WhatsApp actions;
- enquiry forms, validation, query-prefill behavior, and form submission;
- country-specific information and links;
- blog/FAQ search and filtering;
- SEO metadata, breadcrumbs, structured data, and admin functionality.

Never invent student success rates, testimonials, accreditation, university partnerships, visa guarantees, or numerical claims. Do not replace real images with generated/placeholder images without approval. Do not change the whole website.

## Implementation approach
Follow `04_IMPLEMENTATION_PHASES.md` exactly:
1. baseline and route inventory;
2. scoped hero design tokens and patterns;
3. home hero simplification;
4. shared `PageHero` refinement;
5. country, service, FAQ, contact, blog, and legal page-top patterns;
6. responsive/accessibility/performance QA and regression tests.

Share consistent tokens and components, but use different hero layouts where the page purpose differs. Do not force all pages into the same split layout. Prefer small, clear changes over a total rewrite. Preserve public component APIs where practical; if changing props, update every usage and run type checks.

## Technical rules
- Use the project's existing Next.js/React/Tailwind conventions.
- Avoid adding dependencies unless strictly necessary.
- Use semantic HTML, one clear H1 per page, accessible CTA names, keyboard focus states, meaningful image alt text, and `prefers-reduced-motion`.
- Keep decorative elements `aria-hidden`.
- Avoid layout shift and excessive eager image loading.
- Ensure CTA targets are real and tested.
- Scope new styles to hero components; do not break unrelated global styles.

## Required output
After implementation, provide:
1. a concise summary of the hero problems found;
2. a route-by-route list of the hero pattern implemented;
3. files changed and why;
4. screenshots or a visual QA summary for desktop/tablet/mobile if available;
5. lint/typecheck/build results;
6. any unresolved issues or decisions requiring brand-owner approval.

Do not stop after changing only the home page. Do not claim the transformation is complete until every public page family in the route plan has been inspected and checked.
