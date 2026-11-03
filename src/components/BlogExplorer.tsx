"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import { blogCategories, blogPosts } from "@/lib/blog-data";

const availableCategories = blogCategories.filter((category) =>
  blogPosts.some((post) => post.category === category)
);

const BlogExplorer = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (!needle) return true;
      return [post.title, post.excerpt, post.quickAnswer, post.category, post.author]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, category]);

  const searchField = (
    <div>
      <label htmlFor="blog-search" className="block text-sm font-medium text-primary mb-2">
        Search articles
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
          <Search size={18} aria-hidden="true" />
        </div>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for articles, guides..."
          aria-label="Search articles"
          className="w-full h-12 px-4 pl-11 rounded-xl border border-line bg-white text-primary placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-accent text-base focus:outline-none"
        />
      </div>
    </div>
  );

  return (
    <>
<<<<<<< HEAD
      <section className="bg-primary pt-12 pb-14 lg:pt-16 text-white">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-white mb-5 text-[clamp(2.35rem,1.4rem+2.8vw,3.75rem)]">Guides for Nepali students</h1>

              <p className="text-lg md:text-xl text-white/60 mb-7 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Short, dated guides. Each one says when it was last checked.
              </p>

              <div className="relative max-w-md mx-auto lg:mx-0 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/40 group-focus-within:text-accent transition-colors">
                  <Search size={18} aria-hidden="true" />
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search guides..."
                  aria-label="Search guides"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-colors font-medium text-sm"
                />
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="relative aspect-[4/3] rounded-b-xl rounded-t-[999px] overflow-hidden shadow-lg border border-line bg-white">
                <Image
                  src="/images/photos/blog-hero-1200.webp"
                  alt="Books and handwritten study notes in a library"
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
=======
      <PageHero
        tone="paper"
        variant="editorial"
        crumbs={[{ name: "Blog" }]}
        eyebrow="Blog & insights"
        title={<>Guides and advice <em>straight from our team.</em></>}
        intro="Expert insights, comprehensive guides, and the latest tips to help you navigate and succeed in your international education journey."
        aside={searchField}
      />
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

      <section className="py-12 lg:py-14">
        <div className="container-custom">
<<<<<<< HEAD
          <h2 className="sr-only">All guides</h2>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {["All", ...availableCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    category === item
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-primary hover:border-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-sm font-semibold text-muted" aria-live="polite">
              {query.trim()
                ? `${results.length} ${results.length === 1 ? "guide" : "guides"} matching “${query.trim()}”`
                : `${results.length} ${results.length === 1 ? "guide" : "guides"}`}
            </p>
          </div>
=======
          <p className="text-sm font-semibold text-muted mb-8" aria-live="polite">
            {query.trim()
              ? `${results.length} ${results.length === 1 ? "article" : "articles"} matching "${query.trim()}"`
              : `${blogPosts.length} articles`}
          </p>
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e

          {results.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-paper px-6 py-16 text-center">
              <h2 className="mb-3">No guides found</h2>
              <p className="mx-auto text-muted">
<<<<<<< HEAD
                Try a different keyword such as “IELTS”, “funds”, “SOP” or “Canada”.
=======
                Try a different keyword such as &ldquo;IELTS&rdquo;, &ldquo;visa&rdquo;, &ldquo;SOP&rdquo; or &ldquo;Canada&rdquo;.
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogExplorer;
