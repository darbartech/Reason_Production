import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in Australia from Nepal: Costs & Visa",
  description: "Tuition, living costs in NPR, intakes, IELTS requirements and the student visa steps for Nepali students applying to Australia. Counselling in Kathmandu.",
  path: "/countries/australia",
});

export default function AustraliaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "Australia", path: "/countries/australia" }]} />
      <CountryPageTemplate
      country="Australia"
      image={{
        src: "/images/countries/australia-sydney-opera-house.webp",
        alt: "Sydney Opera House and harbour ferries, Australia",
      }}
      h1="Study in Australia from Nepal: costs, intakes and visa steps"
      overview="Australia offers world-class education, a great lifestyle, and excellent student support services. It's home to many top-ranked global universities."
      requirements={[
        "Minimum 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 50 (no band less than 42) for Level 1",
        "Genuine Student (GS) requirement — GS statement",
        "Financial capacity — AUD 29,710 living costs (12 months), plus tuition and travel",
        "Overseas Student Health Cover (OSHC)",
        "Evidence of English Proficiency",
      ]}
      costs={["AUD 20,000 - 45,000 Per Year", "AUD 29,710 Living Cost (12 months)"]}
      visaProcess={[
        "Selection of course and CRICOS-registered provider",
        "Preparation for English proficiency test",
        "Submission of application for admission",
        "Genuine Student (GS) assessment by the Department of Home Affairs",
        "Receipt of Letter of Offer",
        "Payment of tuition fees and OSHC",
        "Confirmation of Enrollment (CoE)",
        "Student Visa Subclass 500 application",
      ]}
      intakes={["February (Major)", "July (Major)", "October"]}
      lastUpdated="2026-10-08"
      officialSources={[
        { label: "Home Affairs — Student visa (subclass 500)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
        { label: "Home Affairs — Genuine Student requirement", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement" },
      ]}
      faqs={[
        {
          q: "What is the Genuine Student (GS) requirement?",
          a: "The Genuine Student (GS) requirement replaced the former GTE statement for applications lodged from 23 March 2024. It is an integrity assessment by the Department of Home Affairs to make sure the student visa program is used as intended.",
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
    </>
  );
}
