import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { clearStorage } from 'App/redux/localStorage';
import { sendTokenToSagas, cleanToken } from 'token/token.actions';
import { removeAllItems } from 'cart/cart.actions';
import { LOGIN_USER, LOGOUT_USER, PROFILE } from './users.constants';
import {
  setUserName, setLoginError, setUserEmail,
  setUserProfileError, getUserProfile, setLogoutSuccess,
} from './users.actions';
import { login, fetchUserProfile } from './users.services';

export function* loginUser({ payload }) {
  try {
    const { password, email } = payload;
    const response = yield call(login, email, password);
    const data = yield response.json();
    if (response.status === 200) {
      yield put(setUserEmail(email));
      yield put(sendTokenToSagas(data));
      yield put(getUserProfile());
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    yield put(setLoginError(error.message));
  }
}

export function* startUserProfileRequest() {
  try {
    const response = yield call(fetchUserProfile);
    if (response.status === 200) {
      const data = yield response.json();
      const { name, email } = data;
      yield put(setUserName(name));
      yield put(setUserEmail(email));
    } else {
      throw new Error('Error getting profile', response.status);
    }
  } catch (error) {
    yield put(cleanToken());
    yield put(setUserProfileError(error.message));
  }
}

export function* setUserProfile({ payload }) {
  try {
    yield put(setUserName(payload.name));
    yield put(setUserEmail(payload.email));
  } catch (error) {
    yield put(setUserProfileError(error.message));
  }
}

export function* logoutUser() {
  yield put(cleanToken());
  yield put(removeAllItems());
  yield call(clearStorage);
  yield put(setLogoutSuccess());
}

function* userSaga() {
  yield takeLatest(LOGIN_USER.LOADING, loginUser);
  yield takeLatest(PROFILE.GET, startUserProfileRequest);
  yield takeLatest(PROFILE.SET, setUserProfile);
  yield takeLatest(LOGOUT_USER.LOADING, logoutUser);
}

export default userSaga;
