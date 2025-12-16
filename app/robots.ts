import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    host: "https://xevora.org",
    sitemap: "https://xevora.org/cleancut/sitemap.xml",
  };
}
