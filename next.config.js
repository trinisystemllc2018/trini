/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: "/fix",
        destination: "/printer-support",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
