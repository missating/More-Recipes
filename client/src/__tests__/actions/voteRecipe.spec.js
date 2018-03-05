import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import voteRecipe from '../../actions/voteRecipe';
import {
  SET_FETCHING,
  UNSET_FETCHING,
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('VOTE recipes', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch vote results to store if request is succesful',
    (done) => {
      const queryType = 'upvote';
      moxios.stubRequest(`/api/v1/recipes/${1}/vote?vote=${queryType}`, {
        status: 200,
        response: {
          status: 'success',
          message: `Recipe ${queryType}d successfully.`,
        }
      });

      const expectedActions = [
        { type: SET_FETCHING },
        { type: SET_FETCHING },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(voteRecipe(1, queryType)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions().length).toBe(3);
        done();
      });
    }
  );


  it('Should dispatch error message if request fails', (done) => {
    const queryType = 'upvote';
    moxios.stubRequest(`/api/v1/recipes/${1}/vote?vote=${queryType}`, {
      status: 500
    });

    const expectedActions = [
      { type: SET_FETCHING },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(voteRecipe(1, queryType)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

