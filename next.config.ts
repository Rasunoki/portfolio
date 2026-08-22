import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project cards derive their thumbnails from YouTube's static image host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
