"use client";

import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { company, whatsappLink } from "@/lib/company";

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

const ContactClient = () => {
  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "Contact" }]}
        title="Contact and visit our office"
        intro="Book a free counselling session at New Baneshwor, or reach us through phone, WhatsApp or email — whichever is easier."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-10">
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
              </div>

              {socials.length > 0 && (
                <div className="pt-8 border-t border-brand-border">
                  <h4 className="text-primary/40 uppercase tracking-[0.2em] mb-5 text-xs font-bold">
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

            <div>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-brand-border shadow-md">
                <EnquiryForm sourcePage="/contact" />
                <p className="mt-5 text-xs text-muted leading-relaxed">
                  We use your details only to contact you about your enquiry. Read
                  our{" "}
                  <Link
                    href="/privacy" className="underline hover:text-accent">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[360px] w-full border-t border-brand-border">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
          `${company.address.street}, ${company.address.city}`
        )}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${company.displayName} office location`}
        />
      </section>
    </div>
  );
};

export default ContactClient;
