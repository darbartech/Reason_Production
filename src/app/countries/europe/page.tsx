import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in Europe from Nepal | Schengen Visa & Costs 2026",
  description: "Plan your study in Europe from Nepal with expert guidance. Learn about Schengen visa, tuition-free options, costs, and top European universities.",
  alternates: {
    canonical: "/countries/europe",
  },
  openGraph: {
    title: "Study in Europe from Nepal | Schengen Visa & Costs 2026",
    description: "Expert guidance for Nepalese students planning to study in Europe. Schengen visa, costs, and scholarships.",
    images: ["https://images.unsplash.com/photo-1473946377622-73b54f855779?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Europe from Nepal | Schengen Visa & Costs 2026",
    description: "Expert guidance for Nepalese students planning to study in Europe. Schengen visa, costs, and scholarships.",
    images: ["https://images.unsplash.com/photo-1473946377622-73b54f855779?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function EuropePage() {
  return (
    <CountryPageTemplate
      country="Europe"
      h1="Study in Europe from Nepal"
      overview="Europe offers a wide range of study destinations, including Germany, France, Italy, and Spain, with diverse academic traditions and excellent scholarship opportunities."
      image="https://images.unsplash.com/photo-1473946377622-73b54f855779?q=80&w=1470&auto=format&fit=crop"
      requirements={[
        "Minimum 60% or 2.8 GPA in +2 or Bachelor's",
        "English proficiency (IELTS 6.0/PTE 59) for many",
        "Language proficiency (German/French/Spanish)",
        "Proof of financial capacity (approx. EUR 10,000+)",
        "Schengen visa application and interview",
        "Health insurance and tuberculosis (TB) test",
        "Biometric Residence Permit (BRP) collection",
        "Police clearance and character certificate",
      ]}
      costs={["EUR 5,000 - 25,000 Per Year", "EUR 800 - 1,500 Monthly Living"]}
      visaProcess={[
        "Selection of course and European university",
        "Preparation for English/language proficiency tests",
        "Submission of application for admission",
        "Receipt of Acceptance Letter (Offer Letter)",
        "Payment of tuition deposit and visa fees",
        "Schengen student visa application (Type D)",
        "Visa interview and biometric collection",
        "Visa approval and travel to Europe",
      ]}
      intakes={["September/October (Major)", "February/March"]}
      faqs={[
        {
          q: "What is the Schengen visa?",
          a: "The Schengen visa (Type D) allows international students to live and study in the Schengen area for more than 90 days.",
        },
        {
          q: "Are tuition-free options available?",
          a: "Yes, many European countries like Germany, France, and Norway offer tuition-free or low-tuition education to international students, especially in public universities.",
        },
        {
          q: "Can I work in Europe after graduation?",
          a: "Yes, many European countries offer post-study work permits (e.g., 18 months in Germany, 12 months in France) to international students after finishing their studies.",
        },
      ]}
    />
  );
}
