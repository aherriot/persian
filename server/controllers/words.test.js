const request = require('superagent')
const expect = require('chai').expect

const config = require('../config')
const codes = require('../utils/codes')

const WORDS_URL = `localhost:${config.PORT}/api/words/`

let testWordId

describe('Word API', function() {
  describe('Create new word', function() {
    it('error without auth token', function(done) {
      request
        .post(WORDS_URL)
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('missingAuthToken')
          done()
        })
    })

    it('error with invalid auth token', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + '123')
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('JsonWebTokenError')
          done()
        })
    })

    it('error using non-admin user', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('adminOnly')
          done()
        })
    })

    it('error on empty body', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('error on word without english', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          persian: 'موز',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('error on word without persian', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'banana',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('error on word without phonetic', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'banana',
          persian: 'موز',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('error on word without tags', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz'
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('error on word with invalid tags array', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz',
          tags: [1, 2]
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordInvalid')
          done()
        })
    })

    it('success on admin creating word', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'banana',
          persian: 'موز',
          phonetic: 'moz',
          tags: ['noun', 'food', 'fruit']
        })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.property('_id')
          expect(resp.body).to.have.property('english')
          expect(resp.body).to.have.property('persian')
          expect(resp.body).to.have.property('phonetic')
          global.deletedTestWordId = resp.body._id
          done()
        })
    })

    it('error on empty array of words', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send([])
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('wordArrayInvalid')
          done()
        })
    })

    it('success on creating array of words', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send([
          {
            english: 'apple',
            persian: 'سیب',
            phonetic: 'sib',
            tags: ['noun', 'food', 'fruit']
          },
          {
            english: 'orange',
            persian: 'پرتقال',
            phonetic: 'porteghaal',
            tags: ['noun', 'food', 'fruit']
          },
          {
            english: 'watermelon',
            persian: 'هندوانه',
            phonetic: 'hendavaane',
            tags: ['noun', 'food', 'fruit']
          }
        ])
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.lengthOf(3)
          global.testWordId = resp.body[0]._id
          done()
        })
    })
  })

  describe('Update existing word', function() {
    it('error without authentication', function(done) {
      request
        .put(WORDS_URL + global.deletedTestWordId)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('missingAuthToken')
          done()
        })
    })

    it('error on non-admin user token', function(done) {
      request
        .put(WORDS_URL + global.deletedTestWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('adminOnly')
          done()
        })
    })

    it('success on modify word', function(done) {
      request
        .put(WORDS_URL + global.deletedTestWordId)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body.english).to.equal('test')
          done()
        })
    })
  })

  describe('Delete word', function() {
    it('error without authentication', function(done) {
      request.delete(WORDS_URL + global.deletedTestWordId).end((err, resp) => {
        expect(err).to.not.be.null
        expect(err.response.body.code).to.equal('missingAuthToken')
        done()
      })
    })

    it('error on non-admin user token', function(done) {
      request
        .delete(WORDS_URL + global.deletedTestWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).to.not.be.null
          expect(err.response.body.code).to.equal('adminOnly')
          done()
        })
    })

    it('success on delete word', function(done) {
      request
        .delete(WORDS_URL + global.deletedTestWordId)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .end((err, resp) => {
          expect(err).to.be.null
          done()
        })
    })
  })

  describe('Fetch list of words', function() {
    it('success without authentication', function(done) {
      request.get(WORDS_URL).end((err, resp) => {
        expect(err).to.be.null
        expect(resp.body).to.have.lengthOf(3)
        done()
      })
    })

    it('success with user token', function(done) {
      request
        .get(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).to.be.null
          expect(resp.body).to.have.lengthOf(3)
          done()
        })
    })
  })
})
