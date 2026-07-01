import { ShieldCheck, Zap, HeartHandshake, Award, Sparkles, BadgeCheck, TrendingUp, Handshake, Users } from "lucide-react";

const features = [
  {
    title: "Expert Mentorship",
    description: "Our counselors are certified experts with over 10 years of experience in global education and student visa processing.",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "High Success Rate",
    description: "With a 98% visa success rate, we ensure your application is processed with maximum precision and care.",
    icon: TrendingUp,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Transparent Process",
    description: "No hidden costs. We provide a clear roadmap for your education journey and financial planning.",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Student-First Approach",
    description: "Your dreams are our priority. We provide personalized support until you're fully settled abroad.",
    icon: HeartHandshake,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const TrustIndicators = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="trust-heading">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container-custom">
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold mb-4 border border-primary/10 uppercase tracking-widest">
            <Sparkles size={16} className="text-accent" aria-hidden="true" />
            <span>Why Choose Reason</span>
          </div>
          <h2 id="trust-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
            We&apos;re Not Just a Consultancy, <span className="text-accent">We&apos;re Your Partners</span>
          </h2>
          <p className="text-lg md:text-xl text-primary/60 font-medium leading-relaxed max-w-2xl mx-auto">
            Experience the difference of personalized guidance and expert support on your path to international education.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <article 
              key={index} 
              className="group p-6 sm:p-8 rounded-2xl lg:rounded-3xl border border-gray-100 card-hover bg-white hover:border-accent/10 transition-all duration-500"
            >
              <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}
                aria-hidden="true"
              >
                <feature.icon className={`${feature.color}`} size={26} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-accent transition-colors leading-tight">
                {feature.title}
              </h3>
              <p className="text-primary/60 text-sm sm:text-base leading-relaxed font-medium">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;