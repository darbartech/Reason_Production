import Link from "next/link";
import { CheckCircle, ArrowRight, GraduationCap, AlertTriangle } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad from Nepal: Process & Visas",
  description: "How to study abroad from Nepal: the process, costs in NPR, English tests, visa documentation and which destinations accept Nepali students. Counselling in New Baneshwor.",
  path: "/study-abroad",
});

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
    step: "01",
    title: "Initial Counselling",
    description: "We understand your goals, academic background, and budget to suggest the best-fit options for your study abroad journey.",
  },
  {
    step: "02",
    title: "Test Preparation",
    description: "Enrol in our top-rated IELTS/PTE classes to achieve the scores required by your target universities.",
  },
  {
    step: "03",
    title: "University Application",
    description: "Our team handles the application process, ensuring all documents are perfect for a high acceptance rate.",
  },
  {
    step: "04",
    title: "Offer & Documentation",
    description: "Once accepted, we help you with financial documentation and offer letter acceptance procedures.",
  },
  {
    step: "05",
    title: "Visa Application",
    description: "Expert guidance on visa filing, SOP writing, and interview preparation to maximise your success rate.",
  },
  {
    step: "06",
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

const StudyAbroadPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }]} />
      <PageHero
        tone="navy"
        variant="split"
        crumbs={[{ name: "Study Abroad Guide" }]}
        eyebrow="Study abroad guide"
        title={<>Study abroad from Nepal — <em>how it works, one step at a time.</em></>}
        intro="From picking a destination that fits your marks and budget, through test prep, applications and visa, to the day you board — the full process from one office in Kathmandu."
        subject={{
          src: "/images/hero/photos/study-abroad-library.jpg",
          alt: "Two students studying together in a library with books and a laptop",
          width: 1200,
          height: 1500,
        }}
        badge={{
          icon: <GraduationCap size={20} />,
          title: "7 study destinations",
          subtitle: "One plan that fits your profile",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
              Book free counselling
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/countries" className="btn-on-dark btn-lg w-full sm:w-auto">
              Explore destinations
            </Link>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom space-y-20 lg:space-y-28">
          <section id="benefits" aria-labelledby="benefits-heading">
            <SectionHeader
              eyebrow="Benefits"
              title={<>Benefits of studying <em>abroad from Nepal</em></>}
              intro="Four ways overseas education changes your trajectory — not just your CV."
            />
            
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {benefits.map((benefit, index) => (
                <li 
                  key={index}
                  className="py-6 border-t border-line first:border-t-0 sm:border-t-0 sm:border-l sm:pl-6 sm:py-0 sm:first:border-l-0 sm:first:pl-0"
                >
                  <h3>{benefit.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed">{benefit.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="our-process" aria-labelledby="process-heading">
            <SectionHeader
              eyebrow="Process"
              title={<>Our 6-step <em>counselling process</em></>}
              intro="From the first conversation in our office to departure day — you see every step."
            />
            
            <div className="mt-12">
              <ol>
                {processSteps.map((step, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[auto_1fr] gap-6 border-t border-primary/15 py-8 first:border-t-0 first:pt-0"
                  >
                    <span className="font-heading text-5xl md:text-6xl leading-none text-crimson">
                      {step.step}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed max-w-prose">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="requirements" aria-labelledby="requirements-heading">
            <SectionHeader
              eyebrow="Documents"
              title={<>General requirements <em>you&apos;ll need</em></>}
              intro="While specific requirements vary by country and institution, most international students from Nepal will need to provide:"
            />
            
            <div className="mt-12 card p-6 sm:p-8 md:p-10">
              <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6" role="list">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-crimson mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-[0.9375rem] text-primary/80 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="destinations" aria-labelledby="destinations-heading">
            <SectionHeader
              eyebrow="Destinations"
              title={<>Top destinations <em>for Nepalese students</em></>}
              intro="Seven countries where we have active university partnerships and recent visa outcomes."
            />
            
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
          </section>

          <section id="why-us" aria-labelledby="why-us-heading">
            <SectionHeader
              eyebrow="Why us"
              title={<>Why students come <em>to our office</em></>}
              intro="Six practical reasons students who visit us once tend to stay through to departure."
            />
            
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[
                { title: "Experienced counsellors", desc: "A small team that sees a limited number of students each intake so every file gets reviewed twice." },
                { title: "Free initial counselling", desc: "First 30-minute meeting is always free — no obligation to sign up." },
                { title: "Documentation review", desc: "SOP, LORs, bank statements and visa forms are reviewed by two people before submission." },
                { title: "Personalized SOP guidance", desc: "We draft your study plan with you, not for you — so it reflects your actual background." },
                { title: "Mock interview sessions", desc: "Practice interviews to prepare you for visa interviews and real university questions." },
                { title: "End-to-end support", desc: "From the first meeting at our New Baneshwor office through to the day you land." },
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-6 border-t border-line first:border-t-0 sm:odd:border-t-0 sm:border-l sm:pl-6 sm:py-0 sm:odd:border-l-0 sm:odd:pl-0 sm:col-span-1"
                >
                  <h3>{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="no-promises-heading">
            <div className="card card-hover border border-accent/20 bg-accent/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle size={22} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 id="no-promises-heading">
                    What we can&apos;t do
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-ink leading-relaxed">
                    We can&apos;t guarantee a visa or an admission offer — those decisions belong to universities and embassies. What we do guarantee is that your file is accurate, complete and submitted on time, and that we tell you honestly where you stand.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default StudyAbroadPage;
