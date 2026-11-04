import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeader from "@/components/SectionHeader";
import { company, licenceLine } from "@/lib/company";
import { team } from "@/content/team";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Reasons Education | Kathmandu Study Abroad Team",
  description:
    "Meet the counsellors and trainers at Reasons Education in New Baneshwor, Kathmandu, advising Nepali students since 2015.",
  path: "/about",
});

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.country}`
)}`;

const workPoints = [
  "Your profile comes first. Recommendations start with your results, budget and timeline.",
  "Plain numbers, in writing. You see our fees before you commit.",
  "Sources you can check. Every country guide links to the official page behind each rule.",
];

const AboutPage = () => {
  const licence = licenceLine();
  const facts = [
    { label: "Legal name", value: company.legalName },
    ...(licence ? [{ label: "Licence", value: licence }] : []),
    ...(company.registration.pan ? [{ label: "PAN", value: company.registration.pan }] : []),
    { label: "Office", value: `${company.address.street}, ${company.address.city} ${company.address.postalCode}` },
    { label: "Hours", value: company.hours.label },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="About Reasons Education"
        intro="A counselling and test-prep team in Kathmandu, advising Nepali students since 2015."
        image={{
          name: "study-abroad",
          alt: "A university building and lawn on a campus abroad",
        }}
      />

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={`Since ${company.established}`}
              title="A small team with one process we trust."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-ink">
              <p>
                Reasons Education is a study abroad consultancy and test-preparation centre at Indreni Complex, New
                Baneshwor. We started in 2015 and help students choose a course and country, apply, prepare for
                IELTS/PTE and apply for a visa.
              </p>
              <p>
                We tell you when a plan doesn&apos;t fit your results, budget or timeline, and suggest one that does.
                We&apos;d rather you study somewhere realistic than chase a rejection.
              </p>
            </div>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-line">
              <Photo
                name="hero-counselling"
                alt="Students and a counsellor talking at a table with laptops"
                widths={[640, 1200]}
                sizes="(min-width: 1024px) 58vw, 100vw"
                ratio="aspect-[16/9]"
                objectPosition="center 45%"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="accountable-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Licensed and accountable"
              id="accountable-heading"
              title="The details you can check."
              intro="Ask to see our licence, PAN and test-preparation permission at the office, or request them by email."
            />
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-line rounded-2xl border border-line bg-white">
              {facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 p-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{fact.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink">{fact.value}</dd>
                </div>
              ))}
              <div className="grid gap-1 p-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Fees</dt>
                <dd className="text-sm leading-relaxed text-ink">
                  Public on our{" "}
                  <Link href="/fees" className="font-semibold text-accent underline underline-offset-4">
                    Fees page
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="how-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="How we work" id="how-heading" title="Three rules we follow." />
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {workPoints.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-ink">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="team-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Your team"
            id="team-heading"
            title="Meet the people you'll work with."
            intro="Counselling, operations, visa work and test preparation are handled by this team. You can ask for any of them by name when you book."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li key={member.slug} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-primary">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{member.role}</p>
                {member.languages && member.languages.length > 0 && (
                  <p className="mt-3 text-sm text-muted">Languages: {member.languages.join(", ")}</p>
                )}
                {member.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="visit-heading">
        <div className="container-custom">
          <div className="rounded-3xl border border-line bg-white p-7 sm:p-10 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4">Visit us</p>
                <h2 id="visit-heading">Come in and ask the difficult questions.</h2>
                <p className="lead mt-4">
                  You don&apos;t need an appointment to look around. Booking a session means a counsellor is free when
                  you arrive.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <MapPin size={16} className="text-crimson" aria-hidden="true" />
                  {company.address.street}, {company.address.city} {company.address.postalCode} · {company.hours.label}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/contact" className="btn-primary">
                  Book a free session
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a href={`tel:${company.phoneTel}`} className="btn-secondary">
                  Call {company.phoneDisplay}
                </a>
                <a
                  href={mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
