import reducer from '../../reducers/auth';
import { RECEIVE_AUTH,
  AUTH_ERROR,
  SIGN_IN_USER,
  SIGN_OUT } from '../../actions/actionTypes';
import localStorage from '../__mocks__/localStorage.mock';

window.localStorage = localStorage;

describe('auth reducers', () => {
  it('Should return the initial state', () => {
    const { isAuthenticated } = reducer(undefined, {});

    expect(isAuthenticated).toEqual(false);
  });
});

