import { Metadata } from "next";
import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in Australia from Nepal",
  description: "Dreaming of studying in Australia from Nepal? Learn about CRICOS courses, GTE requirements, visa process, and top Australian universities.",
  keywords: [
    "study in australia from nepal",
    "australia student visa nepal",
    "gte requirements nepal",
    "cricos courses nepal",
    "australia universities nepal",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/countries/australia",
  },
  openGraph: {
    title: "Study in Australia from Nepal | Complete Guide 2026",
    description: "Everything you need to know about studying in Australia from Nepal.",
    images: ["https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Australia from Nepal | Complete Guide 2026",
    description: "Everything you need to know about studying in Australia from Nepal.",
    images: ["https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AustraliaPage() {
  return (
    <CountryPageTemplate
      country="Australia"
      h1="Study in Australia from Nepal"
      overview="Australia offers world-class education, a great lifestyle, and excellent student support services. It's home to many top-ranked global universities."
      image="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1530&auto=format&fit=crop"
      requirements={[
        "Minimum 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 50 (no band less than 42) for Level 1",
        "Genuine Temporary Entrant (GTE) statement",
        "Financial capacity (approx. AUD 24,505+ tuition)",
        "Overseas Student Health Cover (OSHC)",
        "Evidence of English Proficiency",
      ]}
      costs={["AUD 20,000 - 45,000 Per Year", "AUD 24,505 Living Cost"]}
      visaProcess={[
        "Selection of course and CRICOS-registered provider",
        "Preparation for English proficiency test",
        "Submission of application for admission",
        "GTE assessment by the institution",
        "Receipt of Letter of Offer",
        "Payment of tuition fees and OSHC",
        "Confirmation of Enrollment (CoE)",
        "Student Visa Subclass 500 application",
      ]}
      intakes={["February (Major)", "July (Major)", "October"]}
      faqs={[
        {
          q: "What is the GTE requirement?",
          a: "The Genuine Temporary Entrant (GTE) requirement is an integrity assessment used by Australia to ensure the student visa program is used as intended.",
        },
        {
          q: "Can I stay in Australia after graduation?",
          a: "Yes, you can apply for a Temporary Graduate visa (subclass 485) to live, study and work in Australia temporarily after you finish your studies.",
        },
        {
          q: "What is OSHC?",
          a: "Overseas Student Health Cover (OSHC) is health insurance for international students in Australia to help cover medical and hospital costs.",
        },
      ]}
    />
  );
}
