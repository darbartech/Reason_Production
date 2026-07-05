import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Study Abroad Services",
  description: "Comprehensive study abroad services. Expert counseling, university admissions, visa assistance, IELTS/PTE preparation, and post-arrival support in Kathmandu.",
  keywords: [
    "study abroad services nepal",
    "education consultancy services kathmandu",
    "student visa assistance nepal",
    "ielts pte preparation kathmandu",
    "university admission help nepal",
    "study abroad counselor nepal",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np/services",
    siteName: "Reason Education Consultancy",
    title: "Study Abroad Services | Reason Education Consultancy",
    description: "Comprehensive study abroad services in Kathmandu.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366811595-f035-4047-8600-07cf3f0d1fae?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Study Abroad Services - Reason Education Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Services | Reason Education Consultancy",
    description: "Comprehensive study abroad services in Kathmandu.",
    images: ["https://images.unsplash.com/photo-1497366811595-f035-4047-8600-07cf3f0d1fae?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ServicesPage = () => {
  return <ServicesClient />;
};

export default ServicesPage;
