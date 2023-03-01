/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",

  experimental: {

    appDir: true,
  },  images: {
    domains: ['img.freepik.com'],
  }
}

module.exports = nextConfig
