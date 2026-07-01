import { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Privacy Policy | Reason Education Consultancy",
  description: "Our commitment to protecting your privacy and personal data. Learn how Reason Education Consultancy handles your information.",
};

const PrivacyPage = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2 blur-3xl opacity-30"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 max-w-4xl mx-auto leading-[1.05] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
            Your privacy is important to us. Learn how we collect, use, and protect your data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="prose prose-lg prose-slate max-w-none text-primary/70 font-medium leading-relaxed space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">1. Introduction</h2>
              <p>
                Reason Education Consultancy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">2. Information We Collect</h2>
              <p>
                We may collect personal information that you provide directly to us, such as your name, email address, phone number, and academic background, when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out a contact or inquiry form</li>
                <li>Register for IELTS/PTE classes</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage with us on social media</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide personalized study abroad counseling</li>
                <li>Process your admissions and visa applications</li>
                <li>Communicate with you about our services and updates</li>
                <li>Improve our website and user experience</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">5. Third-Party Disclosure</h2>
              <p>
                We do not sell or trade your personal information. We may share your data with trusted third parties, such as educational institutions and visa authorities, only as necessary to provide our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">6. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at info@reasons.edu.np.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
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

export default PrivacyPage;
