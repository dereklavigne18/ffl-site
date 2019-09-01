import { timePeriodQuery } from 'graphql/queries';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { graphql, request } from 'utils/request';

import { timePeriodsLoaded, timePeriodsLoadedError } from './actions';
import { URL_PATH_LOGOUT, LOGOUT_USER, LOAD_TIME_PERIODS } from './constants';

export function* doLogout() {
  yield call(request, URL_PATH_LOGOUT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

function* watchLogout() {
  yield takeLatest(LOGOUT_USER, doLogout);
}

function* getTimePeriods() {
  try {
    const timePeriodsResponse = yield call(graphql, timePeriodQuery);
    if (!timePeriodsResponse.data) {
      yield put(timePeriodsLoadedError({ error: 'No records returned' }));
      return;
    }

    yield put(
      timePeriodsLoaded({
        currentWeek: timePeriodsResponse.data.currentWeek,
        currentYear: timePeriodsResponse.data.currentSeason,
        seasons: timePeriodsResponse.data.seasons,
      }),
    );
  } catch (error) {
    yield put(timePeriodsLoadedError({ error }));
  }
}

function* watchLoadTimePeriods() {
  yield takeLatest(LOAD_TIME_PERIODS, getTimePeriods);
}

export default function* rootSaga() {
  yield all([fork(watchLogout), fork(watchLoadTimePeriods)]);
}
