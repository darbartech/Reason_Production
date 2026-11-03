export interface Testimonial {
  name: string;
  destination: string;
  /** Only add once the student or the offer letter confirms it. */
  institution?: string;
  programme?: string;
  intake?: string;
  outcome?: string;
  quote: string;
  image: string;
  consent: boolean;
  proofUrl?: string;
}

// Owner confirmation of written consent is still required before any of these
// render publicly. Set consent to true only when the signed form is on file.
export const featuredTestimonial: Testimonial = {
  name: "Aryan Dev Acchami",
  destination: "Canada",
  intake: "Fall 2024",
  outcome: "Study permit approved · Concordia University",
  quote:
    "They were honest about which programmes I could actually get into and walked me through every question IRCC asked for.",
  image: "/students/aryan.jpg",
  consent: false,
};

export const testimonials: Testimonial[] = [
  {
    name: "Sristi Thapa",
    destination: "United Kingdom",
    intake: "January 2025",
    outcome: "CAS issued · University of Leeds",
    quote:
      "Transparent, professional. They checked every part of my UK application before it was sent in.",
    image: "/students/sristi.jpg",
    consent: false,
  },
  {
    name: "Barsa Sharma",
    destination: "Australia",
    quote:
      "I joined the IELTS class at Reasons first and got the band I needed; then they handled my Australian admission start to finish.",
    image: "/students/barsa.jpg",
    consent: false,
  },
  {
    name: "Sarana Pradhan",
    destination: "Japan",
    quote:
      "The Japan visa process is complex. They knew exactly which documents were needed at each stage.",
    image: "/students/sarana.jpg",
    consent: false,
  },
];

export const consentedTestimonials = testimonials.filter((t) => t.consent);
export const featuredConsented = featuredTestimonial.consent ? featuredTestimonial : null;
