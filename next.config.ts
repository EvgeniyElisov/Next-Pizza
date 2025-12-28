import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["media.dodostatic.net", "img.freepik.com"],
  },
};

export default nextConfig;
