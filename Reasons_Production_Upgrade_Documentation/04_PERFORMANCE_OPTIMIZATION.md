# Performance Optimization Specification

**Goal:** Deliver fast, stable pages on real mobile devices and variable Nepal network conditions while preserving visual quality.

## 1. Performance targets

Use Core Web Vitals field targets at the 75th percentile:
- LCP: ≤ 2.5 seconds.
- INP: ≤ 200 milliseconds.
- CLS: ≤ 0.1.

Lab targets for representative pages:
- Lighthouse Performance: ≥ 90 mobile where feasible.
- Avoid regressions in Accessibility, Best Practices and SEO.
- Record actual values and test environment; never claim a score without a report.

Test at least:
- `/`
- `/contact`
- `/countries/uk`
- `/countries/canada`
- `/ielts`
- `/blog`
- One article page.

Use mobile emulation, throttled network and CPU. Supplement with real-device testing and field data when traffic is sufficient.

## 2. Current image pipeline

`src/components/Photo.tsx` currently emits:
- AVIF source.
- WebP source.
- Responsive `srcset` widths (default 640, 1200, 1920).
- `sizes`.
- Lazy loading for non-priority images.
- Eager loading and high fetch priority when `priority` is true.

This is a good base. `scripts/build-images.mjs` creates image variants. Do not replace this with unoptimized full-size originals.

Actions:
1. Confirm all referenced source photos exist.
2. Inspect generated width and file-size distribution.
3. Ensure `sizes` reflects actual rendered width.
4. Use `priority` only for the actual above-the-fold LCP image.
5. Keep below-the-fold images lazy.
6. Set stable aspect ratios/dimensions.
7. Use focal positioning that works on mobile.
8. Avoid loading a desktop-only image on mobile if a smaller crop is materially cheaper.
9. Remove unreferenced generated variants after verifying no dynamic route uses them.
10. Keep a fallback format if AVIF/WebP is unsupported by the target browser baseline.

## 3. Hero image and video

Current `Hero.tsx` renders `Photo name="hero-counselling"` with `priority`, then a dark overlay. The archive contains `hero-video.mp4`, but the current hero component does not reference it.

Do not add video merely because the asset exists. First confirm that a real, licensed and representative video improves the experience.

If video is approved:
- Provide a compressed MP4/WebM with suitable bitrate and dimensions.
- Use a poster image.
- Do not preload the full video.
- Use muted, playsInline and loop only if autoplay is essential.
- Respect `prefers-reduced-motion`.
- Disable or replace motion for reduced-motion users.
- Keep the headline and CTA in HTML, not baked into video.
- Provide a static fallback when autoplay is unavailable.
- Avoid video on constrained mobile connections if it harms LCP or data usage.

## 4. Fonts

Inspect `src/app/layout.tsx` and `scripts/fonts/`.
- Prefer self-hosted font assets if current build uses remote Google font fetching.
- Subset fonts only when reliable and correctly covering Latin and Devanagari glyphs.
- Set `font-display: swap` or an appropriate strategy.
- Avoid multiple weights that are not used.
- Ensure fallback metrics reduce layout shift.
- Verify Nepali glyph shaping and line height.
- Preload only fonts required for above-the-fold rendering.

## 5. JavaScript and hydration

- Keep static content as Server Components where possible.
- Use `"use client"` only where interaction/state/browser APIs require it.
- Avoid large client-side dependencies for simple UI.
- Load Turnstile only when the form reaches the relevant step and only when configured.
- Lazy-load maps, video players and nonessential embeds.
- Avoid duplicate desktop/mobile content when a CSS layout can solve it.
- Review bundle analyzer output before adding dependencies.
- Keep analytics scripts deferred and consent-aware as required.

## 6. Third-party resources

The project may load Cloudflare Turnstile, Google Maps, external fonts and analytics. For each:
- Document purpose and owner.
- Load only on pages or steps that need it.
- Use async/defer or framework-supported strategies.
- Avoid blocking the first render.
- Provide a useful fallback.
- Confirm CSP allows only required hosts.
- Check privacy/cookie disclosures.

## 7. Static export and hosting

The archive contains `out/` static export and `server.js` serves the `out` directory while handling API/admin routes. Verify the actual production host supports:
- Static asset delivery and compression.
- Express runtime or equivalent API deployment.
- PostgreSQL network access.
- Persistent session configuration.
- Correct proxy headers.
- HTTPS and HSTS.
- Cache headers.
- Correct route fallback and 404 behavior.

Do not assume a static hosting service can run `server.js`. Document the frontend and backend as separate deployment units if required.

## 8. Caching and compression

Configure at the hosting/CDN layer:
- Long-lived immutable cache for content-hashed assets.
- Appropriate cache for generated image assets.
- Revalidation for HTML where the deployment supports it.
- Compression (Brotli/gzip) for HTML, CSS, JS, JSON and SVG.
- No shared caching of personalized admin responses or sensitive API responses.
- Explicit cache policy for sitemap and robots.

## 9. Measurement process

For each target route:
1. Build from a clean checkout.
2. Deploy to a staging environment matching production.
3. Run Lighthouse mobile three times and record median.
4. Capture Web Vitals (LCP, INP, CLS).
5. Inspect waterfall and largest contentful element.
6. Check image bytes and font requests.
7. Check long tasks and unused JS.
8. Test reduced motion.
9. Test a real mid-range Android device on mobile network if available.
10. Save reports and compare against previous baseline.

Do not optimize only for a single Lighthouse run.

## 10. Acceptance criteria

- LCP/INP/CLS targets met in field data when available; lab results documented in the interim.
- Hero image is the intended LCP resource and is not lazy-loaded.
- Below-fold imagery is lazy-loaded.
- No avoidable layout shifts.
- No unneeded video or third-party script delays initial render.
- Responsive image candidates are actually selected.
- Fonts load without visible text blocking or major layout shift.
- Compressed static assets are served with correct cache headers.
- Performance budgets are enforced in CI or release QA.
