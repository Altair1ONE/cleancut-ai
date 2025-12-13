import type { MetadataRoute } from "next";

const siteUrl = "https://cleancut.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Add all important routes here
  const routes = [
    "",
    "/app",
    "/pricing",
    "/blog/remove-background-without-watermark",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
