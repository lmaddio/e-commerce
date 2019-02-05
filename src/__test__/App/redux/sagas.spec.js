import { all, fork } from 'redux-saga/effects';
import userSaga from 'user/users.sagas';
import tokenSaga from 'token/token.sagas';
import categoriesSaga from 'categories/categories.sagas';
import productsSaga from 'products/products.sagas';
import cartSaga from 'cart/cart.sagas';
import root from 'App/redux/sagas';

describe('root sagas', () => {
  it('Should be all', () => {
    const gen = root();
    expect(gen.next().value).toEqual(
      all([
        fork(userSaga), fork(tokenSaga), fork(categoriesSaga), fork(productsSaga), fork(cartSaga),
      ]),
    );
  });
});
