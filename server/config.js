module.exports = {
  // MongoDB connection strings
  PRODUCTION_CONNECTION: 'mongodb://persian:c6dkf7U2ssgJ@10.128.0.2/persian',
  DEVELOPMENT_CONNECTION: 'mongodb://localhost/persian',
  TEST_CONNECTION: 'mongodb://localhost/persianTest',

  // What port should the webserver listen on
  PORT: 3001,

  // JSON web token secret key
  JWT_SECRET: 'P4#@Wja(eEe?FpmU>H9d6F*wvhUw8q',

  JWT_EXPIRY: 86400 * 7, // 7 days

  // bcrypt difficulty
  SALT_WORK_FACTOR: 10
}
