import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, BookOpenCheck, FileCheck2, Plane } from "lucide-react";
import SectionHeader from "./SectionHeader";

const tiles = [
  { title: "IELTS / PTE preparation", text: "Classes and mock tests in our own centre, taught by our trainers.", href: "/ielts", Icon: BookOpenCheck },
  { title: "Applications & documents", text: "We prepare, check, translate where needed, and submit — you see every email.", href: "/services", Icon: FileCheck2 },
  { title: "Visa application", text: "Forms, financial evidence and interview preparation, step by step.", href: "/services", Icon: GraduationCap },
  { title: "Pre-departure briefing", text: "Accommodation, travel and first-month guidance before you fly.", href: "/services", Icon: Plane },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
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
