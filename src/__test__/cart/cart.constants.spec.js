import CART from 'cart/cart.constants';

describe('cart constants', () => {
  it('BUY Should have all its keys', () => {
    expect(CART.BUY.LOADING).toEqual('CART/BUY_LOADING');

    expect(CART.BUY.ERROR).toEqual('CART/BUY_ERROR');

    expect(CART.BUY.SUCCESS).toEqual('CART/BUY_SUCCESS');
  });

  it('ITEM Should have all its keys', () => {
    expect(CART.ITEMS.SET).toEqual('CART/ITEMS_SET');

    expect(CART.ITEMS.SET_SAGA).toEqual('CART/ITEMS_SET_SAGA');

    expect(CART.ITEMS.REMOVE_SAGA).toEqual('CART/ITEMS_REMOVE_SAGA');

    expect(CART.ITEMS.REMOVE_ALL).toEqual('CART/ITEMS_REMOVE_ALL');
  });
});
