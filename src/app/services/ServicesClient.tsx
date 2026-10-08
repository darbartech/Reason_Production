'use client';

import Image from "next/image";
import Link from "next/link";
import { PhoneCall, FileText, Globe, GraduationCap, ArrowRight, ShieldCheck, Heart, Award, CheckCircle2, Star, Users, MapPin, Search, ClipboardCheck, Plane, Home, Building2, Handshake } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

const ServicesClient = () => {
  const mainServices = [
    {
      title: "Study Abroad Counselling",
      desc: "Our expert counsellors provide personalised guidance to help you choose the right course, university, and destination based on your academic background and career goals.",
      icon: GraduationCap,
      bg: "bg-accent/10",
      text: "text-accent",
      accent: "bg-accent",
    },
    {
      title: "University & College Admission",
      desc: "We assist with the entire application process, ensuring all documentation is accurate and submitted on time to maximize your chances of acceptance.",
      icon: Building2,
      bg: "bg-primary/10",
      text: "text-primary",
      accent: "bg-primary",
    },
    {
      title: "Visa Assistance",
      desc: "Comprehensive support for your visa application, including documentation verification, SOP guidance, and mock interview sessions so your file is complete before it is submitted.",
      icon: ShieldCheck,
      bg: "bg-accent/10",
      text: "text-accent",
      accent: "bg-accent",
    },
    {
      title: "IELTS & PTE Preparation",
      desc: "Achieve your target score with our expert-led preparation classes, featuring weekly mock tests, updated study materials, and personalized feedback.",
      icon: ClipboardCheck,
      bg: "bg-primary/10",
      text: "text-primary",
      accent: "bg-primary",
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
      bg: "bg-primary/10",
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
      <PageHero
        crumbs={[{ name: "Services" }]}
        title="Study abroad services in Kathmandu"
        intro="Counselling, test prep, applications, documentation and visa — everything from one team in one office."
      />

      {/* Main Services Section */}
      <section className="py-16 lg:py-24" aria-labelledby="main-services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20">
            <h2 id="main-services-heading" className="text-primary mb-6">
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
                className="group bg-white p-8 sm:p-10 rounded-xl border border-brand-border shadow-sm hover:shadow-md hover:border-accent/20 transition-colors duration-200 flex flex-col h-full card-hover"
              >
                <div className={`${service.bg} ${service.text} w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-200 shadow-sm`} aria-hidden="true">
                  <service.icon size={28} className="sm:size-8" />
                </div>
                
                <h3 className="text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-primary/70 leading-relaxed font-medium mb-8 flex-grow">
                  {service.desc}
                </p>
                
                <div className="pt-6 border-t border-brand-border mt-auto">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-[11px] sm:text-xs group/link"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    Inquire Now <ArrowRight className="ml-3 p-1.5 bg-accent/10 rounded-full group-hover/link:translate-x-2 group-hover/link:bg-accent group-hover/link:text-white transition-colors duration-200" size={24} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 lg:py-24 bg-brand-light-bg" aria-labelledby="why-us-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-brand-border uppercase tracking-widest">
                <Star size={14} className="fill-accent" aria-hidden="true" />
                <span>The Reason Advantage</span>
              </div>
              
              <h2 id="why-us-heading" className="text-primary mb-8">
                Why Students Trust <span className="text-accent">Reasons Education</span>
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                {[
                  { 
                    title: "Expert Counselling", 
                    desc: "Our counsellors have over 10 years of experience in the international education industry, ensuring you get the most accurate and up-to-date advice.", 
                    icon: Users 
                  },
                  { 
                    title: "Thorough Documentation Review", 
                    desc: "Documentation is reviewed by two counsellors, SOPs are built around your actual background, and we run mock interviews before every visa appointment.", 
                    icon: ShieldCheck 
                  },
                  { 
                    title: "End-to-End Support", 
                    desc: "From initial counselling and test preparation to pre-departure briefings and post-arrival support, we stay with you every step of the way.", 
                    icon: CheckCircle2 
                  },
                ].map((item, i) => (
                  <article key={i} className="flex gap-4 sm:gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-xl bg-white border border-brand-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-sm" aria-hidden="true">
                      <item.icon size={24} className="sm:size-7" />
                    </div>
                    <div>
                      <h4 className="text-primary mb-1.5 group-hover:text-accent transition-colors">{item.title}</h4>
                      <p className="text-sm sm:text-base text-primary/60 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <Image
                  src="/images/visuals/services-counselling.webp"
                  alt="Consultant and student working through application documents together at a desk"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Services */}
      <section className="py-16 lg:py-24" aria-labelledby="value-added-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 id="value-added-heading" className="text-primary mb-6">
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
                className="group bg-white p-8 sm:p-10 rounded-xl border border-brand-border shadow-sm hover:shadow-md hover:border-accent/20 transition-colors duration-200"
              >
                <div className="bg-primary/5 p-4 rounded-xl sm:rounded-xl text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-sm" aria-hidden="true">
                   <service.icon size={24} className="sm:size-7" />
                </div>
                <h4 className="text-primary mb-3 group-hover:text-accent transition-colors">
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