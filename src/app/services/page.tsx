import ServicesClient from "./ServicesClient";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Schema";

export const metadata = buildMetadata({
  title: "Counselling, Visa & Document Services",
  description: "Study abroad counselling services at Reasons Education: university applications, SOP/LOR writing, visa documentation, IELTS/PTE and pre-departure briefings.",
  path: "/services",
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
