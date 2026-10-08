import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in New Zealand from Nepal: Costs & Visa",
  description: "Tuition, living costs in NPR, IELTS bands, student visa steps and post-study work rights for Nepali students planning to study in New Zealand.",
  path: "/countries/new-zealand",
});

export default function NewZealandPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "New Zealand", path: "/countries/new-zealand" }]} />
      <CountryPageTemplate
      country="New Zealand"
      image={{
        src: "/images/countries/new-zealand-auckland-waterfront.webp",
        alt: "Auckland Sky Tower and marina waterfront, New Zealand",
      }}
      h1="Study in New Zealand from Nepal: costs, intakes and visa steps"
      overview="New Zealand is a safe environment with a world-class education system, offering beautiful natural landscapes and excellent student support services for Nepalese students."
      requirements={[
        "Minimum 55% or 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 58 (no band less than 50)",
        "Financial evidence for living costs",
        "Statement of Purpose (SOP)",
        "Medical and Character certificates",
      ]}
      costs={["NZD 22,000 - 35,000 Per Year", "NZD 20,000 Living Cost"]}
      visaProcess={[
        "Initial counselling and destination selection",
        "English proficiency test (IELTS/PTE)",
        "Application to New Zealand institutions",
        "Offer of Place and Fee Payment",
        "Financial documentation preparation",
        "Online visa application submission",
        "Medical and Biometric collection",
        "Visa approval and pre-departure briefing",
      ]}
      intakes={["February (Major)", "July", "September"]}
      lastUpdated="2026-10-08"
      officialSources={[
        { label: "Immigration New Zealand — Working on a student visa", url: "https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/" },
      ]}
      faqs={[
        {
          q: "What are the work rights for students in New Zealand?",
          a: "Most international students in New Zealand can work up to 25 hours per week during academic sessions (the limit rose from 20 to 25 hours on 3 November 2025) and full-time during scheduled breaks.",
        },
        {
          q: "Is there a post-study work permit in New Zealand?",
          a: "Yes, New Zealand offers post-study work visas (PSW) for students who have completed eligible qualifications.",
        },
        {
          q: "What is the cost of living for international students in NZ?",
          a: "The recommended living cost for international students is approximately NZD 20,000 per year, covering accommodation, food, and transport.",
        },
      ]}
    />
    </>
  );
}
