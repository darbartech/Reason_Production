"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronRight, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

const navLinks = [
  { name: "Study Abroad", href: "/study-abroad" },
  { name: "Countries", href: "/countries" },
  { name: "IELTS / PTE", href: "/ielts" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const hasBeenOpenedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      hasBeenOpenedRef.current = true;
      document.body.classList.add("overflow-hidden");
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        if (!drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });
    } else {
      document.body.classList.remove("overflow-hidden");
      if (hasBeenOpenedRef.current && menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", handleKeydown);
    return () => drawer.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="surface-dark hidden lg:block text-[0.8125rem]">
        <div className="container-custom flex h-9 items-center justify-between">
          <p className="text-primary-300">
            {company.address.street}, {company.address.city} · {company.hours.label}
          </p>
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phoneTel}`} className="text-white hover:underline">{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`} className="hidden xl:inline text-white hover:underline">{company.email}</a>
            <Link href="/b2b" className="text-primary-300 hover:text-white">For institutions</Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50">
        <nav
          className={`transition-all duration-300 bg-white ${
            scrolled
              ? "h-[68px] shadow-sm border-b border-brand-border"
              : "h-20 border-b border-brand-border/60"
          }`}
        >
          <div className="container-custom h-full">
            <div className="flex items-center justify-between h-full">
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt={company.displayName}
                  width={480}
                  height={208}
                  className={`transition-all duration-300 w-auto object-contain ${
                    scrolled ? "h-12" : "h-14"
                  }`}
                  priority
                />
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary after:absolute after:inset-x-3 after:-bottom-2 after:h-0.5 after:bg-crimson"
                        : "text-primary/80 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="ml-4">
                  <Link href="/contact" className="btn-primary h-10 px-5 text-sm">
                    Free counselling
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <a
                  href={`tel:${company.phoneTel}`}
                  className="p-2.5 transition-colors rounded-lg border border-line text-primary hover:bg-primary-50"
                  aria-label="Call Us"
                >
                  <Phone size={18} />
                </a>
                <button
                  ref={menuButtonRef}
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 transition-colors rounded-lg text-primary bg-primary-50 hover:bg-primary-100 border border-line"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-[9998] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!isOpen}
        inert={isOpen ? undefined : true}
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-md z-[9999] transform transition-transform duration-200 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-brand-border">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo/logo.png"
                alt={company.displayName}
                width={480}
                height={208}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 text-primary bg-primary-50 rounded-lg hover:bg-primary-100"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-primary hover:bg-primary-50"
                }`}
              >
                <span className="text-lg font-semibold">{link.name}</span>
                <ChevronRight size={18} className={isActive(link.href) ? "text-accent" : "text-primary-300"} />
              </Link>
            ))}
            <Link
              href="/b2b"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-5 py-4 rounded-xl transition-colors text-primary hover:bg-primary-50"
            >
              <span className="text-lg font-semibold">For institutions (B2B)</span>
              <ChevronRight size={18} className="text-primary-300" />
            </Link>
          </div>

          <div className="p-6 border-t border-brand-border space-y-4">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full py-4 text-base"
            >
              Book free counselling
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${company.phoneTel}`}
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary-50 text-primary font-semibold hover:bg-primary-100 transition-colors border border-brand-border"
                aria-label="Call Us"
              >
                <Phone size={18} />
                <span>Call</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary-50 text-primary font-semibold hover:bg-green-50 hover:text-green-700 transition-colors border border-brand-border"
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
