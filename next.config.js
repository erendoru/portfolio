/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.microlink.io',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      'www.notion.so'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true 
  },
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@sentry/ }
    ];

    return config;
  }
}

module.exports = nextConfig 