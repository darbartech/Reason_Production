import { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The staff portal is deliberately absent from robots.txt so its path is not advertised.
      disallow: ["/api/"],
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
