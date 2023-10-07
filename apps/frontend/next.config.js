//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const { NEXA_DOCS_URL } = process.env

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    // enable Vercel server actions
    serverActions: true,
  },
  images: {
    domains: [
      'public.blob.vercel-storage.com',
      'res.cloudinary.com',
      'avatar.vercel.sh',
      'avatars.githubusercontent.com',
      'www.google.com',
      'flag.vercel.app',
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/docs',
        destination: `${NEXA_DOCS_URL}/:path*`,
      },
      {
        source: '/docs/:path*',
        destination: `${NEXA_DOCS_URL}/docs/:path*`,
      },
    ]
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
