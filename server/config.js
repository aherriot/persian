module.exports = {
  // What port should the webserver listen on?
  PORT: 3000,

  // JSON web token secret key
  JWT_SECRET: 'hard-to-guess-secret-key',

  JWT_EXPIRY: 86400 * 7 // 7 days

};
