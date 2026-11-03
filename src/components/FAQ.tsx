import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { JsonLd } from "./Schema";
import { homeFaqs } from "@/content/faq";

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
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="border-t border-line pt-4">
                      <p className="text-sm leading-relaxed text-muted sm:text-base">{faq.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
