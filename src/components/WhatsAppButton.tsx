import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9779801085977?text=Hello%20Reason%20Education%2C%20I%20have%20a%20question%20about%20studying%20abroad.%20Can%20you%20help%20me%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
      <MessageCircle size={32} className="relative z-10" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-black opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl border border-gray-100 pointer-events-none uppercase tracking-widest">
        Need Help? Chat Now!
      </span>
    </a>
  );
};

export default WhatsAppButton;
