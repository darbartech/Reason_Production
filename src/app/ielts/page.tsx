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

const batchMessage = "Hello, I'd like details of the next IELTS/PTE batch.";

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
  },
];

const IELTSPage = () => {
  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "IELTS & PTE" }]}
        title="IELTS &amp; PTE classes in New Baneshwor"
        intro="Small-batch classes, a mock test every Sunday and feedback on every module."
        image={{
          name: "blog-hero",
          alt: "Open books and handwritten notes on a desk",
        }}
      />

      <section className="section-padding" aria-labelledby="courses-heading">
        <div className="container-custom">
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
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default IELTSPage;
