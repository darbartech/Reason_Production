import SectionHeader from "./SectionHeader";
import { events } from "@/content/events";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kathmandu",
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kathmandu",
});

export default function Events() {
  const now = Date.now();
  const upcoming = events
    .filter((event) => {
      const start = new Date(event.startISO).getTime();
      return !Number.isNaN(start) && start >= now;
    })
    .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());

  if (upcoming.length === 0) return null;

  const jsonLd = upcoming.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startISO,
    ...(event.endISO ? { endDate: event.endISO } : {}),
    ...(event.description ? { description: event.description } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    ...(event.venue
      ? {
          location: {
            "@type": "Place",
            name: event.venue,
          },
        }
      : {}),
    ...(event.registrationUrl ? { url: event.registrationUrl } : {}),
  }));

  return (
    <section className="section-padding bg-paper" aria-labelledby="events-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Events"
          id="events-heading"
          title="Upcoming sessions."
          intro="Times are shown in Nepal Time (Asia/Kathmandu). Register with the link for the session you want to attend."
        />

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {upcoming.map((event) => {
            const start = new Date(event.startISO);
            return (
              <li
                key={event.slug}
                className="grid gap-4 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-6"
              >
                <div>
                  <time dateTime={event.startISO} className="block font-semibold text-primary">
                    {dateFormat.format(start)}
                  </time>
                  <p className="mt-1 text-sm text-muted">{timeFormat.format(start)} NPT</p>
                </div>

                <div>
                  <h3 className="text-primary">{event.title}</h3>
                  {event.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
                  )}
                  {event.venue && <p className="mt-2 text-sm text-muted">{event.venue}</p>}
                </div>

                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Register
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {jsonLd.map((event) => (
        <script
          key={event.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(event).replace(/</g, "\\u003c") }}
        />
      ))}
    </section>
  );
}
