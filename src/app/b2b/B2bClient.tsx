"use client";

import Image from "next/image";
import Link from "next/link";
import { Handshake, TrendingUp, Users, ShieldCheck, Globe, Briefcase, CheckCircle2, ArrowRight, MessageSquare, Building2, BarChart3, Rocket, Send, Loader2 } from "lucide-react";
import CTA from "@/components/CTA";
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
      // Send to Web3Forms (access keys are public by design; set it in the build environment)
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

  const partnershipTypes = [
    {
      title: "Agent Network",
      desc: "Partner with us as a sub-agent and gain access to our established portfolio of partner institutions and application workflows.",
      icon: Users,
      benefits: ["Agreed commission structure", "Drafted applications reviewed in-house", "Visa documentation support"]
    },
    {
      title: "Freelance Counsellors",
      desc: "Professional counsellors can leverage our office infrastructure and university relationships to serve their clients better.",
      icon: Briefcase,
      benefits: ["Flexible engagement model", "Operations and document desk", "Shared marketing collateral"]
    },
    {
      title: "University Partners",
      desc: "Direct recruitment partnerships for institutions looking for a grounded, on-ground presence in the Nepali market.",
      icon: Building2,
      benefits: ["Vetted candidate profiles", "Local events and outreach", "Student-market reporting"]
    }
  ];

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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white">
        <div className="container-custom">
           <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                 <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
                    <Handshake size={18} className="text-accent" />
                    <span className="text-sm font-bold uppercase tracking-widest">Partnership Program</span>
                 </div>
                 <h1 className="mb-6">
                    Scale Your Business with <span className="text-accent">Reasons Education</span>
                 </h1>
                 <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium mb-8">
                    We provide a grounded office, document workflows and a catalogue of partner institutions so you can focus on counselling. Built for sub-agents and freelance counsellors who want one reliable partner in Kathmandu.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <Link href="#partner-form" className="inline-flex items-center justify-center gap-3 bg-white text-primary hover:bg-accent hover:text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 text-lg">
                       Become a Partner
                    </Link>
                    <Link href="/contact" className="bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/25 flex items-center gap-2">
                       Talk to Our B2B Manager
                    </Link>
                 </div>
              </div>
              <div className="lg:w-1/3 hidden lg:block">
                 <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/20 bg-white shadow-sm">
                    <Image
                       src="/images/visuals/b2b-partnership.webp"
                       alt="Two partners reviewing a student application checklist together at the office"
                       fill
                       sizes="30vw"
                       className="object-cover"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding">
        <div className="container-custom">
           <div className="text-center mb-16">
              <h2 className="text-primary mb-6">Choose Your Partnership Path</h2>
              <p className="text-lg text-primary/60 font-medium max-w-2xl mx-auto">
                 Tailored collaboration models designed to fit your business goals and operational style.
              </p>
           </div>
           <div className="grid lg:grid-cols-3 gap-8">
              {partnershipTypes.map((type, i) => (
                <div key={i} className="group p-10 rounded-xl bg-brand-light-bg border border-brand-border hover:bg-white hover:shadow-md hover:border-accent/20 transition-colors duration-200">
                   <div className="bg-accent/10 p-5 rounded-xl w-fit mb-8 text-accent group-hover:scale-105 transition-transform duration-200">
                      <type.icon size={36} />
                   </div>
                   <h3 className="text-primary mb-4">{type.title}</h3>
                   <p className="text-primary/70 font-medium mb-8 leading-relaxed">{type.desc}</p>
                   <ul className="space-y-4">
                      {type.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-bold text-primary/80">
                           <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                           {benefit}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="mb-8">Why Partner with Us?</h2>
                 <p className="text-lg text-white/60 font-medium mb-12">
                    We’ve spent years refining our in-office operations, university application workflows and document checklist. Our partners get a system that already works rather than building one from scratch.
                 </p>
                 <div className="grid sm:grid-cols-2 gap-8">
                    {coreStrengths.map((strength, i) => (
                      <div key={i} className="space-y-4">
                         <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                            <strength.icon size={24} />
                         </div>
                         <h4 className="">{strength.title}</h4>
                         <p className="text-white/50 text-sm font-medium leading-relaxed">{strength.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="relative rounded-b-xl rounded-t-[999px] overflow-hidden aspect-[4/5] shadow-lg border border-line bg-white">
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

      {/* Process Section */}
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
                        <div className="text-6xl font-bold text-accent/10 absolute -top-8 left-1/2 -translate-x-1/2 z-0">{item.step}</div>
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

      {/* Contact Form Section */}
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
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                           <MessageSquare size={24} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Email for B2B</p>
                           <a href={`mailto:${company.email}`} className="text-lg font-bold text-primary hover:text-accent transition-colors">
                              {company.email}
                           </a>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                           <Globe size={24} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Office</p>
                           <p className="text-lg font-bold text-primary">{company.address.street}, {company.address.city}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-brand-border">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Full Name</label>
                           <input 
                             {...register("fullName")}
                             type="text" 
                             className={`w-full px-6 py-4 rounded-xl bg-brand-light-bg border ${errors.fullName ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                             placeholder="Ram Bahadur Shrestha" 
                           />
                           {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Organization</label>
                           <input 
                             {...register("organization")}
                             type="text" 
                             className={`w-full px-6 py-4 rounded-xl bg-brand-light-bg border ${errors.organization ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                             placeholder="Company Name" 
                           />
                           {errors.organization && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.organization.message}</p>}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Email Address</label>
                        <input 
                          {...register("email")}
                          type="email" 
                          className={`w-full px-6 py-4 rounded-xl bg-brand-light-bg border ${errors.email ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium`}
                          placeholder="rudesh@gmail.com" 
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Partnership Type</label>
                        <select 
                          {...register("partnershipType")}
                          className={`w-full px-6 py-4 rounded-xl bg-brand-light-bg border ${errors.partnershipType ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium appearance-none`}
                        >
                           <option value="">Select Option</option>
                           <option value="Sub-Agent Partnership">Sub-Agent Partnership</option>
                           <option value="University Representation">University Representation</option>
                           <option value="Freelance Counseling">Freelance Counseling</option>
                           <option value="Other">Other</option>
                        </select>
                        {errors.partnershipType && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.partnershipType.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Message</label>
                        <textarea 
                          {...register("message")}
                          rows={4} 
                          className={`w-full px-6 py-4 rounded-xl bg-brand-light-bg border ${errors.message ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-colors font-medium resize-none`}
                          placeholder="Tell us about your business..."
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.message.message}</p>}
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
