/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['v5.airtableusercontent.com', 'neighborhood.hackclub.dev'],
  },
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 