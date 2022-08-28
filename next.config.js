/** @type {import('next').NextConfig} */

module.exports = {
  unstable_runtimeJS: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true }
  },

  images: {
    domains: ['image/png', 'image/webp', 'cdn.britannica.com']
  }
};
