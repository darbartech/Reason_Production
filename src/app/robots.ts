import { MetadataRoute } from "next";
import { company } from "@/lib/company";

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
