'use client';

import Image from "next/image";
import Link from "next/link";
import { PhoneCall, FileText, Globe, GraduationCap, ArrowRight, ShieldCheck, Heart, Award, CheckCircle2, Star, Users, MapPin, Search, ClipboardCheck, Plane, Home, Sparkles, Building2, Handshake } from "lucide-react";
import CTA from "@/components/CTA";

const ServicesClient = () => {
  const mainServices = [
    {
      title: "Study Abroad Counseling",
      desc: "Our expert counselors provide personalized guidance to help you choose the right course, university, and destination based on your academic background and career goals.",
      icon: GraduationCap,
      bg: "bg-blue-50",
      text: "text-blue-600",
      accent: "bg-blue-600",
    },
    {
      title: "University & College Admission",
      desc: "We assist with the entire application process, ensuring all documentation is accurate and submitted on time to maximize your chances of acceptance.",
      icon: Building2,
      bg: "bg-purple-50",
      text: "text-purple-600",
      accent: "bg-purple-600",
    },
    {
      title: "Visa Assistance",
      desc: "Comprehensive support for your visa application, including documentation verification, SOP guidance, and mock interview sessions for a high success rate.",
      icon: ShieldCheck,
      bg: "bg-green-50",
      text: "text-green-600",
      accent: "bg-green-600",
    },
    {
      title: "IELTS & PTE Preparation",
      desc: "Achieve your target score with our expert-led preparation classes, featuring weekly mock tests, updated study materials, and personalized feedback.",
      icon: ClipboardCheck,
      bg: "bg-accent/10",
      text: "text-accent",
      accent: "bg-accent",
    },
    {
      title: "Scholarship Guidance",
      desc: "We help you identify and apply for various merit-based and need-based scholarships to make your international education more affordable.",
      icon: Award,
      bg: "bg-accent/10",
      text: "text-accent",
      accent: "bg-accent",
    },
    {
      title: "B2B Educational Partnership",
      desc: "Strategic collaborations with international institutions and local organizations to create seamless educational pathways for students.",
      icon: Handshake,
      bg: "bg-primary/5",
      text: "text-primary",
      accent: "bg-primary",
    },
  ];

  const valueAddedServices = [
    { 
      title: "SOP & Essay Support", 
      desc: "Expert guidance on crafting compelling Statements of Purpose and application essays that stand out to admission committees.", 
      icon: FileText 
    },
    { 
      title: "Pre-Departure Briefing", 
      desc: "Essential sessions to prepare you for life abroad, covering cultural adjustment, health insurance, and banking essentials.", 
      icon: Plane 
    },
    { 
      title: "Post-Arrival Support", 
      desc: "We stay connected even after you land, assisting with accommodation search and initial settlement in your new country.", 
      icon: Home 
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-primary"
        aria-label="Services Hero"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-accent/20 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] bg-secondary/10 rounded-full blur-[100px] opacity-20" />
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 backdrop-blur-md border border-white/10 uppercase tracking-widest">
                <Sparkles size={14} className="text-accent" aria-hidden="true" />
                <span>Our Professional Expertise</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                Comprehensive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-600 relative inline-block">
                  Education Solutions
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                From your first inquiry to landing in your dream destination, we provide end-to-end support to ensure your international education journey is seamless and successful.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/contact" 
                  className="group w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-xl font-bold overflow-hidden shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-base"
                >
                  Get Free Counseling <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link 
                  href="/study-abroad" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-base"
                >
                  Study Abroad Guide
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative aspect-[4/5] rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1470"
                  alt="Professional Education Counseling Services - Reason Education"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl" aria-hidden="true">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white shadow-lg">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary leading-tight">Trusted by 10,000+ Students</p>
                      <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mt-0.5">98% Visa Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 lg:py-24" aria-labelledby="main-services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20">
            <h2 id="main-services-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-6 leading-[1.1] tracking-tight">
              Our <span className="text-accent">Core Expertise</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary/60 font-medium leading-relaxed">
              We provide a full spectrum of services designed to help you navigate the complexities of international education with ease and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mainServices.map((service, i) => (
              <article 
                key={i} 
                className="group bg-white p-8 sm:p-10 rounded-2xl lg:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-accent/10 transition-all duration-500 flex flex-col h-full card-hover"
              >
                <div className={`${service.bg} ${service.text} w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`} aria-hidden="true">
                  <service.icon size={28} className="sm:size-8" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-primary/70 leading-relaxed font-medium mb-8 flex-grow">
                  {service.desc}
                </p>
                
                <div className="pt-6 border-t border-gray-100 mt-auto">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-accent font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs group/link"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    Inquire Now <ArrowRight className="ml-3 p-1.5 bg-accent/10 rounded-full group-hover/link:translate-x-2 group-hover/link:bg-accent group-hover/link:text-white transition-all duration-300" size={24} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 lg:py-24 bg-gray-50/50 relative overflow-hidden" aria-labelledby="why-us-heading">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" aria-hidden="true"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-accent/20 uppercase tracking-widest">
                <Star size={14} className="fill-accent" aria-hidden="true" />
                <span>The Reason Advantage</span>
              </div>
              
              <h2 id="why-us-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-8 leading-[1.1] tracking-tight">
                Why Students Trust <span className="text-accent">Reason Education</span>
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                {[
                  { 
                    title: "Expert Counseling", 
                    desc: "Our counselors have over 10 years of experience in the international education industry, ensuring you get the most accurate and up-to-date advice.", 
                    icon: Users 
                  },
                  { 
                    title: "High Visa Success", 
                    desc: "We maintain a 98% visa success rate through meticulous documentation, personalized SOP guidance, and intensive interview preparation.", 
                    icon: ShieldCheck 
                  },
                  { 
                    title: "End-to-End Support", 
                    desc: "From initial counseling and test preparation to pre-departure briefings and post-arrival support, we stay with you every step of the way.", 
                    icon: CheckCircle2 
                  },
                ].map((item, i) => (
                  <article key={i} className="flex gap-4 sm:gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-xl" aria-hidden="true">
                      <item.icon size={24} className="sm:size-7" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-primary mb-1.5 group-hover:text-accent transition-colors leading-tight">{item.title}</h4>
                      <p className="text-sm sm:text-base text-primary/60 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-accent rounded-3xl lg:rounded-[3rem] -rotate-2 opacity-10 blur-2xl" aria-hidden="true"></div>
              <div className="relative rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                  alt="Happy students achieving their dreams with Reason Education"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-2xl border border-gray-100 hidden sm:block" aria-hidden="true">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg">
                    <Award size={28} className="sm:size-8" />
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-primary leading-none">10+</p>
                    <p className="text-[10px] sm:text-[11px] text-primary/60 font-bold uppercase tracking-widest mt-1">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Services */}
      <section className="py-16 lg:py-24" aria-labelledby="value-added-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 id="value-added-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-6 leading-[1.1] tracking-tight">
              Beyond the Basics: <span className="text-accent">Specialized Services</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary/60 font-medium leading-relaxed">
              We go the extra mile to ensure your transition to international student life is as smooth and stress-free as possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {valueAddedServices.map((service, i) => (
              <article 
                key={i} 
                className="group bg-white p-8 sm:p-10 rounded-2xl lg:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent/10 transition-all duration-500"
              >
                <div className="bg-primary/5 p-4 rounded-xl sm:rounded-2xl text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm" aria-hidden="true">
                   <service.icon size={24} className="sm:size-7" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                  {service.title}
                </h4>
                <p className="text-sm sm:text-base text-primary/70 font-medium leading-relaxed">
                  {service.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default ServicesClient;