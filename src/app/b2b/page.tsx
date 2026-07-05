import { Metadata } from "next";
import B2bClient from "./B2bClient";

export const metadata: Metadata = {
  title: "B2B Partnership",
  description: "Join our B2B partnership network. Collaborate with education agents, counselors, and institutions to provide world-class study abroad solutions.",
  keywords: [
    "b2b partnership nepal",
    "education agents collaboration",
    "study abroad partners",
    "institution partnerships nepal",
    "education consultancy b2b",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/b2b",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np/b2b",
    siteName: "Reason Education Consultancy",
    title: "B2B Partnership | Reason Education Consultancy",
    description: "Join our B2B partnership network - collaborate with education agents and institutions.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "B2B Partnership - Reason Education Consultancy Collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Partnership | Reason Education Consultancy",
    description: "Join our B2B partnership network - collaborate with education agents and institutions.",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function B2bPage() {
  return <B2bClient />;
}
