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

      // ✅ Root → basePath SEO files
      {
        source: "/robots.txt",
        destination: "/cleancut/robots.txt",
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
        source: "/feed.xml",
        destination: "/cleancut/feed",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
