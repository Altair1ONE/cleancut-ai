import type { MetadataRoute } from "next";
import { blogPosts } from "../lib/blogPosts";
import { useCases } from "../lib/useCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xevora.org";

  const staticRoutes = [
    "",
    "/cleancut",
    "/cleancut/app",
    "/cleancut/pricing",
    "/cleancut/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/cleancut/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const useCaseRoutes = useCases.map((uc) => ({
    url: `${baseUrl}/cleancut/use-cases/${uc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...useCaseRoutes];
}
