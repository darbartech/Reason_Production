import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import CTA from "@/components/CTA";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const title = `${post.title} | Study Abroad Blog | Reason Education`;
  const description = post.excerpt;
  const url = `https://studynepal.edu.np/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const url = `https://studynepal.edu.np/blog/${post.slug}`;
  const title = post.title;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary pt-24 pb-16 lg:pt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <Link href="/blog" className="inline-flex items-center text-accent font-bold mb-6 hover:-translate-x-2 transition-transform" aria-label="Back to Blog">
              <ArrowLeft className="mr-2" size={18} /> Back to Blog
           </Link>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
             {post.title}
           </h1>
           <div className="flex items-center justify-center space-x-6 text-xs text-white/60 font-bold uppercase tracking-widest">
              <div className="flex items-center"><Calendar size={16} className="mr-1.5 text-accent" /> {post.date}</div>
              <div className="flex items-center"><User size={16} className="mr-1.5 text-accent" /> {post.author}</div>
              <div className="flex items-center"><Tag size={16} className="mr-1.5 text-accent" /> {post.category}</div>
           </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
              <Image
                src={post.image}
                alt={`Cover image for ${post.title} - Study Abroad Reason Education`}
                fill
                priority
                className="absolute inset-0 w-full h-full object-cover"
              />
           </div>

           <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Share Sidebar (Desktop) */}
              <aside className="hidden lg:block lg:col-span-1">
                 <div className="sticky top-24 space-y-4">
                    <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest vertical-text mb-2 block">Share</span>
                    {[
                      { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: "Facebook" },
                      { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, label: "Twitter" },
                      { Icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, label: "Linkedin" },
                      { Icon: MessageCircle, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, label: "WhatsApp" }
                    ].map(({ Icon, href, label }, i) => (
                      <a 
                        key={i} 
                        href={href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/5 p-3 rounded-xl text-primary hover:bg-accent hover:text-white transition-all flex items-center justify-center" 
                        aria-label={`Share on ${label}`}
                      >
                         <Icon size={18} />
                      </a>
                    ))}
                 </div>
              </aside>

              {/* Post Content */}
              <div className="lg:col-span-11 prose prose-lg prose-primary max-w-none text-primary/80 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>
           </div>

           {/* Author Bio */}
           <div className="mt-16 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                 <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop"
                    alt={`Portrait of ${post.author} - Senior Counselor at Reason Education`}
                    width={96}
                    height={96}
                    className="absolute inset-0 w-full h-full object-cover"
                 />
              </div>
              <div className="text-center sm:text-left">
                 <h4 className="text-xl font-bold text-primary mb-1">About {post.author}</h4>
                 <p className="text-sm text-primary/70 leading-relaxed font-medium">
                   {post.author} is a Senior Counselor at Reason Education Consultancy with years of experience in helping students achieve their study abroad dreams.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default BlogPostPage;
