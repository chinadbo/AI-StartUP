import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 使用相对路径而不是绝对路径
  assetPrefix: './',
};

export default nextConfig;