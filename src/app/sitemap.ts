import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { countries } from "@/content/countries";
import { landingPages } from "@/content/landing-pages";
import { company, LAST_CHECKED_ISO } from "@/lib/company";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/study-abroad",
  "/ielts",
  "/eligibility",
  "/fees",
  "/countries",
  "/b2b",
  "/blog",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

const lastChecked = new Date(LAST_CHECKED_ISO);

// Static export: metadata routes must be explicitly static in Next 16.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = staticPaths.map((path) => ({
    url: `${company.url}${path}`,
    lastModified: lastChecked,
  }));

  const countryRoutes = countries.map((country) => ({
    url: `${company.url}/countries/${country.slug}`,
    lastModified: lastChecked,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${company.url}/blog/${post.slug}`,
    lastModified: new Date(post.checkedISO),
  }));

  const landingRoutes = landingPages
    .filter((page) => page.approved)
    .map((page) => ({
      url: `${company.url}/lp/${page.slug}`,
      lastModified: lastChecked,
    }));

  return [...staticRoutes, ...countryRoutes, ...blogRoutes, ...landingRoutes];
}
