/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",

  experimental: {

    appDir: true,
  },  images: {
    domains: ['img.freepik.com',"images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com"],
  }
}

module.exports = nextConfig
