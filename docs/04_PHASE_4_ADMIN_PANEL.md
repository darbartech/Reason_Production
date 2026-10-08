# Phase 4 — Protected Admin Panel

## Objective

Create a simple internal admin system for managing student enquiries.

This is a small CRM-style panel, not a full enterprise CRM.

## Routes

Add:

```text
/admin/login
/admin
/admin/enquiries
/admin/enquiries/[id]
```

If the project already has authentication infrastructure, reuse it.

## Authentication

The admin area must be protected.

Unauthenticated users must not be able to access:

```text
/admin
/admin/enquiries
/admin/enquiries/[id]
```

Recommended roles:

```text
ADMIN
COUNSELOR
```

## Admin dashboard

Show four primary metrics:

```text
New Leads
Follow-ups Due
Total Enquiries
Enquiries This Month
```

Do not create fake statistics.

All values must come from the database.

## Recent enquiries table

Columns:

```text
Lead
Student
Country
Intake
Study Level
Status
Priority
Assigned To
Created
```

Keep the table usable on desktop.

On mobile, allow horizontal scrolling or switch to compact enquiry cards.

## Search

Support:

```text
name
phone
email
lead number
```

## Filters

Support:

```text
status
country
intake
priority
assigned counselor
date
```

Do not implement complicated analytics yet.

## Enquiry detail

Show:

### Student

```text
Name
Phone
Email
```

### Study plan

```text
Country
Intake
Study level
Course
Budget
```

### Academic

```text
Education
Result
English test
Score
```

### Contact

```text
Preferred contact method
Preferred contact time
```

### Marketing

```text
Source
UTM source
UTM medium
UTM campaign
Landing page
```

### Management

```text
Status
Priority
Assigned counselor
Next follow-up
```

## Actions

Allow authorized staff to:

```text
change status
change priority
assign counselor
set follow-up date
add note
```

## Quick contact actions

Provide:

```text
Call
WhatsApp
Email
```

These should use the actual stored student contact information.

## Notes

Add a simple internal notes system.

Example:

```text
05 Oct 2026
Student interested in Australia IT.
IELTS 7.0.
Follow up after 6 PM.

— Counselor
```

Do not expose internal notes publicly.

## Activity timeline

Show basic events:

```text
Enquiry received
Status changed
Counselor assigned
Note added
Follow-up scheduled
```

Do not build a complicated event-sourcing architecture.

## Admin visual style

Use the same Reason brand system.

Admin should be:

- clean,
- dense enough for work,
- white/light background,
- navy navigation,
- restrained blue/cyan accents,
- minimal shadows,
- no gradients,
- no decorative hero sections,
- no oversized cards.

## Suggested components

```text
src/components/admin/
├── AdminSidebar.tsx
├── AdminHeader.tsx
├── DashboardStats.tsx
├── EnquiryTable.tsx
├── EnquiryFilters.tsx
├── EnquiryStatusBadge.tsx
├── EnquiryDetail.tsx
├── LeadTimeline.tsx
└── LeadNotes.tsx
```

Create only the components actually needed.

## Acceptance checklist

- [ ] Login works.
- [ ] Unauthenticated admin routes are protected.
- [ ] Dashboard values come from real data.
- [ ] Enquiries list loads from database.
- [ ] Search works.
- [ ] Filters work.
- [ ] Detail page works.
- [ ] Status can be updated.
- [ ] Priority can be updated.
- [ ] Counselor assignment works.
- [ ] Follow-up date works.
- [ ] Notes are private.
- [ ] Public website is unchanged except for required form integration.
- [ ] No gradients/decorative AI styling.
- [ ] Build/type check passes.

## AI implementation instruction

> Implement only Phase 4. Build a small protected admin panel around the existing enquiry database. Reuse the existing project architecture and design language. Do not redesign the public website. Do not add unnecessary CRM features. Use real database data only; never use fake dashboard numbers.
