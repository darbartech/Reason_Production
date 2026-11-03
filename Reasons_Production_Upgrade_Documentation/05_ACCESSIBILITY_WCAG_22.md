# Accessibility Specification — WCAG 2.2 AA

**Goal:** Make the public website and enquiry flow usable by keyboard, screen-reader, low-vision and reduced-motion users. This document is an implementation target, not a claim of certification.

## 1. Standard and scope

Target WCAG 2.2 Level AA for:
- Public pages.
- Navigation and dropdowns.
- Forms and validation.
- Eligibility quiz.
- Enquiry success/error states.
- Mobile action bar.
- Dialogs/accordions.
- Admin pages where applicable.

Use WCAG 2.2 AA as the target and document any exception. A tool scan alone does not prove conformance.

## 2. Existing positive patterns to preserve

The source includes:
- Skip-to-content link (verify placement and focus visibility).
- Semantic landmarks.
- Mobile menu keyboard handling and focus management.
- Form labels and validation attributes.
- Status announcements.
- Reduced-motion CSS.
- Descriptive image alt text.
- Empty alt for decorative hero image.

Re-test these patterns after every UI refactor.

## 3. Perceivable content

### Contrast
Meet minimum contrast:
- Normal text: 4.5:1.
- Large text: 3:1.
- UI components and meaningful graphical objects: 3:1 where required.

Test muted text, button states, overlays, footer, placeholder text, errors and focus indicators. Do not rely on color alone to communicate status.

### Text and zoom
- Support browser zoom to 200% without loss of content/function.
- Reflow at 320 CSS pixels without two-dimensional scrolling except content that inherently requires it.
- Use relative units and flexible containers.
- Avoid fixed heights for text-heavy sections.
- Ensure Nepali/Devanagari text does not clip.

### Images and media
- Informative images need meaningful alt text.
- Decorative images use empty alt.
- Do not include essential text only inside images/video.
- Provide captions/transcripts for meaningful video/audio.
- Avoid autoplay audio.
- Respect reduced motion.

## 4. Operable controls

- All functionality must be keyboard operable.
- Focus order must follow visual/semantic order.
- Focus must be visible.
- Sticky headers/action bars must not obscure focused controls.
- No keyboard trap.
- Menus must open/close with predictable keys.
- Escape closes dismissible overlays.
- Focus returns to the invoking control after closing a modal/drawer.
- Touch targets should meet WCAG 2.2 target-size requirements or documented spacing exceptions.
- Avoid hover-only interactions.

Test with Tab, Shift+Tab, Enter, Space, Escape and arrow keys where appropriate.

## 5. Understandable structure

- One descriptive H1 per page.
- Heading levels follow a logical hierarchy.
- Links describe destination/purpose.
- Buttons describe actions.
- Navigation landmarks have distinct labels if multiple exist.
- Page language is declared correctly.
- Nepali content uses `lang="ne"` where appropriate.
- Form instructions are presented before submission.
- Error messages explain how to fix the problem.

The current `Hero.tsx` places an H3-style callback card heading before the next H2 section in the source flow. Recheck the final heading outline and adjust the heading level based on the document structure, not visual size.

## 6. Enquiry form requirements

Relevant files:
- `src/components/enquiry/EnquiryForm.tsx`
- `src/components/enquiry/PersonalStudyStep.tsx`
- `src/components/enquiry/AcademicProfileStep.tsx`
- `src/components/enquiry/EnquirySuccess.tsx`
- `src/lib/validations/enquiry.ts`
- `src/lib/validations/contact.ts`
- `src/components/CallbackCard.tsx`

Requirements:
- Every input has a persistent programmatic label.
- Required fields are clearly marked in text.
- Instructions and accepted formats are available before input.
- Errors are associated with fields using `aria-describedby`.
- Invalid fields use `aria-invalid`.
- On failed submit, focus moves to the first invalid field or a clear error summary.
- Multi-step transitions announce the new step and progress.
- Back navigation preserves entered data.
- Success/failure is announced to assistive technology.
- Loading and disabled states are communicated.
- CAPTCHA has an accessible alternative/support path.
- Privacy information is linked near submit.
- Do not use placeholder text as the only label.

## 7. Motion and interaction

- Respect `prefers-reduced-motion`.
- Avoid parallax and continuous decorative motion.
- Do not flash content.
- Provide pause/stop controls for any nonessential motion that meets relevant thresholds.
- Avoid scroll-jacking.
- Keep focus stable when content expands/collapses.

## 8. Test matrix

Automated:
- axe-core or axe DevTools.
- Lighthouse accessibility.
- HTML validation.

Manual:
- Keyboard-only navigation.
- NVDA with Firefox/Chrome on Windows.
- VoiceOver on iOS if available.
- Browser zoom 200% and 400%.
- 320px reflow.
- High contrast/forced colors where possible.
- Reduced motion.
- Form error and success paths.
- Mobile menu and sticky action bar.

Pages:
- Home.
- Contact.
- UK country page.
- IELTS.
- FAQ.
- Blog article.
- Eligibility quiz.
- Admin login and enquiry view.

## 9. Acceptance criteria

- No critical/serious axe violations on target pages without documented remediation.
- All interactive flows complete by keyboard.
- Focus is visible and never obscured.
- Text and controls meet contrast requirements.
- Forms announce errors and success correctly.
- 320px reflow has no avoidable horizontal scrolling.
- Screen-reader labels and heading outline make sense.
- Reduced-motion mode removes nonessential motion.
- QA report records browser, assistive technology, viewport and date.

## 10. Important note

Accessibility is continuous quality work. Do not claim “WCAG certified” or “fully accessible” solely because Lighthouse or axe reports no violations.
