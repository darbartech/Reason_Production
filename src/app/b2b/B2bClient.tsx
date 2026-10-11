"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Globe, CheckCircle2, MessageSquare, Rocket, Send, Loader2 } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { company } from "@/lib/company";

const b2bFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  organization: z.string().min(2, "Organization name is required"),
  email: z.string().email("Please enter a valid email"),
  partnershipType: z.string().min(1, "Please select a partnership type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type B2BFormData = z.infer<typeof b2bFormSchema>;

export default function B2bClient() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<B2BFormData>({
    resolver: zodResolver(b2bFormSchema),
  });

  const onSubmit = async (data: B2BFormData) => {
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        toast.error("This form is temporarily unavailable. Please call or WhatsApp us instead.");
        return;
      }
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("fullName", data.fullName);
      formData.append("organization", data.organization);
      formData.append("email", data.email);
      formData.append("partnershipType", data.partnershipType);
      formData.append("message", data.message);
      formData.append("subject", "New B2B Partnership Request");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for your partnership request! We'll get back to you soon.");
        reset();
      } else {
        toast.error(result.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const coreStrengths = [
    {
      title: "Documented file review",
      desc: "Every partner-submitted file is checked by two team members before lodgement, with a written record of issues and fixes.",
      icon: TrendingUp
    },
    {
      title: "Transparency",
      desc: "Written updates at each application stage and scheduled commission settlement reports.",
      icon: ShieldCheck
    },
    {
      title: "Local expertise",
      desc: "Deep understanding of the Nepali student market, MoE documentation and local grading systems.",
      icon: Globe
    },
    {
      title: "Operations",
      desc: "A single office in Kathmandu with documented case-tracking, printer/scanner stations and counselling rooms.",
      icon: Rocket
    }
  ];

  const comparisonRows = [
    {
      feature: "Commission structure",
      subAgent: true,
      institution: false,
    },
    {
      feature: "Application review",
      subAgent: true,
      institution: true,
    },
    {
      feature: "Visa documentation support",
      subAgent: true,
      institution: false,
    },
    {
      feature: "Operations",
      subAgent: true,
      institution: true,
    },
    {
      feature: "Marketing",
      subAgent: true,
      institution: true,
    },
    {
      feature: "Case tracking",
      subAgent: true,
      institution: true,
    },
  ];

  return (
    <div className="bg-white">
      <PageHero
        tone="navy"
        variant="split"
        crumbs={[{ name: "B2B Partnerships" }]}
        eyebrow="For partners & institutions"
        title={<>Scale your business with <em>Reasons Education</em></>}
        intro="We provide a grounded office, document workflows and a catalogue of partner institutions so you can focus on counselling. Built for sub-agents and freelance counsellors who want one reliable partner in Kathmandu."
        actions={
          <>
            <Link href="#partner-form" className="btn-primary btn-lg w-full sm:w-auto">
              Become a Partner
            </Link>
            <Link href="/contact" className="btn-on-dark btn-lg w-full sm:w-auto">
              Talk to Our B2B Manager
            </Link>
          </>
        }
        subject={{
          src: "/images/hero/photos/b2b-handshake.jpg",
          alt: "Two partners shaking hands to seal an admission partnership",
          width: 1200,
          height: 1500,
        }}
      />

      <section className="section-padding">
        <div className="container-custom">
           <div className="mb-12">
              <SectionHeader
                eyebrow="Partnership models"
                title={<>Choose Your <em>Partnership Path</em></>}
                intro="Tailored collaboration models designed to fit your business goals and operational style."
              />
           </div>

           <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
              <div className="grid grid-cols-3 bg-brand-light-bg border-b border-line">
                 <div className="p-6 text-sm font-semibold uppercase tracking-wide text-primary/60">
                    Feature
                 </div>
                 <div className="p-6 text-lg font-bold text-primary border-l border-line">
                    Sub-agent partners
                 </div>
                 <div className="p-6 text-lg font-bold text-primary border-l border-line">
                    Institution partners
                 </div>
              </div>

              <div className="divide-y divide-line">
                 {comparisonRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 items-center">
                       <div className="p-6 text-base font-medium text-primary/80">
                          {row.feature}
                       </div>
                       <div className="p-6 border-l border-line text-primary">
                          {row.subAgent ? (
                             <CheckCircle2 size={22} className="text-accent" />
                          ) : (
                             <span className="text-primary/30">—</span>
                          )}
                          {i === 3 && row.subAgent && (
                             <div className="mt-4 pl-2 border-l-2 border-accent/30">
                                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                                   Freelance Counsellors
                                </p>
                                <p className="text-sm font-medium text-primary/70 leading-relaxed">
                                   Desk access, document operations &amp; shared marketing collateral for independent counsellors.
                                </p>
                             </div>
                          )}
                       </div>
                       <div className="p-6 border-l border-line text-primary">
                          {row.institution ? (
                             <CheckCircle2 size={22} className="text-accent" />
                          ) : (
                             <span className="text-primary/30">—</span>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="mb-8 text-white">Why Partner with <em>Us?</em></h2>
                 <p className="text-lg text-on-dark font-medium mb-12">
                    We&apos;ve spent years refining our in-office operations, university application workflows and document checklist. Our partners get a system that already works rather than building one from scratch.
                 </p>
                 <div className="grid sm:grid-cols-2 gap-8">
                    {coreStrengths.map((strength, i) => (
                      <div key={i} className="space-y-4">
                         <strength.icon size={28} className="text-on-dark-link" />
                         <h4 className="text-white">{strength.title}</h4>
                         <p className="text-on-dark text-sm leading-relaxed">{strength.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-float border border-white/10 bg-white">
                    <Image
                       src="/images/visuals/b2b-partnership.webp"
                       alt="Business partners shaking hands over an agreement"
                       fill
                       sizes="(min-width: 1024px) 40vw, 90vw"
                       className="object-cover"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="section-padding">
         <div className="container-custom">
            <div className="bg-brand-light-bg rounded-xl p-8 md:p-16 border border-brand-border">
               <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-primary mb-4">Onboarding Process</h2>
                  <p className="text-primary/60 font-medium">Simple steps to start your partnership journey with us.</p>
               </div>
               <div className="grid md:grid-cols-4 gap-8">
                  {[
                     { step: "01", title: "Apply", desc: "Fill out our partnership form." },
                     { step: "02", title: "Review", desc: "Our team will review your profile." },
                     { step: "03", title: "Agreement", desc: "Sign the partnership MOU." },
                     { step: "04", title: "Launch", desc: "Start recruiting and earning." }
                  ].map((item, i) => (
                     <div key={i} className="relative text-center">
                        <div className="text-6xl font-bold text-accent/10 absolute -top-8 left-1/2 -translate-x-1/2 z-0 font-heading">{item.step}</div>
                        <div className="relative z-10">
                           <h4 className="text-primary mb-2">{item.title}</h4>
                           <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section id="partner-form" className="section-padding bg-white">
         <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <h2 className="text-primary">Ready to Get Started?</h2>
                  <p className="text-lg text-primary/70 font-medium leading-relaxed">
                     Fill out the form below and our B2B partnership manager will get back to you within 24 hours to discuss how we can work together.
                  </p>
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <MessageSquare size={22} className="text-crimson shrink-0" />
                        <div>
                           <p className="text-sm font-semibold uppercase tracking-wide text-primary/60">Email for B2B</p>
                           <a href={`mailto:${company.email}`} className="text-lg font-bold text-primary hover:text-crimson transition-colors">
                              {company.email}
                           </a>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Globe size={22} className="text-crimson shrink-0" />
                        <div>
                           <p className="text-sm font-semibold uppercase tracking-wide text-primary/60">Office</p>
                           <p className="text-lg font-bold text-primary">{company.address.street}, {company.address.city}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-brand-border">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-semibold uppercase tracking-wide text-primary/70">Full Name</label>
                           <input 
                             {...register("fullName")}
                             type="text" 
                             className={`w-full h-12 px-6 text-base rounded-xl bg-brand-light-bg border ${errors.fullName ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                             placeholder="Ram Bahadur Shrestha" 
                           />
                           {errors.fullName && <p className="text-red-700 text-sm mt-1 ml-1">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-semibold uppercase tracking-wide text-primary/70">Organization</label>
                           <input 
                             {...register("organization")}
                             type="text" 
                             className={`w-full h-12 px-6 text-base rounded-xl bg-brand-light-bg border ${errors.organization ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                             placeholder="Company Name" 
                           />
                           {errors.organization && <p className="text-red-700 text-sm mt-1 ml-1">{errors.organization.message}</p>}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-primary/70">Email Address</label>
                        <input 
                          {...register("email")}
                          type="email" 
                          className={`w-full h-12 px-6 text-base rounded-xl bg-brand-light-bg border ${errors.email ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                          placeholder="rudesh@gmail.com" 
                        />
                        {errors.email && <p className="text-red-700 text-sm mt-1 ml-1">{errors.email.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-primary/70">Partnership Type</label>
                        <select 
                          {...register("partnershipType")}
                          className={`w-full h-12 px-6 text-base rounded-xl bg-brand-light-bg border ${errors.partnershipType ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium appearance-none`}
                        >
                           <option value="">Select Option</option>
                           <option value="Sub-Agent Partnership">Sub-Agent Partnership</option>
                           <option value="University Representation">University Representation</option>
                           <option value="Freelance Counseling">Freelance Counselling</option>
                           <option value="Other">Other</option>
                        </select>
                        {errors.partnershipType && <p className="text-red-700 text-sm mt-1 ml-1">{errors.partnershipType.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-primary/70">Message</label>
                        <textarea 
                          {...register("message")}
                          rows={4} 
                          className={`w-full px-6 py-3 text-base rounded-xl bg-brand-light-bg border ${errors.message ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium resize-none`}
                          placeholder="Tell us about your business..."
                        ></textarea>
                        {errors.message && <p className="text-red-700 text-sm mt-1 ml-1">{errors.message.message}</p>}
                     </div>
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="btn-primary w-full py-5 text-lg shadow-md group disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" size={24} />
                        ) : (
                          <>
                            Submit Partnership Request
                            <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      <CTA />
    </div>
  );
}
