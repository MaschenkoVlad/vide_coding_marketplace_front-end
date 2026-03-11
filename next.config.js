/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@storybook/react'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
