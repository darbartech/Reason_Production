import EligibilityQuiz from "@/components/eligibility/EligibilityQuiz";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad Eligibility Check for Nepali Students",
  description:
    "Answer five questions about your level, country, field, English test and budget. See which country guides to read first. Free, no documents needed.",
  path: "/eligibility",
});

export default function EligibilityPage() {
  return (
    <div className="bg-white">
      <PageHero
        title="Check your study abroad options in 2 minutes"
        intro="Five questions. We suggest country guides to read, and pass your answers to a counsellor only if you choose."
        image={{
          name: "hero-counselling",
          alt: "Students and a counsellor talking at a table with laptops",
          position: "center 45%",
        }}
      />

      <section className="section-padding" aria-labelledby="eligibility-heading">
        <div className="container-custom">
          <h2 id="eligibility-heading" className="sr-only">
            Eligibility check
          </h2>
          <EligibilityQuiz />
        </div>
      </section>
    </div>
  );
}
