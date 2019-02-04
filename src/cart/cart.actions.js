import CART from './cart.constants';

export const setItems = items => ({
  type: CART.ITEMS.SET,
  payload: items,
});

export const setItemToSaga = (itemId, quantity) => ({
  type: CART.ITEMS.SET_SAGA,
  payload: {
    itemId,
    quantity,
  },
});

export const removeItem = itemId => ({
  type: CART.ITEMS.REMOVE_SAGA,
  itemId,
});

export const removeAllItems = () => ({
  type: CART.ITEMS.REMOVE_ALL,
});

export const setBuyLoadingState = () => ({
  type: CART.BUY.LOADING,
});

export const setBuyError = error => ({
  type: CART.BUY.ERROR,
  payload: {
    error,
  },
});

export const setBuySuccess = () => ({
  type: CART.BUY.SUCCESS,
});
