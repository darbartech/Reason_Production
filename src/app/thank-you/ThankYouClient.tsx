"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/company";

const ThankYouClient = () => {
  const [reference, setReference] = useState("");

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setReference(ref);
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 size={48} className="text-accent" />
          </div>

          <h1 className="text-primary mb-4">Your Study Profile Has Been Received</h1>

          <p className="lead mx-auto max-w-lg text-brand-text-muted">
            Our counselor will review your information and contact you to discuss suitable
            study options.
          </p>

          {reference && (
            <p className="mt-6 text-sm text-brand-text-muted">
              Your reference number is{" "}
              <span className="font-bold text-ink">{reference}</span>. Quote it if you call or
              message us.
            </p>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              <MessageCircle size={20} />
              Talk on WhatsApp
            </a>

            <Link href="/" className="btn-outline w-full sm:w-auto">
              <ArrowLeft size={20} />
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouClient;
