import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Home, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeader from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad from Nepal: Process, Costs & Visa Steps",
  description:
    "How to study abroad from Nepal: six steps, a document checklist, English tests and when to start for your intake. Free counselling in Kathmandu.",
  path: "/study-abroad",
  image: "/og/study-abroad.png",
});

const steps = [
  {
    n: "1",
    title: "Choose a course and country",
    when: "12–9 months before",
    you: "Share results, budget, goals",
    we: "Build a ranked shortlist",
  },
  {
    n: "2",
    title: "Prove English (IELTS, PTE, TOEFL…)",
    when: "10–6 months before",
    you: "Book and sit the test",
    we: "Run classes and mock tests",
  },
  {
    n: "3",
    title: "Apply to institutions",
    when: "9–6 months before",
    you: "Provide documents, SOP, references",
    we: "Check each file, submit, follow up",
  },
  {
    n: "4",
    title: "Accept an offer",
    when: "6–4 months before",
    you: "Choose, pay deposit if required",
    we: "Compare offers with you",
  },
  {
    n: "5",
    title: "Apply for the visa",
    when: "4–2 months before",
    you: "Show proof of funds",
    we: "Review forms and evidence; practise interview",
  },
  {
    n: "6",
    title: "Prepare to travel",
    when: "Last 4–6 weeks",
    you: "Book flights, housing",
    we: "Pre-departure briefing",
  },
];

const documents = [
  "Passport (valid at least 6 months beyond your planned stay)",
  "Academic transcripts and certificates (SEE, +2, Bachelor's)",
  "English test result",
  "Statement of Purpose (SOP) — written by you; we review and coach",
  "Recommendation letters (when the course asks for them)",
  "Proof of funds (bank statements, loan sanction, sponsor documents)",
  "Police and medical certificates (when the country requires them)",
  "Nepal NOC before you pay tuition abroad by bank (check the current process with the Ministry of Education)",
];

const costBuckets: { title: string; text: string; where: string; icon: LucideIcon }[] = [
  {
    title: "Study",
    text: "Tuition for the first year.",
    where: "Country guides (typical ranges) and the institution's page",
    icon: GraduationCap,
  },
  {
    title: "Live",
    text: "Living costs; this is also your proof-of-funds amount.",
    where: "Country guides, official government figure with date",
    icon: Home,
  },
  {
    title: "One-off",
    text: "English test, application fees, visa and health fees, flights.",
    where: "Your fee sheet from us + official fee pages",
    icon: Plane,
  },
];

const comparison = [
  {
    country: "Canada",
    href: "/countries/canada",
    intakes: "Sep, Jan, May",
    english: "IELTS / PTE (institution sets score)",
    work: "PGWP (rules apply)",
  },
  {
    country: "UK",
    href: "/countries/uk",
    intakes: "Sep, Jan",
    english: "IELTS / PTE UKVI where required",
    work: "Graduate route (changing in 2027)",
  },
  {
    country: "Australia",
    href: "/countries/australia",
    intakes: "Feb, Jul",
    english: "IELTS / PTE",
    work: "Temporary Graduate visa (485)",
  },
  {
    country: "USA",
    href: "/countries/usa",
    intakes: "Aug, Jan",
    english: "IELTS / TOEFL / PTE",
    work: "OPT / STEM OPT",
  },
  {
    country: "New Zealand",
    href: "/countries/new-zealand",
    intakes: "Feb, Jul",
    english: "IELTS / PTE",
    work: "Post-study work visa",
  },
  {
    country: "Germany",
    href: "/countries/germany",
    intakes: "Oct, Apr",
    english: "IELTS/TOEFL or German",
    work: "18-month job-search permit",
  },
  {
    country: "Japan",
    href: "/countries/japan",
    intakes: "Apr, Oct",
    english: "Japanese tests (JLPT/NAT)",
    work: "Rules vary",
  },
];

const StudyAbroadPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Study abroad", path: "/study-abroad" }]} />

      <PageHero
        crumbs={[{ name: "Study abroad" }]}
        title="How to study abroad from Nepal, step by step"
        intro="The whole path — course choice, English tests, applications, money and the visa — in plain language, with the official links."
        image={{
          name: "hero-counselling",
          alt: "Students and a counsellor talking at a table with laptops",
          position: "center 45%",
        }}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
                <h2 className="eyebrow mb-3">Quick answer</h2>
                <p className="text-base leading-relaxed text-ink sm:text-lg">
                  Most students start <strong>9–12 months before the intake</strong>. The path is: choose a course and
                  country → take an English test → apply → accept an offer → show proof of funds → apply for the visa →
                  prepare to travel. Requirements differ by country and institution, so check each country guide.
                </p>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-line lg:col-span-5">
              <Photo
                name="study-abroad"
                alt="A university building and lawn on a campus abroad"
                widths={[640, 1200]}
                sizes="(min-width: 1024px) 38vw, 100vw"
                ratio="aspect-[4/3]"
                objectPosition="center 62%"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20" aria-labelledby="six-steps-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="The six steps"
            id="six-steps-heading"
            title="What happens, and roughly when."
            intro="Timings are typical. Your counsellor sets exact dates from the institution's deadlines."
          />

          <ol className="mt-8 space-y-3 lg:hidden">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-sm font-semibold text-primary">
                    {step.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-primary">{step.title}</h3>
                    <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
                      {step.when}
                    </p>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div className="flex gap-2">
                        <dt className="w-9 shrink-0 font-semibold text-ink">You</dt>
                        <dd className="text-muted">{step.you}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-9 shrink-0 font-semibold text-ink">We</dt>
                        <dd className="text-muted">{step.we}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-line lg:block">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <caption className="sr-only">Six steps to study abroad from Nepal</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-primary">#</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Step</th>
                  <th scope="col" className="p-4 font-semibold text-primary">When (typical)</th>
                  <th scope="col" className="p-4 font-semibold text-primary">You</th>
                  <th scope="col" className="p-4 font-semibold text-primary">We</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step) => (
                  <tr key={step.n} className="border-t border-line align-top">
                    <td className="p-4 font-heading text-crimson">{step.n}</td>
                    <th scope="row" className="p-4 font-semibold text-primary">{step.title}</th>
                    <td className="p-4 text-muted">{step.when}</td>
                    <td className="p-4 text-muted">{step.you}</td>
                    <td className="p-4 text-muted">{step.we}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="documents-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Documents"
              id="documents-heading"
              title="What you'll usually need."
              intro="The exact list depends on the country, course and institution."
            />
            <figure className="mt-6 hidden overflow-hidden rounded-2xl border border-line lg:block">
              <Photo
                name="blog-sop"
                alt="A student writing an application document by hand"
                widths={[640, 1200]}
                sizes="32vw"
                ratio="aspect-[4/3]"
              />
            </figure>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {documents.map((document) => (
              <li key={document} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
                <span>{document}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="costs-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Costs"
            id="costs-heading"
            title="Three buckets to plan for."
            intro="Add them up before you apply, not after your offer arrives."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {costBuckets.map((bucket) => {
              const Icon = bucket.icon;
              return (
                <article key={bucket.title} className="card p-6 sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
                    <Icon size={20} className="text-crimson" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary">{bucket.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{bucket.text}</p>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    <span className="font-semibold text-primary">Where to see the numbers:</span> {bucket.where}
                  </p>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-muted">
            Our own fees are on the{" "}
            <Link href="/fees" className="font-semibold text-accent underline underline-offset-4">
              Fees page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="compare-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Compare"
            id="compare-heading"
            title="Countries at a glance."
            intro="Read the country guide for the full rules, sources and costs."
          />
          <ul className="mt-8 space-y-3 lg:hidden">
            {comparison.map((row) => (
              <li key={row.country} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-primary">{row.country}</p>
                  <Link
                    href={row.href}
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent hover:underline"
                  >
                    Guide <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
                <dl className="mt-1 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Main intakes</dt>
                    <dd className="mt-0.5 text-ink">{row.intakes}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Typical English test</dt>
                    <dd className="mt-0.5 text-ink">{row.english}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Post-study work</dt>
                    <dd className="mt-0.5 text-ink">{row.work}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-line bg-white lg:block">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <caption className="sr-only">Compare study destinations</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-primary">Country</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Main intakes</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Typical English test</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Post-study work</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Read</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.country} className="border-t border-line">
                    <th scope="row" className="p-4 font-semibold text-primary">{row.country}</th>
                    <td className="p-4 text-muted">{row.intakes}</td>
                    <td className="p-4 text-muted">{row.english}</td>
                    <td className="p-4 text-muted">{row.work}</td>
                    <td className="p-4">
                      <Link href={row.href} className="inline-flex min-h-11 items-center gap-1 font-semibold text-accent hover:underline">
                        Guide <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="courses-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Course areas"
              id="courses-heading"
              title="What we advise on."
              intro="Entry rules differ by institution; each country guide notes where these fields are strongest."
            />
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Business & management",
                "IT & computing",
                "Engineering",
                "Health & sciences",
                "Hospitality & tourism",
                "Design & creative arts",
              ].map((area) => (
                <li key={area} className="rounded-xl border border-line bg-white p-4 text-sm font-medium text-ink">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
};

export default StudyAbroadPage;
