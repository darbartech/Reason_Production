# REASONS EDUCATION — PRODUCTION IMPLEMENTATION & HARDENING PLAN

> **Purpose:** Single source of truth for implementing the necessary fixes identified during the deep audit of the uploaded `Reason_Production Improved` project.
>
> **Scope:** UI/design consistency, content correctness, architecture, security, API/enquiry handling, database, SEO, performance, accessibility, testing, CI/CD, and production deployment.
>
> **Target:** `https://reasons.edu.np`
>
> **Strategy:** Do **not** rewrite the application. Preserve the existing Next.js + Express + PostgreSQL architecture and perform controlled hardening/refactoring.

---

# 1. Executive Decision

The project is a good production MVP and does **not** require a framework rewrite.

Keep:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Express API
- PostgreSQL
- PostgreSQL-backed admin sessions
- server-side validation
- parameterized SQL
- database transactions
- admin enquiry management
- SEO metadata
- sitemap/robots
- JSON-LD
- responsive navigation
- existing design system

The implementation priority is:

```text
CONTENT CORRECTNESS
        ↓
PRODUCTION SECURITY
        ↓
IMAGE/PERFORMANCE
        ↓
CONTENT ARCHITECTURE
        ↓
SEO
        ↓
ADMIN/CRM IMPROVEMENTS
        ↓
VISUAL POLISH
```

Do not perform another full redesign before these items are complete.

---

# 2. Priority Levels

## P0 — MUST FIX BEFORE PRODUCTION

1. Remove outdated/unsafe Canada immigration information.
2. Remove temporary Unsplash production imagery.
3. Fix inconsistent company identity.
4. Fix visible content/typo issues.
5. Verify production build.
6. Add a reliable TypeScript check.
7. Review production environment configuration.
8. Verify Nginx/reverse-proxy behavior and client IP handling.
9. Verify enquiry API security and validation.
10. Verify all legal/regulated content before publication.

## P1 — SHOULD FIX BEFORE SERIOUS MARKETING

1. Self-host and optimize images.
2. Centralize content.
3. Centralize company URL/identity.
4. Centralize JSON-LD handling.
5. Add bot protection such as Cloudflare Turnstile.
6. Add PostgreSQL indexes.
7. Harden session lifecycle.
8. Improve enquiry duplicate protection.
9. Improve accessibility.
10. Add CI validation.

## P2 — PROFESSIONALIZATION

1. Lead pipeline.
2. Follow-up dashboard.
3. Counselor workload.
4. Conversion analytics.
5. Better campaign attribution.
6. Better content publishing workflow.
7. Real office/team photography.
8. Advanced performance optimization.

---

# 3. Required Final Architecture

Keep the current architecture, but organize it toward:

```text
Browser
   │
   ▼
Nginx
   │
   ▼
Express / Next application
   │
   ├── Static Next.js frontend
   │
   ├── /api/enquiries
   │
   └── /api/admin/*
           │
           ▼
       PostgreSQL
```

Recommended source organization:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── b2b/
│   │   ├── contact/
│   │   ├── countries/
│   │   ├── faq/
│   │   ├── ielts/
│   │   ├── services/
│   │   └── study-abroad/
│   ├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── layout/
│   ├── marketing/
│   ├── enquiry/
│   ├── blog/
│   └── admin/
│
├── content/
│   ├── company.ts
│   ├── countries.ts
│   ├── services.ts
│   ├── team.ts
│   ├── testimonials.ts
│   └── faqs.ts
│
├── lib/
│   ├── company.ts
│   ├── seo.ts
│   ├── validation/
│   ├── admin/
│   └── utils/
│
└── styles/
    └── globals.css

server/
├── auth.js
├── db.js
├── constants.js
├── migrate.js
├── middleware/
│   ├── auth.js
│   ├── csrf.js
│   ├── rate-limit.js
│   └── validation.js
├── routes/
│   ├── admin.js
│   └── enquiries.js
└── services/
```

Do not perform this refactor all at once. Move files incrementally.

---

# 4. P0 — Fix Company Identity

## Problem

The project currently uses variations such as:

- `Reasons Education`
- `Reason Education`
- `Reasons Education Foundation`
- `Reason Education Consultancy`

This creates brand/legal ambiguity.

## Required model

Use:

```ts
export const company = {
  legalName: "Reasons Education Foundation",
  displayName: "Reasons Education",
  descriptor: "Education Consultancy",
  url: "https://reasons.edu.np",
  city: "Kathmandu",
  country: "Nepal",
};
```

## Rules

Public marketing:

```text
Reasons Education
```

Legal pages/contracts:

```text
Reasons Education Foundation
```

Descriptor:

```text
Education Consultancy
```

Do not randomly alternate the names.

## Files to inspect

Search:

```bash
grep -Rni "Reason Education" src server
grep -Rni "Reasons Education" src server
grep -Rni "Reasons Education Foundation" src server
```

Replace incorrect variations.

---

# 5. P0 — Remove Outdated Canada/SDS Content

This is a critical content correction.

Search the complete project:

```bash
grep -Rni "Student Direct Stream" src
grep -Rni "SDS" src
grep -Rni "20,635" src
grep -Rni "GIC" src
```

Any user-facing content related to outdated Canadian immigration processes must be reviewed and rewritten.

## Important rule

Never publish immigration requirements from memory.

For:

- visa requirements
- proof of funds
- GIC
- processing times
- work rights
- study permits
- post-study work
- eligibility
- language scores
- financial requirements

verify against current official government sources before publication.

## Content structure

Canada page should contain current, reviewed information such as:

```text
Study in Canada
Why Canada
Admission requirements
English-language requirements
Tuition and living costs
Financial requirements
Study permit process
Work options
Post-study options
Common mistakes
FAQ
Enquiry CTA
```

Do not mention discontinued programs unless clearly discussing historical information.

## Add review metadata

For regulated content, keep internal metadata:

```ts
{
  lastReviewed: "2026-10-07",
  reviewRequired: true,
  sourceType: "official-government"
}
```

Update `lastReviewed` whenever requirements are verified.

---

# 6. P0 — Remove Temporary Unsplash Production Images

Search:

```bash
grep -Rni "images.unsplash.com" src public
grep -Rni "unsplash" src public
```

All production marketing imagery should eventually be self-hosted.

Recommended:

```text
public/
└── images/
    ├── brand/
    ├── hero/
    ├── countries/
    ├── services/
    ├── team/
    ├── testimonials/
    └── blog/
```

Example:

```text
public/images/hero/counselling.webp
public/images/countries/canada.webp
public/images/countries/australia.webp
public/images/team/office.webp
```

Use real Reasons Education photography wherever possible.

Priority order:

1. Real office
2. Real counselors
3. Real student consultations
4. Real student success photographs
5. Professionally licensed imagery
6. Generic stock only when unavoidable

Do not use fake people as team members.

---

# 7. P0 — Logo Optimization

Current logo PNG should be reviewed.

Preferred:

```text
public/logo/logo.svg
public/logo/logo-white.svg
public/logo/favicon.svg
public/og-image.png
```

Target logo size:

```text
SVG: ideally < 20 KB
```

If SVG is not available, optimize PNG/WebP.

Do not redesign or recolor the official logo without approval.

---

# 8. P0 — Fix Visible Copy Errors

Search for duplicated wording:

```bash
grep -Rni "Read Read" src
```

Correct:

```text
We use your details only to contact you about your enquiry. Read our privacy policy.
```

Perform a complete content QA pass for:

- spelling
- grammar
- capitalization
- phone numbers
- email addresses
- company name
- office address
- social links
- legal links
- CTA labels
- country names
- service names

---

# 9. P0 — Remove Internal TODOs From Production Content

Search:

```bash
grep -Rni "TODO" src
grep -Rni "VERIFY" src
grep -Rni "FIXME" src
grep -Rni "placeholder" src
```

No user-facing content should depend on unfinished values.

Examples of unacceptable production content:

```ts
// TODO: replace with a REAL photo
```

```ts
// VERIFY: ...
```

```ts
// intake and outcome to be filled in
```

Either complete the information or remove the claim.

---

# 10. P0 — Testimonials and Team Data

Create one source of truth:

```text
src/content/team.ts
src/content/testimonials.ts
```

Example:

```ts
export const team = [
  {
    name: "Verified Name",
    role: "Verified Role",
    bio: "Verified biography.",
    image: "/images/team/person.webp",
  },
];
```

Only publish:

- real names
- real roles
- real photos
- verified experience
- verified qualifications

Do not create fictional profiles.

For testimonials, use only consented and verified testimonials.

---

# 11. P0 — Build Validation

Add:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "start": "...",
    "lint": "...",
    "typecheck": "tsc --noEmit"
  }
}
```

Run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

All must pass.

Do not deploy if any of these fail.

---

# 12. P0 — Align Next.js Packages

The project currently has a version mismatch between `next` and `eslint-config-next`.

Inspect:

```bash
npm list next eslint-config-next
```

Keep them on the same compatible major/minor line.

Example:

```json
"next": "14.2.x",
"eslint-config-next": "14.2.x"
```

Do not blindly upgrade to a new major.

After changing:

```bash
rm -rf node_modules
rm -f package-lock.json
npm install
npm run typecheck
npm run lint
npm run build
```

Only regenerate the lockfile if required by the dependency change.

---

# 13. P0 — Production Environment

Never commit real secrets.

Required production environment variables should be documented in `.env.example`.

Example:

```env
NODE_ENV=production

PORT=8000

DATABASE_URL=
DATABASE_SSL=true

SESSION_SECRET=

ADMIN_SESSION_HOURS=12

TRUST_PROXY=1

NEXT_PUBLIC_SITE_URL=https://reasons.edu.np
```

Do not place:

- database passwords
- session secrets
- admin passwords
- API keys
- private credentials

inside Git.

---

# 14. P0 — Reverse Proxy / Client IP

The application is designed to run behind Nginx.

Make sure production has:

```text
Browser
  ↓
HTTPS
  ↓
Nginx
  ↓
Node/Express
```

If using one trusted reverse proxy, configure Express trust proxy appropriately.

Example:

```js
app.set("trust proxy", 1);
```

Only use the value appropriate to the actual network topology.

Do not blindly trust arbitrary proxy headers.

Verify:

```js
req.ip
req.protocol
req.secure
```

in production.

This matters because the rate limiter depends on the correct client IP.

---

# 15. P1 — Centralize Company Configuration

Use:

```text
src/lib/company.ts
```

Example:

```ts
export const company = {
  legalName: "Reasons Education Foundation",
  displayName: "Reasons Education",
  descriptor: "Education Consultancy",
  url: "https://reasons.edu.np",
  email: "verified-email@example.com",
  phone: "verified-phone",
  address: {
    city: "Kathmandu",
    country: "Nepal",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
};
```

Only add verified social URLs.

Do not invent social accounts.

---

# 16. P1 — Centralize All Content

Create:

```text
src/content/
├── company.ts
├── countries.ts
├── services.ts
├── team.ts
├── testimonials.ts
├── faqs.ts
└── blog/
```

Page components should render content, not own large data arrays.

Bad:

```tsx
const team = [...]
return ...
```

Better:

```tsx
import { team } from "@/content/team";
```

This makes content QA and future CMS migration much easier.

---

# 17. P1 — Centralize URL Usage

Do not hardcode:

```ts
"https://reasons.edu.np"
```

in many files.

Use:

```ts
company.url
```

Update:

- sitemap
- robots
- Open Graph
- canonical URLs
- JSON-LD
- article metadata
- blog URLs
- organization schema

---

# 18. P1 — Centralize JSON-LD

Use the existing safe JSON-LD component everywhere.

Recommended:

```tsx
<JsonLd data={organizationSchema} />
```

```tsx
<JsonLd data={faqSchema} />
```

```tsx
<JsonLd data={articleSchema} />
```

Do not duplicate:

```tsx
dangerouslySetInnerHTML={{
  __html: JSON.stringify(...)
}}
```

across individual pages.

Keep escaping centralized.

---

# 19. P1 — Blog Security

Current blog rendering uses stored HTML.

If blog content remains developer-controlled, the immediate risk is limited.

However, do not allow future admin-generated arbitrary HTML to be rendered directly.

Preferred:

```text
Markdown/MDX
   ↓
validated parser
   ↓
React
```

or sanitize HTML before rendering.

If using HTML:

```bash
npm install sanitize-html
```

and sanitize on the server before storage/rendering.

Never trust database content simply because it came from an admin UI.

---

# 20. P1 — Shared Validation

The enquiry schema currently exists on the client and server separately.

This can drift.

Recommended structure:

```text
src/lib/validation/enquiry.ts
```

Use the same business rules for:

- phone
- email
- country
- intake
- study level
- budget
- preferred contact method

Client validation is for UX.

Server validation is authoritative.

Never remove server-side validation.

---

# 21. P1 — Enquiry Duplicate Protection

Current duplicate detection is based on recent phone/country records.

Keep it, but recognize that a SELECT-then-INSERT flow can race.

Long-term options:

### Option A

Create a normalized submission fingerprint.

### Option B

Use transaction locking.

### Option C

Create a suitable database constraint.

For current traffic, this is not an emergency, but it should be addressed before very high-volume advertising.

---

# 22. P1 — Spam Protection

Current protections are good:

- honeypot
- validation
- rate limiting
- server-side checks

Add Cloudflare Turnstile before major ad campaigns.

Recommended:

```text
Turnstile
+
honeypot
+
rate limit
+
server validation
+
duplicate detection
```

Do not rely on client-side CAPTCHA alone.

---

# 23. P1 — Rate Limiter

Current in-memory rate limiting is acceptable for one Node process.

It is not sufficient for:

```text
multiple PM2 workers
multiple servers
load balancing
```

For the current single-server deployment:

```text
Nginx rate limiting
+
Node rate limiting
```

is sufficient.

If horizontally scaling later:

```text
Redis-backed rate limiting
```

should replace the in-memory global state.

---

# 24. P1 — Authentication Hardening

Current password hashing and session handling are good.

Keep:

- `crypto.scrypt`
- timing-safe password comparison
- HttpOnly cookies
- SameSite cookies
- Secure cookies in production
- PostgreSQL sessions

Add over time:

```text
sessions
├── id
├── user_id
├── token_hash
├── created_at
├── last_used_at
├── expires_at
├── revoked_at
├── ip_hash
└── user_agent
```

Add:

- logout all sessions
- session revocation
- cleanup expired sessions
- password-change session invalidation
- optional account disable state

---

# 25. P1 — CSRF Protection

Current Origin validation is useful.

For authenticated state-changing routes, prefer:

```text
SameSite cookie
+
Origin validation
+
CSRF token
```

Do not depend exclusively on the presence of the `Origin` header.

Review all:

```text
POST
PATCH
PUT
DELETE
```

admin routes.

---

# 26. P1 — PostgreSQL Indexes

Review the database and add indexes where appropriate.

Recommended candidates:

```sql
CREATE INDEX IF NOT EXISTS idx_enquiries_status
ON student_enquiries(status);

CREATE INDEX IF NOT EXISTS idx_enquiries_priority
ON student_enquiries(priority);

CREATE INDEX IF NOT EXISTS idx_enquiries_assigned_to
ON student_enquiries(assigned_to);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at
ON student_enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_enquiries_followup
ON student_enquiries(next_follow_up_at);

CREATE INDEX IF NOT EXISTS idx_enquiries_country
ON student_enquiries(preferred_country);
```

Add only indexes that match actual query patterns.

Do not blindly add dozens of indexes.

---

# 27. P1 — PostgreSQL SSL

Local:

```env
DATABASE_SSL=false
```

may be acceptable.

Production hosted PostgreSQL should use SSL where supported.

Avoid:

```js
rejectUnauthorized: false
```

when the provider supplies a trusted CA.

Preferred:

```js
ssl: {
  rejectUnauthorized: true,
  ca: process.env.DATABASE_CA_CERT,
}
```

when applicable.

Use the exact SSL configuration required by the PostgreSQL provider.

---

# 28. P1 — Image Performance

Because static export disables normal Next.js image optimization, images need to be optimized before deployment.

Target formats:

```text
WebP
AVIF where practical
SVG for logos/icons
```

Recommended dimensions:

```text
Hero desktop: 1600–2000px wide
Hero mobile: 900–1200px wide
Card images: 800–1200px
Portraits: 600–800px
```

Do not ship 4000–6000px originals to mobile devices.

Use meaningful filenames:

```text
canada-study-consultation.webp
reasons-education-office.webp
student-counselling-kathmandu.webp
```

---

# 29. P1 — Homepage Design Refinement

Do not redesign the whole homepage.

Use three visual modes.

## Editorial

For:

- hero
- about
- brand statements

Characteristics:

```text
large typography
large whitespace
few borders
few cards
```

## Information

For:

- services
- destinations
- FAQ
- process

Characteristics:

```text
structured cards
thin borders
clear hierarchy
```

## Conversion

For:

- enquiry
- contact
- final CTA

Characteristics:

```text
strong CTA
phone
WhatsApp where verified
short trust statements
simple form
```

Reduce excessive:

```text
rounded cards
icons
badges
floating decorative elements
```

---

# 30. P1 — Hero Requirements

Hero must immediately communicate:

1. What Reasons Education does.
2. Where it operates.
3. What the user should do next.

Example structure:

```text
Study Abroad With a Clearer Plan

Personalized counselling for Nepali students
from course selection to visa preparation.

[Book Free Counselling]
[Explore Destinations]

Kathmandu, Nepal
```

Add only verified trust claims.

Do not use unsupported:

```text
98% visa success
1000+ students
99% approval
```

unless the claim is documented.

---

# 31. P1 — Country Pages

Country pages should be genuinely country-specific.

Do not duplicate generic copy.

Each country should cover appropriate sections such as:

```text
Why study there
Popular study areas
Admission requirements
English requirements
Tuition
Living costs
Financial requirements
Application process
Visa/study permit process
Work rights
Post-study options
Common mistakes
FAQ
CTA
```

Do not publish outdated immigration information.

---

# 32. P1 — Accessibility

Keep current accessibility features.

Improve:

## Mobile menu

When opened:

```text
focus first item
↓
trap focus
↓
Escape closes
↓
return focus to trigger
```

## Forms

Each error should be connected to its field.

Example:

```tsx
aria-invalid={!!errors.phone}
aria-describedby="phone-error"
```

## Step forms

Announce step changes where practical.

## Success

Use an accessible status/live region.

---

# 33. P1 — Contact Form UX

Use both:

```text
inline field errors
+
summary/toast
```

Do not rely only on a generic toast.

Example:

```text
Phone
└── Please enter a valid phone number.
```

When validation fails:

```text
focus first invalid field
```

Keep entered values when navigating backwards through multi-step forms.

---

# 34. P1 — Google Maps

Current lazy iframe is acceptable.

For better performance, consider:

```text
Static map preview
+
Open in Google Maps
```

and only load the interactive map when requested.

---

# 35. P2 — Admin CRM Pipeline

Add lead stages:

```text
NEW
CONTACTED
COUNSELLING
DOCUMENTATION
APPLICATION
OFFER_RECEIVED
VISA_PROCESSING
VISA_APPROVED
VISA_REFUSED
CLOSED
LOST
```

Create a visual pipeline later:

```text
NEW
 ↓
CONTACTED
 ↓
COUNSELLING
 ↓
DOCUMENTS
 ↓
APPLICATION
 ↓
OFFER
 ↓
VISA
 ↓
SUCCESS
```

---

# 36. P2 — Follow-up Dashboard

Use existing `nextFollowUpAt`.

Add:

```text
Today's Follow-ups
Overdue
Upcoming
No Follow-up
```

Counselor dashboard:

```text
Assigned to Me
Due Today
Overdue
High Priority
```

---

# 37. P2 — Analytics

UTM tracking already provides a strong foundation.

Track:

```text
source
medium
campaign
landing page
country
service
enquiry created
enquiry qualified
application
visa outcome
```

Eventually calculate:

```text
Lead → Contacted
Contacted → Counselling
Counselling → Application
Application → Visa
```

This is much more useful than page views alone.

---

# 38. P2 — Marketing Attribution

Preserve UTM values from the first landing session where possible.

Recommended fields:

```text
utm_source
utm_medium
utm_campaign
utm_term
utm_content
landing_page
referrer
```

Do not collect unnecessary personal information.

---

# 39. SEO Checklist

Every indexable page should have:

```text
title
description
canonical
Open Graph
Twitter/X metadata where appropriate
one H1
logical H2/H3 structure
internal links
meaningful image alt text
```

Country pages should link to:

```text
related services
related FAQ
related blog posts
contact/enquiry
```

---

# 40. Structured Data

Use appropriate schemas:

## Organization

Site-wide where appropriate.

## LocalBusiness

Only if the business information is accurate and appropriate.

## Article

For blog posts.

## FAQPage

Only where FAQ content is genuinely visible on the page and qualifies under current search engine guidelines.

Do not add fake structured data.

---

# 41. Robots and Sitemap

Verify:

```text
https://reasons.edu.np/robots.txt
https://reasons.edu.np/sitemap.xml
```

Make sure:

- only intended public URLs are indexable
- admin routes are not indexable
- staging URLs are not indexable
- canonical URLs use HTTPS
- sitemap uses the production domain

---

# 42. Security Headers

Configure headers at Nginx or application level.

Recommended baseline:

```text
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Content-Security-Policy
```

Introduce CSP carefully because third-party services such as Google Maps, fonts, analytics, or payment tools may require specific domains.

Do not copy an extremely restrictive CSP without testing.

---

# 43. Nginx Production Model

Recommended:

```nginx
server {
    listen 80;
    server_name reasons.edu.np www.reasons.edu.np;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then configure HTTPS using a trusted certificate.

Adjust based on the actual Express/static architecture.

---

# 44. Deployment Process

Recommended production deployment:

```text
Developer
   ↓
GitHub
   ↓
Pull Request
   ↓
CI
   ├── npm ci
   ├── typecheck
   ├── lint
   └── build
   ↓
Merge
   ↓
VPS deployment
   ↓
Database migration
   ↓
Restart application
   ↓
Smoke test
```

Never deploy code that failed CI.

---

# 45. CI Workflow

Create:

```text
.github/workflows/ci.yml
```

Minimum:

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

Add tests when they exist.

---

# 46. Production Smoke Test

After deployment verify:

```text
GET /
GET /about
GET /services
GET /countries
GET /countries/canada
GET /countries/australia
GET /blog
GET /faq
GET /contact
GET /privacy
GET /terms
```

Verify API:

```text
POST /api/enquiries
POST /api/admin/auth/login
GET /api/admin/auth/me
GET /api/admin/enquiries
PATCH /api/admin/enquiries/:id
POST /api/admin/enquiries/:id/notes
```

Verify:

```text
HTTPS
cookies
sessions
database
rate limit
404
500
mobile menu
forms
images
SEO
```

---

# 47. Manual Browser QA

Test at least:

## Desktop

```text
Chrome
Edge
Firefox
```

## Mobile

```text
iPhone-size viewport
Android-size viewport
```

Check:

- navbar
- menu
- hero
- forms
- cards
- tables
- FAQ
- blog
- footer
- CTA
- keyboard focus
- touch targets

---

# 48. Lighthouse Target

Aim for:

```text
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

Do not sacrifice accessibility/SEO to chase a perfect performance number.

Priority Core Web Vitals:

```text
LCP
INP
CLS
```

---

# 49. Content QA Checklist

Before launch:

```text
[ ] Company legal name verified
[ ] Brand name verified
[ ] Address verified
[ ] Phone verified
[ ] Email verified
[ ] Facebook verified
[ ] Instagram verified
[ ] LinkedIn verified
[ ] YouTube verified
[ ] Team identities verified
[ ] Testimonials consented
[ ] Canada content verified
[ ] Australia content verified
[ ] UK content verified
[ ] USA content verified
[ ] Japan content verified
[ ] New Zealand content verified
[ ] Europe content verified
[ ] Tuition claims reviewed
[ ] Visa claims reviewed
[ ] Financial claims reviewed
[ ] No outdated immigration terminology
[ ] No fake statistics
[ ] No TODO content
[ ] No placeholder imagery
```

---

# 50. Security Checklist

```text
[ ] No secrets committed
[ ] HTTPS enabled
[ ] Secure cookies enabled
[ ] HttpOnly cookies enabled
[ ] SameSite configured
[ ] Session expiration configured
[ ] Session revocation supported
[ ] Password hashing uses scrypt or stronger approved method
[ ] Timing-safe password comparison
[ ] Server-side validation
[ ] Parameterized SQL
[ ] CSRF protection reviewed
[ ] Origin validation reviewed
[ ] Rate limiting enabled
[ ] Honeypot enabled
[ ] Bot protection enabled before ads
[ ] PostgreSQL SSL reviewed
[ ] Security headers configured
[ ] Admin routes protected
[ ] Admin not indexed
```

---

# 51. Database Checklist

```text
[ ] Production DATABASE_URL configured
[ ] SSL configuration verified
[ ] Connection pool verified
[ ] Migration process documented
[ ] Backups configured
[ ] Restore tested
[ ] Indexes reviewed
[ ] Foreign keys reviewed
[ ] Cascading behavior reviewed
[ ] Expired sessions cleaned
[ ] Enquiry duplicate handling reviewed
```

---

# 52. Backup Strategy

At minimum:

```text
Daily PostgreSQL backup
+
weekly retained backup
+
off-server copy
```

Test restore.

A backup that has never been restored is not a verified backup.

---

# 53. Recommended Implementation Order

Follow this exact sequence.

## Phase 1 — Content and production blockers

```text
1. Fix company identity
2. Remove SDS/outdated Canada information
3. Verify regulated information
4. Remove TODO/VERIFY production content
5. Fix visible copy errors
6. Verify testimonials/team
```

## Phase 2 — Build

```text
7. Align Next packages
8. npm ci
9. npm run typecheck
10. npm run lint
11. npm run build
```

## Phase 3 — Security

```text
12. Review sessions
13. Review CSRF
14. Review trust proxy
15. Review rate limiting
16. Review enquiry duplicate protection
17. Add Turnstile
18. Review security headers
```

## Phase 4 — Performance

```text
19. Replace Unsplash
20. Optimize logo
21. Optimize all images
22. Review fonts
23. Review Google Maps
24. Run Lighthouse
```

## Phase 5 — Architecture

```text
25. Centralize company config
26. Centralize content
27. Centralize JSON-LD
28. Shared validation
29. Clean duplicated components
```

## Phase 6 — QA

```text
30. Browser QA
31. Mobile QA
32. Accessibility QA
33. SEO QA
34. API QA
35. Database QA
36. Production smoke test
```

## Phase 7 — Launch

```text
37. CI green
38. Backup confirmed
39. HTTPS confirmed
40. Deploy
41. Smoke test
42. Monitor logs
43. Verify enquiry arrives in admin
```

---

# 54. Definition of Done

The project is production-ready only when all of the following are true:

```text
[ ] npm ci succeeds
[ ] npm run typecheck succeeds
[ ] npm run lint succeeds
[ ] npm run build succeeds
[ ] No production TODOs
[ ] No temporary Unsplash images
[ ] No outdated immigration claims
[ ] Company identity is consistent
[ ] All contact information verified
[ ] Enquiry form works
[ ] Enquiry reaches PostgreSQL
[ ] Enquiry appears in admin
[ ] Duplicate protection works
[ ] Rate limiting works
[ ] Admin authentication works
[ ] Logout works
[ ] Session expiration works
[ ] HTTPS works
[ ] Secure cookie works
[ ] Nginx forwards correct headers
[ ] PostgreSQL backups work
[ ] Restore procedure tested
[ ] Sitemap works
[ ] Robots works
[ ] Canonicals work
[ ] JSON-LD validated
[ ] Mobile navigation works
[ ] Keyboard navigation works
[ ] Forms are accessible
[ ] Lighthouse reviewed
[ ] 404 page works
[ ] 500 handling reviewed
[ ] Production smoke test passes
```

---

# 55. Final Recommendation

Do **not** rebuild the project.

The correct path is:

```text
Existing Reason Education project
             │
             ▼
      P0 content fixes
             │
             ▼
      security hardening
             │
             ▼
      image/performance
             │
             ▼
      architecture cleanup
             │
             ▼
        CI + testing
             │
             ▼
       production QA
             │
             ▼
        FINAL LAUNCH
```

The highest-risk issue discovered during the audit is **outdated/regulatory content**, especially Canada-related information.

The highest-impact technical improvements are:

1. Content correctness.
2. Real/self-hosted imagery.
3. Production build/type validation.
4. API/security hardening.
5. Centralized content/configuration.
6. Database indexes/backups.
7. CI/CD.
8. Final accessibility/performance QA.

Once these are completed, the existing project can be considered a strong production foundation for Reasons Education.

---

# 56. Change Log Template

Update this section whenever implementation progresses.

```text
Date:
Developer:

Completed:
- 

Changed files:
- 

Database changes:
- 

Environment changes:
- 

Tests:
- npm run typecheck:
- npm run lint:
- npm run build:

Production verification:
- 

Remaining:
- 
```

---

# END
