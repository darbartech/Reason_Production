import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.uk;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/uk",
  image: "/og/uk.png",
});

export default function UkPage() {
  return <CountryPageTemplate data={data} />;
}
