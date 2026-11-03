import Link from "next/link";
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
  title: "Terms of Service",
  description:
    "How Reasons Education works: what our services cover, fees and refunds, your responsibilities, and what we cannot guarantee. Written in plain language.",
  path: "/terms",
});

const TermsPage = () => {
  return (
    <div className="bg-white">
      <PageHero
<<<<<<< HEAD
        plain
        crumbs={[{ name: "Terms of Service" }]}
        title="Terms of Service"
        intro="The short version: we give honest advice, you give us true documents, and no one can promise an admission or a visa."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg prose-slate max-w-none text-primary/70 font-medium leading-relaxed space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary">1. Our services</h2>
              <p>
                {company.legalName} provides study abroad counselling, application and
                document support, visa guidance, and IELTS and PTE classes from our office in{" "}
                {company.address.city}. We explain what is included before work starts.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">2. Fees and refunds</h2>
              <p>
                Published class fees and service charges are on our{" "}
                <Link
                  href="/fees"
                  className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  fees page
                </Link>
                . Anything quoted in writing in your own case follows that quote. Government,
                test, courier and institution fees are paid to those bodies, not to us.
                Refund terms for a service are given in writing before you pay.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">3. Your responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Give us true, complete documents and information.</li>
                <li>Attend sessions and classes you have booked, or tell us in advance.</li>
                <li>Follow the rules of institutions, test centres and visa authorities.</li>
                <li>Pay agreed fees on time.</li>
              </ul>
              <p>
                If documents turn out to be false or altered, we may stop work on the file.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">4. What we do not guarantee</h2>
              <p>
                We do not guarantee admission, a scholarship, a visa or a particular test
                score. Those decisions are made by institutions, test centres and
                governments. We also cannot control processing times or rule changes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">5. Complaints</h2>
              <p>
                If something goes wrong, tell us in writing at{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  {company.email}
                </a>{" "}
                or at the office. We will confirm receipt and tell you who is handling it and
                how long we expect it to take.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-primary">6. Governing law</h2>
              <p>
                These terms are governed by the laws of Nepal. Disputes are subject to the
                courts of Kathmandu.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                Last updated: {LAST_CHECKED}
              </p>
=======
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

export default TermsPage;
