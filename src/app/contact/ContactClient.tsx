"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { company, whatsappLink } from "@/lib/company";
import type { EnquiryFormData } from "@/lib/validations/enquiry";

const socials = [
  ...(company.social.facebook
    ? [{ label: "Facebook", href: company.social.facebook }]
    : []),
  ...(company.social.instagram
    ? [{ label: "Instagram", href: company.social.instagram }]
    : []),
  ...(company.social.linkedin
    ? [{ label: "LinkedIn", href: company.social.linkedin }]
    : []),
];

const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

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

const ContactClient = () => {
  return (
    <div className="bg-white">
      <PageHero
        variant="compact"
        crumbs={[{ name: "Contact" }]}
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
            </div>
          </div>
        </div>
      </section>

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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactClient;
