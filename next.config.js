/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"], // Only run ESLint for these specified directories during production builds (next build)
  },
};

module.exports = nextConfig;
