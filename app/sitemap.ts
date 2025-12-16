import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "../lib/blogPosts";
import { useCases } from "../lib/useCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xevora.org";

  // ✅ stable timestamp so sitemap doesn't "change" every build
  const now = new Date();

  const staticRoutes = [
    "/cleancut",
    "/cleancut/app",
    "/cleancut/pricing",
    "/cleancut/blog",
    "/cleancut/use-cases",

  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/cleancut" ? 1 : 0.9,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/cleancut/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const useCaseRoutes = useCases.map((uc) => ({
    url: `${baseUrl}/cleancut/use-cases/${uc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...useCaseRoutes];
}
