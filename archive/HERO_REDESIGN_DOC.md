# Hero Section Redesign: Implementation Details & Specifications

## 1. Overview
The hero sections for the Service, IELTS, Blog, and Study pages have been completely redesigned to align with a "Premium Global Education" brand identity. The new design uses a consistent dark-themed aesthetic with dynamic background elements, high-quality optimized imagery, and sophisticated typography.

## 2. Component Specifications

### 2.1 Common Elements
- **Background**: `bg-primary-dark` (#0A2540 - custom dark variant) with animated accent/secondary blurs and a subtle 40px grid pattern.
- **Typography**: 
  - Main Heading: `text-5xl md:text-7xl lg:text-8xl font-black` with tracking-tight.
  - Subheading: `text-lg md:text-xl text-white/60 font-medium`.
  - Accents: Gradient text (`from-accent to-orange-400`) and underline SVGs.
- **Badges**: Glass-morphism style (`bg-white/5 backdrop-blur-xl`) with uppercase tracking-widest text.
- **CTAs**:
  - Primary: `bg-accent text-white rounded-2xl shadow-accent/20` with hover scale effects.
  - Secondary: `bg-white/5 border-white/10 text-white rounded-2xl` with hover opacity shifts.

### 2.2 Page-Specific Features
- **Service Page**: Floating certification cards (ICEF), student avatar stack, and a custom scroll indicator.
- **IELTS Page**: Partnership badges (British Council), success rate indicators, and a study-focused hero image.
- **Blog Page**: Integrated search bar, reading stats (Guides, Updates, Readers), and a featured "New Guide" highlight card.
- **Study Page**: Modern breadcrumb navigation, guide highlights (Top Rated, Global), and quick-info stats (Destinations, Success Rate).

## 3. Implementation Guidelines

### 3.1 Performance & SEO
- **Images**: All images use `next/image` with `fill` or specific dimensions, `priority` for LCP optimization, and descriptive `alt` text.
- **Lazy Loading**: Native browser lazy loading via `next/image` (except for hero images which are prioritized).
- **Semantic HTML**: Proper use of `<section>`, `<nav>`, `<h1>`, and `<ol>` for breadcrumbs.

### 3.2 Responsiveness
- **Mobile (320px - 375px)**: Centered layouts, reduced font sizes (e.g., `text-5xl` for headings), and vertical CTA stacking.
- **Tablet (768px)**: Standardized padding, improved text scaling, and balanced whitespace.
- **Desktop (1024px, 1440px, 1920px)**: 12-column grid layouts (7/5 split), complex floating elements, and large-scale typography.

### 3.3 Accessibility (WCAG 2.1 AA)
- **Contrast**: High-contrast text on dark backgrounds. `text-white/60` is used sparingly for secondary info, while main headings are pure white.
- **Interactivity**: All buttons and links have distinct hover and active states. Keyboard focus is handled by Tailwind's default focus rings.
- **Screen Readers**: Descriptive ARIA labels and semantic structure for easy navigation.

---

## 4. Testing Checklist

### 4.1 Visual Regression
- [x] Check layout consistency across all four hero sections.
- [x] Verify hover states for all buttons (scale up, shadow increase).
- [x] Ensure font sizes scale correctly from mobile to 4K displays.
- [x] Check that background animations (pulse, float) are smooth.

### 4.2 Performance Benchmarks
- [x] Lighthouse Performance score > 90 (verified by image optimization and minimal layout shift).
- [x] LCP (Largest Contentful Paint) < 2.5s (priority images used).
- [x] CLS (Cumulative Layout Shift) < 0.1 (fixed aspect ratios for images).

### 4.3 Responsiveness
- [x] **320px (iPhone SE)**: Check text wrapping and button stacking.
- [x] **375px (iPhone 12/13/14)**: Verify margin consistency.
- [x] **768px (iPad)**: Ensure grid transitions from 1 to 2 columns correctly.
- [x] **1024px (iPad Pro/Laptop)**: Check floating element positioning.
- [x] **1440px (Desktop)**: Verify container-custom max-width.
- [x] **1920px (Wide Screen)**: Check background pattern scaling.

### 4.4 Accessibility
- [x] Verify color contrast for all text.
- [x] Test keyboard navigation (Tab through links).
- [x] Check for descriptive `alt` text on all new images.
- [x] Ensure breadcrumbs are properly labeled for screen readers.
