"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}`
)}&output=embed`;

export default function CTA() {
  return (
<<<<<<< HEAD
    <section id="office" className="surface-dark section-padding relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute left-0 top-0 h-px w-full bg-white/10" aria-hidden="true" />

      <div className="container-custom">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 md:p-12 lg:-mx-10 lg:px-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
=======
    <section className="bg-paper section-padding" aria-labelledby="cta-heading">
      <div className="container-custom">
        <div className="surface-dark reveal relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-14 shadow-float md:px-14 md:py-20">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Visit us</p>
              <h2 id="cta-heading" className="text-balance">
<<<<<<< HEAD
                Come in and ask the difficult questions.
              </h2>
              <p className="lead mt-5 max-w-xl">
                You don&apos;t need an appointment to look around. Booking means a counsellor is free when you arrive.
=======
                Talk to a counsellor <em>before you decide anything</em>
              </h2>
              <p className="lead mt-5 max-w-xl !text-on-dark">
                Bring your results and your questions. We&apos;ll tell you honestly what&apos;s realistic and what isn&apos;t.
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact" className="btn-primary btn-lg">
                  Book a free session
                </Link>
<<<<<<< HEAD
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                  <MessageCircle size={18} aria-hidden="true" />
=======
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-on-dark btn-lg">
                  <MessageCircle size={18} aria-hidden="true" style={{ color: "#25D366" }} />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                  Chat on WhatsApp
                </a>
                <a
                  href={mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-on-dark btn-lg"
                >
                  Get directions
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-on-dark-link">Address</dt>
                    <dd className="mt-1 font-semibold leading-relaxed text-white">
                      {company.address.street}, {company.address.city} {company.address.postalCode}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-on-dark-link">Opening hours</dt>
                    <dd className="mt-1 font-semibold text-white">{company.hours.label}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-on-dark-link">Phone</dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${company.phoneTel}`}
                        className="inline-flex min-h-11 items-center font-semibold text-white hover:underline"
                      >
                        {company.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

<<<<<<< HEAD
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <iframe
                  src={mapEmbed}
                  title={`${company.displayName} office location`}
                  width="100%"
                  height="420"
                  className="h-[300px] w-full sm:h-[360px] lg:h-[420px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
=======
            <dl className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <p className="text-[0.875rem] text-on-dark uppercase tracking-wide font-semibold mb-1">Call</p>
                    <a href={`tel:${company.phoneTel}`} className="font-semibold text-white hover:underline">
                      {company.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Opening hours</dt>
                  <dd>
                    <p className="text-[0.875rem] text-on-dark uppercase tracking-wide font-semibold mb-1">Opening hours</p>
                    <span className="font-semibold text-white">{company.hours.label}</span>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd>
                    <p className="text-[0.875rem] text-on-dark uppercase tracking-wide font-semibold mb-1">Visit us</p>
                    <span className="font-semibold text-white leading-relaxed block">
                      {company.address.street}
                      <br />
                      {company.address.city} {company.address.postalCode}
                    </span>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-dark-link hover:text-white hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      Get directions
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </div>
    </section>
  );
}
