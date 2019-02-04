import { LOGOUT_USER, PROFILE, LOGIN_USER } from 'user/users.constants';

describe('user constants', () => {
  it('LOGIN_USER Should have all its keys', () => {
    expect(LOGIN_USER.LOADING).toEqual('USER/LOGIN_LOADING');

    expect(LOGIN_USER.ERROR).toEqual('USER/LOGIN_ERROR');

    expect(LOGIN_USER.SUCCESS).toEqual('USER/LOGIN_SUCCESS');
  });

  it('LOGOUT_USER Should have all its keys', () => {
    expect(LOGOUT_USER.LOADING).toEqual('USER/LOGOUT_USER_LOADING');

    expect(LOGOUT_USER.ERROR).toEqual('USER/LOGOUT_USER_ERROR');

    expect(LOGOUT_USER.SUCCESS).toEqual('USER/LOGOUT_USER_SUCCESS');
  });

  it('PROFILE Should have all its keys', () => {
    expect(PROFILE.SET_NAME).toEqual('USER/PROFILE_SET_NAME');

    expect(PROFILE.SET_EMAIL).toEqual('USER/PROFILE_SET_EMAIL');

    expect(PROFILE.SET_PASSWORD).toEqual('USER/PROFILE_SET_PASSWORD');

    expect(PROFILE.GET).toEqual('USER/PROFILE_GET');

    expect(PROFILE.SET).toEqual('USER/PROFILE_SET');

    expect(PROFILE.ERROR).toEqual('USER/PROFILE_ERROR');
  });
});
