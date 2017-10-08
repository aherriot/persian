const request = require('superagent')
const expect = require('chai').expect
const config = require('./config')

const SERVER_URL = `localhost:${config.PORT}/`

describe('General server responses', function() {
  // it('responds to / with the index.html', function(done) {
  //   request.get(SERVER_URL).end((err, resp) => {
  //     expect(err).to.be.null
  //     expect(resp.status).to.equal(200)
  //     expect(resp.headers['content-type']).to.contain('text/html')
  //     expect(resp.text).to.contain('<div id="root"></div>')
  //     done()
  //   })
  // })

  // it('responds to /about with the index.html', function(done) {
  //   request.get(SERVER_URL + 'about').end((err, resp) => {
  //     expect(err).to.be.null
  //     expect(resp.status).to.equal(200)
  //     expect(resp.headers['content-type']).to.contain('text/html')
  //     expect(resp.text).to.contain('<div id="root"></div>')
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
