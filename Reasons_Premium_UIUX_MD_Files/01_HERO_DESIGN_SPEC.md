# Hero Section Transformation — Design Specification

## Objective
Make the homepage and inner-page hero sections feel premium, professional, human and conversion-focused while preserving the existing Reasons Education brand, content, routes and working functionality.

## Visual direction
- Calm editorial education-consultancy style; credible, clear and welcoming.
- Mostly white and warm paper backgrounds, with navy for headings and selected dark sections.
- Blue for links and secondary emphasis; crimson is a restrained action/accent colour, not a decoration on every element.
- No gradients, blobs, glassmorphism, glow, 3D, excessive shadows or ornamental icon tiles.
- Do not add animation unless it is subtle, purposeful and respects `prefers-reduced-motion`.

## Homepage hero
### Desktop
- Use a 12-column or equivalent split layout: copy about 55–60%, image about 40–45%.
- Align the headline and image vertically; provide generous but controlled spacing.
- Keep a readable copy width (roughly 10–12 words per headline line at desktop).
- Image: authentic counselling/student/office photography, crop intentionally, no heavy dark overlay if text is not placed over it.
- Do not put more than one floating information panel on the image. Prefer no overlay card unless it carries genuinely useful information.
- CTA row: one clear primary action and one secondary action (phone/contact). Primary button should be visually strongest.
- Beneath CTA, use a compact factual reassurance line or 2–3 proof points separated by thin dividers; avoid four identical card tiles.

### Mobile
- Content order: eyebrow (optional) → H1 → short supporting copy → primary CTA → secondary contact action → compact trust line → image.
- Keep the primary CTA visible without requiring users to scroll past the image.
- Avoid horizontal scrolling, overlapping buttons, tiny proof text or image-first ordering.
- Keep the H1 responsive and balanced; avoid oversized 7xl/9xl typography.
- Use full-width buttons only when they remain comfortable and do not create a tall button stack.

### Copy rules
- Keep current factual brand/service content unless owner-approved updates are supplied.
- Headline should be specific to the service, not a generic slogan.
- Supporting copy should state the actual service and local context without repeating the headline.
- Primary CTA should lead to an existing valid route, such as `/contact`.
- Phone links must continue using the shared company data and a valid `tel:` URL.
- Do not display unverified visa success percentages, student totals, partner claims, certifications or awards.
- Do not invent facts to fill empty space.

## Shared PageHero variants
Keep `PageHero` as the shared component. Introduce a small, explicit variant prop only if it materially improves page-specific hierarchy.

### `split`
For About, Services, IELTS and Study Abroad when an appropriate image is supplied:
- Left: breadcrumbs where relevant, eyebrow, title, intro, optional metadata/chips.
- Right: relevant image with a clean crop.
- Optional badge only if factual and helpful; no decorative bubbles behind the image.

### `editorial`
For FAQ, Privacy and Terms:
- Text-led, no image by default.
- Shorter vertical padding and a narrower title/intro measure.
- Breadcrumbs remain accessible and visually quiet.

### `compact`
For Contact, Countries and blog/article contexts where the page needs a quick start:
- Reduced top/bottom padding.
- Avoid duplicate page title or breadcrumb content.
- Image optional; do not force a split layout if the image adds no value.

### `dark`
Optional tone for a small number of intentional pages:
- Use approved navy background and accessible white text.
- Do not rely on low-contrast cyan for small text.
- Keep decoration minimal and avoid the grid pattern by default.

## Shared component/API behaviour
- Preserve current props (`title`, `intro`, `crumbs`, `tone`, `aside`, `meta`, `eyebrow`, `image`, `imagePriority`, `badge`, `chips`) unless there is a clear need to add an optional prop.
- Existing pages must render correctly when the new prop is omitted.
- Do not change the semantics of `title`, breadcrumb links, image alt text or image priority.
- Avoid nested links and invalid HTML.
- Decorative elements must use `aria-hidden="true"`.
- Icons must be hidden from assistive technology when their meaning is already expressed by text.
- Ensure keyboard focus states remain visible on all CTA and breadcrumb links.

## Typography and spacing
- Follow the project's active design tokens and type scale; do not introduce a second competing system.
- Headings should be strong but not shouty. Prefer medium/semibold weights over black/900.
- Paragraphs should remain readable, approximately 16–18px depending on breakpoint.
- Use consistent max-widths and spacing; avoid oversized gaps on mobile.
- Reduce corner radius from exaggerated pill/3xl treatments to restrained rounded-lg/xl where appropriate.
- Shadows should be subtle and limited to image separation or primary interaction surfaces.

## Responsive acceptance checklist
- 360px and 390px mobile: no horizontal scroll, text first, all CTA labels readable, no overlapping image overlays.
- 768px tablet: layout transitions without narrow text columns or giant empty spaces.
- 1024px and 1440px desktop: copy/image proportions balanced; no stretched image or excessively long headline lines.
- Text zoom at 200%: content remains usable.
- Reduced-motion preference: no essential information depends on animation.
- Test with keyboard navigation and visible focus.
