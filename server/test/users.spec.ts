import * as chai from 'chai';
import { after, before, describe, it } from 'mocha';

// Setting environment to test
process.env.NODE_ENV = 'test';

import { app } from '../app';
import User from '../models/user';
import chaiHttp = require('chai-http');

chai.use(chaiHttp).should();

const testUser1 = {
  name: 'Amit Ghosh',
  email: 'test@test.com',
  password: 'strong_password',
};
const testUser2 = {
  name: 'Amit Ghosh',
  email: 'test2@test.com',
  password: 'strong_password',
};

describe('User API', () => {
  let token = '';

  before(() => {
    // Register a user for getting token
    chai.
    request(app)
      .post('/api/v1/register')
      .send(testUser1)
      .end((err, res) => {
        token = res.body.token;
      });
  });

  after((done) => {
    // Remove all user test data for next use
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('Backend tests for users', () => {
    it('should get register a new user', (done) => {
      chai.
      request(app)
        .post('/api/v1/register')
        .send(testUser2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('id');
          res.body.should.have.a.property('email');
          res.body.should.have.a.property('token');
          done();
        });
    });

    it('should get log in a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/login')
        .send(testUser2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('id');
          res.body.should.have.a.property('email');
          res.body.should.have.a.property('token');
          done();
        });
    });

    it('should not get log in a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/login')
        .send({ email: 'test@test.com', password: 'wrong password' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should get current account', (done) => {
      chai
        .request(app)
        .get('/api/v1/account')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should not get current account', (done) => {
      chai
        .request(app)
        .get('/api/v1/account')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
