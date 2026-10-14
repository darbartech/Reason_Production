"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe,
  GraduationCap,
  Handshake,
  Clock,
} from "lucide-react";
import CTA from "@/components/CTA";
import CallbackCard from "@/components/CallbackCard";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";

const benefits = [
  {
    title: "Global Career Opportunities",
    description: "Studying abroad exposes you to international job markets and gives you a competitive edge. Employers value cultural intelligence, adaptability, and language skills gained through overseas education.",
  },
  {
    title: "World-Class Education",
    description: "Access cutting-edge research facilities, renowned professors, and diverse academic perspectives. Universities in Canada, Australia, and the UK are consistently ranked among the best globally.",
  },
  {
    title: "Personal Growth & Independence",
    description: "Living independently in a new country builds immense self-confidence, problem-solving skills, and a global mindset that shapes your character for life.",
  },
  {
    title: "Cultural Immersion",
    description: "Experience new cultures, traditions, and ways of thinking. Building a global network of friends and colleagues is invaluable in today's interconnected world.",
  },
];

const processSteps = [
  {
    title: "Initial Counselling",
    description: "We understand your goals, academic background, and budget to suggest the best-fit options for your study abroad journey.",
  },
  {
    title: "Test Preparation",
    description: "Enrol in our top-rated IELTS/PTE classes to achieve the scores required by your target universities.",
  },
  {
    title: "University Application",
    description: "Our team handles the application process, ensuring all documents are perfect for a high acceptance rate.",
  },
  {
    title: "Offer & Documentation",
    description: "Once accepted, we help you with financial documentation and offer letter acceptance procedures.",
  },
  {
    title: "Visa Application",
    description: "Expert guidance on visa filing, SOP writing, and interview preparation to maximise your success rate.",
  },
  {
    title: "Pre-Departure & Support",
    description: "Assistance with travel, accommodation, and post-arrival support in your new country.",
  },
];

const requirements = [
  "Valid Passport (minimum 6 months validity)",
  "Academic Transcripts (SLC/SEE, +2, Bachelor's)",
  "English Proficiency Scores (IELTS, PTE, or TOEFL)",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (LOR)",
  "Evidence of Financial Support (bank statements, loan sanction letters, scholarship/ sponsorship proof).",
  "Character Certificate",
  "Medical & Police Clearance Certificates",
];

const destinations = [
  { name: "USA", path: "/countries/usa" },
  { name: "Canada", path: "/countries/canada" },
  { name: "United Kingdom", path: "/countries/uk" },
  { name: "Australia", path: "/countries/australia" },
  { name: "New Zealand", path: "/countries/new-zealand" },
  { name: "Europe", path: "/countries/europe" },
  { name: "Japan", path: "/countries/japan" },
];

const whyUs = [
  { title: "Experienced counsellors", desc: "A small team that sees a limited number of students each intake so every file gets reviewed twice." },
  { title: "Free initial counselling", desc: "First 30-minute meeting is always free — no obligation to sign up." },
  { title: "Documentation review", desc: "SOP, LORs, bank statements and visa forms are reviewed by two people before submission." },
  { title: "Personalized SOP guidance", desc: "We draft your study plan with you, not for you — so it reflects your actual background." },
  { title: "Mock interview sessions", desc: "Practice interviews to prepare you for visa interviews and real university questions." },
  { title: "End-to-end support", desc: "From the first meeting at our New Baneshwor office through to the day you land." },
];

// One knob: horizontal padding + width for every full-bleed container on this page.
const PAGE_CONTAINER = "mx-auto w-full max-w-[1400px] px-10 sm:px-14 lg:px-24";

const tabs = [
  { id: "benefits", label: "Benefits" },
  { id: "our-process", label: "Process" },
  { id: "requirements", label: "Documents" },
  { id: "destinations", label: "Destinations" },
  { id: "why-us", label: "Why us" },
];

const SectionWrapper = ({  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className="scroll-mt-[140px]"
  >
    <SectionHeader eyebrow={eyebrow} title={title} intro={intro} align="left" />
    <div className="mt-8">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <div className="divide-y divide-line border border-line rounded-xl bg-white">
    <ul role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 px-5 sm:px-6 py-4 last:border-0">
          <CheckCircle2 size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
          <span className="text-ink text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TitleList = ({ items }: { items: { title: string; description: string }[] }) => (
  <div className="divide-y divide-line border border-line rounded-xl bg-white">
    <ul role="list">
      {items.map((item, i) => (
        <li key={i} className="px-5 sm:px-6 py-5 last:border-0">
          <h3 className="text-sm sm:text-base font-semibold text-primary">{item.title}</h3>
          <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default function StudyAbroadClient() {
  const [activeTab, setActiveTab] = useState("benefits");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <PageHero
        variant="compact"
        contentMaxWidth="max-w-4xl"
        containerMaxWidth="max-w-[1400px]"
        containerPadding="px-10 sm:px-14 lg:px-24"
        crumbs={[{ name: "Study Abroad" }]}
        eyebrow="Study abroad guide"
        title={<>Study abroad, <em>step by step.</em></>}
        intro="From picking a destination that fits your marks and budget, through test prep, applications and visa, to the day you board — the full process from one office in Kathmandu."
        actions={
          <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
            Book free counselling
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <nav
        aria-label="Page sections"
        className="sticky top-[68px] z-30 bg-white/95 backdrop-blur border-b border-line"
      >
        <div className={PAGE_CONTAINER}>
          <div className="lg:hidden -mx-10 px-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-2 w-max py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`snap-start shrink-0 px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "underline decoration-crimson decoration-2 underline-offset-[6px] text-primary font-semibold"
                      : "border border-line bg-white text-primary hover:bg-paper"
                  }`}
                  aria-current={activeTab === tab.id ? "location" : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-5 gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "underline decoration-crimson decoration-2 underline-offset-[6px] text-primary font-semibold"
                    : "border border-line bg-white text-primary hover:bg-paper"
                }`}
                aria-current={activeTab === tab.id ? "location" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="section-padding">
        <div className={PAGE_CONTAINER}>
          <div id="overview" className="scroll-mt-[140px]" />
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-9 space-y-14 lg:space-y-20">
              <SectionWrapper
                id="benefits"
                eyebrow="Benefits"
                title="Benefits of studying abroad from Nepal"
                intro="Four ways overseas education changes your trajectory — not just your CV."
              >
                <TitleList items={benefits} />
              </SectionWrapper>

              <SectionWrapper
                id="our-process"
                eyebrow="Process"
                title="Our 6-step counselling process"
                intro="From the first conversation in our office to departure day — you see every step."
              >
                <div className="grid gap-3">
                  {processSteps.map((step, i) => (
                    <article key={i} className="card p-4 sm:p-5 flex items-center gap-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary text-white flex items-center justify-center font-heading text-base sm:text-lg flex-shrink-0"
                        aria-label={`Step ${i + 1}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-primary">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted leading-snug">{step.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionWrapper>

              <SectionWrapper
                id="requirements"
                eyebrow="Documents"
                title="General requirements you'll need"
                intro="While specific requirements vary by country and institution, most international students from Nepal will need to provide:"
              >
                <BulletList items={requirements} />
              </SectionWrapper>

              <SectionWrapper
                id="destinations"
                eyebrow="Destinations"
                title="Top destinations for Nepalese students"
                intro="Seven countries where we have active university partnerships and recent visa outcomes."
              >
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {destinations.map((country) => (
                    <Link
                      key={country.name}
                      href={country.path}
                      className="card card-hover p-6 sm:p-7 group"
                      aria-label={`Study in ${country.name}`}
                    >
                      <h3>{country.name}</h3>
                      <span className="link-arrow mt-4 text-sm">
                        Read country guide
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </SectionWrapper>

              <SectionWrapper
                id="why-us"
                eyebrow="Why us"
                title="Why students come to our office"
                intro="Six practical reasons students who visit us once tend to stay through to departure."
              >
                <div className="card p-6 sm:p-8">
                  <ul className="grid sm:grid-cols-1 gap-4" role="list">
                    {whyUs.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Handshake size={16} className="text-crimson mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <span className="text-ink text-sm font-medium">{item.title}</span>
                          <p className="mt-1 text-sm text-muted leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionWrapper>

              <section aria-labelledby="no-promises-heading" className="scroll-mt-[140px]">
                <div className="card p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <AlertTriangle size={22} className="text-crimson shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 id="no-promises-heading">What we can&apos;t do</h3>
                      <p className="mt-3 text-sm sm:text-base text-ink leading-relaxed">
                        We can&apos;t guarantee a visa or an admission offer — those decisions belong to universities and embassies. What we do guarantee is that your file is accurate, complete and submitted on time, and that we tell you honestly where you stand.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-3 mt-12 lg:mt-0">
              <div className="sticky top-28 lg:top-[140px] space-y-5">
                <div className="surface-dark p-6 sm:p-7 rounded-xl text-white shadow-card">
                  <h3 className="eyebrow !text-on-dark-link mb-5">Quick facts</h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <Globe size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                          Destinations
                        </p>
                        <p className="text-base font-semibold">7 country guides</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                          Process
                        </p>
                        <p className="text-base font-semibold">6 steps, counselling to departure</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                        aria-hidden="true"
                      >
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-on-dark uppercase font-semibold tracking-wider mb-1">
                          First meeting
                        </p>
                        <p className="text-base font-semibold">Always free</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-primary w-full mt-7 py-3 text-sm"
                  >
                    Book free counselling{" "}
                    <ArrowRight size={16} className="ml-1 inline-block" aria-hidden="true" />
                  </Link>
                </div>

                <div className="card p-6 sm:p-7">
                  <h4 className="eyebrow mb-5">Working with {company.displayName}</h4>
                  <ul className="space-y-3">
                    {[
                      "Counsellor assigned to your file",
                      "Document checklist and SOP draft",
                      "Visa form review before submission",
                      "Pre-departure briefing before you fly",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted text-sm">
                        <CheckCircle2 size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-14 lg:mt-20">
            <CallbackCard />
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
