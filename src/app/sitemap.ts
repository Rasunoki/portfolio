import type { MetadataRoute } from "next";
import { site, sections } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Single-page site: surface the in-page sections as anchors so crawlers
    // can deep-link to them from search results.
    ...sections.map((s) => ({
      url: `${site.url}/#${s.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
