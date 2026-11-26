import { MetadataRoute } from "next";
import { company } from "@/lib/company";

<<<<<<< HEAD
=======
// Static export: metadata routes must be explicitly static in Next 16.
>>>>>>> 8974533b2dd4aabd512559da787205379fbe2dce
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
