# 03 — Page-by-Page Hero Plan

This plan maps the public routes found in the supplied source archive. Check route files again before implementation because page content may have changed since the archive was created.

## Route map

| Route / family | Current source pattern | Target family | Specific recommendation |
|---|---|---|---|
| `/` | `src/components/Hero.tsx` | HomeHero | Simplify the first viewport. Keep one strong image, H1, short value proposition, one primary consultation CTA, one secondary action, and a compact proof row. Remove decorative layers that do not help comprehension. |
| `/about` | `PageHero` split, image, badge, chips | SplitPageHero | Tell the human/team story. Keep the team photo; remove either the floating badge or the chips if they repeat the same information. |
| `/services` | `ServicesClient` has `PageHero` | SplitPageHero or EditorialHero | Inspect service content and CTA destination. Lead with the actual service value, not generic marketing copy. Avoid making a service catalogue hero too tall. |
| `/study-abroad` | Navy split with image, badge, chips | SplitPageHero | Explain the process clearly. Use the existing study image and a concise next step. Reduce the combination of dark surface, badge, chips, and decorative effects. |
| `/countries` | `PageHero` | EditorialHero | Use a destination-selection headline and a concise guide. Let the destination cards below provide the visual interest. |
| `/countries/uk` | `CountryPageTemplate` | DestinationHero | Show the UK-specific heading, existing relevant image, factual summary, and CTA. Avoid duplicating country data or using one generic image for every country. |
| `/countries/usa` | `CountryPageTemplate` | DestinationHero | Match the destination template but use the USA-specific copy and imagery/data already in the project. |
| `/countries/canada` | `CountryPageTemplate` | DestinationHero | Match the destination template; preserve country-specific content and CTA behavior. |
| `/countries/australia` | `CountryPageTemplate` | DestinationHero | Match the destination template; preserve country-specific content and CTA behavior. |
| `/countries/new-zealand` | `CountryPageTemplate` | DestinationHero | Match the destination template; preserve country-specific content and CTA behavior. |
| `/countries/europe` | `CountryPageTemplate` | DestinationHero | Ensure Europe is not inaccurately treated as a single country. Preserve the existing scope of the page. |
| `/countries/japan` | `CountryPageTemplate` | DestinationHero | Match the destination template; preserve country-specific content and CTA behavior. |
| `/ielts` | `PageHero` | CourseHero | Lead with IELTS/PTE preparation, who the course is for, and the real enquiry/enrolment path. Use course-relevant imagery only if available and appropriate. |
| `/contact` | Compact `PageHero` | UtilityHero | Keep it short. Main job: tell users how to contact/visit and get them to the enquiry form. Do not add a large hero photo or redundant trust pills. |
| `/faq` | Editorial `PageHero` with search aside | UtilityHero | Keep the search control prominent and close to the title. Make sure the input remains usable on mobile and the hero does not hide the search below the fold. |
| `/b2b` | Navy split with image and two CTAs | SplitPageHero | Audience is partner organizations/sub-agents. Use a B2B-specific headline, one primary partner action, and a secondary contact route. Preserve the partner form anchor. |
| `/blog` | `BlogExplorer` | BlogIndexHero | Inspect `BlogExplorer`'s top section directly. Use editorial title, brief context, and the existing filters/search if present. Do not add a second hero above an existing one. |
| `/blog/[slug]` | Compact `PageHero`, article metadata | ArticleHero | Keep category/title/date/author metadata. Avoid marketing chips. Preserve article image and share controls. |
| `/privacy` | Editorial `PageHero` | LegalHero | Compact text-only title and description. Remove marketing decoration if any is introduced by shared component defaults. |
| `/terms` | Navy editorial `PageHero` | LegalHero | Use the same legal family as Privacy, preferably a neutral surface for consistency unless dark tone is a deliberate system choice. |
| Admin routes | Separate admin components | Admin-specific | Keep public hero styles out of admin pages; admin should use dashboard page titles, not marketing hero sections. |

## Page content rules

- Preserve the current copy unless a copy change is explicitly part of the task.
- Do not make up claims such as “100% visa success,” “top-ranked,” “official partner,” or numerical outcomes.
- Reuse the real enquiry route and the current contact phone/WhatsApp links already defined in the project.
- A route may use a distinct layout, but it should share the same spacing, type scale, buttons, and media rules.
- Breadcrumbs are optional on the home page and useful on deep informational routes. Do not duplicate breadcrumbs if the page already renders `Breadcrumbs` elsewhere.
- Avoid repeating the same chips in the hero and the first content section.

## Component strategy

1. Keep `Hero.tsx` as the dedicated home hero, but simplify its composition.
2. Refine `PageHero.tsx` into a small set of clearly defined patterns with documented behavior.
3. Review `CountryPageTemplate.tsx` and `BlogExplorer.tsx` so their page-top sections align with the shared system.
4. Prefer small named variants and semantic props over complex nested conditionals.
5. Do not refactor unrelated page sections during the hero project.
