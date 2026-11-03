import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
<<<<<<< HEAD
import { company, LAST_CHECKED } from "@/lib/company";
=======
import { company } from "@/lib/company";
import Link from "next/link";
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What Reasons Education collects, why we collect it, who sees it and how to ask us to correct or delete your details. Written in plain language.",
  path: "/privacy",
});

const PrivacyPage = () => {
  return (
    <div className="bg-white">
      <PageHero
<<<<<<< HEAD
        plain
        crumbs={[{ name: "Privacy Policy" }]}
        title="Privacy Policy"
        intro="What we collect, why we collect it, and how to ask us to change or delete it."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg prose-slate max-w-none text-primary/70 font-medium leading-relaxed space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary">1. What we collect</h2>
              <p>
                When you contact us we collect your name, phone number, email address and
                whatever you tell us about your studies. If you use our counselling or
                application services, we also hold the documents you give us — for example
                transcripts, certificates, passport pages and English test results.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">2. Why we collect it</h2>
              <p>
                We use your details to answer your enquiry, give counselling, prepare
                applications and visa documents, and contact you about your file. We do not
                sell your details or use them for unrelated marketing.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">3. Who sees it</h2>
              <p>
                Our counselling team sees your file. We share details with an institution or
                a visa authority only when that is needed for the service you asked for.
                We use service providers for things like email and form handling, and they
                may process data on our behalf.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">4. How long we keep it</h2>
              <p>
                We keep enquiry details only as long as needed to respond and provide the
                service you asked for. If you ask us to delete your details, we will do so
                unless we are required to keep a record by law.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">5. Your choices</h2>
              <p>
                You can ask to see, correct or delete the information we hold about you. You
                can also ask us to stop sending WhatsApp messages. Write to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  {company.email}
                </a>{" "}
                and we will respond.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">6. Cookies and analytics</h2>
              <p>
                The website uses only what it needs to work. If we add analytics or
                advertising tools that track visitors, we will say so here before they are
                used.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">7. Privacy requests</h2>
              <p>
                Send privacy requests to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  {company.email}
                </a>{" "}
                or visit the office at {company.address.street}, {company.address.city}. Our
                team will confirm receipt and tell you what happens next.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                Last updated: {LAST_CHECKED}
              </p>
=======
        variant="editorial"
        crumbs={[{ name: "Privacy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we handle your enquiry data, what we store and for how long, and your rights over the information we hold."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="hidden lg:block sticky top-32 self-start">
                <div className="card p-6 sm:p-8">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/60 mb-4">
                    On this page
                  </h4>
                  <ul className="space-y-0">
                    <li>
                      <Link
                        href="#introduction"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        1. Introduction
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#information-we-collect"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        2. Information we collect
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#how-we-use-your-information"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        3. How we use your information
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#data-security"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        4. Data security
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#third-party-disclosure"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        5. Third-party disclosure
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#your-rights"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        6. Your rights
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#changes-to-this-policy"
                        className="block py-2 last:border-b-0 font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        7. Changes to this policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="blog-body">
                <div>
                  <h2 id="introduction">1. Introduction</h2>
                  <p>
                    {company.legalName} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </div>

                <div>
                  <h2 id="information-we-collect">2. Information We Collect</h2>
                  <p>
                    We may collect personal information that you provide directly to us, such as your name, email address, phone number, and academic background, when you:
                  </p>
                  <ul>
                    <li>Fill out a contact or inquiry form</li>
                    <li>Register for IELTS/PTE classes</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Engage with us on social media</li>
                  </ul>
                </div>

                <div>
                  <h2 id="how-we-use-your-information">3. How We Use Your Information</h2>
                  <p>
                    We use the information we collect to:
                  </p>
                  <ul>
                    <li>Provide personalised study abroad counselling</li>
                    <li>Process your admissions and visa applications</li>
                    <li>Communicate with you about our services and updates</li>
                    <li>Improve our website and user experience</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <div>
                  <h2 id="data-security">4. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 id="third-party-disclosure">5. Third-Party Disclosure</h2>
                  <p>
                    We do not sell or trade your personal information. We may share your data with trusted third parties, such as educational institutions and visa authorities, only as necessary to provide our services.
                  </p>
                </div>

                <div>
                  <h2 id="your-rights">6. Your Rights</h2>
                  <p>
                    You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at{" "}
                    <a href={`mailto:${company.email}`}>
                      {company.email}
                    </a>.
                  </p>
                </div>

                <div>
                  <h2 id="changes-to-this-policy">7. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                  </p>
                </div>

                <div className="pt-8 border-t border-line mt-12">
                  <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                    Last Updated: April 15, 2026
                  </p>
                </div>
              </div>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
            </div>
          </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default PrivacyPage;
