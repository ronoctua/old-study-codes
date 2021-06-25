const { withPlugins } = require('next-compose-plugins');
const nextPWA = require('next-pwa');

const nextConfig = {
  env: {
    APP_API_URL: process.env.APP_API_URL,
  },
};

module.exports = withPlugins(
  [
    [
      nextPWA,
      {
        pwa: {
          dest: 'public',
          register: true,
          sw: 'service-worker.js',
        },
      },
    ],
  ],
  nextConfig,
);
