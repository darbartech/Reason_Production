"use client";

import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import CTA from "@/components/CTA";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company, whatsappLink } from "@/lib/company";

const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

const nextSteps = [
  {
    title: "We reply",
    text: "By call or WhatsApp, using the number you give us.",
  },
  {
    title: "We meet",
    text: "A free session of about 30 minutes, in person or by phone.",
  },
  {
    title: "You get a plan",
    text: "A short written shortlist and next steps. No obligation.",
  },
];

const bringItems = [
  "Marksheets and certificates",
  "Passport, if you have one",
  "Any English test result",
  "Your budget range",
];

const ContactClient = () => {
  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "Contact" }]}
        title="Book a free session"
        intro="Choose what's easiest: fill the short form, call, WhatsApp or visit us."
        image={{
          name: "hero-counselling",
          alt: "Students and a counsellor talking at a table with laptops",
          position: "center 45%",
        }}
        ctaHref="#enquiry"
        ctaLabel="Start the form"
      />

      <section className="section-padding" aria-labelledby="reach-heading">
        <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Three ways to reach us" id="reach-heading" title="Visit, call, or message." />

            <dl className="mt-8 space-y-4">
              <div className="rounded-xl border border-line bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <MapPin size={16} className="text-crimson" aria-hidden="true" />
                  Visit
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  {company.address.street}, {company.address.city} {company.address.postalCode}
                  <br />
                  {company.hours.label}
                  <a
                    href={googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent hover:underline"
                  >
                    Get directions <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Phone size={16} className="text-crimson" aria-hidden="true" />
                  Call
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  <a href={`tel:${company.phoneTel}`} className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent">
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <MessageCircle size={16} className="text-crimson" aria-hidden="true" />
                  WhatsApp
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent"
                  >
                    Chat now
                  </a>
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Mail size={16} className="text-crimson" aria-hidden="true" />
                  Email
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent">
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7" id="enquiry">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
              <EnquiryForm sourcePage="/contact" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="next-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="What happens next"
              id="next-heading"
              title="Three steps, no pressure."
              intro="What happens after you send the form."
            />
          </div>
          <ol className="space-y-3 lg:col-span-8">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span aria-hidden="true" className="font-heading text-xl text-crimson">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="container-custom mt-10">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-primary">Bring this</h2>
            <p className="mt-2 text-sm text-muted">Optional. Start with what you have.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {bringItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 size={14} className="text-crimson" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default ContactClient;
