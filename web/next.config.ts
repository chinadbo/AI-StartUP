import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // This enables static export for GitHub Pages
  trailingSlash: true, // Add trailing slashes to URLs for better GitHub Pages compatibility
  images: {
    unoptimized: true // Required for static exports
  },
  basePath: '/AI-StartUP', // Important: Set the base path for GitHub Pages subdirectory
  assetPrefix: '/AI-StartUP/', // Ensure assets are loaded from correct path
  env: {
    BASE_PATH: '/AI-StartUP'
  }
};

export default nextConfig;