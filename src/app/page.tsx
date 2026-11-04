import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesOverview from "@/components/ServicesOverview";
import StudyDestinations from "@/components/StudyDestinations";
import Process from "@/components/Process";
import TrustIndicators from "@/components/TrustIndicators";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  absoluteTitle: true,
  title: "Study Abroad Consultancy in Kathmandu | Reasons Education",
  description:
    "Free study abroad counselling in New Baneshwor, Kathmandu. Honest advice on courses, costs and visas for 7 countries, plus IELTS & PTE classes.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <StudyDestinations />
      <Process />
      <TrustIndicators />
      <FAQ />
      <CTA />
    </>
  );
}
