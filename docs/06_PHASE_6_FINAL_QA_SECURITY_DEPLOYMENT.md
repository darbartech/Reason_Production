# Phase 6 — Final QA, Security & Deployment

## Objective

Perform a controlled production-readiness pass after Phases 1–5.

This phase is for verification and targeted fixes only.

## 1. Build

Run:

```bash
npm run build
```

Resolve:

- TypeScript errors,
- route errors,
- build errors,
- missing imports,
- invalid environment variables.

Do not rewrite working architecture just to remove harmless warnings.

## 2. Public route verification

Check:

```text
/
 /about
 /services
 /study-abroad
 /countries
 /countries/australia
 /countries/canada
 /countries/uk
 /countries/usa
 /countries/new-zealand
 /countries/japan
 /countries/europe
 /ielts
 /blog
 /contact
 /faq
 /privacy
```

Use the actual routes found in the project if any differ.

## 3. Admin route verification

Check:

```text
/admin/login
/admin
/admin/enquiries
/admin/enquiries/[id]
```

Verify:

- unauthenticated access is blocked,
- counselor permissions work,
- admin permissions work,
- logout works.

## 4. Form verification

Submit real test enquiries and confirm:

```text
Form
 ↓
API
 ↓
Database
 ↓
Admin
```

Do not mark the form complete merely because the success message appears.

## 5. Mobile testing

Test at minimum:

```text
320px
375px
390px
768px
1024px
1440px
```

Focus on:

- navbar,
- hero,
- enquiry form,
- country cards,
- tables,
- admin pages,
- buttons,
- footer.

## 6. Visual consistency

Search the project for:

```text
bg-gradient
from-
via-
to-
```

Remove unnecessary gradients introduced by the new implementation.

Search for arbitrary colors.

Ensure the new system does not reintroduce:

- purple,
- amber,
- random green,
- decorative orange,
- rainbow icons.

WhatsApp green is allowed only for WhatsApp UI.

## 7. Logo verification

Confirm the original Reason logo:

- has not been recolored,
- has not been distorted,
- is not filtered,
- is not replaced by an AI-generated recreation.

## 8. Placeholder sweep

Search for:

```text
john
jane
example.com
lorem
123 Main
YOUR_ACCESS_KEY
YOUR_
TODO
FIXME
```

Remove only genuine production placeholders.

## 9. Secret verification

Check that:

- database credentials are not committed,
- API secrets are not in client components,
- `.env` files are ignored,
- public environment variables contain no secrets.

## 10. Security

Verify:

- server-side form validation,
- rate limiting,
- admin route protection,
- authorization on enquiry reads,
- authorization on enquiry updates,
- no public API endpoint exposes all enquiries,
- internal notes are protected.

## 11. SEO

Preserve existing SEO functionality.

Verify:

- metadata,
- canonical URLs,
- sitemap,
- robots,
- structured data,
- page titles,
- descriptions.

Do not perform an unrelated SEO rewrite in this phase.

## 12. Performance

Check:

- images,
- unnecessary client components,
- large dependencies,
- console errors,
- failed network requests.

Do not disable Next.js image optimization merely to make development easier.

## 13. Acceptance rule

The website is production-ready only if:

```text
Public website works
+
Student enquiry works
+
Database persistence works
+
Admin authentication works
+
Admin enquiry management works
+
Permissions work
+
Build passes
+
Mobile works
+
No secrets exposed
```

## AI implementation instruction

> Perform only Phase 6. Audit the completed implementation and fix only confirmed issues. Do not redesign pages, change the brand direction, replace components unnecessarily, or introduce new features. Treat this as a production QA and security pass.
