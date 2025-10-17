import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "ac.goit.global"], // 👈 added here
  },
  async headers() {
    return [
      {
        source: "/notes/filter/:slug",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
