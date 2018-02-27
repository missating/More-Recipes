import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import signUserOut from '../../actions/signout';
// import localStorage from '../__mocks__/localStorage.mock';
import {
  SIGN_OUT
} from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Sign out', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should sign user out', (done) => {
    const token = 'qwertyasdfghzxcvbqwertyasdfghzxcvqwery';
    const user = {
      fullname: 'fullname',
      username: 'username',
    };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    expect(localStorage.getItem('token')).toEqual(token);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));

    const store = mockStore({});
    store.dispatch(signUserOut());
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    done();
  });
});

