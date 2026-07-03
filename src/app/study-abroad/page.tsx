import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Globe, Award, Heart, ShieldCheck, Star, GraduationCap, ChevronRight, Users, TrendingUp, BookOpen, Clock, DollarSign, Building2, Plane, FileCheck, Handshake } from "lucide-react";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Study Abroad from Nepal | Expert Guidance for International Education",
    template: "%s | Reason Education Consultancy",
  },
  description: "Comprehensive guide to studying abroad from Nepal. Expert guidance for Canada, Australia, UK, USA, Japan, and Europe. 98% visa success rate. Free counseling available.",
  keywords: [
    "study abroad nepal",
    "international education nepal",
    "study in canada from nepal",
    "study in australia from nepal",
    "study in uk from nepal",
    "student visa nepal",
    "overseas education",
    "reason education consultancy",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  publisher: "Reason Education Consultancy",
  metadataBase: new URL("https://studynepal.edu.np"),
  alternates: {
    canonical: "/study-abroad",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://studynepal.edu.np/study-abroad",
    siteName: "Reason Education Consultancy",
    title: "Study Abroad from Nepal | Expert Guidance for International Education",
    description: "Your comprehensive guide to studying abroad. Expert visa counseling with 98% success rate for Canada, Australia, UK, USA, and more.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Study Abroad from Nepal - Reason Education Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad from Nepal | Reason Education",
    description: "Expert guidance for international education. Canada, Australia, UK, USA, Japan, and Europe.",
    images: ["https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const benefits = [
  {
    title: "Global Career Opportunities",
    description: "Studying abroad exposes you to international job markets and gives you a competitive edge. Employers value cultural intelligence, adaptability, and language skills gained through overseas education.",
    icon: TrendingUp,
    color: "bg-blue-500",
  },
  {
    title: "World-Class Education",
    description: "Access cutting-edge research facilities, renowned professors, and diverse academic perspectives. Universities in Canada, Australia, and the UK are consistently ranked among the best globally.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    title: "Personal Growth & Independence",
    description: "Living independently in a new country builds immense self-confidence, problem-solving skills, and a global mindset that shapes your character for life.",
    icon: Users,
    color: "bg-rose-500",
  },
  {
    title: "Cultural Immersion",
    description: "Experience new cultures, traditions, and ways of thinking. Building a global network of friends and colleagues is invaluable in today's interconnected world.",
    icon: Globe,
    color: "bg-amber-500",
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
  "Evidence of Financial Support (GIC, bank statements)",
  "Character Certificate",
  "Medical & Police Clearance Certificates",
];

const destinations = [
  { name: "USA", path: "/countries/usa", tag: "Scholarships", flag: "🗽" },
  { name: "Canada", path: "/countries/canada", tag: "Most Popular", flag: "🍁" },
  { name: "United Kingdom", path: "/countries/uk", tag: "Short Duration", flag: "🇬🇧" },
  { name: "Australia", path: "/countries/australia", tag: "High Success", flag: "🦘" },
  { name: "New Zealand", path: "/countries/new-zealand", tag: "Safe Environment", flag: "🇳🇿" },
  { name: "Europe", path: "/countries/europe", tag: "Tuition-Free", flag: "🇪🇺" },
  { name: "Japan", path: "/countries/japan", tag: "Affordable", flag: "🇯🇵" },
];

const StudyAbroadPage = () => {
  return (
    <div className="bg-white">
      <section 
        className="relative min-h-[80vh] lg:min-h-[70vh] flex items-center pt-24 pb-16 lg:pt-32 overflow-hidden bg-primary text-white"
        aria-label="Study Abroad Hero"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] bg-secondary/10 rounded-full blur-[100px] opacity-20" />
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Breadcrumbs */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 animate-slide-up">
                <Link href="/" className="text-white/40 hover:text-accent transition-colors text-xs font-bold uppercase tracking-widest">Home</Link>
                <ChevronRight size={14} className="text-white/20" />
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Study Abroad Guide</span>
              </div>

              {/* Guide Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                  Top Rated Guide
                </span>
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  Global Education
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Your Path to <br />
                <span className="text-accent relative inline-block">
                  Global Success
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Everything you need to know about pursuing international education from Nepal, from choosing the right destination to securing your student visa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link 
                  href="/contact" 
                  className="group w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-xl font-bold overflow-hidden shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-base"
                  aria-label="Get free study abroad consultation"
                >
                  <span className="flex items-center gap-2">
                    Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
                <Link 
                  href="#our-process" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border-white/10 text-white border rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-base"
                >
                  Learn Our Process
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">98% Visa Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">10,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">Free Counseling</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative aspect-[4/5] rounded-[2.5rem] p-3 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop"
                    alt="International students achieving their dreams - Reason Education Consultancy"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-50" />
                </div>
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
                <h3 className="text-xs font-bold text-primary mb-4 uppercase tracking-wider">Quick Navigation</h3>
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
                <div className="mt-10 bg-accent/10 p-6 rounded-2xl border border-accent/20">
                  <h4 className="font-bold text-primary mb-3 text-sm">Need Personalized Help?</h4>
                  <p className="text-xs text-primary/70 mb-5 leading-relaxed font-medium">
                    Our expert counselors are ready to help you plan your journey.
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
                  <h2 id="benefits-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    Benefits of Studying Abroad
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {benefits.map((benefit, index) => (
                    <article 
                      key={index}
                      className="group bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500"
                    >
                      <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`} aria-hidden="true">
                        <benefit.icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">{benefit.title}</h3>
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
                  <h2 id="process-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    Our Proven 6-Step Process
                  </h2>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  {processSteps.map((step, index) => (
                    <article key={index} className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-white border border-gray-100 rounded-xl sm:rounded-2xl hover:shadow-xl hover:border-accent/20 transition-all duration-500 group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-black text-lg sm:text-xl group-hover:bg-accent group-hover:text-white transition-all duration-500 flex-shrink-0" aria-hidden="true">
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base sm:text-lg font-bold text-primary mb-1 sm:mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
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
                  <h2 id="requirements-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    General Requirements
                  </h2>
                </div>
                
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
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
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Globe size={24} aria-hidden="true" />
                  </div>
                  <h2 id="destinations-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    Top Destinations for Nepalese Students
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {destinations.map((country) => (
                    <Link
                      key={country.name}
                      href={country.path}
                      className="group bg-white border border-gray-100 p-5 sm:p-6 rounded-2xl hover:shadow-xl hover:border-accent/20 transition-all text-center relative overflow-hidden"
                      aria-label={`Study in ${country.name}`}
                    >
                      <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">
                        {country.tag}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{country.name}</h3>
                      <span className="inline-flex items-center text-accent text-sm font-bold group-hover:translate-x-2 transition-transform">
                        Explore <ArrowRight className="ml-2" size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section id="why-us" aria-labelledby="why-us-heading">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Star size={24} aria-hidden="true" />
                  </div>
                  <h2 id="why-us-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    Why Choose Reason Education?
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: Award, title: "Certified Expert Counselors", desc: "Our team includes ICEF-certified consultants with 10+ years of experience." },
                    { icon: DollarSign, title: "Zero Consultation Fee", desc: "Free initial counseling to help you understand your options." },
                    { icon: TrendingUp, title: "98% Visa Success Rate", desc: "Proven track record of successful visa applications." },
                    { icon: FileCheck, title: "Personalized SOP Guidance", desc: "Expert assistance in crafting compelling Statements of Purpose." },
                    { icon: Users, title: "Mock Interview Sessions", desc: "Practice interviews to prepare you for visa interviews." },
                    { icon: Clock, title: "End-to-End Support", desc: "From counseling to post-landing assistance, we&apos;re with you always." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0" aria-hidden="true">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-primary/70 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
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