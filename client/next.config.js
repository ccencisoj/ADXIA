/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images:{
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
}

module.exports = nextConfig
