import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const promises: { n: string; title: string; text: string; href?: string; linkLabel?: string }[] = [
  {
    n: "01",
    title: "Fees in writing.",
    text: "Our fee schedule is public on the Fees page. No surprise charges.",
    href: "/fees",
    linkLabel: "See the fee schedule",
  },
  {
    n: "02",
    title: "Straight answers.",
    text: "If a plan won't work, we say so and suggest one that will. We never promise a visa or an offer.",
  },
  {
    n: "03",
    title: "One office.",
    text: "Counselling and IELTS/PTE under one roof, so your counsellor and trainer share your timeline.",
  },
];

export default function TrustIndicators() {
  return (
    <section className="surface-dark section-padding relative overflow-hidden" aria-labelledby="trust-heading">
      <div className="absolute top-0 left-0 h-px w-full bg-white/10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" aria-hidden="true" />

      <div className="container-custom relative">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <SectionHeader
            eyebrow="Why students choose us"
            id="trust-heading"
            title="Three promises you can check."
            intro="No hidden charges, no guarantees we cannot keep."
          />
        </div>

        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {promises.map((promise) => (
            <li
              key={promise.n}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7"
            >
              <span aria-hidden="true" className="mb-4 block font-heading text-3xl font-normal text-on-dark-link sm:text-4xl">
                {promise.n}
              </span>
              <h3 className="text-white">{promise.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{promise.text}</p>
              {promise.href && (
                <Link
                  href={promise.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white hover:text-on-dark-link"
                >
                  {promise.linkLabel}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
