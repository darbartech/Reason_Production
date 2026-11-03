import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import FaqAccordion from "@/components/FaqAccordion";
import { company, LAST_CHECKED } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";
import { verified } from "@/content/proof";
import { getLandingPage, landingPages } from "@/content/landing-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/lp/${page.slug}`,
    noindex: !page.approved,
  });
}

const trustPoints = [
  "First counselling session is free.",
  "A written fee schedule before you commit.",
  "One counsellor follows your file.",
];

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-paper pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-6">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-[18ch] text-balance">{page.headline}</h1>
            <p className="lead mt-5 max-w-xl">{page.intro}</p>

            <p className="mt-6 text-sm text-muted">
              {company.address.street}, {company.address.city} · {company.hours.label}
            </p>

            <Link
              href={`/countries/${page.countrySlug}`}
              className="link-arrow mt-2 inline-flex min-h-11 items-center"
            >
              Read the {page.destination} guide
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-6" id="enquiry">
            <div className="card bg-white p-6 shadow-lift sm:p-8">
              <h2 className="text-primary">Book a free session</h2>
              <p className="mt-1.5 text-sm text-muted">
                Tell us where you are in the process. Documents come later.
              </p>
              <div className="mt-6">
                <EnquiryForm sourcePage={`/lp/${page.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pb-0">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2>What you need to know</h2>
            <p className="lead mt-4">
              Key facts as of {LAST_CHECKED}. Check each one on the official source before you
              act on it.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="space-y-3">
              {page.facts.map((fact) => (
                <li key={fact} className="flex gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-primary">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 mb-4">Timeline</h3>
            <ol className="space-y-3">
              {page.timeline.map((row, index) => (
                <li key={row.when} className="flex gap-4 rounded-xl border border-line bg-paper p-5">
                  <span aria-hidden="true" className="font-heading text-lg text-crimson">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{row.when}</p>
                    <p className="mt-1 text-sm leading-relaxed text-primary">{row.what}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-balance">Questions about the {page.destination} process</h2>
            <p className="lead mt-4">
              The answers we give in a first session, written down. If your question is not
              here, bring it with you.
            </p>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={page.faqs} defaultOpen={0} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2>How we work</h2>
            <ul className="mt-6 space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-primary">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {verified.length > 0 && (
              <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-muted">
                {verified.map((item) => (
                  <li key={item.id}>{item.claim}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-6">
            <h2>Visit the office</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Address</dt>
                  <dd className="mt-1 font-semibold text-primary">
                    {company.address.street}, {company.address.city} {company.address.postalCode}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Hours</dt>
                  <dd className="mt-1 font-semibold text-primary">{company.hours.label}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${company.phoneTel}`}
                      className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent"
                    >
                      {company.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-2 inline-flex min-h-11 items-center"
            >
              Get directions
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
