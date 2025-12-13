import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xevora.org/cleancut";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/pricing`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
  ];
}
