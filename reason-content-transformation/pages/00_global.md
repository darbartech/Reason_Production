# Global content – header, footer, buttons, forms, 404

> Replace scattered copies with these. All contact data comes from `src/lib/company.ts`.

## Header
| Item | Copy |
|---|---|
| Logo alt | Reasons Education |
| Menu | Study abroad ▾ · Services · IELTS & PTE · About · Blog |
| Study abroad menu | Overview · Check eligibility · USA · Canada · UK · Australia · New Zealand · Germany & Europe · Japan |
| Header button | **Book a free session** |
| Mobile bottom bar | Call · WhatsApp · **Book a free session** |

## Footer
**Column 1 – brand:** Reasons Education. *Study abroad counselling and IELTS & PTE classes in Kathmandu, since 2015.*
**Column 2 – Countries:** USA · Canada · UK · Australia · New Zealand · Germany & Europe · Japan
**Column 3 – Company:** About · Services · IELTS & PTE · Fees · FAQ · Blog · Contact · For partners
**Column 4 – Visit us:**
Indreni Complex, New Baneshwor, Kathmandu 44600
Sun–Fri, 10 AM–5 PM
[phone] · [WhatsApp] · info@reasons.edu.np
**Bottom line:** *Licensed by [authority], licence no. [OWNER] · PAN [OWNER]* · Privacy · Terms · © 2026 Reasons Education Foundation
**Small print (one line):** *We can't guarantee admission or a visa. Decisions are made by institutions and governments.*

## Buttons (use exactly these)
| Use | Label |
|---|---|
| Primary everywhere | Book a free session |
| Secondary | Chat on WhatsApp |
| Phone | Call [number] |
| Directions | Get directions |
| Quiz | Check your eligibility |
| Country page | See [Country] requirements |
| Course | Ask about this course |
| Blog | Read the guide |

*Retire:* "Free counselling", "Talk to an Expert", "Inquire Now", "Learn More", "Learn Our Process".

## Callback form (hero / final block)
- Title: **Book a free session**
- Helper: *Name, phone and country. That's all we need.*
- Fields: Full name · Phone (98XXXXXXXX) · Where would you like to study? (select; includes "Not sure yet")
- Button: **Book my session**
- Under button: *Free first session. We confirm by call or WhatsApp.*
- Errors: *Please enter your name.* · *Please enter a phone number we can call.* · *Please choose a country, or "Not sure yet".*

## Full enquiry form (Contact page)
- Step 1 title: **Tell us about you** – helper: *2 minutes. You can skip anything you're unsure about.*
- Step 2 title: **Your studies** – helper: *This helps your counsellor prepare. All optional.*
- Success: **Thank you, [first name].** *We'll contact you on [call / WhatsApp] [during the time you chose]. Want to chat now?* **[Open WhatsApp]**
- Failure: *We couldn't send that. Please call [number] or WhatsApp us and we'll take your details.*

## WhatsApp pre-filled messages
- General: *Hello Reasons Education, I'd like to book a free session.*
- Country page: *Hello, I'm interested in studying in [Country]. Can I book a free session?*
- IELTS/PTE: *Hello, I'd like details of the next IELTS/PTE batch.*

## Confirmation & trust microcopy
- Under every form button: *Free first session · No obligation · We never share your details.*
- Date label on facts: *As of 2 Nov 2026 · Source: [link]*
- Page footer on guides: *Last checked: [date] · Reviewed by [name], [role].*

## 404 page
**H1:** We can't find that page.
**Text:** *The link may be old. Try one of these:*
Buttons: **Study abroad** · **Countries** · **Book a free session**

## Cookie / analytics notice (short)
*We use cookies to understand how the site is used and to improve it. You can accept or decline analytics.* **[Accept] [Decline]**

## Schema fields to add in `company.ts`
`licence: { authority, number, validUntil }`, `pan`, `socials`, `googleBusiness`, `team[].qualifications`, `phone` (single source), `whatsappNumber`.
