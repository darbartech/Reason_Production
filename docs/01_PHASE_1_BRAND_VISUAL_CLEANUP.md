# Phase 1 — Brand & Visual Cleanup

## Objective

Make the existing Reason website look more professional and intentional while changing only the visual system that actually needs improvement.

This is a **controlled visual cleanup**, not a complete redesign.

## Primary goal

Move away from:

- excessive gradients,
- generic AI-generated SaaS styling,
- inconsistent accent colors,
- excessive rounded cards,
- oversized typography,
- decorative visual noise.

Move toward:

- flat professional surfaces,
- strong navy foundation,
- blue/cyan educational accents,
- restrained crimson,
- consistent spacing,
- simple borders,
- readable typography,
- real photography.

## Brand palette

Use these as the new preferred tokens:

```text
Deep Navy       #071A33
Secondary Navy  #0D2A4A
Education Blue  #087EA4
Cyan            #18A9C7
Crimson         #B8324A
Light BG        #F6F9FC
White           #FFFFFF
Text            #162436
Muted Text      #64748B
Border          #E2E8F0
```

Do not create additional arbitrary colors unless accessibility requires a derived tint/shade.

## Gradient rule

Target:

```text
0 decorative gradients
```

A gradient is allowed only when it is strictly necessary for text legibility over photography.

Preferred overlay:

```text
black with controlled opacity → transparent
```

Do NOT use:

- navy-to-cyan decorative gradients,
- cyan-to-crimson gradients,
- gradient buttons,
- gradient cards,
- gradient text,
- glowing gradient backgrounds.

## Logo

Keep the existing logo exactly as supplied.

Do not:

- recolor,
- filter,
- invert,
- stretch,
- redraw,
- simplify.

If the current implementation uses CSS such as `brightness-0 invert` on the original logo, replace that behavior with a layout that allows the original logo to remain visible.

## Typography

Do not replace every font blindly.

Inspect the existing font implementation first.

Preferred direction:

- readable modern sans-serif for body text,
- optional restrained editorial serif for selected headings only,
- no excessive `font-black`,
- no oversized headings on every section.

Interior page headings should generally use 600–700 weight.

Reserve very heavy weight for limited hero emphasis.

## Components to inspect first

Only modify where needed:

```text
src/app/layout.tsx
src/styles/globals.css
tailwind.config.ts
src/components/Navbar.tsx
src/components/Footer.tsx
src/components/Hero.tsx
src/components/CTA.tsx
src/components/TrustIndicators.tsx
src/components/ServicesOverview.tsx
src/components/StudyDestinations.tsx
src/components/CountryCard.tsx
```

Do not automatically rewrite every component.

## Navigation

Preferred:

- white/light header on normal pages,
- original logo visible,
- simple dark text,
- one strong primary CTA,
- subtle border/shadow,
- clean mobile menu.

Primary CTA example:

```text
Get Free Study Assessment
```

Secondary CTA:

```text
Talk to a Counselor
```

## Buttons

Use flat fills.

Primary:

```text
Deep Navy
```

Hover:

```text
Education Blue
```

Secondary:

```text
White / transparent
border: Deep Navy
```

Crimson should not become the default button color.

## Cards

Use:

```text
border: #E2E8F0
background: white
border-radius: 12–16px
subtle shadow only where needed
```

Avoid:

- giant rounded cards,
- floating decorative shapes,
- colored card backgrounds,
- gradient cards.

## Hero

Do not completely replace the existing hero unless its structure is genuinely broken.

Improve:

- hierarchy,
- spacing,
- CTA wording,
- typography,
- image treatment,
- contrast.

Preferred CTA:

```text
Get My Free Study Assessment
```

Secondary:

```text
Explore Destinations
```

## Homepage conversion changes

Where existing generic CTAs say:

```text
Contact Us
```

consider targeted wording where context supports it:

```text
Get My Free Study Assessment
Check My Eligibility
Talk to a Counselor
Get My Study Options
```

Do not replace every CTA mechanically.

## Acceptance checklist

- [ ] Existing logo remains unchanged.
- [ ] No decorative gradients remain.
- [ ] No rainbow feature-card colors remain.
- [ ] No new AI-generated decorative shapes were introduced.
- [ ] Existing routes still work.
- [ ] Existing page content remains intact.
- [ ] Navbar remains responsive.
- [ ] Footer remains responsive.
- [ ] Mobile layout checked.
- [ ] Build/type check passes.
- [ ] Only necessary files were changed.

## AI implementation instruction

> Inspect the existing project first. Implement only Phase 1. Make targeted edits instead of rewriting components. Preserve existing routes, content, SEO and functionality. Remove unnecessary gradients and inconsistent colors. Use the Reason logo exactly as supplied. Do not introduce generic AI/SaaS visual patterns. Do not proceed to enquiry forms, database or admin work in this phase.
