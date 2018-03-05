import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import signout from '../../actions/signout';
import {
  SIGN_OUT
} from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('SIGN OUT Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should sign user out', (done) => {
    const user = {
      fullname: 'fullname',
      username: 'username',
    };

    const expectedActions = [
      {
        type: SIGN_OUT
      }
    ];

    localStorage.removeItem('token', token);
    localStorage.removeItem('user', JSON.stringify(user));

    const store = mockStore({});
    store.dispatch(signout());
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions().length).toBe(1);
    done();
  });
});
