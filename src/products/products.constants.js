import { defineAction } from 'redux-define';
import { COMMON_STATUS } from 'App/request';

const NAMESPACE = 'PRODUCTS';

export const GET_PRODUCTS = defineAction('GET_PRODUCTS', COMMON_STATUS, NAMESPACE);

export const PAGINATION = defineAction('PAGINATION', ['SET', 'LAST_PAGE'], NAMESPACE);

export const FILTER_PRODUCTS = defineAction('FILTER_PRODUCTS', ['SET', 'CLEAN'], NAMESPACE);

export const SORT_PRODUCTS = defineAction('SORT_PRODUCTS', ['SET', 'CLEAN'], NAMESPACE);

export const PAGE_URI_STRING = '_page=';

export const SORT_TYPES = {
  fields: {
    QUANTITY: {
      label: 'Quantity',
      name: 'quantity',
    },
    PRICE: {
      label: 'Price',
      name: 'price',
    },
    AVAILABLE: {
      label: 'Available',
      name: 'available',
    },
  },
  order: {
    ASC: 'ASC',
    DESC: 'DESC',
  },
  default: {
    field: 'quantity',
    order: 'DESC',
  },
};
