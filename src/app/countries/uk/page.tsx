import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in UK from Nepal: Costs & Visa",
  description: "UK tuition ranges, IELTS 6.0 bands, Student visa steps, CAS requirements and intake months for Nepali students applying from Kathmandu.",
  path: "/countries/uk",
});

export default function UKPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "UK", path: "/countries/uk" }]} />
      <CountryPageTemplate
      country="United Kingdom"
      image={{
        src: "/images/countries/uk-london-tower-bridge.webp",
        alt: "Tower Bridge and the River Thames in London, United Kingdom",
      }}
      h1="Study in UK from Nepal: costs, intakes and visa steps"
      overview="The UK is renowned for its centuries-old academic tradition, shorter degree durations, and rich cultural experience. It's home to many of the world's best universities."
      requirements={[
        "Minimum 60% or 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 59 (no band less than 51) for the Student visa",
        "Confirmation of Acceptance for Studies (CAS)",
        "Tuberculosis (TB) Test Certificate",
        "Financial evidence — GBP 1,529/month (London) or GBP 1,171/month (outside London) for up to 9 months, plus first-year tuition. Higher amounts apply for applications from 30 November 2026 — check gov.uk for the figure that applies to you.",
        "Immigration Health Surcharge (IHS) payment",
      ]}
      costs={["GBP 12,000 - 30,000 Per Year", "GBP 1,529 Monthly (London) / GBP 1,171 Outside"]}
      visaProcess={[
        "Selection of course and UKVI-licensed sponsor",
        "English proficiency test (IELTS/PTE)",
        "Submission of application for admission",
        "Receipt of Unconditional Offer Letter",
        "Payment of tuition deposit and CAS fee",
        "Request for CAS from the institution",
        "Student visa application online",
        "Identity verification (UKVI ID Check app) and biometrics",
      ]}
      intakes={["September (Major)", "January", "May"]}
      lastUpdated="2026-10-08"
      officialSources={[
        { label: "gov.uk — Student visa money requirement", url: "https://www.gov.uk/student-visa/money" },
        { label: "gov.uk — Graduate visa", url: "https://www.gov.uk/graduate-visa" },
      ]}
      faqs={[
        {
          q: "What is the CAS?",
          a: "The Confirmation of Acceptance for Studies (CAS) is a unique reference number issued by your UK educational institution as part of your student visa application.",
        },
        {
          q: "Can I work in the UK after graduation?",
          a: "Yes, you can apply for the Graduate visa, which currently allows you to stay for 2 years (3 years after a PhD). For applications from 1 January 2027, the stay becomes 18 months for bachelor's and master's graduates; PhD graduates keep 3 years.",
        },
        {
          q: "What is the IHS fee?",
          a: "The Immigration Health Surcharge (IHS) is a fee you pay as part of your visa application to access the UK's National Health Service (NHS).",
        },
        {
          q: "Is the Biometric Residence Permit (BRP) still issued?",
          a: "No. BRPs are being replaced by eVisas — an online record of your immigration status. You verify your identity with the UKVI ID Check app and manage your status through a UKVI online account.",
        },
      ]}
    />
    </>
  );
}
