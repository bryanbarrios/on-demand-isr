/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
