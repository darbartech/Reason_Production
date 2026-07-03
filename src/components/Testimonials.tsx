import Image from "next/image";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Aryan Dev Acchami",
    destination: "Study in Canada",
    content: "The best decision I ever made was choosing Reason Education. Their team guided me through every step of my Canadian visa process, and I'm now studying at a top institution in Canada!",
    image: "/students/aryan.jpg",
    rating: 5,
  },
  {
    name: "Sristi Thapa",
    destination: "Study in UK",
    content: "Transparent, professional, and highly efficient. They handled my UK visa application with such care. I highly recommend Reason Education to any student from Nepal.",
    image: "/students/sristi.jpg",
    rating: 5,
  },
  {
    name: "Barsa Sharma",
    destination: "Study in Australia",
    content: "Reason Education's IELTS classes are top-notch. I achieved an excellent band score, and their counselor helped me secure my admission in Australia with ease.",
    image: "/students/barsa.jpg",
    rating: 5,
  },
  {
    name: "Sarana Pradhan",
    destination: "Study in Japan",
    content: "I'm so grateful for the support I received for my Japan study visa. The team was incredibly helpful and made the entire complex process seem very simple.",
    image: "/students/sarana.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-200 to-transparent"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-50 rounded-full blur-3xl pointer-events-none opacity-80"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-semibold mb-4 sm:mb-6 border border-accent-100">
            <Sparkles size={16} className="text-accent" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 sm:mb-6 leading-tight">
            Hear from Our
            <span className="text-accent"> Successful Students</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-600 leading-relaxed max-w-2xl mx-auto px-4">
            Join thousands of successful students who achieved their dreams with Reason Education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index} 
              className="group bg-gray-50/70 p-6 sm:p-8 rounded-2xl border border-gray-100 relative card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-6 sm:top-8 right-6 sm:right-8 text-accent-200 w-12 h-12 sm:w-16 sm:h-16 group-hover:text-accent-300 transition-colors pointer-events-none" aria-hidden="true" />
              
              <div className="flex items-center gap-1 mb-6 sm:mb-8" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>
              
              <blockquote className="text-primary-700 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed relative z-10 font-medium">
                "{testimonial.content}"
              </blockquote>
              
              <footer className="flex items-center gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-gray-100">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-xl group-hover:rotate-3 transition-transform flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.destination}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className="font-bold text-primary text-base sm:text-lg leading-tight not-italic block">{testimonial.name}</cite>
                  <p className="text-xs sm:text-sm text-accent font-semibold uppercase tracking-wider mt-1">{testimonial.destination}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
