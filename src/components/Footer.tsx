import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Latest Blogs", href: "/blog" },
    { name: "IELTS/PTE", href: "/ielts" },
    { name: "B2B Partnership", href: "/b2b" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const destinations = [
    { name: "USA", href: "/countries/usa" },
    { name: "Canada", href: "/countries/canada" },
    { name: "UK", href: "/countries/uk" },
    { name: "Australia", href: "/countries/australia" },
    { name: "New Zealand", href: "/countries/new-zealand" },
    { name: "Europe", href: "/countries/europe" },
    { name: "Japan", href: "/countries/japan" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/ReasonEducationNepal", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/reasoneducation", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/reason-education-consultancy", label: "Linkedin" },
  ];

  return (
    <footer className="bg-primary text-white/90 pt-16 md:pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-600/20 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center group inline-block">
              <div className="relative w-40 h-12 group-hover:scale-105 transition-transform">
                <Image 
                  src="/logo/NEW.png" 
                  alt="Reason Education Consultancy" 
                  fill 
                  className="object-contain brightness-0 invert" 
                />
              </div>
            </Link>
            
            <p className="text-white/70 leading-relaxed max-w-sm">
              Empowering Nepalese students with world-class education opportunities. Your journey to global success starts here.
            </p>
            
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center border border-white/10 hover:border-accent"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Study Destinations</h3>
            <ul className="space-y-3">
              {destinations.map((dest, index) => (
                <li key={index}>
                  <Link 
                    href={dest.href} 
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    Study in {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all flex-shrink-0 border border-white/10">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Visit Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors font-medium">New Baneswor, Kathmandu</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all flex-shrink-0 border border-white/10">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Call Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors font-medium">01-5316680, 9801085977</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all flex-shrink-0 border border-white/10">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Email Us</p>
                  <p className="text-white/80 group-hover:text-white transition-colors font-medium">info@reasons.edu.np</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50 text-center md:text-left">
            © {new Date().getFullYear()} Reason Education Consultancy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-white/50 hover:text-accent transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
