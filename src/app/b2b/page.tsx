import B2bClient from "./B2bClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partner with Reasons Education | Institutions & Local Agents",
  description:
    "Work with Reasons Education: institutions seeking student recruitment in Nepal and local counsellors who want document and application support.",
  path: "/b2b",
  image: "/og/b2b.png",
});

export default function B2bPage() {
  return <B2bClient />;
}
