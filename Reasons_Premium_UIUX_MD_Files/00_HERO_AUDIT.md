# Reasons Education — Existing Hero UI/UX Audit

## Scope
Reviewed the uploaded `Reason_ProductionPhase.zip`, focusing on the homepage hero and the shared `PageHero` used across content routes. The project is Next.js 14, React, Tailwind CSS and `lucide-react`. This pack is intentionally limited to hero sections; it is not a full-site redesign.

## Files and routes identified
- `src/components/Hero.tsx` — homepage hero.
- `src/components/PageHero.tsx` — reusable inner-page hero.
- `src/app/page.tsx` — renders `<Hero />` at the top of the homepage.
- `PageHero` is used in About, B2B, blog article, Contact, Countries, FAQ, IELTS, Privacy, Services, Study Abroad and Terms routes.

## Current strengths to preserve
- The site already has a reusable `PageHero` component and uses `next/image`.
- Brand tokens exist for navy, blue, crimson, paper and muted text.
- The homepage has a meaningful local contact action and supporting proof strip.
- Breadcrumb support, optional image, optional badge, chips, dark/light tone and optional side content already exist.
- Existing routes, metadata, CTA destinations and company data should remain intact.

## Main design gaps

### 1. The homepage hero has too many competing elements
`Hero.tsx` uses a split text/image layout, floating contact and opening-hours panels, then a separate four-item proof strip. The image is framed with a large rounded rectangle and shadow. Each element may be useful, but together they compete with the main headline and primary CTA.

**Direction:** retain the split layout and real-world photography, but reduce decoration. Use one clear headline, a short specific paragraph, one primary CTA, one secondary contact action and a compact factual trust line. Keep the phone visible without stacking multiple floating cards over the image.

### 2. The visual hierarchy is card-heavy
The hero image and proof items use rounded containers, borders, shadows and icon circles. `PageHero.tsx` adds two decorative circular shapes behind every image, and an optional floating badge. These patterns can make the interface feel template-generated rather than deliberately art-directed.

**Direction:** remove decorative circles and unnecessary floating UI; use a simple photo crop, clean alignment, thin rules and whitespace. Reserve elevated cards for information that truly needs separation.

### 3. Shared PageHero creates sameness across different page types
`PageHero` uses nearly the same section structure for service pages, informational pages, listings, legal pages and articles. The component supports optional elements, but its default design remains broadly identical.

**Direction:** keep one shared component/API for maintainability, but support a small set of intentional variants:
- `editorial`: text-led, no image, useful for FAQ, privacy and terms.
- `split`: text left and relevant image right, for About, Services, IELTS and Study Abroad.
- `compact`: smaller title area for contact, listings and blog article pages.
- `dark`: optional navy background only where it supports the page purpose.

Do not create a unique hero component for every route.

### 4. Decorative grid treatment needs restraint
The shared hero renders `hero-grid` at opacity 40% across the entire section. If this pattern is visible on both light and dark backgrounds, it can compete with copy and photography.

**Direction:** remove it from the default. If retained, make it extremely subtle, non-interactive and disabled on small screens or editorial variants.

### 5. Mobile content order and first-screen usability need validation
The current split layout stacks content before the image in `PageHero`; verify that the homepage hero also keeps headline and actions first on mobile. The first screen should communicate who Reasons Education helps and what action to take, not make users scroll past a large photo.

**Direction:** on narrow screens, show eyebrow (if useful), headline, paragraph and CTA before photography. Keep buttons full-width only when that improves usability; avoid clipping or horizontal scrolling.

### 6. Image intent and accessibility need improvement
The component accepts image alt text, but the visual style is generic if photos are not authentic and page-relevant. Floating badges should not imply credentials, success rates or office facts that have not been confirmed.

**Direction:** prefer approved real office/counsellor/student photos. Use a relevant, descriptive alt attribute for informative images; use empty alt text only for purely decorative images. Never invent awards, visa-success rates, partner logos, student totals or certification badges.

### 7. The current design system must be followed, not replaced
The project already defines brand tokens and supporting redesign documentation. Hero changes must use existing approved navy/blue/crimson/paper tokens. Do not add a new palette, gratuitous gradients, blur, glow, glassmorphism or new dependencies.

## Priority order
1. Make the homepage message and CTA dominant.
2. Simplify the photo composition and remove redundant floating panels.
3. Simplify the shared `PageHero` decoration.
4. Add controlled layout variants without changing the public props unnecessarily.
5. Check all 11 `PageHero` consumers so each page gets the right density.
6. Validate 360px, 390px, tablet and desktop breakpoints.
7. Run the existing build and check route output.

## Non-goals
- Do not redesign the entire website.
- Do not change navigation, enquiry forms, admin, backend, database, SEO route structure or course/service content as part of this task.
- Do not replace logos or change brand identity.
- Do not change page copy unless needed to correct layout or remove a demonstrably unsupported claim.
