const request = require('superagent')
const expect = require('chai').expect

const config = require('../config')
const codes = require('../utils/codes')

const WORDS_URL = `localhost:${config.PORT}/api/words/`

describe('Word API', function() {
  describe('Get list of words', function() {
    // it('success without authentication', function(done) {
    //   request.get(WORDS_URL).end((err, resp) => {
    //     expect(err).to.be.null
    //     expect(resp.body).to.have.lengthOf.above(0)
    //     done()
    //   })
    // })
    // it('success with authentication', function(done) {
    //   request
    //     .get(WORDS_URL)
    //     .set('Authorization', 'Bearer ' + global.testUserToken)
    //     .end((err, resp) => {
    //       expect(err).to.be.null
    //       expect(resp.body).to.have.lengthOf.above(0)
    //       done()
    //     })
    // })
  })
})
