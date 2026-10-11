"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHero from "@/components/PageHero";
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
      <PageHero
        tone="paper"
        variant="editorial"
        crumbs={[{ name: "Blog" }]}
        eyebrow="Blog & insights"
        title={<>Guides and advice <em>straight from our team.</em></>}
        intro="Expert insights, comprehensive guides, and the latest tips to help you navigate and succeed in your international education journey."
        aside={searchField}
      />

      <section className="py-16">
        <div className="container-custom">
          <p className="text-sm font-semibold text-muted mb-8" aria-live="polite">
            {query.trim()
              ? `${results.length} ${results.length === 1 ? "article" : "articles"} matching "${query.trim()}"`
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
                Try a different keyword such as &ldquo;IELTS&rdquo;, &ldquo;visa&rdquo;, &ldquo;SOP&rdquo; or &ldquo;Canada&rdquo;.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogExplorer;
