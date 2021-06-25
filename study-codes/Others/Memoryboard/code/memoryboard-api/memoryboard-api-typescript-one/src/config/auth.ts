export default {
  jwt: {
    secretRefreshToken: process.env.APP_SECRET_REFRESH_TOKEN || 'default',
    expiresInRefreshToken: '1d',
    expiresRefreshTokenDays: 1,
  },
};
