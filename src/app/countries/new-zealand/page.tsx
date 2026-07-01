import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in New Zealand from Nepal | Visa Requirements & Process 2026",
  description: "Planning to study in New Zealand from Nepal? Get expert guidance on admission requirements, visa process, costs, and top universities. 98% success rate.",
  alternates: {
    canonical: "/countries/new-zealand",
  },
  openGraph: {
    title: "Study in New Zealand from Nepal | Complete Guide 2026",
    description: "Expert guidance for Nepalese students planning to study in New Zealand. Admission, visa, costs, and top universities.",
    images: ["https://images.unsplash.com/photo-1589802829985-817e51181b92?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in New Zealand from Nepal | Complete Guide 2026",
    description: "Planning to study in New Zealand from Nepal? Expert guidance on admission, visa, and more.",
    images: ["https://images.unsplash.com/photo-1589802829985-817e51181b92?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function NewZealandPage() {
  return (
    <CountryPageTemplate
      country="New Zealand"
      h1="Study in New Zealand from Nepal"
      overview="New Zealand is a safe environment with a world-class education system, offering beautiful natural landscapes and excellent student support services for Nepalese students."
      image="https://images.unsplash.com/photo-1589802829985-817e51181b92?q=80&w=1471&auto=format&fit=crop"
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
        "Initial counseling and destination selection",
        "English proficiency test (IELTS/PTE)",
        "Application to New Zealand institutions",
        "Offer of Place and Fee Payment",
        "Financial documentation preparation",
        "Online visa application submission",
        "Medical and Biometric collection",
        "Visa approval and pre-departure briefing",
      ]}
      intakes={["February (Major)", "July", "September"]}
      faqs={[
        {
          q: "What are the work rights for students in New Zealand?",
          a: "Most international students in New Zealand can work up to 20 hours per week during academic sessions and full-time during holidays.",
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
  );
}
