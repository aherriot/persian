const request = require('superagent')
// const expect = require('chai').expect

const config = require('../config')
const codes = require('../utils/codes')

const SCORES_URL = `localhost:${config.PORT}/api/scores/`

describe('Score API', function() {
  describe('Update score', function() {
    it('error without auth token', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .send({
          direction: 'fromEnglish',
          score: 1
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('missingAuthToken')
          done()
        })
    })

    it('error on invalid direction', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'test',
          score: 1
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('directionInvalid')
          done()
        })
    })

    it('error on score below 0', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromEnglish',
          score: -1
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('scoreInvalid')
          done()
        })
    })

    it('error on score above 6', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromEnglish',
          score: 8
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('scoreInvalid')
          done()
        })
    })

    it('error on invalid word id', function(done) {
      request
        .put(SCORES_URL + '123')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromEnglish',
          score: 1
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordIdInvalid')
          done()
        })
    })

    it('success on updated score fromEnglish', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromEnglish',
          score: 0
        })
        .end((err, resp) => {
          expect(err).toBeNull()
          done()
        })
    })

    it('success on update score fromPersian', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromPersian',
          score: 6
        })
        .end((err, resp) => {
          expect(err).toBeNull()
          done()
        })
    })
  })

  describe('Fetch scores', function() {
    it('error on fetch scores with auth token', function(done) {
      request.get(SCORES_URL).end((err, resp) => {
        expect(err).toBeDefined()
        expect(err.response.body.code).toEqual('missingAuthToken')
        done()
      })
    })

    it('success on fetch scores', function(done) {
      request
        .get(SCORES_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.body).toHaveLength(1)
          expect(resp.body[0].fromEnglish.score).toEqual(0)
          expect(resp.body[0].fromPersian.score).toEqual(6)
          done()
        })
    })
  })

  describe('Fetch leaderboard', function() {
    it('success on fetching leaderboard', function(done) {
      request
        .get(`localhost:${config.PORT}/api/users/leaderboard`)
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.status).toEqual(200)
          expect(resp.body).toHaveLength(2)
          const testUser = resp.body.find(user => user.username === 'test_user')
          expect(testUser).toBeDefined()
          expect(testUser.quizzedWords).toEqual(1)
          expect(testUser.score).toEqual(6)
          done()
        })
    })
  })
})
