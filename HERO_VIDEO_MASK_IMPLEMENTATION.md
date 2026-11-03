# Reasons Education — Smooth Hero Video Mask & Left-Side Text
**Implementation specification for the existing Next.js project**

## 1. Goal

Improve the home page hero in `src/components/Hero.tsx` by replacing the current framed, static portrait image with a smoothly masked video treatment, while keeping the main headline, supporting copy, and calls to action on the **left side**.

The result should feel editorial, premium, human, and professional—not like a generic AI-generated landing page. Preserve Reasons Education's existing brand voice, typography, content, CTA destinations, and current site design system.

## 2. Existing implementation analysis

The home page (`src/app/page.tsx`) renders `<Hero />` as its first section. The hero component currently uses:

- A paper-background section with a subtle bottom border.
- A 12-column desktop grid: text on the left (`lg:col-span-6`) and a portrait image on the right (`lg:col-span-6`).
- Headline: “Study abroad, planned one step at a time.”
- Supporting copy about course/country selection, applications, IELTS/PTE, and visa documents.
- Primary “Book a free counselling session” CTA and secondary phone CTA.
- A four-item proof list beneath the copy.
- `next/image` to display `/images/hero/photos/home-hero.jpg` in a rounded frame.

### Main limitations for the requested treatment

1. The right media is a static image, so it has no natural motion or cinematic depth.
2. The rounded card and shadow make the visual feel like a standalone image tile rather than a hero-integrated media composition.
3. The current layout is already correctly ordered with text first. Keep that behavior; do not move the video ahead of the message on mobile.
4. The video must not compromise the text contrast, loading speed, accessibility, or existing SEO and CTA behavior.

## 3. Target visual direction

### Desktop composition

- Keep a two-column layout inside the existing `container-custom`.
- Left: eyebrow, headline, short paragraph, primary CTA, secondary call/counselling action, and concise proof points.
- Right: a large 16:10 or 4:5 video composition with a soft organic mask—prefer a **wide asymmetric arch / rounded vertical cut** rather than a generic rounded rectangle.
- Use a clean paper/white background and the site's existing brand colors. Do not add unrelated colors, neon effects, animated gradients, floating blobs, or decorative particles.
- Let the video occupy approximately 45–50% of the content width. Keep the headline as the visual priority.
- Add a subtle edge treatment only if it supports the brand; avoid heavy shadows and stacked cards.

### Video masking

Use CSS `clip-path` or a carefully tested border-radius treatment to create the mask. Prefer a graceful arch-like shape that feels intentional and stable across browsers. Do not use an SVG filter mask unless there is a strong reason; it adds complexity without improving the core effect.

Recommended starting shape (adjust visually after testing):

```css
.hero-video-mask {
  overflow: hidden;
  border-radius: 48% 48% 18px 18px / 34% 34% 18px 18px;
  isolation: isolate;
}
```

If the shape clips important faces, reduce the curve or use a standard large-radius crop. The subject's face and meaningful action must remain visible.

### Video overlay

- Add a restrained overlay on top of the video for tonal consistency, using the existing dark/navy brand tone with low opacity.
- The overlay must not obscure the footage or make it look like a dark filter preset.
- Do not place text over the video in this version; the headline and supporting copy remain on the **left**.
- Optional tiny caption/label on the media is allowed only if it adds real information and remains secondary.

## 4. Content and layout rules

Retain the current content unless a content change is separately approved:

- Eyebrow: `Education consultancy · New Baneshwor, Kathmandu`
- Headline: `Study abroad, planned one step at a time.`
- Supporting copy: keep the existing approved wording.
- Primary CTA: `Book a free counselling session` → `/contact`
- Secondary CTA: preserve the current phone link generated from `company.phoneTel`.
- Proof list: keep the existing four proof items and icon labels.

Do not invent new rankings, placement statistics, visa success rates, university partnerships, or student counts. Keep the registration details conditional on actual company data, as the component currently does.

## 5. Video asset requirements

Use a real, rights-cleared video that reflects the service: a counsellor speaking with a student, a natural consultation, students discussing plans, or authentic campus/education footage. Avoid synthetic-looking faces, exaggerated reactions, overly staged stock footage, or visuals implying guaranteed admission/visa outcomes.

Recommended deliverables:

- Primary: `public/videos/reasons-hero.webm`
- Fallback: `public/videos/reasons-hero.mp4`
- Poster: `public/images/hero/photos/home-hero-poster.webp`
- Prefer 1920×1080 or 1440×900 source, then optimize for actual display size.
- Aim for a short, seamless loop (roughly 6–12 seconds) with no abrupt cut.
- Compress the files; target a small web-friendly file rather than shipping a huge source video.
- No audio is needed in the hero. The video should be muted and decorative.

If a suitable real video is not ready, retain the current image as the poster/fallback. Do not ship a blank or broken media area.

## 6. Implementation plan

### Step 1 — Update `src/components/Hero.tsx`

Keep this as the single source of truth for the home hero. Replace the static `<Image>` media block with a semantic `<video>` element and a poster image.

Recommended structure:

```tsx
<div className="hero-media">
  <div className="hero-video-mask">
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero/photos/home-hero-poster.webp"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/videos/reasons-hero.webm" type="video/webm" />
      <source src="/videos/reasons-hero.mp4" type="video/mp4" />
    </video>
    <div className="hero-video-overlay" aria-hidden="true" />
  </div>
</div>
```

Implementation notes:

- Do not add `controls` for this decorative hero video.
- Keep `muted` and `playsInline` so autoplay works on supported mobile browsers.
- `preload="metadata"` limits unnecessary eager downloading. Do not preload multiple large videos.
- Keep the poster file lightweight so the hero looks complete before playback starts.
- Keep the existing copy, links, icons, and proof list intact.
- Preserve a meaningful accessible heading and normal keyboard access to both CTAs.
- If the video is purely decorative, `aria-hidden="true"` and `tabIndex={-1}` are appropriate. Do not put essential information only in the footage.

### Step 2 — Add scoped styles

Add styles in the project's existing global stylesheet or component styling convention. First inspect the repository for its current stylesheet location and Tailwind setup; do not create a competing styling system. Prefer scoped class names such as `hero-media`, `hero-video-mask`, `hero-video`, and `hero-video-overlay`.

Suggested baseline:

```css
.hero-media {
  position: relative;
  width: 100%;
  max-width: 38rem;
  margin-inline: auto;
}

.hero-video-mask {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  aspect-ratio: 4 / 5;
  border-radius: 48% 48% 18px 18px / 34% 34% 18px 18px;
  background: var(--hero-media-fallback, #e9edf2);
}

.hero-video {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
}

.hero-video-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: rgba(15, 31, 55, 0.10);
}
```

These values are a starting point, not a mandate. Use the project's existing design tokens where available instead of introducing new brand colors or hardcoding a color that conflicts with the theme. Test the crop against the actual video before finalizing `object-position`.

### Step 3 — Preserve desktop balance

- Keep the current `lg:grid-cols-12` layout or an equivalent responsive grid.
- Ensure the left copy does not become too narrow when the media mask is applied.
- Avoid excessive vertical whitespace above the eyebrow.
- Align the visual center of the video with the headline/CTA group, not with the proof list alone.
- Do not add a second hero heading or duplicate the hero content elsewhere.

### Step 4 — Mobile behavior

At mobile widths:

- Keep content order: **text and CTAs first, video second**.
- Use a reasonable video height and avoid forcing a tall crop that pushes all meaningful content too far down.
- Reduce the mask curve if it cuts off the subject or wastes too much visible footage.
- Make both CTAs comfortably tappable and preserve their current full-width/small-screen behavior.
- Ensure the video never causes horizontal overflow.
- Consider `prefers-reduced-motion`: show the poster instead of autoplaying when the user requests reduced motion.

Example reduced-motion CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-video {
    /* CSS cannot reliably pause all video playback; also disable autoplay
       in the component when reduced motion is detected. */
    animation: none;
  }
}
```

For a complete solution, use a small client-side media wrapper that checks `window.matchMedia("(prefers-reduced-motion: reduce)")` and pauses playback when motion reduction is enabled. Keep that logic isolated rather than converting the entire page into a client component. If the team prefers no client JavaScript, use the poster-only image for all users instead of autoplay.

### Step 5 — Performance and failure handling

- Avoid importing a large video-processing library.
- Keep the video local in `public/` unless the project already uses a managed video CDN.
- Use `poster` so there is no empty frame while loading.
- Verify MP4 playback in Safari/iOS and WebM/MP4 fallback behavior in Chrome/Firefox.
- If video playback fails, the poster must still provide a polished visual.
- Avoid loading multiple video variants simultaneously beyond browser source selection.
- Check the final production bundle and page network requests for excessive media size.

## 7. Accessibility and UX checklist

- [ ] The page has one clear primary `<h1>`.
- [ ] Video is muted, decorative, and does not communicate essential information.
- [ ] Poster is visible before video playback and when video is unsupported.
- [ ] Reduced-motion preference is respected by pausing or disabling autoplay.
- [ ] Text and CTA contrast remain strong.
- [ ] CTA links remain keyboard accessible and retain their original destinations.
- [ ] No flashing, rapid cuts, audio, or aggressive zooming.
- [ ] No layout shift when the video loads; the media container has a fixed aspect ratio.
- [ ] Mobile users see the message before the media.

## 8. Do not change

This task is a focused hero enhancement, not a full redesign. Do **not**:

- Redesign the navbar, footer, or sections below the hero.
- Change global typography, the site's palette, or unrelated card/button styles.
- Replace the current headline or rewrite the whole homepage.
- Remove the proof list, contact CTA, registration condition, SEO metadata, or existing links.
- Add a carousel, multiple video slides, floating badges, particle effects, gradient blobs, or scroll-jacking.
- change other `PageHero` instances on About, Services, Countries, or Blog pages. The homepage uses `src/components/Hero.tsx`; scope this task to that component only.

## 9. Verification before merging

Run the project's existing lint, type-check, and build commands from `package.json`. Do not guess or add new scripts before inspecting the available scripts.

Test at minimum:

1. Desktop at 1440px and 1280px.
2. Tablet around 768px.
3. Mobile around 390px and 360px.
4. Slow network: poster appears and layout remains stable.
5. Reduced-motion enabled.
6. Video source unavailable: poster remains visible.
7. Safari/iOS and Chromium playback.
8. CTA destinations and phone link remain unchanged.
9. No console errors, hydration mismatch, or horizontal overflow.
10. Hero still feels balanced with the actual footage, not just a placeholder.

## 10. Acceptance criteria

The implementation is complete when:

- The hero has a smooth, restrained masked video on the right and readable text on the left.
- The motion feels natural and loops without an obvious jump.
- The current Reasons Education messaging, CTA links, and proof points are preserved.
- The design remains responsive and visually consistent with the existing site.
- A poster fallback, reduced-motion handling, and accessible decorative-video semantics are in place.
- No unrelated page or component is changed.

## Suggested coding-agent prompt

> Read `HERO_VIDEO_MASK_IMPLEMENTATION.md` fully and inspect the existing project before editing. Implement the requested masked video only in `src/components/Hero.tsx` and the minimum scoped styles/client helper required. Preserve all current Reasons Education hero text, CTA destinations, proof items, brand tokens, SEO behavior, and responsive content order. Do not redesign other sections or `PageHero` pages. Use a local video with WebM/MP4 sources and a poster fallback; account for reduced motion and video failure. If the final video asset is absent, keep the current image as a graceful fallback rather than inventing an asset. Run the existing lint/type-check/build scripts and report the exact files changed and any remaining asset requirements.
