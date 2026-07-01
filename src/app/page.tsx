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
  title: {
    default: "Reason Education Consultancy | Best Study Abroad Experts in Nepal",
    template: "%s | Reason Education Consultancy Nepal",
  },
  description: "Start your global education journey with Nepal's leading study abroad consultancy. Expert visa guidance for Australia, Canada, USA, UK, New Zealand, Japan, and Europe. Certified ICEF experts with 98% visa success rate.",
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
  metadataBase: new URL("https://studynepal.edu.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studynepal.edu.np",
    siteName: "Reason Education Consultancy",
    title: "Reason Education Consultancy | Best Study Abroad Experts in Nepal",
    description: "Start your global education journey with Nepal's leading study abroad consultancy. Expert visa guidance with 98% success rate.",
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
    title: "Reason Education Consultancy | Study Abroad Experts Nepal",
    description: "Expert study abroad counseling and visa assistance for Nepalese students. Canada, Australia, UK, USA, and more.",
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
  verification: {
    google: "google-site-verification-code",
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
