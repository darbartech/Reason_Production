"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How much do your counseling services cost?",
    a: "Our initial counseling services are completely free of charge. We believe in providing accessible information to all students to help them make informed decisions about their study abroad journey.",
  },
  {
    q: "Which countries do you help with?",
    a: "We specialize in UK, USA, Canada, Australia, New Zealand, Japan, and several European countries, providing expert guidance for each destination including visa requirements and university applications.",
  },
  {
    q: "How long does the visa process take?",
    a: "Processing times vary by country. Typically, it takes 2-4 months from application to visa approval, depending on the destination and intake season. Our team ensures your application is processed efficiently.",
  },
  {
    q: "Do you help with SOP writing?",
    a: "Yes, our expert counselors provide comprehensive guidance and feedback on Statement of Purpose (SOP) writing to ensure your application stands out and effectively communicates your academic goals.",
  },
  {
    q: "What is the cost of IELTS/PTE classes?",
    a: "Our IELTS classes cost Rs. 8,000 for 6 weeks, and PTE classes cost Rs. 10,000 for 4 weeks, led by certified expert trainers with years of successful track record in helping students achieve their target scores.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  const FAQItem = ({ faq, realIndex }: { faq: typeof faqs[0]; realIndex: number }) => {
    const isOpen = openIndex === realIndex;
    
    return (
      <div
        className={`bg-white border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "shadow-xl border-accent-200 ring-2 ring-accent-50" : "border-gray-100 hover:border-accent-100 shadow-sm"
        }`}
      >
        <button
          onClick={() => setOpenIndex(isOpen ? null : realIndex)}
          className="w-full flex items-center justify-between p-5 sm:p-6 lg:p-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-50"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${realIndex}`}
        >
          <span className={`text-base sm:text-lg lg:text-xl font-bold transition-colors pr-4 ${isOpen ? "text-accent" : "text-primary"}`}>
            {faq.q}
          </span>
          <div className={`flex-shrink-0 p-2 rounded-lg transition-all ${isOpen ? "bg-accent text-white rotate-180" : "bg-primary-50 text-primary"}`}>
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </div>
        </button>
        
        <div
          id={`faq-answer-${realIndex}`}
          role="region"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 lg:pb-7 text-sm sm:text-base lg:text-lg text-primary-600 leading-relaxed font-medium border-t border-gray-50">
            {faq.a}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-50 -skew-x-12 translate-x-1/2 pointer-events-none hidden lg:block opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-accent-50 skew-x-12 -translate-x-1/2 pointer-events-none hidden lg:block opacity-60"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 border border-primary-100">
            <HelpCircle size={16} className="text-accent" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
            Frequently Asked
            <span className="text-accent"> Questions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-600 leading-relaxed max-w-2xl mx-auto px-4">
            Find answers to common questions about studying abroad and our services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start max-w-6xl mx-auto">
          <div className="space-y-4 sm:space-y-5">
            {leftColumn.map((faq, index) => (
              <FAQItem key={index} faq={faq} realIndex={index} />
            ))}
          </div>
          <div className="space-y-4 sm:space-y-5">
            {rightColumn.map((faq, index) => (
              <FAQItem key={index} faq={faq} realIndex={index + midPoint} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
