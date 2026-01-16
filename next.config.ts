import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dodostatic.net",
      },
      {
        protocol: "https",
        hostname: "cdn.inappstory.ru",
      },
    ],
  },
};

export default nextConfig;
