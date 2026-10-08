# Phase 2 — Student Study Assessment / Enquiry Form

## Objective

Replace the generic contact enquiry experience with a short, conversion-focused student study assessment.

Do not redesign the entire contact page.

## Principle

The form must collect enough information for a counselor to understand the student's situation without creating a long intimidating form.

Use a 2-step form.

## Step 1 — Basic study intent

Fields:

### Full name
Required.

### Mobile number
Required.

Use Nepal-friendly phone validation.

### Email
Optional but validated when supplied.

### Preferred destination
Options:

```text
Australia
Canada
United Kingdom
USA
New Zealand
Japan
Europe
Not sure / Need guidance
```

### Preferred intake
Options should be configurable but initially support:

```text
Next available intake
2027 February
2027 May
2027 September
Not sure
```

Do not hardcode outdated intake options permanently. Keep the list easy to update.

## Step 2 — Academic profile

### Highest education

```text
SEE
+2
Bachelor
Master
Other
```

### Academic result

Collect:

```text
result type
result value
```

Examples:

```text
GPA
Percentage
Division
Not sure
```

### English test

```text
IELTS
PTE
TOEFL
Duolingo
Not taken yet
Not sure
```

If IELTS/PTE/TOEFL/Duolingo is selected, conditionally show the appropriate score field.

Do not force a score when the student has not taken a test.

### Preferred study level

```text
Diploma
Bachelor
Master
PhD
Not sure
```

### Preferred course / subject

Free text.

Placeholder:

```text
e.g. IT, Nursing, Business, Engineering
```

### Budget

```text
Under NPR 15 lakh
NPR 15–25 lakh
NPR 25–40 lakh
NPR 40+ lakh
Need guidance
```

### Contact preference

```text
Phone call
WhatsApp
Office visit
Online meeting
```

### Best contact time

```text
Morning
Afternoon
Evening
Any time
```

## Do not collect

Do not initially ask for:

- passport number,
- citizenship number,
- full address,
- passport upload,
- financial documents,
- unnecessary family information.

These can be handled later by a counselor.

## UX requirements

The form must be mobile-first.

Use:

```text
Step 1 of 2
Step 2 of 2
```

Include:

- clear labels,
- keyboard-friendly inputs,
- large tap targets,
- inline validation,
- clear required/optional indication,
- back button,
- continue button,
- submit button,
- loading state,
- error state,
- success state.

Do not use excessive animation.

## Success state

Do not only say:

```text
Thank you.
```

Use:

```text
Your Study Profile Has Been Received

Our counselor will review your information and contact you to discuss suitable study options.
```

Actions:

```text
Talk on WhatsApp
Return to Website
```

## Validation

Use the existing React Hook Form + Zod architecture where possible.

Create or update:

```text
src/lib/validations/enquiry.ts
```

Avoid duplicating validation logic.

## Suggested component structure

Only add what is necessary:

```text
src/components/enquiry/
├── EnquiryForm.tsx
├── PersonalStudyStep.tsx
├── AcademicProfileStep.tsx
└── EnquirySuccess.tsx
```

Reuse existing form controls where possible.

## Source tracking

Capture hidden metadata:

```text
source_page
referrer
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Also capture:

```text
submitted_at
```

Do not trust client-supplied marketing values for authorization or security decisions.

## Acceptance checklist

- [ ] Two-step form works.
- [ ] Mobile experience is clean.
- [ ] Validation works.
- [ ] Conditional English-score fields work.
- [ ] Students can choose "Not sure".
- [ ] No unnecessary sensitive information is requested.
- [ ] Loading/error/success states work.
- [ ] UTM/source fields are captured.
- [ ] Existing contact page content is preserved where still useful.
- [ ] No backend/database implementation is assumed complete until Phase 3.

## AI implementation instruction

> Implement only Phase 2. Inspect the existing contact form and reuse its architecture. Do not redesign the whole website. Build the two-step student assessment form with React Hook Form and Zod. Keep the form concise and mobile-first. Do not invent backend storage in this phase. Do not proceed to admin panel work.
