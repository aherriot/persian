const request = require('superagent')
// const expect = require('chai').expect
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
        expect(err).toBeNull()
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
        expect(err).toBeDefined()
        expect(err.response.body.code).toEqual('wordNotFound')
        done()
      })
  })

  it('success on delete user', function(done) {
    request
      .delete(SERVER_URL + 'api/users/' + global.testUserId)
      .set('Authorization', 'Bearer ' + global.testUserToken)
      .end((err, resp) => {
        expect(err).toBeNull()
        expect(resp.body.success).toEqual(true)
        done()
      })
  })

  it('no scores on delete user', function(done) {
    request
      .get(SERVER_URL + 'api/scores/')
      .set('Authorization', 'Bearer ' + global.testUserToken)
      .end((err, resp) => {
        expect(err).toBeNull()
        expect(resp.body).toHaveLength(0)
        done()
      })
  })
})

describe('General server responses', function() {
  it('response with 404 on unknown api requests', function(done) {
    request.get(SERVER_URL + 'api/unknown').end((err, resp) => {
      expect(err).toBeDefined()
      expect(err.status).toEqual(404)
      expect(resp.body.code).toEqual('notFound')
      expect(resp.body.message).toEqual('path not found')
      done()
    })
  })
})
