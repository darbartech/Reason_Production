# Complete SEO Implementation Specification

**Goal:** Make the Reasons Education website crawlable, indexable, locally relevant and genuinely useful for prospective students in Nepal.

## 1. Current technical SEO foundation

Relevant files:
- `src/lib/seo.ts`
- `src/lib/company.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/components/Schema.tsx`
- Page-level `metadata` exports in `src/app/**/page.tsx`
- `src/content/countries.ts`
- `src/content/countryPages.ts`
- `src/lib/blog-data.ts`

The project already has a metadata helper that sets title, description, canonical, Open Graph and Twitter metadata. Sitemap and robots route handlers are present. Organization/breadcrumb schema components are present. Preserve these foundations and validate the rendered HTML.

## 2. P0 crawl and deployment checks

Before keyword optimization:
- Confirm the deployed artifact matches the reviewed source.
- Confirm public pages return HTTP 200.
- Confirm unknown URLs return real HTTP 404.
- Confirm `/robots.txt` and `/sitemap.xml` return valid content.
- Confirm canonical tags point to the preferred HTTPS host.
- Confirm redirects normalize `http` to `https`, `www`/non-`www`, trailing slash and duplicate route variants consistently.
- Ensure admin and API endpoints are not indexed.
- Ensure no public page accidentally carries `noindex`.
- Ensure the sitemap lists only canonical, indexable, approved URLs.

Use a crawler such as Screaming Frog or Sitebulb and Search Console URL Inspection after deployment.

## 3. Metadata standards

For every indexable page:
- Unique title that describes page intent and brand.
- Unique, human-readable meta description.
- One canonical URL.
- Correct Open Graph title/description/image.
- Twitter card.
- Correct robots directives.
- One clear H1.
- Meaningful internal links.

Avoid titles that are truncated by unnecessary brand repetition. `buildMetadata()` in `src/lib/seo.ts` should be reviewed for consistent title length and absolute-title behavior. Do not force a universal character limit; optimize for clarity and SERP display.

Use `company.url` as the canonical host, but verify that `NEXT_PUBLIC_SITE_URL` is set to the final production origin in the build environment.

## 4. Sitemap modification dates

`src/app/sitemap.ts` currently imports `LAST_CHECKED_ISO` from `src/lib/company.ts` and uses the same date for static routes, country routes and approved landing pages. This can make every route appear updated when only a global check date changes.

Implement genuine page-level `lastModified` values:
- Add `updatedAt` / `lastReviewedAt` to content records where appropriate.
- Use source-control/build metadata only when it accurately represents a meaningful page update.
- For static pages, maintain a deliberate per-page date or omit `lastModified` if a reliable date is unavailable.
- For blog pages, use a true article update date, not a routine build timestamp.
- Do not update dates automatically on every deploy.

Acceptance: sitemap dates reflect meaningful content changes and no future timestamps appear.

## 5. URL and indexation policy

- Keep one preferred URL per page.
- Redirect legacy URLs to the canonical equivalent.
- Do not index internal admin pages.
- Do not index API routes.
- Exclude unapproved landing pages.
- Exclude duplicate, thin or test pages.
- Avoid indexing query-string variants.
- Ensure 404 page returns 404 status rather than a 200 soft 404.
- Check trailing slash behavior against canonical URLs.

`src/app/robots.ts` currently disallows `/admin/` and `/api/`. Verify the exact production paths and make sure robots disallow does not prevent crawling of pages that should be indexed. Remember: robots.txt is not an access-control mechanism.

## 6. Structured data

Inspect `src/components/Schema.tsx` and actual page rendering.

Use only accurate structured data:
- `Organization` or the most appropriate organization type.
- `WebSite`.
- `BreadcrumbList` on nested pages.
- `Article` / `BlogPosting` for editorial content with real author/date.
- `LocalBusiness` only if the business category and public details are accurate and eligible.
- `Course` only where a real course with valid details exists.

Do not add review/rating schema for testimonials unless the data meets Google’s current structured-data policies. Do not add aggregate ratings or fabricated reviews. Structured data must match visible page content.

Validate with Google Rich Results Test and Schema Markup Validator.

## 7. Local SEO — Kathmandu / New Baneshwor

Primary local intent examples:
- study abroad consultancy in Kathmandu
- UK study consultancy in Kathmandu
- study abroad counselling in Nepal
- IELTS and PTE classes in Kathmandu
- study in UK from Nepal

Actions:
1. Claim and verify the Google Business Profile.
2. Use one consistent business name, address and phone.
3. Select the most accurate primary and secondary categories.
4. Add real office exterior/interior images.
5. Keep hours and holiday schedules current.
6. Add service descriptions that match actual offerings.
7. Request genuine reviews without incentives or review gating.
8. Respond professionally to reviews.
9. Ensure website contact page and profile link agree.
10. Audit NAP consistency across reputable directories.

Do not create multiple fake office listings or location pages for addresses where the business has no staffed presence.

## 8. Keyword and page mapping

Build a keyword map before writing new content.

| Page | Main intent | Supporting intent |
|---|---|---|
| Homepage | Study abroad consultancy Kathmandu | Study abroad counselling Nepal |
| UK page | Study in UK from Nepal | UK student visa guidance, UK universities |
| Australia page | Study in Australia from Nepal | Admission, cost, visa process |
| Canada page | Study in Canada from Nepal | Admission and study permit |
| IELTS page | IELTS classes Kathmandu | IELTS preparation Nepal |
| Services | Study abroad counselling services | Application and documentation support |
| Fees | Study abroad consultancy fees | IELTS/PTE and service costs |
| Contact | Contact Reasons Education | Office address, appointment |
| Blog | Specific question/topic | Related country/service intent |

Do not create multiple pages targeting the same query with nearly identical copy.

## 9. Content quality and E-E-A-T signals

For sensitive immigration/education information:
- Use official government and institution sources.
- Show reviewer name/role where true.
- Show last reviewed date.
- Distinguish general information from individualized advice.
- Cite the source near the relevant claim.
- Explain when rules vary by institution, course or applicant.
- Avoid guarantees.

Add original value: Nepal-specific document checklists, realistic budget examples, application timelines, decision frameworks and common process mistakes.

## 10. Image SEO

- Use descriptive filenames.
- Write meaningful alt text for informative images.
- Use empty alt for decorative images.
- Do not keyword-stuff alt text.
- Include image dimensions to avoid layout shift.
- Ensure Open Graph images use absolute or correctly resolved URLs.
- Verify image accessibility and licensing.

## 11. Analytics and Search Console

Configure:
- Google Search Console domain property.
- GA4 with consent/privacy configuration appropriate to the site.
- Google Tag Manager only if it adds a real operational benefit.
- Conversion events defined in `06_LEAD_CONVERSION_AND_ANALYTICS.md`.

Do not put student personal data in URLs, analytics events, page titles or custom dimensions.

## 12. Technical validation checklist

- [ ] Unique title and description for every indexable route.
- [ ] Canonical points to correct HTTPS URL.
- [ ] Sitemap includes only indexable canonical URLs.
- [ ] Sitemap `lastModified` is meaningful.
- [ ] Robots rules do not block intended pages.
- [ ] Admin/API are protected and not indexed.
- [ ] 404 status is correct.
- [ ] Structured data validates and matches visible content.
- [ ] No duplicate H1s or broken heading hierarchy.
- [ ] Internal links resolve.
- [ ] Images have suitable alt text.
- [ ] Local business identity is consistent.
- [ ] Search Console sitemap accepted.
- [ ] No unexpected `noindex`, redirect chain or canonical conflict.
- [ ] Country pages cite current official sources.

## 13. Acceptance criteria

SEO is ready for release when a fresh crawl finds no P0 technical issue, all important pages are indexable and canonical, business details match approved facts, sitemap and robots are valid, schema reflects visible content, and Search Console has no unresolved critical indexing error. Rankings and traffic growth are ongoing outcomes, not launch guarantees.
