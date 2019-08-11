import { call, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { URL_PATH_LOGOUT, LOGOUT_USER } from 'containers/App/constants';

export function* doLogout() {
  yield call(request, URL_PATH_LOGOUT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logout() {
  // Watches for LOGIN actions and calls doLogin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGOUT_USER, doLogout);
}
