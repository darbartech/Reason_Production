# 01 — Existing Hero Audit

## Executive assessment

The current implementation has a useful foundation: a dedicated home `Hero`, a reusable `PageHero`, route-specific content, Next.js `Image`, breadcrumbs, CTA support, and several presentation variants. The problem is less a lack of components and more a lack of a clear, consistent hero system: too many page types are routed through a small set of visual treatments, and the shared styling currently repeats several decorative patterns.

This is a **source-code audit of the supplied archive**, not a claim that every visual issue has been confirmed in a live browser.

## Findings observed in the source

### 1. Home hero (`src/components/Hero.tsx`)
- Two-column layout with text and a 4:5 portrait image.
- Background radial gradient plus a low-opacity grid, an arch behind the image, a decorative rule, blurred accent blobs, and two floating information cards.
- Four proof items beneath the CTAs.
- The headline uses an italic `<em>` treatment styled as a crimson signature.
- Primary CTA uses `btn-primary`; the shared CSS defines this as crimson.
- Image and text are both given entrance-animation classes.

**Design risk:** several decorative devices compete with the message. Floating cards, blobs, grid, arch, gradient, and proof row all appear in one first-screen composition. This can make the hero feel assembled from effects rather than art-directed around one strong idea. Verify the image crop, balance, and first viewport at common screen widths.

### 2. Shared page hero (`src/components/PageHero.tsx`)
- Supports `split`, `editorial`, and `compact` variants.
- Supports paper/navy tones, image or subject media, optional aside, badge, chips, metadata, and breadcrumbs.
- The default variant is inferred from whether media/aside is present.
- `split` uses a 12-column grid and a 4:5 image.
- Non-split variants use a vertical accent bar beside the title.
- Paper tone uses a radial gradient wash; split paper heroes may add a low-opacity grid.
- Subject images may have a floating badge; chips are rounded pills.
- Navy and paper tones use different text and accent rules, but several details are structurally shared.

**Design risk:** a single component is responsible for many page types and visual options. The resulting output can feel formulaic across unrelated pages, while the prop combinations make it easy for route pages to drift. A “split” hero on a dark tone also follows a different decorative-grid rule than a paper split hero, so variants may not feel like one deliberate system.

### 3. Global style tokens (`src/styles/globals.css`)
- The design uses primary/navy-related tokens, paper surfaces, accent/crimson utilities, borders, and card shadows.
- `btn-primary` is crimson, and many hero details reference crimson.
- Global `h1 em` is neutralized, with a special crimson italic treatment for `#hero-heading`.
- The eyebrow rule is crimson in the base utility.
- The page hero includes repeated rounded chips, cards, and soft background effects.

**Design risk:** hero styling depends on broad global classes. A hero refresh should introduce scoped hero tokens/classes instead of casually changing global button, heading, or color behavior that other sections depend on. Do not remove or rename existing theme tokens without searching the full project first.

### 4. Route coverage observed
- `/` — dedicated `Hero`.
- `/about` — `PageHero` split with subject image, badge, and chips.
- `/b2b` — `PageHero` navy split with subject image and two CTAs.
- `/contact` — compact `PageHero`, followed by contact details and enquiry form.
- `/countries` — `PageHero`; individual destination routes use `CountryPageTemplate`.
- `/faq` — paper editorial `PageHero` with a search control as an aside.
- `/ielts` — `PageHero`.
- `/privacy` — editorial `PageHero`.
- `/services` — `ServicesClient` contains its own `PageHero`.
- `/study-abroad` — navy split `PageHero` with subject, badge, and chips.
- `/terms` — navy editorial `PageHero`.
- `/blog` — uses `BlogExplorer`, so inspect its internal page-top/hero treatment separately.
- `/blog/[slug]` — compact `PageHero` with article metadata; article image appears below it.
- `/countries/uk`, `/countries/usa`, `/countries/canada`, `/countries/australia`, `/countries/new-zealand`, `/countries/europe`, `/countries/japan` — shared `CountryPageTemplate`.

Admin pages should not inherit public marketing hero styles unless that is already intentional.

## Priority issues to verify in the running application

1. **First-viewport hierarchy:** Does the headline, supporting text, and main CTA appear immediately without requiring excessive scrolling?
2. **Visual noise:** Are the gradient, grid, blobs, arch, floating cards, pills, and border treatments collectively too busy?
3. **Repeated template feel:** Do About, Study Abroad, B2B, country pages, and general information pages look nearly interchangeable?
4. **Image quality:** Are images authentic, relevant, consistently cropped, correctly loaded, and free of text baked into the image?
5. **CTA consistency:** Is one action clearly primary per page, and does it lead to a real workflow?
6. **Color consistency:** Does crimson serve a deliberate role across the brand, or does it compete with the rest of the palette? Confirm the official Reasons brand guidelines before changing it.
7. **Mobile behavior:** Are the image, chips, badge, and CTA stack too tall? Do floating items overflow or cover meaningful image content?
8. **Accessibility and motion:** Are headings semantic, focus states visible, image alt text useful, and animations reduced when requested?

## Recommended direction

Use one shared **hero design system**, not one identical hero layout:
- Home: high-impact split hero with a single authentic image and clear CTA hierarchy.
- Service/destination conversion pages: split hero with service-specific visual and clear next step.
- Informational pages: restrained editorial hero with a concise introduction.
- Utility pages such as Contact and FAQ: compact, task-first hero that quickly exposes the form/search.
- Legal pages: minimal text-first title band.
- Blog index and article pages: editorial content-led hero with category and metadata, not sales-page decoration.

## Non-negotiable preservation
Keep existing Reasons Education content, routes, metadata, enquiry workflows, contact information, working links, country-specific data, and approved assets. Do not invent university partners, success rates, visa guarantees, ratings, testimonials, registrations, or other trust claims.
