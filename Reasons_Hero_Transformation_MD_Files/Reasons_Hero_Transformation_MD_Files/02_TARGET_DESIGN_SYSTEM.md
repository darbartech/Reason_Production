# 02 — Target Hero Design System

## Objective

Make the Reasons Education website feel like a mature, premium, trustworthy consultancy. Prioritize clear communication, real photography, excellent typography, strong spacing, and conversion clarity over decorative effects.

## Design principles

1. **One hero, one message.** The heading must explain the page purpose or value proposition.
2. **One primary action.** Use one visually dominant CTA; a secondary action must remain secondary.
3. **One visual focal point.** Prefer a single relevant photo or editorial composition over multiple floating cards and ornaments.
4. **Evidence over decoration.** Trust cues must be factual and useful.
5. **Page-specific rhythm.** Share tokens and components, but do not force every route into the same layout.
6. **Content first.** Never rewrite factual copy just to make it shorter without checking meaning.
7. **Responsive by design.** Mobile is a deliberate composition, not a compressed desktop.

## Visual language

### Color
- Reuse the existing approved Reasons tokens as the source of truth.
- Use a quiet, mostly solid surface: white or existing paper neutral.
- Use the existing primary/navy token for headings and important structure.
- Keep the established accent color for purposeful actions and small emphasis.
- Avoid introducing new brand colors, random gradients, multicolor glows, or gradient text.
- Before changing the crimson accent, verify official brand guidelines and inspect all usages. Scope hero-specific changes to hero classes rather than changing global buttons or every site accent.

### Typography
- Use the existing project font families and scale unless there is a documented reason to change.
- Desktop headline target: approximately `clamp(2.5rem, 4.2vw, 4.75rem)` with a controlled line length around 10–15 words / 12–16 characters per line where copy allows.
- Tablet headline: approximately 2.5–3.5rem.
- Mobile headline: approximately 2.15–2.8rem; avoid oversized headlines that push the CTA below the fold.
- Keep headline line-height tight but readable (around 1.02–1.12).
- Body copy should remain comfortably readable, ideally 16–19px on desktop and at least 16px on mobile.
- Do not use italic accent styling by default for every page title. Emphasis should be intentional and accessible.

### Layout and spacing
- Use a consistent max-width container already defined by `.container-custom`.
- Desktop split layout: text around 52–56%, media around 44–48%; use a stable 12-column grid or equivalent.
- Align copy and image around a deliberate baseline, not automatically at the bottom if it creates awkward whitespace.
- Use generous but controlled spacing; do not make the hero so tall that the page content disappears below the first viewport.
- Prefer one clean border or one tonal surface change over several stacked visual effects.
- Avoid unnecessary rounded rectangles. Keep border radius consistent with the existing design language.

### Photography
- Prefer authentic, licensed photography that represents the actual audience and service.
- Do not replace existing approved images unless the current image is demonstrably poor or mismatched.
- Use a consistent art direction: natural light, believable expressions, realistic environments, restrained color grading.
- Avoid overly posed stock imagery, AI-looking faces, collage compositions, artificial glow, and photos with baked-in text.
- Define focal position per image when necessary. Test crops at mobile and desktop breakpoints.
- Keep useful `alt` text; use empty alt only for genuinely decorative images.

## Hero component families

### A. `HomeHero`
Purpose: explain Reasons Education and guide visitors to a consultation.
- Eyebrow: concise service/market context.
- H1: clear student-centered value proposition.
- Body: one short paragraph.
- Primary CTA: consultation/enquiry path.
- Secondary CTA: phone or destinations/services.
- Optional proof row: maximum 3–4 genuine facts, not a collection of cards.
- Media: one relevant image with no more than one small factual overlay; remove decorative overlays if they do not improve comprehension.

### B. `SplitPageHero`
Purpose: About, Study Abroad, B2B, and key destination/service landing pages.
- Left: breadcrumb (if useful), eyebrow, H1, body, CTA(s), optional 1–3 proof points.
- Right: one image with carefully managed crop.
- Avoid stacking image badge + chips + floating cards + glows simultaneously.
- Use dark tone only when it improves the page's story and text contrast.

### C. `EditorialHero`
Purpose: FAQ, general information, service index, legal pages, and selected content pages.
- Text-led layout, strong title, narrow introduction, optional functional control.
- Do not add a large empty image column when no image is required.
- Use clear top and bottom spacing and a quiet surface.

### D. `UtilityHero`
Purpose: Contact and FAQ search.
- Short heading and introduction.
- Place the key action or search field near the title.
- Prioritize reaching the actual form, office information, or FAQ results quickly.
- Do not use marketing proof pills if they distract from the task.

### E. `ArticleHero`
Purpose: blog article.
- Category, article title, date/author metadata.
- Keep title width readable and metadata visually secondary.
- The article image may remain below the hero if that produces a cleaner editorial composition.
- Avoid generic sales CTAs in the article title block.

### F. `LegalHero`
Purpose: privacy and terms.
- Simple title, brief description, optional breadcrumb.
- Minimal height and no marketing chips, badge, large photo, or animated decoration.

## Interaction and animation

- Prefer static, polished layout; motion is optional.
- If used, animate only small opacity/translate changes and avoid large parallax or floating loops.
- Respect `prefers-reduced-motion`.
- Do not introduce animation libraries if the project does not already need them.
- All CTA buttons must navigate to existing routes or real anchors.
- Ensure focus-visible, keyboard operation, semantic heading structure, and adequate contrast.

## Responsive acceptance rules

### Desktop (1440px / 1280px)
- Main headline, body, and primary CTA are visible in the first viewport where practical.
- Image and text have balanced visual weight.
- No decorative item competes with the H1.
- Avoid unnecessarily tall 4:5 images if the text block is much shorter.

### Tablet (1024px / 768px)
- Columns collapse at a sensible breakpoint before they become cramped.
- CTA buttons wrap naturally without awkward spacing.
- Image remains useful, not a giant block pushing all content down.

### Mobile (390px / 360px)
- Copy precedes media unless there is a strong page-specific reason otherwise.
- H1 does not overflow or create single-word orphan lines.
- Primary CTA is visible and tappable; buttons should have at least 44px target height.
- Chips wrap without horizontal scrolling.
- Floating badge/card is hidden or repositioned if it overlaps the image or text.
- No horizontal overflow.

## Explicit anti-patterns

Do not add:
- multiple gradients or blurred color blobs;
- glassmorphism or translucent floating dashboards;
- arbitrary decorative rings, grids, arches, sparkles, or blobs;
- many pills below every heading;
- fake statistics, reviews, accreditation logos, or visa success claims;
- oversized headings that overwhelm the message;
- repeated identical hero layouts on every route;
- new dependencies without justification;
- global CSS changes that unexpectedly alter unrelated page sections.
