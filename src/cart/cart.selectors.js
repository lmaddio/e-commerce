import { createSelector } from 'reselect';

const getCartObject = state => state.cart;

export const getItems = createSelector(
  getCartObject,
  cart => cart.items,
);

export const getItemById = id => createSelector(
  getItems,
  items => items.find(item => item.id === id) || {},
);

export const getItemIndexById = id => createSelector(
  getItems,
  items => items.findIndex(item => item.id === id),
);

export const getCartState = createSelector(
  getCartObject,
  cart => cart.error,
);

export const isCartRequesting = createSelector(
  getCartObject,
  cart => cart.requesting,
);
