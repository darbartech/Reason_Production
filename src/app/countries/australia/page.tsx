import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.australia;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/australia",
  image: "/og/australia.png",
});

export default function AustraliaPage() {
  return <CountryPageTemplate data={data} />;
}
