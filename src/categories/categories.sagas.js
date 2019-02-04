import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import GET_CATEGORIES from './categories.constants';
import {
  setCategories,
  setCategoriesError,
} from './categories.actions';
import getCategories from './categories.services';

export function* fetchCategories() {
  try {
    const response = yield call(getCategories);
    const data = yield response.json();
    yield put(setCategories(data));
  } catch (error) {
    yield put(setCategoriesError(error.message));
  }
}

function* categoriesSagas() {
  yield takeLatest(GET_CATEGORIES.LOADING, fetchCategories);
}

export default categoriesSagas;
