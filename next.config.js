/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/helmimastouri',
  assetPrefix: '/helmimastouri/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;