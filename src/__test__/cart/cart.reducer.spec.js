import CART from 'cart/cart.constants';
import reducer from 'cart/cart.reducer';

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

describe('cart reducer', () => {
  it('Should return initialState', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('Should manage CART.ITEMS.SET', () => {
    const action = {
      type: CART.ITEMS.SET,
      payload: [{ id: 4 }],
    };
    const result = reducer(mockState, action);
    const expected = {
      ...initialState,
      items: [{ id: 4 }],
    };
    expect(result).toEqual(expected);
  });

  it('Should manage CART.ITEMS.REMOVE_ALL', () => {
    const action = {
      type: CART.ITEMS.REMOVE_ALL,
    };
    const result = reducer(mockState, action);
    const expected = { error: mockState.error, items: [], requesting: false };
    expect(result).toEqual(expected);
  });

  it('Should manage CART.BUY.ERROR', () => {
    const action = {
      type: CART.BUY.ERROR,
      payload: {
        error: 'There was an error',
      },
    };
    const result = reducer(mockState, action);
    const expected = { error: 'There was an error', items: [{ id: 3 }], requesting: false };
    expect(result).toEqual(expected);
  });

  it('Should manage CART.BUY.LOADING', () => {
    const action = {
      type: CART.BUY.LOADING,
    };
    const result = reducer(mockState, action);
    const expected = { error: null, items: [{ id: 3 }], requesting: true };
    expect(result).toEqual(expected);
  });

  it('Should manage CART.BUY.SUCCESS', () => {
    const action = {
      type: CART.BUY.SUCCESS,
    };
    const result = reducer(mockState, action);
    const expected = initialState;
    expect(result).toEqual(expected);
  });
});
