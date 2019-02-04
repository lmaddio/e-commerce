import {
  GET_TOKEN, SEND_TOKEN_TO_SAGAS,
  CLEAN_TOKEN, GET_TOKEN_FROM_COOKIES,
} from './token.constants';

export const getToken = () => ({
  type: GET_TOKEN.LOADING,
});

export const sendTokenToSagas = token => ({
  type: SEND_TOKEN_TO_SAGAS,
  payload: {
    token,
  },
});

export const setToken = token => ({
  type: GET_TOKEN.SUCCESS,
  payload: {
    token,
  },
});

export const setTokenError = (error = null) => ({
  type: GET_TOKEN.ERROR,
  payload: {
    error,
  },
});

export const cleanToken = () => ({
  type: CLEAN_TOKEN,
});

export const getTokenFromCookies = () => ({
  type: GET_TOKEN_FROM_COOKIES,
});
