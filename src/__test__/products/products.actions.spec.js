import {
  GET_PRODUCTS, FILTER_PRODUCTS, SORT_PRODUCTS, PAGINATION,
} from 'products/products.constants';
import {
  getProducts,
  setProducts,
  setProductsError,
  setProductsFilter,
  cleanFilters,
  setProductsSort,
  cleanProductsSort,
  setPagination,
  setLastPage,
} from 'products/products.actions';

describe('Products actions', () => {
  it('getProducts', () => {
    const expected = {
      type: GET_PRODUCTS.LOADING,
    };
    const action = getProducts();
    expect(action).toEqual(expected);
  });

  it('setProducts', () => {
    const expected = {
      type: GET_PRODUCTS.SUCCESS,
      payload: [1],
    };
    const action = setProducts([1]);
    expect(action).toEqual(expected);
  });

  it('setProductsError', () => {
    const expected = {
      type: GET_PRODUCTS.ERROR,
      payload: {
        error: 'error',
      },
    };
    const action = setProductsError('error');
    expect(action).toEqual(expected);
  });

  it('setProductsFilter', () => {
    const expected = {
      type: FILTER_PRODUCTS.SET,
      payload: {
        filter: ['filter'],
      },
    };
    const action = setProductsFilter(['filter']);
    expect(action).toEqual(expected);
  });

  it('cleanFilters', () => {
    const expected = {
      type: FILTER_PRODUCTS.CLEAN,
    };
    const action = cleanFilters();
    expect(action).toEqual(expected);
  });

  it('setProductsSort', () => {
    const expected = {
      type: SORT_PRODUCTS.SET,
      payload: {
        sort: [4],
      },
    };
    const action = setProductsSort([4]);
    expect(action).toEqual(expected);
  });

  it('cleanProductsSort', () => {
    const expected = {
      type: SORT_PRODUCTS.CLEAN,
    };
    const action = cleanProductsSort();
    expect(action).toEqual(expected);
  });

  it('setPagination', () => {
    const expected = {
      type: PAGINATION.SET,
      payload: {
        page: 4,
      },
    };
    const action = setPagination(4);
    expect(action).toEqual(expected);
  });

  it('setLastPage', () => {
    const expected = {
      type: PAGINATION.LAST_PAGE,
      payload: {
        lastPage: 6,
      },
    };
    const action = setLastPage(6);
    expect(action).toEqual(expected);
  });
});
