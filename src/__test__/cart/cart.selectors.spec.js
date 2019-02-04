import {
  getItems,
  getItemById,
  getItemIndexById,
  getCartState,
  isCartRequesting,
} from 'cart/cart.selectors';

const mockState = {
  cart: {
    items: [
      {
        id: 4,
        quantity: 8,
      }, {
        id: 5,
        quantity: 2,
      }, {
        id: 2,
        quantity: 0,
      },
    ],
    requesting: true,
    error: 'there is an error',
  },
};

describe('cart selectors', () => {
  describe('getItems', () => {
    it('Should return the value and recompute properly', () => {
      const expected = [{
        id: 4,
        quantity: 8,
      }, {
        id: 5,
        quantity: 2,
      }, {
        id: 2,
        quantity: 0,
      }];
      let result = getItems(mockState);
      expect(result).toEqual(expected);
      expect(getItems.recomputations()).toEqual(1);

      const newItems = {
        items: [{ id: 4, quantity: 8 }, { id: 2, quantity: 0 }, { id: 5, quantity: 2 }],
      };
      result = getItems({ cart: newItems });
      expect(result).toEqual(newItems.items);
      expect(getItems.recomputations()).toEqual(2);

      getItems({ cart: newItems });
      expect(getItems.recomputations()).toEqual(2);

      // Not recompute because not setting a new array, instead mutating the existing one
      newItems.items.pop();
      getItems({ cart: newItems });
      expect(getItems.recomputations()).toEqual(2);
    });
  });

  describe('getItemById', () => {
    it('Should return the value and recompute properly', () => {
      let expected = {
        id: 4,
        quantity: 8,
      };
      let selector = getItemById(4);
      let result = selector(mockState);
      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);

      const newItems = {
        items: [{ id: 4, quantity: 8 }, { id: 2, quantity: 0 }, { id: 5, quantity: 2 }],
      };
      result = selector({ cart: newItems });
      expected = newItems.items;
      expect(result).toEqual(expected[0]);
      expect(selector.recomputations()).toEqual(2);

      // Created a new Array
      selector({ cart: { items: [...newItems.items] } });
      expect(selector.recomputations()).toEqual(3);

      // Change id so won't match
      selector = getItemById(9);
      result = selector({ cart: newItems });
      expected = {};
      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);
    });
  });

  describe('getItemIndexById', () => {
    it('Should return the value and recompute properly', () => {
      let expected = 0;
      let selector = getItemIndexById(4);
      let result = selector(mockState);

      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);

      const newItems = {
        items: [{ id: 4, quantity: 8 }, { id: 2, quantity: 0 }, { id: 5, quantity: 2 }],
      };
      result = selector({ cart: newItems });
      expected = 0;

      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(2);

      // Created a new Array
      selector = getItemIndexById(9);
      result = selector({ cart: newItems });
      expected = -1;

      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);

      // Should return the same
      selector({ cart: newItems });
      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);
    });
  });

  describe('getCartState', () => {
    it('Should return the value and recompute properly', () => {
      let expected = 'there is an error';
      let result = getCartState(mockState);

      expect(result).toEqual(expected);
      expect(getCartState.recomputations()).toEqual(1);

      expected = 'there was an ERROR';
      result = getCartState({ cart: { ...mockState, error: 'there was an ERROR' } });
      expect(result).toEqual(expected);
      expect(getCartState.recomputations()).toEqual(2);

      // Even if value doesn't change the object is new
      getCartState({ cart: { ...mockState, error: 'there was an ERROR' } });
      expect(getCartState.recomputations()).toEqual(3);

      // Another test with the original object
      getCartState(mockState);
      expect(getCartState.recomputations()).toEqual(4);

      // Same object, won't recompute
      getCartState(mockState);
      expect(getCartState.recomputations()).toEqual(4);
    });
  });

  describe('isCartRequesting', () => {
    it('Should return the value and recompute properly', () => {
      let expected = true;
      let result = isCartRequesting(mockState);

      expect(result).toEqual(expected);
      expect(isCartRequesting.recomputations()).toEqual(1);

      expected = false;
      result = isCartRequesting({ cart: { ...mockState, requesting: false } });
      expect(result).toEqual(expected);
      expect(isCartRequesting.recomputations()).toEqual(2);

      // Another test with the original object
      result = isCartRequesting(mockState);
      expected = true;
      expect(result).toEqual(expected);
      expect(isCartRequesting.recomputations()).toEqual(3);

      // Same object, won't recompute
      result = isCartRequesting(mockState);
      expected = true;
      expect(result).toEqual(expected);
      expect(isCartRequesting.recomputations()).toEqual(3);
    });
  });
});
