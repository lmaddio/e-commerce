import {
  GET_TOKEN,
  CLEAN_TOKEN,
  SEND_TOKEN_TO_SAGAS,
  GET_TOKEN_FROM_COOKIES,
} from 'token/token.constants';

describe('user constants', () => {
  it('GET_TOKEN Should have all its keys', () => {
    expect(GET_TOKEN.LOADING).toEqual('TOKEN/GET_TOKEN_LOADING');

    expect(GET_TOKEN.ERROR).toEqual('TOKEN/GET_TOKEN_ERROR');

    expect(GET_TOKEN.SUCCESS).toEqual('TOKEN/GET_TOKEN_SUCCESS');
  });

  it('CLEAN_TOKEN Should have all its keys', () => {
    expect(CLEAN_TOKEN).toEqual('CLEAN_TOKEN');
  });

  it('SEND_TOKEN_TO_SAGAS Should have all its keys', () => {
    expect(SEND_TOKEN_TO_SAGAS).toEqual('SEND_TOKEN_TO_SAGAS');
  });

  it('GET_TOKEN_FROM_COOKIES Should have all its keys', () => {
    expect(GET_TOKEN_FROM_COOKIES).toEqual('GET_TOKEN_FROM_COOKIES');
  });
});
