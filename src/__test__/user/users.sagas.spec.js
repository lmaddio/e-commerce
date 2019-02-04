import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { sendTokenToSagas, cleanToken } from 'token/token.actions';
import { removeAllItems } from 'cart/cart.actions';
import { LOGIN_USER, LOGOUT_USER, PROFILE } from 'user/users.constants';
import {
  setUserName, setLoginError, setUserEmail,
  setUserProfileError, getUserProfile, setLogoutSuccess,
} from 'user/users.actions';
import { login, fetchUserProfile } from 'user/users.services';
import userSaga, {
  loginUser, startUserProfileRequest, setUserProfile, logoutUser,
} from 'user/users.sagas';

describe('user sagas', () => {
  it('loginUser', () => {
    const payload = { email: 'l@l.com', password: '123456' };
    const gen = loginUser({ payload });
    expect(gen.next(payload).value).toEqual(call(login, 'l@l.com', '123456'));

    expect(gen.next({ status: 200, json: () => 'data' }).value).toEqual('data');

    expect(gen.next('data').value).toEqual(put(setUserEmail('l@l.com')));

    expect(gen.next().value).toEqual(put(sendTokenToSagas('data')));

    expect(gen.next().value).toEqual(put(getUserProfile()));

    expect(gen.next().done).toEqual(true);
  });

  it('loginUser error', () => {
    const payload = { email: 'l@l.com', password: '123456' };
    const gen = loginUser({ payload });
    expect(gen.next(payload).value).toEqual(call(login, 'l@l.com', '123456'));

    expect(
      gen.next({ status: 204, json: () => ({ message: 'error msg' }) }).value,
    ).toEqual({ message: 'error msg' });

    expect(gen.next({ message: 'error msg' }).value).toEqual(put(setLoginError('error msg')));

    expect(gen.next().done).toEqual(true);
  });

  it('startUserProfileRequest should fetch user profile and save data', () => {
    const gen = startUserProfileRequest();
    expect(gen.next().value).toEqual(call(fetchUserProfile));

    expect(
      gen.next({ status: 200, json: () => ({ name: 'testName', email: 'testEmail' }) }).value,
    ).toEqual({ name: 'testName', email: 'testEmail' });

    expect(
      gen.next({ name: 'testName', email: 'testEmail' }).value,
    ).toEqual(put(setUserName('testName')));

    expect(gen.next().value).toEqual(put(setUserEmail('testEmail')));

    expect(gen.next().done).toEqual(true);
  });

  it('startUserProfileRequest should save error if any', () => {
    const gen = startUserProfileRequest();
    expect(gen.next().value).toEqual(call(fetchUserProfile));

    expect(gen.next({ status: 204, json: () => 'response' }).value).toEqual(
      put(setUserProfileError('errorMsg')),
    );

    expect(gen.next().done).toEqual(true);
  });


  it('setUserProfile should fetch user profile and save data', () => {
    const action = { payload: { name: 'leo', email: 'email@g.com' } };
    const gen = setUserProfile(action);

    expect(gen.next(action.payload.name).value).toEqual(put(setUserName('leo')));

    expect(gen.next(action.payload.email).value).toEqual(put(setUserEmail('email@g.com')));

    expect(gen.next().done).toEqual(true);
  });

  it('setUserProfile should save error if any', () => {
    const action = { payload: { name: 'leo', email: 'email@g.com' } };
    const gen = setUserProfile(action);

    expect(gen.next(action.payload.name).value).toEqual(put(setUserName('leo')));

    expect(gen.throw({ message: 'errorMsg' }).value).toEqual(put(setUserProfileError('errorMsg')));

    expect(gen.next().done).toEqual(true);
  });

  it('logoutUser by cleaning store', () => {
    const gen = logoutUser();

    expect(gen.next().value).toEqual(put(cleanToken()));

    expect(gen.next().value).toEqual(put(removeAllItems()));

    expect(gen.next().value).toEqual(put(setLogoutSuccess()));

    expect(gen.next().done).toEqual(true);
  });

  it('userSaga', () => {
    const gen = userSaga();

    expect(gen.next().value).toEqual(takeLatest(LOGIN_USER.LOADING, loginUser));

    expect(gen.next().value).toEqual(takeLatest(PROFILE.GET, startUserProfileRequest));

    expect(gen.next().value).toEqual(takeLatest(PROFILE.SET, setUserProfile));

    expect(gen.next().value).toEqual(takeLatest(LOGOUT_USER.LOADING, logoutUser));

    expect(gen.next().done).toEqual(true);
  });
});
