import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guitar.apextechpro.com",
      },
    ],
  },
};

export default nextConfig;
