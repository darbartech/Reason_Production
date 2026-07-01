import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import CountryCard from "./CountryCard";

const destinations = [
  {
    name: "USA",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop",
    href: "/countries/usa",
    description: "Largest number of universities, cutting-edge research, and diverse scholarship opportunities.",
    students: "400+ Students",
  },
  {
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1411&auto=format&fit=crop",
    href: "/countries/canada",
    description: "Post-study work permit, high-quality education, and permanent residency options for international students.",
    students: "1200+ Students",
  },
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/uk",
    description: "Centuries-old academic tradition, shorter degree durations, and rich cultural experiences.",
    students: "500+ Students",
  },
  {
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530&auto=format&fit=crop",
    href: "/countries/australia",
    description: "World-class universities, great lifestyle, and excellent student support services in top cities.",
    students: "800+ Students",
  },
  {
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1471&auto=format&fit=crop",
    href: "/countries/new-zealand",
    description: "Safe environment, world-class education system, and beautiful natural landscapes for Nepalese students.",
    students: "150+ Students",
  },
  {
    name: "Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/europe",
    description: "Tuition-free options, rich heritage, and access to the entire Schengen area for students.",
    students: "250+ Students",
  },
  {
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop",
    href: "/countries/japan",
    description: "High-tech innovation, unique culture, and affordable education with part-time job opportunities.",
    students: "300+ Students",
  },
];

const StudyDestinations = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="destinations-heading">
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" aria-hidden="true"></div>
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold mb-4 sm:mb-6 border border-accent/20 uppercase tracking-widest">
              <MapPin size={16} aria-hidden="true" />
              <span>Top Destinations</span>
            </div>
            <h2 id="destinations-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Explore Your <span className="text-accent">Dream Destination</span>
            </h2>
            <p className="text-lg md:text-xl text-primary/60 font-medium leading-relaxed">
              We help you find the perfect destination that aligns with your academic goals, budget, and future career plans.
            </p>
          </div>
          <Link href="/countries" className="btn-secondary whitespace-nowrap hidden lg:flex group shadow-xl">
            View All Countries 
            <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CountryCard {...destination} />
            </div>
          ))}
        </div>

        <div className="mt-8 lg:hidden">
          <Link href="/countries" className="btn-secondary w-full justify-center shadow-xl">
            View All Countries 
            <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;