# Phase 3 — Enquiry Backend & Database

## Objective

Connect the Phase 2 student assessment form to a real persistent database.

The form must no longer rely on a browser-only success state or a placeholder third-party form endpoint.

## Recommended architecture

Preferred:

```text
Next.js
   ↓
Server/API
   ↓
PostgreSQL
   ↓
student_enquiries
```

Supabase + PostgreSQL is acceptable and preferred for a simple maintainable implementation.

If the project already has a backend/database decision, inspect and reuse it instead of introducing a second backend.

## Do not duplicate infrastructure

Before installing anything:

1. inspect `package.json`,
2. inspect existing environment configuration,
3. inspect existing API routes,
4. inspect existing server utilities,
5. inspect existing form submission code.

Only install packages that are actually required.

## Database table

Create a table equivalent to:

```text
student_enquiries

id
lead_number

full_name
phone
email

preferred_country
preferred_intake

education_level
academic_result_type
academic_result

english_test
english_score

study_level
preferred_course
budget_range

preferred_contact_method
preferred_contact_time

message

source_page
referrer

utm_source
utm_medium
utm_campaign
utm_content
utm_term

status
priority

assigned_to

next_follow_up_at

created_at
updated_at
```

## Default values

New enquiry:

```text
status = NEW
priority = NORMAL
```

Generate a human-readable lead number such as:

```text
ENQ-000001
```

Do not use the lead number as the database primary key.

## Status values

Initial system:

```text
NEW
CONTACTED
COUNSELING_SCHEDULED
COUNSELING_COMPLETED
DOCUMENTS_PENDING
APPLICATION_STARTED
OFFER_RECEIVED
VISA_PROCESSING
VISA_GRANTED
ENROLLED
LOST
NOT_INTERESTED
INVALID
DUPLICATE
```

Keep status values centralized rather than duplicating strings throughout the application.

## API

Create only the required endpoint.

Example:

```text
POST /api/enquiries
```

Responsibilities:

1. validate request body server-side,
2. reject malformed requests,
3. sanitize values,
4. rate-limit submissions,
5. prevent obvious duplicates,
6. save the enquiry,
7. return a safe success response.

Never trust only client-side Zod validation.

## Duplicate handling

Use a sensible duplicate strategy.

Possible matching:

```text
phone + recent time window
```

or:

```text
email + recent time window
```

Do not prevent legitimate repeat enquiries forever.

## Security

Implement:

- server-side validation,
- rate limiting,
- honeypot field,
- secure environment variables,
- no database credentials in client code,
- safe error messages,
- basic spam protection.

Cloudflare Turnstile may be added if spam becomes significant.

## Email notification

If email notification is implemented, it should be secondary to database persistence.

Correct order:

```text
validate
→ save database
→ optional notification
```

Do not make the lead disappear because an email provider temporarily fails.

## Acceptance checklist

- [ ] Real enquiry is saved in database.
- [ ] Invalid requests are rejected server-side.
- [ ] No secret is exposed in client bundle.
- [ ] Duplicate protection exists.
- [ ] Rate limiting exists.
- [ ] Lead number is generated.
- [ ] Default status is NEW.
- [ ] UTM/source data is stored.
- [ ] Database failure produces a useful user-facing error.
- [ ] Successful submission produces a safe response.
- [ ] Existing public routes still work.
- [ ] Build/type check passes.

## AI implementation instruction

> Implement only Phase 3. Inspect the existing project before adding dependencies. Connect the existing Phase 2 enquiry form to persistent PostgreSQL storage. Reuse existing architecture where possible. Do not build the admin interface yet. Do not redesign public pages in this phase.
