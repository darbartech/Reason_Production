import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studynepal.edu.np"),

  title: {
    default: "Reason Education Consultancy | Best Study Abroad Experts in Nepal",
    template: "%s | Reason Education Consultancy",
  },

  description:
    "Leading study abroad consultancy in New Baneswor, Kathmandu. Expert counseling for USA, Canada, UK, Australia, New Zealand, Europe, and Japan. Join IELTS/PTE classes today.",

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
      url: "https://studynepal.edu.np",
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
    url: "https://studynepal.edu.np",
    siteName: "Reason Education Consultancy",
    title: "Reason Education Consultancy | Best Study Abroad Experts in Nepal",
    description:
      "Achieve your dreams of global education with the most trusted consultancy in New Baneswor, Kathmandu. Expert visa and admission support.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Students studying abroad - Reason Education Consultancy",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Reason Education Consultancy | Study Abroad from Nepal",
    description:
      "Expert study abroad counseling and visa assistance for Nepalese students. Canada, Australia, UK, USA, and more.",
    images: [
      "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1200&h=630&auto=format&fit=crop",
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
  icon: "/favicon.ico",
  apple: "/apple-touch-icon.png",
},
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
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
