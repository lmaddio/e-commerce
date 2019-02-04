import { parse } from 'http-link-header';
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  GET_PRODUCTS,
  FILTER_PRODUCTS,
  PAGINATION,
  SORT_PRODUCTS,
  PAGE_URI_STRING,
} from './products.constants';
import {
  setLastPage,
  setProducts,
  cleanFilters,
  setProductsError,
} from './products.actions';
import {
  getActualSort,
  getFilters,
  getPagination,
  getProductsItems,
} from './products.selectors';
import { manageFilters } from './products.utils';
import getProducts from './products.services';

export function* setNextPageFromHeaderLink(headerLink) {
  let lastPage = null;
  try {
    const links = parse(headerLink);
    const { uri } = links.rel('last')[0] || {};
    if (uri) {
      const uriArray = uri.split(PAGE_URI_STRING);
      const newPagination = uriArray[uriArray.length - 1].split('&');
      if (newPagination) {
        lastPage = parseInt(newPagination, 10);
      }
    }
  } catch (error) {
    console.warn(error);
  } finally {
    yield put(setLastPage(lastPage));
  }
}

export function* getFetchParams(page) {
  try {
    const pagination = yield select(getPagination);
    const filters = yield select(getFilters);
    const sort = yield select(getActualSort);
    const params = manageFilters({
      sort: sort.field,
      order: sort.order,
      ...filters,
      ...pagination,
      page: page || 1,
    });
    return params;
  } catch (error) {
    yield put(cleanFilters());
    return {};
  }
}

export function* fetchProducts(action) {
  try {
    const { payload } = action;
    const { page } = payload || {};
    const params = yield call(getFetchParams, page);
    const response = yield call(getProducts, params);
    const items = yield select(getProductsItems);
    if (response.status === 200) {
      yield call(setNextPageFromHeaderLink, response.headers.get('Link'));
      const data = yield response.json();
      let newItems = data;
      if (page > 1) {
        newItems = items.concat(data);
      }
      yield put(setProducts(newItems));
    } else {
      throw new Error('Error from server', response.status);
    }
  } catch (error) {
    console.error(error);
    yield put(setProductsError(error.message));
  }
}

function* productsSagas() {
  yield takeLatest([
    GET_PRODUCTS.LOADING,
    FILTER_PRODUCTS.SET,
    FILTER_PRODUCTS.CLEAN,
    SORT_PRODUCTS.SET,
    SORT_PRODUCTS.CLEAN,
    PAGINATION.SET,
  ], fetchProducts);
}

export default productsSagas;
