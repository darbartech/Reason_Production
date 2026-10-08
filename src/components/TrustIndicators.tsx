import SectionHeader from "./SectionHeader";

const reasons = [
  {
    n: "01",
    title: "A written fee schedule before you commit",
    text: "You see what each service costs, in writing, at the first meeting. No later surprises.",
  },
  {
    n: "02",
    title: "We tell you when a plan won't work",
    text: "If a course, country or budget doesn't fit your profile, we say so and suggest realistic alternatives.",
  },
  {
    n: "03",
    title: "Your originals stay with you",
    text: "We work from verified copies and return every document we collect at the end of each step.",
  },
  {
    n: "04",
    title: "Counselling and IELTS/PTE under one roof",
    text: "Your counsellor and your trainer talk to each other about your timeline and your progress.",
  },
];

export default function TrustIndicators() {
  return (
    <section className="surface-dark section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" aria-hidden="true" />

      <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-16 relative">
        <div className="lg:col-span-4 lg:sticky lg:top-[68px] self-start">
          <SectionHeader
            eyebrow="Why choose us"
            title={<>A consultancy that works like <em>a partner,</em> not a sales desk.</>}
            intro="Four promises you can verify at a first visit — no buzzwords, no '100% guarantees', no fine print."
          />
        </div>

        <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {reasons.map((r) => (
            <li
              key={r.n}
              className="reveal rounded-2xl p-6 sm:p-7 border border-white/10 bg-white/[0.04]"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl sm:text-4xl font-normal text-crimson block mb-4"
              >
                {r.n}
              </span>
              <h3 className="text-white">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
