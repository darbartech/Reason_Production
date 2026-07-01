"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, Send, Loader2 } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { submitContact } from "@/app/actions/contact";

const ContactClient = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContact(data);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10">
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 max-w-4xl leading-[1.05] tracking-tight">
             Let's Start Your <span className="text-accent">Global</span> Journey
           </h1>
           <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
             Have questions? Our expert counselors are ready to help you plan your international education.
           </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight tracking-tighter">Get in Touch</h2>
                    <p className="text-lg text-primary/60 font-medium leading-relaxed">
                      Visit our office or reach out to us through any of the channels below. We're here to support you 6 days a week.
                    </p>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-start space-x-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 card-hover group">
                       <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                          <MapPin size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-primary mb-1">Visit Our Office</h4>
                          <p className="text-base text-primary/70 font-medium leading-relaxed">New Baneswor, (Indreni Complex), Kathmandu, Nepal</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 card-hover group">
                       <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                          <Phone size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-primary mb-1">Call Us</h4>
                          <p className="text-base text-primary/70 font-medium leading-relaxed">015316680, 9801085977</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 card-hover group">
                       <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                          <Mail size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-primary mb-1">Email Us</h4>
                          <p className="text-base text-primary/70 font-medium leading-relaxed">info@reasons.edu.np</p>
                       </div>
                    </div>
                 </div>

                 {/* Social Info */}
                 <div className="pt-12 border-t border-gray-100">
                    <h4 className="text-xs font-black text-primary/30 uppercase tracking-[0.2em] mb-6">Follow Our Community</h4>
                    <div className="flex flex-wrap gap-4">
                       {[
                         { Icon: Facebook, href: "https://www.facebook.com/ReasonEducationNepal", label: "Facebook" },
                         { Icon: Instagram, href: "https://www.instagram.com/reasoneducation", label: "Instagram" },
                         { Icon: Linkedin, href: "https://www.linkedin.com/company/reason-education-consultancy", label: "Linkedin" },
                         { Icon: MessageCircle, href: "https://wa.me/9779801085977?text=Hello%20Reason%20Education%2C%20I%20have%20a%20question%20about%20studying%20abroad.%20Can%20you%20help%20me%3F", label: "WhatsApp" }
                       ].map(({ Icon, href, label }, i) => (
                         <a 
                           key={i} 
                           href={href} 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 border border-primary/5 hover:border-accent shadow-sm" 
                           aria-label={`Follow us on ${label}`}
                         >
                            <Icon size={24} />
                         </a>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                 
                 <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-primary mb-8 tracking-tighter">Send Us a Message</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Full Name</label>
                             <input 
                               {...register("fullName")}
                               type="text" 
                               className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium text-sm`} 
                               placeholder="John Doe" 
                             />
                             {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fullName.message}</p>}
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Phone Number</label>
                             <input 
                               {...register("phone")}
                               type="tel" 
                               className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium text-sm`} 
                               placeholder="+977 9801085977" 
                             />
                             {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone.message}</p>}
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            {...register("email")}
                            type="email" 
                            className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium text-sm`} 
                            placeholder="john@example.com" 
                          />
                          {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Message</label>
                          <textarea 
                            {...register("message")}
                            className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium min-h-[120px] resize-none text-sm`} 
                            placeholder="How can we help you?"
                          ></textarea>
                          {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.message.message}</p>}
                       </div>
                       
                       <button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="btn-primary w-full py-5 text-lg shadow-2xl shadow-accent/30 group disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                          {isSubmitting ? (
                            <Loader2 className="animate-spin" size={24} />
                          ) : (
                            <>
                              Send Message 
                              <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                       </button>
                    </form>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m1!2s!2m2!1d85.3312!2d27.6939!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c28af7%3A0x9503d3b36171630!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1712912345678!5m2!1sen!2snp" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Reason Education Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactClient;
