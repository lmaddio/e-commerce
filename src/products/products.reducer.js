import {
  GET_PRODUCTS, SORT_TYPES, FILTER_PRODUCTS, PAGINATION, SORT_PRODUCTS,
} from './products.constants';

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
    limit: 10,
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

function products(state = initialState, action) {
  const { type, payload = {} } = action;
  const { filters, pagination } = state;
  switch (type) {
    case GET_PRODUCTS.LOADING:
      return Object.assign({}, state, { requesting: true });
    case GET_PRODUCTS.ERROR:
      return Object.assign({}, state, { requesting: false, error: payload.error });
    case GET_PRODUCTS.SUCCESS:
      return Object.assign({}, state, { items: [...payload], requesting: false });
    case SORT_PRODUCTS.CLEAN:
      return Object.assign({}, state, { sort: Object.assign({}, initialState.sort) });
    case SORT_PRODUCTS.SET:
      return Object.assign({}, state, { sort: Object.assign({}, payload.sort) });
    case FILTER_PRODUCTS.CLEAN:
      return Object.assign({}, state, {
        filters: Object.assign({}, initialState.filters),
        pagination: Object.assign({}, initialState.pagination),
      });
    case FILTER_PRODUCTS.SET:
      return Object.assign({}, state, {
        filters: Object.assign({}, filters, payload.filter),
        pagination: Object.assign({}, initialState.pagination),
      });
    case PAGINATION.SET:
      return Object.assign({}, state,
        { pagination: Object.assign({}, pagination, { page: payload.page }) });
    case PAGINATION.LAST_PAGE:
      return Object.assign({}, state,
        { pagination: Object.assign({}, pagination, { lastPage: payload.lastPage }) });
    default:
      return state;
  }
}

export default products;
