import CountryCard from "@/components/CountryCard";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { HelpCircle, GraduationCap, MapPin, Globe } from "lucide-react";
import { company } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";
import { countries } from "@/content/countries";

export const metadata = buildMetadata({
  title: "Study Destinations for Nepali Students",
  description: "Compare study destinations for Nepali students: Canada, Australia, UK, USA, New Zealand, Europe and Japan. Costs, intakes, visa steps and which fits your marks and budget.",
  path: "/countries",
});

const destinations = countries.map((c) => ({
  name: c.name,
  flag: c.flag,
  href: `/countries/${c.slug}`,
  description: c.description,
  image: c.image,
}));

const factors = [
  {
    title: "Course Availability",
    desc: "Check if your preferred field of study is highly ranked and widely available in the country. Some countries excel in STEM while others are better for Arts or Business.",
    icon: GraduationCap,
  },
  {
    title: "Cost of Living & Tuition",
    desc: "Analyze your budget. While some countries offer free tuition (like parts of Europe), others might have higher tuition but better scholarship opportunities.",
    icon: MapPin,
  },
  {
    title: "Post-Study Work Options",
    desc: "Research post-study work permits and potential pathways for permanent residency if you plan to gain work experience after graduation.",
    icon: Globe,
  },
];

export default function CountriesPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Countries", path: "/countries" }]} />
      <PageHero
        crumbs={[{ name: "Countries" }]}
        title="Study Destinations for Nepali Students"
        intro="Compare 7 popular destinations — intakes, tuition ranges and visa paths — then book a free session to build a shortlist that fits your profile and budget."
      />

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Destinations"
            title="Seven countries, one plan that fits you"
            intro="Click a country to see intakes, cost estimates and visa steps. If you're not sure yet, start with a free counselling session instead."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {destinations.map((destination) => (
              <CountryCard key={destination.name} {...destination} />
            ))}
            <CountryCard
              name="Not sure which country?"
              description="Bring your results, budget and timeline — we'll shortlist 2–3 destinations that fit."
              href="/contact"
              notSure
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-custom">
          <SectionHeader
            eyebrow="How to decide"
            title="How to choose your destination"
            intro="Three questions we cover in the first counselling session. Use them as a starting point before you book."
          />

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5 mt-10">
            {factors.map((factor) => (
              <article key={factor.title} className="card card-hover p-6 sm:p-7">
                <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center mb-5 text-white" aria-hidden="true">
                  <factor.icon size={22} />
                </div>
                <h3 className="mb-2">{factor.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{factor.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
