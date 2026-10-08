import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: {
    src: string;
    alt: string;
  };
}

const BlogCard = ({ slug, title, excerpt, category, date, author, image }: BlogCardProps) => {
  return (
    <article className="group bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden card-hover">
      <Link
        href={`/blog/${slug}`}
        className="block relative h-40 overflow-hidden"
        aria-label={`Read more about ${title}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest flex items-center border border-brand-border">
          <Tag size={12} className="mr-1.5 text-accent" aria-hidden="true" /> {category}
        </span>
      </Link>
      <div className="p-8">
        <div className="flex items-center space-x-4 text-xs text-brand-text-muted font-semibold mb-4">
          <div className="flex items-center"><Calendar size={14} className="mr-1.5 text-accent" aria-hidden="true" /> {date}</div>
          <div className="flex items-center"><User size={14} className="mr-1.5 text-accent" aria-hidden="true" /> {author}</div>
        </div>
        <h3 className="text-primary mb-4 group-hover:text-accent transition-colors">
          <Link href={`/blog/${slug}`} aria-label={title}>{title}</Link>
        </h3>
        <p className="text-brand-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
        <Link href={`/blog/${slug}`} className="inline-flex items-center text-accent text-sm font-bold group-hover:translate-x-2 transition-transform" aria-label={`Read more about ${title}`}>
          Read More <ArrowRight className="ml-2" size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
