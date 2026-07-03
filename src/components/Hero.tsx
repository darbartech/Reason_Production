import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 bg-gradient-to-b from-primary-50 via-white to-accent-50">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight">
                Study Abroad: Your Future
                <br />
                Beyond Borders
              </h1>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-primary-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Bridge the gap between your potential and global excellence with Nepal&apos;s most trusted education consultancy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/contact" 
                className="btn-primary w-full sm:w-auto text-base sm:text-lg group"
                aria-label="Start your study abroad journey"
              >
                Start Your Journey
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/ielts" 
                className="btn-secondary w-full sm:w-auto text-base sm:text-lg"
                aria-label="Explore IELTS and PTE courses"
              >
                Explore Courses
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-50 rounded-full">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-600">98% Visa Success</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-full">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-600">Approved Consultancy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-50 rounded-full">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-600">Free Counseling</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:mt-0 animate-fade-in order-first lg:order-last">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-primary-200 group">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1470"
                alt="Happy international students achieving their dreams with Reason Education Consultancy"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
