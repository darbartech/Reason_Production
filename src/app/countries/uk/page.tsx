import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in UK from Nepal | CAS & Student Visa 2026",
  description: "Plan your study in UK from Nepal with expert guidance. Learn about CAS, student visa requirements, costs, and top UK universities.",
  alternates: {
    canonical: "/countries/uk",
  },
  openGraph: {
    title: "Study in UK from Nepal | CAS & Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in the UK. CAS, visa, and university admission.",
    images: ["https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in UK from Nepal | CAS & Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in the UK. CAS, visa, and university admission.",
    images: ["https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function UKPage() {
  return (
    <CountryPageTemplate
      country="United Kingdom"
      h1="Study in UK from Nepal"
      overview="The UK is renowned for its centuries-old academic tradition, shorter degree durations, and rich cultural experience. It's home to many of the world's best universities."
      image="https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?q=80&w=1470&auto=format&fit=crop"
      requirements={[
        "Minimum 60% or 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 59 (no band less than 51) for Tier 4",
        "Confirmation of Acceptance for Studies (CAS)",
        "Tuberculosis (TB) Test Certificate",
        "Proof of financial capacity (approx. GBP 12,006+ tuition)",
        "Biometric Residence Permit (BRP) collection",
      ]}
      costs={["GBP 12,000 - 30,000 Per Year", "GBP 1,334 Monthly (London)"]}
      visaProcess={[
        "Selection of course and UKVI-licensed sponsor",
        "English proficiency test (IELTS/PTE)",
        "Submission of application for admission",
        "Receipt of Unconditional Offer Letter",
        "Payment of tuition deposit and CAS fee",
        "Request for CAS from the institution",
        "Tier 4 Student Visa application",
        "Biometric collection and IHS payment",
      ]}
      intakes={["September (Major)", "January", "May"]}
      faqs={[
        {
          q: "What is the CAS?",
          a: "The Confirmation of Acceptance for Studies (CAS) is a unique reference number issued by your UK educational institution as part of your student visa application.",
        },
        {
          q: "Can I work in the UK after graduation?",
          a: "Yes, you can apply for the Graduate Route visa, which allows you to stay in the UK for 2 years (3 years for PhD) after finishing your course.",
        },
        {
          q: "What is the IHS fee?",
          a: "The Immigration Health Surcharge (IHS) is a fee you pay as part of your visa application to access the UK's National Health Service (NHS).",
        },
      ]}
    />
  );
}
