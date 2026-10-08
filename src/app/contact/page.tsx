import ContactClient from "./ContactClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Visit Our Kathmandu Office",
  description: "Visit Reasons Education at Indreni Complex, New Baneshwor. Book a free study abroad counselling session. Call 01-5316680, WhatsApp 9801085977 or email info@reasons.edu.np.",
  path: "/contact",
});

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
