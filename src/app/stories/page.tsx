import Link from "next/link";
import PageHero from "@/components/PageHero";
import StudentStories from "@/components/StudentStories";
import { consentedTestimonials, featuredConsented } from "@/content/testimonials";
import { buildMetadata } from "@/lib/seo";

const publishedStories = [
  ...(featuredConsented ? [featuredConsented] : []),
  ...consentedTestimonials.filter((story) => story.name !== featuredConsented?.name),
];
const hasEnoughStories = publishedStories.length >= 3;

export const metadata = buildMetadata({
  title: "Student Stories",
  description:
    "Real students, shared with their written consent. Accounts from students who used Reasons Education for study abroad counselling, applications and visa support.",
  path: "/stories",
  noindex: !hasEnoughStories,
});

export default function StoriesPage() {
  const jsonLd = hasEnoughStories
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Student stories",
        itemListElement: publishedStories.map((story, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${story.name} — study in ${story.destination}`,
          ...(story.proofUrl ? { url: story.proofUrl } : {}),
        })),
      }
    : null;

  return (
    <div className="bg-white">
      <PageHero
        crumbs={[{ name: "Student stories" }]}
        title="Student stories"
        intro="Real students, shared with their written consent."
        image={{
          name: "hero-counselling",
          alt: "Students and a counsellor talking at a table with laptops",
          position: "center 45%",
        }}
      />

      <section className="section-padding" aria-labelledby="stories-list-heading">
        <div className="container-custom">
          <h2 id="stories-list-heading" className="sr-only">
            Published student stories
          </h2>

          {hasEnoughStories ? (
            <StudentStories stories={consentedTestimonials} featured={featuredConsented} />
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper p-8 text-center">
              <h2>No stories published yet.</h2>
              <p className="mx-auto mt-3">
                We publish a student story only after written consent is on file, and we
                list them here once at least three are ready. When students agree, their
                accounts will appear with a supporting link where one exists.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/countries" className="btn-secondary">
                  Read country guides
                </Link>
                <Link href="/contact" className="btn-primary">
                  Book a free session
                </Link>
              </div>
            </div>
          )}

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
            Every result depends on the student, the institution and the government&apos;s
            decision. We can&apos;t promise yours.
          </p>
        </div>
      </section>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}
