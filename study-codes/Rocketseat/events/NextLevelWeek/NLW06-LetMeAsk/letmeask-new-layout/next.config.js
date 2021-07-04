const { withPlugins } = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          register: true,
          sw: 'service-worker.js',
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  nextConfig,
);
