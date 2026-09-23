const path = require('path')

// On GitHub Pages project sites the app is served from /<repo>/ -- set
// NEXT_PUBLIC_BASE_PATH=/My_Web_Portfolio in the deploy workflow and every
// asset URL gets prefixed. Leave empty for user sites, custom domains, dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  // Emit blog/index.html instead of blog.html so clean URLs like /blog
  // resolve on GitHub Pages static file server
  trailingSlash: true,
  basePath: basePath,
  // GitHub Pages has no Next image optimizer -- serve images as-is
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
}