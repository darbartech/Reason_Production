import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

interface CountryCardProps {
  name: string;
  image: string;
  href: string;
  description: string;
  students: string;
}

const CountryCard = ({ name, image, href, description, students }: CountryCardProps) => {
  return (
    <Link
      href={href}
      className="group relative h-[400px] overflow-hidden rounded-[2rem] shadow-xl block bg-primary"
      aria-label={`Study in ${name}`}
    >
      <Image
        src={image}
        alt={`Study in ${name}`}
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent group-hover:from-primary/90 transition-all duration-500"></div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white w-fit mb-4">
            <GraduationCap size={12} className="text-accent" />
            {students}
          </div>
          
          <h3 className="text-2xl font-black text-white mb-3 flex items-center justify-between">
            {name}
            <span className="p-1.5 bg-accent rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg shadow-accent/50">
              <ArrowUpRight size={16} className="text-white" />
            </span>
          </h3>
          
          <p className="text-white/70 text-xs leading-relaxed font-medium line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-[2rem] transition-colors duration-500"></div>
    </Link>
  );
};

export default CountryCard;
