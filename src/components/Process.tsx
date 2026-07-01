import { Search, GraduationCap, FileText, Send, Plane, Home, MapPin } from "lucide-react";

const steps = [
  {
    title: "Counseling",
    description: "Our experts understand your profile and help you choose the right destination and course.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Test Preparation",
    description: "Get top-notch IELTS/PTE training from certified trainers to achieve your target score.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    title: "Documentation",
    description: "Professional help with university applications, SOP writing, and document verification.",
    icon: FileText,
    color: "bg-amber-500",
  },
  {
    title: "Visa Application",
    description: "Expert guidance for your visa interview and preparation of all necessary financial documents.",
    icon: Send,
    color: "bg-green-500",
  },
  {
    title: "Departure",
    description: "Pre-departure briefings to help you prepare for your new life and academic journey abroad.",
    icon: Plane,
    color: "bg-blue-600",
  },
  {
    title: "Settle In",
    description: "We provide post-landing support to ensure you're comfortable and ready to succeed.",
    icon: Home,
    color: "bg-rose-500",
  },
];

const Process = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="process-heading">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold mb-4 sm:mb-6 border border-primary/10 uppercase tracking-widest">
            <MapPin size={16} className="text-accent" aria-hidden="true" />
            <span>Our Methodology</span>
          </div>
          <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4 sm:mb-6 tracking-tight">
            Your Journey to <span className="text-accent">Global Success</span>
          </h2>
          <p className="text-lg md:text-xl text-primary/60 font-medium leading-relaxed max-w-2xl mx-auto px-4">
            A clear, step-by-step roadmap designed to take you from your first query to landing in your dream destination.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-full hidden lg:block opacity-20" aria-hidden="true"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl relative`}
                  aria-hidden="true"
                >
                  <step.icon size={28} className="text-white" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white border-2 border-gray-50 rounded-lg sm:rounded-xl flex items-center justify-center text-primary font-black shadow-lg text-xs sm:text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-primary/60 text-xs sm:text-sm leading-relaxed font-medium max-w-[160px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;