/**
 * API calls for the login modal
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { URL_PATH_LOGIN, LOGIN } from 'containers/LoginModal/constants';
import { successfulLogin, failedLogin } from 'containers/LoginModal/actions';
import { registerUser, closeLoginModal } from 'containers/App/actions';
import { makeSelectUsername } from 'containers/LoginModal/selectors';

export function* doLogin() {
  const username = yield select(makeSelectUsername());

  try {
    const response = yield call(request, URL_PATH_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    yield put(registerUser({ ...response }));
    yield put(successfulLogin());
    yield put(closeLoginModal());
  } catch (error) {
    yield put(failedLogin());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  // Watches for LOGIN actions and calls doLogin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, doLogin);
}
