"use client";

<<<<<<< HEAD
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import CTA from "@/components/CTA";
=======
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company, whatsappLink } from "@/lib/company";
import type { EnquiryFormData } from "@/lib/validations/enquiry";

const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

<<<<<<< HEAD
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
=======
const googleMapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

const EnquiryFormPrefill = () => {
  const params = useSearchParams();
  const prefill: Partial<EnquiryFormData> = {
    fullName: params.get("fullName") ?? undefined,
    phone: params.get("phone") ?? undefined,
    preferredDestination: (params.get("preferredDestination") ?? undefined) as
      | EnquiryFormData["preferredDestination"]
      | undefined,
  };

  return <EnquiryForm sourcePage="/contact" prefill={prefill} />;
};
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

const ContactClient = () => {
  return (
    <div className="bg-white">
      <PageHero
        variant="compact"
        crumbs={[{ name: "Contact" }]}
<<<<<<< HEAD
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
=======
        eyebrow="Visit or get in touch"
        title="Contact and visit our office"
        intro="Book a free counselling session at New Baneshwor, or reach us through phone, WhatsApp or email — whichever is easier."
        actions={
          <>
            <Link href="#enquiry" className="btn-primary btn-lg w-full sm:w-auto">
              Send an enquiry
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${company.phoneTel}`}
              className="btn-secondary btn-lg w-full sm:w-auto"
            >
              <Phone size={16} aria-hidden="true" />
              Call {company.phoneDisplay}
            </a>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-primary">Get in touch</h2>
                <p className="text-lg text-primary/60 font-medium leading-relaxed">
                  We reply within one working day — come in for a meeting, ring us on the landline or send a
                  WhatsApp and we’ll schedule a session.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-brand-light-bg p-6 rounded-xl border border-brand-border card-hover group">
                  <div className="bg-accent/10 p-3.5 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200 shrink-0">
                    <MapPin size={24} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-primary mb-1">Visit our office</h4>
                    <p className="text-base text-primary/70 font-medium leading-relaxed">
                      {company.address.street}, {company.address.city},{" "}
                      {company.address.country}
                    </p>
                    <a
                      href={googleMapsDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent mt-2 hover:underline"
                    >
                      Get directions <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-brand-light-bg p-6 rounded-xl border border-brand-border card-hover group">
                  <div className="bg-primary/10 p-3.5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shrink-0">
                    <Clock size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1">Opening hours</h4>
                    <p className="text-base text-primary/70 font-medium leading-relaxed">
                      {company.hours.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-brand-light-bg p-6 rounded-xl border border-brand-border card-hover group">
                  <div className="bg-accent/10 p-3.5 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200 shrink-0">
                    <Phone size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1">Call us</h4>
                    <a
                      href={`tel:${company.phoneTel}`}
                      className="text-base text-primary/70 font-medium leading-relaxed hover:text-accent transition-colors duration-200"
                    >
                      {company.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-brand-light-bg p-6 rounded-xl border border-brand-border card-hover group">
                  <div className="bg-primary/10 p-3.5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shrink-0">
                    <MessageCircle size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1">WhatsApp</h4>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-primary/70 font-medium leading-relaxed hover:text-accent transition-colors duration-200"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-brand-light-bg p-6 rounded-xl border border-brand-border card-hover group">
                  <div className="bg-accent/10 p-3.5 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200 shrink-0">
                    <Mail size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1">Email</h4>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-base text-primary/70 font-medium leading-relaxed hover:text-accent transition-colors duration-200 break-all"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-brand-border card-hover">
                  <a
                    href={googleMapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    <div className="h-48 w-full bg-paper hero-grid text-primary/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-lg bg-white/95 px-5 py-3 shadow-card border border-line flex flex-col items-center">
                          <MapPin size={18} className="text-accent" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-5 border-t border-brand-border flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {company.displayName} — Office Map
                        </p>
                        <p className="text-sm text-muted mt-0.5">
                          {company.address.street}, {company.address.city}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View map <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="pt-8 border-t border-brand-border">
                  <h4 className="text-muted uppercase tracking-[0.2em] mb-5 text-sm font-bold">
                    Follow us
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-brand-light-bg border border-brand-border text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                        aria-label={s.label}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div id="enquiry" className="order-1 lg:order-2">
              <h2 className="text-primary mb-6">Send us an enquiry</h2>
              <Suspense fallback={<div className="card p-10 text-center text-muted">Loading form…</div>}>
                <div className="card shadow-card p-6 md:p-8">
                  <EnquiryFormPrefill />
                  <p className="mt-5 text-sm text-muted leading-relaxed">
                    We use your details only to contact you about your enquiry. Read
                    our{" "}
                    <Link
                      href="/privacy" className="underline hover:text-accent">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </Suspense>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
      <section className="w-full border-t border-brand-border bg-brand-light-bg">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-brand-border shadow-md">
            <a
              href={googleMapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
            >
              <div className="h-80 w-full bg-paper hero-grid text-primary/20 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="rounded-lg bg-white/95 px-5 py-3 shadow-card border border-line flex flex-col items-center mb-5">
                    <MapPin size={18} className="text-accent" aria-hidden="true" />
                  </div>
                  <div className="bg-white px-6 py-3 rounded-xl shadow-card text-center">
                    <p className="font-bold text-primary">{company.displayName}</p>
                    <p className="text-sm text-primary/70 mt-1">
                      {company.address.street}, {company.address.city}, {company.address.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-primary">Find us on Google Maps</h3>
                  <p className="text-sm text-primary/60 mt-1">
                    {company.hours.label} · {company.phoneDisplay}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-200"
                  >
                    Get directions <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={googleMapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-light-bg border border-brand-border text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </a>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default ContactClient;
