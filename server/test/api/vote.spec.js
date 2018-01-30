import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
let recipeId;

describe('VOTE API', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'test5',
        username: 'test5',
        email: 'test5@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('token', userToken)
      .send({
        name: 'Test Recipe 4',
        ingredients: 'test, test, test',
        description: 'For testing recipe 4',
        recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
      })
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body.recipe.name).to.equal('Test Recipe 4');
        expect(response.body.recipe.ingredients)
          .to.equal('test, test, test');
        expect(response.body.recipe.description)
          .to.equal('For testing recipe 4');
        done();
      });
  });

  describe('Upvote a recipe', () => {
    it(
      'Should not upvote a recipe if the upvote query is not provided',
      (done) => {
        chai.request(app)
          .post(`/api/v1/recipes/${recipeId}/vote`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message)
              .to.equal('Vote query action is required');
            done();
          });
      }
    );

    it('Should not upvote a recipe that doesn\'t exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/10/vote?vote=upvote')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message)
            .to.equal('No recipe with id 10 was found');
          done();
        });
    });

    it('Should not allow non auth users to upvote a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/vote?vote=upvote`)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('Unauthorized.');
          done();
        });
    });

    it('Should allow auth users to upvote a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/vote?vote=upvote`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message)
            .to.equal('Recipe upvoted successfully.');
          done();
        });
    });

    it('Should not allow auth users to upvote a recipe twice', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/vote?vote=upvote`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message)
            .to.equal('upvote removed successfully.');
          done();
        });
    });

    it(
      'Should update vote from up to down if downvote is called on same recipe',
      (done) => {
        chai.request(app)
          .post(`/api/v1/recipes/${recipeId}/vote?vote=downvote`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message)
              .to.equal('Recipe downvoted successfully.');
            done();
          });
      }
    );
  });
});

