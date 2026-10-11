import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import { ArrowRight, Phone, Globe2, CalendarCheck, BookOpenCheck, BadgeCheck } from "lucide-react";
import HeroMedia from "@/components/HeroMedia";
import type { HeroVideoSource } from "@/components/HeroMedia";
import { company } from "@/lib/company";

const HERO_POSTER = "/images/hero/photos/home-hero.jpg";

const heroVideoSources: HeroVideoSource[] = [
  { src: "/Video/Hero Video.mp4", type: "video/mp4" },
];

const proof = [
  { Icon: Globe2, label: "7 study destinations" },
  { Icon: CalendarCheck, label: "Free first session" },
  { Icon: BookOpenCheck, label: "In-house IELTS & PTE" },
  { Icon: BadgeCheck, label: `Counselling since ${company.established}` },
];

export default function Hero() {
  const availableSources = heroVideoSources.filter(({ src }) =>
    existsSync(path.join(process.cwd(), "public", src.slice(1)))
  );

  return (
    <section
      className="relative border-b border-line bg-paper"
      aria-labelledby="hero-heading"
    >
      <div className="container-custom py-14 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="order-1 lg:col-span-6">
            <p className="eyebrow mb-6">
              Education consultancy · New Baneshwor, Kathmandu
            </p>

            <h1
              id="hero-heading"
              className="text-balance max-w-[15ch] leading-[1.05]"
            >
              Study abroad, <em>planned one step at a time.</em>
            </h1>

            <p className="lead mt-7 max-w-xl">
              Course and country selection, applications, IELTS/PTE preparation
              and visa documents — handled by one counselling team you can
              meet in person.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn-primary btn-lg group w-full sm:w-auto"
              >
                Book a free counselling session
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={`tel:${company.phoneTel}`}
                className="btn-secondary btn-lg w-full sm:w-auto"
              >
                <Phone size={16} aria-hidden="true" />
                Call {company.phoneDisplay}
              </a>
            </div>

            {company.registration.number && (
              <p className="mt-6 text-sm text-muted">
                Registered
                {company.registration.authority
                  ? ` with ${company.registration.authority}`
                  : ""}{" "}
                · Reg. No. {company.registration.number}
                {company.registration.pan
                  ? ` · PAN ${company.registration.pan}`
                  : ""}
              </p>
            )}

            <ul
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-7"
              aria-label="What we offer"
            >
              {proof.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon
                    size={17}
                    className="shrink-0 text-crimson"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-primary">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Media column — masked, decorative footage with a photograph fallback */}
          <div className="order-2 lg:col-span-6">
            <HeroMedia
              poster={HERO_POSTER}
              posterAlt="A student smiling in cap and gown on a university campus"
              caption={`Office · ${company.hours.label}`}
              overlayText="From shortlist to visa — one team, one plan."
              sources={availableSources}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
