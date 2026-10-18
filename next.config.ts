import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Must match WIDTHS in scripts/optimize-images.mjs
    deviceSizes: [640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [160, 240, 320, 480],
  },
};

export default nextConfig;
