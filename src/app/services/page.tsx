import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Professional Study Abroad Services in Nepal | Reason Education",
  description: "Comprehensive study abroad services in Kathmandu, Nepal. Expert counseling, university admission, visa assistance, IELTS/PTE preparation, and post-arrival support.",
  keywords: [
    "study abroad services nepal",
    "education consultancy services kathmandu",
    "student visa assistance nepal",
    "ielts pte preparation kathmandu",
    "university admission help nepal",
    "study abroad counselor nepal",
  ],
  alternates: {
    canonical: "/services",
  },
};

const ServicesPage = () => {
  return <ServicesClient />;
};

export default ServicesPage;
