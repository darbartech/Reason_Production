import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, DollarSign, Calendar, MapPin, GraduationCap, Clock, FileText, HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import CTA from "@/components/CTA";

interface CountryPageProps {
  country: string;
  h1: string;
  overview: string;
  image: string;
  requirements: string[];
  costs: string[];
  visaProcess: string[];
  intakes: string[];
  faqs: { q: string; a: string }[];
}

const CountryPageTemplate = ({
  country,
  h1,
  overview,
  image,
  requirements,
  costs,
  visaProcess,
  intakes,
  faqs,
}: CountryPageProps) => {
  return (
    <div className="bg-white">
      <section 
        className="relative min-h-[70vh] lg:min-h-[70vh] flex items-center pt-24 pb-16 lg:pt-32 overflow-hidden"
        aria-label={`Study in ${country} hero section`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={`Study in ${country} - Reason Education Consultancy`}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 opacity-30"
            style={{ animationDuration: '30s' }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-4xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 lg:mb-8 leading-[1.05] tracking-tight">
              {h1}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8 lg:mb-12 font-medium">
              {overview}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary !px-8 !py-4 !text-base lg:!px-10 lg:!py-5 lg:!text-lg shadow-[0_20px_50px_rgba(255,122,0,0.3)] group hover:scale-[1.02] transition-all">
                Get Free Counseling <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform lg:!text-xl" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 -mt-12 lg:-mt-16 relative z-20 overflow-hidden">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:gap-x-12">
            <div className="lg:col-span-8 space-y-12 lg:space-y-20">
              <section id="requirements" aria-labelledby="requirements-heading" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6 lg:mb-10 group">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/5">
                    <GraduationCap size={28} className="lg:size-8" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="requirements-heading" className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary uppercase tracking-tight">Admission Requirements</h2>
                    <p className="text-primary/40 font-bold uppercase tracking-[0.2em] text-[9px] lg:text-[10px] mt-1">What you need to apply</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:border-accent/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-accent/5 rounded-bl-[80px] lg:rounded-bl-[100px] group-hover:scale-110 transition-transform" aria-hidden="true"></div>
                  <ul className="grid sm:grid-cols-2 gap-4 lg:gap-8 relative z-10" role="list">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 lg:gap-4 group/item">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0 group-hover/item:bg-accent group-hover/item:text-white transition-all duration-300 shadow-sm" aria-hidden="true">
                          <CheckCircle2 size={12} className="lg:size-3.5" />
                        </div>
                        <span className="text-primary/80 font-bold text-sm lg:text-base leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="visa-process" aria-labelledby="visa-process-heading" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6 lg:mb-10 group">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                    <FileText size={28} className="lg:size-8" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="visa-process-heading" className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary uppercase tracking-tight">Visa Application Process</h2>
                    <p className="text-primary/40 font-bold uppercase tracking-[0.2em] text-[9px] lg:text-[10px] mt-1">Step-by-step guidance</p>
                  </div>
                </div>
                
                <div className="grid gap-4 lg:gap-5">
                  {visaProcess.map((step, i) => (
                    <article key={i} className="flex items-center gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 bg-white border border-gray-50 rounded-xl lg:rounded-2xl hover:shadow-xl hover:border-accent/10 transition-all duration-500 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-[1.2rem] bg-primary text-white flex items-center justify-center font-bold text-base sm:text-lg lg:text-xl group-hover:bg-accent group-hover:scale-105 transition-all duration-500 shadow-xl flex-shrink-0" aria-label={`Step ${i + 1}`}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg text-primary/80 font-bold leading-tight group-hover:text-primary transition-colors">{step}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6 lg:mb-10 group">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                    <HelpCircle size={28} className="lg:size-8" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="faq-heading" className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary uppercase tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-primary/40 font-bold uppercase tracking-[0.2em] text-[9px] lg:text-[10px] mt-1">Clear your doubts</p>
                  </div>
                </div>
                
                <div className="space-y-3 lg:space-y-4">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                      <summary className="flex items-center justify-between p-4 sm:p-5 lg:p-6 cursor-pointer list-none">
                        <span className="text-sm sm:text-base lg:text-lg font-bold text-primary pr-4">{faq.q}</span>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary group-open:rotate-180 group-open:bg-accent group-open:text-white transition-all duration-500 flex-shrink-0" aria-hidden="true">
                          <ChevronRight size={18} className="rotate-90 sm:size-5" />
                        </div>
                      </summary>
                      <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 text-sm sm:text-base lg:text-lg text-primary/60 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 mt-10 lg:mt-0">
              <div className="sticky top-24 space-y-6 lg:space-y-8">
                <div className="bg-primary p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] text-white shadow-[0_40px_80px_-15px_rgba(10,37,64,0.4)] relative overflow-hidden group">
                  <h3 className="text-[10px] lg:text-[9px] font-bold mb-8 lg:mb-10 uppercase tracking-[0.3em] text-white/40">Quick Facts</h3>
                  
                  <div className="space-y-6 lg:space-y-8 lg:space-y-10">
                    <div className="flex items-start gap-4 lg:gap-5 group/item">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all duration-500 shadow-lg border border-white/5" aria-hidden="true">
                        <DollarSign size={20} className="lg:size-6" />
                      </div>
                      <div>
                        <p className="text-[10px] lg:text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Estimated Cost</p>
                        <p className="text-base lg:text-xl font-bold">{costs[0]}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 lg:gap-5 group/item">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all duration-500 shadow-lg border border-white/5" aria-hidden="true">
                        <Calendar size={20} className="lg:size-6" />
                      </div>
                      <div>
                        <p className="text-[10px] lg:text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Major Intakes</p>
                        <p className="text-base lg:text-xl font-bold">{intakes.join(", ")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 lg:gap-5 group/item">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all duration-500 shadow-lg border border-white/5" aria-hidden="true">
                        <Clock size={20} className="lg:size-6" />
                      </div>
                      <div>
                        <p className="text-[10px] lg:text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Processing Time</p>
                        <p className="text-base lg:text-xl font-bold">2 - 4 Months</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact" className="btn-primary !bg-white !text-primary hover:!bg-accent hover:!text-white w-full mt-8 lg:mt-12 py-4 lg:py-5 text-base lg:text-lg shadow-2xl rounded-xl lg:rounded-2xl transition-all group/btn">
                    Check Eligibility <ArrowRight size={20} className="ml-2 group-hover/btn:translate-x-2 transition-transform lg:size-[22px]" aria-hidden="true" />
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[10px] lg:text-[9px] font-bold text-primary/40 mb-6 lg:mb-8 uppercase tracking-[0.3em]">The Reason Advantage</h4>
                  <ul className="space-y-4 lg:space-y-5">
                    {[
                      "Certified Expert Counselors",
                      "Zero Consultation Fee",
                      "98.5% Visa Success Rate",
                      "Personalized SOP Guidance",
                      "Mock Interview Sessions",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 lg:gap-4 text-primary/70 font-bold text-xs lg:text-sm group cursor-default">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0" aria-hidden="true">
                          <CheckCircle2 size={11} className="lg:size-3" />
                        </div>
                        <span className="group-hover:text-primary transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default CountryPageTemplate;