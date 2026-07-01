import Image from "next/image";
import Link from "next/link";
import { Award, Users, Globe, Target, Heart, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About Us | Reason Education Consultancy Kathmandu",
  description: "Learn about the mission, vision, and team of Reason Education Consultancy, the most trusted study abroad partner in Kathmandu, Nepal. Our history and commitment to students.",
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  const values = [
    { title: "Student-First Approach", desc: "Our students' dreams and goals are at the heart of everything we do.", icon: Heart },
    { title: "Integrity & Transparency", desc: "We provide honest, reliable information and maintain full transparency throughout the process.", icon: ShieldCheck },
    { title: "Excellence in Counseling", desc: "Our certified counselors provide expert guidance to ensure your success.", icon: Award },
    { title: "Global Network", desc: "Partnering with top universities worldwide to provide you with the best options.", icon: Globe },
  ];

  const team = [
    { name: "Rudesh Khadgi", role: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop" },
    { name: "Roji Barnawa", role: "Head of Operations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" },
    { name: "Rajesh Poudel", role: "Senior Visa Officer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop" },
    { name: "Anita Shrestha", role: "Lead IELTS Trainer", image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=1374&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10">
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 max-w-4xl leading-[1.05] tracking-tight">
             Empowering Dreams, Shaping Futures
           </h1>
           <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
             Discover the story of Reason Education Consultancy and our commitment to helping Nepalese students achieve global success.
           </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group animate-fade-in">
                <div className="absolute -inset-2 bg-gray-100 rounded-3xl transition-transform duration-700"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                    alt="Reason Education Consultancy team working together to provide expert study abroad counseling in Kathmandu"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-8 animate-slide-up">
                 <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight tracking-tighter">Our Story: From Vision to Impact</h2>
                    <p className="text-base md:text-lg text-primary/70 leading-relaxed font-medium">
                      Founded with a vision to bridge the gap between Nepalese students and global education, Reason Education Consultancy has grown into one of the most trusted names in the industry. Over the past decade, we have helped thousands of students navigate the complexities of international admissions and visas.
                    </p>
                    <p className="text-base md:text-lg text-primary/70 leading-relaxed font-medium">
                      Our team of dedicated professionals believes that every student deserves access to world-class education. We take pride in our personalized approach, high success rates, and the long-lasting relationships we build with our students and their families.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div>
                       <h4 className="text-4xl font-black text-accent mb-1 tracking-tighter">10+</h4>
                       <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Years Experience</p>
                    </div>
                    <div>
                       <h4 className="text-4xl font-black text-accent mb-1 tracking-tighter">5000+</h4>
                       <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Students Placed</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tighter">Our Core Values</h2>
            <p className="text-lg text-primary/60 font-medium max-w-2xl mx-auto leading-relaxed">
              These values guide our decisions, our actions, and our commitment to our students every single day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {values.map((value, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 card-hover text-center">
                  <div className="bg-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-accent group-hover:scale-110 transition-transform">
                     <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-primary/70 text-sm font-medium leading-relaxed">{value.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tighter">Meet Our Leadership</h2>
            <p className="text-lg text-primary/60 font-medium max-w-2xl mx-auto leading-relaxed">
              The experts behind Reason Education who are dedicated to your success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {team.map((member, i) => (
               <div key={i} className="group">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-xl">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name} - ${member.role} at Reason Education`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-bold uppercase tracking-widest text-[10px]">{member.role}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default AboutPage;
