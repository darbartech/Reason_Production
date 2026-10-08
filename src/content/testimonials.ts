export interface Testimonial {
  name: string;
  destination: string;
  intake?: string;
  outcome?: string;
  quote: string;
  image: string;
}

export const featuredTestimonial: Testimonial = {
  name: "Aryan Dev Acchami",
  destination: "Canada",
  intake: "Fall 2024",
  outcome: "Study permit approved · Concordia University",
  quote:
    "They were honest about which programmes I could actually get into and walked me through every question IRCC asked for.",
  image: "/students/aryan.jpg",
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
  },
  {
    name: "Barsa Sharma",
    destination: "Australia",
    quote:
      "I joined the IELTS class at Reasons first and got the band I needed; then they handled my Australian admission start to finish.",
    image: "/students/barsa.jpg",
  },
  {
    name: "Sarana Pradhan",
    destination: "Japan",
    quote:
      "The Japan visa process is complex. They knew exactly which documents were needed at each stage.",
    image: "/students/sarana.jpg",
  },
];
