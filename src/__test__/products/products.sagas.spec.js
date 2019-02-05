import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  GET_PRODUCTS,
  FILTER_PRODUCTS,
  PAGINATION,
  SORT_PRODUCTS,
} from 'products/products.constants';
import {
  setLastPage,
  setProducts,
  cleanFilters,
  setProductsError,
} from 'products/products.actions';
import {
  getActualSort,
  getFilters,
  getPagination,
  getProductsItems,
} from 'products/products.selectors';
import getProducts from 'products/products.services';
import productsSagas, {
  setNextPageFromHeaderLink, getFetchParams, fetchProducts,
} from 'products/products.sagas';

const HEADER_LINK = [
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=1&_limit=14>; rel="first",',
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=1&_limit=14>; rel="prev",',
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=3&_limit=14>; rel="next",',
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=7&_limit=14>; rel="last"',
].join(' ');
const HEADER_LINK_WITHOUT_LAST = [
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=1&_limit=14>; rel="first",',
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=1&_limit=14>; rel="prev",',
  '<http://localhost:3005/products?_sort=quantity&_order=DESC&_page=3&_limit=14>; rel="next",',
].join(' ');

describe('products sagas', () => {
  it('setNextPageFromHeaderLink', () => {
    let gen = setNextPageFromHeaderLink(HEADER_LINK);
    expect(gen.next().value).toEqual(put(setLastPage(7)));

    expect(gen.next().done).toEqual(true);
    // Without last
    gen = setNextPageFromHeaderLink(HEADER_LINK_WITHOUT_LAST);
    expect(gen.next().value).toEqual(put(setLastPage(null)));

    expect(gen.next().done).toEqual(true);

    // Error case
    gen = setNextPageFromHeaderLink();
    expect(gen.next().value).toEqual(put(setLastPage(null)));
    expect(gen.next().done).toEqual(true);
  });

  it('getFetchParams', () => {
    let gen = getFetchParams(0);
    expect(gen.next().value).toEqual(select(getPagination));

    expect(gen.next().value).toEqual(select(getFilters));

    expect(gen.next().value).toEqual(select(getActualSort));

    expect(gen.next({}).value).toEqual({ _page: 1 });

    expect(gen.next().done).toEqual(true);

    // Error case
    gen = getFetchParams(0);
    expect(gen.next().value).toEqual(select(getPagination));

    expect(gen.throw('error').value).toEqual(put(cleanFilters()));

    const genRes = gen.next();
    expect(genRes.value).toEqual({});
    expect(genRes.done).toEqual(true);
  });

  it('fetchProducts', () => {
    const pageNumber = 1;
    const action = { payload: { page: pageNumber } };
    let gen = fetchProducts(action);

    const items = [{ id: 4 }, { id: 5 }];

    const response = {
      status: 200, headers: { get: () => HEADER_LINK }, json: () => [{ id: 4 }, { id: 5 }],
    };

    expect(gen.next().value).toEqual(call(getFetchParams, pageNumber));

    expect(gen.next({}).value).toEqual(call(getProducts, {}));

    expect(gen.next(response).value).toEqual(select(getProductsItems));

    expect(gen.next().value).toEqual(call(setNextPageFromHeaderLink, HEADER_LINK));

    expect(gen.next().value).toEqual(items);

    expect(gen.next(items).value).toEqual(put(setProducts(items)));

    expect(gen.next().done).toEqual(true);

    // Concat items
    gen = fetchProducts({ payload: { page: 2 } });
    expect(gen.next().value).toEqual(call(getFetchParams, 2));
    expect(gen.next({}).value).toEqual(call(getProducts, {}));
    expect(gen.next(response).value).toEqual(select(getProductsItems));
    expect(gen.next([{ id: 0 }]).value).toEqual(call(setNextPageFromHeaderLink, HEADER_LINK));
    expect(gen.next().value).toEqual(items);
    expect(gen.next(items).value).toEqual(put(setProducts([{ id: 0 }, { id: 4 }, { id: 5 }])));
    expect(gen.next().done).toEqual(true);

    // Error case
    gen = fetchProducts({ payload: { page: 2 } });
    expect(gen.next().value).toEqual(call(getFetchParams, 2));
    expect(gen.next({}).value).toEqual(call(getProducts, {}));
    expect(gen.next({ ...response, status: 404 }).value).toEqual(select(getProductsItems));
    expect(gen.next().value).toEqual(put(setProductsError('Error from server')));

    expect(gen.next().done).toEqual(true);
  });

  it('productsSagas', () => {
    const gen = productsSagas();

    expect(gen.next().value).toEqual(
      takeLatest([
        GET_PRODUCTS.LOADING,
        FILTER_PRODUCTS.SET,
        FILTER_PRODUCTS.CLEAN,
        SORT_PRODUCTS.SET,
        SORT_PRODUCTS.CLEAN,
        PAGINATION.SET,
      ], fetchProducts),
    );

    expect(gen.next().done).toEqual(true);
  });
});
