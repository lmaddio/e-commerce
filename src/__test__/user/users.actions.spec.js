import { PROFILE, LOGIN_USER, LOGOUT_USER } from 'user/users.constants';
import {
  setUserName,
  setUserPassword,
  setUserEmail,
  getUserProfile,
  setUserProfileError,
  setUserProfile,
  startLogin,
  setLoginError,
  startLogout,
  setLogoutSuccess,
  setLogoutError,
} from 'user/users.actions';

describe('User actions', () => {
  it('setUserName', () => {
    const expected = {
      type: PROFILE.SET_NAME,
      payload: {
        name: 'leonardo',
      },
    };
    const action = setUserName('leonardo');
    expect(action).toEqual(expected);
  });

  it('setUserPassword', () => {
    const expected = {
      type: PROFILE.SET_PASSWORD,
      payload: {
        password: '123456',
      },
    };
    const action = setUserPassword('123456');
    expect(action).toEqual(expected);
  });

  it('setUserEmail', () => {
    const expected = {
      type: PROFILE.SET_EMAIL,
      payload: {
        email: 'leo@email.com',
      },
    };
    const action = setUserEmail('leo@email.com');
    expect(action).toEqual(expected);
  });

  it('getUserProfile', () => {
    const expected = {
      type: PROFILE.GET,
    };
    const action = getUserProfile();
    expect(action).toEqual(expected);
  });

  it('setUserProfileError', () => {
    const expected = {
      type: PROFILE.ERROR,
    };
    const action = setUserProfileError();
    expect(action).toEqual(expected);
  });

  it('setUserProfile', () => {
    const expected = {
      type: PROFILE.SET,
      payload: { name: 'leo' },
    };
    const action = setUserProfile({ name: 'leo' });
    expect(action).toEqual(expected);
  });

  it('startLogin', () => {
    const expected = {
      type: LOGIN_USER.LOADING,
      payload: {
        email: 'g@g.com',
        password: 'leo',
      },
    };
    const action = startLogin('g@g.com', 'leo');
    expect(action).toEqual(expected);
  });

  it('setLoginError', () => {
    const expected = {
      type: LOGIN_USER.ERROR,
      payload: { error: 'ERROR' },
    };
    const action = setLoginError('ERROR');
    expect(action).toEqual(expected);
  });

  it('startLogout', () => {
    const expected = {
      type: LOGOUT_USER.LOADING,
    };
    const action = startLogout();
    expect(action).toEqual(expected);
  });

  it('setLogoutSuccess', () => {
    const expected = {
      type: LOGOUT_USER.SUCCESS,
    };
    const action = setLogoutSuccess();
    expect(action).toEqual(expected);
  });

  it('setLogoutError', () => {
    const expected = {
      type: LOGOUT_USER.ERROR,
      payload: { error: 'ERROR' },
    };
    const action = setLogoutError('ERROR');
    expect(action).toEqual(expected);
  });
});
