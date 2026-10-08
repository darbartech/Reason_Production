import Link from "next/link";
import Image from "next/image";
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
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";

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
    className="scroll-mt-24"
  >
    <SectionHeader eyebrow={eyebrow} title={title} intro={intro} align="left" />
    <div className="mt-8">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <div className="card p-6 sm:p-8">
    <ul className="grid sm:grid-cols-1 gap-4" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
            aria-hidden="true"
          >
            <CheckCircle2 size={12} />
          </div>
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

  return (
    <div className="bg-white">
      <PageHero
        crumbs={[
          { name: "Countries", href: "/countries" },
          { name: country },
        ]}
        title={h1}
        intro={`${overview}`}
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

      <section className="section-padding">
        <div className="container-custom">
          {image && (
            <figure className="mb-10 lg:mb-14 overflow-hidden rounded-xl border border-line">
              <div className="relative h-56 sm:h-72 lg:h-96">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 1120px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          )}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:gap-x-12">
            <div className="lg:col-span-8 space-y-14 lg:space-y-20">
              <SectionWrapper
                id="requirements"
                eyebrow="Admission requirements"
                title="What you need to apply"
              >
                <BulletList items={requirements} />
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
                          <div
                            className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <Languages size={12} />
                          </div>
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
                          <div
                            className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <Briefcase size={12} />
                          </div>
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
                          <div
                            className="w-5 h-5 rounded-full bg-paper border border-brand-border flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <XCircle size={12} />
                          </div>
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
                          <div
                            className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <Award size={12} />
                          </div>
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
                          <div
                            className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-crimson mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <Handshake size={12} />
                          </div>
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

            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-28 space-y-5">
                <div className="surface-dark p-6 sm:p-7 rounded-xl text-white shadow-card">
                  <h3 className="eyebrow !text-white/60 mb-5">Quick facts</h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-1">
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
                        <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-1">
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
                          <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-1">
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
                        <div
                          className="w-5 h-5 rounded-full bg-paper border border-line flex items-center justify-center text-crimson flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <CheckCircle2 size={12} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {lastUpdated && (
                    <p className="text-[11px] text-muted mt-6 pt-4 border-t border-line leading-relaxed">
                      Last verified: {lastUpdated}
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default CountryPageTemplate;
