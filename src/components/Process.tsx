import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    n: "01",
    title: "Research",
    text: "We review your results, budget and goals.",
  },
  {
    n: "02",
    title: "Apply",
    text: "We prepare, check and submit each application.",
  },
  {
    n: "03",
    title: "Visa",
    text: "We map the checklist and review your proof of funds.",
  },
  {
    n: "04",
    title: "Prepare",
    text: "Accommodation, travel and what to expect.",
  },
  {
    n: "05",
    title: "Depart",
    text: "A final briefing before you fly.",
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-white" aria-labelledby="process-heading">
      <div className="container-custom">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Process"
            id="process-heading"
            title="Five steps from first question to flight."
            intro="Each step has a clear owner and a written checklist. Your counsellor confirms the exact requirements for your destination."
          />
          <Link href="/study-abroad" className="link-arrow inline-flex min-h-11 items-center whitespace-nowrap">
            See the full process
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className={`relative flex flex-col border-line p-6 lg:border-l lg:py-2 lg:pl-6 lg:pr-4 ${
                index === 0 ? "lg:border-l-0 lg:pl-0" : ""
              }`}
            >
              <span aria-hidden="true" className="font-heading text-2xl font-normal text-crimson">
                {step.n}
              </span>
              <h3 className="mt-3 text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
