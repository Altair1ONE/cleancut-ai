/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/cleancut",

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/cleancut",
        permanent: true,
        basePath: false,
      },

      {
        source: "/feed.xml",
        destination: "/cleancut/feed",
        permanent: true,
        basePath: false,
      },

      {
        source: "/sitemap.xml",
        destination: "/cleancut/sitemap.xml",
        permanent: true,
        basePath: false,
      },

      {
        source: "/robots.txt",
        destination: "/cleancut/robots.txt",
        permanent: true,
        basePath: false,
      },
    ];
  },

  // ✅ Add: root SEO assets should resolve even with basePath
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/cleancut/favicon.ico" },
      { source: "/apple-touch-icon.png", destination: "/cleancut/apple-touch-icon.png" },
      { source: "/manifest.webmanifest", destination: "/cleancut/manifest.webmanifest" },
      { source: "/icon-192.png", destination: "/cleancut/icon-192.png" },
      { source: "/icon-512.png", destination: "/cleancut/icon-512.png" },
    ];
  },
};

export default nextConfig;
