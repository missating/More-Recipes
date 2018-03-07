import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
const user1 = {
  fullname: 'test',
  username: 'test',
  email: 'test@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

const user2 = {
  email: 'test@test.com',
  password: '1234567890'
};

const user3 = {
  fullname: 'Jane Doe',
  username: 'Janny'
};

describe('USER API', () => {
  describe('User sign up', () => {
    const signupUrl = '/api/v1/users/signup';
    it('Should register a new user with the correct credentials', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(user1)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Account created');
          expect(response.body.user.username).to.equal(user1.username);
          expect(response.body.user.fullname).to.equal(user1.fullname);
          expect(response.body.user.email).to.equal(user1.email);
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          expect(response.body.user).to.not.have.property(user1.password);
          done();
        });
    });

    it(
      'Should not register a new user with an already existing email',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(user1)
          .end((error, response) => {
            expect(response).to.have.status(409);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Email already exist');
            done();
          });
      }
    );
    it(
      'Should not register a new user with a wrong email format',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: 'test',
            username: 'test',
            email: 'testtest.com',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.email)
              .to.include('Email address is empty or invalid');
            done();
          });
      }
    );

    it(
      'Should not register a new user with an empty fullname field ',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: '',
            username: 'test',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.fullname)
              .to.include('Fullname is required');
            done();
          });
      }
    );

    it(
      'Should not register a new user with an empty username field ',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: 'test',
            username: '',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.username)
              .to.include('Username is required');
            done();
          });
      }
    );

    it(
      'Should not register a new user with an email field is empty',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: 'test',
            username: 'test',
            email: '',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.email)
              .to.equal('Email address is empty or invalid');
            done();
          });
      }
    );

    it(
      'Should not register a new user with an empty password field',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: 'test',
            username: 'nessa',
            email: 'test@test.com',
            password: '',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.password)
              .to.include('Passwords mismatch or empty');
            done();
          });
      }
    );

    it(
      'Should not register a new user if passwords don\'t match',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            fullname: 'test',
            username: 'test',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: '12345'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.password)
              .to.equal('Passwords mismatch or empty');
            done();
          });
      }
    );
  });

  describe('User sign in', () => {
    const signinUrl = '/api/v1/users/signin';
    it('Should sign in a user with the correct details', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(user2)
        .end((error, response) => {
          userToken = response.body.token;
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.foundUser.username).to.equal(user1.username);
          expect(response.body.foundUser.fullname).to.equal(user1.fullname);
          expect(response.body.foundUser.email).to.equal(user2.email);
          expect(response.body).to.have.property('token');
          expect(response.body.foundUser).to.not.have.property(user2.password);
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          done();
        });
    });

    it('Should not sign in user without password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'test@test.com',
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.password).to.equal('Password is required');
          done();
        });
    });

    it('Should not sign in user without email address', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: '',
          password: '1234567890',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.email)
            .to.equal('Please provide a valid email address');
          done();
        });
    });

    it('Should not sign in a user with an incorrect password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'test@test.com',
          password: '12345',
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('These credentials do not match our record');
          done();
        });
    });

    it('Should not sign in a user with an incorrect email address', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'testagain@test.com',
          password: '1234567890',
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('These credentials do not match our record');
          done();
        });
    });
  });


  describe('Get user profile', () => {
    const userProfileUrl = '/api/v1/users/profile';
    it('Should allow auth users view their profile', (done) => {
      chai.request(app)
        .get(userProfileUrl)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.user).to.have.property('fullname');
          expect(response.body.user).to.have.property('username');
          expect(response.body.user).to.have.property('email');
          expect(response.body.user).to.have.property('joined');
          expect(response.body.user).to.not.have.property('password');
          done();
        });
    });

    it('Should not allow non auth users view their profile', (done) => {
      chai.request(app)
        .get(userProfileUrl)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Unauthorized.');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });
  });


  describe('Update user profile', () => {
    const userProfileUrl = '/api/v1/users/profile';
    it('Should not allow non auth users update their profile', (done) => {
      chai.request(app)
        .put(userProfileUrl)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Unauthorized.');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it(
      'Should return 200 if an auth user tries to update his/her profile',
      (done) => {
        chai.request(app)
          .put('/api/v1/users/profile')
          .set('token', userToken)
          .send(user3)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.user.fullname).to.equal(user3.fullname);
            expect(response.body.user.username).to.equal(user3.username);
            expect(response.body.user.email).to.equal(user1.email);
            expect(response.body.user.joined).to.be.a('string');
            done();
          });
      }
    );
  });
});

