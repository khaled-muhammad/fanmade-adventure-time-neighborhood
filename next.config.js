/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Image optimization disabled
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 