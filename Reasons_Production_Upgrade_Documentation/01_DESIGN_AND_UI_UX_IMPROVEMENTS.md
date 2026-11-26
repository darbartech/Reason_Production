# Design & UI/UX Improvements

**Scope:** Public-facing Reasons Education website.  
**Primary audience:** Students and families in Nepal researching overseas education, especially UK study options.  
**Goal:** Improve clarity, confidence and enquiry conversion without replacing the current design system or creating an unrelated visual identity.

## 1. Design principles

- Professional, calm, trustworthy and student-centred.
- Use a consistent typographic hierarchy and spacing scale.
- Avoid generic AI-looking gradients, excessive glass effects, decorative animations and stock-template layouts.
- Prefer authentic office, counsellor and student photography with documented permissions.
- Keep one dominant action per section.
- Make mobile usability a first-class requirement.
- Maintain consistent English and Nepali typography, spacing and language metadata.

## 2. Existing implementation to preserve

Relevant components:
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/CallbackCard.tsx`
- `src/components/Photo.tsx`
- `src/components/CountryCard.tsx`
- `src/components/StudyDestinations.tsx`
- `src/components/ServicesOverview.tsx`
- `src/components/Process.tsx`
- `src/components/TrustIndicators.tsx`
- `src/components/CredentialsStrip.tsx`
- `src/components/OfficeBlock.tsx`
- `src/components/Testimonials.tsx`
- `src/components/StudentStories.tsx`
- `src/components/CTA.tsx`
- `src/components/CtaBand.tsx`
- `src/components/MobileActionBar.tsx`
- `src/components/Footer.tsx`
- `src/styles/globals.css`

The current `Hero.tsx` uses a priority hero photo, dark overlay, H1, free-session CTA, eligibility CTA, trust text and a desktop-only `CallbackCard`. Retain the structure unless measured testing shows a better arrangement.

## 3. Recommended homepage hierarchy

1. Header / primary navigation.
2. Hero: concise value proposition, one primary CTA, one secondary CTA.
3. Verifiable trust strip: location, years operating only if substantiated, verified licence if applicable.
4. Study destinations.
5. Services and who each service is for.
6. Simple counselling/application journey.
7. Real team and office proof.
8. Verified student stories, only after written consent.
9. Useful country / admission guides.
10. FAQs.
11. Final enquiry CTA and complete footer.

Avoid repeating the same trust claim or service explanation in multiple sections. Each section should answer a distinct student question.

## 4. Hero improvements

Current source text:
- Eyebrow: “Education consultancy · New Baneshwor, Kathmandu”
- H1: “Study abroad counselling in Kathmandu”
- Supporting copy: “Honest advice on courses, costs and visas — with IELTS & PTE classes in the same office.”
- Primary CTA: “Book a free session”
- Secondary CTA: “Check your eligibility”

Actions:
- Keep one H1 only.
- Confirm the “free” offer and any conditions before publishing.
- Keep CTA labels consistent across pages.
- Do not put an unverified licence claim in the hero trust line.
- Ensure text contrast remains sufficient over every responsive crop.
- Test the callback card against the primary CTA; on small screens avoid presenting multiple competing forms.
- If a hero video is introduced, follow the performance document and retain a static poster fallback.

## 5. Navigation and page consistency

Audit `Navbar.tsx`, `Footer.tsx` and every page opener. Normalize:
- Navigation labels and ordering.
- Active-page indication.
- Dropdown behavior and keyboard support.
- CTA label and destination.
- Breadcrumb placement on deep pages.
- Footer contact details and legal links.

The previous baseline identified inconsistent hand-written buttons and section openers on Study Abroad, IELTS, B2B and Services. Recheck current files and consolidate only where it reduces inconsistency without making components overly generic.

## 6. Destination cards and pages

Country cards should help users compare, not merely advertise. Use consistent fields:
- Destination name.
- One-sentence suitability summary.
- Study levels / programme types where confirmed.
- Typical tuition and living-cost ranges only when sourced, dated and caveated.
- Intake availability only when current.
- Clear “Explore [country]” action.

Do not place visa approval guarantees, fixed work-rights promises or unqualified post-study promises on cards.

## 7. Trust and team presentation

`src/content/team.ts` currently has five named team entries with roles, while biography, photos, qualifications, specialisations and languages are optional and owner-supplied.

- Add a real photograph only with permission.
- Add qualifications and experience only after verification.
- Do not generate fictional bios or headshots.
- If information is unavailable, show a concise role card rather than a fabricated profile.
- Avoid “work in progress” language on a production page; either complete the section or hide it until ready.

`src/content/testimonials.ts` currently sets consent to `false`. Preserve this gate. Do not set `consent: true` without a signed consent record retained by the business. Validate the identity/outcome claims before publishing.

## 8. Mobile UX

Test these viewport widths:
`320, 360, 375, 390, 430, 768, 834, 1024, 1280, 1440, 1920, 2560`.

Check:
- No horizontal overflow.
- No clipped text or controls.
- Navigation opens, closes and restores focus.
- Mobile action bar does not cover form submit controls or cookie notices.
- Phone and WhatsApp links are tappable.
- Country cards do not create duplicated screen-reader content if desktop/mobile variants are both rendered.
- Forms do not cause unwanted zoom or layout jumps.
- Sticky elements do not consume excessive vertical space.

## 9. Design tokens and component rules

Inspect `src/styles/globals.css` before adding tokens. Maintain existing brand colors unless the owner approves a change. Centralize:
- Primary / secondary / text / muted / border colors.
- Heading/body font families.
- Spacing scale.
- Border radii.
- Container widths.
- Focus ring.
- Button sizes and states.
- Surface elevations.

Do not scatter new hex values through components. Avoid one-off inline styling except for dynamic image positioning or similarly justified values.

## 10. Interaction requirements

Every interactive element must:
- Be a semantic link or button.
- Have a clear accessible name.
- Have visible hover, focus, active and disabled states.
- Work using keyboard only.
- Avoid hover-only information.
- Provide feedback for loading, success and failure.
- Avoid accidental double submission.

## 11. Acceptance criteria

- One coherent design system across all public pages.
- One H1 per page with a logical heading outline.
- Primary CTA is clear at mobile and desktop widths.
- All real-world images have documented usage permission.
- No invented team details, testimonials or credentials.
- No horizontal scrolling at the viewport matrix.
- Keyboard focus is visible and not obscured.
- Forms and mobile action bar do not overlap.
- Screenshot comparison reviewed at 390px, 768px and 1440px.
- No broken routes or missing images after build.

## 12. Required deliverables

- Before/after screenshots for key pages.
- Updated component list.
- Responsive test evidence.
- Accessibility check results.
- Owner approval for any change to brand, messaging or CTA offer.
