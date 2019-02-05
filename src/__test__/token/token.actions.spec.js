import {
  GET_TOKEN, SEND_TOKEN_TO_SAGAS,
  CLEAN_TOKEN, GET_TOKEN_FROM_COOKIES,
} from 'token/token.constants';
import {
  getToken,
  sendTokenToSagas,
  setToken,
  setTokenError,
  cleanToken,
  getTokenFromCookies,
} from 'token/token.actions';


describe('Token actions', () => {
  it('getToken', () => {
    const expected = {
      type: GET_TOKEN.LOADING,
    };
    const action = getToken();
    expect(action).toEqual(expected);
  });

  it('sendTokenToSagas', () => {
    const expected = {
      type: SEND_TOKEN_TO_SAGAS,
      payload: {
        token: '123456',
      },
    };
    const action = sendTokenToSagas('123456');
    expect(action).toEqual(expected);
  });

  it('setToken', () => {
    const expected = {
      type: GET_TOKEN.SUCCESS,
      payload: {
        token: 'oneToken',
      },
    };
    const action = setToken('oneToken');
    expect(action).toEqual(expected);
  });

  it('setTokenError', () => {
    const expected = {
      type: GET_TOKEN.ERROR,
      payload: {
        error: 'some error',
      },
    };
    const action = setTokenError('some error');
    expect(action).toEqual(expected);
  });

  it('cleanToken', () => {
    const expected = {
      type: CLEAN_TOKEN,
    };
    const action = cleanToken();
    expect(action).toEqual(expected);
  });

  it('getTokenFromCookies', () => {
    const expected = {
      type: GET_TOKEN_FROM_COOKIES,
    };
    const action = getTokenFromCookies();
    expect(action).toEqual(expected);
  });
});
