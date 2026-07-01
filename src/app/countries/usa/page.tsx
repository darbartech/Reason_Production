import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in USA from Nepal | I-20 & F-1 Student Visa 2026",
  description: "Plan your study in USA from Nepal with expert guidance. Learn about I-20, F-1 student visa requirements, costs, and top US universities.",
  alternates: {
    canonical: "/countries/usa",
  },
  openGraph: {
    title: "Study in USA from Nepal | I-20 & F-1 Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in the USA. I-20, F-1 visa, and scholarships.",
    images: ["https://images.unsplash.com/photo-1500916434205-0c7742ddb658?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in USA from Nepal | I-20 & F-1 Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in the USA. I-20, F-1 visa, and scholarships.",
    images: ["https://images.unsplash.com/photo-1500916434205-0c7742ddb658?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function USAPage() {
  return (
    <CountryPageTemplate
      country="USA"
      h1="Study in USA from Nepal"
      overview="The USA is the world's most popular study destination, offering cutting-edge research, a diverse culture, and top-tier universities with significant scholarship opportunities."
      image="https://images.unsplash.com/photo-1500916434205-0c7742ddb658?q=80&w=1499&auto=format&fit=crop"
      requirements={[
        "Minimum 60% or 3.0 GPA in +2 or Bachelor's",
        "IELTS 6.5 (no band less than 6.0) for UG/PG",
        "PTE 60 (no band less than 50) for UG/PG",
        "SAT/ACT scores for some UG programs",
        "GRE/GMAT scores for some PG programs",
        "Form I-20 from a SEVP-approved school",
        "SEVIS fee payment (approx. USD 350)",
        "DS-160 Online Nonimmigrant Visa Application",
      ]}
      costs={["USD 20,000 - 60,000 Per Year", "USD 1,000 - 2,500 Monthly Living"]}
      visaProcess={[
        "Selection of course and SEVP-approved school",
        "Preparation for English proficiency and standardized tests",
        "Submission of application for admission",
        "Receipt of Form I-20 from the school",
        "Payment of SEVIS fee and DS-160 application",
        "Scheduling of F-1 student visa interview",
        "F-1 student visa interview and approval",
        "Pre-departure briefing and travel to the US",
      ]}
      intakes={["August (Fall - Major)", "January (Spring)", "May (Summer)"]}
      faqs={[
        {
          q: "What is the I-20 form?",
          a: "The Form I-20 (Certificate of Eligibility for Nonimmigrant Student Status) is a document issued by SEVP-approved schools that you need to apply for an F-1 visa.",
        },
        {
          q: "Are scholarships available for Nepalese students?",
          a: "Yes, many US universities offer merit-based and need-based scholarships to international students, including those from Nepal.",
        },
        {
          q: "What is the SEVIS fee?",
          a: "The Student and Exchange Visitor Information System (SEVIS) fee is a mandatory fee paid by F and M visa applicants to support the tracking system.",
        },
      ]}
    />
  );
}
