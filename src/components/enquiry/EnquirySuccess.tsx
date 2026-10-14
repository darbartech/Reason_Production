import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowLeft, MapPin } from "lucide-react";
import { whatsappLink, company } from "@/lib/company";

interface EnquirySuccessProps {
  onReset?: () => void;
}

const EnquirySuccess = ({ onReset }: EnquirySuccessProps) => {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.address.street}, ${company.address.city}, ${company.address.country}`
  )}`;

  return (
    <div className="text-center py-6 md:py-10">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle2 size={48} className="text-accent" />
      </div>

      <h3 className="text-primary mb-4">
        Your Study Profile Has Been Received
      </h3>

      <p className="text-base md:text-lg text-brand-text-muted leading-relaxed max-w-lg mx-auto mb-10">
        What happens next: A counsellor will call you within one working day (Sunday–Friday, 10&nbsp;am–5&nbsp;pm) to discuss suitable options. If we can&apos;t reach you by phone, we&apos;ll send a WhatsApp message.
      </p>

      {/* One knob: max-w-sm keeps the three actions stacked, one per row. */}
      <div className="mx-auto flex w-full max-w-sm flex-col items-stretch gap-3">
        <a
          href={whatsappLink("Hello Reasons Education, I just submitted my study assessment profile.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp btn-lg w-full"
        >
          <MessageCircle size={20} />
          Talk on WhatsApp
        </a>

        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full btn-outline"
        >
          <MapPin size={20} />
          Get directions to our office
        </a>

        <Link
          href="/"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 w-full btn-outline"
        >
          <ArrowLeft size={20} />
          Return to Website
        </Link>
      </div>
    </div>
  );
};

export default EnquirySuccess;
