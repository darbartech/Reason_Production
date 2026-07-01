import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studynepal.edu.np";

  const posts = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
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
    priority: 0.8,
  }));

  const routes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/b2b",
    "/study-abroad",
    "/ielts",
    "/faq",
    "/blog",
    "/countries",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...countryRoutes, ...posts];
}
