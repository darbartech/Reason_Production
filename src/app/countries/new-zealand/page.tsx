import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages["new-zealand"];

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/new-zealand",
  image: "/og/new-zealand.png",
});

export default function NewZealandPage() {
  return <CountryPageTemplate data={data} />;
}
