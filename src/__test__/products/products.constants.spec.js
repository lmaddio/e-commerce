import {
  GET_PRODUCTS, PAGINATION, FILTER_PRODUCTS, SORT_PRODUCTS, PAGE_URI_STRING, SORT_TYPES,
} from 'products/products.constants';

const SORT_TYPES_EXPECTED = {
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

describe('products constants', () => {
  it('GET_PRODUCTS Should have all its keys', () => {
    expect(GET_PRODUCTS.LOADING).toEqual('PRODUCTS/GET_PRODUCTS_LOADING');

    expect(GET_PRODUCTS.ERROR).toEqual('PRODUCTS/GET_PRODUCTS_ERROR');

    expect(GET_PRODUCTS.SUCCESS).toEqual('PRODUCTS/GET_PRODUCTS_SUCCESS');
  });

  it('PAGINATION Should have all its keys', () => {
    expect(PAGINATION.SET).toEqual('PRODUCTS/PAGINATION_SET');

    expect(PAGINATION.LAST_PAGE).toEqual('PRODUCTS/PAGINATION_LAST_PAGE');
  });

  it('FILTER_PRODUCTS Should have all its keys', () => {
    expect(FILTER_PRODUCTS.SET).toEqual('PRODUCTS/FILTER_PRODUCTS_SET');

    expect(FILTER_PRODUCTS.CLEAN).toEqual('PRODUCTS/FILTER_PRODUCTS_CLEAN');
  });

  it('SORT_PRODUCTS Should have all its keys', () => {
    expect(SORT_PRODUCTS.SET).toEqual('PRODUCTS/SORT_PRODUCTS_SET');

    expect(SORT_PRODUCTS.CLEAN).toEqual('PRODUCTS/SORT_PRODUCTS_CLEAN');
  });

  it('PAGE_URI_STRING Should have all its keys', () => {
    expect(PAGE_URI_STRING).toEqual('_page=');
  });

  it('SORT_TYPES Should have all its keys', () => {
    expect(JSON.stringify(SORT_TYPES)).toEqual(JSON.stringify(SORT_TYPES_EXPECTED));
  });
});
