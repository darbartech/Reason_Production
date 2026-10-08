import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CountryCard from "./CountryCard";
import SectionHeader from "./SectionHeader";
import { countries } from "@/content/countries";

const destinations = countries.map((c) => ({
  name: c.name,
  code: c.code,
  href: `/countries/${c.slug}`,
  description: c.description,
  image: c.image,
}));

const notSureCountry = {
  name: "Not sure which country?",
  href: "/contact",
  description:
    "Bring your results and budget to our office. We'll walk through which options actually fit your profile — no pressure, no hard sell.",
};

const StudyDestinations = () => {
  return (
    <section className="section-padding bg-paper" aria-labelledby="destinations-heading">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-14 gap-6">
          <SectionHeader
            eyebrow="Destinations"
            title={<>Seven countries, one team that knows <em>each process.</em></>}
            intro="From application deadlines to proof-of-funds rules — we keep current with each embassy's requirements."
            id="destinations-heading"
          />
          <Link href="/countries" className="btn-secondary whitespace-nowrap hidden lg:flex group">
            View all country guides
            <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="hidden lg:grid grid-cols-4 gap-5 sm:gap-6">
          {destinations.map((d) => (
            <CountryCard key={d.name} {...d} />
          ))}
          <CountryCard {...notSureCountry} notSure />
        </div>

        <div className="lg:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar">
          <div className="flex gap-4 sm:gap-5 w-max">
            {destinations.map((d) => (
              <div key={d.name} className="snap-start shrink-0 w-[85%] sm:w-[60%]">
                <CountryCard {...d} />
              </div>
            ))}
            <div className="snap-start shrink-0 w-[85%] sm:w-[60%]">
              <CountryCard {...notSureCountry} notSure />
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <Link href="/countries" className="btn-secondary w-full justify-center group">
            View all country guides
            <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;
