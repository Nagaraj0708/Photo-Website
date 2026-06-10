import type { MetadataRoute } from "next";
import { blogPosts, services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shiyarahweddings.com";
  const now  = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: base,                lastModified: now, changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`,      lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/book`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/testimonials`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const servicePaths: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPaths: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...statics, ...servicePaths, ...blogPaths];
}
