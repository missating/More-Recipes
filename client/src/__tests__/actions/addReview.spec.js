import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import addReview from '../../actions/addReview';
import {
  SET_FETCHING,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Add Review Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should dispatch add review to store if request if successful', (done) => {
    const review = {
      content: 'Good stuff'
    };

    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/review`, {
      status: 200,
      response: {
        status: 'success',
        review
      }
    });

    const expected = [
      { type: SET_FETCHING },
      {
        type: ADD_REVIEW,
        review
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(addReview(review, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });


  it('dispatch error message to store if request is unsucessful', (done) => {
    const review = {
      content: 'Good stuff'
    };

    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/review`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: ADD_REVIEW_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(addReview(review, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

