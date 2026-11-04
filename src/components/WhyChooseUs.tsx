import type { LucideIcon } from "lucide-react";
import { Filter, ShieldCheck, Wallet } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Pillar = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const pillars: Pillar[] = [
  {
    icon: Filter,
    title: "We filter for fit — not for fees.",
    text: "Before we suggest anything, we look at your results, English level and budget, then shortlist the countries and courses that genuinely fit. We also tell you which ones do not.",
  },
  {
    icon: Wallet,
    title: "Your budget decides the shortlist.",
    text: "Tuition, living costs and the official proof-of-funds amount are shown up front, so you choose with real numbers instead of guesses.",
  },
  {
    icon: ShieldCheck,
    title: "Students don't pay us. At all.",
    text: "We take no payment from you and make no deals on your money. Any cost you meet goes to the university, test provider or government office directly — never to us.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-paper" aria-labelledby="why-us-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why choose us"
          id="why-us-heading"
          title="Honest filtering you can trust."
          intro="We would rather turn down a bad fit than push you into one. Here is what that means in practice."
        />

        <ul className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <li key={pillar.title} className="card flex h-full flex-col p-6 sm:p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white shadow-sm">
                  <Icon size={22} className="text-crimson" aria-hidden={true} />
                </div>
                <h3>{pillar.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{pillar.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
