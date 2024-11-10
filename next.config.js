/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      'www.notion.so',
      'images.unsplash.com',
      'api.microlink.io'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        port: '',
        pathname: '/**',
      },
    ]
  },
}

module.exports = nextConfig 