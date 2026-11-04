import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CountryFlag from "@/components/CountryFlag";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Schema";
import { LAST_CHECKED } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Destinations for Nepali Students: Compare 7 Countries",
  description:
    "Compare the UK, USA, Canada, Australia, New Zealand, Germany/Europe and Japan: intakes, costs, English tests and visa steps for Nepali students.",
  path: "/countries",
  image: "/og/countries.png",
});

const rows = [
  {
    name: "UK",
    flag: "gb",
    href: "/countries/uk",
    tuition: "£12,000–30,000",
    living: "£1,570/£1,203 per month from 30 Nov 2026",
    intakes: "Sep, Jan",
    work: "Graduate route",
  },
  {
    name: "Canada",
    flag: "ca",
    href: "/countries/canada",
    tuition: "CAD 15,000–35,000",
    living: "CAD 23,448 proof of funds (1 Sep 2026)",
    intakes: "Sep, Jan, May",
    work: "PGWP",
  },
  {
    name: "Australia",
    flag: "au",
    href: "/countries/australia",
    tuition: "AUD 20,000–45,000",
    living: "AUD 29,710 (12 months)",
    intakes: "Feb, Jul",
    work: "Subclass 485",
  },
  {
    name: "USA",
    flag: "us",
    href: "/countries/usa",
    tuition: "US$20,000–60,000",
    living: "I-20 total cost",
    intakes: "Aug, Jan",
    work: "OPT",
  },
  {
    name: "New Zealand",
    flag: "nz",
    href: "/countries/new-zealand",
    tuition: "NZ$22,000–35,000",
    living: "NZ$20,000 / year",
    intakes: "Feb, Jul",
    work: "PSW visa",
  },
  {
    name: "Germany",
    flag: "de",
    href: "/countries/germany",
    tuition: "Mostly low or none*",
    living: "€11,904 blocked account",
    intakes: "Oct, Apr",
    work: "18-month job search",
  },
  {
    name: "Japan",
    flag: "jp",
    href: "/countries/japan",
    tuition: "Set by your school",
    living: "Set by your school",
    intakes: "Apr, Oct",
    work: "Rules vary",
  },
];

const questions = [
  "Can I study my course there? Check which countries are strong for your field.",
  "Can I afford the first year? Tuition + official proof of funds + one-off costs.",
  "What do I want after graduation? Compare post-study work rules — they change often.",
];

export default function CountriesPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }]} />
      <PageHero
        crumbs={[{ name: "Countries" }]}
        title="Study destinations for Nepali students"
        intro="Compare seven destinations, then book a free session to build a shortlist that fits your profile and budget."
        image={{
          name: "study-abroad",
          alt: "A university building and lawn on a campus abroad",
        }}
      />

      <section className="section-padding" aria-labelledby="compare-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow={`As of ${LAST_CHECKED}`}
            id="compare-heading"
            title="Compare seven destinations."
            intro="Official living-cost figures are linked on each country guide. Tuition ranges are typical — confirm them against the institutions on your shortlist."
          />

          <ul className="mt-8 space-y-3 lg:hidden">
            {rows.map((row) => (
              <li key={row.name} className="rounded-2xl border border-line bg-white p-5">
                <Link
                  href={row.href}
                  className="flex min-h-11 items-center gap-2.5 font-semibold text-primary"
                >
                  <CountryFlag code={row.flag} className="h-6 w-6" />
                  {row.name}
                  <ArrowRight size={15} className="ml-auto text-accent" aria-hidden="true" />
                </Link>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Tuition / yr</dt>
                    <dd className="mt-0.5 text-ink">{row.tuition}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Intakes</dt>
                    <dd className="mt-0.5 text-ink">{row.intakes}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Living costs</dt>
                    <dd className="mt-0.5 text-ink">{row.living}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Post-study work</dt>
                    <dd className="mt-0.5 text-ink">{row.work}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-line lg:block">
            <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
              <caption className="sr-only">Study destinations compared</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-primary">Country</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Typical tuition / yr</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Living costs (official)</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Intakes</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Post-study work</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-t border-line align-top">
                    <th scope="row" className="p-4">
                      <Link href={row.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline">
                        <CountryFlag code={row.flag} className="h-5 w-5" />
                        {row.name}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </th>
                    <td className="p-4 text-muted">{row.tuition}</td>
                    <td className="p-4 text-muted">{row.living}</td>
                    <td className="p-4 text-muted">{row.intakes}</td>
                    <td className="p-4 text-muted">{row.work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            *Some German states charge tuition to non-EU students. Living-cost figures are government proof-of-funds
            amounts, not a full budget. Read each guide for the current rule and its source.
          </p>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="choose-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="How to choose"
              id="choose-heading"
              title="Three questions before you pick."
              intro="Use them as a starting point. We go through all three in the first session."
            />
          </div>
          <ol className="space-y-3 lg:col-span-7">
            {questions.map((question, index) => (
              <li key={question} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span aria-hidden="true" className="font-heading text-xl text-crimson">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm leading-relaxed text-ink">{question}</span>
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Not sure which country fits?"
        intro="Bring your results and budget. We'll shortlist two or three countries and explain the trade-offs."
      />
    </div>
  );
}
