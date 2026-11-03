import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-2 p-2.5">
        <a href={`tel:${company.phoneTel}`} className="btn-secondary h-11 px-4" aria-label={`Call ${company.phoneDisplay}`}>
          <Phone size={18} aria-hidden="true" />
          <span className="sr-only">Call</span>
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary h-11 px-4" aria-label="Chat on WhatsApp">
          <MessageCircle size={18} aria-hidden="true" />
          <span className="sr-only">WhatsApp</span>
        </a>
        <Link href="/contact" className="btn-primary h-11">
          Book a free session
        </Link>
      </div>
    </div>
  );
}
