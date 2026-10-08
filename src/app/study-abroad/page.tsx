import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Globe, Award, Heart, ShieldCheck, Star, GraduationCap, ChevronRight, Users, TrendingUp, BookOpen, Clock, DollarSign, Building2, Plane, FileCheck, Handshake, AlertTriangle } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Schema";
import { company } from "@/lib/company";
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
    icon: TrendingUp,
    color: "bg-accent",
  },
  {
    title: "World-Class Education",
    description: "Access cutting-edge research facilities, renowned professors, and diverse academic perspectives. Universities in Canada, Australia, and the UK are consistently ranked among the best globally.",
    icon: GraduationCap,
    color: "bg-primary",
  },
  {
    title: "Personal Growth & Independence",
    description: "Living independently in a new country builds immense self-confidence, problem-solving skills, and a global mindset that shapes your character for life.",
    icon: Users,
    color: "bg-accent",
  },
  {
    title: "Cultural Immersion",
    description: "Experience new cultures, traditions, and ways of thinking. Building a global network of friends and colleagues is invaluable in today's interconnected world.",
    icon: Globe,
    color: "bg-primary",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Initial Counseling",
    description: "We understand your goals, academic background, and budget to suggest the best-fit options for your study abroad journey.",
    icon: Handshake,
  },
  {
    step: "02",
    title: "Test Preparation",
    description: "Enroll in our top-rated IELTS/PTE classes to achieve the scores required by your target universities.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "University Application",
    description: "Our team handles the application process, ensuring all documents are perfect for a high acceptance rate.",
    icon: Building2,
  },
  {
    step: "04",
    title: "Offer & Documentation",
    description: "Once accepted, we help you with financial documentation and offer letter acceptance procedures.",
    icon: FileCheck,
  },
  {
    step: "05",
    title: "Visa Application",
    description: "Expert guidance on visa filing, SOP writing, and interview preparation to maximize your success rate.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Pre-Departure & Support",
    description: "Assistance with travel, accommodation, and post-arrival support in your new country.",
    icon: Plane,
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
  { name: "USA", path: "/countries/usa", tag: "Funding options", flag: "🇺🇸" },
  { name: "Canada", path: "/countries/canada", tag: "PR pathway", flag: "🇨🇦" },
  { name: "United Kingdom", path: "/countries/uk", tag: "Short degrees", flag: "🇬🇧" },
  { name: "Australia", path: "/countries/australia", tag: "Work rights", flag: "🇦🇺" },
  { name: "New Zealand", path: "/countries/new-zealand", tag: "Small intakes", flag: "🇳🇿" },
  { name: "Europe", path: "/countries/europe", tag: "Low-tuition public", flag: "🇪🇺" },
  { name: "Japan", path: "/countries/japan", tag: "Part-time work", flag: "🇯🇵" },
];

const StudyAbroadPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }]} />
      <section 
        className="min-h-[80vh] lg:min-h-[70vh] flex items-center pt-24 pb-16 lg:pt-32 bg-primary text-white"
        aria-label="Study Abroad Hero"
      >
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Breadcrumbs */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Link href="/" className="text-white/60 hover:text-accent-light transition-colors text-xs font-bold uppercase tracking-widest">Home</Link>
                <ChevronRight size={14} className="text-white/30" />
                <span className="text-accent-light text-xs font-bold uppercase tracking-widest">Study Abroad Guide</span>
              </div>

              {/* Guide Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  Global Education
                </span>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  Since {company.established}
                </span>
              </div>

              <h1 className="text-white mb-6">
                Study abroad from Nepal
                <br />
                <span className="text-accent-light relative inline-block">
                  how it works, one step at a time
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                From picking a destination that fits your marks and budget, through test prep, applications and visa, to the day you board — the full process from one office in Kathmandu.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/contact" 
                  className="group w-full sm:w-auto px-8 py-4 bg-accent-light text-white rounded-xl font-semibold shadow-sm hover:bg-accent-light/90 transition-colors duration-200 flex items-center justify-center gap-3 text-base"
                  aria-label="Get free study abroad consultation"
                >
                  <span className="flex items-center gap-2">
                    Book a free session <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </span>
                </Link>
                <Link 
                  href="#our-process" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/25 rounded-xl font-semibold hover:bg-white/15 transition-colors duration-200 flex items-center justify-center gap-3 text-base"
                >
                  Learn Our Process
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">Free initial counselling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">IELTS &amp; PTE classes on-site</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">{company.hours.label}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative aspect-[4/5] rounded-b-xl rounded-t-[999px] overflow-hidden shadow-lg border border-line bg-white">
                <Image
                  src="/images/visuals/study-abroad-campus.webp"
                  alt="University campus building behind a green lawn"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <h3 className="text-primary mb-4 uppercase">Quick Navigation</h3>
                <nav className="space-y-1" aria-label="Page sections">
                  {["Benefits", "Our Process", "Requirements", "Destinations", "Why Us"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                      className="block py-2.5 px-4 rounded-xl text-sm text-primary/70 font-medium hover:bg-accent/5 hover:text-accent transition-all border-l-2 border-transparent hover:border-accent"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
                <div className="mt-10 bg-accent/10 p-6 rounded-xl border border-accent/20">
                  <h4 className="text-primary mb-3">Need Personalized Help?</h4>
                  <p className="text-xs text-primary/70 mb-5 leading-relaxed font-medium">
                    Our expert counsellors are ready to help you plan your journey.
                  </p>
                  <Link href="/contact" className="btn-primary w-full text-center text-sm py-3">
                    Talk to an Expert
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-16 lg:space-y-20">
              <section id="benefits" aria-labelledby="benefits-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Heart size={24} aria-hidden="true" />
                  </div>
                  <h2 id="benefits-heading" className="text-primary">
                    Benefits of Studying Abroad
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {benefits.map((benefit, index) => (
                    <article 
                      key={index}
                      className="group bg-brand-light-bg p-6 sm:p-8 rounded-xl border border-brand-border hover:shadow-md hover:border-accent/20 transition-all duration-200"
                    >
                      <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-105 transition-transform duration-200`} aria-hidden="true">
                        <benefit.icon size={24} />
                      </div>
                      <h3 className="text-primary mb-3 group-hover:text-accent transition-colors">{benefit.title}</h3>
                      <p className="text-sm text-primary/70 leading-relaxed font-medium">{benefit.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="our-process" aria-labelledby="process-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award size={24} aria-hidden="true" />
                  </div>
                  <h2 id="process-heading" className="text-primary">
                    Our 6-Step Process
                  </h2>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  {processSteps.map((step, index) => (
                    <article key={index} className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-white border border-brand-border rounded-xl sm:rounded-xl hover:shadow-md hover:border-accent/20 transition-all duration-200 group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-xl bg-accent/10 flex items-center justify-center text-accent font-semibold text-lg sm:text-xl group-hover:bg-accent group-hover:text-white transition-colors duration-200 flex-shrink-0" aria-hidden="true">
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-primary mb-1 sm:mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                        <p className="text-sm text-primary/70 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="requirements" aria-labelledby="requirements-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <ShieldCheck size={24} aria-hidden="true" />
                  </div>
                  <h2 id="requirements-heading" className="text-primary">
                    General Requirements
                  </h2>
                </div>
                
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border border-brand-border shadow-sm">
                  <p className="text-base text-primary/70 mb-8 font-medium leading-relaxed">
                    While specific requirements vary by country and institution, most international students from Nepal will need to provide:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6" role="list">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true">
                          <CheckCircle size={14} />
                        </div>
                        <span className="font-semibold text-sm text-primary/80 leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="destinations" aria-labelledby="destinations-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Globe size={24} aria-hidden="true" />
                  </div>
                  <h2 id="destinations-heading" className="text-primary">
                    Top Destinations for Nepalese Students
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {destinations.map((country) => (
                    <Link
                      key={country.name}
                      href={country.path}
                      className="group bg-white border border-brand-border p-5 sm:p-6 rounded-xl hover:shadow-md hover:border-accent/20 transition-colors duration-200 text-center relative overflow-hidden"
                      aria-label={`Study in ${country.name}`}
                    >
                      <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">
                        {country.tag}
                      </div>
                      <h3 className="text-primary mb-2 group-hover:text-accent transition-colors">{country.name}</h3>
                      <span className="inline-flex items-center text-accent text-sm font-bold group-hover:translate-x-2 transition-transform">
                        Explore <ArrowRight className="ml-2" size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section id="why-us" aria-labelledby="why-us-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Star size={24} aria-hidden="true" />
                  </div>
                  <h2 id="why-us-heading" className="text-primary">
                    Why students come to our office
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: Users, title: "Experienced counsellors", desc: "A small team that sees a limited number of students each intake so every file gets reviewed twice." },
                    { icon: DollarSign, title: "Free initial counselling", desc: "First 30-minute meeting is always free — no obligation to sign up." },
                    { icon: ShieldCheck, title: "Documentation review", desc: "SOP, LORs, bank statements and visa forms are reviewed by two people before submission." },
                    { icon: FileCheck, title: "Personalized SOP guidance", desc: "We draft your study plan with you, not for you — so it reflects your actual background." },
                    { icon: Users, title: "Mock interview sessions", desc: "Practice interviews to prepare you for visa interviews and real university questions." },
                    { icon: Clock, title: "End-to-end support", desc: "From the first meeting at our New Baneshwor office through to the day you land." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-brand-light-bg rounded-xl border border-brand-border shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-white border border-brand-border flex items-center justify-center text-primary flex-shrink-0" aria-hidden="true">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-primary/70 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="no-promises-heading">
                <div className="card card-hover border border-accent/20 bg-accent/5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0" aria-hidden="true">
                      <AlertTriangle size={22} />
                    </div>
                    <div>
                      <h3 id="no-promises-heading" className="text-primary">
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
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default StudyAbroadPage;