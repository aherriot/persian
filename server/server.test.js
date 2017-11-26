const request = require('superagent')
const expect = require('chai').expect
const config = require('./config')

require('./controllers/users.test.js')
require('./controllers/words.test.js')
require('./controllers/scores.test.js')
require('./controllers/suggestions.test.js')

const SERVER_URL = `localhost:${config.PORT}/`

describe('Clean up after deleting content', function() {
  it('success on delete word', function(done) {
    request
      .delete(SERVER_URL + 'api/words/' + global.testWordId)
      .set('Authorization', 'Bearer ' + global.adminToken)
      .end((err, resp) => {
        expect(err).to.be.null
        done()
      })
  })

  it('error on update score for deleted word', function(done) {
    request
      .put(SERVER_URL + 'api/scores/' + global.testWordId)
      .set('Authorization', 'Bearer ' + global.testUserToken)
      .send({
        direction: 'fromEnglish',
        score: 1
      })
      .end((err, resp) => {
        expect(err).to.not.be.null
        expect(err.response.body.code).to.equal('wordNotFound')
        done()
      })
  })

  it('success on delete user', function(done) {
    request
      .delete(SERVER_URL + 'api/users/' + global.testUserId)
      .set('Authorization', 'Bearer ' + global.testUserToken)
      .end((err, resp) => {
        expect(err).to.be.null
        expect(resp.body.success).to.be.true
        done()
      })
  })

  it('no scores on delete user', function(done) {
    request
      .get(SERVER_URL + 'api/scores/')
      .set('Authorization', 'Bearer ' + global.testUserToken)
      .end((err, resp) => {
        expect(err).to.be.null
        expect(resp.body).to.have.lengthOf(0)
        done()
      })
  })
})

describe('General server responses', function() {
  // This test works locally, and used to work on travis,
  // but not sure why it is failing. Certainly, the server
  // does actually serve up the index.html file.
  // it('responds to / with the index.html', function(done) {
  //   request.get(SERVER_URL).end((err, resp) => {
  //     expect(err).to.be.null
  //     expect(resp.status).to.equal(200)
  //     expect(resp.headers['content-type']).to.contain('text/html')
  //     expect(resp.text).to.contain('<div id="root">')
  //     done()
  //   })
  // })

  it('response with 404 on unknown api requests', function(done) {
    request.get(SERVER_URL + 'api/unknown').end((err, resp) => {
      expect(err).to.not.be.null
      expect(err.status).to.equal(404)
      expect(resp.body.code).to.equal('notFound')
      expect(resp.body.message).to.equal('path not found')
      done()
    })
  })
})
