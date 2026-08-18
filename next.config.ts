import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tvinside", destination: "/tvin", permanent: true },
      { source: "/tvoutside", destination: "/tvout", permanent: true },
    ];
  },
};

export default nextConfig;
