import CTA from "@/components/CTA";
import FaqExplorer from "./FaqExplorer";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { AlertTriangle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad FAQs",
  description: "Honest answers to the most common questions about studying abroad from Nepal, IELTS/PTE classes, costs, visa processing and our counselling process in Kathmandu.",
  path: "/faq",
});

const FAQPage = () => {
  const faqs = [
    {
      category: "General",
      items: [
        { q: "How much do your counselling services cost?", a: "Our initial counselling services are completely free of charge. We believe in providing accessible information to all students." },
        { q: "Where is your office located?", a: "Our main office is located in New Baneshwor, (Indreni Complex), Kathmandu, Nepal." },
        { q: "Which countries do you help with?", a: "We specialise in UK, USA, Canada, Australia, New Zealand, Japan, and several European countries." },
      ],
    },
    {
      category: "Admissions & Visas",
      items: [
        { q: "What is the minimum GPA required for Canada?", a: "Generally, a minimum of 2.8 GPA or 55% in +2 or Bachelor's is required, but this varies by institution and course." },
        { q: "How long does the visa process take?", a: "Processing times vary by country. Typically, it takes 2-4 months from application to visa approval." },
        { q: "Do you help with SOP writing?", a: "Yes, our expert counsellors provide comprehensive guidance and feedback on Statement of Purpose (SOP) writing." },
      ],
    },
    {
      category: "Test Preparation",
      items: [
        { q: "What is the cost of IELTS/PTE classes?", a: "Our IELTS classes cost Rs. 8,000 for 6 weeks, and PTE classes cost Rs. 10,000 for 4 weeks." },
        { q: "Do you provide mock tests?", a: "Yes, we provide full-length mock tests every Sunday for all our enrolled students." },
        { q: "Are the trainers certified?", a: "Yes, all our trainers are certified and have years of experience in English proficiency coaching." },
      ],
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(cat => cat.items).map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <JsonLd data={faqSchema} />

      <FaqExplorer faqs={faqs} />

      <section className="pb-16">
        <div className="container-custom">
          <div className="card border border-crimson/20 bg-crimson/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-0.5" aria-hidden="true">
                <AlertTriangle size={22} className="text-crimson" />
              </div>
              <div>
                <h3 className="text-primary">What we can&apos;t do</h3>
                <p className="mt-3 text-sm sm:text-base text-ink leading-relaxed">
                  We can&apos;t guarantee a visa or an admission offer — those decisions belong to universities and embassies. What we do guarantee is that your file is accurate, complete and submitted on time, and that we tell you honestly where you stand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default FAQPage;
