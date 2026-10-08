import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { countries } from "@/content/countries";
import { company } from "@/lib/company";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/study-abroad",
  "/ielts",
  "/countries",
  "/b2b",
  "/blog",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date();

  const staticRoutes = staticPaths.map((path) => ({
    url: `${company.url}${path}`,
    lastModified: builtAt,
  }));

  const countryRoutes = countries.map((country) => ({
    url: `${company.url}/countries/${country.slug}`,
    lastModified: builtAt,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${company.url}/blog/${post.slug}`,
    lastModified: new Date(post.dateISO),
  }));

  return [...staticRoutes, ...countryRoutes, ...blogRoutes];
}
