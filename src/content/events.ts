export type EventItem = {
  slug: string;
  title: string;
  /** ISO 8601 start with the Kathmandu offset, e.g. "2027-01-15T14:00:00+05:45". */
  startISO: string;
  endISO?: string;
  description?: string;
  venue?: string;
  registrationUrl?: string;
};

// Owner-supplied only, and only once the date, venue and registration link are confirmed.
export const events: EventItem[] = [];
