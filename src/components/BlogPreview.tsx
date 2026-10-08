import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import SectionHeader from "./SectionHeader";

const BlogPreview = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="blog-heading">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-12 gap-6">
          <SectionHeader
            eyebrow="Resources & insights"
            title={<>Guides and advice <em>straight from our team.</em></>}
            intro="The processes, rules and deadlines change every intake. We publish what we're currently seeing in the office."
            id="blog-heading"
          />
          <Link href="/blog" className="link-arrow hidden md:inline-flex self-center md:self-auto">
            All articles
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {latestPosts.map((post, i) => (
            <article
              key={post.slug}
              className={`group bg-white rounded-2xl border border-line overflow-hidden card-hover flex flex-col h-full reveal`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-paper shrink-0"
                aria-label={`Read full article: ${post.title}`}
              >
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 rounded-md bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary border border-line"
                >
                  {post.category}
                </span>
              </Link>

              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-muted font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-crimson" aria-hidden="true" />
                    <time dateTime={post.dateISO}>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-crimson" aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`} className="line-clamp-2">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-muted mb-5 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link-arrow text-sm"
                    aria-label={`Read full article: ${post.title}`}
                  >
                    Read article
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/blog" className="btn-secondary w-full justify-center group">
            All articles
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
