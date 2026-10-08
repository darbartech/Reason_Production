import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, MessageSquare } from "lucide-react";

// The static export also injects <meta name="robots" content="noindex"> into out/404.html,
// but the root layout would otherwise contribute its "index, follow" tag here — the explicit
// override keeps both tags restrictive instead of contradictory.
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for is not available. Browse study destinations, services, IELTS and PTE classes, or contact our New Baneshwor office.",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/study-abroad", label: "Study Abroad", blurb: "The process, costs in NPR, English tests and visa documentation." },
  { href: "/countries", label: "Destinations", blurb: "Canada, Australia, UK, USA, New Zealand, Europe and Japan." },
  { href: "/ielts", label: "IELTS & PTE", blurb: "Weekday and weekend preparation classes in New Baneshwor." },
  { href: "/services", label: "Our Services", blurb: "Applications, SOP/LOR writing, visa filing and pre-departure briefings." },
  { href: "/blog", label: "Blog", blurb: "Guides and visa tips written by our counsellors." },
  { href: "/faq", label: "FAQs", blurb: "Answers on costs, processing times and how counselling works." },
];

const NotFoundPage = () => {
  return (
    <div className="bg-white">
      <section className="surface-dark section-padding">
        <div className="container-custom">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Error 404</p>
              <h1 className="mt-6">Page Not Found</h1>
              <p className="lead mt-6">
                The page you are looking for has been moved, renamed or never existed. The links below
                reach the same information by a different route.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/" className="btn-primary group">
                  <Home size={18} aria-hidden="true" />
                  Back to Home
                </Link>
                <Link href="/contact" className="btn-on-dark group">
                  <MessageSquare size={18} aria-hidden="true" />
                  Contact Us
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <p aria-hidden="true" className="hidden shrink-0 select-none font-heading text-[9rem] leading-none text-white/10 lg:block">
              404
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-custom">
          <h2 className="mb-10">Where to go next</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="card card-hover group flex h-full flex-col gap-2 p-6 hover:border-primary/30"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-heading text-lg font-semibold text-primary">{link.label}</span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="text-sm text-muted">{link.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
