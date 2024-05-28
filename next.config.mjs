/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.robohash.org',
      },
    ],
  },
};

export default nextConfig;
