import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    n: "01",
    title: "Counselling & profile review",
    text: "We look at your results, timeline, budget and goals. You leave knowing which countries actually fit your profile.",
    duration: "Typical duration: 45–60 minutes, in person or over call",
  },
  {
    n: "02",
    title: "Shortlist, courses & test plan",
    text: "A ranked shortlist of 3–5 courses plus a realistic IELTS/PTE timeline and weekly study plan.",
    duration: "Delivered 1–2 days after the first counselling session",
  },
  {
    n: "03",
    title: "Applications & offers",
    text: "We prepare, submit and follow up on every application. You see every email and every response.",
    duration: "From submission to first offer: usually 2–8 weeks",
  },
  {
    n: "04",
    title: "Visa documentation",
    text: "Financial evidence, statements and — where the process requires it — interview preparation. We tell you what's actually required.",
    duration: "Visa processing varies by country; we'll give you the current average",
  },
  {
    n: "05",
    title: "Departure & pre-departure",
    text: "Flights, accommodation, airport pickup and a short briefing on what to expect in your first week abroad.",
    duration: "Final briefing 1–2 weeks before your travel date",
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-[68px] self-start">
          <SectionHeader
            eyebrow="Process"
            title={<>Five transparent steps from first meeting to <em>departure.</em></>}
            intro="You'll know where you are in the process, what's next, and — where we have one — the typical timeline."
          />
          <Link
            href="/study-abroad"
            className="link-arrow mt-8 inline-flex"
          >
            See intake deadlines
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-8">
          <ol className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-4 bottom-4 w-px bg-line hidden sm:block"
            />
            {steps.map((s, i) => {
              const isLast = i === steps.length - 1;
              return (
                <li
                  key={s.n}
                  className={`reveal grid grid-cols-[2.75rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-5 sm:gap-6 ${
                    isLast ? "pb-0" : "pb-10 sm:pb-12"
                  } items-start`}
                >
                  <div className="relative flex justify-center pt-1">
                    <span
                      aria-hidden="true"
                      className="font-heading text-3xl sm:text-4xl font-normal text-crimson"
                    >
                      {s.n}
                    </span>
                  </div>
                  <div
                    className={`card p-5 sm:p-6 bg-white border border-line shadow-sm`}
                  >
                    <h3>{s.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed">
                      {s.text}
                    </p>
                    <p className="mt-4 text-xs text-primary-400 font-medium before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-crimson before:mr-2 before:align-middle before:-mt-0.5">
                      {s.duration}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
