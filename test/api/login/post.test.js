const request = require('supertest');

const server = require('../../../server');

describe('POST/api/v1/login', () => {
  it('responds with a json message', (done) => {
    request(server)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'ok'
      }, done);
  });
});

