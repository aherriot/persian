const request = require('superagent')
// const expect = require('chai').expect
const jwt = require('jsonwebtoken')

const config = require('../config')
const codes = require('../utils/codes')

const USERS_URL = `localhost:${config.PORT}/api/users/`
const USERNAME = 'test_user'
const PASSWORD = 'password'
const EMAIL = 'test@test.com'

describe('User API', function() {
  describe('Create new user', function() {
    it('error on missing username', function(done) {
      request
        .post(USERS_URL)
        .send({})
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on missing password', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('passwordMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on missing email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('emailMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on short username', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'a', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameLength')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on long username', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'abcdefghijklm', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameLength')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on username with non-latin characters', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'سیب', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameInvalid')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on username with both latin and non-latin characters', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'سیبtest', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameInvalid')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on invalid email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD, email: 'invalid' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('emailInvalid')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('success on creating user', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.status).toEqual(200)
          expect(resp.body.token).toBeDefined()
          done()
        })
    })

    it('error on duplicate email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'unique', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).toBeDefined()
          // console.log(err)
          expect(err.response.body.code).toEqual('emailDuplicate')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on email differing only by case', function(done) {
      request
        .post(USERS_URL)
        .send({
          username: 'unique',
          password: PASSWORD,
          email: EMAIL.toUpperCase()
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('emailDuplicate')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on duplicate username', function(done) {
      request
        .post(USERS_URL)
        .send({
          username: USERNAME,
          password: PASSWORD,
          email: 'unique@test.com'
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameDuplicate')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on username differing only by case', function(done) {
      request
        .post(USERS_URL)
        .send({
          username: USERNAME.toUpperCase(),
          password: PASSWORD,
          email: 'unique@test.com'
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameDuplicate')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })
  })

  describe('Log in', function() {
    it('error on missing username', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('usernameMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on missing password', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('passwordMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on wrong username', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: 'wrong', password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('invalidAuthentication')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on wrong password', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME, password: 'wrong' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('invalidAuthentication')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('success on login', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME, password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.status).toEqual(200)
          expect(resp.body.token).toBeDefined()
          global.testUserToken = resp.body.token
          global.testUserId = jwt.decode(resp.body.token)._id
          done()
        })
    })

    it('success on login with capitalized username', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME.toUpperCase(), password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.status).toEqual(200)
          expect(resp.body.token).toBeDefined()
          done()
        })
    })

    it('success on admin login', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: 'admin', password: PASSWORD })
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.status).toEqual(200)
          expect(resp.body.token).toBeDefined()
          global.adminToken = resp.body.token
          done()
        })
    })
  })

  describe('Change password', function() {
    it('error on wrong user', function(done) {
      request
        .put(USERS_URL + global.testUserId + '/password')
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({ password: 'password', newPassword: 'temppassword' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('userWrong')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on missing password field', function(done) {
      request
        .put(USERS_URL + global.testUserId + '/password')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({ newPassword: 'temppassword' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('passwordMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on missing newPassword field', function(done) {
      request
        .put(USERS_URL + global.testUserId + '/password')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({ password: 'password' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('newPasswordMissing')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('error on wrong password', function(done) {
      request
        .put(USERS_URL + global.testUserId + '/password')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({ password: 'wrong', newPassword: 'temppassword' })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('unauthorized')
          expect(err.response.body.message).toBeDefined()
          done()
        })
    })

    it('success on changing password', function(done) {
      request
        .put(USERS_URL + global.testUserId + '/password')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({ password: 'password', newPassword: 'temppassword' })
        .end((err, resp) => {
          expect(err).toBeNull()
          // expect(err.response.body.code).toEqual('unauthorized')
          expect(resp.body.success).toEqual(true)
          done()
        })
    })
  })

  describe('Edit user', function() {})

  describe('Refresh token', function() {})

  describe('Get list of users', function() {})
})

// After all tests have run, delete test user
// afterAll(function(done) {
//   request
//     .delete(USERS_URL + '/' + global.testUserId)
//     .set('Authorization', 'Bearer ' + global.testUserToken)
//     .end((err, resp) => {
//       console.log('error', err)
//       expect(err).toBeNull()
//       expect(resp.status).toEqual(200)
//       done()
//     })
// })
