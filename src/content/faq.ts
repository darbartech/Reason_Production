import { pricing } from "./pricing";

export type Faq = { q: string; a: string };
export type FaqCategory = { category: string; items: Faq[] };

export const faqCategories: FaqCategory[] = [
  {
    category: "About us",
    items: [
      {
        q: "How much do your services cost?",
        a: "Your first session is free. Other fees are listed on our Fees page and given in writing before you commit to anything.",
      },
      {
        q: "Where can I check your registration?",
        a: "Our legal name, office and team are on the About page. Ask to see our licence and PAN at the office, or request them by email.",
      },
      {
        q: "Where is your office and when are you open?",
        a: "Indreni Complex, New Baneshwor, Kathmandu. Sunday to Friday, 10 AM to 5 PM. You do not need an appointment to look around.",
      },
      {
        q: "Which countries do you cover?",
        a: "USA, Canada, UK, Australia, New Zealand, Japan and European countries such as Germany. Each has a guide with current requirements and official links.",
      },
      {
        q: "Can you guarantee my visa or admission?",
        a: "No. Institutions and governments decide. We make sure your file is complete, consistent and on time, and we tell you honestly where you stand.",
      },
    ],
  },
  {
    category: "Planning & money",
    items: [
      {
        q: "When should I start?",
        a: "About 9–12 months before your intake. Course deadlines differ, and some close early. Start with an English test and a document check.",
      },
      {
        q: "How much money do I need to show?",
        a: "It depends on the country. As of 2 Nov 2026: Canada CAD 23,448; UK £1,570/month in London from 30 Nov 2026 (£1,529 before); Australia AUD 29,710; New Zealand NZ$20,000; Germany €11,904. Add first-year tuition.",
      },
      {
        q: "What is an NOC and do I need one?",
        a: "Nepal requires a No Objection Certificate before you pay tuition abroad through a bank. Ask us about the current process; the Ministry of Education issues it.",
      },
      {
        q: "Can I work while I study?",
        a: "Yes, with limits. Canada allows 24 hours/week in term and New Zealand 25 hours/week. UK, Australia, US and Japan limits differ — see the country guide.",
      },
      {
        q: "What happens after I graduate?",
        a: "Post-study work rules differ and are changing. The UK Graduate route becomes 18 months for bachelor's and master's applications from 1 Jan 2027, with 2 years announced for some universities (details pending).",
      },
    ],
  },
  {
    category: "Applications & visas",
    items: [
      {
        q: "What is the minimum GPA for Canada?",
        a: "There is no national minimum. Each institution sets its own, often around 55–60% or 2.8 GPA. We check the course page with you.",
      },
      {
        q: "How long does a visa take?",
        a: "It varies by country and season. We give you the current official processing time and link the source at your first session.",
      },
      {
        q: "Do you help with the SOP?",
        a: "We review and coach. The words and experience must be yours. We help with structure, evidence and consistency with the rest of your file.",
      },
      {
        q: "What makes visas get refused?",
        a: "Common reasons: unclear proof of funds, a study plan that does not match your background, and missing or inconsistent documents.",
      },
      {
        q: "Do I need a Schengen visa to study in Europe?",
        a: "No. You apply for a national (Type D) student visa in the country where you will study, then a residence permit after arrival.",
      },
    ],
  },
  {
    category: "IELTS & PTE",
    items: [
      {
        q: "How much are IELTS/PTE classes?",
        a: `IELTS: ${pricing.ielts.price} for ${pricing.ielts.weeks} weeks. PTE: ${pricing.pte.price} for ${pricing.pte.weeks} weeks. The exam fee is separate and paid to the test provider.`,
      },
      {
        q: "Do you run mock tests?",
        a: "Yes. Enrolled students sit a full mock test every Sunday and get feedback on each module.",
      },
      {
        q: "Can I meet the trainer first?",
        a: "Yes. Ask to meet your batch trainer before you enrol, and we will arrange it.",
      },
      {
        q: "Which test should I take?",
        a: "Check the institution's accepted tests and minimum scores first. We will help you choose based on your course list and visa route.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqCategories.flatMap((c) => c.items);

export const homeFaqs: Faq[] = [
  faqCategories[0].items[0],
  faqCategories[0].items[3],
  faqCategories[0].items[4],
  faqCategories[2].items[1],
  faqCategories[3].items[0],
];
