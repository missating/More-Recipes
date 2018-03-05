import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import addRecipe from '../../actions/addRecipe';
import {
  SET_FETCHING,
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Add Recipe Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch add recipe to the store if request is sucessful',
    (done) => {
      const newRecipe = {
        name: 'test name',
        ingredients: 'test, test, test',
        description: 'mix everything together'
      };

      moxios.stubRequest('/api/v1/recipes', {
        status: 200,
        response: {
          status: 'success',
          recipe: newRecipe
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: ADD_RECIPE,
          newRecipe
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(addRecipe(newRecipe))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    const newRecipe = {
      name: 'test name',
      ingredients: 'test, test, test',
      description: 'mix everything together'
    };
    moxios.stubRequest('/api/v1/recipes', {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: ADD_RECIPE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(addRecipe(newRecipe))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

