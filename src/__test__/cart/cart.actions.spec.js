import CART from 'cart/cart.constants';
import {
  setItems,
  setItemToSaga,
  removeItem,
  removeAllItems,
  setBuyLoadingState,
  setBuyError,
  setBuySuccess,
} from 'cart/cart.actions';

describe('Cart actions', () => {
  it('setItems', () => {
    const expected = {
      type: CART.ITEMS.SET,
      payload: [1],
    };
    const action = setItems([1]);
    expect(action).toEqual(expected);
  });

  it('setItemToSaga', () => {
    const expected = {
      type: CART.ITEMS.SET_SAGA,
      payload: {
        itemId: 4,
        quantity: 0,
      },
    };
    const action = setItemToSaga(4, 0);
    expect(action).toEqual(expected);
  });

  it('removeItem', () => {
    const expected = {
      type: CART.ITEMS.REMOVE_SAGA,
      itemId: 6,
    };
    const action = removeItem(6);
    expect(action).toEqual(expected);
  });

  it('removeAllItems', () => {
    const expected = {
      type: CART.ITEMS.REMOVE_ALL,
    };
    const action = removeAllItems();
    expect(action).toEqual(expected);
  });

  it('setBuyLoadingState', () => {
    const expected = {
      type: CART.BUY.LOADING,
    };
    const action = setBuyLoadingState();
    expect(action).toEqual(expected);
  });

  it('setBuyError', () => {
    const expected = {
      type: CART.BUY.ERROR,
      payload: {
        error: 'errorTest',
      },
    };
    const action = setBuyError('errorTest');
    expect(action).toEqual(expected);
  });

  it('setBuySuccess', () => {
    const expected = {
      type: CART.BUY.SUCCESS,
    };
    const action = setBuySuccess();
    expect(action).toEqual(expected);
  });
});
