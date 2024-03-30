/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@pfpeople/lens'],
  images: {
    domains: ['media.giphy.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    return config
  },
}

module.exports = nextConfig
