import Image from "next/image";
import Link from "next/link";
import { Handshake, TrendingUp, Users, ShieldCheck, Globe, Briefcase, CheckCircle2, ArrowRight, MessageSquare, Building2, BarChart3, Rocket } from "lucide-react";
import CTA from "@/components/CTA";

export const metadata = {
  title: "B2B Partnership | Reason Education Consultancy",
  description: "Join Reason Education's premier B2B partnership network. We collaborate with education agents, freelance counselors, and global institutions to provide world-class study abroad solutions.",
  alternates: {
    canonical: "/b2b",
  },
};

const B2BPage = () => {
  const partnershipTypes = [
    {
      title: "Agent Network",
      desc: "Partner with us as a sub-agent and gain access to our extensive portfolio of 500+ global universities.",
      icon: Users,
      benefits: ["High Commission Rates", "Fast Application Processing", "Visa Expert Support"]
    },
    {
      title: "Freelance Counselors",
      desc: "Professional counselors can leverage our infrastructure and reputation to serve their clients better.",
      icon: Briefcase,
      benefits: ["Flexible Working Model", "Dedicated Support Desk", "Marketing Materials Provided"]
    },
    {
      title: "University Partners",
      desc: "Direct recruitment partnerships for universities looking to expand their footprint in the Nepalese market.",
      icon: Building2,
      benefits: ["Vetted Student Profiles", "On-ground Marketing", "Market Intelligence Reports"]
    }
  ];

  const coreStrengths = [
    {
      title: "High Success Rate",
      desc: "Our rigorous vetting process ensures high visa success rates for our partner's students.",
      icon: TrendingUp
    },
    {
      title: "Transparency",
      desc: "Real-time updates on application status and transparent commission settlements.",
      icon: ShieldCheck
    },
    {
      title: "Local Expertise",
      desc: "Deep understanding of the Nepalese student market and regulatory landscape.",
      icon: Globe
    },
    {
      title: "Infrastructure",
      desc: "Modern office facilities and advanced CRM systems for efficient case management.",
      icon: Rocket
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                 <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
                    <Handshake size={18} className="text-accent" />
                    <span className="text-sm font-bold uppercase tracking-widest">Partnership Program</span>
                 </div>
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                    Scale Your Business with <span className="text-accent">Reason Education</span>
                 </h1>
                 <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium mb-8">
                    Join Nepal's most trusted education network. We provide the infrastructure, expertise, and university partnerships to help your business reach new heights.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <Link href="#partner-form" className="btn-accent py-4 px-8 text-lg">
                       Become a Partner
                    </Link>
                    <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/10 flex items-center gap-2">
                       Talk to Our B2B Manager
                    </Link>
                 </div>
              </div>
              <div className="lg:w-1/3 hidden lg:block">
                 <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-3xl animate-pulse"></div>
                    <div className="relative h-full w-full bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl p-8 flex flex-col justify-center items-center text-center">
                       <BarChart3 size={80} className="text-accent mb-6" />
                       <h3 className="text-3xl font-black mb-2">300+</h3>
                       <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Active B2B Partners</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding">
        <div className="container-custom">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tighter">Choose Your Partnership Path</h2>
              <p className="text-lg text-primary/60 font-medium max-w-2xl mx-auto">
                 Tailored collaboration models designed to fit your business goals and operational style.
              </p>
           </div>
           <div className="grid lg:grid-cols-3 gap-8">
              {partnershipTypes.map((type, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                   <div className="bg-accent/10 p-5 rounded-2xl w-fit mb-8 text-accent group-hover:scale-110 transition-transform">
                      <type.icon size={36} />
                   </div>
                   <h3 className="text-2xl font-black text-primary mb-4">{type.title}</h3>
                   <p className="text-primary/70 font-medium mb-8 leading-relaxed">{type.desc}</p>
                   <ul className="space-y-4">
                      {type.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-bold text-primary/80">
                           <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
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
      <section className="section-padding bg-primary text-white overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/5 -skew-y-6 translate-y-1/2"></div>
        <div className="container-custom relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">Why Partner with Us?</h2>
                 <p className="text-lg text-white/60 font-medium mb-12">
                    We've spent years building the most robust education consultancy infrastructure in Nepal. Our partners benefit from our experience and scale from day one.
                 </p>
                 <div className="grid sm:grid-cols-2 gap-8">
                    {coreStrengths.map((strength, i) => (
                      <div key={i} className="space-y-4">
                         <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                            <strength.icon size={24} />
                         </div>
                         <h4 className="text-xl font-bold">{strength.title}</h4>
                         <p className="text-white/50 text-sm font-medium leading-relaxed">{strength.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" 
                       alt="B2B team meeting and collaboration at Reason Education Consultancy" 
                       fill
                       className="object-cover"
                    />
                 </div>
                 {/* Floating Card */}
                 <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-[2rem] shadow-2xl hidden md:block max-w-xs animate-bounce-slow">
                    <p className="text-white font-black text-2xl mb-2">98%</p>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Partner Retention Rate</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
         <div className="container-custom">
            <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100">
               <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 tracking-tighter">Onboarding Process</h2>
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
                        <div className="text-6xl font-black text-accent/10 absolute -top-8 left-1/2 -translate-x-1/2 z-0">{item.step}</div>
                        <div className="relative z-10">
                           <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                           <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Contact Form Section */}
      <section id="partner-form" className="section-padding bg-white relative overflow-hidden">
         <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter">Ready to Get Started?</h2>
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
                           <p className="text-lg font-bold text-primary">partners@reasons.edu.np</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                           <Globe size={24} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Office</p>
                           <p className="text-lg font-bold text-primary">New Baneswor, Kathmandu</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100">
                  <form className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-primary/40">Full Name</label>
                           <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent transition-colors font-medium" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-primary/40">Organization</label>
                           <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent transition-colors font-medium" placeholder="Company Name" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/40">Email Address</label>
                        <input type="email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent transition-colors font-medium" placeholder="john@example.com" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/40">Partnership Type</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent transition-colors font-medium appearance-none">
                           <option>Select Option</option>
                           <option>Sub-Agent Partnership</option>
                           <option>University Representation</option>
                           <option>Freelance Counseling</option>
                           <option>Other</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/40">Message</label>
                        <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent transition-colors font-medium resize-none" placeholder="Tell us about your business..."></textarea>
                     </div>
                     <button type="submit" className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20">
                        Submit Partnership Request
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      <CTA />
    </div>
  );
};

export default B2BPage;
