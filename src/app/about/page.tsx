import Link from "next/link";
<<<<<<< HEAD
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
=======
import { Award, Globe, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import CTA from "@/components/CTA";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeader from "@/components/SectionHeader";
<<<<<<< HEAD
import { company, licenceLine } from "@/lib/company";
import { team } from "@/content/team";
=======
import CredentialsStrip from "@/components/CredentialsStrip";
import { company } from "@/lib/company";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
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
<<<<<<< HEAD
        crumbs={[{ name: "About" }]}
        title="About Reasons Education"
        intro="A counselling and test-prep team in Kathmandu, advising Nepali students since 2015."
        image={{
          name: "study-abroad",
          alt: "A university building and lawn on a campus abroad",
        }}
=======
        variant="split"
        crumbs={[{ name: "About Us" }]}
        eyebrow="About us"
        title={<>About <em>Reasons Education</em></>}
        intro={`We are a counselling and test-prep team in ${company.address.city}, ${company.address.country}, helping students plan international education — one honest meeting at a time.`}
        subject={{
          src: "/images/hero/photos/about-team.jpg",
          alt: "The Reasons Education team collaborating around a table in our office",
          width: 1200,
          height: 1500,
        }}
        badge={{
          icon: <Heart size={20} />,
          title: "A small team, one process",
          subtitle: "New Baneshwor, Kathmandu",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
              Book a free session
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/services" className="btn-secondary btn-lg w-full sm:w-auto">
              Explore our services
            </Link>
          </>
        }
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
      />

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={`Since ${company.established}`}
<<<<<<< HEAD
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
=======
              title={<>A small team with one process <em>we trust.</em></>}
              intro={`Counselling, documentation and test prep in ${company.address.street}. Come in for a meeting — you'll meet the same people throughout the process.`}
            />
          </div>
          <div className="lg:col-span-8 space-y-5 text-ink leading-relaxed">
            <p>
              We work with a limited number of students each intake so every file gets attention. That means no
              promises we can&apos;t stand behind, no last-minute surprises on the documentation, and no hand-offs
              between &ldquo;sales&rdquo; and &ldquo;processing&rdquo;.
            </p>
            <p>
              If a plan doesn&apos;t fit your profile, your budget or your timeline, we&apos;ll tell you — and suggest
              alternatives that do. We&apos;d rather you study somewhere realistic than chase a rejection.
            </p>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* Values Section */}
      <section className="section-padding bg-paper">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our values"
            title={<>What you can expect from us, <em>in writing.</em></>}
            intro="Four ground rules we try to live up to in every meeting, email and phone call."
            align="center"
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {values.map((value, i) => (
               <div key={i} className="card p-6">
                  {<value.icon size={28} strokeWidth={1.5} className="text-crimson mb-4" aria-hidden />}
                  <h3>{value.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{value.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Team"
              title={<>The people you&apos;ll <em>meet at our office.</em></>}
              intro="Roster and bios are a work in progress. Drop in at New Baneshwor and you'll meet us in person."
            />
          </div>
          <ul className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
             {team.map((member) => (
               <li key={member.name} className="card p-5 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-paper border border-line text-crimson font-semibold flex items-center justify-center shrink-0 text-base">
                    {initials(member.name)}
                  </div>
                  <div>
                    <h3 className="text-primary text-base">{member.name}</h3>
                    <p className="text-sm text-muted mt-0.5 uppercase tracking-wide">{member.role}</p>
                  </div>
               </li>
             ))}
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </ul>
        </div>
      </section>

<<<<<<< HEAD
      <section className="section-padding bg-paper" aria-labelledby="team-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Your team"
            id="team-heading"
            title="Meet the people you'll work with."
            intro="Counselling, operations, visa work and test preparation are handled by this team. You can ask for any of them by name when you book."
          />
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((member) => (
              <li key={member.slug} className="flex flex-col items-center text-center">
                {member.photo && (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-card sm:h-36 sm:w-36 lg:h-[8.5rem] lg:w-[8.5rem]">
                    <Photo
                      name={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      widths={[640]}
                      sizes="(min-width: 1024px) 140px, (min-width: 640px) 144px, 128px"
                      fill
                    />
                  </div>
                )}
                <h3 className="mt-4 text-base">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{member.role}</p>
                {member.languages && member.languages.length > 0 && (
                  <p className="mt-2 text-sm text-muted">Languages: {member.languages.join(", ")}</p>
                )}
                {member.bio && <p className="mt-2 text-sm leading-relaxed text-muted">{member.bio}</p>}
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
=======
      {company.registration.number && <CredentialsStrip />}

      <CTA />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
    </div>
  );
};

export default AboutPage;
