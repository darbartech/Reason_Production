import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import CTA from "@/components/CTA";
import BlogCard from "@/components/BlogCard";
import { Search } from "lucide-react";

export const metadata = {
  title: "Latest Study Abroad Blogs & News | Reason Education",
  description: "Stay updated with the latest news, guides, and success stories about studying abroad from Nepal. Expert insights from Reason Education Consultancy.",
  alternates: {
    canonical: "/blog",
  },
};

const BlogPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center pt-24 pb-16 lg:pt-32 overflow-hidden bg-primary text-white">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] bg-secondary/10 rounded-full blur-[100px] opacity-20" />
          
          {/* Grid Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                Stay Informed, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-600 relative inline-block">
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
