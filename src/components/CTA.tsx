import Link from "next/link";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export default function CTA() {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.address.street}, ${company.address.city}, ${company.address.country}`
  )}`;

  return (
    <section className="bg-paper section-padding" aria-labelledby="cta-heading">
      <div className="container-custom">
        <div className="surface-dark reveal relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-14 shadow-float md:px-14 md:py-20">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Free first session</p>
              <h2 id="cta-heading" className="text-balance">
                Talk to a counsellor <em>before you decide anything</em>
              </h2>
              <p className="lead mt-5 max-w-xl !text-on-dark">
                Bring your results and your questions. We&apos;ll tell you honestly what&apos;s realistic and what isn&apos;t.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary btn-lg">
                  Book a free session
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-on-dark btn-lg">
                  <MessageCircle size={18} aria-hidden="true" style={{ color: "#25D366" }} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
