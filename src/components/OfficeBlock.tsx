import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";
import { company, whatsappLink } from "@/lib/company";

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}`
)}&output=embed`;

export default function OfficeBlock() {
  return (
    <section id="office" className="section-padding bg-white" aria-labelledby="office-heading">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Visit us"
              id="office-heading"
              title="Come in and ask the difficult questions."
              intro="You do not need an appointment to look around. Booking a session means a counsellor is free when you arrive."
            />

            <dl className="mt-8 space-y-5 border-t border-line pt-6">
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <MapPin size={16} className="text-crimson" aria-hidden="true" />
                  Address
                </dt>
                <dd className="mt-1 font-semibold leading-relaxed text-primary">
                  {company.address.street}
                  <br />
                  {company.address.city} {company.address.postalCode}, {company.address.country}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Clock size={16} className="text-crimson" aria-hidden="true" />
                  Opening hours
                </dt>
                <dd className="mt-1 font-semibold text-primary">{company.hours.label}</dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Phone size={16} className="text-crimson" aria-hidden="true" />
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent"
                  >
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <MessageCircle size={16} className="text-crimson" aria-hidden="true" />
                  WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent"
                  >
                    Chat with us
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get directions
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link href="/contact#enquiry" className="btn-primary">
                Book a free session
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
              <Photo
                name="office-entrance"
                alt=""
                widths={[640, 1200]}
                sizes="(min-width: 1024px) 58vw, 100vw"
                ratio="aspect-[16/10]"
              />
            </figure>

            <div className="mt-5 overflow-hidden rounded-2xl border border-line">
              <iframe
                src={mapEmbed}
                title={`${company.displayName} office location`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
