import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { company } from "@/lib/company";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Latest Blog", href: "/blog" },
  { name: "IELTS / PTE", href: "/ielts" },
  { name: "For institutions", href: "/b2b" },
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

const socialMap = {
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
} as const;

export default function Footer() {
  const socials = (Object.entries(company.social) as [keyof typeof socialMap, string][])
    .filter(([key, url]) => socialMap[key] && url)
    .map(([key, url]) => ({ ...socialMap[key], href: url }));

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.address.street}, ${company.address.city}, ${company.address.country}`
  )}`;

  return (
    <footer className="surface-dark pt-16 md:pt-20 pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 — Brand + registration */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo.png"
                alt={company.displayName}
                width={480}
                height={208}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="leading-relaxed max-w-sm">
              {company.tagline}.
              One team in New Baneshwor, Kathmandu — from IELTS to visa.
            </p>

            {(company.registration.number || company.registration.pan) && (
              <p className="text-sm">
                {company.registration.number && (
                  <>
                    Registered{company.registration.authority ? ` with ${company.registration.authority}` : ""}
                    {" "}· Reg. No. {company.registration.number}
                  </>
                )}
                {company.registration.number && company.registration.pan && " · "}
                {company.registration.pan && <>PAN {company.registration.pan}</>}
              </p>
            )}

            {socials.length > 0 && (
              <div className="flex space-x-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center border border-white/10 text-white"
                    aria-label={`Follow us on ${s.label}`}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Destinations */}
          <div className="lg:col-span-2">
            <h4 className="text-white mb-5 uppercase tracking-wider text-xs font-semibold">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <Link
                  href={dest.href}
                  className="flex items-center group"
                >
                  <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform text-crimson" />
                  Study in {dest.name}
                </Link>
              </li>
            ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white mb-5 uppercase tracking-wider text-xs font-semibold">Services</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform text-crimson" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Visit & contact */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-white mb-2 uppercase tracking-wider text-xs font-semibold">Visit & contact</h4>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm mb-0.5">Address</p>
                <p className="text-white">{company.address.street}, {company.address.city} {company.address.postalCode}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm mb-0.5">Opening hours</p>
                <p className="text-white">{company.hours.label}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm mb-0.5">Phone</p>
                <a href={`tel:${company.phoneTel}`} className="text-white hover:underline">{company.phoneDisplay}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm mb-0.5">Email</p>
                <a href={`mailto:${company.email}`} className="text-white hover:underline">{company.email}</a>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm pt-1"
            >
              Get directions <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
