export type CourseArea = {
  slug: string;
  name: string;
  summary: string;
  /** Country slugs used for the guide links. */
  countries: string[];
};

// Subject areas we advise on. Only add a popularity claim if the owner confirms it.
export const courseAreas: CourseArea[] = [
  {
    slug: "business",
    name: "Business & management",
    summary:
      "Business, finance, marketing and management pathways, including pre-master's routes where your degree subject does not match.",
    countries: ["uk", "australia", "canada", "usa"],
  },
  {
    slug: "it",
    name: "IT & computing",
    summary:
      "Computing, data, cybersecurity and information systems courses. Entry requirements differ between research and applied programmes.",
    countries: ["usa", "canada", "australia", "japan"],
  },
  {
    slug: "engineering",
    name: "Engineering",
    summary:
      "Civil, mechanical, electrical and software engineering pathways. We compare course structure and entry requirements.",
    countries: ["canada", "australia", "europe", "japan"],
  },
  {
    slug: "health",
    name: "Health & sciences",
    summary:
      "Nursing, public health, biomedical science and laboratory courses. Registration and placement rules vary by country.",
    countries: ["uk", "australia", "new-zealand", "canada"],
  },
  {
    slug: "hospitality",
    name: "Hospitality & tourism",
    summary:
      "Hotel management, tourism and event management courses, including programmes with placement components.",
    countries: ["australia", "new-zealand", "europe"],
  },
  {
    slug: "design",
    name: "Design & creative arts",
    summary:
      "Design, media, architecture and creative arts. Portfolio requirements vary by course and institution.",
    countries: ["uk", "europe", "japan", "australia"],
  },
];
