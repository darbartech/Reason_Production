import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { company, licenceLine, whatsappLink } from "@/lib/company";
import CountryFlag from "@/components/CountryFlag";

const countries = [
  { name: "UK", href: "/countries/uk", code: "gb" },
  { name: "USA", href: "/countries/usa", code: "us" },
  { name: "Canada", href: "/countries/canada", code: "ca" },
  { name: "Australia", href: "/countries/australia", code: "au" },
  { name: "New Zealand", href: "/countries/new-zealand", code: "nz" },
  { name: "Germany & Europe", href: "/countries/europe", code: "eu" },
  { name: "Japan", href: "/countries/japan", code: "jp" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "IELTS & PTE", href: "/ielts" },
  { name: "Fees", href: "/fees" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Enquiry form", href: "/enquiry" },
  { name: "For partners", href: "/b2b" },
];

const TikTokIcon = ({ size = 16 }: { size?: string | number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82a5.6 5.6 0 0 0 3.4 1.14V10a8.7 8.7 0 0 1-4.3-1.16v5.74a5.9 5.9 0 1 1-5.9-5.9c.2 0 .4 0 .6.03v3.29a2.68 2.68 0 1 0 1.9 2.58V2h3.2a5.6 5.6 0 0 0 1.1 3.82Z" />
  </svg>
);

type SocialKey = Exclude<keyof typeof company.social, "googleBusiness">;

const socialMap: Record<SocialKey, { label: string; icon: ComponentType<{ size?: string | number }> }> = {
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  youtube: { icon: Youtube, label: "YouTube" },
  tiktok: { icon: TikTokIcon, label: "TikTok" },
};

export default function Footer() {
  const socials = (Object.keys(socialMap) as SocialKey[])
    .filter((key) => company.social[key])
    .map((key) => ({ ...socialMap[key], href: company.social[key] }));

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.address.street}, ${company.address.city}, ${company.address.country}`
  )}`;

  const licence = licenceLine();

  return (
    <footer className="surface-dark pt-16 md:pt-20 pb-24 lg:pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex min-h-11 items-center">
              <Image
                src="/logo/logo-reversed.png"
                alt={company.displayName}
                width={657}
                height={240}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="leading-relaxed max-w-sm">
              Study abroad counselling and IELTS &amp; PTE classes in Kathmandu, since {company.established}.
            </p>

            {socials.length > 0 && (
              <div className="flex space-x-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center border border-white/10 text-white"
                    aria-label={`Follow us on ${s.label}`}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Countries */}
          <div className="lg:col-span-2">
            <h2 className="text-white mb-5 uppercase tracking-wider text-xs font-semibold">Countries</h2>
            <ul className="space-y-1">
              {countries.map((dest) => (
                <li key={dest.name}>
                  <Link href={dest.href} className="group flex min-h-11 items-center">
                    <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform text-crimson" />
                    <CountryFlag code={dest.code} className="mr-2.5 h-4 w-4" />
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="lg:col-span-3">
            <h2 className="text-white mb-5 uppercase tracking-wider text-xs font-semibold">Company</h2>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex min-h-11 items-center">
                    <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform text-crimson" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Visit us */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-white mb-2 uppercase tracking-wider text-xs font-semibold">Visit us</h2>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <p className="leading-relaxed text-white">
                {company.address.street}, {company.address.city} {company.address.postalCode}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-white">{company.hours.label}</p>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <a href={`tel:${company.phoneTel}`} className="inline-flex min-h-11 items-center text-white hover:underline">
                {company.phoneDisplay}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-white hover:underline"
              >
                WhatsApp us
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-crimson mt-0.5 shrink-0" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-white hover:underline">
                {company.email}
              </a>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm"
            >
              Get directions <ArrowRight size={14} />
            </a>
          </div>
        </div>

       

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-4">
          <p className="text-sm text-center md:text-left">
            {licence && <>{licence} · </>}
            &copy; {new Date().getFullYear()} {company.legalName}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="inline-flex min-h-11 items-center hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
