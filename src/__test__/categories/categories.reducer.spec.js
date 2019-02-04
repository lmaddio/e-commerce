import GET_CATEGORIES from 'categories/categories.constants';
import reducer from 'categories/categories.reducer';

const initialState = {
  error: null,
  requesting: false,
  items: [],
};

const mockState = {
  error: 'error test',
  requesting: true,
  items: [{ id: 3 }],
};

describe('categories reducer', () => {
  it('Should return initialState', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('Should manage GET_CATEGORIES.SUCCESS', () => {
    const action = {
      type: GET_CATEGORIES.SUCCESS,
      payload: [{ id: 3 }],
    };
    const result = reducer(mockState, action);
    const expected = {
      ...mockState,
      requesting: false,
    };
    expect(result).toEqual(expected);
  });

  it('Should manage GET_CATEGORIES.LOADING', () => {
    const action = {
      type: GET_CATEGORIES.LOADING,
    };
    const result = reducer(mockState, action);
    const expected = { error: mockState.error, items: [{ id: 3 }], requesting: true };
    expect(result).toEqual(expected);
  });

  it('Should manage GET_CATEGORIES.ERROR', () => {
    const action = {
      type: GET_CATEGORIES.ERROR,
      payload: {
        error: 'There was an error',
      },
    };
    const result = reducer(mockState, action);
    const expected = { error: 'There was an error', items: [{ id: 3 }], requesting: false };
    expect(result).toEqual(expected);
  });
});
