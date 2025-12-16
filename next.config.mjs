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

      // RSS redirect (if you added /feed handler)
      {
        source: "/feed.xml",
        destination: "/feed",
        permanent: true,
      },

      // ✅ Root sitemap redirect for audit tools + crawlers
      {
        source: "/sitemap.xml",
        destination: "/cleancut/sitemap.xml",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
