"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-data";

const BlogExplorer = () => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return blogPosts;

    return blogPosts.filter((post) =>
      [post.title, post.excerpt, post.category, post.author]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <>
      <section className="min-h-[65vh] flex items-center pt-24 pb-16 lg:pt-32 bg-primary text-white">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-white mb-6">
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
                  <Search size={18} aria-hidden="true" />
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for articles, guides..."
                  aria-label="Search articles"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-colors font-medium text-sm"
                />
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative aspect-square rounded-b-xl rounded-t-[999px] overflow-hidden shadow-lg border border-line bg-white">
                <Image
                  src="/images/blog/blog-hero-books.webp"
                  alt="Open books and handwritten study notes in a library"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <p className="text-sm font-semibold text-muted mb-8" aria-live="polite">
            {query.trim()
              ? `${results.length} ${results.length === 1 ? "article" : "articles"} matching “${query.trim()}”`
              : `${blogPosts.length} articles`}
          </p>

          {results.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-paper px-6 py-16 text-center">
              <h2 className="mb-3">No articles found</h2>
              <p className="mx-auto text-muted">
                Try a different keyword such as “IELTS”, “visa”, “SOP” or “Canada”.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogExplorer;
