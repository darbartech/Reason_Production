import Link from "next/link";
import {
  CreditCard,
  FileText,
  HeartPulse,
  Landmark,
  Languages,
  PenLine,
  Phone,
  Plane,
  QrCode,
  ReceiptText,
  Stamp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Schema";
import { pricing } from "@/content/pricing";
import { company, LAST_CHECKED } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Fees | Reasons Education, Kathmandu",
  description:
    "Reasons Education fee schedule for counselling, applications, visa support and IELTS & PTE classes. Written fees, no surprise charges.",
  path: "/fees",
});

const rows = [
  {
    service: "First counselling session",
    covers: "Profile review and a ranked shortlist",
    fee: "Free",
    when: "—",
  },
  {
    service: "IELTS class",
    covers: `${pricing.ielts.weeks} weeks, mock test every Sunday`,
    fee: pricing.ielts.price,
    when: "At enrolment",
  },
  {
    service: "PTE class",
    covers: `${pricing.pte.weeks} weeks, mock tests and speaking feedback`,
    fee: pricing.pte.price,
    when: "At enrolment",
  },
  {
    service: "English Foundation",
    covers: "8 weeks of grammar, speaking and listening",
    fee: "Quoted in writing",
    when: "When you enrol",
  },
  {
    service: "Counselling & shortlisting",
    covers: "Beyond the free first session",
    fee: "Quoted in writing",
    when: "Before you commit",
  },
  {
    service: "Application service",
    covers: "Document checks, submission and follow-up",
    fee: "Quoted in writing",
    when: "Before submission",
  },
  {
    service: "Visa support",
    covers: "Forms, evidence review and interview practice",
    fee: "Quoted in writing",
    when: "Before filing",
  },
];

const externalCosts: { label: string; icon: LucideIcon }[] = [
  { label: "University application fees", icon: FileText },
  { label: "Visa fees", icon: Stamp },
  { label: "English exam fees", icon: PenLine },
  { label: "Translation fees", icon: Languages },
  { label: "Health insurance", icon: HeartPulse },
  { label: "Flights", icon: Plane },
];

const paymentMethods: { label: string; icon: LucideIcon }[] = [
  { label: "Bank transfer", icon: Landmark },
  { label: "QR payment", icon: QrCode },
  { label: "Card", icon: CreditCard },
];

export default function FeesPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Fees", path: "/fees" }]} />

      <PageHero
        crumbs={[{ name: "Fees" }]}
        title="Our fees"
        intro={`You see what each service costs before you agree to anything. Updated ${LAST_CHECKED}.`}
        image={{
          name: "services-documents",
          alt: "Two colleagues celebrating with a high-five over documents and a laptop",
        }}
      />

      <section className="section-padding" aria-labelledby="fee-table-heading">
        <div className="container-custom">
          <h2 id="fee-table-heading" className="sr-only">
            Fee schedule
          </h2>

          <ul className="space-y-3 md:hidden">
            {rows.map((row) => (
              <li key={row.service} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-primary">{row.service}</h3>
                  <span className="shrink-0 rounded-full bg-tint px-3 py-1 text-xs font-semibold text-primary">
                    {row.fee}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{row.covers}</p>
                <p className="mt-2 text-xs text-muted">
                  <span className="font-semibold text-ink">When you pay:</span> {row.when}
                </p>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">Reasons Education fee schedule</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-primary">Service</th>
                  <th scope="col" className="p-4 font-semibold text-primary">What it covers</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Fee</th>
                  <th scope="col" className="p-4 font-semibold text-primary">When you pay</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.service} className="border-t border-line align-top">
                    <th scope="row" className="p-4 font-semibold text-primary">{row.service}</th>
                    <td className="p-4 text-muted">{row.covers}</td>
                    <td className="p-4 font-semibold text-ink">{row.fee}</td>
                    <td className="p-4 text-muted">{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            Class fees are fixed. Service fees that vary with the application are quoted in writing before you commit,
            so there are no surprise charges. The exam fee is separate and paid to the test provider.
          </p>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="external-heading">
        <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="external-heading" className="text-balance">Costs we don&apos;t charge</h2>
            <p className="lead mt-4">
              These are paid to other organisations, not to us. We tell you each amount before you pay it.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {externalCosts.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 text-sm font-medium text-ink"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper">
                    <Icon size={16} className="text-crimson" aria-hidden="true" />
                  </span>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="payment-heading">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
              <CreditCard size={20} className="text-crimson" aria-hidden="true" />
            </div>
            <h2 id="payment-heading" className="text-primary">How to pay</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
              We issue an official receipt for every payment. Ask for the receipt at the counter if it is not given
              to you.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <li
                    key={method.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink"
                  >
                    <Icon size={14} className="text-crimson" aria-hidden="true" />
                    {method.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
              <ReceiptText size={20} className="text-crimson" aria-hidden="true" />
            </div>
            <h2 className="text-primary">Refunds and questions</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
              Ask for the refund terms in writing before you pay. If a charge is unclear, ask us first — call{" "}
              <a href={`tel:${company.phoneTel}`} className="font-semibold text-accent hover:underline">
                {company.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${company.email}`} className="font-semibold text-accent hover:underline">
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="container-custom mt-8">
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5">
            <Phone size={18} className="mt-0.5 shrink-0 text-crimson" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ink">
              Our fee schedule is given in writing at the first session and is also on this page.{" "}
              <Link href="/contact" className="font-semibold text-accent underline underline-offset-4">
                Book a free session
              </Link>{" "}
              to see it before you decide.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want the fee sheet before you visit?"
        intro="Call or message us and we will send the current schedule. The first session is free either way."
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </div>
  );
}
