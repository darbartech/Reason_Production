import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in Canada from Nepal: Costs & Visa",
  description: "Tuition and living costs for Nepali students in Canada, IELTS/PTE requirements, intakes and study permit steps. Contact Reasons Education for current, reviewed study-permit information.",
  path: "/countries/canada",
});

export default function CanadaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "Canada", path: "/countries/canada" }]} />
      <CountryPageTemplate
        country="Canada"
        image={{
          src: "/images/countries/canada-toronto-skyline.webp",
          alt: "Toronto skyline and Lake Ontario at sunset, Canada",
        }}
        h1="Study in Canada from Nepal: costs, intakes and visa steps"
        overview="Canada is the top choice for Nepalese students due to its world-class education system, multicultural environment, and excellent post-study work opportunities."
        requirements={[
          "Minimum 55% or 2.8 GPA in +2 or Bachelor's",
          "IELTS 6.0 (no band less than 5.5) for UG",
          "IELTS 6.5 (no band less than 6.0) for PG",
          "PTE minimum bands vary by institution. Contact counsellor for current IRCC-accepted scores.",
          "Sufficient financial evidence (per IRCC current proof-of-funds rules).",
          "Provincial Attestation Letter (PAL) — required for most study permit applications since January 2024; your institution typically arranges it after you accept your offer.",
          "Statement of Purpose (SOP)",
          "Police Clearance Certificate",
          "Medical Examination Result",
        ]}
        costs={[
          "CAD 15,000 - 35,000 Per Year",
          "See official IRCC website for the current 12-month living-costs figure.",
        ]}
        visaProcess={[
          "Initial counselling and destination selection",
          "English proficiency test (IELTS/PTE)",
          "Application to Canadian DLI institutions",
          "Receipt of Letter of Acceptance (LOA)",
          "Obtaining the Provincial Attestation Letter (PAL)",
          "Payment of tuition fees and preparation of required financial evidence.",
          "Submission of study permit application via the IRCC portal.",
          "Medical and Biometric collection",
          "Visa approval and pre-departure briefing",
        ]}
        intakes={["September (Major)", "January", "May"]}
        faqs={[
          {
            q: "Where can I find the current IRCC application streams?",
            a: "Visit the official IRCC 'Study in Canada' website or book a free counselling session with us for the latest guidance.",
          },
          {
            q: "Can I work while studying in Canada?",
            a: "Yes, most international students can work up to 24 hours per week off-campus during academic sessions and full-time during scheduled breaks. The limit rose from 20 to 24 hours in November 2024.",
          },
          {
            q: "How do I show proof of funds?",
            a: "Use the latest financial-evidence and living-costs figures published by IRCC. We can help you assemble these documents correctly during counselling.",
          },
        ]}
        lastUpdated="2026-10-08"
        officialSources={[
          { label: "IRCC Study in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" },
          { label: "IRCC — Work off campus", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" },
          { label: "Designated Learning Institutions list", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" },
        ]}
      />
    </>
  );
}
