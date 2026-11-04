"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import CallbackCard from "./CallbackCard";

// Small screens get the enquiry form in a popup (the hero has no room for it);
// large screens keep the link, since the form is already visible beside the copy.
export default function HeroEnquiryCta() {
  const [open, setOpen] = useState(false);

  // The mobile action bar is rendered globally; on the home page it asks this
  // component to open the popup instead of navigating to /contact.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("reasons:open-enquiry", onOpen);
    return () => window.removeEventListener("reasons:open-enquiry", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const label = (
    <>
      Book a free session
      <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </>
  );

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a free session"
      className="fixed inset-0 z-[1000] overflow-y-auto bg-primary/60 lg:hidden"
      onClick={() => setOpen(false)}
    >
      <div className="flex min-h-full items-center justify-center p-4 pb-24">
        <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-lift"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <CallbackCard />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Link href="/contact" className="btn-primary group hidden w-full sm:w-auto lg:inline-flex">
        {label}
      </Link>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary group w-full sm:w-auto lg:hidden"
      >
        {label}
      </button>

      {open && typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
