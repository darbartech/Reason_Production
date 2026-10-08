import Image from "next/image";
import SectionHeader from "./SectionHeader";
import {
  Testimonial,
  featuredTestimonial,
  testimonials,
} from "@/content/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-custom">
        <div className="mb-10 lg:mb-14">
          <SectionHeader
            eyebrow="Student stories"
            title={<>Students we've <em>recently supported</em> through the process.</>}
            intro="A few of the students who've gone through our counselling and documentation this intake."
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Featured navy card — left 5 cols */}
          <article className="lg:col-span-5 reveal surface-dark rounded-3xl p-7 sm:p-8 lg:p-10 border border-primary-900 shadow-float">
            <span
              aria-hidden="true"
              className="font-heading text-6xl sm:text-7xl leading-none text-crimson block mb-1 select-none"
            >
              &ldquo;
            </span>

            <blockquote className="font-heading text-2xl md:text-[1.9rem] leading-[1.25] text-white">
              {featuredTestimonial.quote}
            </blockquote>

            <footer className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-primary-800 border border-white/15">
                <Image
                  src={featuredTestimonial.image}
                  alt={`${featuredTestimonial.name} — study in ${featuredTestimonial.destination}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <cite className="font-semibold text-white not-italic block text-base">
                  {featuredTestimonial.name}
                </cite>
                <p className="text-sm mt-0.5">
                  Study in {featuredTestimonial.destination}
                  {featuredTestimonial.intake && ` · ${featuredTestimonial.intake}`}
                </p>
                {featuredTestimonial.outcome && (
                  <p className="text-sm text-on-dark-link mt-0.5">
                    {featuredTestimonial.outcome}
                  </p>
                )}
              </div>
            </footer>
          </article>

          {/* Stacked serif quote list — right 7 cols */}
          <ul className="lg:col-span-7 space-y-0 divide-y divide-line border-y border-line">
            {testimonials.map((t: Testimonial, i: number) => (
              <li
                key={t.name}
                className={`reveal py-7 sm:py-8 grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-6 items-center`}
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-5xl sm:text-6xl leading-none text-crimson/80 self-start pt-1 select-none hidden sm:block"
                >
                  &ldquo;
                </span>

                <div className="min-w-0">
                  <blockquote className="font-heading text-xl md:text-2xl leading-[1.3] text-primary">
                    {t.quote}
                  </blockquote>

                  <div className="mt-4 flex items-center gap-3 sm:hidden">
                    <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-primary-100">
                      <Image
                        src={t.image}
                        alt={`${t.name} — ${t.destination}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <cite className="font-semibold text-primary not-italic block text-sm">
                        {t.name}
                      </cite>
                      <p className="text-xs text-muted mt-0.5 truncate">
                        {t.destination}
                        {t.intake && ` · ${t.intake}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <cite className="font-semibold text-primary not-italic block">
                      {t.name}
                    </cite>
                    <p className="text-xs text-muted mt-0.5">
                      Study in {t.destination}
                      {t.intake && ` · ${t.intake}`}
                    </p>
                    {t.outcome && (
                      <p className="text-xs text-accent mt-0.5">
                        {t.outcome}
                      </p>
                    )}
                  </div>
                  <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-primary-100 border border-line">
                    <Image
                      src={t.image}
                      alt={`${t.name} — ${t.destination}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
