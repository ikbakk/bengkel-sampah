/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["akcdn.detik.net.id"],
  },
  reactStrictMode: true,
  env: {
    BASEURL: process.env.BASEURL,
  },
};

module.exports = nextConfig;
