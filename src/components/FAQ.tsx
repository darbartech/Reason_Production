import SectionHeader from "./SectionHeader";

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

const FAQ = () => {
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  return (
    <section className="section-padding bg-paper relative overflow-hidden">
      <div className="container-custom">
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <SectionHeader
            eyebrow="FAQ"
            title={<>Questions we get <em>asked most often.</em></>}
            intro="If you don't see yours here, bring it to a first session — we answer them all, no time pressure."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto lg:gap-8 items-start">
          <div className="space-y-5 sm:space-y-6">
            {leftColumn.map((faq, index) => (
              <details
                key={`l-${index}`}
                className={`group rounded-2xl border border-line bg-white overflow-hidden transition-all duration-200 open:shadow-card ${
                  index === 0 ? "open" : ""
                }`}
                {...(index === 0 ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-primary group-open:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white list-none">
                  <span className="pr-4">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-crimson transition-transform duration-200 group-open:rotate-45 font-heading text-[1.75rem] leading-none"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <div className="pt-4 border-t border-line">
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className="space-y-5 sm:space-y-6">
            {rightColumn.map((faq, index) => (
              <details
                key={`r-${index}`}
                className="group rounded-2xl border border-line bg-white overflow-hidden transition-all duration-200 open:shadow-card"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-primary group-open:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white list-none">
                  <span className="pr-4">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-crimson transition-transform duration-200 group-open:rotate-45 font-heading text-[1.75rem] leading-none"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <div className="pt-4 border-t border-line">
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
