import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

const BlogCard = ({ slug, title, excerpt, category, image, date, author }: BlogCardProps) => {
  return (
    <article className="group bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500">
      <Link href={`/blog/${slug}`} className="block relative h-56 overflow-hidden" aria-label={`Read more about ${title}`}>
        <Image
          src={image}
          alt={`Blog post about study abroad - Reason Education`}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-accent uppercase tracking-widest flex items-center shadow-sm">
          <Tag size={12} className="mr-1.5" /> {category}
        </div>
      </Link>
      <div className="p-8">
        <div className="flex items-center space-x-4 text-xs text-primary/50 font-bold mb-4">
          <div className="flex items-center"><Calendar size={14} className="mr-1.5 text-accent" /> {date}</div>
          <div className="flex items-center"><User size={14} className="mr-1.5 text-accent" /> {author}</div>
        </div>
        <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
          <Link href={`/blog/${slug}`} aria-label={title}>{title}</Link>
        </h3>
        <p className="text-primary/70 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
        <Link href={`/blog/${slug}`} className="inline-flex items-center text-accent text-sm font-bold group-hover:translate-x-2 transition-transform" aria-label={`Read more about ${title}`}>
          Read More <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
