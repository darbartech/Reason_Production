import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/company";
import CallbackCard from "./CallbackCard";

const proof = [
  { value: "7", label: "Study destinations" },
  { value: "Free", label: "First counselling session" },
  { value: "In-house", label: "IELTS & PTE classes" },
  { value: `Since ${company.established}`, label: "Counselling Nepali students" },
];

export default function Hero() {
  return (
    <section className="bg-paper pt-10 pb-14 md:pt-16 md:pb-20 lg:pb-24" aria-labelledby="hero-heading">
      <div className="container-custom">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Education consultancy · New Baneshwor, Kathmandu</p>

            <h1 id="hero-heading" className="text-balance max-w-[18ch] sm:max-w-[20ch]">
              Study abroad, <em>planned one step at a time.</em>
            </h1>

            <p className="lead mt-6 max-w-xl">
              Course and country selection, applications, IELTS/PTE preparation and visa
              documents — handled by one counselling team you can meet in person.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary group w-full sm:w-auto">
                Book a free counselling session
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a href={`tel:${company.phoneTel}`} className="btn-secondary w-full sm:w-auto">
                <Phone size={16} aria-hidden="true" />
                Call {company.phoneDisplay}
              </a>
            </div>

            {company.registration.number && (
              <p className="mt-5 text-sm text-muted">
                Registered{company.registration.authority ? ` with ${company.registration.authority}` : ""} · Reg. No. {company.registration.number}
                {company.registration.pan ? ` · PAN ${company.registration.pan}` : ""}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <CallbackCard />

            <figure className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <Image
                  src="/images/hero/counselling-session.webp"
                  alt="Students reviewing course options together on laptops"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted">
                Free first session · {company.address.street}, {company.address.city}.
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 lg:mt-16">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block font-heading text-2xl font-medium text-primary md:text-3xl">{p.value}</span>
                <span className="mt-1 block text-sm text-muted">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
