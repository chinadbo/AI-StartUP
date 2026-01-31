import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // This enables static export for GitHub Pages
  trailingSlash: true, // Add trailing slashes to URLs for better GitHub Pages compatibility
  images: {
    unoptimized: true // Required for static exports
  }
};

export default nextConfig;