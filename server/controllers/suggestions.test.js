const request = require('superagent')
const expect = require('chai').expect

const config = require('../config')
// const codes = require('../utils/codes')

const SUGGESTIONS_URL = `localhost:${config.PORT}/api/suggestions/`
let testSuggestionId

describe('Suggestion API', function() {
  describe('Add suggestion', function() {
    it('error without auth token', function(done) {
      request
        .post(SUGGESTIONS_URL)
        .send({
          english: 'pear'
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('missingAuthToken')
          done()
        })
    })

    it('success on add suggestion without word reference', function(done) {
      request
        .post(SUGGESTIONS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          english: 'pear'
        })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.property('_id')
          expect(resp.body).to.have.property('english')

          done()
        })
    })

    it('success on add suggestion with word reference', function(done) {
      request
        .post(SUGGESTIONS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          persian: 'test',
          wordId: global.testWordId
        })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.property('_id')
          expect(resp.body).to.have.property('persian')
          done()
        })
    })

    it('success on admin add suggestion', function(done) {
      request
        .post(SUGGESTIONS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          phonetic: 'adminSuggestion',
          wordId: global.testWordId
        })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.property('_id')
          expect(resp.body).to.have.property('phonetic')
          done()
        })
    })
  })

  describe('Fetch suggestions', function() {
    it('error on fetch suggestions without auth token', function(done) {
      request.get(SUGGESTIONS_URL).end((err, resp) => {
        expect(err).to.not.be.null
        expect(err.response.body.code).to.equal('missingAuthToken')
        done()
      })
    })

    it('success on fetch suggestions', function(done) {
      request
        .get(SUGGESTIONS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.lengthOf(2)
          testSuggestionId = resp.body[1]._id
          done()
        })
    })

    it('error on user fetching all suggestions', function(done) {
      request
        .get(SUGGESTIONS_URL + 'all')
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).to.not.be.null
          // expect(err)
          done()
        })
    })

    it('success on admin fetching all suggestions', function(done) {
      request
        .get(SUGGESTIONS_URL + 'all')
        .set('Authorization', 'Bearer ' + global.adminToken)
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.lengthOf(3)
          done()
        })
    })
  })

  describe('Delete suggestion', function() {
    it('error on delete suggestions without auth token', function(done) {
      request.delete(SUGGESTIONS_URL + testSuggestionId).end((err, resp) => {
        expect(err).to.not.be.null
        expect(err.response.body.code).to.equal('missingAuthToken')
        done()
      })
    })

    it('success on admin delete suggestion', function(done) {
      request
        .delete(SUGGESTIONS_URL + testSuggestionId)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.status).to.equal(200)
          done()
        })
    })
  })
})
