import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getSingleRecipe from '../../actions/getSingleRecipe';
import {
  GET_SINGLE_RECIPE,
  SET_FETCHING,
  UNSET_FETCHING,
  GET_SINGLE_RECIPE_ERROR
}
  from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('All recipes action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch single recipe to store if request is successful',
    (done) => {
      const recipe = {
        name: 'test recipe',
        ingredients: 'test, test, test',
        description: 'add all together'
      };

      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
        response: {
          status: 'success',
          recipe
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_SINGLE_RECIPE,
          recipe
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(getSingleRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    moxios.stubRequest(`/api/v1/recipes/${1}`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: GET_SINGLE_RECIPE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(getSingleRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

