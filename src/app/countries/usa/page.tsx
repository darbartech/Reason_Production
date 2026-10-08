import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in USA from Nepal: Costs & Visa",
  description: "Tuition, funding and F-1 student visa steps for Nepali students applying to US colleges and universities. IELTS/TOEFL and financial proof.",
  path: "/countries/usa",
});

export default function USAPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "USA", path: "/countries/usa" }]} />
      <CountryPageTemplate
      country="USA"
      image={{
        src: "/images/countries/usa-new-york-times-square.webp",
        alt: "Billboards and crowds in Times Square, New York City, USA",
      }}
      h1="Study in USA from Nepal: costs, intakes and visa steps"
      overview="The USA is the world's most popular study destination, offering cutting-edge research, a diverse culture, and top-tier universities with significant scholarship opportunities."
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
          {
            q: "How long is the F-1 visa interview wait?",
            a: "Interview wait times vary by season and by embassy. Check current appointment availability on the official travel.state.gov website, and book your interview as early as your I-20 allows.",
          },
        ]}
        lastUpdated="2026-10-08"
        officialSources={[
          { label: "travel.state.gov — Student visa", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
        ]}
      />
    </>
  );
}
