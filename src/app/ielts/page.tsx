import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen, Award, ArrowRight, MessageCircle, GraduationCap, FileCheck, Target, TrendingUp, Headphones, Mic, PenTool, ChevronRight } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { whatsappLink, company } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IELTS & PTE Classes in New Baneshwor",
  description: "Weekday and weekend IELTS & PTE preparation classes at Reasons Education in New Baneshwor, Kathmandu. Weekly mock tests, small batches and personalised feedback.",
  path: "/ielts",
});

const features = [
  {
    n: "01",
    title: "Expert Trainers",
    description: "Certified instructors with years of experience in IELTS/PTE coaching and proven track records.",
  },
  {
    n: "02",
    title: "Weekly Mock Tests",
    description: "Full-length practice tests every Sunday to track progress and build test-taking confidence.",
  },
  {
    n: "03",
    title: "Updated Materials",
    description: "Comprehensive and up-to-date study materials, practice books, and online resources included.",
  },
  {
    n: "04",
    title: "Flexible Batches",
    description: "Morning, afternoon, and evening batches available to fit your schedule perfectly.",
  },
];

const courses = [
  {
    name: "IELTS Preparation",
    duration: "6 Weeks",
    features: [
      "Academic & General Training modules",
      "Daily 2-hour interactive classes",
      "Free mock tests every Sunday",
      "Grammar & vocabulary sessions",
      "Speaking practice with native accents",
      "Writing task feedback & tips",
    ],
    popular: true,
    icon: GraduationCap,
  },
  {
    name: "PTE Academic",
    duration: "4 Weeks",
    features: [
      "Computer-based training",
      "Real exam software practice",
      "Daily 1.5-hour focused classes",
      "One-on-one speaking feedback",
      "Repeat & re-order practice",
      "Personalized study plan",
    ],
    popular: false,
    icon: Target,
  },
  {
    name: "English Foundation",
    duration: "8 Weeks",
    features: [
      "Basic to Advanced Grammar",
      "Speaking & Listening focus",
      "Vocabulary building techniques",
      "Confidence building exercises",
      "Foundation for IELTS/PTE",
      "Small group interactive sessions",
    ],
    popular: false,
    icon: TrendingUp,
  },
];

const examModules = [
  {
    title: "Listening",
    description: "Practice diverse accents and question types with our audio training sessions.",
    icon: Headphones,
  },
  {
    title: "Reading",
    description: "Master skimming, scanning, and detailed reading techniques for high scores.",
    icon: BookOpen,
  },
  {
    title: "Writing",
    description: "Learn structured writing approaches with personalized feedback on your essays.",
    icon: PenTool,
  },
  {
    title: "Speaking",
    description: "Build confidence with regular one-on-one practice sessions and mock interviews.",
    icon: Mic,
  },
];

const IELTSPage = () => {
  return (
    <div className="bg-white">
      <PageHero
        variant="split"
        crumbs={[{ name: "IELTS / PTE" }]}
        eyebrow="Test preparation"
        title={<>IELTS &amp; PTE classes in <em>New Baneshwor</em></>}
        intro="Small-batch classes, weekly mock tests and one-on-one feedback until you reach the band you need."
        subject={{
          src: "/images/hero/photos/ielts-exam.jpg",
          alt: "An exam paper and pencil ready on a classroom desk for a mock test",
          width: 1200,
          height: 1500,
        }}
        badge={{
          icon: <GraduationCap size={20} />,
          title: "Small-batch classes",
          subtitle: "Weekly mock tests included",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-lg group w-full sm:w-auto">
              Book a demo class
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={whatsappLink("Hello, I'd like to know about your IELTS/PTE classes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </>
        }
      />

      <section className="section-padding bg-paper" aria-labelledby="features-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Why choose us"
            title={<>What sets <em>us apart</em></>}
            intro="Our proven methodology and experienced trainers ensure you get the best preparation for your English proficiency tests."
          />
          
          <div className="mt-12">
            <ol>
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-primary/15 py-8 first:border-t-0 first:pt-0"
                >
                  <span className="font-heading text-5xl md:text-6xl leading-none text-crimson">
                    {feature.n}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed max-w-prose">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="exam-modules-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Exam modules"
            title={<>Comprehensive <em>test preparation</em></>}
            intro="Master all four modules with targeted practice and expert guidance tailored for Nepalese students."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {examModules.map((module, index) => (
              <article 
                key={index} 
                className="card card-hover p-6 sm:p-7"
              >
                <module.icon size={28} className="text-crimson mb-5" aria-hidden="true" />
                <h3 className="mb-2">{module.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper" aria-labelledby="courses-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our courses"
            title={<>Choose your <em>preparation path</em></>}
            intro="Affordable and comprehensive courses designed for your success. All courses include study materials."
          />
          
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {courses.map((course, index) => (
              <article 
                key={index} 
                className={`card card-hover p-6 sm:p-7 relative ${course.popular ? 'ring-1 ring-crimson' : ''}`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crimson text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-5">
                  <course.icon size={28} className="text-crimson" aria-hidden="true" />
                  <div>
                    <h3>{course.name}</h3>
                    <p className="text-crimson font-semibold text-sm mt-0.5">{course.duration}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-7" role="list">
                  {course.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted text-sm">
                      <CheckCircle2 size={16} className="text-crimson mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact" 
                  className={`w-full ${course.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  Enrol Now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="schedule-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Schedule"
            title={<>Schedule &amp; <em>upcoming batches</em></>}
            intro="Current batch timings and upcoming intake dates. Updated weekly — contact us to reserve your seat."
          />
          
          <div className="mt-12 card overflow-hidden">
            <div className="grid grid-cols-3 bg-brand-light-bg border-b border-line">
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60">
                Batch
              </div>
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60 border-l border-line">
                Days
              </div>
              <div className="p-5 sm:p-6 text-sm font-semibold uppercase tracking-wide text-primary/60 border-l border-line">
                Time
              </div>
            </div>

            <div className="divide-y divide-line">
              <div className="grid grid-cols-3 items-center p-5 sm:p-6 text-center">
                <div className="text-base font-medium text-primary/80 sm:text-left col-span-3 sm:col-span-1">
                  Contact for current schedule
                </div>
                <div className="hidden sm:block text-primary/60 border-l border-line py-1">
                  <span className="text-primary/30">—</span>
                </div>
                <div className="hidden sm:block text-primary/60 border-l border-line py-1">
                  <span className="text-primary/30">—</span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-accent/5 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-primary">Schedule coming soon.</span> Batch timings will be published once the next intake is confirmed.
              </p>
              <Link href="/contact" className="link-arrow text-sm">
                Ask for current timetable
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default IELTSPage;
