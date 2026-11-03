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
    <section id="office" className="surface-dark section-padding relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute left-0 top-0 h-px w-full bg-white/10" aria-hidden="true" />

      <div className="container-custom">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 md:p-12 lg:-mx-10 lg:px-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Visit us</p>
              <h2 id="cta-heading" className="text-balance">
                Come in and ask the difficult questions.
              </h2>
              <p className="lead mt-5 max-w-xl">
                You don&apos;t need an appointment to look around. Booking means a counsellor is free when you arrive.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact" className="btn-primary btn-lg">
                  Book a free session
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                  <MessageCircle size={18} aria-hidden="true" />
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
          </div>
        </div>
      </div>
    </section>
  );
}
