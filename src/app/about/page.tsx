import Link from "next/link";
import { Award, Users, Globe, Target, Heart, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: "About Reasons Education — our counselling team, how we work and our small office in New Baneshwor, Kathmandu, supporting Nepali students since 2015.",
  path: "/about",
});

const AboutPage = () => {
  const values = [
    { title: "Student-First Approach", desc: "Our students' dreams and goals are at the heart of everything we do.", icon: Heart },
    { title: "Integrity & Transparency", desc: "We provide honest, reliable information and maintain full transparency throughout the process.", icon: ShieldCheck },
    { title: "Excellence in Counselling", desc: "Our certified counsellors provide expert guidance to ensure your success.", icon: Award },
    { title: "Global Network", desc: "Partnering with top universities worldwide to provide you with the best options.", icon: Globe },
  ];

  const team = [
    { name: "Rudesh Khadgi", role: "Chief Executive Officer" },
    { name: "Roji Barnawa", role: "Head of Operations" },
    { name: "Rajesh Poudel", role: "Senior Visa Officer" },
    { name: "Anita Shrestha", role: "Lead IELTS Trainer" },
  ];

  const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "About Us" }]}
        title="About Reasons Education"
        intro={`We are a counselling and test-prep team in ${company.address.city}, ${company.address.country}, helping students plan international education — one honest meeting at a time.`}
      />

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow={`Since ${company.established}`}
              title="A small team with one process we trust."
              intro={`Counselling, documentation and test prep in ${company.address.street}. Come in for a meeting — you'll meet the same people throughout the process.`}
            />
          </div>
          <div className="lg:col-span-8 space-y-5 text-ink leading-relaxed">
            <p>
              We work with a limited number of students each intake so every file gets attention. That means no
              promises we can’t stand behind, no last-minute surprises on the documentation, and no hand-offs
              between “sales” and “processing”.
            </p>
            <p>
              If a plan doesn’t fit your profile, your budget or your timeline, we’ll tell you — and suggest
              alternatives that do. We’d rather you study somewhere realistic than chase a rejection.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-paper">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our values"
            title="What you can expect from us, in writing."
            intro="Four ground rules we try to live up to in every meeting, email and phone call."
            align="center"
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {values.map((value, i) => (
               <div key={i} className="card p-6">
                  <div className="w-11 h-11 rounded-lg bg-primary text-white flex items-center justify-center mb-5">
                     <value.icon size={18} />
                  </div>
                  <h3>{value.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{value.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Team"
              title="The people you'll meet at our office."
              intro="Roster and bios are a work in progress. Drop in at New Baneshwor and you'll meet us in person."
            />
          </div>
          <ul className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
             {team.map((member) => (
               <li key={member.name} className="card p-5 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-white font-heading flex items-center justify-center shrink-0 text-base">
                    {initials(member.name)}
                  </div>
                  <div>
                    <h3 className="text-primary text-base">{member.name}</h3>
                    <p className="text-xs text-muted mt-0.5 uppercase tracking-wider">{member.role}</p>
                  </div>
               </li>
             ))}
          </ul>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default AboutPage;
