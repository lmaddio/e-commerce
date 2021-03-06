import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import sinon from 'sinon';
import { authToken } from 'App/request/request';
import {
  SEND_TOKEN_TO_SAGAS,
  CLEAN_TOKEN,
  GET_TOKEN_FROM_COOKIES,
} from 'token/token.constants';
import {
  setToken,
  setTokenError,
  cleanToken,
} from 'token/token.actions';
import tokenSaga, {
  getTokenFromCookies,
  saveToken,
  cleanTokenSaga,
} from 'token/token.sagas';

describe('token sagas', () => {
  it('getTokenFromCookies - Should retrieve token from cookies', () => {
    const gen = getTokenFromCookies();

    expect(gen.next().value).toEqual(call(authToken.get));

    expect(gen.next('abc').value).toEqual(put(setToken({ value: 'abc' })));

    expect(gen.next().done).toEqual(true);
  });

  it('getTokenFromCookies - Should get token from cookies and save in redux', () => {
    const gen = getTokenFromCookies();

    expect(gen.next().value).toEqual(call(authToken.get));

    expect(gen.next('abc').value).toEqual(put(setToken({ value: 'abc' })));

    expect(gen.next().done).toEqual(true);
  });

  it('saveToken - Should retrieve token from cookies', () => {
    const clock = sinon.useFakeTimers(new Date(2011, 9, 1).getTime());
    const token = { access_token: 'abcde', expires_in: 10 };
    const action = { payload: { token } };
    const expiresIn = new Date(new Date().getTime() + (token.expires_in * 60 * 1000));
    const newTokenFormat = { value: token.access_token, expiresIn };
    const gen = saveToken(action);
    expect(
      gen.next(token).value,
    ).toEqual(
      put(setToken(newTokenFormat)),
    );

    expect(gen.next().value).toEqual(call(authToken.set, newTokenFormat));

    expect(gen.next().done).toEqual(true);
    clock.restore();
  });

  it('saveToken - Should set error if any', () => {
    const token = { access_token: 'abcde', expires_in: 10 };
    const action = { payload: { token } };
    const expiresIn = new Date(new Date().getTime() + (token.expires_in * 60 * 1000));
    const newTokenFormat = { value: token.access_token, expiresIn };
    const gen = saveToken(action);
    expect(
      gen.next(token).value,
    ).toEqual(
      put(setToken(newTokenFormat)),
    );

    expect(gen.throw({ message: 'error msg' }).value).toEqual(put(setTokenError('error msg')));

    expect(gen.next().done).toEqual(true);
  });

  it('cleanTokenSaga success', () => {
    const gen = cleanTokenSaga();

    expect(gen.next().value).toEqual(put(setTokenError()));

    expect(gen.next().done).toEqual(true);
  });

  it('cleanTokenSaga error just log to console', () => {
    const gen = cleanTokenSaga();

    expect(gen.next().value).toEqual(put(setTokenError()));

    expect(gen.throw({}).done).toEqual(true);
  });

  it('tokenSaga', () => {
    const gen = tokenSaga();

    expect(gen.next().value).toEqual(takeLatest(SEND_TOKEN_TO_SAGAS, saveToken));

    expect(gen.next().value).toEqual(takeLatest(CLEAN_TOKEN, cleanTokenSaga));

    expect(gen.next().value).toEqual(takeLatest(GET_TOKEN_FROM_COOKIES, getTokenFromCookies));

    expect(gen.next().done).toEqual(true);
  });
});
