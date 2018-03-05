import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getTopRecipes from '../../actions/getTopRecipes';
import {
  GET_TOP_RECIPES,
  SET_FETCHING,
  UNSET_FETCHING,
  GET_TOP_RECIPES_ERROR
}
  from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Top recipes action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch top recipes to store if request is successful',
    (done) => {
      const recipes = {
        name: 'test recipe',
        ingredients: 'test, test, test',
        description: 'add all together'
      };

      moxios.stubRequest('/api/v1/recipes?sort=upvote', {
        status: 200,
        response: {
          status: 'success',
          recipes,
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_TOP_RECIPES,
          recipes
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(getTopRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    moxios.stubRequest('/api/v1/recipes?sort=upvote', {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: GET_TOP_RECIPES_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(getTopRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

