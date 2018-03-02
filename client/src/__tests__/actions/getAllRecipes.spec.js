import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getAllRecipes from '../../actions/getAllRecipes';
import {
  GET_ALL_RECIPES,
  SET_FETCHING,
  UNSET_FETCHING,
  SHOW_PAGINATION,
  GET_ALL_RECIPES_ERROR
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
    'Should dispatch all recipes to store if request is successful',
    (done) => {
      const recipes = {
        name: 'test recipe',
        ingredients: 'test, test, test',
        description: 'add all together'
      };
      const page = 1;
      const Limit = 6;
      const CurrentPage = 1;
      const NumberOfItems = 1;
      const Pages = 1;
      moxios.stubRequest(`/api/v1/recipes?page=${page}`, {
        status: 200,
        response: {
          status: 'success',
          recipes,
          Limit,
          NumberOfItems,
          Pages,
          CurrentPage
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_ALL_RECIPES,
          recipes
        },
        {
          type: SHOW_PAGINATION,
          details: {
            Limit: 6, NumberOfItems: 1, CurrentPage: 1, Pages: 1
          }
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(getAllRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(4);
        });
      done();
    }
  );

  it(
    'Should dispatch error message to store if request is unsucessful',
    (done) => {
      moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
        status: 404,
        response: {
          status: 'success',
          message: 'Currently no recipe'
        }
      });
      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_ALL_RECIPES,
          recipes: []
        },
        {
          type: GET_ALL_RECIPES_ERROR,
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(getAllRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(4);
        });
      done();
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: GET_ALL_RECIPES_ERROR,
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(getAllRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
      });
    done();
  });
});

