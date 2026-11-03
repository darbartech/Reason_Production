"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronRight, ChevronDown, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";
import { countries } from "@/content/countries";
import CountryFlag from "@/components/CountryFlag";

const simpleLinks = [
  { name: "Services", href: "/services" },
  { name: "IELTS & PTE", href: "/ielts" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

type MenuId = "study";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const hasBeenOpenedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const closeOutside = (e: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [openMenu]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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
        if (focusable.length > 0) focusable[0].focus();
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
    setOpenMenu(null);
  }, [pathname]);

<<<<<<< HEAD
  const isActive = (path: string) => pathname === path;
  const studyActive =
    pathname.startsWith("/study-abroad") || pathname.startsWith("/countries") || pathname.startsWith("/eligibility");
=======
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

  return (
    <>
      <div className="surface-dark hidden lg:block text-[0.8125rem]">
        <div className="container-custom flex h-9 items-center justify-between">
          <p className="text-primary-300">
            {company.address.street}, {company.address.city} · {company.hours.label}
          </p>
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phoneTel}`} className="text-white hover:underline">
              {company.phoneDisplay}
            </a>
            <a href={`mailto:${company.email}`} className="hidden xl:inline text-white hover:underline">
              {company.email}
            </a>
            <Link href="/b2b" className="text-primary-300 hover:text-white">
              For partners
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50">
        <nav
          aria-label="Main"
          className={`transition-all duration-300 bg-white ${
            scrolled
              ? "h-[68px] shadow-sm border-b border-brand-border"
              : "h-20 border-b border-brand-border/60"
          }`}
        >
          <div className="container-custom h-full">
            <div className="flex items-center justify-between h-full">
              <Link href="/" className="flex items-center shrink-0" aria-label={`${company.displayName} home`}>
                <Image
                  src="/logo/logo.png"
                  alt={company.displayName}
                  width={657}
                  height={240}
                  className={`transition-all duration-300 w-auto object-contain ${scrolled ? "h-12" : "h-14"}`}
                  priority
                />
              </Link>

              <div ref={desktopNavRef} className="hidden lg:flex items-center gap-1">
                <div
                  className="relative"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === "study"}
                    aria-controls="nav-study"
                    onClick={() => setOpenMenu(openMenu === "study" ? null : "study")}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible")) setOpenMenu("study");
                    }}
                    className={`relative inline-flex min-h-11 items-center gap-1 px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
                      studyActive || openMenu === "study"
                        ? "text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-crimson"
                        : "text-primary/80 hover:text-primary"
                    }`}
                  >
                    Study abroad
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${openMenu === "study" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id="nav-study"
                    hidden={openMenu !== "study"}
                    className="absolute left-0 top-full w-[38rem] rounded-lg border border-line bg-white p-4 shadow-lift"
                  >
                    <div className="flex gap-4">
                      <div className="w-44 shrink-0 border-r border-line pr-4">
                        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                          Start here
                        </p>
                        <Link
                          href="/study-abroad"
                          className="block rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-primary-50"
                        >
                          Overview
                        </Link>
                        <Link
                          href="/eligibility"
                          className="block rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-primary-50"
                        >
                          Check eligibility
                        </Link>
                        <Link
                          href="/fees"
                          className="block rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-primary-50"
                        >
                          Fees
                        </Link>
                      </div>
                      <div className="flex-1">
                        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                          Countries
                        </p>
                        <ul className="grid grid-cols-2 gap-1">
                          {countries.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/countries/${c.slug}`}
                                className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-primary hover:bg-primary-50"
                              >
                                <CountryFlag code={c.flagCode} className="h-5 w-5" />
                                {c.name === "Europe" ? "Europe (hub)" : c.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/countries"
                          className="mt-1 inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold text-accent hover:underline"
                        >
                          All country guides
                          <ChevronRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {simpleLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
<<<<<<< HEAD
                    className={`relative inline-flex min-h-11 items-center px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
=======
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                      isActive(link.href)
                        ? "text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-crimson"
                        : "text-primary/80 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="ml-4">
<<<<<<< HEAD
                  <Link href="/contact" className="btn-primary h-11 px-5 text-sm">
                    Book a free session
=======
                  <Link
                    href="/contact"
                    aria-current={isActive("/contact") ? "page" : undefined}
                    className={`btn-primary h-10 px-5 text-sm ${
                      isActive("/contact") ? "brightness-95" : ""
                    }`}
                  >
                    Free counselling
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <a
                  href={`tel:${company.phoneTel}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-primary transition-colors hover:bg-primary-50"
                  aria-label="Call us"
                >
                  <Phone size={18} />
                </a>
                <button
                  ref={menuButtonRef}
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-primary-50 text-primary transition-colors hover:bg-primary-100"
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
        className={`fixed inset-0 bg-primary/50 transition-opacity duration-300 lg:hidden z-[9998] ${
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
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-md z-[9999] transform transition-[transform,visibility] duration-200 lg:hidden ${
          isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-brand-border">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo/logo.png"
                alt={company.displayName}
                width={657}
                height={240}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary hover:bg-primary-100"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            <details className="group rounded-xl border border-line">
              <summary className="flex min-h-[56px] cursor-pointer items-center justify-between px-5 py-4 text-lg font-semibold text-primary">
                Study abroad
                <ChevronDown size={18} className="text-primary-300 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="space-y-1 px-3 pb-3">
                <li>
                  <Link
                    href="/study-abroad"
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2 font-medium text-primary/80 hover:bg-primary-50 hover:text-primary"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/eligibility"
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2 font-medium text-primary/80 hover:bg-primary-50 hover:text-primary"
                  >
                    Check eligibility
                  </Link>
                </li>
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/countries/${c.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-primary/80 hover:bg-primary-50 hover:text-primary"
                    >
                      <CountryFlag code={c.flagCode} className="h-5 w-5" />
                      {c.name === "Europe" ? "Europe (hub)" : c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/countries"
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold text-accent hover:bg-primary-50"
                  >
                    All country guides
                  </Link>
                </li>
              </ul>
            </details>

            {simpleLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
<<<<<<< HEAD
                className={`flex min-h-[56px] items-center justify-between rounded-xl px-5 py-4 transition-colors ${
                  isActive(link.href) ? "bg-accent/10 text-accent" : "text-primary hover:bg-primary-50"
                }`}
              >
                <span className="text-lg font-semibold">{link.name}</span>
                <ChevronRight size={18} className="text-primary-300" />
=======
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "bg-crimson/5 text-crimson"
                    : "text-primary hover:bg-primary-50"
                }`}
              >
                <span className="text-lg font-semibold">{link.name}</span>
                <ChevronRight size={18} className={isActive(link.href) ? "text-crimson" : "text-primary-300"} />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
              </Link>
            ))}

            <Link
              href="/fees"
              onClick={() => setIsOpen(false)}
              className={`flex min-h-[56px] items-center justify-between rounded-xl px-5 py-4 transition-colors ${
                isActive("/fees") ? "bg-accent/10 text-accent" : "text-primary hover:bg-primary-50"
              }`}
            >
              <span className="text-lg font-semibold">Fees</span>
              <ChevronRight size={18} className="text-primary-300" />
            </Link>

            <Link
              href="/b2b"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[56px] items-center justify-between rounded-xl px-5 py-4 text-primary transition-colors hover:bg-primary-50"
            >
              <span className="text-lg font-semibold">For partners</span>
              <ChevronRight size={18} className="text-primary-300" />
            </Link>
          </div>

          <div className="p-6 border-t border-brand-border space-y-4">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full">
              Book a free session
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${company.phoneTel}`} className="btn-secondary" aria-label="Call us">
                <Phone size={18} />
                <span>Call</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< HEAD
                className="btn-secondary"
                aria-label="Chat on WhatsApp"
=======
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary-50 text-primary font-semibold hover:bg-[#1A7F37]/10 hover:text-[#1A7F37] transition-colors border border-brand-border"
                aria-label="WhatsApp"
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
