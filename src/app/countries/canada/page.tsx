import CountryPageTemplate from "@/components/CountryPageTemplate";

export const metadata = {
  title: "Study in Canada from Nepal | Visa Requirements & Process 2026",
  description: "Planning to study in Canada from Nepal? Get expert guidance on admission requirements, visa process, costs, and top universities. 98% success rate.",
  alternates: {
    canonical: "/countries/canada",
  },
  openGraph: {
    title: "Study in Canada from Nepal | Complete Guide 2026",
    description: "Expert guidance for Nepalese students planning to study in Canada. Admission, visa, costs, and top universities.",
    images: ["https://images.unsplash.com/photo-1517935703635-2717079c21eb?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Canada from Nepal | Complete Guide 2026",
    description: "Planning to study in Canada from Nepal? Expert guidance on admission, visa, and more.",
    images: ["https://images.unsplash.com/photo-1517935703635-2717079c21eb?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function CanadaPage() {
  return (
    <CountryPageTemplate
      country="Canada"
      h1="Study in Canada from Nepal"
      overview="Canada is the top choice for Nepalese students due to its world-class education system, multicultural environment, and excellent post-study work opportunities."
      image="https://images.unsplash.com/photo-1517935703635-2717079c21eb?q=80&w=1411&auto=format&fit=crop"
      requirements={[
        "Minimum 55% or 2.8 GPA in +2 or Bachelor's",
        "IELTS 6.0 (no band less than 5.5) for UG",
        "IELTS 6.5 (no band less than 6.0) for PG",
        "PTE 58 (no band less than 50) for SDS",
        "Sufficient financial evidence for GIC",
        "Statement of Purpose (SOP)",
        "Police Clearance Certificate",
        "Medical Examination Result",
      ]}
      costs={["CAD 15,000 - 35,000 Per Year", "GIC CAD 20,635"]}
      visaProcess={[
        "Initial counseling and destination selection",
        "English proficiency test (IELTS/PTE)",
        "Application to Canadian DLI institutions",
        "Receipt of Letter of Acceptance (LOA)",
        "Payment of tuition fees and GIC",
        "Submission of SDS or Non-SDS visa application",
        "Medical and Biometric collection",
        "Visa approval and pre-departure briefing",
      ]}
      intakes={["September (Major)", "January", "May"]}
      faqs={[
        {
          q: "What is the SDS program for Nepal?",
          a: "SDS (Student Direct Stream) is a faster visa processing stream for students who meet specific language and financial requirements (GIC).",
        },
        {
          q: "Can I work while studying in Canada?",
          a: "Yes, most international students can work up to 20 hours per week off-campus during academic sessions and full-time during breaks.",
        },
        {
          q: "What is a GIC?",
          a: "A Guaranteed Investment Certificate (GIC) is a Canadian investment that has a guaranteed rate of return for a fixed period of time, used to prove financial stability.",
        },
      ]}
    />
  );
}
