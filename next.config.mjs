/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/cleancut",

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      // Redirect root domain to the tool
      {
        source: "/",
        destination: "/cleancut",
        permanent: true,
      },

      // (Optional) also redirect /pricing to /cleancut/pricing if someone types it
      {
        source: "/pricing",
        destination: "/cleancut/pricing",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/cleancut/app",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/cleancut/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/cleancut/signup",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
