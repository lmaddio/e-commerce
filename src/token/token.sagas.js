import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { authToken } from 'App/request/request';
import {
  SEND_TOKEN_TO_SAGAS,
  GET_TOKEN,
  GET_TOKEN_FROM_COOKIES,
} from './token.constants';
import {
  setToken,
  setTokenError,
  cleanToken,
} from './token.actions';

export function* getTokenFromCookies() {
  try {
    const token = yield call(authToken.get);
    if (token && token !== 'undefined') {
      yield put(setToken({ value: token }));
    }
  } catch (error) {
    yield put(setTokenError(error.message));
  }
}

export function* saveToken(action) {
  try {
    const data = action.payload.token;
    const expiresIn = new Date(new Date().getTime() + (data.expires_in * 60 * 1000));
    const token = {
      value: data.access_token,
      expiresIn,
    };
    yield put(setToken(token));
    yield call(authToken.set, token);
  } catch (error) {
    yield put(setTokenError(error.message));
  }
}

export function* cleanTokenSaga() {
  try {
    yield put(cleanToken());
    yield call(authToken.clear);
  } catch (error) {
    console.error(error);
  }
}

function* tokenSaga() {
  yield takeLatest(SEND_TOKEN_TO_SAGAS, saveToken);
  yield takeLatest(GET_TOKEN.ERROR, cleanTokenSaga);
  yield takeLatest(GET_TOKEN_FROM_COOKIES, getTokenFromCookies);
}

export default tokenSaga;
