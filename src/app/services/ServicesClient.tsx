import Link from "next/link";
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
  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "Services" }]}
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
          </div>
        </div>
      </section>

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
