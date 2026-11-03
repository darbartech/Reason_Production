import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.canada;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/canada",
  image: "/og/canada.png",
});

export default function CanadaPage() {
  return <CountryPageTemplate data={data} />;
}
