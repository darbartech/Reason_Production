import { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Terms of Service | Reason Education Consultancy",
  description: "Terms and conditions for using the services of Reason Education Consultancy, Kathmandu, Nepal.",
};

const TermsPage = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 max-w-4xl mx-auto leading-[1.05] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
            Please read these terms carefully before using our website or services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="prose prose-lg prose-slate max-w-none text-primary/70 font-medium leading-relaxed space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the services of Reason Education Consultancy ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">2. Use of Services</h2>
              <p>
                Our services are provided for educational and information purposes. You agree to provide accurate and complete information when requested. Any fraudulent or misleading information may lead to the termination of our services.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Counseling services are subject to availability.</li>
                <li>Enrollment in IELTS/PTE classes is subject to payment of fees.</li>
                <li>Admissions and visa guidance are based on current rules and regulations.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">3. User Responsibilities</h2>
              <p>
                As a user, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing authentic documents and information.</li>
                <li>Complying with the rules of the educational institutions and visa authorities.</li>
                <li>Attending scheduled counseling sessions and classes on time.</li>
                <li>Paying any applicable fees as agreed.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of Reason Education Consultancy and is protected by intellectual property laws. You may not reproduce or distribute any content without our prior written permission.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">5. Limitation of Liability</h2>
              <p>
                While we strive for excellence, we do not guarantee admission to any institution or the approval of any visa application. Decisions are made by the respective institutions and government authorities. We are not liable for any direct or indirect losses arising from such decisions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">6. Termination</h2>
              <p>
                We reserve the right to terminate our services at any time for any violation of these terms or for any other reason.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">7. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any disputes will be subject to the exclusive jurisdiction of the courts in Kathmandu.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                Last Updated: April 15, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default TermsPage;
