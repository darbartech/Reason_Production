"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronRight, MessageCircle } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Study Abroad", href: "/study-abroad" },
  { name: "Countries", href: "/countries" },
  { name: "IELTS/PTE", href: "/ielts" },
  { name: "Services", href: "/services" },
  { name: "B2B", href: "/b2b" },
  { name: "Blog", href: "/blog" },
];

// 定义深色背景页面
const darkBackgroundPages = [
  "/",
  "/study-abroad", 
  "/countries",
  "/ielts",
  "/blog",
  "/services",
  "/b2b",
  "/contact"
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // 判断当前页面是否是深色背景
  const isDarkPage = darkBackgroundPages.some(page => pathname === page || pathname.startsWith('/countries/'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // 关闭菜单时重置滚动
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100" 
            : isDarkPage 
            ? "bg-primary/80 backdrop-blur-md py-4 lg:py-5 border-b border-white/10"
            : "bg-white/90 backdrop-blur-sm py-4 lg:py-5 border-b border-gray-100"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group shrink-0">
              <div className={`relative w-40 h-12 sm:w-44 sm:h-14 group-hover:scale-105 transition-transform ${
                (isDarkPage && !scrolled) ? "" : ""
              }`}>
                <Image 
                  src="/logo/NEW.png" 
                  alt="Reason Education Consultancy" 
                  fill 
                  className={`object-contain transition-all duration-300 ${
                    (isDarkPage && !scrolled) ? "brightness-0 invert" : ""
                  }`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive(link.href)
                      ? scrolled || !isDarkPage
                      ? "text-accent bg-accent/10" 
                      : "text-accent bg-white/10"
                      : scrolled || !isDarkPage
                      ? "text-primary hover:text-accent hover:bg-primary/10"
                      : "text-white hover:text-accent hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="ml-4">
                <Link
                  href="/contact"
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Free Counseling
                </Link>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a 
                href="tel:015316680" 
                className={`p-3 transition-all rounded-xl shadow-lg active:scale-95 ${
                  scrolled || !isDarkPage 
                  ? "text-white bg-accent hover:bg-accent/90" 
                  : "text-white bg-accent hover:bg-accent/90"
                }`}
                aria-label="Call Us"
              >
                <Phone size={18} />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 transition-all rounded-xl active:scale-95 ${
                  scrolled || !isDarkPage 
                  ? "text-primary bg-gray-100 hover:bg-gray-200" 
                  : "text-white bg-white/10 hover:bg-white/20"
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-[9998] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-[9999] transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <div className="relative w-36 h-12">
                <Image 
                  src="/logo/NEW.png" 
                  alt="Reason Education Consultancy" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-3 text-primary bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-primary hover:bg-gray-50"
                }`}
              >
                <span className="text-lg font-semibold">{link.name}</span>
                <ChevronRight size={18} className={isActive(link.href) ? "text-accent" : "text-gray-400"} />
              </Link>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 space-y-4">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full py-4 text-base"
            >
              Free Counseling
            </Link>
            
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="tel:015316680" 
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-50 text-primary font-semibold hover:bg-gray-100 transition-all border border-gray-100"
                aria-label="Call Us"
              >
                <Phone size={18} />
                <span>Call</span>
              </a>
              <a 
                href="https://wa.me/9779801085977?text=Hello%20Reason%20Education" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-50 text-primary font-semibold hover:bg-green-50 hover:text-green-700 transition-all border border-gray-100"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
                <span>Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
