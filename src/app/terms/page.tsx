import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { company, LAST_CHECKED } from "@/lib/company";

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
        plain
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
