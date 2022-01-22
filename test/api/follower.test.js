const request = require('supertest');

const server = require('../../server');

describe('server', () => {
  it('responds with a not found message', (done) => {
    request(server)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});


