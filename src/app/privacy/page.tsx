import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { company, LAST_CHECKED } from "@/lib/company";

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
        plain
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
