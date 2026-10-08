import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study in Japan from Nepal: Costs & Visa",
  description: "Japanese language requirements, tuition fees, student visa steps and scholarship options for Nepali students applying to universities and colleges in Japan.",
  path: "/countries/japan",
});

export default function JapanPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }, { name: "Japan", path: "/countries/japan" }]} />
      <CountryPageTemplate
      country="Japan"
      image={{
        src: "/images/countries/japan-tokyo-street.webp",
        alt: "Neon-lit shopping street crossing in Tokyo, Japan",
      }}
      h1="Study in Japan from Nepal"
      overview="Japan is a unique destination for international students, offering high-tech innovation, a rich culture, and affordable education with excellent part-time work opportunities."
      requirements={[
        "Minimum 50% or 2.5 GPA in +2 or Bachelor's",
        "Japanese language proficiency (N5/N4/N3)",
        "NAT-TEST/JLPT/J-TEST scores for some programs",
        "EJU/JLPT scores for university entrance",
        "Certificate of Eligibility (COE) from Japan",
        "Passport and visa application documents",
        "Proof of financial capacity (approx. JPY 150,000 monthly)",
        "Academic transcripts and certificates",
      ]}
      costs={["JPY 500,000 - 1,200,000 Per Year", "JPY 150,000 Monthly Living"]}
      visaProcess={[
        "Selection of course and Japanese school",
        "Preparation for Japanese language proficiency",
        "Submission of application for admission",
        "University entrance exams (EJU/JLPT) where required",
        "Request for COE from the Japanese school",
        "COE approval and student visa application",
        "Student visa approval and pre-departure briefing",
        "Travel to Japan and Residence Card collection at the airport",
      ]}
      intakes={["April (Major)", "October (Major)", "July", "January"]}
      lastUpdated="2026-10-08"
      officialSources={[
        { label: "MOFA Japan — Visa information", url: "https://www.mofa.go.jp/j_info/visit/visa/index.html" },
      ]}
      faqs={[
        {
          q: "What is the COE?",
          a: "The Certificate of Eligibility (COE) is a document issued by the Japanese Ministry of Justice to verify your eligibility for a student visa.",
        },
        {
          q: "Can I work in Japan while studying?",
          a: "Yes, international students in Japan can work up to 28 hours per week (and up to 40 hours during breaks) with a work permit.",
        },
        {
          q: "What is the EJU exam?",
          a: "The Examination for Japanese University Admission for International Students (EJU) is a standardized test used by Japanese universities to assess international students.",
        },
      ]}
    />
    </>
  );
}
