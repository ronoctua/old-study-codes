export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
};
// http://www.md5.cz/  para gerar uma string aleatória
