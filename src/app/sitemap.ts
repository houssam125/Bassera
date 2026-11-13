import type { MetadataRoute } from "next";
import { mediaProjects } from "@/lib/media";
import { siteUrl } from "@/lib/seo";

/** /sitemap.xml — every page, so Google finds and indexes all of them. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/media`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/tech`, changeFrequency: "monthly", priority: 0.9 },
    ...mediaProjects.map((p) => ({
      url: `${siteUrl}/media/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [`${siteUrl}${p.cover.src}`],
    })),
  ];
}
