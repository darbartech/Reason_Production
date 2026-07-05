import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reasons.edu.np";

  const posts = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const countries = [
    "usa",
    "canada",
    "uk",
    "australia",
    "new-zealand",
    "europe",
    "japan",
  ];

  const countryRoutes = countries.map((country) => ({
    url: `${baseUrl}/countries/${country}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const routes = [
    { path: "", priority: 1.0, changeFreq: "daily" },
    { path: "/about", priority: 0.8, changeFreq: "monthly" },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" },
    { path: "/services", priority: 0.9, changeFreq: "weekly" },
    { path: "/b2b", priority: 0.7, changeFreq: "monthly" },
    { path: "/study-abroad", priority: 0.95, changeFreq: "weekly" },
    { path: "/ielts", priority: 0.95, changeFreq: "weekly" },
    { path: "/faq", priority: 0.8, changeFreq: "monthly" },
    { path: "/blog", priority: 0.85, changeFreq: "weekly" },
    { path: "/countries", priority: 0.9, changeFreq: "monthly" },
    { path: "/privacy", priority: 0.5, changeFreq: "yearly" },
    { path: "/terms", priority: 0.5, changeFreq: "yearly" },
  ].map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq as any,
    priority,
  }));

  return [...routes, ...countryRoutes, ...posts];
}
