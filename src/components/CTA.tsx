import Link from "next/link";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export default function CTA() {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.address.street}, ${company.address.city}, ${company.address.country}`
  )}`;

  return (
    <section className="surface-dark section-padding relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />

      <div className="container-custom">
        <div className="bg-paper rounded-3xl shadow-float border border-line/60 p-7 sm:p-10 md:p-12 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Free first session</p>
              <h2 id="cta-heading" className="text-balance">
                Talk to a counsellor <em>before you decide anything.</em>
              </h2>
              <p className="lead mt-5 max-w-xl">
                Bring your results and your questions. We'll tell you honestly what's realistic and what isn't.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary btn-lg">
                  Book a free session
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                  <MessageCircle size={18} aria-hidden="true" style={{ color: "#25D366" }} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <dl className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Call</p>
                    <a href={`tel:${company.phoneTel}`} className="font-semibold text-primary hover:underline">
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
                    <p className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Opening hours</p>
                    <span className="font-semibold text-primary">{company.hours.label}</span>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Visit us</p>
                    <span className="font-semibold text-primary leading-relaxed block">
                      {company.address.street}
                      <br />
                      {company.address.city} {company.address.postalCode}
                    </span>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-primary hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      Get directions
                      <MessageCircle size={12} className="hidden" aria-hidden="true" />
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
