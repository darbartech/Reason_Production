import Link from "next/link";
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
        crumbs={[
          { name: "Countries", href: "/countries" },
          { name: country },
        ]}
        title={h1}
        intro={overview}
        image={{ name: photo, alt: photoAlt }}
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

      <section className="section-padding">
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
            </div>
          </Block>

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
                ))}
              </div>
            </div>
          </Block>
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
              realistic. We can&apos;t guarantee a visa or an offer.
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
