import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
<<<<<<< HEAD
import { JsonLd } from "./Schema";
import { homeFaqs } from "@/content/faq";
=======
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

const faqs = [
  {
    q: "How much do your counselling services cost?",
    a: "Our initial counselling services are completely free of charge. We believe in providing accessible information to all students to help them make informed decisions about their study abroad journey.",
  },
  {
    q: "Which countries do you help with?",
    a: "We specialise in UK, USA, Canada, Australia, New Zealand, Japan, and several European countries, providing expert guidance for each destination including visa requirements and university applications.",
  },
  {
    q: "How long does the visa process take?",
    a: "Processing times vary by country. Typically, it takes 2–4 months from application to visa approval, depending on the destination and intake season. Our team ensures your application is processed as efficiently as possible.",
  },
  {
    q: "Do you help with SOP writing?",
    a: "Yes, our expert counsellors provide comprehensive guidance and feedback on Statement of Purpose (SOP) writing to ensure your application stands out and effectively communicates your academic goals.",
  },
  {
    q: "What is the cost of IELTS/PTE classes?",
    a: "Our IELTS classes cost Rs. 8,000 for 6 weeks, and PTE classes cost Rs. 10,000 for 4 weeks, led by certified expert trainers with years of successful track records in helping students achieve their target scores.",
  },
];
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

const FAQ = () => {
  return (
    <section className="section-padding bg-paper" aria-labelledby="faq-heading">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <div className="container-custom">
<<<<<<< HEAD
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="FAQ"
            id="faq-heading"
            title="Questions students ask first."
            intro="Short, direct answers. If yours is missing, bring it to a first session."
          />
          <Link href="/faq" className="link-arrow inline-flex min-h-11 items-center whitespace-nowrap">
            All FAQs
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid items-start gap-4 min-[560px]:grid-cols-2 md:gap-6">
          {[homeFaqs.slice(0, 3), homeFaqs.slice(3)].map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((faq, index) => (
                <details
                  key={faq.q}
                  className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 open:shadow-card"
                  open={columnIndex === 0 && index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white group-open:text-accent sm:p-6 sm:text-lg">
                    <span className="pr-4">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 font-heading text-[1.75rem] leading-none text-crimson transition-transform duration-200 group-open:rotate-45"
=======
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="FAQ"
              title={<>Questions we get <em>asked most often.</em></>}
              intro="If you don't see yours here, bring it to a first session — we answer them all, no time pressure."
            />
            <div className="mt-8 space-y-3">
              <p className="text-sm font-semibold text-primary">Can&apos;t find it? Call / WhatsApp</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${company.phoneTel}`}
                  className="btn-secondary inline-flex items-center justify-start gap-2"
                >
                  <Phone size={18} aria-hidden="true" />
                  <span>{company.phoneDisplay}</span>
                  <ArrowRight size={16} className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                      className="btn-whatsapp inline-flex items-center justify-start gap-2"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={16} className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 max-w-3xl mx-auto lg:mx-0 w-full">
            <div className="space-y-5 sm:space-y-6">
              {faqs.map((faq, index) => (
                <details
                  key={`faq-${index}`}
                  className="group rounded-xl border border-line bg-white overflow-hidden transition-all duration-200 open:shadow-card"
                  {...(index === 0 ? { open: true } : {})}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-primary group-open:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white list-none">
                    <span className="pr-4">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-crimson transition-transform duration-200 group-open:rotate-45 font-heading text-[1.75rem] leading-none"
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                    >
                      +
                    </span>
                  </summary>
<<<<<<< HEAD
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="border-t border-line pt-4">
                      <p className="text-sm leading-relaxed text-muted sm:text-base">{faq.a}</p>
=======
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="pt-4 border-t border-line">
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {faq.a}
                      </p>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                    </div>
                  </div>
                </details>
              ))}
            </div>
<<<<<<< HEAD
          ))}
=======
          </div>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
        </div>
      </div>
    </section>
  );
};

export default FAQ;
