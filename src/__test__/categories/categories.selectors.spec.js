import getCategories from 'categories/categories.selectors';

const mockState = {
  categories: {
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

describe('categories selectors', () => {
  describe('getCategories', () => {
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
      let result = getCategories(mockState);
      expect(result).toEqual(expected);
      expect(getCategories.recomputations()).toEqual(1);

      const newItems = {
        items: [{ id: 4, quantity: 8 }, { id: 2, quantity: 0 }, { id: 5, quantity: 2 }],
      };
      result = getCategories({ categories: newItems });
      expect(result).toEqual(newItems.items);
      expect(getCategories.recomputations()).toEqual(2);

      getCategories({ categories: newItems });
      expect(getCategories.recomputations()).toEqual(2);

      // Not recompute because not setting a new array, instead mutating the existing one
      newItems.items.pop();
      getCategories({ categories: newItems });
      expect(getCategories.recomputations()).toEqual(2);
    });
  });
});
