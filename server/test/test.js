/* eslint-disable */
// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// //Require the dev-dependencies
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';

// const { should } = chai;

// chai.use(chaiHttp);
// //Our parent block
// describe('Books', () => {
// /*
//   * Test the /GET route
//   */
//   describe('/GET book', () => {
//       it('it should GET all the books', (done) => {
//         chai.request(app)
//             .get('/')
//             .end((err, res) => {
//                 res.should.have.status(200);
//               done();
//             });
//       });
//   });

// });


import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test for API routes', () => {
  // describe('GET /', () => {
  //   it('Should return 200', (done) => {
  //     chai.request(app)
  //       .get('/')
  //       .end((err, res) => {
  //         expect(err).to.be.null;          
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
    /*it('Should return 404 for unknown routes', (done) => {
      chai.request(app)
        .get('///recipes/')
        .end((err, res) => {        
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Should return 404 for posts to undefined routes', (done) => {
      chai.request(app)
        .post('/recipe/undefined/route')
        .send({ testing: 'testing' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  }); */

  /* describe('POST recipe', () => {
    it('Should return 400 for post without recipe name', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          id: 8,
          ownerId: 14,
          ingredients: ['test1', 'test2'],
          description: 'description',
          downVote: 16,
          upVote: 12
        })
        .end((err, res) => {         
          expect(res).to.have.status(400);
          done();
        });
    });
    it('Should return 400 for post without recipe description', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          id: 6,
          ownerId: 12,
          ingredients: ['test1', 'test2'],
          name: 'meatballs',
          downVote: 4,
          upVote: 8
        })
        .end((err, res) => {         
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('API to Get all recipes', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 200 for sorted recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=up&order=des')
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return an object', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res.body).to.have.property('status').equal('success');
          done();
        });
    });
  });

  describe('API to update recipe', () => {
    it('Should return 200 if successful', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'recipe name',
          ingredients: 'rice, food, junk and stuff',
          description: 'boil everything together'
        })
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').equal('success');
          done();
        });
    });
  });

  describe('API to Test for review', () => {
    it('Should return 201 if successful', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .send({
          reviewer: 8,
          content: 'Just a test content',
          recipe: 3
        })
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res).to.have.status(201);
          done();
        });
    });
    it('Should return 400 if empty parameters', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .send({
          content: 'Just a test content',
          recipe: 3
        })
        .end((err, res) => {       
          expect(res).to.have.status(400);
          done();
        });
    });
  });*/

 /* describe('API to test for delete recipe', () => {
    it('Should return 200 for succesful delete request ', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/3')
        .end((err, res) => {
          expect(err).to.be.null;          
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 404 if parameter is not found', (done) => {
      chai.request(app)
        .delete('/api/recipes/200')
        .end((err, res) => {
         expect(res).to.have.status(404);
          done();
        });
    });
  });*/
});
