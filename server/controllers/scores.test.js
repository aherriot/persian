const request = require('superagent')
const expect = require('chai').expect

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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('missingAuthToken')
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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('directionInvalid')
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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('scoreInvalid')
          done()
        })
    })

    it('error on score above 5', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromEnglish',
          score: 6
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('scoreInvalid')
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
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordIdInvalid')
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
          expect(err).to.be.null
          done()
        })
    })

    it('success on update score fromPersian', function(done) {
      request
        .put(SCORES_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          direction: 'fromPersian',
          score: 5
        })
        .end((err, resp) => {
          expect(err).to.be.null
          done()
        })
    })
  })

  describe('Fetch scores', function() {
    it('error on fetch scores with auth token', function(done) {
      request.get(SCORES_URL).end((err, resp) => {
        expect(err).to.not.be.null
        expect(err.response.body.code).to.equal('missingAuthToken')
        done()
      })
    })

    it('success on fetch scores', function(done) {
      request
        .get(SCORES_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.lengthOf(1)
          expect(resp.body[0].fromEnglish.score).to.equal(0)
          expect(resp.body[0].fromPersian.score).to.equal(5)
          done()
        })
    })
  })
})
