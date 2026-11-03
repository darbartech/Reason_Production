import { AlertTriangle, BadgeCheck, CheckCircle2, MessageCircle, SearchCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeader from "@/components/SectionHeader";
import { pricing } from "@/content/pricing";
import { company, whatsappLink } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IELTS & PTE Classes in New Baneshwor, Kathmandu",
  description:
    "IELTS (6 weeks, Rs. 8,000) and PTE (4 weeks, Rs. 10,000) classes in New Baneshwor. Weekly mock tests and feedback. Ask about the next batch.",
  path: "/ielts",
  image: "/og/ielts.png",
});

<<<<<<< HEAD
const batchMessage = "Hello, I'd like details of the next IELTS/PTE batch.";
=======
const features = [
  {
    n: "01",
    title: "Expert Trainers",
    description: "Certified instructors with years of experience in IELTS/PTE coaching and proven track records.",
  },
  {
    n: "02",
    title: "Weekly Mock Tests",
    description: "Full-length practice tests every Sunday to track progress and build test-taking confidence.",
  },
  {
    n: "03",
    title: "Updated Materials",
    description: "Comprehensive and up-to-date study materials, practice books, and online resources included.",
  },
  {
    n: "04",
    title: "Flexible Batches",
    description: "Morning, afternoon, and evening batches available to fit your schedule perfectly.",
  },
];
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

const courses = [
  {
    name: "IELTS Preparation",
    length: `${pricing.ielts.weeks} weeks`,
    fee: pricing.ielts.price,
    format: "Academic & General Training",
    includes: [
      "Mock test every Sunday",
      "Feedback on writing and speaking",
      "Grammar and vocabulary sessions",
      "Study materials",
    ],
    ask: "Ask about IELTS",
  },
  {
    name: "PTE Academic",
    length: `${pricing.pte.weeks} weeks`,
    fee: pricing.pte.price,
    format: "Computer-based practice on exam-style software",
    includes: [
      "Mock tests",
      "One-to-one speaking feedback",
      "Personal study plan",
    ],
    ask: "Ask about PTE",
  },
];

const classPoints = [
  "Listening, Reading, Writing and Speaking are practised every week.",
  "Written comments on every writing task; speaking practised with a trainer.",
  "A full-length Sunday mock test, timed and marked.",
  "You may meet your trainer before you enrol.",
];

const whichTest: { lead: string; text: string; icon: LucideIcon }[] = [
  {
<<<<<<< HEAD
    lead: "Check first:",
    text: "the institution's or visa's accepted tests and minimum scores.",
    icon: SearchCheck,
  },
  {
    lead: "UK Student visa:",
    text: "some courses need a UKVI-approved test (for example IELTS for UKVI or PTE Academic UKVI). Confirm on gov.uk.",
    icon: BadgeCheck,
  },
  {
    lead: "Not sure?",
    text: "bring your course list to a free session. We'll tell you which test fits and what score to aim for.",
    icon: MessageCircle,
=======
    title: "Listening",
    description: "Practice diverse accents and question types with our audio training sessions.",
    icon: Headphones,
  },
  {
    title: "Reading",
    description: "Master skimming, scanning, and detailed reading techniques for high scores.",
    icon: BookOpen,
  },
  {
    title: "Writing",
    description: "Learn structured writing approaches with personalized feedback on your essays.",
    icon: PenTool,
  },
  {
    title: "Speaking",
    description: "Build confidence with regular one-on-one practice sessions and mock interviews.",
    icon: Mic,
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
  },
];

const IELTSPage = () => {
  return (
    <div className="bg-white">
      <PageHero
<<<<<<< HEAD
        crumbs={[{ name: "IELTS & PTE" }]}
        title="IELTS &amp; PTE classes in New Baneshwor"
        intro="Small-batch classes, a mock test every Sunday and feedback on every module."
        image={{
          name: "blog-hero",
          alt: "Open books and handwritten notes on a desk",
        }}
=======
        variant="split"
        crumbs={[{ name: "IELTS / PTE" }]}
        eyebrow="Test preparation"
        title={<>IELTS &amp; PTE classes in <em>New Baneshwor</em></>}
        intro="Small-batch classes, weekly mock tests and one-on-one feedback until you reach the band you need."
        subject={{
          src: "/images/hero/photos/ielts-exam.jpg",
          alt: "An exam paper and pencil ready on a classroom desk for a mock test",
          width: 1200,
          height: 1500,
        }}
        badge={{
          icon: <GraduationCap size={20} />,
          title: "Small-batch classes",
          subtitle: "Weekly mock tests included",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
              Book a demo class
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={whatsappLink("Hello, I'd like to know about your IELTS/PTE classes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </>
        }
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
      />

      <section className="section-padding" aria-labelledby="courses-heading">
        <div className="container-custom">
<<<<<<< HEAD
          <SectionHeader eyebrow="Choose your course" id="courses-heading" title="Two courses, clear fees." />

          <ul className="mt-8 grid gap-4 md:hidden">
            {courses.map((course) => (
              <li key={course.name} className="card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-primary">{course.name}</h3>
                  <span className="shrink-0 rounded-full bg-tint px-3 py-1 text-xs font-semibold text-primary">
                    {course.fee}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Length</dt>
                    <dd className="mt-0.5 text-ink">{course.length}</dd>
                  </div>
=======
          <SectionHeader
            eyebrow="Why choose us"
            title={<>What sets <em>us apart</em></>}
            intro="Our proven methodology and experienced trainers ensure you get the best preparation for your English proficiency tests."
          />
          
          <div className="mt-12">
            <ol>
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-primary/15 py-8 first:border-t-0 first:pt-0"
                >
                  <span className="font-heading text-5xl md:text-6xl leading-none text-crimson">
                    {feature.n}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed max-w-prose">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="exam-modules-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Exam modules"
            title={<>Comprehensive <em>test preparation</em></>}
            intro="Master all four modules with targeted practice and expert guidance tailored for Nepalese students."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {examModules.map((module, index) => (
              <article 
                key={index} 
                className="card card-hover p-6 sm:p-7"
              >
                <module.icon size={28} className="text-crimson mb-5" aria-hidden="true" />
                <h3 className="mb-2">{module.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="courses-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our courses"
            title={<>Choose your <em>preparation path</em></>}
            intro="Affordable and comprehensive courses designed for your success. All courses include study materials."
          />
          
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {courses.map((course, index) => (
              <article 
                key={index} 
                className={`card card-hover p-6 sm:p-7 relative ${course.popular ? 'ring-1 ring-crimson' : ''}`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crimson text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-5">
                  <course.icon size={28} className="text-crimson" aria-hidden="true" />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Format</dt>
                    <dd className="mt-0.5 text-ink">{course.format}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Includes</p>
                <ul className="mt-2 space-y-1.5 text-sm text-ink">
                  {course.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
<<<<<<< HEAD
                <a
                  href={whatsappLink(batchMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-5 w-full"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  {course.ask}
                </a>
              </li>
=======
                
                <Link 
                  href="/contact" 
                  className={`w-full ${course.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  Enrol Now
                </Link>
              </article>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
            ))}
          </ul>

          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-line md:block">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <caption className="sr-only">IELTS and PTE course comparison</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-primary"> </th>
                  {courses.map((course) => (
                    <th key={course.name} scope="col" className="p-4 font-semibold text-primary">
                      {course.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-primary">Length</th>
                  {courses.map((course) => (
                    <td key={course.name} className="p-4 text-muted">{course.length}</td>
                  ))}
                </tr>
                <tr className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-primary">Class fee</th>
                  {courses.map((course) => (
                    <td key={course.name} className="p-4 font-semibold text-primary">{course.fee}</td>
                  ))}
                </tr>
                <tr className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-primary">Format</th>
                  {courses.map((course) => (
                    <td key={course.name} className="p-4 text-muted">{course.format}</td>
                  ))}
                </tr>
                <tr className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-primary">Includes</th>
                  {courses.map((course) => (
                    <td key={course.name} className="p-4">
                      <ul className="space-y-1.5 text-muted">
                        {course.includes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-primary">Next step</th>
                  {courses.map((course) => (
                    <td key={course.name} className="p-4">
                      <a
                        href={whatsappLink(batchMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent hover:underline"
                      >
                        <MessageCircle size={14} aria-hidden="true" />
                        {course.ask}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-paper p-5 text-sm leading-relaxed text-ink">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
            <p>
              <strong>Class fee ≠ exam fee.</strong> These are our class fees. You pay the exam fee separately to
              the test provider when you book your test. Check current exam fees with the provider.
            </p>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="section-padding bg-paper" aria-labelledby="foundation-heading">
        <div className="container-custom">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 id="foundation-heading" className="text-primary">English Foundation (8 weeks)</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink sm:text-base">
              Grammar, speaking and listening for students who need a base before IELTS or PTE. The fee is confirmed
              when you ask, and given in writing before you enrol.
            </p>
            <a
              href={whatsappLink("Hello, I'd like details of the English Foundation course.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-5"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Ask about this course
            </a>
=======
      <section className="section-padding" aria-labelledby="schedule-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Schedule"
            title={<>Schedule &amp; <em>upcoming batches</em></>}
            intro="Current batch timings and upcoming intake dates. Updated weekly — contact us to reserve your seat."
          />
          
          <div className="mt-12 card overflow-hidden">
            <div className="grid grid-cols-3 bg-brand-light-bg border-b border-line">
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60">
                Batch
              </div>
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60 border-l border-line">
                Days
              </div>
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60 border-l border-line">
                Time
              </div>
            </div>

            <div className="divide-y divide-line">
              <div className="grid grid-cols-3 items-center p-5 sm:p-6 text-center">
                <div className="text-base font-medium text-primary/80 sm:text-left col-span-3 sm:col-span-1">
                  Contact for current schedule
                </div>
                <div className="hidden sm:block text-primary/60 border-l border-line py-1">
                  <span className="text-primary/30">—</span>
                </div>
                <div className="hidden sm:block text-primary/60 border-l border-line py-1">
                  <span className="text-primary/30">—</span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-accent/5 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-primary">Schedule coming soon.</span> Batch timings will be published once the next intake is confirmed.
              </p>
              <Link href="/contact" className="link-arrow text-sm">
                Ask for current timetable
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="section-padding" aria-labelledby="which-test-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Which test?"
              id="which-test-heading"
              title="Check before you book."
              intro="Scores and accepted tests differ by course and country."
            />
          </div>
          <ul className="space-y-4 lg:col-span-8">
            {whichTest.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.lead}
                  className="flex items-start gap-4 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-ink"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper">
                    <Icon size={17} className="text-crimson" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="text-primary">{item.lead}</strong> {item.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="classes-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="How classes work" id="classes-heading" title="Practice, feedback, repeat." />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            <ul className="space-y-3">
              {classPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-ink"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <figure className="overflow-hidden rounded-2xl border border-line bg-white">
              <Photo
                name="blog-ielts"
                alt="A student practising a writing task with a pencil"
                widths={[640, 1200]}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
                ratio="aspect-[4/5]"
                objectPosition="center 55%"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-custom">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="text-primary">Visit us</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">
              {company.address.street}, {company.address.city} · {company.hours.label} ·{" "}
              <a href={`tel:${company.phoneTel}`} className="font-semibold text-accent hover:underline">
                {company.phoneDisplay}
              </a>
            </p>
            <a
              href={whatsappLink(batchMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Ask about the next batch
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to check your target score first?"
        intro="Bring your course list and any test result. We'll tell you which test to take and what score the course actually needs."
      />
=======
      <CTA />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
    </div>
  );
};

export default IELTSPage;
