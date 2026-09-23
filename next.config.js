const path = require('path')

module.exports = {
  output: 'export',
  // Emit `blog/index.html` instead of `blog.html` so clean URLs like /blog
  // resolve on GitHub Pages' static file server
  trailingSlash: true,
  // Uncomment when deploying to a *project* page (https://<user>.github.io/<repo>/):
  // basePath: '/My_Web_Portfolio',
  // GitHub Pages has no Next image optimizer — serve images as-is
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