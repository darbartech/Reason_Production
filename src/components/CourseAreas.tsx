import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import CountryFlag from "./CountryFlag";
import { courseAreas } from "@/content/courses";
import { countries } from "@/content/countries";

const countryBySlug = new Map(countries.map((country) => [country.slug, country]));

export default function CourseAreas() {
  return (
    <section className="section-padding bg-white" aria-labelledby="courses-heading">
      <div className="container-custom">
        <SectionHeader
          variant="split"
          eyebrow="Courses"
          id="courses-heading"
          title="Course areas we advise on."
          intro="Six broad subject areas we help students compare across destinations. Each guide covers the country's intakes, requirements and visa steps."
          action={{ label: "Browse country guides", href: "/countries" }}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courseAreas.map((area) => (
            <li key={area.slug}>
              <article className="card flex h-full flex-col p-6">
                <h3 className="text-primary">{area.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{area.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4" aria-label={`${area.name} country guides`}>
                  {area.countries.map((slug) => {
                    const country = countryBySlug.get(slug);
                    if (!country) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/countries/${slug}`}
                          className="group inline-flex min-h-11 min-w-11 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-primary"
                        >
                          <CountryFlag code={country.flagCode} className="h-4 w-4" />
                          {country.name}
                          <ArrowUpRight
                            size={12}
                            aria-hidden="true"
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
