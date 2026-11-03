import Link from "next/link";
import { ArrowRight, Calendar, HelpCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import CountryFlag from "./CountryFlag";
import { homeDestinations } from "@/content/countries";

export default function StudyDestinations() {
  return (
    <section className="section-padding bg-paper" aria-labelledby="destinations-heading">
      <div className="container-custom">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Destinations"
            title="Pick a country to see costs, intakes and visa steps."
            intro="Seven destinations, each with current requirements and links to the official source."
            id="destinations-heading"
          />
          <Link href="/countries" className="btn-secondary group hidden whitespace-nowrap lg:flex">
            All country guides
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {homeDestinations.map((country) => (
            <li key={country.slug}>
              <Link
                href={`/countries/${country.slug}`}
                className="group card card-hover flex h-full flex-col p-4 sm:p-5"
                aria-label={`Study in ${country.name}: costs, intakes and visa steps`}
              >
                <div className="flex items-center justify-between gap-2">
                  <CountryFlag code={country.flagCode} className="h-8 w-8" />
                  <span className="rounded border border-line px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-muted">
                    {country.code}
                  </span>
                </div>
                <h3 className="mt-3 text-base transition-colors group-hover:text-accent sm:text-lg">
                  {country.slug === "germany" ? "Germany & Europe" : country.name}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {country.summary}
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted sm:text-xs">
                  <Calendar size={12} className="text-crimson" aria-hidden="true" />
                  {country.intakes}
                </p>
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/contact"
              className="group surface-dark flex h-full flex-col justify-between rounded-xl border border-primary-900 bg-primary-950 p-4 transition-shadow hover:shadow-float sm:p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                <HelpCircle size={18} className="text-crimson" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mt-3 text-base text-white transition-colors group-hover:text-on-dark-link sm:text-lg">
                  Not sure?
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-on-dark sm:text-sm">
                  Bring your results and budget. We&apos;ll shortlist 2–3 countries.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-on-dark-link sm:text-sm">
                Book a free session
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-8 lg:hidden">
          <Link href="/countries" className="btn-secondary group w-full justify-center">
            All country guides
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
