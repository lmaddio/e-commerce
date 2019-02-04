import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import cartSagas, {
  sendToStore, removeItemFromStore, sendCartToServer,
} from 'cart/cart.sagas';
import { getProductsItemById } from 'products/products.selectors';
import CART from 'cart/cart.constants';
import {
  setBuySuccess,
  setBuyError,
  setItems,
  removeAllItems,
} from 'cart/cart.actions';
import {
  getItems,
  getItemIndexById,
} from 'cart/cart.selectors';
import getBuyConfirmation from 'cart/cart.services';

jest.mock('products/products.selectors', () => ({
  getProductsItemById: () => () => ({
    id: 5,
    quantity: 8,
  }),
  getItemIndexById: () => () => ({
    id: 5,
    quantity: 8,
  }),
}));

const TEST_PRODUCT_1 = {
  id: 5, quantity: 5,
};
const TEST_PRODUCT_2 = {
  id: 6, quantity: 4,
};
const TEST_PRODUCT_ITEM_ID_1 = {
  quantity: 5, itemId: 5,
};
const TEST_PRODUCT_ITEM_ID_2 = {
  quantity: 4, itemId: 6,
};

describe('cart sagas', () => {
  describe('sendToStore', () => {
    it('Should change quantity of product in store', () => {
      const action = { payload: { id: 5, quantity: 6 } };
      const gen = sendToStore(action);
      let expected = select(getProductsItemById(5));
      let nextGen = gen.next().value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      expected = select(getItems);
      nextGen = gen.next(TEST_PRODUCT_ITEM_ID_1).value;
      expect(nextGen).toEqual(expected);

      expected = select(getItemIndexById(5));
      nextGen = gen.next([TEST_PRODUCT_ITEM_ID_1]).value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      expected = put(setItems([TEST_PRODUCT_ITEM_ID_1]));
      nextGen = gen.next(0).value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });

    it('Should get quantity from action and push the new item instead replacing', () => {
      const action = { payload: { id: 7, quantity: 3 } };
      const gen = sendToStore(action);
      let expected = select(getProductsItemById(5));
      let nextGen = gen.next().value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      expected = select(getItems);
      nextGen = gen.next({ id: 7, quantity: 3 }).value;
      expect(nextGen).toEqual(expected);

      expected = select(getItemIndexById(5));
      nextGen = gen.next([TEST_PRODUCT_1]).value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      expected = put(setItems([TEST_PRODUCT_1, { id: 7, quantity: 3 }]));
      nextGen = gen.next(-1).value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });

    it('Should removeAllItems if error', () => {
      const action = { payload: { id: 5, quantity: 6 } };
      const gen = sendToStore(action);
      const expected = select(getProductsItemById(5));
      let nextGen = gen.next().value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      const error = { message: 'ERROR' };
      nextGen = gen.throw(error).value;

      expect(nextGen).toEqual(put(removeAllItems()));
      expect(gen.next().done).toEqual(true);
    });
  });

  describe('removeItemFromStore', () => {
    it('Should remove the item successfuly', () => {
      const action = { itemId: 6 };
      const gen = removeItemFromStore(action);
      let expected = select(getItems);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = select(getProductsItemById(6));
      nextGen = gen.next([TEST_PRODUCT_ITEM_ID_2]).value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      expected = put(setItems([]));
      nextGen = gen.next(0).value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });

    it('Should not remove item if not found in store', () => {
      const action = { itemId: 6 };
      const gen = removeItemFromStore(action);
      let expected = select(getItems);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = select(getProductsItemById(6));
      nextGen = gen.next([TEST_PRODUCT_ITEM_ID_2]).value;
      expect(JSON.stringify(nextGen)).toEqual(JSON.stringify(expected));

      nextGen = gen.next(-1).done;
      expect(nextGen).toEqual(true);
    });

    it('Should removeAllItems if error', () => {
      const action = { itemId: 6 };
      const gen = removeItemFromStore(action);
      let expected = select(getItems);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = put(removeAllItems());
      nextGen = gen.throw('error').value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });
  });

  describe('sendCartToServer', () => {
    it('Should get successfuly', () => {
      const ITEMS = [TEST_PRODUCT_1, TEST_PRODUCT_2];

      const gen = sendCartToServer();
      let expected = select(getItems);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = call(getBuyConfirmation, ITEMS);
      nextGen = gen.next(ITEMS).value;
      expect(nextGen).toEqual(expected);

      expected = put(setBuySuccess());
      nextGen = gen.next({ status: 200 }).value;
      expect(nextGen).toEqual(expected);

      expected = put(removeAllItems());
      nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });

    it('Should send an error if response is not 200 or 204, or there\'s other error', () => {
      const ITEMS = [TEST_PRODUCT_1, TEST_PRODUCT_2];

      const gen = sendCartToServer();
      let expected = select(getItems);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = call(getBuyConfirmation, ITEMS);
      nextGen = gen.next(ITEMS).value;
      expect(nextGen).toEqual(expected);

      expected = put(setBuyError('Unexpected error'));
      nextGen = gen.next({ status: 500 }).value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });
  });

  describe('cartSagas', () => {
    it('Should get successfuly', () => {
      const gen = cartSagas();
      let expected = takeLatest(CART.ITEMS.SET_SAGA, sendToStore);
      let nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = takeLatest(CART.ITEMS.REMOVE_SAGA, removeItemFromStore);
      nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      expected = takeLatest(CART.BUY.LOADING, sendCartToServer);
      nextGen = gen.next().value;
      expect(nextGen).toEqual(expected);

      nextGen = gen.next().done;
      expect(nextGen).toEqual(true);
    });
  });
});
