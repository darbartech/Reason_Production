<<<<<<< HEAD
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { faqCategories, allFaqs } from "@/content/faq";
import { LAST_CHECKED, REVIEWED_BY, whatsappLink } from "@/lib/company";
=======
import CTA from "@/components/CTA";
import FaqExplorer from "./FaqExplorer";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { AlertTriangle } from "lucide-react";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad FAQs for Nepali Students (2026)",
  description:
    "Answers on fees, IELTS/PTE, proof of funds, NOC, visas and what we can't promise. Reasons Education, New Baneshwor, Kathmandu.",
  path: "/faq",
});

<<<<<<< HEAD
export default function FAQPage() {
=======
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

>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
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

<<<<<<< HEAD
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
=======
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
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
        </div>
      </section>

      <CtaBand
        title="Have a question we haven't answered?"
        intro="Bring it to a free session. We answer direct questions directly, even when the answer is no."
      />
    </div>
  );
}
