import { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
<<<<<<< HEAD
      disallow: ["/admin", "/admin.html", "/api/"],
=======
      // The staff portal is deliberately absent from robots.txt so its path is not advertised.
      disallow: ["/api/"],
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
