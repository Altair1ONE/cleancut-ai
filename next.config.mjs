/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/cleancut",

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      // ✅ This MUST be basePath:false so it matches the root domain "/"
      {
        source: "/",
        destination: "/cleancut",
        permanent: true,
        basePath: false,
      },

      // Optional: if someone types root paths, send them to the basePath versions
      {
        source: "/pricing",
        destination: "/cleancut/pricing",
        permanent: true,
        basePath: false,
      },
      {
        source: "/app",
        destination: "/cleancut/app",
        permanent: true,
        basePath: false,
      },
      {
        source: "/login",
        destination: "/cleancut/login",
        permanent: true,
        basePath: false,
      },
      {
        source: "/signup",
        destination: "/cleancut/signup",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
