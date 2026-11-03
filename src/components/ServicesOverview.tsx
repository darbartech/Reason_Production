import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { ArrowRight, BookOpen, ClipboardList, FileCheck2, GraduationCap } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";

type ServiceCard = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

const services: ServiceCard[] = [
  {
    title: "Study abroad counselling",
    text: "Match course, country and budget to your results. You leave with a ranked shortlist.",
    href: "/services",
    icon: GraduationCap,
  },
  {
    title: "Applications & documents",
    text: "We check every document, then submit and follow up with the institution.",
    href: "/services",
    icon: FileCheck2,
  },
  {
    title: "Visa support",
    text: "Forms, proof of funds and interview practice — with an honest view of your chances.",
    href: "/services",
    icon: ClipboardList,
  },
  {
    title: "IELTS & PTE classes",
    text: "Taught here, with a mock test every Sunday and feedback on each module.",
    href: "/ielts",
    icon: BookOpen,
  },
=======
import { ArrowUpRight, GraduationCap, BookOpenCheck, FileCheck2, Plane } from "lucide-react";
import SectionHeader from "./SectionHeader";

const tiles = [
  { title: "IELTS / PTE preparation", text: "Classes and mock tests in our own centre, taught by our trainers.", href: "/ielts", Icon: BookOpenCheck },
  { title: "Applications & documents", text: "We prepare, check, translate where needed, and submit — you see every email.", href: "/services", Icon: FileCheck2 },
  { title: "Visa application", text: "Forms, financial evidence and interview preparation, step by step.", href: "/services", Icon: GraduationCap },
  { title: "Pre-departure briefing", text: "Accommodation, travel and first-month guidance before you fly.", href: "/services", Icon: Plane },
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
<<<<<<< HEAD
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Services"
            title="Four services. One office."
            intro="Counselling, applications, visas and test preparation are handled by the same team."
          />
          <Link href="/services" className="btn-secondary group hidden whitespace-nowrap lg:flex">
            All services
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} href={s.href} className="group card card-hover flex flex-col p-6 sm:p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white shadow-sm">
                  <Icon size={22} className="text-crimson" aria-hidden={true} />
                </div>
                <h3 className="transition-colors group-hover:text-accent">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  See details
                  <ArrowRight
                    size={16}
                    className="text-primary-300 transition-all group-hover:translate-x-1 group-hover:text-crimson"
                    aria-hidden={true}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 lg:hidden">
          <Link href="/services" className="btn-secondary group w-full justify-center">
            All services
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
=======
        <SectionHeader eyebrow="Services" title={<>Everything from course choice <em>to visa filing</em></>}
          intro="One team, one file, no hand-offs between agents." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Link href="/study-abroad" className="group relative overflow-hidden rounded-2xl bg-primary-900 p-8 text-white lg:row-span-2 lg:p-10">
            <Image src="/images/visuals/services-counselling.webp" alt="" fill sizes="(min-width:1024px) 33vw, 100vw"
                   className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-primary-950/10" aria-hidden />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end">
              <h3 className="text-white !text-2xl">Study abroad counselling</h3>
              <p className="mt-3 max-w-sm text-on-dark">Course, university and country matched to your results, budget and goals.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">Start with a free session <ArrowUpRight size={18} /></span>
            </div>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
          </Link>
          {tiles.map(({ title, text, href, Icon }) => (
            <Link key={title} href={href} className="card card-hover group flex flex-col p-7">
              <Icon size={28} strokeWidth={1.5} className="text-crimson" aria-hidden />
              <h3 className="mt-6">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
              <ArrowUpRight size={18} className="mt-auto pt-6 text-primary-300 transition group-hover:text-crimson" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
