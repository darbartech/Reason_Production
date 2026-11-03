import Link from "next/link";
<<<<<<< HEAD
import { ArrowRight } from "lucide-react";
import { company, licenceLine } from "@/lib/company";
import CallbackCard from "./CallbackCard";
import Photo from "./Photo";

const trustParts = [
  `Advising Nepali students since ${company.established}`,
  licenceLine(),
  company.hours.label,
].filter(Boolean) as string[];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10">
        <Photo name="hero-counselling" alt="" sizes="100vw" fill priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/80 to-primary-950/45" />
      </div>

      <div className="container-custom py-12 md:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="surface-dark bg-transparent lg:col-span-7 lg:pt-4">
            <p className="eyebrow mb-6">Education consultancy · New Baneshwor, Kathmandu</p>

            <h1 id="hero-heading" className="text-balance max-w-[18ch] sm:max-w-[20ch]">
              Study abroad counselling in Kathmandu
            </h1>

            <p className="lead mt-6 max-w-xl">
              Honest advice on courses, costs and visas — with IELTS &amp; PTE classes in the same office.
            </p>

            <p lang="ne" className="mt-4 max-w-xl text-base text-white/80">
              विदेशमा पढ्ने योजना, एक–एक चरणमा। पहिलो सत्र निःशुल्क।
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary group w-full sm:w-auto">
                Book a free session
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/eligibility"
                className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Check your eligibility
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/70">{trustParts.join(" · ")}</p>
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <CallbackCard compact />
=======
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
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </div>
        </div>
      </div>
    </section>
  );
}
