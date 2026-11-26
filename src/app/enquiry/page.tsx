import EnquiryClient from "./EnquiryClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Enquiry — Reasons Education",
  description:
    "Share your name, contact details, preferred destination and study level. A Reasons Education counsellor will get back to you.",
  path: "/enquiry",
  noindex: true,
});

const EnquiryPage = () => {
  return <EnquiryClient />;
};

export default EnquiryPage;
