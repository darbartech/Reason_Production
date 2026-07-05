import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get expert study abroad counseling. Visit our office in New Baneshwor, Kathmandu or call us today. Free initial consultation available.",
  keywords: [
    "contact reason education",
    "study abroad consultation nepal",
    "education consultants kathmandu contact",
    "reason education phone number",
    "study abroad inquiry nepal",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np/contact",
    siteName: "Reason Education Consultancy",
    title: "Contact Us | Reason Education Consultancy",
    description: "Get expert study abroad counseling - visit our office in New Baneshwor or call us today.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Contact Reason Education Consultancy - Our Office in Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Reason Education Consultancy",
    description: "Get expert study abroad counseling - visit our office or call us today.",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
