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

      // ✅ RSS: keep /feed.xml as the public URL, but serve from /feed
      {
        source: "/feed.xml",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
