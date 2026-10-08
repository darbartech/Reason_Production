import B2bClient from "./B2bClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partnerships for Colleges & Universities",
  description: "B2B partnerships for international colleges, test centres and Nepali educational organisations. Agent agreements, articulation pathways and recruitment events.",
  path: "/b2b",
});

export default function B2bPage() {
  return <B2bClient />;
}
