import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/lib/company";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of engagement for Reasons Education's counselling, test-prep and visa-documentation services offered from our Kathmandu office.",
  path: "/terms",
});

const TermsPage = () => {
  return (
    <div className="bg-white">
      <PageHero
        variant="editorial"
        crumbs={[{ name: "Terms" }]}
        eyebrow="Legal"
        title="Terms of Service"
        intro="Please read these terms carefully before using our website or services. They outline the terms of engagement between you and Reasons Education Foundation."
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
                        href="#acceptance-of-terms"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        1. Acceptance of Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#use-of-services"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        2. Use of Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#user-responsibilities"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        3. User Responsibilities
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#service-fees-and-refunds"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        4. Service Fees &amp; Refunds
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#limitation-of-liability"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        5. Limitation of Liability
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#intellectual-property"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        6. Intellectual Property
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#privacy"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        7. Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#termination"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        8. Termination
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#changes-to-terms"
                        className="block py-2 border-b border-line font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        9. Changes to Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#governing-law"
                        className="block py-2 last:border-b-0 font-medium text-primary/70 hover:text-crimson transition-colors"
                      >
                        10. Governing Law
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="blog-body">
                <div>
                  <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using the services of {company.legalName} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                  </p>
                </div>

                <div>
                  <h2 id="use-of-services">2. Use of Services</h2>
                  <p>
                    Our services are provided for educational and information purposes. You agree to provide accurate and complete information when requested. Any fraudulent or misleading information may lead to the termination of our services.
                  </p>
                  <ul className="max-w-prose space-y-2 pl-6 list-disc text-muted">
                    <li>Counselling services are subject to availability.</li>
                    <li>Enrolment in IELTS/PTE classes is subject to payment of fees.</li>
                    <li>Admissions and visa guidance are based on current rules and regulations.</li>
                  </ul>
                </div>

                <div>
                  <h2 id="user-responsibilities">3. User Responsibilities</h2>
                  <p>
                    As a user, you are responsible for:
                  </p>
                  <ul className="max-w-prose space-y-2 pl-6 list-disc text-muted">
                    <li>Providing authentic documents and information.</li>
                    <li>Complying with the rules of the educational institutions and visa authorities.</li>
                    <li>Attending scheduled counselling sessions and classes on time.</li>
                    <li>Paying any applicable fees as agreed.</li>
                  </ul>
                </div>

                <div>
                  <h2 id="service-fees-and-refunds">4. Service Fees &amp; Refunds</h2>
                  <p>
                    Fees for our services, including IELTS/PTE classes, document lodgement and visa processing support, are communicated in writing before enrolment or engagement. Refunds, where applicable, are assessed on a case-by-case basis and subject to a written refund policy provided at the time of payment.
                  </p>
                  <ul className="max-w-prose space-y-2 pl-6 list-disc text-muted">
                    <li>Class fees are non-refundable once a cohort has commenced, unless cancellation is requested within 48 hours of the first session.</li>
                    <li>Visa lodgement fees are non-refundable once documents have been submitted to the relevant authority.</li>
                    <li>Any refund due will be processed within 14 working days of a written request.</li>
                  </ul>
                </div>

                <div>
                  <h2 id="limitation-of-liability">5. Limitation of Liability</h2>
                  <p>
                    While we strive for excellence, we do not guarantee admission to any institution or the approval of any visa application. Decisions are made by the respective institutions and government authorities. We are not liable for any direct or indirect losses arising from such decisions.
                  </p>
                </div>

                <div>
                  <h2 id="intellectual-property">6. Intellectual Property</h2>
                  <p>
                    All content on this website, including text, graphics, logos, and images, is the property of {company.legalName} and is protected by intellectual property laws. You may not reproduce or distribute any content without our prior written permission.
                  </p>
                </div>

                <div>
                  <h2 id="privacy">7. Privacy</h2>
                  <p>
                    We handle your personal information in accordance with our Privacy Policy, which is published separately on this website and incorporated into these Terms by reference. By using our services, you consent to the collection, storage and use of your information as described in that policy.
                  </p>
                </div>

                <div>
                  <h2 id="termination">8. Termination</h2>
                  <p>
                    We reserve the right to terminate our services at any time for any violation of these terms or for any other reason. You may terminate the engagement at any time by providing written notice; any fees already paid will be refunded only in accordance with the refund policy referenced in Clause 4.
                  </p>
                </div>

                <div>
                  <h2 id="changes-to-terms">9. Changes to Terms</h2>
                  <p>
                    We may update these Terms of Service from time to time to reflect changes in our operations, regulatory requirements or case law. Any changes will be posted on this page with an updated effective date. Continued use of our services after a revision constitutes acceptance of the amended Terms.
                  </p>
                </div>

                <div>
                  <h2 id="governing-law">10. Governing Law</h2>
                  <p>
                    These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any disputes will be subject to the exclusive jurisdiction of the courts in Kathmandu.
                  </p>
                </div>

                <div className="pt-8 border-t border-line mt-12">
                  <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                    Last Updated: April 15, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default TermsPage;
