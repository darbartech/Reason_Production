export type LandingFaq = { q: string; a: string };

export type LandingTimelineRow = { when: string; what: string };

export type LandingPage = {
  slug: string;
  /** Keep false until the owner approves the page for indexing. */
  approved: boolean;
  title: string;
  description: string;
  destination: string;
  countrySlug: string;
  eyebrow: string;
  headline: string;
  intro: string;
  facts: string[];
  timeline: LandingTimelineRow[];
  faqs: LandingFaq[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "uk-september-2027",
    approved: true,
    title: "Study in the UK from Nepal: September 2027 Intake",
    description:
      "Plan your UK application for September 2027: costs, documents, proof of funds and timeline. Free session at Reasons Education, Kathmandu.",
    destination: "United Kingdom",
    countrySlug: "uk",
    eyebrow: "United Kingdom · September 2027 intake",
    headline: "Plan your UK application for September 2027",
    intro:
      "Start now. We'll shortlist courses, map your documents and tell you what's realistic.",
    facts: [
      "Proof of funds: £1,529/month in London (£1,171 outside) until 29 Nov 2026; £1,570/£1,203 from 30 Nov 2026, for up to 9 months, plus first-year tuition.",
      "Graduate route: 18 months for bachelor's and master's applications from 1 Jan 2027. The Budget announced 2 years for graduates of “high-compliance” universities; details are pending.",
      "Funds must normally be held for 28 days. Confirm the current rule on gov.uk before you apply.",
    ],
    timeline: [
      { when: "Nov 2026 – Jan 2027", what: "Shortlist courses, take your English test and prepare documents" },
      { when: "Feb – Apr 2027", what: "Apply and receive offers" },
      { when: "May – Jun 2027", what: "Accept, pay the deposit and request your CAS" },
      { when: "Jun – Aug 2027", what: "Apply for the Student visa" },
    ],
    faqs: [
      {
        q: "What is this page for?",
        a: "It is a starting point for Nepali students planning a UK start in September 2027. A counsellor reviews your profile, shortlists courses and maps the documents needed for your application and visa.",
      },
      {
        q: "Which English test do I need?",
        a: "Requirements vary by institution, and some courses ask for a higher score than others. Some courses need a UKVI-approved test. Bring any result you have and we check the exact requirement for each course on your shortlist.",
      },
      {
        q: "What documents should I prepare?",
        a: "Usually your passport, academic transcripts and certificates, a CV for master's applications, any English test result, and financial evidence for the visa stage. The exact list depends on the course and the institution.",
      },
      {
        q: "Do you guarantee admission or a visa?",
        a: "No. Decisions are made by the institution and the visa authority. Our role is to help you prepare a complete, consistent application and tell you honestly where a plan does not fit.",
      },
      {
        q: "Can I visit your office?",
        a: "Yes. We are at Indreni Complex, New Baneshwor, Kathmandu, open Sunday to Friday, 10 AM to 5 PM. Book a session so a counsellor is free when you arrive.",
      },
    ],
  },
];

export const getLandingPage = (slug: string) =>
  landingPages.find((page) => page.slug === slug);
