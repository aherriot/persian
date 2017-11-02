module.exports = {
  // MongoDB connection strings
  PRODUCTION_CONNECTION: '',
  DEVELOPMENT_CONNECTION: 'mongodb://localhost/persian',
  TEST_CONNECTION: 'mongodb://localhost/persianTest',

  // What port should the webserver listen on
  PORT: 3001,

  // JSON web token secret key
  JWT_SECRET: 'hard-to-guess-secret-key',

  JWT_EXPIRY: 86400 * 7, // 7 days

  // bcrypt difficulty
  SALT_WORK_FACTOR: 10
}
