import { Metadata } from "next";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import CTA from "@/components/CTA";
import BlogCard from "@/components/BlogCard";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Abroad Blog",
  description: "Stay updated with the latest news, guides, and success stories about studying abroad from Nepal. Expert insights from Reason Education Consultancy.",
  keywords: [
    "study abroad blog nepal",
    "international education news",
    "student visa updates nepal",
    "ielts preparation tips",
    "reason education blog",
  ],
  authors: [{ name: "Reason Education Consultancy" }],
  creator: "Reason Education Consultancy",
  publisher: "Reason Education Consultancy",
  alternates: {
    canonical: "https://reasons.edu.np/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reasons.edu.np/blog",
    siteName: "Reason Education Consultancy",
    title: "Study Abroad Blog | Reason Education Consultancy",
    description: "Latest news, guides, and success stories about studying abroad from Nepal.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Study Abroad Blog - Reason Education Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Blog | Reason Education",
    description: "Latest news, guides, and success stories about studying abroad from Nepal.",
    images: ["https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const BlogPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[65vh] flex items-center pt-24 pb-16 lg:pt-32 bg-primary text-white">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                Stay Informed, <br />
                <span className="text-accent relative inline-block">
                  Study Smarter
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Expert insights, comprehensive guides, and the latest tips to help you navigate and succeed in your international education journey.
              </p>

              <div className="relative max-w-md mx-auto lg:mx-0 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/40 group-focus-within:text-accent transition-colors">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for articles, guides..." 
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all font-medium text-sm"
                />
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative aspect-square rounded-[2.5rem] p-3 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop"
                    alt="Latest Study Abroad Blogs & News - Educational resources at Reason Education"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
           </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default BlogPage;
