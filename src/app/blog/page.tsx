import BlogExplorer from "@/components/BlogExplorer";
import CTA from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Study Abroad Guides for Nepali Students",
  description: "Practical guides, visa tips and IELTS/PTE advice written by Reasons Education counsellors in Kathmandu for Nepali students applying abroad.",
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
