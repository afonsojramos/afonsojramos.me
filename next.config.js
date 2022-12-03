// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'upload.wikimedia.org']
  },
  trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true
};

module.exports = nextConfig;
