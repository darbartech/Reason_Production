import ContactClient from "./ContactClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Reasons Education | Book a Free Session in Kathmandu",
  description:
    "Book a free study abroad counselling session at Indreni Complex, New Baneshwor, or reach us by phone, WhatsApp or email. Sun–Fri, 10 AM–5 PM.",
  path: "/contact",
});

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
