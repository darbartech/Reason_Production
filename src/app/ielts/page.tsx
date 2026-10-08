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
    title: "Expert Trainers",
    description: "Certified instructors with years of experience in IELTS/PTE coaching and proven track records.",
    icon: Users,
    color: "bg-accent",
  },
  {
    title: "Weekly Mock Tests",
    description: "Full-length practice tests every Sunday to track progress and build test-taking confidence.",
    icon: FileCheck,
    color: "bg-primary",
  },
  {
    title: "Updated Materials",
    description: "Comprehensive and up-to-date study materials, practice books, and online resources included.",
    icon: BookOpen,
    color: "bg-accent",
  },
  {
    title: "Flexible Batches",
    description: "Morning, afternoon, and evening batches available to fit your schedule perfectly.",
    icon: Clock,
    color: "bg-primary",
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
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Reading",
    description: "Master skimming, scanning, and detailed reading techniques for high scores.",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Writing",
    description: "Learn structured writing approaches with personalized feedback on your essays.",
    icon: PenTool,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Speaking",
    description: "Build confidence with regular one-on-one practice sessions and mock interviews.",
    icon: Mic,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const IELTSPage = () => {
  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "IELTS / PTE" }]}
        title="IELTS &amp; PTE classes in New Baneshwor"
        intro="Small-batch classes, weekly mock tests and one-on-one feedback until you reach the band you need."
      />

      <section className="section-padding bg-paper" aria-labelledby="features-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Why choose us"
            title="What Sets Us Apart"
            intro="Our proven methodology and experienced trainers ensure you get the best preparation for your English proficiency tests."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {features.map((feature, index) => (
              <article 
                key={index} 
                className="card card-hover p-6 sm:p-7"
              >
                <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center mb-5 text-white" aria-hidden="true">
                  <feature.icon size={22} />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="exam-modules-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Exam modules"
            title="Comprehensive Test Preparation"
            intro="Master all four modules with targeted practice and expert guidance tailored for Nepalese students."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
            {examModules.map((module, index) => (
              <article 
                key={index} 
                className="card card-hover text-center p-6 sm:p-7"
              >
                <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center mb-5 mx-auto text-white" aria-hidden="true">
                  <module.icon size={22} />
                </div>
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
            title="Choose Your Preparation Path"
            intro="Affordable and comprehensive courses designed for your success. All courses include study materials."
          />
          
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {courses.map((course, index) => (
              <article 
                key={index} 
                className={`card card-hover p-6 sm:p-7 relative ${course.popular ? 'ring-1 ring-crimson' : ''}`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crimson text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center text-white" aria-hidden="true">
                    <course.icon size={22} />
                  </div>
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
                  className={`w-full block text-center py-3 rounded-md font-semibold transition-colors duration-200 text-sm ${course.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Enroll Now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default IELTSPage;