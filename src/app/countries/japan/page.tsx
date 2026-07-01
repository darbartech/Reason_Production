import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in Japan from Nepal | COE & Student Visa 2026",
  description: "Plan your study in Japan from Nepal with expert guidance. Learn about COE, student visa requirements, costs, and top Japanese universities.",
  alternates: {
    canonical: "/countries/japan",
  },
  openGraph: {
    title: "Study in Japan from Nepal | COE & Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in Japan. COE, visa, and language requirements.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Japan from Nepal | COE & Student Visa 2026",
    description: "Expert guidance for Nepalese students planning to study in Japan. COE, visa, and language requirements.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function JapanPage() {
  return (
    <CountryPageTemplate
      country="Japan"
      h1="Study in Japan from Nepal"
      overview="Japan is a unique destination for international students, offering high-tech innovation, a rich culture, and affordable education with excellent part-time work opportunities."
      image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop"
      requirements={[
        "Minimum 50% or 2.5 GPA in +2 or Bachelor's",
        "Japanese language proficiency (N5/N4/N3)",
        "NAT-TEST/JLPT/J-TEST scores for some programs",
        "EJU/JLPT scores for university entrance",
        "Certificate of Eligibility (COE) from Japan",
        "Passport and visa application documents",
        "Proof of financial capacity (approx. JPY 150,000 monthly)",
        "Biometric Residence Permit (BRP) collection",
      ]}
      costs={["JPY 500,000 - 1,200,000 Per Year", "JPY 150,000 Monthly Living"]}
      visaProcess={[
        "Selection of course and Japanese school",
        "Preparation for Japanese language proficiency",
        "Submission of application for admission",
        "Request for COE from the Japanese school",
        "COE approval and student visa application",
        "Student visa approval and pre-departure briefing",
        "Travel to Japan and residence card collection",
        "Japanese university entrance exams (EJU/JLPT)",
      ]}
      intakes={["April (Major)", "October (Major)", "July", "January"]}
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
  );
}
