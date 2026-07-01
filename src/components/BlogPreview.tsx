import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const BlogPreview = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="blog-heading">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-12 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
              <BookOpen size={16} aria-hidden="true" />
              <span>Resources & Insights</span>
            </div>
            <h2 id="blog-heading" className="text-3xl sm:text-4xl font-black text-primary mb-4 leading-tight">
              Latest from Our <span className="text-accent">Blog</span>
            </h2>
            <p className="text-base sm:text-lg text-primary/60 font-medium leading-relaxed">
              Stay updated with the latest study abroad trends, visa guides, and expert tips for your success.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary whitespace-nowrap group shadow-lg self-center md:self-auto">
            View All Posts <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {latestPosts.map((post, index) => (
            <article 
              key={index} 
              className="group bg-white rounded-2xl sm:rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full card-hover"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={`Cover image for blog post: ${post.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-widest border border-white/20">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-primary/50 font-bold mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-accent" aria-hidden="true" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-accent" aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-primary/60 mb-5 sm:mb-6 line-clamp-3 text-sm sm:text-base leading-relaxed font-medium">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[13px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors group/link"
                    aria-label={`Read full article: ${post.title}`}
                  >
                    Read More <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;