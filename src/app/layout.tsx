import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import PublicOnly from "@/components/PublicOnly";
import Schema from "@/components/Schema";
import { Toaster } from "sonner";
import { company } from "@/lib/company";

const heading = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
  axes: ["opsz"],
  adjustFontFallback: false,
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),

  title: {
    default: `Study Abroad Consultancy in Kathmandu`,
    template: `%s | ${company.displayName}`,
  },

  description:
    "Study abroad counselling, IELTS/PTE classes and visa documentation in New Baneshwor, Kathmandu.",

  applicationName: company.displayName,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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

  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-sans antialiased text-primary selection:bg-brand-blue/20 overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <PublicOnly>
          <Schema />
        </PublicOnly>
        <Toaster position="top-center" richColors />
        <PublicOnly>
          <Navbar />
        </PublicOnly>
        <main id="main-content" className="min-h-screen pb-16 lg:pb-0">
          {children}
        </main>
        <PublicOnly>
          <Footer />
          <WhatsAppButton />
          <MobileActionBar />
        </PublicOnly>
      </body>
    </html>
  );
}
