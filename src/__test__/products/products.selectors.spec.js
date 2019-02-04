import {
  getProductsItems,
  getProductsItemById,
  getActualSort,
  getFilters,
  getPagination,
  isSearching,
  getProductsState,
} from 'products/products.selectors';

const mockState = {
  products: {
    error: 'mock error',
    requesting: true,
    items: [
      {
        id: 3,
        name: 'something',
      },
    ],
    sort: {
      field: 'field',
      order: 'ASC',
    },
    pagination: {
      page: 1,
      limit: 10,
      lastPage: 5,
    },
    filters: {
      price: {
        min: 9,
        max: 5,
      },
      quantity: {
        min: 3,
        max: 5,
      },
      available: false,
      name: 'name',
      sublevel_id: 88,
    },
  },
};

describe('products selectors', () => {
  describe('getProductsItems', () => {
    it('Should return the value and recompute properly', () => {
      const expected = [
        {
          id: 3,
          name: 'something',
        },
      ];
      let result = getProductsItems(mockState);
      expect(result).toEqual(expected);
      expect(getProductsItems.recomputations()).toEqual(1);

      const newItems = {
        items: [{ id: 4, quantity: 8 }, { id: 2, quantity: 0 }, { id: 5, quantity: 2 }],
      };
      result = getProductsItems({ products: newItems });
      expect(result).toEqual(newItems.items);
      expect(getProductsItems.recomputations()).toEqual(2);

      getProductsItems({ products: newItems });
      expect(getProductsItems.recomputations()).toEqual(2);

      // Not recompute because not setting a new array, instead mutating the existing one
      newItems.items.pop();
      getProductsItems({ products: newItems });
      expect(getProductsItems.recomputations()).toEqual(2);
    });
  });

  describe('getProductsItemById', () => {
    it('Should return the value and recompute properly', () => {
      let expected = {
        id: 3,
        name: 'something',
      };
      let selector = getProductsItemById(4);
      let result = selector(mockState);
      expect(result).toEqual(undefined);
      expect(selector.recomputations()).toEqual(1);

      selector = getProductsItemById(3);
      result = selector(mockState);
      expect(result).toEqual(expected);

      const newProducts = {
        products: {
          items: [{ id: 4 }, { id: 2 }, { id: 5 }],
        },
      };
      result = selector(newProducts);
      expected = newProducts.products.items;
      expect(result).toEqual(undefined);
      expect(selector.recomputations()).toEqual(2);

      // Created a new Array
      newProducts.products.items = [newProducts.products.items[0]];
      selector(newProducts);
      expect(selector.recomputations()).toEqual(2);

      // Change id so won't match
      selector = getProductsItemById(2);
      result = selector(newProducts);
      expected = { id: 2 };
      expect(result).toEqual(expected);
      expect(selector.recomputations()).toEqual(1);
    });
  });

  describe('getActualSort', () => {
    it('Should return the value and recompute properly', () => {
      const expected = {
        field: 'field',
        order: 'ASC',
      };
      let result = getActualSort(mockState);
      expect(result).toEqual(expected);
      expect(getActualSort.recomputations()).toEqual(1);

      const sort = {
        field: 'field2',
        order: 'AS',
      };
      const newProducts = { products: { sort } };
      result = getActualSort(newProducts);
      expect(result).toEqual(sort);
      expect(getActualSort.recomputations()).toEqual(2);

      getActualSort(newProducts);
      expect(getActualSort.recomputations()).toEqual(2);

      // Not recompute because not setting a new object
      newProducts.products.sort.field = 'field1';
      getActualSort(newProducts);
      expect(getActualSort.recomputations()).toEqual(2);
    });
  });

  describe('getFilters', () => {
    it('Should return the value and recompute properly', () => {
      const expected = {
        price: {
          min: 9,
          max: 5,
        },
        quantity: {
          min: 3,
          max: 5,
        },
        available: false,
        name: 'name',
        sublevel_id: 88,
      };
      let result = getFilters(mockState);
      expect(result).toEqual(expected);
      expect(getFilters.recomputations()).toEqual(1);

      const filters = { name: 'field2' };
      const newProducts = { products: { filters } };
      result = getFilters(newProducts);
      expect(result).toEqual(filters);
      expect(getFilters.recomputations()).toEqual(2);

      getFilters(newProducts);
      expect(getFilters.recomputations()).toEqual(2);

      // Not recompute because not setting a new object
      newProducts.products.filters.name = 'field1';
      getFilters(newProducts);
      expect(getFilters.recomputations()).toEqual(2);
    });
  });

  describe('getPagination', () => {
    it('Should return the value and recompute properly', () => {
      const expected = {
        page: 1,
        limit: 10,
        lastPage: 5,
      };
      let result = getPagination(mockState);
      expect(result).toEqual(expected);
      expect(getPagination.recomputations()).toEqual(1);

      const pagination = { page: 2 };
      const newProducts = { products: { pagination } };
      result = getPagination(newProducts);
      expect(result).toEqual(pagination);
      expect(getPagination.recomputations()).toEqual(2);

      getPagination(newProducts);
      expect(getPagination.recomputations()).toEqual(2);

      // Not recompute because not setting a new object
      newProducts.products.pagination.page = 1;
      getPagination(newProducts);
      expect(getPagination.recomputations()).toEqual(2);
    });
  });

  describe('isSearching', () => {
    it('Should return the value and recompute properly', () => {
      const expected = true;
      let result = isSearching(mockState);
      expect(result).toEqual(expected);
      expect(isSearching.recomputations()).toEqual(1);

      const requesting = false;
      const newProducts = { products: { requesting } };
      result = isSearching(newProducts);
      expect(result).toEqual(requesting);
      expect(isSearching.recomputations()).toEqual(2);

      isSearching(newProducts);
      expect(isSearching.recomputations()).toEqual(2);

      // Not recompute because not setting a new object
      newProducts.products.requesting = true;
      isSearching(newProducts);
      expect(isSearching.recomputations()).toEqual(2);
    });
  });

  describe('getProductsState', () => {
    it('Should return the value and recompute properly', () => {
      const expected = 'mock error';
      let result = getProductsState(mockState);
      expect(result).toEqual(expected);
      expect(getProductsState.recomputations()).toEqual(1);

      const error = 'mock error';
      const newProducts = { products: { error } };
      result = getProductsState(newProducts);
      expect(result).toEqual(error);
      expect(getProductsState.recomputations()).toEqual(2);

      getProductsState(newProducts);
      expect(getProductsState.recomputations()).toEqual(2);

      // Not recompute because not setting a new object
      newProducts.products.error = 'error';
      getProductsState(newProducts);
      expect(getProductsState.recomputations()).toEqual(2);
    });
  });
});
