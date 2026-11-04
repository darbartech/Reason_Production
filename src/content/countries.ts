export interface Country {
  name: string;
  slug: string;
  description: string;
  /** File code for the circular flag in /images/flags. */
  flagCode: string;
  code: string;
  /** One-line summary used on the home page and country index. */
  summary: string;
  intakes: string;
  tuition: string;
  funds: string;
  postStudy: string;
  /** Europe is a hub page; it is not shown as a destination tile on the home page. */
  hub?: boolean;
}

export const countries: Country[] = [
  {
    name: "United Kingdom",
    slug: "uk",
    description:
      "Shorter degrees — most master's courses take one year — at a long-established university sector.",
    flagCode: "gb",
    code: "UK",
    summary: "Shorter degrees; most master's courses take one year.",
    intakes: "Sep · Jan",
    tuition: "£12,000–30,000",
    funds: "£1,570/month from 30 Nov 2026",
    postStudy: "Graduate route",
  },
  {
    name: "USA",
    slug: "usa",
    description:
      "The widest choice of courses and universities, with scholarships that vary by university.",
    flagCode: "us",
    code: "US",
    summary: "Wide choice of courses; scholarships vary by university.",
    intakes: "Aug · Jan · May",
    tuition: "US$20,000–60,000",
    funds: "I-20 total cost",
    postStudy: "OPT / STEM OPT",
  },
  {
    name: "Canada",
    slug: "canada",
    description:
      "Public colleges and universities, plus a post-graduation work permit for eligible graduates.",
    flagCode: "ca",
    code: "CA",
    summary: "Public colleges and universities; post-study work permit possible.",
    intakes: "Sep · Jan · May",
    tuition: "CAD 15,000–35,000",
    funds: "CAD 23,448",
    postStudy: "PGWP",
  },
  {
    name: "Australia",
    slug: "australia",
    description:
      "A large university sector with campuses in cities and regions, managed by a 2026 planning level.",
    flagCode: "au",
    code: "AU",
    summary: "Large university sector; campuses in cities and regions.",
    intakes: "Feb · Jul · Oct",
    tuition: "AUD 20,000–45,000",
    funds: "AUD 29,710",
    postStudy: "Subclass 485",
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    description:
      "A smaller university sector with structured student support and updated work rules.",
    flagCode: "nz",
    code: "NZ",
    summary: "Smaller sector with structured student support.",
    intakes: "Feb · Jul",
    tuition: "NZ$22,000–35,000",
    funds: "NZ$20,000/year",
    postStudy: "Post-study work visa",
  },
  {
    name: "Germany",
    slug: "germany",
    description:
      "Low or no tuition at many public universities, with a blocked account for living costs.",
    flagCode: "de",
    code: "DE",
    summary: "Low or no tuition at many public universities.",
    intakes: "Oct · Apr",
    tuition: "Mostly low or none*",
    funds: "€11,904 blocked account",
    postStudy: "18-month job search",
  },
  {
    name: "Europe",
    slug: "europe",
    description:
      "Many countries with different rules. Start with a country, not a continent.",
    flagCode: "eu",
    code: "EU",
    summary: "Many countries, different rules — start with Germany.",
    intakes: "Varies by country",
    tuition: "Varies by country",
    funds: "Varies by country",
    postStudy: "Varies by country",
    hub: true,
  },
  {
    name: "Japan",
    slug: "japan",
    description:
      "Language-first routes, with part-time work allowed by permission.",
    flagCode: "jp",
    code: "JP",
    summary: "Language-first routes; part-time work allowed with permission.",
    intakes: "Apr · Oct",
    tuition: "Set by your school",
    funds: "Set by your school",
    postStudy: "Rules vary",
  },
];

export const studyDestinations: Country[] = countries;
export const homeDestinations: Country[] = countries.filter((country) => !country.hub);

// Germany has no dedicated photo set; it reuses the Europe image.
const PHOTO_SLUGS: Record<string, string> = { germany: "europe" };
export const countryPhotoSlug = (slug: string) => PHOTO_SLUGS[slug] ?? slug;
