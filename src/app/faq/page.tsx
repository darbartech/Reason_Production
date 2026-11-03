import { HelpCircle } from "lucide-react";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { faqCategories, allFaqs } from "@/content/faq";
import { LAST_CHECKED, REVIEWED_BY, whatsappLink } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad FAQs for Nepali Students (2026)",
  description:
    "Answers on fees, IELTS/PTE, proof of funds, NOC, visas and what we can't promise. Reasons Education, New Baneshwor, Kathmandu.",
  path: "/faq",
});

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <JsonLd data={faqSchema} />

      <PageHero
        crumbs={[{ name: "FAQ" }]}
        title="Study abroad questions, answered"
        intro="Short answers to what students and parents ask first. Can't find yours? Call or drop in."
        image={{
          name: "hero-counselling",
          alt: "Students and a counsellor talking at a table with laptops",
          position: "center 45%",
        }}
      />

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid items-start gap-8 min-[560px]:grid-cols-2 md:gap-y-12 lg:gap-x-10 lg:gap-y-14">
            {faqCategories.map((cat) => (
              <div key={cat.category} className="min-w-0">
                <h2 className="mb-6 flex items-center gap-2 border-b border-line pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  <HelpCircle size={16} aria-hidden="true" />
                  {cat.category}
                </h2>
                <FaqAccordion items={cat.items} defaultOpen={cat.category === "About us" ? 0 : -1} />
              </div>
            ))}
          </div>

          
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h2 className="mb-3 text-primary">Still have questions?</h2>
                <p className="mb-6 text-base text-muted">Book a free session or send us a message on WhatsApp.</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-primary">
                    Book a free session
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="relative min-h-[220px] md:min-h-full">
                <Photo
                  name="blog-hero"
                  alt="Open books and handwritten notes on a desk"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  fill
                />
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted">
            Last checked: {LAST_CHECKED} · Reviewed by {REVIEWED_BY}
          </p>
        </div>
      </section>

      <CtaBand
        title="Have a question we haven't answered?"
        intro="Bring it to a free session. We answer direct questions directly, even when the answer is no."
      />
    </div>
  );
}
