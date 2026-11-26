"use client";

import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { company } from "@/lib/company";

// Standalone enquiry page: the logo and the form, nothing else. The site chrome
// (navbar, footer, WhatsApp button) is suppressed for this route in PublicOnly.
const EnquiryClient = () => {
  return (
    <section className="min-h-screen bg-brand-light-bg px-4 py-10 sm:py-16">
      <h1 className="sr-only">Study enquiry — {company.displayName}</h1>

      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="mx-auto mb-8 flex w-fit items-center"
          aria-label={`${company.displayName} home`}
        >
          <Image
            src="/logo/logo.png"
            alt={company.displayName}
            width={657}
            height={240}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-8">
          <EnquiryForm sourcePage="/enquiry" />
        </div>
      </div>
    </section>
  );
};

export default EnquiryClient;
