// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/afonsojramos/**'
      }
    ]
  },
  trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true
};

module.exports = nextConfig;
