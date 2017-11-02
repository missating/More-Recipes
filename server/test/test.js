process.env.NODE_ENV = 'test';


import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import db from '../models/index';
import * as passwordHelper from '../validation/encrypt';

const helper = new passwordHelper.default();

const { expect } = chai;

chai.use(chaiHttp);


describe('Test for API', () => {
  db.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
  after((done) => {
    db.User.destroy({ where: { id: { $notIn: [1, 2, 3] } } });
    db.Recipe.destroy({ where: { id: { $notIn: [1, 2, 3] } } });
    done();
  });
  describe('encrypted password', () => {
    it('should return false for invalid password', () => {
      expect(helper.decrypt('hsdvjkshnvnkew', 'hhvcjw.fjkbwbh.wrjbfjrw')).to.equal(false);
    });
  });

  describe('GET /', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 404 for unknown routes', (done) => {
      chai.request(app)
        .get('/some/very/stupid/route')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Should return 404 for posts to undefined routes', (done) => {
      chai.request(app)
        .post('/some/undefined/route')
        .send({ random: 'random' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Should return 404 for get requests without token', (done) => {
      chai.request(app)
        .get('/api/recipes/user/all')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('POST recipe', () => {
    it('Should return 403 for post requests without token', (done) => {
      chai.request(app)
        .post('/api/recipes')
        .send({
          name: 'fried chicken',
          ingredients: 'friene, food, ajksk',
          description: 'description',
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });
  describe('API to Get all recipes', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/api/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  it('Should return 200 for sorted recipes', (done) => {
    chai.request(app)
      .get('/api/recipes?sort=up&order=des')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('API to update recipe', () => {
  it('Should return 403 for unauthorized', (done) => {
    chai.request(app)
      .put('/api/recipes/1')
      .send({
        name: 'A new name',
        ingredients: 'Some ingredients',
        description: 'some new description'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
describe('Test for User', () => {
  it('should not allow unregistered user sign in', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'unenkay@gmail.com',
        password: 'others'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should not allow invalid credentials sign in', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: '1234',
        password: 'something'
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message').equal('Email and password don\'t match');
        done();
      });
  });
});
