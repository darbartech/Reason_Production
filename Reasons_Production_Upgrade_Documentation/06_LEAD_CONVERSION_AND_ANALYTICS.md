# Lead Conversion, Enquiry UX & Analytics

**Goal:** Generate more qualified counselling enquiries, attribute them to the right campaigns and ensure every valid lead reaches the team reliably.

## 1. Existing lead journey

Relevant files:
- `src/components/CallbackCard.tsx`
- `src/components/enquiry/EnquiryForm.tsx`
- `src/components/enquiry/PersonalStudyStep.tsx`
- `src/components/enquiry/AcademicProfileStep.tsx`
- `src/components/enquiry/EnquirySuccess.tsx`
- `src/lib/callback-handoff.ts`
- `src/lib/quiz-handoff.ts`
- `src/lib/validations/enquiry.ts`
- `src/lib/validations/contact.ts`
- `server/enquiry-routes.js`
- `server/admin-routes.js`
- `src/components/admin/*`

The enquiry form is a two-step React Hook Form flow with Zod validation, optional Cloudflare Turnstile, UTM/referrer capture, callback/quiz handoff and POST to `/api/enquiries`.

Preserve these useful features while testing actual end-to-end behavior.

## 2. Conversion strategy

Offer two levels of commitment:

### Low-friction contact
- Name.
- Phone.
- Preferred destination.
- Best time to call (if the business can honor it).
- Clear privacy notice.
- Submit callback request.

### Detailed student enquiry
Collect academic profile, study level, course interest, English-test status, budget and intake only when useful for qualification. Explain why each field is needed.

Do not force students to provide sensitive or extensive details before they can ask an initial question. Do not collect passport numbers, document scans or financial account details through a general marketing form.

## 3. CTA consistency

Use a small controlled set:
- Book a free counselling session (only if genuinely free).
- Request a callback.
- Check eligibility.
- WhatsApp us.
- Call the office.

Every CTA must lead to the expected destination and work on mobile. Track clicks without collecting personal information.

## 4. Form behavior and reliability

- Validate on client and server.
- Server validation is authoritative.
- Add idempotency/deduplication protection.
- Prevent double submission.
- Preserve entered values after recoverable errors.
- Provide a clear success state.
- Give a safe retry path if the API is unavailable.
- Do not expose stack traces or internal validation details.
- Verify rate limits and Turnstile server-side token verification.
- Ensure the server rejects invalid/missing tokens when protection is configured.
- Do not trust `submittedAt`, `sourcePage`, `referrer` or UTM fields from the browser as authoritative.

The source form includes a Turnstile site key check and includes a response token when present. Verify that the backend independently validates the token with Cloudflare and that production configuration fails safely.

## 5. Privacy and consent

Before launch:
- Publish a clear privacy policy.
- Explain purpose, contact method, retention and sharing.
- Link policy beside form submission.
- Obtain any legally required consent/acknowledgement.
- Keep marketing opt-in separate from responding to an enquiry.
- Do not pre-check optional marketing consent.
- Define retention and deletion workflow.
- Restrict admin access by role.
- Never send lead PII to GA4, Meta Pixel, Google Ads or other analytics.

The form copy currently includes “We never share your details.” Ensure actual vendors, hosting, CRM, email and analytics practices support this absolute statement, or rewrite it accurately.

## 6. Attribution model

Capture:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- Landing page.
- Referrer.
- First-touch source where consent and privacy design permit.
- Latest-touch source.
- Campaign click IDs only when needed and handled safely.

Normalize and validate values on the server. Apply length limits and safe character handling. Do not accept arbitrary values as trusted attribution.

For Meta ads, use campaign/ad set/ad naming conventions and UTM parameters. Keep personal information out of UTM values.

## 7. GA4 event specification

Recommended events:

| Event | Trigger | Safe parameters |
|---|---|---|
| `callback_start` | User begins callback form | `form_location` |
| `callback_submit` | Server confirms callback creation | `form_location` |
| `enquiry_step1_complete` | Step 1 passes validation | `form_location` |
| `enquiry_step2_view` | Step 2 becomes visible | `form_location` |
| `enquiry_submit` | Server confirms new enquiry | `form_location`, `destination_category` only if non-identifying and approved |
| `whatsapp_click` | WhatsApp link clicked | `link_location` |
| `call_click` | Phone link clicked | `link_location` |
| `eligibility_complete` | Quiz completed | broad outcome category only if privacy-reviewed |
| `country_view` | Country page view | `country_slug` |

Do not send:
- Full name.
- Phone number.
- Email.
- Free-text enquiry.
- Institution/student ID.
- Passport or financial information.
- Exact academic profile tied to an identifiable lead.

Only fire a successful submission event after a successful server response. Do not fire it on button click alone.

## 8. Admin lead operations

The admin interface should support:
- Lead status and stage.
- Assigned counsellor.
- Created/updated timestamps.
- Contact preference.
- Next follow-up date.
- Internal notes.
- Timeline/audit history.
- Source/campaign attribution.
- Duplicate detection.
- Export with role restriction and audit logging.

Suggested pipeline:
`New → Contact attempted → Contacted → Counselling booked → Application in progress → Submitted → Offer received → Visa process → Enrolled / Closed / Not qualified`

Adapt statuses to actual business workflow. Do not assume visa approval or enrolment if the student has not confirmed it.

## 9. Lead response operations

Set a realistic service-level target approved by the business. Example:
- New lead notification immediately.
- First response within the team’s staffed hours.
- Missed-call and failed-contact follow-up process.
- Lead ownership and escalation.
- No contact outside the student’s stated preference where avoidable.

Do not promise a response time that the team cannot meet.

## 10. Dashboard reporting

Useful operational metrics:
- Leads by source/medium/campaign.
- Leads by destination.
- Leads by intake.
- Qualified lead rate.
- Contacted rate.
- Counselling booking rate.
- Application-start rate.
- Application-submission rate.
- Enrolment outcome where verified.
- Time to first response.
- Duplicate/spam rate.

Separate volume from quality. A campaign that produces many low-quality forms may be less valuable than one that produces fewer qualified students.

## 11. Acceptance criteria

- Form works from every CTA and handoff route.
- Server validation rejects malformed payloads.
- Duplicate submissions are controlled.
- Lead appears in admin dashboard exactly once.
- UTM attribution is preserved and sanitized.
- No PII reaches analytics.
- Privacy notice and policy link are visible.
- Turnstile verification is server-side and tested.
- Admin actions are audited.
- A real test lead can be followed through every pipeline stage.
