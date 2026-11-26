import BlogExplorer from "@/components/BlogExplorer";
import CTA from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad Guides for Nepali Students | Reasons Blog",
  description:
    "Practical, dated guides on visas, proof of funds, IELTS and SOPs for Nepali students, written and reviewed by our counsellors.",
  path: "/blog",
});

const BlogPage = () => {
  return (
    <div className="bg-white">
      <BlogExplorer />
      <CTA />
    </div>
  );
};

export default BlogPage;
