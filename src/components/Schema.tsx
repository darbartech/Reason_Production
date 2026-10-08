import { company } from "@/lib/company";

const DAY_MAP = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Schema() {
  const sameAs = Object.values(company.social).filter(Boolean) as string[];

  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "ProfessionalService"],
    "@id": `${company.url}/#organization`,
    name: company.legalName,
    alternateName: company.displayName,
    url: company.url,
    logo: `${company.url}/logo/logo.png`,
    telephone: company.phoneTel,
    email: company.email,
    foundingDate: String(company.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode,
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_MAP,
        opens: company.hours.open,
        closes: company.hours.close,
      },
    ],
    areaServed: { "@type": "Country", name: "Nepal" },
    knowsAbout: [
      "Study abroad counselling",
      "IELTS preparation",
      "PTE preparation",
      "Student visa documentation",
    ],
  };

  if (sameAs.length) {
    org.sameAs = sameAs;
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: company.displayName,
    publisher: { "@id": `${company.url}/#organization` },
  };

  return <JsonLd data={[org, website]} />;
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${company.url}${it.path}`,
        })),
      }}
    />
  );
}
