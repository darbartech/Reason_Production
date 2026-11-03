import SectionHeader from "./SectionHeader";
import StudentStories from "./StudentStories";
import { consentedTestimonials, featuredConsented } from "@/content/testimonials";

export default function Testimonials() {
  if (!featuredConsented && consentedTestimonials.length === 0) return null;

  return (
    <section className="section-padding bg-paper" aria-labelledby="stories-heading">
      <div className="container-custom">
        <div className="mb-10 lg:mb-14">
          <SectionHeader
            eyebrow="Student stories"
            id="stories-heading"
            title={<>Students we&apos;ve recently supported through the process.</>}
            intro="Published only with written consent. Where a supporting document or public review exists, we link to it."
            action={{ label: "All student stories", href: "/stories" }}
          />
        </div>

        <StudentStories stories={consentedTestimonials} featured={featuredConsented} />
      </div>
    </section>
  );
}
