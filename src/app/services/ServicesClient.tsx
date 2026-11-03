import Link from "next/link";
<<<<<<< HEAD
import { ArrowRight, BookOpen, ClipboardList, FileCheck2, GraduationCap, Plane } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { pricing } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad Services in Kathmandu: Counselling, Visa, IELTS",
  description:
    "Counselling, applications, document checks, visa support and IELTS & PTE classes in New Baneshwor, Kathmandu. See what's included and what you bring.",
  path: "/services",
  image: "/og/services.png",
});

const services = [
  {
    id: "counselling",
    title: "Study abroad counselling",
    icon: GraduationCap,
    get: "A ranked shortlist of courses and countries that fit your results, budget and timeline.",
    bring: "Transcripts, any English test result, budget range.",
    note: "Time: first session about 30 minutes — free.",
    href: "/contact",
    linkLabel: "Book a free session",
  },
  {
    id: "applications",
    title: "Applications & documents",
    icon: FileCheck2,
    get: "Every document checked, each application submitted and followed up, copies of every email and offer.",
    bring: "Course choices, SOP draft, referee details.",
    note: "We review and coach your SOP. The words and experience must be yours.",
    href: "/study-abroad",
    linkLabel: "See the six steps",
  },
  {
    id: "visa",
    title: "Visa support",
    icon: ClipboardList,
    get: "The checklist for your country, review of proof-of-funds documents, form checks and interview practice where an interview is required.",
    bring: "Offer letter, passport, financial documents.",
    note: "We can't promise a visa. We tell you where your file is strong or weak before you submit.",
    href: "/countries",
    linkLabel: "Read your country guide",
  },
  {
    id: "ielts",
    title: "IELTS & PTE classes",
    icon: BookOpen,
    get: "Classes taught here, a mock test every Sunday, feedback on each module.",
    bring: "Your current level and target score. Nothing else is needed to start.",
    note: `Fees: IELTS ${pricing.ielts.price} (${pricing.ielts.weeks} weeks) · PTE ${pricing.pte.price} (${pricing.pte.weeks} weeks).`,
    href: "/ielts",
    linkLabel: "See class details",
  },
];

const alsoAvailable = [
  {
    title: "Scholarship search",
    text: "We help you find and apply for awards that match your profile, and check the conditions attached to each one.",
    icon: GraduationCap,
  },
  {
    title: "Pre-departure briefing",
    text: "Accommodation options, travel, banking and arrival, covered before you fly.",
    icon: Plane,
  },
];

const ServicesClient = () => {
=======
import { FileText, ArrowRight, ShieldCheck, Award, Plane, Home, Building2, Handshake } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

const ServicesClient = () => {
  const remainingServices = [
    {
      title: "University & College Admission",
      desc: "We assist with the entire application process, ensuring all documentation is accurate and submitted on time to maximize your chances of acceptance.",
      icon: Building2,
    },
    {
      title: "Visa Assistance",
      desc: "Comprehensive support for your visa application, including documentation verification, SOP guidance, and mock interview sessions so your file is complete before it is submitted.",
      icon: ShieldCheck,
    },
    {
      title: "Scholarship Guidance",
      desc: "We help you identify and apply for various merit-based and need-based scholarships to make your international education more affordable.",
      icon: Award,
    },
    {
      title: "B2B Educational Partnership",
      desc: "Strategic collaborations with international institutions and local organizations to create seamless educational pathways for students.",
      icon: Handshake,
    },
  ];

  const valueAddedServices = [
    {
      title: "SOP & Essay Support",
      desc: "Expert guidance on crafting compelling Statements of Purpose and application essays that stand out to admission committees.",
      icon: FileText
    },
    {
      title: "Pre-Departure Briefing",
      desc: "Essential sessions to prepare you for life abroad, covering cultural adjustment, health insurance, and banking essentials.",
      icon: Plane
    },
    {
      title: "Post-Arrival Support",
      desc: "We stay connected even after you land, assisting with accommodation search and initial settlement in your new country.",
      icon: Home
    },
  ];

  const whyUsItems = [
    {
      title: "Expert Counselling",
      desc: "Our counsellors have over 10 years of experience in the international education industry, ensuring you get the most accurate and up-to-date advice.",
    },
    {
      title: "Thorough Documentation Review",
      desc: "Documentation is reviewed by two counsellors, SOPs are built around your actual background, and we run mock interviews before every visa appointment.",
    },
    {
      title: "End-to-End Support",
      desc: "From initial counselling and test preparation to pre-departure briefings and post-arrival support, we stay with you every step of the way.",
    },
  ];

>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
  return (
    <div className="bg-white">
      <PageHero
        variant="split"
        crumbs={[{ name: "Services" }]}
<<<<<<< HEAD
        title="Study abroad services in Kathmandu"
        intro="Counselling, applications, visa support and test preparation, all handled by one team."
        image={{
          name: "services-documents",
          alt: "Two colleagues celebrating with a high-five over documents and a laptop",
        }}
      />

      <section className="section-padding" aria-labelledby="service-list-heading">
        <div className="container-custom">
          <h2 id="service-list-heading" className="sr-only">
            Our services
          </h2>
          <div className="space-y-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-paper">
                      <Icon size={22} className="text-crimson" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-primary">{service.title}</h2>
                      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">You get</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink">{service.get}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">You bring</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink">{service.bring}</dd>
                        </div>
                      </dl>
                      <p className="mt-5 rounded-lg bg-paper px-4 py-3 text-sm leading-relaxed text-ink">
                        {service.note}
                      </p>
                      <Link
                        href={service.href}
                        className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                      >
                        {service.linkLabel}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
=======
        eyebrow="Our services"
        title={<>Study abroad services <em>in Kathmandu.</em></>}
        intro="Counselling, test prep, applications, documentation and visa — everything from one team in one office."
        subject={{
          src: "/images/hero/photos/services-consult.jpg",
          alt: "A counselling meeting at the office, going through options and documents",
          width: 1200,
          height: 1500,
        }}
        badge={{
          icon: <Handshake size={20} />,
          title: "End-to-end support",
          subtitle: "Counselling · applications · visa",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
              Book a consultation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/countries" className="btn-secondary btn-lg w-full sm:w-auto">
              Browse destinations
            </Link>
          </>
        }
      />

      <section className="section-padding" aria-labelledby="main-services-heading">
        <div className="container-custom space-y-20">
          <SectionHeader
            id="main-services-heading"
            eyebrow="Services"
            title={<>Counselling, documents, visa — <em>everything under one roof.</em></>}
            intro="We provide a full spectrum of services designed to help you navigate the complexities of international education with ease and confidence."
          />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/images/visuals/services-counselling.webp"
                  alt="Consultant and student working through application documents together at a desk"
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6">
              <h3 className="font-sans text-2xl sm:text-3xl font-semibold text-primary mb-4">
                Study Abroad Counselling
              </h3>
              <p className="text-primary/70 leading-relaxed mb-6">
                Our expert counsellors provide personalised guidance to help you choose the right course, university, and destination based on your academic background and career goals.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent font-semibold group"
              >
                Talk to a counsellor
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/images/visuals/study-abroad-campus.webp"
                  alt="Students preparing for IELTS and PTE exams in a classroom setting"
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <h3 className="font-sans text-2xl sm:text-3xl font-semibold text-primary mb-4">
                IELTS &amp; PTE Preparation
              </h3>
              <p className="text-primary/70 leading-relaxed mb-6">
                Achieve your target score with our expert-led preparation classes, featuring weekly mock tests, updated study materials, and personalized feedback.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent font-semibold group"
              >
                Book a demo class
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="font-sans text-xl sm:text-2xl font-semibold text-primary mb-6">
              More Services
            </h3>
            <ul className="divide-y divide-line">
              {remainingServices.map((service, i) => (
                <li key={i} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary" aria-hidden="true">
                      <service.icon size={20} className="sm:size-5" />
                    </div>
                    <div>
                      <h4 className="text-primary font-semibold mb-1">{service.title}</h4>
                      <p className="text-sm sm:text-base text-primary/65 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="section-padding bg-paper" aria-labelledby="also-heading">
        <div className="container-custom">
          <SectionHeader eyebrow="Also available" id="also-heading" title="Two things students often ask for." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {alsoAvailable.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white">
                    <Icon size={20} className="text-crimson" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </article>
              );
            })}
=======
      <section className="surface-dark section-padding relative overflow-hidden" aria-labelledby="why-us-heading">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />

        <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-16 relative">
          <div className="lg:col-span-4 lg:sticky lg:top-[68px] self-start">
            <SectionHeader
              id="why-us-heading"
              eyebrow="Why choose us"
              title={<>A consultancy that works like <em>a partner,</em> not a sales desk.</>}
              intro="Three commitments that define how we work — no buzzwords, no '100% guarantees', no fine print."
            />
          </div>

          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {whyUsItems.map((item, i) => (
              <li
                key={i}
                className="rounded-2xl p-6 sm:p-7 border border-white/15 bg-white/[0.04]"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-white/75">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="value-added-heading">
        <div className="container-custom space-y-12 lg:space-y-16">
          <SectionHeader
            id="value-added-heading"
            eyebrow="Value Added"
            title={<>Support that goes <em>well beyond</em> the visa letter.</>}
            intro="We go the extra mile to ensure your transition to international student life is as smooth and stress-free as possible."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {valueAddedServices.map((service, i) => (
              <article
                key={i}
                className="card card-hover p-8 sm:p-10"
              >
                <div className="bg-primary/5 p-4 rounded-xl text-primary w-fit mb-6" aria-hidden="true">
                  <service.icon size={24} className="sm:size-7" />
                </div>
                <h4 className="text-primary mb-3 font-semibold">
                  {service.title}
                </h4>
                <p className="text-sm sm:text-base text-primary/70 font-medium leading-relaxed">
                  {service.desc}
                </p>
              </article>
            ))}
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="fees-heading">
        <div className="container-custom max-w-3xl">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 id="fees-heading" className="text-primary">Our fees</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
              Fees are listed in writing before you commit.
            </p>
            <Link href="/fees" className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent hover:underline">
              See our fee schedule
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
};

export default ServicesClient;
