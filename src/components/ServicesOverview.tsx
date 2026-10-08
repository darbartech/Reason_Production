import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  PlaneTakeoff,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";

type ServiceCard = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
  variant?: "tint" | "sand" | "default";
  span?: "wide" | "tall";
};

const services: ServiceCard[] = [
  {
    title: "Study abroad counselling",
    text: "Course, university and country matched to your results, budget and goals — with a ranked shortlist you can take away.",
    href: "/study-abroad",
    icon: GraduationCap,
    variant: "tint",
    span: "wide",
  },
  {
    title: "IELTS / PTE preparation",
    text: "Classes, mock tests and one-to-one feedback — all run in our centre by our own trainers.",
    href: "/ielts",
    icon: BookOpen,
    variant: "sand",
    span: "tall",
  },
  {
    title: "Documentation support",
    text: "We check, organise and, where needed, arrange certified translations of every document in your file.",
    href: "/services",
    icon: FileCheck2,
  },
  {
    title: "Visa application",
    text: "Step-by-step help with forms, financial evidence and — where the country requires it — interview preparation.",
    href: "/services",
    icon: ClipboardList,
  },
  {
    title: "Application & admission",
    text: "We prepare, submit and follow up on every application. You see every email and every offer as it arrives.",
    href: "/services",
    icon: ClipboardList,
    span: "wide",
  },
  {
    title: "Pre-departure briefing",
    text: "Accommodation, flights, airport pickup and what to expect in your first month abroad — covered before you fly.",
    href: "/services",
    icon: PlaneTakeoff,
  },
];

const variantClasses = (variant: ServiceCard["variant"]) => {
  switch (variant) {
    case "tint":
      return "bg-tint border-line";
    case "sand":
      return "bg-sand border-line";
    default:
      return "bg-white border-line";
  }
};

const spanClasses = (span: ServiceCard["span"]) => {
  switch (span) {
    case "wide":
      return "lg:col-span-2";
    case "tall":
      return "lg:row-span-2";
    default:
      return "";
  }
};

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-12 gap-6">
          <SectionHeader
            eyebrow="Services"
            title={<>Everything from course choice to <em>visa filing.</em></>}
            intro="One team, one file, no hand-offs between agents."
          />
          <Link href="/services" className="btn-secondary whitespace-nowrap hidden lg:flex group">
            All services
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:grid-rows-[auto_auto_auto]">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className={`group card card-hover p-6 sm:p-7 flex flex-col justify-between border ${variantClasses(
                  s.variant
                )} ${spanClasses(s.span)}`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-line flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={22} className="text-crimson" aria-hidden={true} />
                  </div>
                  <h3 className="group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted leading-relaxed">{s.text}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Learn more
                  <ArrowRight
                    size={16}
                    className="text-primary-300 transition-all group-hover:translate-x-1 group-hover:text-crimson"
                    aria-hidden={true}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 lg:hidden">
          <Link href="/services" className="btn-secondary w-full justify-center group">
            All services
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
