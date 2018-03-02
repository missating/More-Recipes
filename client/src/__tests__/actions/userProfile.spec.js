import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getUserProfile from '../../actions/userProfile';
import {
  GET_USER_PROFILE,
  SET_FETCHING,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('User profile action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch user profile to store if request is successful',
    (done) => {
      const user = {
        fullname: 'test',
        username: 'test',
        email: 'test@test.com',
        joined: new Date().toDateString()
      };
      moxios.stubRequest('/api/v1/users/profile', {
        status: 200,
        response: {
          status: 'success',
          user
        }
      });

      const store = mockStore({});
      store.dispatch(getUserProfile()).then(() => {
        expect(store.getActions()[0].type).toEqual(SET_FETCHING);
        expect(store.getActions()[1].type).toEqual(GET_USER_PROFILE);
        expect(store.getActions()[1].user).toEqual(user);
        expect(store.getActions()[2].type).toEqual(UNSET_FETCHING);
      });
      done();
    }
  );

  it('Should dispatch error message if request fails', (done) => {
    moxios.stubRequest('/api/v1/users/profile', {
      status: 400
    });

    const store = mockStore({});
    store.dispatch(getUserProfile()).then(() => {
      expect(store.getActions()[1].type).toEqual(UNSET_FETCHING);
    });
    done();
  });
});

