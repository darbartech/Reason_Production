import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in Europe from Nepal: Costs & Visa",
  description: "Study in Europe from Nepal: country-by-country guide to tuition, scholarships, English requirements and visa steps. Counselling in Kathmandu.",
  path: "/countries/europe",
});

export default function EuropePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "Europe", path: "/countries/europe" }]} />
      <CountryPageTemplate
      country="Europe"
      image={{
        src: "/images/countries/europe-rothenburg-old-town.webp",
        alt: "Historic half-timbered old town of Rothenburg ob der Tauber, Germany",
      }}
      h1="Study in Europe from Nepal"
      overview="Europe offers a wide range of study destinations, including Germany, France, Italy, and Spain, with diverse academic traditions and excellent scholarship opportunities."
      requirements={[
        "Minimum 60% or 2.8 GPA in +2 or Bachelor's",
        "English proficiency (IELTS 6.0/PTE 59) for many",
        "Language proficiency (German/French/Spanish)",
        "Proof of financial capacity — varies by country (Germany's blocked account: EUR 11,904 per year)",
        "National student visa (Type D) application and interview",
        "Health insurance and tuberculosis (TB) test",
        "Residence permit registration after arrival",
        "Police clearance and character certificate",
      ]}
      costs={["EUR 5,000 - 25,000 Per Year", "EUR 800 - 1,500 Monthly Living"]}
      visaProcess={[
        "Selection of course and European university",
        "Preparation for English/language proficiency tests",
        "Submission of application for admission",
        "Receipt of Acceptance Letter (Offer Letter)",
        "Payment of tuition deposit and visa fees",
        "National student visa (Type D) application",
        "Visa interview and biometric collection",
        "Visa approval and travel to Europe",
      ]}
      intakes={["September/October (Major)", "February/March"]}
      lastUpdated="2026-10-08"
      officialSources={[
        { label: "European Union — Study in Europe", url: "https://european-union.europa.eu/live-work-study/study_en" },
      ]}
      faqs={[
        {
          q: "Do I need a Schengen visa to study in Europe?",
          a: "No. For degree studies you apply for a national long-stay (Type D) student visa and, after arrival, a residence permit from your specific country — not the 90-day Schengen short-stay tourist visa. Each country runs its own process.",
        },
        {
          q: "Are tuition-free options available?",
          a: "Germany's public universities charge little or no tuition (a semester contribution only). Most other European countries — including France and, since autumn 2023, Norway — charge non-EU students tuition fees. We'll help you compare real costs country by country.",
        },
        {
          q: "Can I work in Europe after graduation?",
          a: "Yes, many European countries offer post-study work options (for example, 18 months in Germany to look for work). Rules differ by country, so we build the plan around your destination.",
        },
      ]}
    />
    </>
  );
}
