/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@pfpeople/lens'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'tokenbound.org',
      },
    ],
  },
  webpack: (config, context) => {
    if (!context.isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        })
      )
    }
    return config
  },
}

module.exports = nextConfig
