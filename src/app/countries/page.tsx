import Link from "next/link";
import CountryCard from "@/components/CountryCard";
import CTA from "@/components/CTA";
import { GraduationCap, MapPin, Globe } from "lucide-react";

export const metadata = {
  title: "Study Abroad Destinations | Explore Countries for Nepalese Students",
  description: "Find the best countries to study abroad from Nepal. Explore detailed guides for USA, Canada, UK, Australia, New Zealand, Europe, and Japan. Expert visa and admission support.",
  alternates: {
    canonical: "/countries",
  },
  openGraph: {
    title: "Study Abroad Destinations | Explore Countries for Nepalese Students",
    description: "Detailed guides for top study destinations including USA, Canada, UK, Australia, New Zealand, Europe, and Japan for students from Nepal.",
    images: ["https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

const destinations = [
  {
    name: "USA",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop",
    href: "/countries/usa",
    description: "Largest number of universities, cutting-edge research, and diverse scholarship opportunities.",
    students: "400+ Students Placed",
  },
  {
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1411&auto=format&fit=crop",
    href: "/countries/canada",
    description: "Post-study work permit, high-quality education, and permanent residency options.",
    students: "1200+ Students Placed",
  },
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/uk",
    description: "Centuries-old academic tradition, shorter degree durations, and rich cultural experience.",
    students: "500+ Students Placed",
  },
  {
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530&auto=format&fit=crop",
    href: "/countries/australia",
    description: "World-class universities, great lifestyle, and excellent student support services.",
    students: "800+ Students Placed",
  },
  {
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1471&auto=format&fit=crop",
    href: "/countries/new-zealand",
    description: "Safe environment, world-class education system, and beautiful natural landscapes.",
    students: "150+ Students Placed",
  },
  {
    name: "Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/europe",
    description: "Tuition-free options, rich heritage, and access to the entire Schengen area.",
    students: "250+ Students Placed",
  },
  {
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/japan",
    description: "High-tech innovation, unique culture, and affordable education with part-time job opportunities.",
    students: "300+ Students Placed",
  },
];

export default function CountriesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[55vh] flex items-center pt-24 pb-16 lg:pt-32 overflow-hidden bg-primary text-white">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] bg-secondary/10 rounded-full blur-[100px] opacity-20" />
          
          {/* Grid Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight animate-slide-up">
            Discover Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-600 relative inline-block">
              Destination
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Choose from top global education hubs. Each country offers unique opportunities, high-quality life, and world-class academic excellence.
          </p>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <CountryCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison or Why Choose Section */}
      <section className="py-16 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tighter">How to Choose Your <span className="text-accent">Destination?</span></h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto font-medium">
              Consider these key factors when deciding where to pursue your international education journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Course Availability",
                desc: "Check if your preferred field of study is highly ranked and widely available in the country. Some countries excel in STEM while others are better for Arts or Business.",
                icon: GraduationCap
              },
              {
                title: "Cost of Living & Tuition",
                desc: "Analyze your budget. While some countries offer free tuition (like parts of Europe), others might have higher tuition but better scholarship opportunities.",
                icon: MapPin
              },
              {
                title: "Post-Study Work Options",
                desc: "Research post-study work permits and potential pathways for permanent residency if you plan to gain work experience after graduation.",
                icon: Globe
              }
            ].map((factor, i) => (
              <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent/10 transition-all duration-500">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <factor.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-primary mb-4 group-hover:text-accent transition-colors">{factor.title}</h3>
                <p className="text-base text-primary/70 leading-relaxed font-medium">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
