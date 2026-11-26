import CountryPageTemplate from "@/components/CountryPageTemplate";
import { buildMetadata } from "@/lib/seo";
import { countryPages } from "@/content/countryPages";

const data = countryPages.japan;

export const metadata = buildMetadata({
  title: data.title,
  description: data.description,
  path: "/countries/japan",
  image: "/og/japan.png",
});

export default function JapanPage() {
  return <CountryPageTemplate data={data} />;
}
