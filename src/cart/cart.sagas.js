import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { getProductsItemById } from 'products/products.selectors';
import CART from './cart.constants';
import {
  setBuySuccess,
  setBuyError,
  setItems,
  removeAllItems,
} from './cart.actions';
import {
  getItems,
  getItemIndexById,
} from './cart.selectors';
import getBuyConfirmation from './cart.services';

export function* sendToStore({ payload }) {
  try {
    const { itemId } = payload;
    const product = yield select(getProductsItemById(itemId));
    const quantity = payload.quantity > product.quantity ? product.quantity : payload.quantity;
    const items = yield select(getItems);
    const itemToStoreIndex = yield select(getItemIndexById(itemId));
    if (itemToStoreIndex !== -1) {
      items[itemToStoreIndex] = { ...items[itemToStoreIndex], quantity };
    } else {
      items.push({ ...product, quantity });
    }
    yield put(setItems(items));
  } catch (error) {
    console.error(error);
    yield put(removeAllItems());
  }
}

export function* removeItemFromStore({ itemId }) {
  try {
    let items = yield select(getItems);
    const itemToStoreIndex = yield select(getItemIndexById(itemId));
    if (itemToStoreIndex !== -1) {
      items = items.map(item => item);
      items.splice(itemToStoreIndex, 1);
      yield put(setItems(items));
    }
  } catch (error) {
    console.error(error);
    yield put(removeAllItems());
  }
}

export function* sendCartToServer() {
  try {
    let items = yield select(getItems);
    items = items.map(({ quantity, id }) => ({ quantity, id }));
    const response = yield call(getBuyConfirmation, items);
    if (response.status === 200 || response.status === 204) {
      yield put(setBuySuccess());
      yield put(removeAllItems());
    } else {
      throw new Error('Unexpected error', response.status);
    }
  } catch (error) {
    yield put(setBuyError(error.message));
  }
}

function* cartSagas() {
  yield takeLatest(CART.ITEMS.SET_SAGA, sendToStore);
  yield takeLatest(CART.ITEMS.REMOVE_SAGA, removeItemFromStore);
  yield takeLatest(CART.BUY.LOADING, sendCartToServer);
}

export default cartSagas;
