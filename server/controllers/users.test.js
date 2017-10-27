const request = require('superagent')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')

const config = require('../config')
const codes = require('../utils/codes')

const USERS_URL = `localhost:${config.PORT}/api/users/`
const USERNAME = 'test_user'
const PASSWORD = 'password'
const EMAIL = 'test@test.com'

before(function(done) {
  // it('responds to / with the index.html', function(done) {
  request.get(`localhost:${config.PORT}`).end((err, resp) => {
    done()
  })
  // })
})

describe('User API', function() {
  describe('Create new user', function() {
    it('error on missing username', function(done) {
      request
        .post(USERS_URL)
        .send({})
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('usernameMissing')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on missing password', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('passwordMissing')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on missing email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('emailMissing')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on short username', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'a', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('usernameLength')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on long username', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'abcdefghijklm', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('usernameLength')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on invalid email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD, email: 'invalid' })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('emailInvalid')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('success on creating user', function(done) {
      request
        .post(USERS_URL)
        .send({ username: USERNAME, password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.status).to.equal(200)
          expect(resp.body.token).to.exist
          done()
        })
    })

    it('error on duplicate email', function(done) {
      request
        .post(USERS_URL)
        .send({ username: 'unique', password: PASSWORD, email: EMAIL })
        .end((err, resp) => {
          expect(err).to.not.be.null
          // console.log(err)
          expect(err.response.body.code).to.equal('emailDuplicate')
          expect(err.response.body.message).to.have.lengthOf.above(0)
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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('usernameDuplicate')
          expect(err.response.body.message).to.have.lengthOf.above(0)
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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('usernameMissing')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on missing password', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('passwordMissing')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on wrong username', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: 'wrong', password: PASSWORD })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('invalidAuthentication')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('error on wrong password', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME, password: 'wrong' })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('invalidAuthentication')
          expect(err.response.body.message).to.have.lengthOf.above(0)
          done()
        })
    })

    it('success on login', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: USERNAME, password: PASSWORD })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.status).to.equal(200)
          expect(resp.body.token).to.exist
          global.testUserToken = resp.body.token
          global.testUserId = jwt.decode(resp.body.token)._id
          done()
        })
    })

    it('success on admin login', function(done) {
      request
        .post(USERS_URL + 'login')
        .send({ username: 'admin', password: PASSWORD })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.status).to.equal(200)
          expect(resp.body.token).to.exist
          global.adminToken = resp.body.token
          done()
        })
    })
  })

  describe('Change password', function() {
    //   it('error on wrong password', function(done) {
    //     request
    //       .put(USERS_URL + global.testUserId + '/password')
    //       .set('Authorization', 'Bearer ' + global.testUserToken)
    //       .send({ password: 'wrong', newPassword: 'temppassword' })
    //       .end((err, resp) => {
    //         expect(err).to.not.be.null
    //         expect(err.response.body.code).to.equal('invalidAuthentication')
    //         expect(err.response.body.message).to.have.lengthOf.above(0)
    //         done()
    //       })
    //   })
  })

  describe('Edit user', function() {})

  describe('Refresh token', function() {})

  describe('Get list of users', function() {})
})

// After all tests have run, delete test user
after(function(done) {
  request
    .delete(USERS_URL + '/' + testUserId)
    .set('Authorization', 'Bearer ' + global.testUserToken)
    .end((err, resp) => {
      expect(err).to.be.null
      expect(resp.status).to.equal(200)
      done()
    })
})
