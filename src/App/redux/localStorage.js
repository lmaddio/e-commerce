import { validateArrays } from '../utils';

let items = [];

export const clearStorage = () => {
  window.localStorage.clear();
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return undefined;
    }
    const cartState = JSON.parse(serializedState);
    items = cartState.cart.items.map(item => item);
    return cartState;
  } catch (err) {
    clearStorage();
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const { items: newItems } = state.cart;
    if (!validateArrays(items, newItems)) {
      items = newItems.map(item => item);
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    }
  } catch (error) {
    console.warn(error);
  }
};
