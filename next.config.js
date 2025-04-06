/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This helps prevent the window is not defined error
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
