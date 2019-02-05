import { combineReducers } from 'redux';

import user from 'user/users.reducer';
import token from 'token/token.reducer';
import categories from 'categories/categories.reducer';
import products from 'products/products.reducer';
import cart from 'cart/cart.reducer';

const combinedReducers = combineReducers({
  token,
  user,
  categories,
  products,
  cart,
});

export default combinedReducers;
