import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { whatsappLink } from "@/lib/company";

interface EnquirySuccessProps {
  onReset?: () => void;
}

const EnquirySuccess = ({ onReset }: EnquirySuccessProps) => {
  return (
    <div className="text-center py-6 md:py-10">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle2 size={48} className="text-accent" />
      </div>

      <h3 className="text-primary mb-4">
        Your Study Profile Has Been Received
      </h3>

      <p className="text-base md:text-lg text-brand-text-muted leading-relaxed max-w-lg mx-auto mb-10">
        Our counsellor will review your information and contact you to discuss suitable study options.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={whatsappLink("Hello Reasons Education, I just submitted my study assessment profile.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
        >
          <MessageCircle size={20} />
          Talk on WhatsApp
        </a>

        <Link
          href="/"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto btn-outline"
        >
          <ArrowLeft size={20} />
          Return to Website
        </Link>
      </div>
    </div>
  );
};

export default EnquirySuccess;
