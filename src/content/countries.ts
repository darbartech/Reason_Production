export interface CountryImage {
  src: string;
  alt: string;
}

export interface Country {
  name: string;
  slug: string;
  description: string;
  flag: string;
  code: string;
  image: CountryImage;
}

export const countries: Country[] = [
  {
    name: "USA",
    slug: "usa",
    description:
      "Largest number of universities, cutting-edge research, and diverse scholarship opportunities.",
    flag: "🇺🇸",
    code: "US",
    image: {
      src: "/images/countries/usa-new-york-times-square-card.webp",
      alt: "Billboards and crowds in Times Square, New York City, USA",
    },
  },
  {
    name: "Canada",
    slug: "canada",
    description:
      "Post-study work permit, high-quality education, and permanent residency options for international students.",
    flag: "🇨🇦",
    code: "CA",
    image: {
      src: "/images/countries/canada-toronto-skyline-card.webp",
      alt: "Toronto skyline and Lake Ontario at sunset, Canada",
    },
  },
  {
    name: "United Kingdom",
    slug: "uk",
    description:
      "Centuries-old academic tradition, shorter degree durations, and rich cultural experiences.",
    flag: "🇬🇧",
    code: "UK",
    image: {
      src: "/images/countries/uk-london-tower-bridge-card.webp",
      alt: "Tower Bridge and the River Thames in London, United Kingdom",
    },
  },
  {
    name: "Australia",
    slug: "australia",
    description:
      "World-class universities, great lifestyle, and excellent student support services in top cities.",
    flag: "🇦🇺",
    code: "AU",
    image: {
      src: "/images/countries/australia-sydney-opera-house-card.webp",
      alt: "Sydney Opera House and harbour ferries, Australia",
    },
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    description:
      "Safe environment, world-class education system, and beautiful natural landscapes for Nepalese students.",
    flag: "🇳🇿",
    code: "NZ",
    image: {
      src: "/images/countries/new-zealand-auckland-waterfront-card.webp",
      alt: "Auckland Sky Tower and marina waterfront, New Zealand",
    },
  },
  {
    name: "Europe",
    slug: "europe",
    description:
      "Low-tuition public universities, rich heritage, and easy travel across the Schengen area.",
    flag: "🇪🇺",
    code: "EU",
    image: {
      src: "/images/countries/europe-rothenburg-old-town-card.webp",
      alt: "Historic half-timbered old town of Rothenburg ob der Tauber, Germany",
    },
  },
  {
    name: "Japan",
    slug: "japan",
    description:
      "High-tech innovation, unique culture, and affordable education with part-time job opportunities.",
    flag: "🇯🇵",
    code: "JP",
    image: {
      src: "/images/countries/japan-tokyo-street-card.webp",
      alt: "Neon-lit shopping street crossing in Tokyo, Japan",
    },
  },
];

export const studyDestinations: Country[] = countries;
