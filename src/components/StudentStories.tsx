import { ExternalLink } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

function StoryFacts({ story, dark = false }: { story: Testimonial; dark?: boolean }) {
  const rows: [string, string | undefined][] = [
    ["Destination", story.destination],
    ["Institution", story.institution],
    ["Programme", story.programme],
    ["Intake", story.intake],
  ];
  const present = rows.filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div>
      <dl
        className={`mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm ${
          dark ? "text-on-dark" : "text-muted"
        }`}
      >
        {present.map(([label, value]) => (
          <div key={label} className="flex gap-1.5">
            <dt className={dark ? "text-white/60" : "text-muted"}>{label}:</dt>
            <dd className={dark ? "text-on-dark" : "text-primary"}>{value}</dd>
          </div>
        ))}
      </dl>

      {story.proofUrl && (
        <a
          href={story.proofUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold ${
            dark ? "text-on-dark-link hover:text-white" : "text-accent hover:text-primary"
          }`}
        >
          View proof
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default function StudentStories({
  stories,
  featured,
}: {
  stories: Testimonial[];
  featured: Testimonial | null;
}) {
  const list = stories.filter((story) => story.name !== featured?.name);
  if (!featured && list.length === 0) return null;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
      {featured && (
        <figure className="surface-dark rounded-2xl border border-primary-900 p-7 sm:p-8 lg:col-span-5 lg:p-10">
          <blockquote className="font-heading text-2xl leading-[1.3] text-white md:text-[1.75rem]">
            {featured.quote}
          </blockquote>
          <figcaption className="mt-8 border-t border-white/10 pt-6">
            <span className="block text-base font-semibold text-white">{featured.name}</span>
            <StoryFacts story={featured} dark />
          </figcaption>
        </figure>
      )}

      {list.length > 0 && (
        <ul
          className={`divide-y divide-line border-y border-line ${
            featured ? "lg:col-span-7" : "lg:col-span-12"
          }`}
        >
          {list.map((story) => (
            <li key={story.name}>
              <figure className="py-7 sm:py-8">
                <blockquote className="font-heading text-xl leading-[1.35] text-primary md:text-2xl">
                  {story.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <span className="block text-sm font-semibold text-primary">{story.name}</span>
                  <StoryFacts story={story} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
