import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { LAST_CHECKED, LAST_CHECKED_ISO, REVIEWED_BY } from "@/lib/company";

const faqs = [
  {
    q: "Do I need a Schengen visa to study in Europe?",
    a: "No. For degree study you apply for a national long-stay (Type D) student visa in the country where you will study, then a residence permit after arrival. The 90-day Schengen tourist visa is not for study.",
  },
  {
    q: "Are there tuition-free options?",
    a: "Germany's public universities charge little or no tuition, but there is a semester contribution and some states charge non-EU students. Many other European countries charge non-EU students tuition. We compare real costs by country.",
  },
  {
    q: "Can I work after graduation?",
    a: "Many countries allow a job-search period — Germany gives up to 18 months. Rules differ by country, so the answer depends on where you study.",
  },
];

export const metadata = buildMetadata({
  title: "Study in Europe from Nepal: Which Country? (2026)",
  description:
    "Compare European study destinations for Nepali students: tuition, language, visa type and costs. Germany guide plus other countries we advise on.",
  path: "/countries/europe",
  image: "/og/europe.png",
});

export default function EuropePage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { name: "Countries", path: "/countries" },
          { name: "Europe", path: "/countries/europe" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <PageHero
        crumbs={[
          { name: "Countries", href: "/countries" },
          { name: "Europe" },
        ]}
        title="Study in Europe from Nepal"
        intro="“Europe” is many countries with different rules. Start with a country, not a continent."
        image={{
          name: "dest-europe",
          alt: "A European city street with historic university buildings",
        }}
      />

      <div className="border-b border-line bg-white">
        <div className="container-custom py-4 text-sm text-muted">
          Last checked {LAST_CHECKED} · Reviewed by {REVIEWED_BY}
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom mx-auto max-w-4xl space-y-10">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="eyebrow mb-3">Quick answer</h2>
            <p className="text-base leading-relaxed text-ink sm:text-lg">
              For degree study you apply for a national student visa in the country you will
              study in, then a residence permit after arrival. The 90-day Schengen tourist
              visa is not for study.
            </p>
          </div>

          <div>
            <h2 className="mb-4">Compare the countries we guide</h2>
            <div className="rounded-2xl border border-line bg-white p-5 md:hidden">
              <p className="font-semibold text-primary">Germany</p>
              <dl className="mt-3 grid gap-3 text-sm">
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Tuition</dt>
                  <dd className="mt-0.5 text-ink">Mostly low or none at public universities</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Funds shown</dt>
                  <dd className="mt-0.5 text-ink">€11,904 blocked account (2026)</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">Language</dt>
                  <dd className="mt-0.5 text-ink">German or English-taught</dd>
                </div>
              </dl>
              <Link
                href="/countries/germany"
                className="mt-4 inline-flex min-h-11 items-center font-medium text-crimson hover:text-primary"
              >
                Germany guide
              </Link>
            </div>

            <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-paper text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Country</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Tuition</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Funds shown</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Language</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Guide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-4 py-4 text-left font-medium text-ink">Germany</th>
                    <td className="px-4 py-4 text-muted">Mostly low or none at public universities</td>
                    <td className="px-4 py-4 text-muted">€11,904 blocked account (2026)</td>
                    <td className="px-4 py-4 text-muted">German or English-taught</td>
                    <td className="px-4 py-4">
                      <Link href="/countries/germany" className="font-medium text-crimson hover:text-primary">
                        Germany guide
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We publish guides only for countries we actively advise on. If you are
              considering another European country, ask us first and we will tell you
              honestly whether we can help.
            </p>
          </div>

          <div>
            <h2 className="mb-4">Europe questions, answered</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="card group overflow-hidden p-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                    <span className="pr-4 text-sm font-medium text-ink sm:text-base">{faq.q}</span>
                    <span className="text-muted" aria-hidden="true">+</span>
                  </summary>
                  <div className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted">
            Last checked {LAST_CHECKED} · Reviewed by {REVIEWED_BY}. Last modified{" "}
            {LAST_CHECKED_ISO}.
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to choose a European country?"
        intro="We compare the real costs, language route and visa type for the countries we advise on. We can't guarantee a visa or an offer."
      />
    </div>
  );
}
