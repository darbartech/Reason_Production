import { Breadcrumbs } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import StudyAbroadClient from "./StudyAbroadClient";

export const metadata = buildMetadata({
  title: "Study Abroad from Nepal: Process & Visas",
  description: "How to study abroad from Nepal: the process, costs in NPR, English tests, visa documentation and which destinations accept Nepali students. Counselling in New Baneshwor.",
  path: "/study-abroad",
});

export default function StudyAbroadPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }]} />
      <StudyAbroadClient />
    </>
  );
}
