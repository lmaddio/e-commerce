import { GET_TOKEN, CLEAN_TOKEN } from 'token/token.constants';
import reducer from 'token/token.reducer';

const initialState = {
  requesting: false,
  error: null,
  value: null,
  expiresIn: null,
};

const mockState = {
  requesting: true,
  error: 'error',
  value: '123456',
  expiresIn: 31,
};

describe('user reducer', () => {
  it('Should return initialState', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('Should manage GET_TOKEN.SUCCESS', () => {
    const action = {
      type: GET_TOKEN.SUCCESS,
      payload: {
        token: {
          value: '123456',
        },
      },
    };
    const result = reducer(mockState, action);
    expect(result).toEqual({ ...mockState, requesting: false });
  });

  it('Should manage GET_TOKEN.LOADING', () => {
    const action = {
      type: GET_TOKEN.LOADING,
    };
    const result = reducer(mockState, action);
    const expected = {
      error: mockState.error, expiresIn: 31, requesting: true, value: '123456',
    };
    expect(result).toEqual(expected);
  });

  it('Should manage GET_TOKEN.ERROR', () => {
    const action = {
      type: GET_TOKEN.ERROR,
      payload: {
        error: 'There was an error',
      },
    };
    const result = reducer(mockState, action);
    const expected = { ...initialState, error: 'There was an error' };
    expect(result).toEqual(expected);
  });

  it('Should manage CLEAN_TOKEN', () => {
    const action = {
      type: CLEAN_TOKEN,
      payload: {
        error: 'There was an error',
      },
    };
    const result = reducer(mockState, action);
    const expected = { ...initialState, error: 'There was an error' };
    expect(result).toEqual(expected);
  });
});
