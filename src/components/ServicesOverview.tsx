import { ArrowRight, Award, Globe, GraduationCap, FileText, ClipboardCheck, PhoneCall } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "B2B Collaboration",
    description: "Strategic partnerships with educational institutions and organizations to provide comprehensive study abroad solutions.",
    icon: Award,
    href: "/services",
    color: "primary",
  },
  {
    title: "Study Abroad",
    description: "Expert guidance for students seeking education in UK, USA, Canada, Australia, New Zealand, Japan, and Europe.",
    icon: Globe,
    href: "/services",
    color: "accent",
  },
  {
    title: "IELTS/PTE Preparation",
    description: "Result-oriented coaching for IELTS and PTE by our certified expert trainers with years of successful track record.",
    icon: GraduationCap,
    href: "/ielts",
    color: "primary",
  },
  {
    title: "Documentation Support",
    description: "Professional help with gathering, verifying, and translating necessary documents to ensure a smooth application process.",
    icon: FileText,
    href: "/services",
    color: "accent",
  },
  {
    title: "Visa Application",
    description: "Assistance with registering for relevant consulates and embassies for your study abroad journey and visa processes.",
    icon: ClipboardCheck,
    href: "/services",
    color: "primary",
  },
  {
    title: "Free Counseling",
    description: "Expert guidance on choosing the right course and destination based on your unique academic profile and career aspirations.",
    icon: PhoneCall,
    href: "/contact",
    color: "accent",
  },
];

const ServicesOverview = () => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: "bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/10",
      accent: "bg-accent/10 text-accent hover:bg-accent hover:text-white border-accent/10",
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none hidden lg:block opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-semibold mb-4 border border-primary/10">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Our Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              Comprehensive Services for Your
              <span className="text-accent"> Global Journey</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary/60 leading-relaxed">
              From your first inquiry to landing in your dream country, we provide end-to-end support to ensure your success.
            </p>
          </div>
          <Link 
            href="/services" 
            className="btn-secondary whitespace-nowrap hidden md:flex group shadow-lg"
          >
            Explore All Services
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            
            return (
              <article
                key={index}
                className="group bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 card-hover relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-bl-[80px] ${
                  service.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                }`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${
                    colorClasses
                  }`}>
                    <service.icon size={28} />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-primary/60 mb-6 sm:mb-7 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group/link"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <span className="ml-3 p-2 bg-gray-100 rounded-full group-hover/link:bg-accent group-hover/link:text-white transition-all duration-300">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/services" className="btn-secondary w-full justify-center shadow-lg">
            Explore All Services
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
