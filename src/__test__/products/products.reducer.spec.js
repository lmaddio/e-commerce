import {
  GET_PRODUCTS, SORT_TYPES, FILTER_PRODUCTS, PAGINATION, SORT_PRODUCTS,
} from 'products/products.constants';
import reducer from 'products/products.reducer';

const initialState = {
  error: null,
  requesting: false,
  items: [],
  sort: {
    field: SORT_TYPES.default.field,
    order: SORT_TYPES.default.order,
  },
  pagination: {
    page: 1,
    limit: 14,
    lastPage: null,
  },
  filters: {
    price: {
      min: null,
      max: null,
    },
    quantity: {
      min: null,
      max: null,
    },
    available: null,
    name: null,
    sublevel_id: null,
  },
};

const mockState = {
  error: null,
  requesting: false,
  items: [],
  sort: {
    field: SORT_TYPES.default.field,
    order: SORT_TYPES.default.order,
  },
  pagination: {
    page: 1,
    limit: 14,
    lastPage: null,
  },
  filters: {
    price: {
      min: null,
      max: null,
    },
    quantity: {
      min: null,
      max: null,
    },
    available: null,
    name: null,
    sublevel_id: null,
  },
};

describe('user reducer', () => {
  it('Should return initialState', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('GET_PRODUCTS.LOADING', () => {
    const action = {
      type: GET_PRODUCTS.LOADING,
    };
    const expected = { ...mockState, requesting: true };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('GET_PRODUCTS.ERROR', () => {
    const action = {
      type: GET_PRODUCTS.ERROR,
      payload: {
        error: 'error',
      },
    };
    const expected = { ...mockState, requesting: false, error: 'error' };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('GET_PRODUCTS.SUCCESS', () => {
    const action = {
      type: GET_PRODUCTS.SUCCESS,
      payload: [1, 2],
    };
    const expected = { ...mockState, requesting: false, items: [1, 2] };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('SORT_PRODUCTS.CLEAN', () => {
    const action = {
      type: SORT_PRODUCTS.CLEAN,
    };
    const expected = { ...mockState, requesting: false, sort: initialState.sort };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('SORT_PRODUCTS.SET', () => {
    const action = {
      type: SORT_PRODUCTS.SET,
      payload: {
        sort: {
          order: 'ASC',
        },
      },
    };
    const expected = { ...mockState, requesting: false, sort: { order: 'ASC' } };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('FILTER_PRODUCTS.CLEAN', () => {
    const action = {
      type: FILTER_PRODUCTS.CLEAN,
    };
    const expected = mockState;
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('FILTER_PRODUCTS.SET', () => {
    const action = {
      type: FILTER_PRODUCTS.SET,
      payload: {
        filter: {
          name: 'key',
        },
      },
    };
    const expected = { ...mockState, filters: { ...mockState.filters, name: 'key' } };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('PAGINATION.SET', () => {
    const action = {
      type: PAGINATION.SET,
      payload: {
        page: 6,
      },
    };
    const expected = { ...mockState, pagination: { ...mockState.pagination, page: 6 } };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });

  it('PAGINATION.LAST_PAGE', () => {
    const action = {
      type: PAGINATION.LAST_PAGE,
      payload: {
        lastPage: 8,
      },
    };
    const expected = { ...mockState, pagination: { ...mockState.pagination, lastPage: 8 } };
    const result = reducer(mockState, action);
    expect(result).toEqual(expected);
  });
});
