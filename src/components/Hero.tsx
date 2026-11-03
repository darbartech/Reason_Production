import Link from "next/link";
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
          </div>
        </div>
      </div>
    </section>
  );
}
