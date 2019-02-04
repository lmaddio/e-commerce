import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import GET_CATEGORIES from 'categories/categories.constants';
import { setCategories, setCategoriesError } from 'categories/categories.actions';
import getCategories from 'categories/categories.services';
import categoriesSagas, { fetchCategories } from 'categories/categories.sagas';

describe('categories sagas', () => {
  it('categoriesSagas', () => {
    const gen = categoriesSagas();
    expect(gen.next().value).toEqual(takeLatest(GET_CATEGORIES.LOADING, fetchCategories));

    expect(gen.next().done).toEqual(true);
  });

  it('fetchCategories fetch data and save to store', () => {
    const gen = fetchCategories();
    expect(gen.next().value).toEqual(call(getCategories));

    expect(gen.next({ json: () => [2] }).value).toEqual([2]);

    expect(gen.next([3]).value).toEqual(put(setCategories([3])));

    expect(gen.next().done).toEqual(true);
  });

  it('fetchCategories fail and save error message', () => {
    const gen = fetchCategories();
    expect(gen.next().value).toEqual(call(getCategories));

    expect(gen.throw({ message: 'error' }).value).toEqual(put(setCategoriesError('error')));

    expect(gen.next().done).toEqual(true);
  });
});
