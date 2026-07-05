import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Schema from "@/components/Schema";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reasons.edu.np"),

  title: {
    default: "Best Study Abroad Experts in Nepal | Reason Education Consultancy",
    template: "%s | Reason Education Consultancy",
  },

  description:
    "Leading study abroad consultancy in New Baneshwor, Kathmandu. Expert counseling for USA, Canada, UK, Australia, New Zealand, Europe, Japan. Join IELTS/PTE classes.",

  keywords: [
    "study abroad nepal",
    "ielts classes kathmandu",
    "study in canada from nepal",
    "best consultancy in nepal",
    "study in new zealand from nepal",
    "reason education consultancy",
    "student visa nepal",
    "study overseas nepal",
  ],

  authors: [
    {
      name: "Reason Education Consultancy",
      url: "https://reasons.edu.np",
    },
  ],

  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np",
    siteName: "Reason Education Consultancy",
    title: "Best Study Abroad Experts in Nepal | Reason Education Consultancy",
    description:
      "Trusted study abroad consultancy in Kathmandu. Expert counseling for USA, Canada, UK, Australia, New Zealand, Europe, Japan.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Students studying abroad - Reason Education Consultancy",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Study Abroad Experts in Nepal | Reason Education Consultancy",
    description:
      "Expert study abroad counseling and visa assistance for Nepalese students.",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=630",
    ],
    creator: "@reasoneducation",
  },

  robots: {
    index: true,
    follow: true,
    notranslate: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

 icons: {
  icon: "/logo/NEW.png",
  apple: "/logo/NEW.png",
},
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased text-primary selection:bg-accent/20 overflow-x-hidden">
        <Schema />
        <Toaster position="top-center" richColors />
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
