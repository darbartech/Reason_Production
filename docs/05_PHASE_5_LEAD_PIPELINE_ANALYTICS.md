# Phase 5 — Lead Pipeline, Follow-ups & Basic Analytics

## Objective

Turn the enquiry list into a practical counselor workflow.

Do not build a large CRM. Implement only the features that directly help a study consultancy manage leads.

## Lead pipeline

Use the existing statuses:

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

## Pipeline presentation

The default admin list should remain the primary interface.

Optional:

```text
Pipeline / Kanban
```

Only add Kanban if it can be implemented without making the admin system unnecessarily complex.

## Follow-up system

Every lead should support:

```text
next_follow_up_at
```

Dashboard should show:

```text
Follow-ups due today
Overdue follow-ups
Upcoming follow-ups
```

Do not add calendar integrations in this phase.

## Priority

Support:

```text
LOW
NORMAL
HIGH
URGENT
```

Use color carefully:

- normal: neutral,
- high: blue/cyan emphasis,
- urgent: restrained crimson.

Do not use a rainbow status system.

## Counselor assignment

A lead may be assigned to one counselor.

Dashboard filters:

```text
My Leads
Unassigned
All Leads
```

Counselors should only see permitted leads.

Admins can see all leads.

## Basic analytics

Add only useful metrics:

```text
Leads by country
Leads by source
Leads by status
Leads by intake
Monthly enquiry count
```

If enough data exists, show conversion counts:

```text
Enquiries
Counseling
Applications
Offers
Visa Granted
Enrolled
```

Do not calculate fake conversion percentages when the denominator is too small.

## Marketing attribution

Use stored:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Show:

```text
Top lead sources
Top campaigns
```

Do not claim that a campaign caused a visa/enrollment unless the stored lead journey supports that conclusion.

## Export

Optional but useful:

```text
Export CSV
```

Export only data the logged-in user is authorized to view.

## Acceptance checklist

- [ ] Follow-up dates work.
- [ ] Due/overdue follow-ups are visible.
- [ ] Priority works.
- [ ] Counselor assignment works.
- [ ] Lead source reporting works.
- [ ] Country reporting works.
- [ ] Status reporting works.
- [ ] Analytics use real database records.
- [ ] Counselor permissions are respected.
- [ ] CSV export respects permissions if implemented.
- [ ] No unnecessary dashboards or charts were added.
- [ ] Build/type check passes.

## AI implementation instruction

> Implement only Phase 5. Extend the existing admin panel with follow-ups, priority, counselor assignment and basic real-data analytics. Do not redesign the admin panel. Do not add complex CRM, messaging automation or third-party integrations unless specifically required.
