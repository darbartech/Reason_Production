import Hero from "@/components/Hero";
import CredentialsStrip from "@/components/CredentialsStrip";
import ServicesOverview from "@/components/ServicesOverview";
import StudyDestinations from "@/components/StudyDestinations";
import Process from "@/components/Process";
import TrustIndicators from "@/components/TrustIndicators";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  absoluteTitle: true,
  title: "Study Abroad Consultancy in Kathmandu | Reasons Education",
  description: "Study abroad counselling, IELTS/PTE classes and visa documentation at Reasons Education. Visit us at Indreni Complex, New Baneshwor, Kathmandu.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <CredentialsStrip />
      <ServicesOverview />
      <StudyDestinations />
      <Process />
      <TrustIndicators />
      <Testimonials />
      <BlogPreview />
      <FAQ />
      <CTA />
    </>
  );
}
