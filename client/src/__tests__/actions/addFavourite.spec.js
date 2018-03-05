import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import
addFavouriteRecipe,
{ removeUserFavourite } from '../../actions/addFavourite';

import {
  SET_FETCHING,
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERROR,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Favorite Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch add favourite to store if request is successful',
    (done) => {
      const foundRecipe = {
        name: 'test recipe',
        ingredients: 'test, test, test',
        description: 'add all together'
      };
      moxios.stubRequest(`/api/v1/users/${1}/favourite`, {
        status: 200,
        response: {
          status: 'added',
          message: 'recipe favourited',
          addedFavourite: foundRecipe
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: ADD_FAVOURITE,
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(addFavouriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
        });
      done();
    }
  );

  it(
    'Should dispatch remove favourite recipe if request is successful',
    (done) => {
      moxios.stubRequest(`/api/v1/users/${1}/favourite`, {
        status: 200,
        response: {
          status: 'removed',
          message: 'Recipe removed from favourite'
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: REMOVE_FAVOURITE,
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(addFavouriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
        });
      done();
    }
  );

  it('dispatch error message to store if request is unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/users/${1}/favourite`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: ADD_FAVOURITE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(addFavouriteRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
      });
    done();
  });

  it('removes user favorite', (done) => {
    moxios.stubRequest('/api/v1/users/1/favourite', {
      status: 200,
      response: {
        status: 'success'
      }
    });
    const store = mockStore({});
    store.dispatch(removeUserFavourite(1)).then(() => {
      const expected = [
        { type: SET_FETCHING },
        {
          type: SET_FETCHING,
        },
        { type: UNSET_FETCHING }
      ];
      expect(store.getActions()).toEqual(expected);
    });
    done();
  });

  it('dispatch error message to store if request is unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/users/${1}/favourite`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: REMOVE_FAVOURITE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(removeUserFavourite(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
      });
    done();
  });
});

