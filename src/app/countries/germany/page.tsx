import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.germany;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/germany",
  image: "/og/europe.png",
});

export default function GermanyPage() {
  return <CountryPageTemplate data={data} />;
}
