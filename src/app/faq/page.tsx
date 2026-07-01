import { HelpCircle, Plus, Minus, Search } from "lucide-react";
import Link from "next/link";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Frequently Asked Questions | Reason Education Consultancy",
  description: "Find answers to commonly asked questions about studying abroad, IELTS/PTE classes, visa processing, and more at Reason Education Consultancy.",
  alternates: {
    canonical: "/faq",
  },
};

const FAQPage = () => {
  const faqs = [
    {
      category: "General",
      items: [
        { q: "How much do your counseling services cost?", a: "Our initial counseling services are completely free of charge. We believe in providing accessible information to all students." },
        { q: "Where is your office located?", a: "Our main office is located in New Baneswor, (Indreni Complex), Kathmandu, Nepal." },
        { q: "Which countries do you help with?", a: "We specialize in UK, USA, Canada, Australia, New Zealand, Japan, and several European countries." },
      ],
    },
    {
      category: "Admissions & Visas",
      items: [
        { q: "What is the minimum GPA required for Canada?", a: "Generally, a minimum of 2.8 GPA or 55% in +2 or Bachelor's is required, but this varies by institution and course." },
        { q: "How long does the visa process take?", a: "Processing times vary by country. Typically, it takes 2-4 months from application to visa approval." },
        { q: "Do you help with SOP writing?", a: "Yes, our expert counselors provide comprehensive guidance and feedback on Statement of Purpose (SOP) writing." },
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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10 text-center">
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 max-w-4xl mx-auto leading-[1.05] tracking-tight">
             Everything You Need to Know
           </h1>
           <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
             Common questions and expert answers to help you navigate your study abroad journey.
           </p>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="space-y-12">
              {faqs.map((cat, i) => (
                <div key={i}>
                   <h2 className="text-xl font-bold text-primary mb-6 border-b border-gray-100 pb-3 uppercase tracking-widest text-[10px] flex items-center">
                      <HelpCircle size={16} className="mr-2 text-accent" /> {cat.category} Questions
                   </h2>
                   <div className="space-y-4">
                      {cat.items.map((item, j) => (
                        <details key={j} className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:border-accent/20 transition-all shadow-sm">
                           <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                              <span className="text-lg font-bold text-primary pr-6">{item.q}</span>
                              <div className="bg-primary/5 p-2 rounded-xl text-primary group-open:bg-accent group-open:text-white transition-all">
                                 <Plus className="group-open:hidden" size={18} />
                                 <Minus className="hidden group-open:block" size={18} />
                              </div>
                           </summary>
                           <div className="p-6 pt-0 text-base text-primary/70 leading-relaxed font-medium border-t border-gray-50">
                              {item.a}
                           </div>
                        </details>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 bg-accent/10 p-10 rounded-[2.5rem] border border-accent/20 text-center">
              <h3 className="text-xl font-bold text-primary mb-3">Still Have Questions?</h3>
              <p className="text-base text-primary/70 font-medium mb-6">Our expert counselors are ready to help you with personalized answers.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                 <Link href="/contact" className="btn-primary py-3.5 px-8 text-base">Talk to an Expert</Link>
                 <a href="https://wa.me/9779801085977?text=Hello%20Reason%20Education%2C%20I%20have%20a%20question%20about%20studying%20abroad.%20Can%20you%20help%20me%3F" className="bg-white border-2 border-primary/10 px-8 py-3.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-all text-base">Chat on WhatsApp</a>
              </div>
           </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default FAQPage;
