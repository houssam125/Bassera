import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** /robots.txt — let search engines crawl everything and point them to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
