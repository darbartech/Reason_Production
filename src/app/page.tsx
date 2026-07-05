import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/TrustIndicators";
import ServicesOverview from "@/components/ServicesOverview";
import Process from "@/components/Process";
import StudyDestinations from "@/components/StudyDestinations";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Study Abroad Experts in Nepal",
  description: "Leading study abroad consultancy in Kathmandu. Expert counseling for USA, Canada, UK, Australia, New Zealand, Europe, Japan. 98% visa success rate.",
  keywords: [
    "study abroad nepal",
    "best consultancy in nepal",
    "ielts classes kathmandu",
    "study in canada from nepal",
    "study in australia from nepal",
    "study in uk from nepal",
    "study in usa from nepal",
    "student visa nepal",
    "reason education",
    "icef consultancy nepal",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np",
    siteName: "Reason Education Consultancy",
    title: "Best Study Abroad Experts in Nepal | Reason Education Consultancy",
    description: "Trusted study abroad consultancy in Kathmandu. Expert counseling and visa assistance with 98% success rate.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Reason Education Consultancy - Study Abroad Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Study Abroad Experts in Nepal | Reason Education Consultancy",
    description: "Expert study abroad counseling and visa assistance for Nepalese students.",
    images: ["https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StudyDestinations />
      <WhyChooseUs />
      <ServicesOverview />
      <Process />
      <Testimonials />
      <BlogPreview />
      <CTA />
      <FAQ />
    </>
  );
}
