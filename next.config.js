/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',

  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'img.freepik.com',
      'img.icons8.com',
      'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com'
    ]
  },
  webpack (config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config
  }
}

// next.config.js
module.exports = {
  images: {
    domains: ['img.icons8.com']
  }
}

module.exports = nextConfig
