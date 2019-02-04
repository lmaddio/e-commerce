import { createSelector } from 'reselect';

const getProductsObject = state => state.products;

export const getProductsItems = createSelector(
  getProductsObject,
  products => products.items,
);

export const getProductsItemById = id => createSelector(
  getProductsItems,
  items => items.find(item => item.id === id),
);

export const getActualSort = createSelector(
  getProductsObject,
  products => products.sort,
);

export const getFilters = createSelector(
  getProductsObject,
  products => products.filters,
);

export const getPagination = createSelector(
  getProductsObject,
  products => products.pagination,
);

export const isSearching = createSelector(
  getProductsObject,
  products => products.requesting,
);

export const getProductsState = createSelector(
  getProductsObject,
  products => products.error,
);
