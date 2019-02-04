import {
  PROFILE,
  LOGIN_USER,
  LOGOUT_USER,
} from 'user/users.constants';
import reducer from 'user/users.reducer';

const initialState = {
  profile: {
    name: null,
    email: null,
  },
  error: null,
};

const mockState = {
  profile: {
    name: 'leo',
    email: 'g@g.com',
  },
  error: 'error test',
};

describe('user reducer', () => {
  it('Should return initialState', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('Should manage PROFILE.SET_NAME', () => {
    const action = {
      type: PROFILE.SET_NAME,
      payload: { name: 'pepe' },
    };
    const result = reducer(mockState, action);
    const expected = {
      profile: {
        name: 'pepe',
        email: 'g@g.com',
      },
      error: 'error test',
    };
    expect(result).toEqual(expected);
  });

  it('Should manage PROFILE.SET_EMAIL', () => {
    const action = {
      type: PROFILE.SET_EMAIL,
      payload: { email: 'pepe@gmail.com' },
    };
    const result = reducer(mockState, action);
    const expected = {
      profile: {
        name: 'leo',
        email: 'pepe@gmail.com',
      },
      error: 'error test',
    };
    expect(result).toEqual(expected);
  });

  it('Should manage LOGIN_USER.ERROR', () => {
    const action = {
      type: LOGIN_USER.ERROR,
      payload: {
        error: 'Error in login',
      },
    };
    const result = reducer(mockState, action);
    const expected = {
      profile: {
        name: 'leo',
        email: 'g@g.com',
      },
      error: 'Error in login',
    };
    expect(result).toEqual(expected);
  });

  it('Should manage LOGOUT_USER.LOADING', () => {
    const action = {
      type: LOGOUT_USER.LOADING,
    };
    const result = reducer(mockState, action);

    expect(result).toEqual(initialState);
  });
});
