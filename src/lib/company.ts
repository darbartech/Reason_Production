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
  hours: { days: "Sun – Fri", open: "10:00", close: "17:00", label: "Sun – Fri, 10 AM – 5 PM" },
  established: 2015,
  registration: {
    authority: "",
    number: "",
    pan: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export const whatsappLink = (msg = "Hello, I'd like to ask about studying abroad.") =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(msg)}`;
