import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Facebook, Linkedin, MessageCircle, Tag, Twitter, User } from "lucide-react";
import CTA from "@/components/CTA";
import { Breadcrumbs, JsonLd } from "@/components/Schema";
import { blogPosts } from "@/lib/blog-data";
import { sanitizeBlogContent } from "@/lib/blog-sanitize";
import { company } from "@/lib/company";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

const findPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = findPost(params.slug);
  if (!post) return {};

  const url = `${company.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: company.displayName,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.dateISO,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = findPost(params.slug);

  if (!post) notFound();

  const url = `${company.url}/blog/${post.slug}`;
  const content = sanitizeBlogContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${company.url}${post.image.src}`,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${company.url}/#organization` },
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const shareLinks = [
    { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: "Facebook" },
    { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`, label: "Twitter" },
    { Icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`, label: "LinkedIn" },
    { Icon: MessageCircle, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${url}`)}`, label: "WhatsApp" },
  ];

  return (
    <div className="bg-white">
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />

      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/2" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-accent-light font-bold mb-6 hover:-translate-x-1 transition-transform"
            >
              <ArrowLeft className="mr-2" size={18} aria-hidden="true" /> All articles
            </Link>

            <h1 className="text-white mb-6 text-balance">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60 font-bold uppercase tracking-widest">
              <span className="inline-flex items-center">
                <Calendar size={16} className="mr-1.5 text-accent-light" aria-hidden="true" />
                <time dateTime={post.dateISO}>{post.date}</time>
              </span>
              <span className="inline-flex items-center">
                <User size={16} className="mr-1.5 text-accent-light" aria-hidden="true" /> {post.author}
              </span>
              <span className="inline-flex items-center">
                <Tag size={16} className="mr-1.5 text-accent-light" aria-hidden="true" /> {post.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <figure className="mb-12 overflow-hidden rounded-xl border border-line">
              <div className="relative h-48 sm:h-64">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <div className="mb-12 flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Share</span>
              <div className="flex items-center gap-3">
                {shareLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-50 p-3 rounded-xl text-primary hover:bg-accent hover:text-white transition-colors flex items-center justify-center"
                    aria-label={`Share on ${label}`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="blog-body" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </article>

      <CTA />
    </div>
  );
};

export default BlogPostPage;
