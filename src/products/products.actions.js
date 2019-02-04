import {
  GET_PRODUCTS, FILTER_PRODUCTS, SORT_PRODUCTS, PAGINATION,
} from './products.constants';

export const getProducts = () => ({
  type: GET_PRODUCTS.LOADING,
});

export const setProducts = products => ({
  type: GET_PRODUCTS.SUCCESS,
  payload: products,
});

export const setProductsError = error => ({
  type: GET_PRODUCTS.ERROR,
  payload: {
    error,
  },
});

export const setProductsFilter = filter => ({
  type: FILTER_PRODUCTS.SET,
  payload: {
    filter,
  },
});

export const cleanFilters = () => ({
  type: FILTER_PRODUCTS.CLEAN,
});

export const setProductsSort = sort => ({
  type: SORT_PRODUCTS.SET,
  payload: {
    sort,
  },
});

export const cleanProductsSort = () => ({
  type: SORT_PRODUCTS.CLEAN,
});

export const setPagination = page => ({
  type: PAGINATION.SET,
  payload: {
    page,
  },
});

export const setLastPage = lastPage => ({
  type: PAGINATION.LAST_PAGE,
  payload: {
    lastPage,
  },
});
