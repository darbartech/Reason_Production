export const company = {
  legalName: "Reasons Education Foundation",
  displayName: "Reasons Education",
  descriptor: "Education Consultancy",
  tagline: "Study abroad counselling · IELTS & PTE",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reasons.edu.np",
  phoneDisplay: "01-5316680",
  phoneTel: "+97715316680",
  whatsappNumber: "9779801085977",
  email: "info@reasons.edu.np",
  address: {
    street: "Indreni Complex, New Baneshwor",
    city: "Kathmandu",
    postalCode: "44600",
    country: "Nepal",
  },
  geo: { lat: 27.6915, lng: 85.3331 },
  hours: { days: "Sun – Fri", open: "7:00", close: "17:00", label: "Sun – Fri, 7 AM – 6 PM" },
  established: 2015,
  registration: {
    authority: "",
    number: "",
    pan: "",
  },
  // Publish the licence line only once the owner supplies the number and authority.
  licence: {
    authority: "",
    number: "",
    validUntil: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    googleBusiness: "",
  },
} as const;

export const LAST_CHECKED = "2 Nov 2026";
export const LAST_CHECKED_ISO = "2026-11-02";
export const REVIEWED_BY = "Reasons Education counselling team";

export const hasLicence = () => Boolean(company.licence.number);

export const licenceLine = () => {
  if (!company.licence.number) return null;
  return [
    company.licence.authority ? `Licensed by ${company.licence.authority}` : "Licensed",
    `licence no. ${company.licence.number}`,
  ].join(" · ");
};

export const whatsappLink = (msg = "Hello Reasons Education, I'd like to book a free session.") =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(msg)}`;
