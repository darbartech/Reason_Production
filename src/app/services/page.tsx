import ServicesClient from "./ServicesClient";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Study Abroad Services in Kathmandu: Counselling, Visa, IELTS",
  description:
    "Counselling, applications, document checks, visa support and IELTS & PTE classes in New Baneshwor, Kathmandu. See what's included and what you bring.",
  path: "/services",
  image: "/og/services.png",
});

const ServicesPage = () => {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      <ServicesClient />
    </>
  );
};

export default ServicesPage;
