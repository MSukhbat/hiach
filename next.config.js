/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = withImages();
const nextConfig = {
  reactStrictMode: false,
  env: {
    ABLY_API_KEY: process.env.ABLY_API_KEY || "",
  },
};

module.exports = nextConfig;
