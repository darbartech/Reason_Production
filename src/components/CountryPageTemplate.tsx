"use client";

import Link from "next/link";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Languages,
  MessageCircle,
  RefreshCw,
  Wallet,
  XCircle,
} from "lucide-react";
<<<<<<< HEAD
import type { LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import {
  company,
  LAST_CHECKED,
  LAST_CHECKED_ISO,
  REVIEWED_BY,
  whatsappLink,
} from "@/lib/company";
import type { CountryPageData } from "@/content/countryPages";
import { countryPages } from "@/content/countryPages";
=======
import CTA from "@/components/CTA";
import CallbackCard from "@/components/CallbackCard";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";
import { PREFERRED_DESTINATIONS } from "@/lib/validations/enquiry";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

function Block({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
<<<<<<< HEAD
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <SectionHeader id={`${id}-heading`} eyebrow={eyebrow} title={title} intro={intro} align="left" />
      <div className="mt-6">{children}</div>
    </section>
  );
}

function snapshotIcon(label: string): LucideIcon {
  const key = label.toLowerCase();
  if (key.includes("tuition")) return GraduationCap;
  if (key.includes("fund")) return Wallet;
  if (key.includes("intake")) return CalendarDays;
  if (key.includes("graduate")) return Award;
  if (key.includes("english")) return Languages;
  if (key.includes("work")) return Briefcase;
  return FileText;
}

export default function CountryPageTemplate({ data }: { data: CountryPageData }) {
  const {
    slug,
    country,
    h1,
    overview,
    quickAnswer,
    snapshot,
    suits,
    thinkTwice,
    requirements,
    visaSteps,
    moneyTitle,
    moneyParagraphs,
    refusalReasons,
    faqs,
    sources,
    related,
    note,
    photo,
    photoAlt,
  } = data;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: data.description,
    dateModified: LAST_CHECKED_ISO,
    author: { "@type": "Organization", name: company.displayName },
    publisher: { "@id": `${company.url}/#organization` },
    mainEntityOfPage: `${company.url}/countries/${slug}`,
    about: { "@type": "Country", name: country },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
=======
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className="scroll-mt-[140px]"
  >
    <SectionHeader eyebrow={eyebrow} title={title} intro={intro} align="left" />
    <div className="mt-8">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <div className="divide-y divide-line border border-line rounded-xl bg-white">
    <ul role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 px-5 sm:px-6 py-4 last:border-0">
          <CheckCircle2 size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
          <span className="text-ink text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CountryPageTemplate = ({
  country,
  h1,
  overview,
  requirements,
  costs,
  visaProcess,
  intakes,
  faqs,
  lastUpdated,
  officialSources,
  costsNPR,
  englishRequirements,
  proofOfFunds,
  workRights,
  processingTime,
  commonRefusalReasons,
  scholarships,
  ourRole,
  image,
}: CountryPageProps) => {
  const showMetaBar = !!lastUpdated || (!!officialSources && officialSources.length > 0);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "requirements", label: "Requirements" },
    { id: "costs", label: "Costs" },
    { id: "visa-process", label: "Visa steps" },
    { id: "faq", label: "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { name: "Countries", path: "/countries" },
          { name: country, path: `/countries/${slug}` },
        ]}
      />
      <JsonLd data={[articleSchema, faqSchema]} />

      <PageHero
        variant="compact"
        containerMaxWidth="max-w-[1400px]"
        crumbs={[
          { name: "Countries", href: "/countries" },
          { name: country },
        ]}
        eyebrow={`Country guide · ${country}`}
        title={h1}
<<<<<<< HEAD
        intro={overview}
        image={{ name: photo, alt: photoAlt }}
=======
        intro={`${overview}`}
        image={image}
        actions={
          <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
            Book free counselling
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        }
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
      />

      <div className="border-b border-line bg-white">
        <div className="container-custom flex flex-col gap-3 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-muted">
            <RefreshCw size={14} className="text-crimson" aria-hidden="true" />
            <span>
              Last checked {LAST_CHECKED} · Reviewed by {REVIEWED_BY}
            </span>
          </p>
          <Link
            href="/eligibility"
            className="inline-flex min-h-11 items-center gap-1 font-medium text-crimson hover:text-primary"
          >
            Check your eligibility
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Page sections"
        className="sticky top-[68px] z-30 bg-white/95 backdrop-blur border-b border-line"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="lg:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-2 w-max py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`snap-start shrink-0 px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "underline decoration-crimson decoration-2 underline-offset-[6px] text-primary font-semibold"
                      : "border border-line bg-white text-primary hover:bg-paper"
                  }`}
                  aria-current={activeTab === tab.id ? "location" : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-5 gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "underline decoration-crimson decoration-2 underline-offset-[6px] text-primary font-semibold"
                    : "border border-line bg-white text-primary hover:bg-paper"
                }`}
                aria-current={activeTab === tab.id ? "location" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="section-padding">
<<<<<<< HEAD
        <div className="container-custom mx-auto max-w-5xl space-y-14 lg:space-y-20">
          <section aria-labelledby="quick-answer-heading" className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 id="quick-answer-heading" className="eyebrow mb-3">
              Quick answer
            </h2>
            <p className="text-base leading-relaxed text-ink sm:text-lg">{quickAnswer}</p>
          </section>

          <Block
            id="snapshot"
            eyebrow="Snapshot"
            title={`${country} at a glance`}
            intro="The facts students compare first. Each figure is dated; the official sources are listed below."
          >
            <div className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Key facts for studying in {country} as a Nepali student
                </caption>
                <tbody>
                  {snapshot.map((row, index) => {
                    const Icon = snapshotIcon(row.label);
                    return (
                      <tr key={row.label} className={index > 0 ? "border-t border-line" : ""}>
                        <th
                          scope="row"
                          className="w-[38%] bg-paper px-4 py-4 align-top text-xs font-semibold uppercase tracking-wide text-muted sm:px-5"
                        >
                          <span className="flex items-start gap-2">
                            <Icon size={14} className="mt-0.5 flex-shrink-0 text-crimson" aria-hidden="true" />
                            {row.label}
                          </span>
                        </th>
                        <td className="px-4 py-4 align-top leading-relaxed text-ink sm:px-5">
                          {row.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
=======
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div id="overview" className="scroll-mt-[140px]" />
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:gap-x-12">
            <div className="lg:col-span-9 space-y-14 lg:space-y-20">
              <SectionWrapper
                id="requirements"
                eyebrow="Admission requirements"
                title="What you need to apply"
              >
                <BulletList items={requirements} />
              </SectionWrapper>

              <SectionWrapper
                id="costs"
                eyebrow="Costs"
                title="Tuition and living expenses"
                intro="Typical ranges for international students; exact figures depend on university, city, and programme length."
              >
                <div className="divide-y divide-line border border-line rounded-xl bg-white">
                  <ul role="list">
                    {costs.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 px-5 sm:px-6 py-4 last:border-0">
                        <DollarSign size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                        <span className="text-ink text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionWrapper>

              {englishRequirements && englishRequirements.length > 0 && (
                <SectionWrapper
                  id="english-requirements"
                  eyebrow="English proficiency"
                  title="Accepted tests and minimum scores"
                >
                  <div className="card p-6 sm:p-8">
                    <ul className="grid sm:grid-cols-1 gap-4" role="list">
                      {englishRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Languages size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-ink text-sm leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionWrapper>
              )}

              {costsNPR && costsNPR.length > 0 && (
                <SectionWrapper
                  id="costs-npr"
                  eyebrow="Costs in NPR"
                  title="Estimated budget for Nepali students"
                  intro="Figures are approximate conversions; verify current exchange rates and tuition at the institution before planning."
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    {costsNPR.map((item, i) => (
                      <div key={i} className="card p-5 sm:p-6 flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg bg-paper border border-brand-border flex items-center justify-center text-crimson flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Landmark size={18} />
                        </div>
                        <p className="text-sm text-ink leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </SectionWrapper>
              )}

              {proofOfFunds && proofOfFunds.length > 0 && (
                <SectionWrapper
                  id="proof-of-funds"
                  eyebrow="Proof of funds"
                  title="Financial evidence required for your visa"
                >
                  <BulletList items={proofOfFunds} />
                </SectionWrapper>
              )}

              <SectionWrapper
                id="visa-process"
                eyebrow="Visa application"
                title="Step-by-step guidance"
              >
                <div className="grid gap-3">
                  {visaProcess.map((step, i) => (
                    <article
                      key={i}
                      className="card p-4 sm:p-5 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary text-white flex items-center justify-center font-heading text-base sm:text-lg flex-shrink-0"
                        aria-label={`Step ${i + 1}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm sm:text-base text-ink leading-snug">{step}</p>
                    </article>
                  ))}
                </div>
              </SectionWrapper>

              {workRights && workRights.length > 0 && (
                <SectionWrapper
                  id="work-rights"
                  eyebrow="Work rights"
                  title="Part-time work and post-study opportunities"
                >
                  <div className="card p-6 sm:p-8">
                    <ul className="grid sm:grid-cols-1 gap-4" role="list">
                      {workRights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Briefcase size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-ink text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionWrapper>
              )}

              {commonRefusalReasons && commonRefusalReasons.length > 0 && (
                <SectionWrapper
                  id="refusal-reasons"
                  eyebrow="Common refusal reasons"
                  title="Mistakes to avoid in your application"
                  intro="Knowing the typical pitfalls helps us prepare a stronger file on your behalf."
                >
                  <div className="card p-6 sm:p-8">
                    <ul className="grid sm:grid-cols-1 gap-4" role="list">
                      {commonRefusalReasons.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <XCircle size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-ink text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionWrapper>
              )}

              {scholarships && scholarships.length > 0 && (
                <SectionWrapper
                  id="scholarships"
                  eyebrow="Scholarships"
                  title="Funding opportunities you can apply for"
                >
                  <div className="card p-6 sm:p-8">
                    <ul className="grid sm:grid-cols-1 gap-4" role="list">
                      {scholarships.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Award size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-ink text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionWrapper>
              )}

              {ourRole && ourRole.length > 0 && (
                <SectionWrapper
                  id="our-role"
                  eyebrow={`Why ${company.displayName}`}
                  title="How we support your application"
                  intro="From course shortlisting to visa lodgement and pre-departure, we stay with you at every step."
                >
                  <div className="card p-6 sm:p-8">
                    <ul className="grid sm:grid-cols-1 gap-4" role="list">
                      {ourRole.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Handshake size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-ink text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionWrapper>
              )}

              <SectionWrapper
                id="faq"
                eyebrow="FAQ"
                title="Frequently asked questions"
                intro="If your question isn't here, book a free counselling session and we'll walk through it together."
              >
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="card p-0 overflow-hidden group"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <span className="text-sm sm:text-base font-medium text-ink pr-4">
                          {faq.q}
                        </span>
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-paper flex items-center justify-center text-ink group-open:rotate-180 transition-transform duration-200 flex-shrink-0"
                          aria-hidden="true"
                        >
                          <ChevronRight size={18} className="rotate-90" />
                        </div>
                      </summary>
                      <div className="px-5 pb-5 text-sm sm:text-base text-muted leading-relaxed border-t border-line pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </SectionWrapper>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
            </div>
          </Block>

<<<<<<< HEAD
          <Block id="fit" eyebrow="Fit" title="Who it suits — and who should think twice">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-6">
                <h3 className="mb-4 text-base text-primary">It suits you if…</h3>
                <ul className="space-y-3">
                  {suits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-crimson" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-base text-primary">
                  <AlertTriangle size={18} className="text-amber-600" aria-hidden="true" />
                  Think twice if…
                </h3>
                <p className="text-sm leading-relaxed text-ink">{thinkTwice}</p>
              </div>
            </div>
          </Block>

          <Block
            id="requirements"
            eyebrow="Requirements"
            title="What you need to apply"
            intro="Typical requirements. Each institution sets its own academic and English minimums."
          >
            <ol className="card divide-y divide-line p-0">
              {requirements.map((item, index) => (
                <li key={item} className="flex items-start gap-4 p-5 sm:p-6">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm text-primary"
                    aria-hidden="true"
=======
            <aside className="lg:col-span-3 mt-12 lg:mt-0">
              <div className="sticky top-28 lg:top-[140px] space-y-5">
                <div className="surface-dark p-6 sm:p-7 rounded-xl text-white shadow-card">
                  <h3 className="eyebrow !text-on-dark-link mb-5">Quick facts</h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                          Estimated cost
                        </p>
                        <p className="text-base font-semibold">{costs[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                          Major intakes
                        </p>
                        <p className="text-base font-semibold">
                          {intakes.join(", ")}
                        </p>
                      </div>
                    </div>

                    {processingTime && (
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                          aria-hidden="true"
                        >
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                            Typical processing
                          </p>
                          <p className="text-base font-semibold">
                            {processingTime}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="btn-primary w-full mt-7 py-3 text-sm"
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-ink sm:text-base">{item}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block
            id="visa-steps"
            eyebrow="Visa"
            title="Visa steps, in order"
            intro={`The ${country} process from your first shortlist to the flight.`}
          >
            <ol className="space-y-3">
              {visaSteps.map((step, index) => (
                <li key={step} className="card flex items-center gap-4 p-4 sm:p-5">
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary font-heading text-base text-white sm:h-12 sm:w-12 sm:text-lg"
                    aria-label={`Step ${index + 1}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-ink sm:text-base">{step}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block
            id="money"
            eyebrow="Money & mistakes"
            title={moneyTitle}
            intro="What officers look for in the financial file — and why applications usually fail."
          >
            <div className="card p-6 sm:p-8">
              <Wallet size={22} className="text-crimson" aria-hidden="true" />
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink sm:text-base">
                {moneyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <h3 className="mt-8 mb-4 flex items-center gap-2 text-base text-primary">
                <XCircle size={18} className="text-crimson" aria-hidden="true" />
                Three common refusal reasons
              </h3>
              <ul className="space-y-3">
                {refusalReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-crimson"
                      aria-hidden="true"
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Block>

          <Block
            id="faq"
            eyebrow="FAQ"
            title={`${country} questions, answered`}
            intro="Four questions students ask before they book a session."
          >
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="card group overflow-hidden p-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 sm:p-6">
                    <span className="pr-4 text-sm font-medium text-ink sm:text-base">{faq.q}</span>
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-paper text-ink transition-transform duration-200 group-open:rotate-90"
                      aria-hidden="true"
                    >
                      <ArrowRight size={16} />
                    </span>
                  </summary>
                  <div className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
              <h3 className="mb-3 flex items-center gap-2 text-base text-primary">
                <FileText size={18} className="text-crimson" aria-hidden="true" />
                Official sources
              </h3>
              <ul className="space-y-2">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-crimson hover:text-primary"
                    >
                      {source.label}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              {note && <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">{note}</p>}
            </div>

            <div className="mt-6 rounded-2xl border border-line p-6">
              <h3 className="mb-3 text-base text-primary">Keep reading</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { label: "How the study abroad process works", href: "/study-abroad" },
                  { label: "Prepare for the English test", href: "/ielts" },
                  ...related.map((relatedSlug) => ({
                    label: `Study in ${countryPages[relatedSlug].country}`,
                    href: `/countries/${relatedSlug}`,
                  })),
                  { label: "Our fees", href: "/fees" },
                  { label: "Book a free session", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-crimson hover:text-primary"
                  >
                    {link.label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
<<<<<<< HEAD
                ))}
              </div>
            </div>
          </Block>
=======
                </div>

                <div className="card p-6 sm:p-7">
                  <h4 className="eyebrow mb-5">Working with {company.displayName}</h4>
                  <ul className="space-y-3">
                    {[
                      "Counsellor assigned to your file",
                      "Document checklist and SOP draft",
                      "Visa form review before submission",
                      "Pre-departure briefing before you fly",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-muted text-sm"
                      >
                        <CheckCircle2 size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {lastUpdated && (
                    <p className="text-sm text-muted mt-6 pt-4 border-t border-line leading-relaxed">
                      Last verified: {lastUpdated}
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-14 lg:mt-20">
            <CallbackCard defaultDestination={country as (typeof PREFERRED_DESTINATIONS)[number]} />
          </div>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
        </div>
      </section>

      <section aria-labelledby="country-cta-heading" className="section-padding pt-0">
        <div className="container-custom mx-auto max-w-5xl">
          <div className="surface-dark rounded-2xl p-7 text-white sm:p-10">
            <h2 id="country-cta-heading" className="text-white">
              Ready to plan your {country} application?
            </h2>
            <p className="mt-4 max-w-2xl text-on-dark">
              We&apos;ll check your results against current requirements and tell you what&apos;s
              realistic.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-on-dark justify-center">
                Book a free session
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(`Hello Reasons Education, I'd like to ask about studying in ${country}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-xs text-white/55">
              Last checked {LAST_CHECKED} · Reviewed by {REVIEWED_BY}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
