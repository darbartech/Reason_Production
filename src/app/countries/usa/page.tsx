import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.usa;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/usa",
  image: "/og/usa.png",
});

export default function UsaPage() {
  return <CountryPageTemplate data={data} />;
}
