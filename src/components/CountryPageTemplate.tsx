"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  DollarSign,
  Calendar,
  GraduationCap,
  Clock,
  FileText,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Briefcase,
  XCircle,
  Award,
  Handshake,
  Languages,
  Landmark,
} from "lucide-react";
import CTA from "@/components/CTA";
import CallbackCard from "@/components/CallbackCard";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";
import { PREFERRED_DESTINATIONS } from "@/lib/validations/enquiry";

export interface OfficialSource {
  label: string;
  url: string;
}

export interface CountryImage {
  src: string;
  alt: string;
}

export interface CountryPageProps {
  country: string;
  h1: string;
  overview: string;
  requirements: string[];
  costs: string[];
  visaProcess: string[];
  intakes: string[];
  faqs: { q: string; a: string }[];
  lastUpdated?: string;
  officialSources?: OfficialSource[];
  costsNPR?: string[];
  englishRequirements?: string[];
  proofOfFunds?: string[];
  workRights?: string[];
  processingTime?: string;
  commonRefusalReasons?: string[];
  scholarships?: string[];
  ourRole?: string[];
  image?: CountryImage;
}

const SectionWrapper = ({
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

  return (
    <div className="bg-white">
      <PageHero
        variant="compact"
        containerMaxWidth="max-w-[1400px]"
        crumbs={[
          { name: "Countries", href: "/countries" },
          { name: country },
        ]}
        eyebrow={`Country guide · ${country}`}
        title={h1}
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
      />

      {showMetaBar && (
        <section className="bg-paper border-b border-brand-border">
          <div className="container-custom py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
              {lastUpdated && (
                <div className="flex items-center gap-2 text-muted">
                  <RefreshCw size={14} className="text-crimson flex-shrink-0" aria-hidden="true" />
                  <span>Last verified {lastUpdated}</span>
                </div>
              )}
              {officialSources && officialSources.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="flex items-center gap-2 text-muted">
                    <ExternalLink size={14} className="text-crimson flex-shrink-0" aria-hidden="true" />
                    <span>Official sources:</span>
                  </span>
                  {officialSources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-crimson hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {src.label}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
            </div>

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
                  >
                    Book free counselling{" "}
                    <ArrowRight
                      size={16}
                      className="ml-1 inline-block"
                      aria-hidden="true"
                    />
                  </Link>
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
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default CountryPageTemplate;
