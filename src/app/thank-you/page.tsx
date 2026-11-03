import ThankYouClient from "./ThankYouClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You — Your Enquiry Has Been Received",
  description:
    "Your study profile has reached Reasons Education. A counselor will review it and contact you to discuss suitable study options.",
  path: "/thank-you",
  noindex: true,
});

const ThankYouPage = () => {
  return <ThankYouClient />;
};

export default ThankYouPage;
