import { Metadata } from "next";
import { HelpCircle, Plus, Minus, Search, AlertTriangle } from "lucide-react";
import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { whatsappLink, company } from "@/lib/company";
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
        { q: "Which countries do you help with?", a: "We specialize in UK, USA, Canada, Australia, New Zealand, Japan, and several European countries." },
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

  // Schema.org JSON-LD
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

      <PageHero
        crumbs={[{ name: "FAQ" }]}
        title="Frequently asked questions about studying abroad"
        intro="If your question isn't here, call us or drop in. We'll tell you honestly whether we can help."
      />

      {/* FAQ Grid */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="space-y-12">
              {faqs.map((cat, i) => (
                <div key={i}>
                   <h2 className="text-primary mb-6 border-b border-brand-border pb-3 uppercase text-[10px] flex items-center">
                      <HelpCircle size={16} className="mr-2 text-accent" /> {cat.category} Questions
                   </h2>
                   <div className="space-y-4">
                      {cat.items.map((item, j) => (
                        <details key={j} className="group bg-white border border-brand-border rounded-xl overflow-hidden hover:border-accent/20 transition-colors duration-200 shadow-sm">
                           <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                              <span className="text-lg font-bold text-primary pr-6">{item.q}</span>
                              <div className="bg-primary/5 p-2 rounded-lg text-primary group-open:bg-accent group-open:text-white transition-colors duration-200">
                                 <Plus className="group-open:hidden" size={18} />
                                 <Minus className="hidden group-open:block" size={18} />
                              </div>
                           </summary>
                           <div className="p-6 pt-0 text-base text-primary/70 leading-relaxed font-medium border-t border-brand-border">
                              {item.a}
                           </div>
                        </details>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 card border border-accent/20 bg-accent/5 p-8 rounded-xl">
             <div className="flex items-start gap-4">
               <div className="w-11 h-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0" aria-hidden="true">
                 <AlertTriangle size={22} />
               </div>
               <div>
                 <h3 className="text-primary">What we can&apos;t do</h3>
                 <p className="mt-3 text-sm sm:text-base text-ink leading-relaxed">
                   We can&apos;t guarantee a visa or an admission offer — those decisions belong to universities and embassies. What we do guarantee is that your file is accurate, complete and submitted on time, and that we tell you honestly where you stand.
                 </p>
               </div>
             </div>
           </div>

           <div className="mt-12 bg-brand-light-bg p-10 rounded-xl border border-brand-border text-center">
              <h3 className="text-primary mb-3">Still Have Questions?</h3>
              <p className="text-base text-primary/70 font-medium mb-6">Our expert counsellors are ready to help you with personalised answers.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                 <Link href="/contact" className="btn-primary py-3.5 px-8 text-base">Talk to an Expert</Link>
                 <a href={whatsappLink()} className="bg-white border border-brand-border px-8 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-base">Chat on WhatsApp</a>
              </div>
           </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default FAQPage;
