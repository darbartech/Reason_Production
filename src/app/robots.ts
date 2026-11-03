import { MetadataRoute } from "next";
import { company } from "@/lib/company";

// Static export: metadata routes must be explicitly static in Next 16.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin.html", "/api/"],
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
