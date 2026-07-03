import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen, Award, ArrowRight, MessageCircle, GraduationCap, FileCheck, Target, TrendingUp, Headphones, Mic, PenTool, ChevronRight } from "lucide-react";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Best IELTS & PTE Classes in Kathmandu | Expert Training 2026",
    template: "%s | Reason Education Consultancy",
  },
  description: "Join the best IELTS and PTE preparation classes in Kathmandu, Nepal. Expert trainers, mock tests, and flexible schedules. Achieve your target band score with Reason Education.",
  keywords: [
    "ielts classes kathmandu",
    "ielts preparation nepal",
    "pte classes kathmandu",
    "ielts coaching nepal",
    "best ielts institute kathmandu",
    "ielts score improvement",
    "pte academic nepal",
    "english test preparation",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  publisher: "Reason Education Consultancy",
  metadataBase: new URL("https://studynepal.edu.np"),
  alternates: {
    canonical: "/ielts",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://studynepal.edu.np/ielts",
    siteName: "Reason Education Consultancy",
    title: "Best IELTS & PTE Classes in Kathmandu | Expert Training 2026",
    description: "Join the best IELTS and PTE preparation classes in Kathmandu. Expert trainers with proven results.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "IELTS and PTE Preparation Classes - Reason Education Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best IELTS & PTE Classes in Kathmandu | Reason Education",
    description: "Expert IELTS and PTE coaching in Kathmandu. Achieve your target score with certified trainers.",
    images: ["https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&h=630&auto=format&fit=crop"],
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

const features = [
  {
    title: "Expert Trainers",
    description: "Certified instructors with years of experience in IELTS/PTE coaching and proven track records.",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Weekly Mock Tests",
    description: "Full-length practice tests every Sunday to track progress and build test-taking confidence.",
    icon: FileCheck,
    color: "bg-green-500",
  },
  {
    title: "Updated Materials",
    description: "Comprehensive and up-to-date study materials, practice books, and online resources included.",
    icon: BookOpen,
    color: "bg-purple-500",
  },
  {
    title: "Flexible Batches",
    description: "Morning, afternoon, and evening batches available to fit your schedule perfectly.",
    icon: Clock,
    color: "bg-amber-500",
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
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Reading",
    description: "Master skimming, scanning, and detailed reading techniques for high scores.",
    icon: BookOpen,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Writing",
    description: "Learn structured writing approaches with personalized feedback on your essays.",
    icon: PenTool,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Speaking",
    description: "Build confidence with regular one-on-one practice sessions and mock interviews.",
    icon: Mic,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const IELTSPage = () => {
  return (
    <div className="bg-white">
      <section 
        className="relative min-h-[80vh] lg:min-h-[70vh] flex items-center pt-24 pb-16 lg:pt-32 overflow-hidden bg-primary"
        aria-label="IELTS and PTE Hero Section"
      >
        <div className="container-custom text-white">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                Master Your IELTS &amp; PTE
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Achieve your target score in the first attempt. Join our top-rated preparation classes led by certified trainers with years of experience helping Nepalese students succeed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/contact" 
                  className="group w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-xl font-bold overflow-hidden shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-base"
                  aria-label="Book a free demo class"
                >
                  <span className="flex items-center gap-2">
                    Book Free Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
                <a 
                  href="https://wa.me/9779801085977?text=Hello%20Reason%20Education%2C%20I%20have%20a%20question%20about%20studying%20abroad.%20Can%20you%20help%20me%3F" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary border-2 border-gray-200 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 text-base"
                >
                  <MessageCircle className="text-[#25D366]" size={20} aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">98% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">8.0+ Band Achievers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/70">Weekend Batches</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="relative aspect-[4/5] rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop"
                  alt="Students studying IELTS and PTE preparation at Reason Education Consultancy in Kathmandu"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50/50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
              <Award size={16} aria-hidden="true" />
              <span>Why Choose Us</span>
            </div>
            <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-base sm:text-lg text-primary/60 font-medium max-w-2xl mx-auto">
              Our proven methodology and experienced trainers ensure you get the best preparation for your English proficiency tests.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map((feature, index) => (
              <article 
                key={index} 
                className="group bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`} aria-hidden="true">
                  <feature.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed font-medium">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" aria-labelledby="exam-modules-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
              <Target size={16} aria-hidden="true" />
              <span>Exam Modules</span>
            </div>
            <h2 id="exam-modules-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Comprehensive Test Preparation
            </h2>
            <p className="text-base sm:text-lg text-primary/60 font-medium max-w-2xl mx-auto">
              Master all four modules with targeted practice and expert guidance tailored for Nepalese students.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {examModules.map((module, index) => (
              <article 
                key={index} 
                className="group text-center p-6 sm:p-8 bg-gray-50/50 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${module.bg} rounded-2xl flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-all duration-500`} aria-hidden="true">
                  <module.icon size={28} className={module.color} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{module.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed font-medium">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" aria-labelledby="courses-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
              <GraduationCap size={16} aria-hidden="true" />
              <span>Our Courses</span>
            </div>
            <h2 id="courses-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Choose Your Preparation Path
            </h2>
            <p className="text-base sm:text-lg text-primary/60 font-medium max-w-2xl mx-auto">
              Affordable and comprehensive courses designed for your success. All courses include study materials.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, index) => (
              <article 
                key={index} 
                className={`relative bg-white p-6 sm:p-8 rounded-2xl border-2 transition-all duration-500 hover:-translate-y-2 ${course.popular ? 'border-accent shadow-2xl shadow-accent/10' : 'border-gray-100 shadow-sm hover:shadow-xl'}`}
              >
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${course.popular ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'} flex items-center justify-center`} aria-hidden="true">
                    <course.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{course.name}</h3>
                    <p className="text-accent font-bold text-sm">{course.duration}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8" role="list">
                  {course.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-primary/70 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact" 
                  className={`w-full block text-center py-4 rounded-xl font-bold transition-all text-sm ${course.popular ? 'bg-accent text-white shadow-lg hover:bg-accent/90' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
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