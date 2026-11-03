import Link from "next/link";
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
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
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
          </Link>
        </div>
      </div>
    </section>
  );
}
