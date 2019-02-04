import { PROFILE, LOGIN_USER, LOGOUT_USER } from './users.constants';

export const setUserName = name => ({
  type: PROFILE.SET_NAME,
  payload: {
    name,
  },
});

export const setUserPassword = password => ({
  type: PROFILE.SET_PASSWORD,
  payload: {
    password,
  },
});

export const setUserEmail = email => ({
  type: PROFILE.SET_EMAIL,
  payload: {
    email,
  },
});

export const getUserProfile = () => ({
  type: PROFILE.GET,
});

export const setUserProfileError = () => ({
  type: PROFILE.ERROR,
});

export const setUserProfile = profile => ({
  type: PROFILE.SET,
  payload: profile,
});

export const startLogin = (email, password) => ({
  type: LOGIN_USER.LOADING,
  payload: {
    email,
    password,
  },
});

export const setLoginError = error => ({
  type: LOGIN_USER.ERROR,
  payload: { error },
});

export const startLogout = () => ({
  type: LOGOUT_USER.LOADING,
});

export const setLogoutSuccess = () => ({
  type: LOGOUT_USER.SUCCESS,
});

export const setLogoutError = error => ({
  type: LOGOUT_USER.ERROR,
  payload: { error },
});
