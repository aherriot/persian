const request = require('superagent')
// const expect = require('chai').expect

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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('missingAuthToken')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('JsonWebTokenError')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('adminOnly')
          done()
        })
    })

    it('error on empty body', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordInvalid')
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
          expect(err).toBeNull()
          expect(resp.body).toHaveProperty('_id')
          expect(resp.body).toHaveProperty('english')
          expect(resp.body).toHaveProperty('persian')
          expect(resp.body).toHaveProperty('phonetic')
          global.testWordId = resp.body._id
          done()
        })
    })

    it('error on empty array of words', function(done) {
      request
        .post(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send([])
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('wordArrayInvalid')
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
          expect(err).toBeNull()
          expect(resp.body).toHaveLength(3)
          done()
        })
    })
  })

  describe('Update existing word', function() {
    it('error without authentication', function(done) {
      request
        .put(WORDS_URL + global.testWordId)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('missingAuthToken')
          done()
        })
    })

    it('error on non-admin user token', function(done) {
      request
        .put(WORDS_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('adminOnly')
          done()
        })
    })

    it('success on modify word', function(done) {
      request
        .put(WORDS_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.adminToken)
        .send({
          english: 'test'
        })
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.body.english).toEqual('test')
          done()
        })
    })
  })

  describe('Delete word', function() {
    it('error without authentication', function(done) {
      request.delete(WORDS_URL + global.testWordId).end((err, resp) => {
        expect(err).toBeDefined()
        expect(err.response.body.code).toEqual('missingAuthToken')
        done()
      })
    })

    it('error on non-admin user token', function(done) {
      request
        .delete(WORDS_URL + global.testWordId)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).toBeDefined()
          expect(err.response.body.code).toEqual('adminOnly')
          done()
        })
    })
  })

  describe('Fetch list of words', function() {
    it('success without authentication', function(done) {
      request.get(WORDS_URL).end((err, resp) => {
        expect(err).toBeNull()
        expect(resp.body).toHaveLength(4)
        done()
      })
    })

    it('success with user token', function(done) {
      request
        .get(WORDS_URL)
        .set('Authorization', 'Bearer ' + global.testUserToken)
        .end((err, resp) => {
          expect(err).toBeNull()
          expect(resp.body).toHaveLength(4)
          done()
        })
    })
  })
})
